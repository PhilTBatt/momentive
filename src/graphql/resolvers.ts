import { Resolvers } from './__generated__/types';

export const resolvers: Resolvers = {
    Query: {
        events: async (_, __, { dataSources }) => {
            const response = await dataSources.eventAPI.getEvents()
            return response.events
        },
        event: async (_, { id }, { dataSources }) => {
            const response = await dataSources.eventAPI.getEvent(id)
            return response.event
        },
        users: async (_, __, { dataSources }) => {
            const response = await dataSources.userAPI.getUsers()
            return response.users
        },
        user: async (_, { id }, { dataSources }) => {
            const response = await dataSources.userAPI.getUser(id)
            return response.user
        }
    },

    Mutation: {
        createUser: async (_, { input }, { dataSources }) => {
            const response = await dataSources.userAPI.createUser(input)
            return response.user
        },
        createEvent: async (_, { input }, { dataSources }) => {
            const response = await dataSources.eventAPI.createEvent(input)
            return response.event
        },
        updateEvent: async (_, { id, input }, { dataSources }) => {
            const response = await dataSources.eventAPI.updateEvent(id, input)
            return response.event
        },
        deleteEvent: async (_, { id }, { dataSources }) => {
            const response = await dataSources.eventAPI.deleteEvent(id)
            return response.msg
        },
        signIn: async (_, { input }, { dataSources }) => {
            return dataSources.userAPI.signIn(input)
        },
        addAttendee: async (_, { eventId, input }, { dataSources }) => {
            const response = await dataSources.eventAPI.addAttendee(eventId, input)
            return response.event
        }
    },

    Event: {
        createdBy: async ({ createdBy }, _, { dataSources }) => {
            const response = await dataSources.userAPI.getUser(createdBy)
            return response.user.id
        }
    },

    User: {
        events: async ({ id }, _, { dataSources }) => {
            const response = await dataSources.eventAPI.getEvents({ userId: id })
            return response.events
        }
    }
}