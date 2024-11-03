import { FastifyInstance } from 'fastify';
import { Country } from '../entities/country';

export function registerCountryApi(fastify: FastifyInstance) {
  fastify.get('/', async function () {
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
  });
}
