import { Pool } from 'pg'

export const pg = new Pool({
  host: '127.0.0.1',
  port: 5432,
  database: 'threewygo',
  user: 'docker',
  password: 'docker',
})