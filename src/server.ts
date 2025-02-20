import { rest } from 'msw';
import { setupServer } from 'msw/node';

const results = [
  {
    _id: '679b87be079edf64c184310c',
    time: 11.533,
    correctTypingNumber: 10,
    average: 0.867077083152692,
    missTypingNumber: 0,
    accuracy: 100,
    createdAt: '2025-01-30T14:07:58.610Z',
    updatedAt: '2025-01-30T14:07:58.610Z',
    __v: 0,
  },
  {
    _id: '679b876d079edf64c1843109',
    time: 18.611,
    correctTypingNumber: 10,
    average: 0.537316640696362,
    missTypingNumber: 0,
    accuracy: 100,
    createdAt: '2025-01-30T14:06:37.921Z',
    updatedAt: '2025-01-30T14:06:37.921Z',
    __v: 0,
  },
];

const handlers = [
  rest.get('http://localhost:3001/generate', (req, res, ctx) => {
    const characterList = '0123456789!"#$%&\'()-=^~¥|@`[]{};+:*,<>./\\?'.split(
      ''
    );
    let randomList = [];
    for (let i = 0; i < 10; i++) {
      const randomIndex = Math.floor(Math.random() * characterList.length);
      const randomElement = characterList.splice(randomIndex, 1)[0];
      randomList.push(randomElement);
    }

    return res(ctx.json(randomList));
  }),

  rest.get('http://localhost:3001/results', (req, res, ctx) => {
    return res(ctx.json(results));
  }),
];

export const server = setupServer(...handlers);
