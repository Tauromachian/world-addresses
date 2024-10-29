import { FastifyInstance } from 'fastify';

export default function (fastify: FastifyInstance) {
  fastify.get('/', async function () {
    const client = await fastify.pg.connect();
    try {
      const { rows } = await client.query('SELECT * FROM cities');

      return rows;
    } finally {
      client.release();
    }
  });
}
