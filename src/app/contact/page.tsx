import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@/data/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: `Contact ${site.name} about trailer hire in ${site.region}.`,
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  const hasDetails = Boolean(site.phone || site.email || site.pickupAddress);

  return (
    <div className="px-5 pb-24 pt-36 sm:px-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="display text-6xl text-white sm:text-8xl">
          Get in <span className="blue-text">touch</span>
        </h1>

        {hasDetails ? (
          <dl className="mt-10 grid gap-8 sm:grid-cols-2">
            {site.phone && (
              <div>
                <dt className="text-mute">Phone</dt>
                <dd className="display mt-1 text-4xl text-white">
                  <a href={`tel:${site.phone.replace(/\s/g, '')}`}>{site.phone}</a>
                </dd>
              </div>
            )}
            {site.email && (
              <div>
                <dt className="text-mute">Email</dt>
                <dd className="display mt-1 break-all text-3xl text-white">
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                </dd>
              </div>
            )}
            {site.pickupAddress && (
              <div className="sm:col-span-2">
                <dt className="text-mute">Pickup location</dt>
                <dd className="display mt-1 text-3xl text-white">{site.pickupAddress}</dd>
              </div>
            )}
          </dl>
        ) : (
          <p className="mt-8 max-w-xl text-xl text-mute">
            The fastest way to hire is online. Your booking confirmation has everything you need for
            pickup and return.
          </p>
        )}

        <Link href="/trailers#book" className="btn btn-primary mt-12">
          Book a trailer
        </Link>
      </div>
    </div>
  );
}
