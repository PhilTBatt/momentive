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
        },
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