import { RESTDataSource } from '@apollo/datasource-rest'
import { User, CreateUserInput } from '../__generated__/types'

export class UserAPI extends RESTDataSource {
  baseURL = 'http://localhost:3000/api/'

  async getUsers(params?: Partial<{
    order: string
    limit: number
    page: number
  }>): Promise<{ users: User[] }> {
    const stringParams = new URLSearchParams(Object.entries(params ?? {}).map(([k, v]) => [k, String(v)]))
    return this.get('users', {params: stringParams})
  }

  async getUser(id: string): Promise<{ user: User }> {
    return this.get(`users/${id}`)
  }

  async getUserByEmail(email: string): Promise<{ user: User }> {
    return this.post('users/email', { body: { email } })
  }

  async createUser(input: CreateUserInput): Promise<{ user: User }> {
    return this.post('users', { body: input })
  }

  async updateUser(id: string, input: Partial<CreateUserInput>): Promise<{ user: User }> {
    return this.patch(`users/${id}`, { body: input })
  }

  async deleteUser(id: string): Promise<{ msg: string }> {
    return this.delete(`users/${id}`)
  }

  async signIn(input: { id: string; email: string; password: string }): Promise< {success: boolean} > {
    return this.post('users/authenticate', { body: input })
  }
}