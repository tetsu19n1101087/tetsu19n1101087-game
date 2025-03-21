/**
 * @jest-environment node
 */

import { NextRequest, NextResponse } from 'next/server';
import * as generateRoute from '@/app/api/generate/route';
import * as resultsRoute from '@/app/api/results/route';

describe('Route Handler', () => {
  describe('/api/generate', () => {
    it('タイピングリストが返ってくる', async () => {
      const request = new NextRequest('http://localhost:3000/api/generate');

      const response = await generateRoute
        .GET(request)
        .then((res: NextResponse) => {
          expect(res.status).toBe(200);
          return res.json();
        });

      expect(response.typingList).toHaveLength(10);
    });
  });

  describe('/api/results', () => {
    it('結果が返ってくる', async () => {
      const request = new NextRequest('http://localhost:3000/api/results');

      const response = await resultsRoute
        .GET(request)
        .then((res: NextResponse) => {
          expect(res.status).toBe(200);
          return res.json();
        });

      expect(response.results).toHaveLength(2);

      response.results.forEach((result) => {
        expect(result).toHaveProperty('time');
        expect(result).toHaveProperty('correctTypingNumber');
        expect(result).toHaveProperty('average');
        expect(result).toHaveProperty('missTypingNumber');
        expect(result).toHaveProperty('accuracy');
      });
    });
  });
});
