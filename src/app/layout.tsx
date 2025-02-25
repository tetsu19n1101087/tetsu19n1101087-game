import type { Metadata } from 'next';
import React from 'react';
import StyledComponentsRegistry from '@/lib/registry';
import LayoutWrapper from '../components/Wrapper';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='ja'>
      <body>
        <StyledComponentsRegistry>
          <LayoutWrapper>{children}</LayoutWrapper>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: 'Game App',
  description: 'migrate to Next.js / ReactからNext.jsへの移行です',
};
