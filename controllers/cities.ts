import { FastifyInstance, FastifyRequest } from 'fastify';
import { City } from '../entities/city';

export async function index(fastify: FastifyInstance) {
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
