import { FastifyInstance } from 'fastify';
import { City } from '../entities/city';

export function registerCountryApi(fastify: FastifyInstance) {
  fastify.get('/city', async () => {
    const cityRepository = fastify.orm.getRepository(City);

    try {
      const cities = await cityRepository.find();

      return cities;
    } catch (error) {
      if (error instanceof Error) {
        console.warn(error.message);
        return;
      }
      console.warn(error);
    }
  });
}
