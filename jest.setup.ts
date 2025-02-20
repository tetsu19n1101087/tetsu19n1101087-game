import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';
import { server } from '@/server';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

beforeAll(() => {
  // Establish requests interception layer before all tests.
  server.listen();
});

afterAll(() => {
  // Clean up after all tests are done, preventing this
  // interception layer from affecting irrelevant tests.
  server.close();
});
