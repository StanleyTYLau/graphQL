require('dotenv').config()
const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')
const mongoose = require('mongoose')

const app = express()

mongoose.connect(`mongodb://${process.env.CHEESE_NAME}:${process.env.CHEESE_KEY}@ds151997.mlab.com:51997/gql-cheesey`, { useNewUrlParser: true })
mongoose.connection.once('open', () => {
  console.log("Connected to DB")
})

// setup middleware
// On the endpoint '/graphql', express will hand off the request to the graphqlHTTP function 
app.use('/graphql', graphqlHTTP({
  schema: schema, // ES6 allows you to just type 'schema'
  graphiql: true
  })
)

app.listen(3000, () => {
  console.log("Now listening for requests on port 3000")
})

