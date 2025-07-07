import { ApolloClient, InMemoryCache } from "@apollo/client";

const GRAPHQL_API_BASE_URL = "https://graphqlzero.almansi.me/api";

export const client = new ApolloClient({
  uri: GRAPHQL_API_BASE_URL,
  cache: new InMemoryCache(),
});
