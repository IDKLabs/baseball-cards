import gql from 'graphql-tag';

export default gql`
  query($email: String) {
    typeformResponse(email: $email): String
  }
`;


//   {
//     me {
//       id
//       username
//       email
//       role
//     }
//   }
// `;


// const GET_PAGINATED_MESSAGES_WITH_USERS = gql`
//   query($cursor: String, $limit: Int!) {
//     messages(cursor: $cursor, limit: $limit)
//       @connection(key: "MessagesConnection") {
//       edges {
//         id
//         text
//         createdAt
//         user {
//           id
//           username
//         }
//       }
//       pageInfo {
//         hasNextPage
//         endCursor
//       }
//     }
//   }
// `;
