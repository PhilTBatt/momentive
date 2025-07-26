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
        updateEvent(id: ID!, input: UpdateEventInput!): Event
        deleteEvent(id: ID!): String
        signIn(input: SignInInput!): Boolean
        addAttendee(eventId: ID!, input: AddAttendeeInput!): Event
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
        topic: String!
        location: String!
        date: String!
        createdBy: String!
    }

    input CreateUserInput {
        name: String!
        email: String!
        password: String!
    }

    input CreateEventInput {
        title: String!
        description: String!
        topic: String!
        location: String!
        date: String!
        createdBy: String!
    }

    input UpdateEventInput {
        title: String!
        description: String!
        topic: String!
        location: String!
        date: String!
    }

    input SignInInput {
        id: ID!
        email: String!
        password: String!
    }

    input AddAttendeeInput {
        name: String!
        email: String!
    }
`