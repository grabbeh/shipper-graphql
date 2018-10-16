const fs = require('fs')
const Path = require('path')
const React = require('react')
const ReactDOMServer = require('react-dom/server')
const Email = require('../lib/Email').default
const STYLE_TAG = '%STYLE%'
const CONTENT_TAG = '%CONTENT%'

function getFile (relativePath) {
  return new Promise((resolve, reject) => {
    const path = Path.join(__dirname, relativePath)
    return fs.readFile(path, { encoding: 'utf8' }, (err, file) => {
      if (err) return reject(err)
      return resolve(file)
    })
  })
}

const createEmail = data => {
  return Promise.all([
    getFile('../src/inlined.css'),
    getFile('./email.html')
  ]).then(
    ([style, template]) => {
      const emailElement = React.createElement(Email, { data })
      const content = ReactDOMServer.renderToStaticMarkup(emailElement)
      let emailHTML = template
      emailHTML = emailHTML.replace(CONTENT_TAG, content)
      emailHTML = emailHTML.replace(STYLE_TAG, style)
      return emailHTML
    },
    e => {
      return e
    }
  )
}

module.exports = createEmail
