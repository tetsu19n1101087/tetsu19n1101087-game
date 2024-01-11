import { render, screen } from '@testing-library/react';
import Button from './Button';

describe('Button Component', () => {
  test('テキストが描画されている', () => {
    render(<Button>タイトルに戻る</Button>);

    const button = screen.getByRole('button', {name: 'タイトルに戻る'});
    expect(button).toBeInTheDocument();
  });
});