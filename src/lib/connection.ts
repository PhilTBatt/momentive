import { neon } from '@neondatabase/serverless'
import { Pool } from 'pg'

const connectionString = process.env.DATABASE_URL
if (!connectionString) throw new Error('DATABASE_URL is not defined')

let client: ReturnType<typeof neon> | Pool
if (connectionString.includes('neon.tech')) {
  client = neon(connectionString)
} else {
  client = new Pool({ connectionString })
}

async function query(text: string, params?: any[]) {
  if ('query' in client) {
    if (client instanceof Pool) {
      const result = await client.query(text, params)
      return result.rows
    } else {
      return await client.query(text, params)
    }
  }
  throw new Error('Invalid DB client')
}

export default { query }