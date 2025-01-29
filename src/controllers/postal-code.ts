import { FastifyInstance, FastifyRequest } from 'fastify';

import { ZipCode } from '@/entities/zipcode';
import { paginate, Query } from '@/utilities/pagination';

export async function index(fastify: FastifyInstance, req: FastifyRequest<{ Querystring: Query }>) {
  const postalCodeRepository = fastify.orm.getRepository(ZipCode);

  return paginate(postalCodeRepository, req.query, {
    searchableColumns: ['code'],
  });
}
