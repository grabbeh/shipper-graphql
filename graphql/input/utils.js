import dayjs from 'dayjs'
import cfg from '../../config/twitter'
import Twitter from 'twitter'
const client = new Twitter({
  consumer_key: cfg.consumerkey,
  consumer_secret: cfg.consumerSecret,
  access_token_key: cfg.accessKey,
  access_token_secret: cfg.accessSecret
})

const getContent = async username => {
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

const getFavouritesForPeriod = favourites => {
  return favourites.filter(f => {
    if (checkValidFavourite(7, f.created_at)) {
      return f
    }
  })
}

const check = async username => {
  let data = await getContent(username)
  console.log(data.length)
  let filtered = getFavouritesForPeriod(data)
  console.log(filtered.length)
}

const extractUrls = async username => {
  let data = await getContent(username)
  let urls = data.filter(d => {
    if (
      d.entities &&
      d.entities.urls &&
      d.entities.urls.length > 0 &&
      d.entities.urls[0].expanded_url
    ) {
      return d.entities.urls
    }
  })

  let full = urls.map(u => {
    return u.entities.urls[0].expanded_url
  })

  console.log(full)
}

check('grabbeh')

export default getContent
