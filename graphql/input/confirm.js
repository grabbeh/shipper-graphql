import { Subscriber } from './connectors'
import sgMail from '@sendgrid/mail'
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const confirmSubscription = async id => {
  let existing = await Subscriber.findById(id)
  if (existing && !existing.isConfirmed) {
    existing.isConfirmed = true
    existing.save()
    return existing
  } else {
    return new Error('No subscriber with this ID')
  }
}

const sendConfirmationEmail = async (email, username, id) => {
  const msg = {
    to: email,
    from: 'noreply@shipper.grabeh.net',
    subject: `Confirm subscription for @${username}`,
    html: makeEmail(id)
  }
  try {
    return sgMail.send(msg)
  } catch (e) {
    return e.response.body.errors
  }
}

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
`
}

export { confirmSubscription, sendConfirmationEmail }
