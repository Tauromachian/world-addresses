import Fastify from 'fastify';

import process from 'node:process';

import { registerDb } from './config/db';

const fastify = Fastify({
  logger: true,
  bodyLimit: 104857600,
});

registerDb(fastify);

(async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
})();
