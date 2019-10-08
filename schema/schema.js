const graphql = require('graphql')
const _ = require('lodash')
const User = require('../models/user') 
const Match = require('../models/match') 
const Game = require('../models/game')
const Message = require('../models/message')

const {GraphQLObjectType, 
GraphQLString, 
GraphQLSchema,
GraphQLID,
GraphQLList
} = graphql

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id:{type: GraphQLID},
    handle: {type: GraphQLString, },
    email:{type: GraphQLString},
    matches: {  
      type: new GraphQLList(MatchType),
      resolve(parent,args){
        return Match.find({userId: parent.id})
      }
    },
    won:{
      type: new GraphQLList(MatchType),
      resolve(parent,args){
        return Match.find({userId: parent.id, winnerId: parent.id})
      }
    }
  })
})

const GameType = new GraphQLObjectType({
  name: 'Game',
  fields: () => ({
    id:{type: GraphQLID},
    grid:{type: GraphQLString},
    matches: {
      type: new GraphQLList(MatchType),
      resolve(parent,args){
        return Match.find({gameId: parent.id})
      }
    },
  })
})

const MessageType = new GraphQLObjectType({
  name: 'Message',
  fields: () => ({
    id:{type:GraphQLID},
    type:{type:GraphQLString},
    msg: {type: GraphQLString},
  })
})

const MatchType = new GraphQLObjectType({
  name: 'Match',
  fields: () => ({
    id:{type:GraphQLID},
    user: {type:GraphQLID},
    game: {type:GraphQLID},
    winner: {type:GraphQLID},
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user:{
      type: UserType,
      args: {id: {type: GraphQLID}},
      resolve(parent,args){
        return User.findById(args.id)
      }
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args){
        return User.find({});
      }
    },
    game:{
      type: GameType,
      args: {id: {type: GraphQLID}},
      resolve(parent,args){
        return Game.findById(args.id)
      }
    },
    games: {
      type: new GraphQLList(GameType),
      resolve(parent, args){
        return Game.find({});
      }
    },
    msg: {
      type: MessageType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args){
        return Message.findById(args.id)
      }
    },
    msgs: {
      type: MessageType,
      args: {type: {type: GraphQLString}},
      resolve(parent, args){
        return Message.find({type: args.type})
      }
    },
    match: {
      type: MatchType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args){
        return Match.find({id: args.id})
      }
    },
    matches: {
      type: new GraphQLList(MatchType),
      resolve(parent, args){
        return Match.find({})
      }
    }
  }
})

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser:{
      type: UserType,
      args:{
        handle : {type: GraphQLString},
        email: {type: GraphQLString},
      },
      resolve(parent,args){
        let user = new User({
          handle: args.handle,
          email: args.email,
        })
        return user.save()
      }
    },
    updateUser:{
      type: UserType,
      args:{
        id: {type: GraphQLID},
        handle : {type: GraphQLString},
        email: {type: GraphQLString},
      },
      resolve(parent,args){
        let user = User.findById(args.id)

        user.handle = args.handle
        user.email = args.email

        return User.update({id:args.id},user)
      }
    },
    addGame:{
      type: GameType,
      args:{
        grid: {type: GraphQLString}
      },
      resolve(parent,args){
        let game = new Game({
          grid: args.grid,
        })
        return game.save()
      }
    },
    addMessage:{
      type: MessageType,
      args:{
        type:{type:GraphQLString},
        msg: {type:GraphQLString}, 
      },
      resolve(parent,args){
        let message = new Message({
          type: args.type,
          msg: args.msg,
        })
        return message.save()
      }
    },
    addMatch:{
      type: MatchType,
      args:{
        user: {type:GraphQLID},
        game: {type:GraphQLID},
        winner: {type:GraphQLID},
      },
      resolve(parent,args){
        let match = new Match({
          user: args.type,
          game: args.msg,
          winner: args.winner,
        })
        return match.save()
      }
    }

  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});