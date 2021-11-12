import * as  dotenv from 'dotenv';
import * as path from 'path';



import { getToken } from '../src/auth'
import axios, { AxiosResponse } from 'axios'

beforeEach(() => {
  jest.resetModules() // Most important - it clears the cache
  dotenv.config({ path: path.resolve(__dirname + '/../.env.testing') });
});

describe('testing auth file', () => {
  test('get token', async () => {
    const response = await getToken(
      process.env?.CLIENT_ID as string,
      process.env?.CLIENT_SECRET as string,
    )
    expect(response.access_token).not.toBe('')
  })
})
