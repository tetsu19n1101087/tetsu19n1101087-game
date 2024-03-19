import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Play from './Play';

async function waitForCharacter() {
  await waitFor(() => {
    const character = screen.getByTestId('character');
    expect(character).toHaveTextContent(
      /[0123456789!"#\$%&'()\-=^~¥|@`\[\]{};\+:\*,<>\.\/\\\?]/
    );
  });
}

describe('Play Component', () => {
  test('テキストが描画されている', async () => {
    render(<Play setStartTime={jest.fn()} />);

    await waitForCharacter();

    const header = screen.getByText('表示された数字または記号のキーを押してください');
    expect(header).toBeInTheDocument();

    const character = screen.getByTestId('character');
    expect(character).toHaveTextContent(/[0123456789!"#\$%&'()\-=^~¥|@`\[\]{};\+:\*,<>\.\/\\\?]/);

    const howMany = screen.getByText('問題数: 10');
    expect(howMany).toBeInTheDocument();

    const correctAnswer = screen.getByText(/正解数:/);
    expect(correctAnswer).toBeInTheDocument();

    const button = screen.getByRole('button', {name: 'タイトルに戻る'});
    expect(button).toBeInTheDocument();
  });

  test('正解のキーを押すと画面が変わる', async () => {
    const user = userEvent.setup();
    
    render(<Play setStartTime={jest.fn()} />);

    await waitForCharacter();

    const key = await screen.findByTestId('character', {timeout: 5000});
    if (key.textContent == '[') {
      await user.keyboard('[[');
    } else if (key.textContent == '{') {
      await user.keyboard('{{');
    } else {
      await user.keyboard(key.textContent);
    }
    expect(screen.getByTestId('character')).not.toHaveTextContent(key);
  });

  test('正解のキーを押すと正解数のカウントが増える', async () => {
    const user = userEvent.setup();

    render(<Play setStartTime={jest.fn()} />);

    await waitForCharacter();

    expect(screen.getByText(/正解数:/)).toHaveTextContent('正解数: 0');

    const key = await screen.findByTestId('character', {timeout: 5000});
    if (key.textContent == '[') {
      await user.keyboard('[[');
    } else if (key.textContent == '{') {
      await user.keyboard('{{');
    } else {
      await user.keyboard(key.textContent);
    }
    expect(screen.getByText(/正解数:/)).toHaveTextContent('正解数: 1');
  });

  test('不正解のキーを押すとミスにカウントされる', async () => {
    const user = userEvent.setup();

    const handleMiss = jest.fn();
    render(<Play handleMiss={handleMiss} setStartTime={jest.fn()} />);

    await waitForCharacter();

    await user.keyboard('abc');
    expect(handleMiss).toHaveBeenCalledTimes(3);
  });

  test('修飾キーを押してもミスにカウントされない', async () => {
    const user = userEvent.setup();

    const handleMiss = jest.fn();
    render(<Play handleMiss={handleMiss} setStartTime={jest.fn()} />);

    await waitForCharacter();

    await user.keyboard('{Shift}');
    await user.keyboard('{Alt}');
    await user.keyboard('{Meta}');
    await user.keyboard('{Eisu}');
    await user.keyboard('{KanjiMode}');

    expect(handleMiss).not.toHaveBeenCalled();
  });

  test('タイマーが作動する', async () => {
    const user = userEvent.setup();

    const setStartTime = jest.fn();
    const setEndTime = jest.fn();
    render(<Play setStartTime={setStartTime} setEndTime={setEndTime} setStatus={jest.fn()} />);
    
    await waitForCharacter();

    expect(setStartTime).toHaveBeenCalled();

    for (let i = 0; i < 10; i++) {
      const key = await screen.findByTestId('character', {timeout: 5000});
      if (key.textContent == '[') {
        await user.keyboard('[[');
      } else if (key.textContent == '{') {
        await user.keyboard('{{');
      } else {
        await user.keyboard(key.textContent);
      }
    }

    expect(setEndTime).toHaveBeenCalled();
  });
});