import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import db from './db.js';
import { typeDefs } from './schema.js';

const resolvers = {
    Query: {
        games(){
            return db.games
        },
        game(_, args){
        return db.games.find((game) => game.id === args.id);
        },
        authors(){
            return db.authors
        },
        reviews(){
            return db.reviews
        },
        review(_, args){
            return db.reviews.find((review) => review.id === args.id);
        },
        author(_, args){
            return db.authors.find((author) => author.id === args.id);
        },

    },
    Mutation:{
        addGame(_, args){
            let game ={
                ...args.game,
                id: Math.floor(Math.random() * 10000).toString()
            }
            db.games.push(game)

            return game
        },
        deleteGame(_, args){
            db.games = db.games.filter((g) => g.id !== args.id)
            return db.games;
        },
        updateGame(_, args){
            db.games = db.games.map((g) => {
                if(g.id === args.id){
                    return {...g , ...args.edits}
                }
                return g
            })
            return db.games.find((g) => g.id === args.id)
        }
        }
    
}
const server = new ApolloServer({typeDefs, resolvers })

const { url } = await startStandaloneServer(server, { listen: { port: 4000 } })

console.log("Server ready at port", 4000);