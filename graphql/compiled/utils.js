"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dayjs = require("dayjs");

var _dayjs2 = _interopRequireDefault(_dayjs);

var _createEmail = require("../../email/server/createEmail");

var _createEmail2 = _interopRequireDefault(_createEmail);

var _twitter = require("twitter");

var _twitter2 = _interopRequireDefault(_twitter);

var _connectors = require("./connectors");

var _asyncRequest = require("async-request");

var _asyncRequest2 = _interopRequireDefault(_asyncRequest);

var _unfluff = require("unfluff");

var _unfluff2 = _interopRequireDefault(_unfluff);

var _mail = require("@sendgrid/mail");

var _mail2 = _interopRequireDefault(_mail);

var _jsBase = require("js-base64");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mail2.default.setApiKey(process.env.SENDGRID_API_KEY);

const client = new _twitter2.default({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_KEY,
  access_token_secret: process.env.ACCESS_SECRET
});

const getSubscribers = async () => {
  return _connectors.Subscriber.find();
};

const mapSubscribers = subscribers => {
  for (var i = 0, l = subscribers.length; i < l; i++) {}
};

const getAllFavouritesForUser = async username => {
  try {
    let data = await client.get('favorites/list', {
      screen_name: username,
      count: 200
    });
    return data;
  } catch (e) {
    console.log(e);
  }
};

const checkValidFavourite = (period, favouriteDate) => {
  let today = (0, _dayjs2.default)();
  let periodStart = today.subtract(period, 'days');
  let favDate = (0, _dayjs2.default)(favouriteDate);

  if (favDate.isAfter(periodStart)) {
    return true;
  }
};

const getFavouritesForPeriod = (favourites, period) => {
  return favourites.filter(f => {
    if (checkValidFavourite(period, f.created_at)) {
      return f;
    }
  });
};

const extractUrls = data => {
  let urls = data.filter(d => {
    if (d.entities && d.entities.urls && d.entities.urls.length > 0 && d.entities.urls[0].expanded_url && !d.entities.urls[0].expanded_url.includes('twitter')) {
      return d.entities.urls;
    }
  });
  return urls.map(u => {
    return u.entities.urls[0].expanded_url;
  });
};

const getContent = async url => {
  let {
    body
  } = await (0, _asyncRequest2.default)(url);
  let result = (0, _unfluff2.default)(body);
  return result;
};

const mapUrls = async urls => {
  let content = [];

  for (var i = 0, l = urls.length; i < l; i++) {
    let url = urls[i];
    let result = await getContent(url);
    content.push(result);
  }

  return content;
};

const sendEmail = async (html, attachments, subscriber) => {
  let {
    email,
    username
  } = subscriber;
  const msg = {
    to: email,
    from: 'noreply@shipper.grabeh.net',
    subject: `Content for @${username}`,
    html: html,
    attachments: attachments
  };

  try {
    await _mail2.default.send(msg);
  } catch (e) {
    console.log(e.response.body.errors);
  }
};

const formAttachments = content => {
  return content.map(a => {
    return {
      content: _jsBase.Base64.encode(a.text),
      filename: `${a.title}.txt`,
      type: 'plain/text',
      disposition: 'attachment',
      content_id: 'mytext'
    };
  });
};

const getContentFromFavourites = async subscriber => {
  let {
    username
  } = subscriber;
  let favourites = await getAllFavouritesForUser(username);
  let qualifying = getFavouritesForPeriod(favourites, 7);
  let urls = extractUrls(qualifying);
  let content = await mapUrls(urls);
  let data = {
    content,
    username
  };

  try {
    let attachments = formAttachments(data.content);
    let html = await (0, _createEmail2.default)(data);
    return {
      attachments,
      html
    };
  } catch (e) {
    console.log(e);
  }
};

const main = async subscriber => {
  let {
    html,
    attachments
  } = await getContentFromFavourites(subscriber);
  sendEmail(html, attachments, subscriber);
};

main({
  username: 'grabbeh',
  email: 'mbg@outlook.com'
});
exports.default = getContentFromFavourites;