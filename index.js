const express = require('express');
const graphqlHTTP = require('express-graphql')
// const schema = require('@schema/schema')
const schema = require('./schema/schema')
const mongoose = require('mongoose');
const cors = require('cors');

const app = express()

// allow cross-origin requests
app.use(cors());

// connect to mlab database
// make sure to replace my db string & creds with your own
mongoose.connect('mongodb://localhost:27017/myapp')

mongoose.connection.once('open', () => {
    console.log('conneted to database');
});


app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}))

app.listen(4000 || process.env.PORT, () => {
  console.log(`Now listening on port ${4000 || process.env.PORT}`)
})

