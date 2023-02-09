const { loadFilesSync } = require('@graphql-tools/load-files');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { ApolloServer } = require('@apollo/server');
const express = require('express');
const path = require('path');
const { json } = require('body-parser');
const cors = require('cors');
const { expressMiddleware } = require('@apollo/server/express4');

const loadedTypes = loadFilesSync('**/*', {
  extensions: ['graphql'],
});

const loadedResolvers = loadFilesSync(path.join(__dirname, '**/*.resolvers.js'));

async function startApolloServer() {
  const app = express();

  const schema = makeExecutableSchema({
    typeDefs: [loadedTypes],
    resolvers: loadedResolvers,
  });

  const server = new ApolloServer({
    schema,
  });
  await server.start();

  app.use(
    '/graphql',
    cors(),
    json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({ token: req.headers.token }),
    })
  );

  app.listen(4000, () => {
    console.log('앱 실행!');
  });
}

startApolloServer();
