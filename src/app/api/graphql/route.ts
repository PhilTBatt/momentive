import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { typeDefs } from "../../../graphql/schema";

const server = new ApolloServer({ typeDefs })

const handler = startServerAndCreateNextHandler(server, {
    context: async req => ({ req })
})

export {
  handler as GET,
  handler as POST,
  handler as PUT,
  handler as PATCH,
  handler as DELETE
}