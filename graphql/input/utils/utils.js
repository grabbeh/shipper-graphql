import dayjs from 'dayjs'
import cfg from '../../../config/twitter'
import sgApiKey from '../../../config/sendgrid'
import produceHtml from './produceHtml'
import Twitter from 'twitter'
import { Subscriber } from '../connectors'
import request from 'async-request'
import unfluff from 'unfluff'
import sgMail from '@sendgrid/mail'
sgMail.setApiKey(sgApiKey)

const client = new Twitter({
  consumer_key: cfg.consumerkey,
  consumer_secret: cfg.consumerSecret,
  access_token_key: cfg.accessKey,
  access_token_secret: cfg.accessSecret
})

const getSubscribers = async () => {
  return Subscriber.find()
}

const mapSubscribers = subscribers => {
  for (var i = 0, l = subscribers.length; i < l; i++) {
  }
}

const getAllFavouritesForUser = async username => {
  return client.get('favorites/list', { screen_name: username, count: 200 })
}

const checkValidFavourite = (period, favouriteDate) => {
  let today = dayjs()
  let periodStart = today.subtract(period, 'days')
  let favDate = dayjs(favouriteDate)
  if (favDate.isAfter(periodStart)) {
    return true
  }
}

const getFavouritesForPeriod = (favourites, period) => {
  return favourites.filter(f => {
    if (checkValidFavourite(period, f.created_at)) {
      return f
    }
  })
}

const extractUrls = data => {
  let urls = data.filter(d => {
    if (
      d.entities &&
      d.entities.urls &&
      d.entities.urls.length > 0 &&
      d.entities.urls[0].expanded_url &&
      !d.entities.urls[0].expanded_url.includes('twitter')
    ) {
      return d.entities.urls
    }
  })
  return urls.map(u => {
    return u.entities.urls[0].expanded_url
  })
}

const getContent = async url => {
  let { body } = await request(url)
  let result = unfluff(body)
  return result
}

const mapUrls = async urls => {
  let content = []
  for (var i = 0, l = urls.length; i < l; i++) {
    let url = urls[i]
    let result = await getContent(url)
    content.push(result)
  }
  return content
}

const sendEmail = (html, subscriber) => {
  console.log(html)
  let { email, username } = subscriber
  const msg = {
    to: email,
    from: 'noreply@shipper.grabeh.net',
    subject: `Content for @${username}`,
    html: html
  }
  sgMail.send(msg)
}

const check = async subscriber => {
  let { username } = subscriber
  let favourites = await getAllFavouritesForUser(username)
  let qualifying = getFavouritesForPeriod(favourites, 7)
  let urls = extractUrls(qualifying)
  let contentArr = await mapUrls(urls)
  let html = produceHtml(contentArr)
  return html
}

const main = async subscriber => {
  let html = await check(subscriber)
  sendEmail(html, subscriber)
}

main({ username: 'grabbeh', email: 'mbg@outlook.com' })

export default check
