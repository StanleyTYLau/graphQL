const graphql = require('graphql')

const {GraphQLObjectType, GraphQLString, GraphQLSchema} = graphql

// dummy data
let cheeses = [
  {name: "Mozerlla", milk: "cow", id: "1"},
  {name: "Cheddar", milk: "cow", id: "2"},
  {name: "Blue", milk: "goat", id: "3"},
]

const CheeseType = new GraphQLObjectType({
  name: 'Cheese',
  fields: () => ({
    id: {type: GraphQLString},
    name: {type: GraphQLString},
    milk: {type: GraphQLString},
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    cheese: {
      type: CheeseType,
      args: {id:{type:GraphQLString}},
      resolve(parent, args){
        // Code to get data from DB/other source
        for (let i of cheeses) {
          if (i.id === args.id) {
            return i
          }
        }

      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
})