import Link from 'next/link';
import { fleet } from '@/data/fleet';
import { LISTING_URL, listingStats, pickupHours, pickupSuburb } from '@/data/listing';
import { site } from '@/data/site';
import { telHref } from '@/data/booking';
import { ArrowIcon, PhoneIcon } from './Icons';
import { Lines, Reveal } from './Reveal';
import { TrailerImage } from './TrailerImage';

export function TrustStrip() {
  return (
    <section className="trust-strip" aria-label="Hire information">
      <div className="container trust-strip__grid">
        <a href={LISTING_URL} target="_blank" rel="noopener noreferrer" className="trust-strip__rating">
          <span className="trust-strip__stars" aria-hidden="true">★★★★★</span>
          <strong>{listingStats.rating} <span>/ 5</span></strong>
          <span>{listingStats.reviews} listing reviews · Local Trailer Hire</span>
          <span className="visually-hidden"> (opens in a new tab)</span>
        </a>
        <div><span className="trust-strip__label">Sydney pickup</span><strong>{pickupSuburb}</strong><span>Collect locally. Get moving.</span></div>
        <div><span className="trust-strip__label">Collection &amp; return</span><strong>{pickupHours.hours}</strong><span>{pickupHours.days}</span></div>
        <div><span className="trust-strip__label">Cage trailer listing</span><strong>NRMA roadside assistance</strong><a href={`${LISTING_URL}`} target="_blank" rel="noopener noreferrer">See rental terms &amp; conditions<span className="visually-hidden"> (opens in a new tab)</span></a></div>
      </div>
    </section>
  );
}

export function HomeGallery() {
  return (
    <section className="section home-gallery" aria-labelledby="home-gallery-title">
      <div className="container">
        <div className="section__head home-gallery__head">
          <div><Reveal as="p" className="eyebrow">A closer look</Reveal><Lines as="h2" lines={['Built for', 'the next job.']} /></div>
          <p className="home-gallery__intro" id="home-gallery-title">Explore the details, compare the options and choose the trailer that suits your load.</p>
        </div>
        <div className="home-gallery__grid">
          {fleet.map((trailer, index) => (
            <Reveal key={trailer.slug} delay={index * 0.08} className="home-gallery__item">
              <Link href={`/trailers/${trailer.slug}`} className="home-gallery__link">
                <div className="home-gallery__image"><TrailerImage image={trailer.views[1].image} alt={trailer.views[1].alt} sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw" /></div>
                <div className="home-gallery__caption"><div><span className="home-gallery__category">{trailer.booking.kind === 'enquiry' ? 'Enquiries only' : trailer.category}</span><h3>{trailer.name}</h3></div><ArrowIcon /></div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ContactRail() {
  const phone = telHref(site.phone);
  return (
    <nav className="contact-rail" aria-label="Social and contact links">
      {site.instagram ? <a href={site.instagram} target="_blank" rel="noopener noreferrer" aria-label="On Call Trailers on Instagram (opens in a new tab)"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" /></svg><span>Instagram</span></a> : null}
      {phone ? <a href={phone} aria-label={`Call ${site.phone}`}><PhoneIcon /><span>Call us</span></a> : null}
      {site.email ? <a href={`mailto:${site.email}`} aria-label={`Email ${site.email}`}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M3 5h18v14H3zM3 5l9 8 9-8" /></svg><span>Email</span></a> : null}
    </nav>
  );
}
