import cors from '@fastify/cors';
import * as dotenv from 'dotenv';
import Fastify from 'fastify';

import { dummyEndpoints } from './libs/dummyEndpoints.mjs';
import { endpoints } from './libs/endpoints.mjs';

dotenv.config();

const port = process.env['PUBLIC_MOCK_PORT']
  ? parseInt(process.env['PUBLIC_MOCK_PORT'], 10)
  : 5050;

const server = Fastify({ logger: true });

if (process.env['PUBLIC_MOCK_TRANSFER'] === 'true') server.register(endpoints);
else server.register(dummyEndpoints);

await server.register(cors, {
  origin: '*',
});

await server.ready();

await server.listen({ port, host: '0.0.0.0' });

console.log();
