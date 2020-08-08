import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/',
});

const client = new ApolloClient({
  connectToDevTools: true, // no es necesario
  cache: new InMemoryCache(),
  link: httpLink,
});

export default client;
