import { render, screen } from '@testing-library/react';
import Play from './Play';

describe('Play Component', () => {
  beforeEach(() => render(<Play setStartTime={jest.fn()}/>));
  
  test('テキストが描画されている', () => {
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
  })
})