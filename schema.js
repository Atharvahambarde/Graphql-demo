export const typeDefs = `#graphql
type Game{
    id : ID!
    title: String!
    platform: [String!]!
}
type Review{
    id : ID!
    rating: Int!
    content: String!
}
type Author{
    id : ID!
    name: String!
    verified: Boolean!
}
type Query{
    reviews: [Review]
    review(id: ID!) : Review
    game(id: ID!) : Game
    author(id: ID!) : Author
    games: [Game]
    authors: [Author]
}
type Mutation {
    addGame(game: AddGameInput!) : Game
    updateGame(id: ID!, edits: EditGameInput!) : Game
      deleteGame(id: ID!): [Game]
}
input AddGameInput{
  title: String!,
  platform: [String!]!
}
input EditGameInput{
  title: String,
  platform: [String!]
}
`