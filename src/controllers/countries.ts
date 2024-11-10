import { FastifyInstance } from 'fastify';

import { Country } from '@/entities/country';

export async function index(fastify: FastifyInstance) {
  const countryRepository = fastify.orm.getRepository(Country);

  try {
    const countries = await countryRepository.find();

    return countries;
  } catch (error) {
    if (error instanceof Error) {
      console.warn(error.message);
      return;
    }
    console.warn(error);
  }
}
