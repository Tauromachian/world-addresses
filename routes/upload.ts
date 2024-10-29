import { FastifyInstance, FastifyRequest } from 'fastify';
import { UploadPayload } from '../types/upload';

export default function (fastify: FastifyInstance) {
  fastify.post('/', async function (req: FastifyRequest) {
    const client = await fastify.pg.connect();

    try {
      const population = (req.body as UploadPayload[]).splice(1, 10);

      const values = population
        .map((_, index: number) => {
          return `($${index * 5 + 1}, $${index * 5 + 2}, $${index * 5 + 3}, $${index * 5 + 4}, $${index * 5 + 5})`;
        })
        .join(',');

      const params = population.flatMap((city: UploadPayload) => [
        city.zipCode.trim() ?? '',
        city.city.trim() ?? '',
        city.name ?? '',
        city.code ?? '',
        city.county ?? '',
        city.country ?? '',
      ]);

      await client.query(`INSERT INTO cities (zipcode, city, name, code, country) VALUES ${values}`, params);

      return { msg: 'success' };
    } finally {
      client.release();
    }
  });
}
