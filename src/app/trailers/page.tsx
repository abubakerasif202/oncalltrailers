import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { FleetComparison } from '@/components/FleetComparison';
import { FleetSection } from '@/components/FleetSection';
import { Lines } from '@/components/Reveal';
import { pageMetadata } from '@/data/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Trailer hire Sydney: cage, motorcycle and car trailers',
  description:
    'Trailer hire in Sydney: the 12x6 cage box trailer is $83.86 per day and the Motorcycle x3 trailer is $38.34 per day for a short hire. Enquire about the car trailer.',
  path: '/trailers',
});

export default function TrailersPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Breadcrumbs
            crumbs={[
              { name: 'Home', path: '/' },
              { name: 'Trailers', path: '/trailers' },
            ]}
          />
          <Lines as="h1" lines={['Our trailers']} />
          <p className="lead hero__lead">
            A cage box trailer, a motorcycle trailer and a car trailer. Compare them, then book through the approved
            booking platform or call us.
          </p>
        </div>
      </section>
      <FleetSection id="fleet" heading={['Choose your', 'trailer.']} />
      <FleetComparison />
    </>
  );
}
