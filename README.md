# attest-graphql

This is the graphql server which supports the shipper frontend at https://github.com/grabbeh/shipper. It also includes functionality to create email templates with react, which are then used by the server to send emails.

**Dependencies**

- A MongoDB database string referenced in /config/db.js
- A SendGrid API string in /config/sendgrid.js

**Development**

- git clone
- npm install
- npm run watch-graph
- node ./graphql/compiled/server.js

This starts the GraphQL server running on localhost:9000 (and GraphiQL, a GUI for the server, can be accessed at localhost:8000/graphiql)

**Production**

- npm run compile-graph
- npm run start-graph
