"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendConfirmationEmail = exports.confirmSubscription = undefined;

var _connectors = require("./connectors");

var _mail = require("@sendgrid/mail");

var _mail2 = _interopRequireDefault(_mail);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mail2.default.setApiKey(process.env.SENDGRID_API_KEY);

const confirmSubscription = async id => {
  let existing = await _connectors.Subscriber.findById(id);

  if (existing && !existing.isConfirmed) {
    existing.isConfirmed = true;
    existing.save();
    return existing;
  } else {
    return new Error('No subscriber with this ID');
  }
};

const sendConfirmationEmail = async (email, username, id) => {
  const msg = {
    to: email,
    from: 'noreply@shipper.grabeh.net',
    subject: `Confirm subscription for @${username}`,
    html: makeEmail(id)
  };

  try {
    return _mail2.default.send(msg);
  } catch (e) {
    return e.response.body.errors;
  }
};

const makeEmail = id => {
  return `
  <div className="email" style="
    border: 1px solid black;
    padding: 20px;
    font-family: sans-serif;
    line-height: 2;
    font-size: 20px;
  ">
    <h2>Hello There!</h2>
    <p>Confirm your subscription <a href="https://shipper.grabeh.net/confirm?id=${id}">here!</a></p>
  </div>
`;
};

exports.confirmSubscription = confirmSubscription;
exports.sendConfirmationEmail = sendConfirmationEmail;