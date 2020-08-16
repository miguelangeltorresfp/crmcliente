import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from 'apollo-link-context';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/',
});

const authLink = setContext((_, { headers }) => {
  // Leer el storage almacenado
  const token = localStorage.getItem('token');

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  connectToDevTools: true, // no es necesario
  cache: new InMemoryCache({
    // Para eliminar el warning cuando se elimina una objecto de un array en el cache [link](https://github.com/apollographql/apollo-client/pull/6372)
    typePolicies: {
      Query: {
        fields: {
          obtenerClientesVendedor: {
            merge: false,
          },
        },
      },
    },
  }),
  link: authLink.concat(httpLink),
});

export default client;
