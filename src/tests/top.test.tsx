import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Page from '@/app/page';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation');

describe('Top Page', () => {
  test('テキストが描画されている', () => {
    render(<Page />);

    const title = screen.getByText('NS-TYPING');
    expect(title).toBeInTheDocument();

    const lead = screen.getByText('数字・記号専用のタイピング練習ゲーム');
    expect(lead).toBeInTheDocument();

    const button = screen.getByRole('button', { name: 'プレイする' });
    expect(button).toBeInTheDocument();
  });

  test('ボタンをクリックすると関数が呼ばれる', async () => {
    const user = userEvent.setup();

    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });

    render(<Page />);

    const button = screen.getByRole('button', { name: 'プレイする' });

    await user.click(button);
    expect(mockPush).toHaveBeenCalled();
  });
});
