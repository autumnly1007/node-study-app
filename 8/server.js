const { loadFilesSync } = require('@graphql-tools/load-files');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const path = require('path');

const app = express();

const schemaString = `
  type Query {
    posts: [Post]
    comments: [Comment]
  }
  
  type Post {
    id: ID!
    title: String!
    description: String!
    comments: [Comment]
  }
  
  type Comment {
    id: ID!
    text: String!
    likes: Int
  }
`;

const loadedTypes = loadFilesSync('**/*', {
  extensions: ['graphql'],
});

const loadedResolvers = loadFilesSync(path.join(__dirname, '**/*.resolvers.js'));

const schema = makeExecutableSchema({
  typeDefs: [loadedTypes],
  resolvers: loadedResolvers,
});

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log('앱 실행!');
});
