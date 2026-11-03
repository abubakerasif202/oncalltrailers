import type { Metadata, Viewport } from 'next';
import { Barlow, Barlow_Condensed } from 'next/font/google';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { JsonLd } from '@/components/JsonLd';
import { MotionProvider } from '@/components/MotionProvider';
import { ScrollProgress } from '@/components/ScrollProgress';
import { StickyBook } from '@/components/StickyBook';
import { allowIndexing, site } from '@/data/site';
import './globals.css';

const display = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['700', '800'],
  style: ['italic', 'normal'],
  variable: '--font-display-next',
  display: 'swap',
});

const body = Barlow({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body-next',
  display: 'swap',
});

const description =
  'Self-service trailer hire in Sydney. Book online, verify once, get your access code and tow away. Cage, car and motorbike trailers.';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Self-service trailer hire in Sydney`,
    template: `%s | ${site.name}`,
  },
  description,
  openGraph: {
    title: `${site.name} | ${site.tagline}`,
    description,
    url: site.url,
    siteName: site.name,
    locale: 'en_AU',
    type: 'website',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: `${site.name} crest` }],
  },
  alternates: { canonical: '/' },
  // Stays out of search results until NEXT_PUBLIC_ALLOW_INDEXING=true is set at launch.
  robots: allowIndexing ? undefined : { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: '#04070d',
  colorScheme: 'dark',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU" className={`${display.variable} ${body.variable}`}>
      <body>
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: site.name,
            description,
            url: site.url,
            image: `${site.url}/logo.png`,
            areaServed: site.region,
            ...(site.phone ? { telephone: site.phone } : {}),
            ...(site.email ? { email: site.email } : {}),
          }}
        />
        <MotionProvider>
          <a
            href="#main"
            className="sr-only z-[70] rounded-br-xl bg-electric px-5 py-3 font-bold text-white focus:not-sr-only focus:fixed focus:left-0 focus:top-0"
          >
            Skip to main content
          </a>
          <ScrollProgress />
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <StickyBook />
        </MotionProvider>
      </body>
    </html>
  );
}
