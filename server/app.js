const express = require('express')
const graphqlHTTP = require('express-graphql')

const app = express()

// setup middleware
// On the endpoint '/graphql', express will hand off the request to the graphqlHTTP function 
app.use('/graphql', graphqlHTTP({

  })
)

app.listen(3000, () => {
  console.log("Now listening for requests on port 3000")
})

