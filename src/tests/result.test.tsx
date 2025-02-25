import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Page from '@/app/result/page';
import { useRouter } from 'next/navigation';
import axios from 'axios';

// モジュールごとモック
jest.mock('axios');
jest.mock('next/navigation');

const mockData = {
  results: [
    {
      _id: '679b87be079edf64c184310c',
      time: 11.533,
      correctTypingNumber: 10,
      average: 0.867077083152692,
      missTypingNumber: 0,
      accuracy: 100,
      createdAt: '2025-01-30T14:07:58.610Z',
      updatedAt: '2025-01-30T14:07:58.610Z',
      __v: 0,
    },
    {
      _id: '679b876d079edf64c1843109',
      time: 18.611,
      correctTypingNumber: 10,
      average: 0.537316640696362,
      missTypingNumber: 0,
      accuracy: 100,
      createdAt: '2025-01-30T14:06:37.921Z',
      updatedAt: '2025-01-30T14:06:37.921Z',
      __v: 0,
    },
  ],
};
(axios.get as jest.Mock).mockResolvedValue({ data: mockData });

describe('Result Page', () => {
  test('テキストが描画されている', async () => {
    render(<Page />);

    const title = await screen.findByText('結果');
    expect(title).toBeInTheDocument();

    const headers = await screen.findAllByRole('columnheader');
    expect(headers).toHaveLength(5);

    const data = await screen.findAllByRole('cell');
    expect(data).toHaveLength(10);

    const texts = data.map((d) => d.textContent);

    const expected = [
      `${mockData.results[0].time.toFixed(2)}`,
      `(${mockData.results[1].time.toFixed(2)})`,
      `${mockData.results[0].correctTypingNumber}`,
      `(${mockData.results[1].correctTypingNumber})`,
      `${mockData.results[0].average.toFixed(1)} 回/秒`,
      `(${mockData.results[1].average.toFixed(1)} 回/秒)`,
      `${mockData.results[0].missTypingNumber}`,
      `(${mockData.results[1].missTypingNumber})`,
      `${mockData.results[0].accuracy.toFixed(2)} %`,
      `(${mockData.results[1].accuracy.toFixed(2)} %)`,
    ];

    expect(texts).toEqual(expected);
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
