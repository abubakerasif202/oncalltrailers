import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { BookingAnalytics } from '@/components/BookingAnalytics';
import { Enhance } from '@/components/Enhance';
import { Particles } from '@/components/Particles';
import { SmoothScroll } from '@/components/SmoothScroll';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { JsonLd } from '@/components/JsonLd';
import { StickyBook } from '@/components/StickyBook';
import { allowIndexing, site } from '@/data/site';
import './globals.css';

const display = localFont({
  src: [
    { path: './fonts/BarlowCondensed-700.woff2', weight: '700', style: 'normal' },
    { path: './fonts/BarlowCondensed-800.woff2', weight: '800', style: 'normal' },
  ],
  variable: '--font-display-next',
  display: 'swap',
  fallback: ['Arial Narrow', 'Arial'],
});

const body = localFont({
  src: [
    { path: './fonts/Barlow-400.woff2', weight: '400', style: 'normal' },
    { path: './fonts/Barlow-500.woff2', weight: '500', style: 'normal' },
    { path: './fonts/Barlow-600.woff2', weight: '600', style: 'normal' },
  ],
  variable: '--font-body-next',
  display: 'swap',
  fallback: ['Arial'],
});

const description =
  'Trailer hire in Sydney: galvanised cage box and motorcycle trailers to book online, and car trailer enquiries, from On Call Trailers.';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Sydney trailer hire`,
    template: `%s | ${site.name}`,
  },
  description,
  authors: [{ name: 'AB Web Studio' }],
  openGraph: {
    title: `${site.name} | Sydney trailer hire`,
    description,
    url: site.url,
    siteName: site.name,
    locale: 'en_AU',
    type: 'website',
    images: [{ url: '/og.jpg', width: 1200, height: 630, alt: `${site.name} galvanised cage trailer in front of the Sydney skyline` }],
  },
  twitter: { card: 'summary_large_image' },
  robots: allowIndexing ? undefined : { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: '#071322',
  colorScheme: 'dark',
};

/** Sets the .js flag before first paint so reveal styles only apply when scripting runs. */
const jsFlag =
  "document.documentElement.classList.add('js');try{if(localStorage.getItem('motion')==='off')document.documentElement.dataset.motion='off'}catch(e){}";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU" className={`${display.variable} ${body.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: jsFlag }} />
      </head>
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
            ...(site.abn ? { taxID: site.abn } : {}),
            ...(site.email ? { email: site.email } : {}),
            ...(site.instagram ? { sameAs: [site.instagram] } : {}),
          }}
        />
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        <Particles />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <StickyBook />
        <Enhance />
        <BookingAnalytics />
        <SmoothScroll />
      </body>
    </html>
  );
}
