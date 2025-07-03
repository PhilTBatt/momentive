import { Resolvers } from './__generated__/types';

export const resolvers: Resolvers = {
    Query: {
    events: async (_, __, { dataSources }) => dataSources.EventAPI.getEvents(),
    event: async (_, { id }, { dataSources }) => dataSources.EventAPI.getEvent(id),
    users: async (_, __, { dataSources }) => dataSources.UserApi.getUsers(),
    user: async (_, { id }, { dataSources }) => dataSources.UserApi.getUser(id)
  },
    Event: {
        createdBy: ({ createdBy }, _, { dataSources }) => dataSources.getUsers.getUser(createdBy),
    },
    User: {
        events: ({ id }, _, { dataSources }) => dataSources.EventAPI.getEvent(id)
    }
}