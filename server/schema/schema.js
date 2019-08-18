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
//   {name: "Gouda", milk: "goat", id: "1", producerIDs: ["1","2"]},
//   {name: "Cheddar", milk: "cow", id: "2", producerIDs: ["2","3"]},
//   {name: "Feta", milk: "goat", id: "3", producerIDs: ["1","2","3"]},
//   {name: "Asiago", milk: "goat", id: "4", producerIDs: ["1"]},
//   {name: "Mozzarella", milk: "cow", id: "5", producerIDs: ["3"]},
//   {name: "Havarti", milk: "goat", id: "6", producerIDs: ["1","3"]},
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
    producers: {
      type: GraphQLList(ProducerType),
      resolve(parent, args){
        producerList = []
        // loop parent.producerID
        for (let searchID of parent.producerIDs) {
          // Find producer & push to array
          producer = Producer.findById(searchID)
          producerList.push(producer)
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
    cheeses: {
      type: GraphQLList(CheeseType),
      resolve(parent, args) {
        // Using dummy data:
        // cheeseList = []
        // for (let cheese of cheeseDB) {
        //   if (cheese.producerIDs.includes(parent.id)) {
        //     cheeseList.push(cheese)
        //   }
        // }

        // Using mongoDB:
        return Cheese.find({producerIDs: parent.id})
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

        return Cheese.findById(args.id)
      }
    },
    cheeses: {
      type: new GraphQLList(CheeseType),
      resolve(parent, args) {
        return Cheese.find({})
      }
    },
    producer: {
      type: ProducerType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args){
        // Dummy data search:
        // for (let i of producerDB) {
        //   if (i.id === args.id) {
        //     return i
        //   }
        // }

        return Producer.findById(args.id)
      }
    },
    producers: {
      type: new GraphQLList(ProducerType),
      resolve(parent, args) {
        return Producer.find({})
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
    },
    addCheese: {
      type: CheeseType,
      args: {
        name: {type: GraphQLString},
        milk: {type: GraphQLString},
        producerIDs: {type: GraphQLList(GraphQLID)}
      },
      resolve(parent, args){
        let cheese = new Cheese({
          name: args.name,
          milk: args.milk,
          producerIDs: args.producerIDs
        })
        return cheese.save()
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})