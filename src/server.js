import { rest } from 'msw';
import { setupServer } from 'msw/node';

const handlers = rest.get('http://api.tetsu19n1101087-game.local', (req, res, ctx) => {
  const characterList = '0123456789!"#$%&\'()-=^~¥|@`[]{};+:*,<>./\\?'.split(
    ''
  );
  let randomList = [];
  for (let i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * characterList.length);
    const randomElement = characterList.splice(randomIndex, 1)[0];
    randomList.push(randomElement);
  }

  return res(
    ctx.json(randomList)
  );
});

export const server = setupServer(handlers);