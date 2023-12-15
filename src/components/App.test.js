import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  beforeEach(() => render(<App />));

  test('タイトルがレンダーされている', () => {
    const title = screen.getAllByText('NS-TYPING');
    expect(title).toHaveLength(2);
  });
});

