// src/database/data-source.database.ts
import { DataSource } from 'typeorm'
import * as dotenv from 'dotenv'

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config({ path: __dirname + '/../../.env' })

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT, 10),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migration/*{.ts,.js}'],
})
