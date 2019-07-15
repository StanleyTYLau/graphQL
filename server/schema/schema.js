const graphql = require('graphql')

const {GraphQLObjectType, GraphQLString} = graphql

const CheeseType = new GraphQLObjectType({
  name: 'Cheese',
  fields: () => ({
    id: {type: GraphQLString},
    name: {type: GraphQLString},
    milk: {type: GraphQLString},
  })
})

