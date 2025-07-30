import gql from 'graphql-tag'


export const typeDefs = gql`
    """Root query type for retrieving users and events"""
    type Query {
        """Retrieve all users"""
        users: [User!]!

        """Retrieve a user by their ID"""
        user(id: ID!): User

        """Retrieve all events"""
        events: [Event!]!

        """Retrieve an event by its ID"""
        event(id: ID!): Event
    }

    """Root mutation type for creating and modifying data"""
    type Mutation {
        """Create a new user"""
        createUser(input: CreateUserInput!): User

        """Create a new event"""
        createEvent(input: CreateEventInput!): Event

        """Update an existing event"""
        updateEvent(id: ID!, input: UpdateEventInput!): Event

        """Delete an event by its ID"""
        deleteEvent(id: ID!): String

        """Sign in a user using credentials"""
        signIn(input: SignInInput!): Boolean!

        """Add an attendee to an event"""
        addAttendee(eventId: ID!, input: AddAttendeeInput!): Event

        """Remove an attendee from an event"""
        removeAttendee(eventId: ID!, input: AddAttendeeInput!): Event
    }

    """Represents a user of the system"""
    type User {
        """Unique identifier for the user"""
        id: ID!

        """Full name of the user"""
        name: String!

        """Email address of the user"""
        email: String!

        """Events created by this user"""
        events: [Event!]!
    }

    """Represents an event in the system"""
    type Event {
        """Unique identifier for the event"""
        id: ID!

        """Title of the event"""
        title: String!

        """Detailed description of the event"""
        description: String!

        """Topic of the event"""
        topic: String!

        """Location where the event is held"""
        location: String!

        """Date of the event"""
        date: String!

        """User ID of the event creator"""
        createdBy: String!

        """List of attendees for the event"""
        attendees: [Attendee!]!
    }

    """Represents an attendee of an event"""
    type Attendee {
        """Full name of the attendee"""
        name: String!

        """Email address of the attendee"""
        email: String!
    }

    """Input data for creating a new user"""
    input CreateUserInput {
        """Full name of the new user"""
        name: String!

        """Email address of the new user"""
        email: String!

        """Password for the new user"""
        password: String!

        """Staff code for verification"""
        staffCode: String!
    }

    """Input data for creating a new event"""
    input CreateEventInput {
        """Unique ID for the event"""
        id: ID!

        """Title of the event"""
        title: String!

        """Detailed description of the event"""
        description: String!

        """Topic of the event"""
        topic: String!

        """Location where the event will take place"""
        location: String!

        """Date of the event"""
        date: String!
    }

    """Input data for updating an existing event"""
    input UpdateEventInput {
        """Updated title of the event"""
        title: String!

        """Updated description of the event"""
        description: String!

        """Updated topic of the event"""
        topic: String!

        """Updated location of the event"""
        location: String!

        """Updated date of the event"""
        date: String!
    }

    """Input data for signing in"""
    input SignInInput {
        """User ID"""
        id: ID!

        """Email used to sign in"""
        email: String!

        """Password used to sign in"""
        password: String!
    }

    """Input data for adding or removing an attendee"""
    input AddAttendeeInput {
        """Full name of the attendee"""
        name: String!

        """Email address of the attendee"""
        email: String!
    }
`