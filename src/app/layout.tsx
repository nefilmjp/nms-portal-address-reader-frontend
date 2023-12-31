import { Roboto } from 'next/font/google';

import { Providers } from './providers';
import '@/styles/app.scss';

const roboto = Roboto({
  weight: ['400', '700'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: "No Man's Sky Portal Address Reader",
  description: "The portal address reader in the screenshot for No Man's Sky.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={roboto.className} style={{ minHeight: '100dvh' }}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
