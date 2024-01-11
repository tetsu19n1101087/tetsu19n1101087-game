import { render, screen } from '@testing-library/react';
import Top from './Top';

describe('Top Component', () => {
  beforeEach(() => render(<Top />));

  test('テキストが描画されている', () => {
    const title = screen.getByText('NS-TYPING');
    expect(title).toBeInTheDocument();

    const lead = screen.getByText('数字・記号専用のタイピング練習ゲーム');
    expect(lead).toBeInTheDocument();

    const button = screen.getByRole('button', {name: 'プレイする'});
    expect(button).toBeInTheDocument();
  });
});