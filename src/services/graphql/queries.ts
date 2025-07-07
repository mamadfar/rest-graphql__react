import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query GetUsers {
    users {
      data {
        id
        name
        username
        email
        phone
        website
      }
    }
  }
`;

export const GET_USER_BY_ID = gql`
  query GetUserById($id: ID!) {
    user(id: $id) {
      id
      name
      username
      email
      phone
      website
    }
  }
`;
