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

  test('各種の統計データが正確である', () => {
    render(<Result time={16.55} missTypingNumber={1}/>);

    const data = screen.getAllByRole('cell');
    
    expect(data[0]).toHaveTextContent('16.55');
    expect(data[1]).toHaveTextContent('10');
    expect(data[2]).toHaveTextContent('0.7 回/秒');
    expect(data[3]).toHaveTextContent('1');
    expect(data[4]).toHaveTextContent('90.91 %');
  });
});