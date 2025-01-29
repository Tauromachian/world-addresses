import { FastifyInstance, FastifyRequest } from 'fastify';

import { City } from '@/entities/city';

import { paginate, Query } from '@/utilities/pagination';

export async function index(fastify: FastifyInstance, req: FastifyRequest<{ Querystring: Query }>) {
  const cityRepository = fastify.orm.getRepository(City);

  return paginate(cityRepository, req.query, { searchableColumns: ['name'] });
}

export async function show(
  fastify: FastifyInstance,
  req: FastifyRequest<{ Params: { id: string } }>,
) {
  const cityRepository = fastify.orm.getRepository(City);
  const id = +req.params.id;

  try {
    const cities = await cityRepository.findOneBy({ id });

    return cities;
  } catch (error) {
    if (error instanceof Error) {
      console.warn(error.message);
      return;
    }
    console.warn(error);
  }
}
