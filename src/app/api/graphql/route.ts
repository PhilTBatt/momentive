import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { typeDefs } from "../../../graphql/schema";
import { resolvers } from "../../../graphql/resolvers";
import { EventAPI } from "@/graphql/datasources/events-api";
import { UserAPI } from "@/graphql/datasources/users-api";

const server = new ApolloServer({ typeDefs, resolvers })

const handler = startServerAndCreateNextHandler(server, {
  context: async () => {
    const { cache } = server
    return {
      dataSources: {
        eventAPI: new EventAPI({ cache }),
        userAPI: new UserAPI({ cache })
      }
    }
  }
})

export {
  handler as GET,
  handler as POST,
  handler as PUT,
  handler as PATCH,
  handler as DELETE
}