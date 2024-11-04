import 'reflect-metadata';
import { FastifyInstance } from 'fastify';

import dbConnection from 'typeorm-fastify-plugin';

import 'dotenv/config';

import { Country } from '../entities/country';
import { City } from '../entities/city';
import { Region } from '../entities/region';
import { SubRegion } from '../entities/sub-region';

export async function registerDb(fastify: FastifyInstance) {
  fastify.register(dbConnection, {
    type: (process?.env?.DB_TYPE as 'mysql' | 'mariadb' | 'postgres' | 'sqlite' | undefined) ?? 'postgres',
    host: process?.env?.DB_HOST ?? 'localhost',
    port: Number(process?.env?.DB_PORT) || 5432,
    username: process.env.DB_USER ?? 'postgres',
    password: process.env.DB_PASSWORD ?? '123',
    database: process.env.DB_DATABASE ?? 'world',
    synchronize: true,
    logging: false,
    entities: [Country, Region, SubRegion, City],
  });
}
