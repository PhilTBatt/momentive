import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { typeDefs } from "../../../graphql/schema";
import { resolvers } from "../../../graphql/resolvers";
import { EventAPI } from "@/graphql/datasources/events-api";
import { UserAPI } from "@/graphql/datasources/users-api";
import { NextRequest } from "next/server";

const server = new ApolloServer({ typeDefs, resolvers })

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req) => {
    const { cache } = server
    return {
      req,
      dataSources: {
        eventAPI: new EventAPI({ cache }),
        userAPI: new UserAPI({ cache })
      }
    }
  }
})

export const GET = (req: Request, ctx: any) => handler(req, ctx)
export const POST = (req: Request, ctx: any) => handler(req, ctx)
export const PUT = (req: Request, ctx: any) => handler(req, ctx)
export const PATCH = (req: Request, ctx: any) => handler(req, ctx)
export const DELETE = (req: Request, ctx: any) => handler(req, ctx)