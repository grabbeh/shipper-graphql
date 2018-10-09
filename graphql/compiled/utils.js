'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dayjs = require('dayjs');

var _dayjs2 = _interopRequireDefault(_dayjs);

var _twitter = require('../../config/twitter');

var _twitter2 = _interopRequireDefault(_twitter);

var _twitter3 = require('twitter');

var _twitter4 = _interopRequireDefault(_twitter3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const client = new _twitter4.default({
  consumer_key: _twitter2.default.consumerkey,
  consumer_secret: _twitter2.default.consumerSecret,
  access_token_key: _twitter2.default.accessKey,
  access_token_secret: _twitter2.default.accessSecret
});

const getContent = async username => {
  return client.get('favorites/list', { screen_name: username, count: 200 });
};

const checkValidFavourite = (period, favouriteDate) => {
  let today = (0, _dayjs2.default)();
  let periodStart = today.subtract(period, 'days');
  let favDate = (0, _dayjs2.default)(favouriteDate);
  if (favDate.isAfter(periodStart)) {
    return true;
  }
};

const getFavouritesForPeriod = favourites => {
  return favourites.filter(f => {
    if (checkValidFavourite(7, f.created_at)) {
      return f;
    }
  });
};

const check = async username => {
  let data = await getContent(username);
  console.log(data.length);
  let filtered = getFavouritesForPeriod(data);
  console.log(filtered.length);
};

const extractUrls = async username => {
  let data = await getContent(username);
  let urls = data.filter(d => {
    if (d.entities && d.entities.urls && d.entities.urls.length > 0 && d.entities.urls[0].expanded_url) {
      return d.entities.urls;
    }
  });

  let full = urls.map(u => {
    return u.entities.urls[0].expanded_url;
  });

  console.log(full);
};

check('grabbeh');

exports.default = getContent;