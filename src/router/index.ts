import { FastifyInstance, FastifyRequest } from 'fastify';

import * as cities from '@/controllers/cities';
import * as postalCodes from '@/controllers/postal-code';
import * as countries from '@/controllers/countries';
import * as upload from '@/controllers/upload';

import { Query } from '@/utilities/pagination';

export function registerRouter(fastify: FastifyInstance) {
  fastify.route({
    method: 'GET',
    url: '/city',
    handler: (req: FastifyRequest<{ Querystring: Query }>) => cities.index(fastify, req),
  });
  fastify.route({
    method: 'GET',
    url: '/city/:id',
    handler: (req: FastifyRequest<{ Params: { id: string } }>) => cities.show(fastify, req),
  });
  fastify.route({
    method: 'GET',
    url: '/country',
    handler: () => countries.index(fastify),
  });
  fastify.route({
    method: 'GET',
    url: '/postal-code',
    handler: (req: FastifyRequest<{ Querystring: Query }>) => postalCodes.index(fastify, req),
  });
  fastify.route({
    method: 'POST',
    url: '/upload',
    handler: (req: FastifyRequest) => upload.index(fastify, req),
  });
}
