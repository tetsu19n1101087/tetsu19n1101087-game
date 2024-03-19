import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

async function waitForCharacter() {
  await waitFor(() => {
    const character = screen.getByTestId('character');
    expect(character).toHaveTextContent(
      /[0123456789!"#\$%&'()\-=^~¥|@`\[\]{};\+:\*,<>\.\/\\\?]/
    );
  });
}

describe('App Component', () => {
  test('タイトルがレンダーされている', () => {
    render(<App />);
    const title = screen.getByTestId('title');
    expect(title).toHaveTextContent('NS-TYPING');
  });

  test('プレイ画面に遷移する', async () => {
    render(<App />);
    
    const user = userEvent.setup();

    await user.click(screen.getByRole('button', {name: 'プレイする'}));

    const header = screen.getByText('表示された数字または記号のキーを押してください');
    expect(header).toBeInTheDocument();
  });

  test('プレイ画面からタイトル画面に遷移する', async () => {
    render(<App />);
    
    const user = userEvent.setup();

    await user.click(screen.getByRole('button', {name: 'プレイする'}));

    await user.click(screen.getByRole('button', {name: 'タイトルに戻る'}));

    const title = screen.getByRole('heading', {name: 'NS-TYPING'});
    expect(title).toBeInTheDocument();
  });
  
  test('ゲームがクリアでき、その後タイトルに戻ることができる', async () => {
    render(<App />);
    
    const user = userEvent.setup();

    await user.click(screen.getByRole('button', {name: 'プレイする'}));
    
    await waitForCharacter();

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
    
    expect(screen.getByText('結果')).toBeInTheDocument();

    await user.click(screen.getByRole('button', {name: 'タイトルに戻る'}));

    const title = screen.getByRole('heading', {name: 'NS-TYPING'});
    expect(title).toBeInTheDocument();
  });

  test('タイトルに戻るとミスのカウントがリセットされる', async () => {
    render(<App />);
    
    const user = userEvent.setup();

    await user.click(screen.getByRole('button', {name: 'プレイする'}));
    
    await waitForCharacter();

    await user.keyboard('abc');
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
    expect(screen.getAllByRole('cell')[3]).toHaveTextContent('3');

    await user.click(screen.getByRole('button', {name: 'タイトルに戻る'}));

    await user.click(screen.getByRole('button', {name: 'プレイする'}));

    await waitForCharacter();

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
    expect(screen.getAllByRole('cell')[3]).toHaveTextContent('0');
  });
});

