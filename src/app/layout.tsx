import { Providers } from './providers';
import '@/styles/app.scss';

export const metadata = {
  title: "No Man's Sky Portal Address Reader",
  description: 'Read the portal address from the game screenshot.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
