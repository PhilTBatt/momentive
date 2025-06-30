import gql from 'graphql-tag'

export const typeDefs = gql`
    type Query {
        users: [User!]!
        user(id: ID!): User
        events: [Event!]!
        event(id: ID!): Event
    }

    type Mutation {
        createUser(input: CreateUserInput!): User
        createEvent(input: CreateEventInput!): Event
    }

    type User {
        id: ID!
        name: String!
        email: String!
        events: [Event!]!
    }

    type Event {
        id: ID!
        title: String!
        description: String!
        location: String!
        date: String!
        createdBy: String!
    }

    input CreateUserInput {
        name: String!
        email: String!
    }

    input CreateEventInput {
        title: String!
        description: String!
        location: String!
        date: String!
        createdBy: String!
    }
`