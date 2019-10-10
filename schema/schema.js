const graphql = require('graphql')
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
    seed:{type: GraphQLString},
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
    user: {type:GraphQLString},
    game: {type:GraphQLString},
    winner: {type:GraphQLString},
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
      type: new GraphQLList(MessageType),
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
      async resolve(parent,args){
        const user = await User.findById(args.id);

        user.handle = args.handle != null ? args.handle : user.handle
        user.email = args.email != null ? args.email : user.email

        return user.save()
      }
    },
    deleteUser:{
      type: UserType,
      args:{
        id: {type:GraphQLID}
      },
      resolve(parent,args){
        return User.findByIdAndDelete(args.id)
      }
    },
    addGame:{
      type: GameType,
      args:{
        seed: {type: GraphQLString}
      },
      resolve(parent,args){
        let game = new Game({
          seed: args.seed,
        })
        return game.save()
      }
    },
    updateGame:{
      type: GameType,
      args:{
        id: {type: GraphQLID},
        seed: {type: GraphQLString}
      },
      async resolve(parent,args){
        const game = await Game.findById(args.id);

        game.seed = args.seed != null ? args.seed : game.seed

        return game.save()
      }
    },
    deleteGame:{
      type: GameType,
      args:{
        id: {type:GraphQLID}
      },
      resolve(parent,args){
        return Game.findByIdAndDelete(args.id)
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
    updateMessage:{
      type: MessageType,
      args:{
        id: {type: GraphQLID},
        type : {type: GraphQLString},
        msg: {type: GraphQLString},
      },
      async resolve(parent,args){
        const message = await Message.findById(args.id);

        message.type = args.type != null ? args.type : message.type
        message.msg = args.msg != null ? args.msg : message.msg

        return message.save()
      }
    },
    deleteMessage:{
      type: MessageType,
      args:{
        id: {type:GraphQLID}
      },
      resolve(parent,args){
        return Message.findByIdAndDelete(args.id)
      }
    },
    addMatch:{
      type: MatchType,
      args:{
        user: {type: GraphQLID},
        game: {type: GraphQLID},
        winner: {type: GraphQLID},
      },
      resolve(parent,args){
        let match = new Match({
          user: args.user,
          game: args.game,
          winner: args.winner,
        })
        return match.save()
      }
    },
    updateMatch:{
      type: MatchType,
      args:{
        id: {type: GraphQLID},
        user : {type: GraphQLString},
        game: {type: GraphQLString},
        winner: {type: GraphQLString},
      },
      async resolve(parent,args){
        const match = await Match.findById(args.id);

        match.user = args.user != null ? args.user : match.user
        match.game = args.game != null ? args.game : match.game
        match.winner = args.winner != null ? args.winner : match.winner

        return match.save()
      }
    },
    deleteMatch:{
      type: MatchType,
      args:{
        id: {type:GraphQLID}
      },
      resolve(parent,args){
        return Match.findByIdAndDelete(args.id)
      }
    },
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
