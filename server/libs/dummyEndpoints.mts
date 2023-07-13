import * as dotenv from 'dotenv';

import type { FastifyPluginCallback } from 'fastify';

dotenv.config();

const convertHexToDecArray = (hex: string) =>
  hex.split('').map((letter) => parseInt(letter, 16));

const dummyResult: number[] = process.env['PUBLIC_MOCK_RESULT']
  ? convertHexToDecArray(process.env['PUBLIC_MOCK_RESULT'])
  : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

export const dummyEndpoints: FastifyPluginCallback = (
  fastify,
  _options,
  done,
) => {
  fastify.get('/api/health', () => true);

  fastify.post('/api/parse', () => ({
    result: dummyResult,
  }));

  done();
};
