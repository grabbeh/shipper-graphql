import mongoose from 'mongoose'
require('dotenv').config({ path: '../../.env' })

try {
  mongoose.connect(process.env.DB_CONNECTION, {
    dbName: 'bookmark',
    useNewUrlParser: true
  })
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
