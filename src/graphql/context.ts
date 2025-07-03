import { EventAPI } from '@/graphql/datasources/events-api'
import { UserAPI } from '@/graphql/datasources/users-api'

export interface MyContext {
  dataSources: {
    eventAPI: EventAPI
    userAPI: UserAPI
  }
}