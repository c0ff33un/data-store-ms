const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')

const app = express()

// allow cross-origin requests
app.use(cors());
app.use(morgan("combined"));

const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

mongoose.connect(`mongodb://${process.env.MONGO_URL}/myapp`, mongooseOptions)

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

