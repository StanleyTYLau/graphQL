const graphql = require('graphql')
const Cheese = require('../models/cheese')
const Producer = require('../models/producer')


const {
  GraphQLObjectType, 
  GraphQLString, 
  GraphQLSchema,
  GraphQLList,
  GraphQLID, // params can use integer or string type
} = graphql

// dummy data
// let cheeseDB = [
//   {name: "Gouda", milk: "goat", id: "1", producerID: "1"},
//   {name: "Cheddar", milk: "cow", id: "2", producerID: "2"},
//   {name: "Feta", milk: "goat", id: "3", producerID: "3"},
//   {name: "Asiago", milk: "goat", id: "4", producerID: "1"},
//   {name: "Mozzarella", milk: "cow", id: "5", producerID: "3"},
//   {name: "Havarti", milk: "goat", id: "6", producerID: "3"},

// ]

// let producerDB = [
//   {name: "Saputo", country: "Canada", id: "1"},
//   {name: "Meiji", country: "Japan", id: "2"},
//   {name: "Danone", country: "France", id: "3"},
// ]

const CheeseType = new GraphQLObjectType({
  name: 'Cheese',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    milk: {type: GraphQLString},
    producer: {
      type: ProducerType,
      resolve(parent, args){
        for (let producer of producerDB) {
          if (producer.id === parent.producerID) {
            return producer
          }
        }
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
    cheese: {
      type: new GraphQLList(CheeseType),
      resolve(parent, args) {
        cheeseList = []
        for (let cheese of cheeseDB) {
          if (cheese.producerID === parent.id) {
            cheeseList.push(cheese)
          }
        }
        return cheeseList
      }
    }
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
        // for (let i of cheeseDB) {
        //   if (i.id === args.id) {
        //     return i
        //   }
        // }

      }
    },
    cheeses: {
      type: new GraphQLList(CheeseType),
      resolve(parent, args) {
        // return cheeseDB
      }
    },
    producer: {
      type: ProducerType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args){
        // for (let i of producerDB) {
        //   if (i.id === args.id) {
        //     return i
        //   }
        // }
      }
    },
    producers: {
      type: new GraphQLList(ProducerType),
      resolve(parent, args) {
        // return producerDB
      }
    },

  }
})

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addProducer: {
      type: ProducerType,
      args: {
        name: {type: GraphQLString},
        country: {type: GraphQLString}
      },
      resolve(parent, args){
        let producer = new Producer({
          name: args.name,
          country: args.country
        })
        return producer.save()
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})