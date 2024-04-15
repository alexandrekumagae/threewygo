import { server } from './server';
import { FastifyInstance } from 'fastify';

describe('Fastify server', () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    app = server;
    await app.listen(3002);
  });

  afterAll(async () => {
    await app.close();
  });

  test('should start the server', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/healthz'
    });

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual('OK');
  });
});
