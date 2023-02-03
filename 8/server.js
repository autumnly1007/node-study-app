const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();

const schema = buildSchema(`
  type Query {
    description: String
    name: String
  }
`);

const root = {
  description: 'Hello World',
  name: 'Cat',
};

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log('앱 실행!');
});
