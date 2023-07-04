import cors from '@fastify/cors';
import * as dotenv from 'dotenv';

import { server } from './server.mjs';

dotenv.config();

const port = process.env['PUBLIC_LOCAL_API_PORT']
  ? parseInt(process.env['PUBLIC_LOCAL_API_PORT'], 10)
  : 5050;

await server.register(cors, {
  origin: '*',
});

await server.ready();

await server.listen({ port });
