import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Page from '@/app/(top)/game/page';
import axios from 'axios';
import { createResult } from '@/lib/action';
import { useRouter } from 'next/navigation';

// モジュールごとモック
jest.mock('axios');
jest.mock('next/navigation');

// 部分的にモック
jest.mock('@/lib/action', () => {
  return {
    createResult: jest.fn(),
  };
});

const mockData = {
  typingList: [':', '/', '}', '3', '<', ')', '!', '=', ';', ','],
};
(axios.get as jest.Mock).mockResolvedValue({ data: mockData });

describe('Game Page', () => {
  test('テキストが描画されている', async () => {
    render(<Page />);

    const character = await screen.findByTestId('character');
    expect(character).toHaveTextContent(
      /[0123456789!"#$%&'()\-=^~¥|@`[\]{};+:*,<>./\\?]/
    );

    const header = screen.getByText(
      '表示された数字または記号のキーを押してください'
    );
    expect(header).toBeInTheDocument();

    const howMany = screen.getByText('問題数: 10');
    expect(howMany).toBeInTheDocument();

    const correctAnswer = screen.getByText(/正解数:/);
    expect(correctAnswer).toBeInTheDocument();

    const button = screen.getByRole('button', { name: 'タイトルに戻る' });
    expect(button).toBeInTheDocument();
  });

  test('正解のキーを押すと画面が変わる', async () => {
    const user = userEvent.setup();

    render(<Page />);

    const key = await screen.findByTestId('character', undefined, {
      timeout: 5000,
    });
    const character = key.textContent;
    if (character === '[') {
      await user.keyboard('[[');
    } else if (character === '{') {
      await user.keyboard('{{');
    } else {
      await user.keyboard(character);
    }
    expect(screen.getByTestId('character')).not.toHaveTextContent(character);
  });

  test('正解のキーを押すと正解数のカウントが増える', async () => {
    const user = userEvent.setup();

    render(<Page />);

    expect(await screen.findByTestId('character')).toHaveTextContent(
      /[0123456789!"#$%&'()\-=^~¥|@`[\]{};+:*,<>./\\?]/
    );

    expect(screen.getByText(/正解数:/)).toHaveTextContent('正解数: 0');

    const key = await screen.findByTestId('character', undefined, {
      timeout: 5000,
    });
    const character = key.textContent;
    if (character === '[') {
      await user.keyboard('[[');
    } else if (character === '{') {
      await user.keyboard('{{');
    } else {
      await user.keyboard(character);
    }

    const correctAnswer = await screen.findByText(/正解数:/);
    expect(correctAnswer).toHaveTextContent('正解数: 1');
  });

  test('全問題が終了したらフォームが送信される', async () => {
    const user = userEvent.setup();

    const mockAction = jest.fn();
    (createResult as jest.Mock).mockImplementation(mockAction);

    render(<Page />);

    expect(await screen.findByTestId('character')).toHaveTextContent(
      /[0123456789!"#$%&'()\-=^~¥|@`[\]{};+:*,<>./\\?]/
    );

    for (let i = 0; i < 10; i++) {
      const key = await screen.findByTestId('character', undefined, {
        timeout: 5000,
      });
      const character = key.textContent;
      if (character === '[') {
        await user.keyboard('[[');
      } else if (character === '{') {
        await user.keyboard('{{');
      } else {
        await user.keyboard(character);
      }
    }

    await waitFor(() => {
      expect(mockAction).toHaveBeenCalled();
    });
  });

  test('ボタンをクリックすると関数が呼ばれる', async () => {
    const user = userEvent.setup();

    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });

    render(<Page />);

    const button = screen.getByRole('button', { name: 'タイトルに戻る' });

    await user.click(button);
    expect(mockPush).toHaveBeenCalled();
  });
});
