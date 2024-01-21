import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Top from './Top';

describe('Top Component', () => {
  test('テキストが描画されている', () => {
    render(<Top />);
    
    const title = screen.getByText('NS-TYPING');
    expect(title).toBeInTheDocument();

    const lead = screen.getByText('数字・記号専用のタイピング練習ゲーム');
    expect(lead).toBeInTheDocument();

    const button = screen.getByRole('button', {name: 'プレイする'});
    expect(button).toBeInTheDocument();
  });

  test('ボタンをクリックすると関数が呼ばれる', async () => {
    const user = userEvent.setup();

    const setStatus = jest.fn();
    render(<Top setStatus={setStatus} />);

    const button = screen.getByRole('button', {name: 'プレイする'});

    await user.click(button);
    expect(setStatus).toHaveBeenCalled();
  });
});