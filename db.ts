import { FastifyInstance } from 'fastify';

import postgres from '@fastify/postgres';

import 'dotenv/config';

export async function registerDb(fastify: FastifyInstance) {
  fastify.register(postgres, {
    connectionString: process.env.DB_POSTGRES_STRING,
  });
}
