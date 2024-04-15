import app from './server';

describe('Fastify server', () => {
  test('should start the server', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/healthz'
    });

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual('OK');
  });
});
