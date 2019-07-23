const graphql = require('graphql')

const {
  GraphQLObjectType, 
  GraphQLString, 
  GraphQLSchema,
  GraphQLList,
  GraphQLID, // params can use integer or string type
} = graphql

// dummy data
let cheeses = [
  {name: "Gouda", milk: "goat", id: "1", producerIDs: ["1","2"]},
  {name: "Cheddar", milk: "cow", id: "2", producerIDs: ["2"]},
  {name: "Feta", milk: "goat", id: "3", producerIDs: ["1","2","3"]},
]

let producers = [
  {name: "Saputo", country: "Canada", id: "1"},
  {name: "Meiji", country: "Japan", id: "2"},
  {name: "Danone", country: "France", id: "3"},
]

const CheeseType = new GraphQLObjectType({
  name: 'Cheese',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    milk: {type: GraphQLString},
    producer: {
      type: GraphQLList(ProducerType),
      resolve(parent, args){
        producerList = []
        // loop parent.producerID
        for (let searchID of parent.producerIDs) {
          // loop list of producers
          for (let producer of producers) {
            if (producer.id === searchID) {
              producerList.push(producer)
            }
          }
        }
        return producerList
      }
    }
  })
})

const ProducerType = new GraphQLObjectType({
  name: 'Producer',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    country: {type: GraphQLString},
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    cheese: {
      type: CheeseType,
      args: {id:{type:GraphQLID}},
      resolve(parent, args){
        // Code to get data from DB/other source
        for (let i of cheeses) {
          if (i.id === args.id) {
            return i
          }
        }

      }
    },
    producer: {
      type: ProducerType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args){
        for (let i of producers) {
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