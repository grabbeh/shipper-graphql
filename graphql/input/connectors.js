import mongoose from 'mongoose'
import db from '../../config/db.js'

try {
  mongoose.connect(db, { dbName: 'bookmark', useNewUrlParser: true })
} catch (error) {
  console.log(error)
}

mongoose.Promise = require('bluebird')

const SubscriberSchema = mongoose.Schema({
  email: String,
  username: String,
  lastEmailed: Date,
  isConfirmed: { type: Boolean, default: false }
})

const Subscriber = mongoose.model('subscriber', SubscriberSchema)

export { Subscriber }
