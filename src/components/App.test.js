import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('App Component', () => {
  beforeEach(() => render(<App />));

  test('タイトルがレンダーされている', () => {
    const title = screen.getByTestId('title');
    expect(title).toHaveTextContent('NS-TYPING');
  });

  test('プレイ画面に遷移する', async () => {
    const user = userEvent.setup();

    await user.click(screen.getByRole('button', {name: 'プレイする'}));

    const header = screen.getByText('表示された数字または記号のキーを押してください');
    expect(header).toBeInTheDocument();
  });

  test('プレイ画面からタイトル画面に遷移する', async () => {
    const user = userEvent.setup();

    await user.click(screen.getByRole('button', {name: 'プレイする'}));

    await user.click(screen.getByRole('button', {name: 'タイトルに戻る'}));

    const title = screen.getByRole('heading', {name: 'NS-TYPING'});
    expect(title).toBeInTheDocument();
  });
  
  test('ゲームがクリアでき、その後タイトルに戻ることができる', async () => {
    const user = userEvent.setup();

    await user.click(screen.getByRole('button', {name: 'プレイする'}));
    
    for (let i = 0; i < 10; i++) {
      const key = await screen.getByTestId('character').textContent;
      await user.keyboard(key);
    }
    
    expect(screen.getByText('結果')).toBeInTheDocument();

    await user.click(screen.getByRole('button', {name: 'タイトルに戻る'}));

    const title = screen.getByRole('heading', {name: 'NS-TYPING'});
    expect(title).toBeInTheDocument();
  });
});

