import { render, screen } from '@testing-library/react';
import Result from './Result';

describe('Result Component', () => {
  test('テキストが描画されている', () => {
    render(<Result time={16.55} missTypingNumber={1}/>);

    const title = screen.getByText('結果');
    expect(title).toBeInTheDocument();

    const headers = screen.getAllByRole('columnheader');
    expect(headers).toHaveLength(5);

    const data = screen.getAllByRole('cell');
    expect(data).toHaveLength(5);
  });
});