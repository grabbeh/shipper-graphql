import dayjs from 'dayjs'
import createEmail from '../../email/server/createEmail'
import Twitter from 'twitter'
import { Subscriber } from './connectors'
import request from 'async-request'
import unfluff from 'unfluff'
import sgMail from '@sendgrid/mail'
import { Base64 } from 'js-base64'

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_KEY,
  access_token_secret: process.env.ACCESS_SECRET
})

const getSubscribers = async () => {
  return Subscriber.find()
}

const mapSubscribers = subscribers => {
  for (var i = 0, l = subscribers.length; i < l; i++) {
  }
}

const getAllFavouritesForUser = async username => {
  try {
    let data = await client.get('favorites/list', {
      screen_name: username,
      count: 200
    })
    return data
  } catch (e) {
    console.log(e)
  }
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

const sendEmail = async (html, attachments, subscriber) => {
  let { email, username } = subscriber
  const msg = {
    to: email,
    from: 'noreply@shipper.grabeh.net',
    subject: `Content for @${username}`,
    html: html,
    attachments: attachments
  }
  try {
    await sgMail.send(msg)
  } catch (e) {
    console.log(e.response.body.errors)
  }
}

const formAttachments = content => {
  return content.map(a => {
    return {
      content: Base64.encode(a.text),
      filename: `${a.title}.txt`,
      type: 'plain/text',
      disposition: 'attachment',
      content_id: 'mytext'
    }
  })
}

const getContentFromFavourites = async subscriber => {
  let { username } = subscriber
  let favourites = await getAllFavouritesForUser(username)
  let qualifying = getFavouritesForPeriod(favourites, 7)
  let urls = extractUrls(qualifying)
  let content = await mapUrls(urls)
  let data = { content, username }
  try {
    let attachments = formAttachments(data.content)
    let html = await createEmail(data)
    return { attachments, html }
  } catch (e) {
    console.log(e)
  }
}

const main = async subscriber => {
  let { html, attachments } = await getContentFromFavourites(subscriber)
  sendEmail(html, attachments, subscriber)
}

main({ username: 'grabbeh', email: 'mbg@outlook.com' })

export default getContentFromFavourites
