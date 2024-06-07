/* eslint-disable @next/next/no-sync-scripts */
/* eslint-disable @next/next/no-page-custom-font */
import type { Metadata } from 'next'
import { Header } from 'components/common/Header/Header'
import { Footer } from 'components/common/Footer'
import { Providers } from './providers'
import 'assets/style.css'

export const metadata: Metadata = {
  title: 'Ignai-bot - construtor de aplicativos conversacionais',
  description: 'Blocos poderosos para criar experiências de chat únicas. Incorpore-os em qualquer lugar dos seus aplicativos e comece a coletar resultados como mágica.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=Open+Sans:wght@400;500;600;700&family=Indie+Flower:wght@400&display=swap"
          rel="stylesheet"
        />
        <script src="/__ENV.js" />
      </head>

      <body style={{ backgroundColor: '#171923' }}>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}