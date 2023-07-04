import Fastify from 'fastify';

import { endpoints } from './endpoints.mjs';

const server = Fastify({ logger: true });

server.register(endpoints);

export { server };
