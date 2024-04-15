import { pg } from './postgres';

describe('Postgres configuration', () => {
  test('should connect to the database', async () => {
    let client;
    try {
      client = await pg.connect();
      expect(client).toBeDefined();
    } catch (error) {
      fail(`Failed to connect to the database: ${error}`);
    } finally {
      if (client) client.release();
    }
  });
});
