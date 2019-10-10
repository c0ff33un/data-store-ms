const express = require('express');
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')
const mongoose = require('mongoose');
const cors = require('cors');

const app = express()

// allow cross-origin requests
app.use(cors());
let MONGO_URL = process.env.MONGO_URL
mongoose.connect(`mongodb://${MONGO_URL}/myapp`,
{
  useNewUrlParser: true,
  useUnifiedTopology: true
})

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
