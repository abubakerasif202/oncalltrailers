import type { Metadata } from 'next';
import { FaqList } from '@/components/FaqList';
import { JsonLd } from '@/components/JsonLd';
import { Lines } from '@/components/Reveal';
import { faqs } from '@/data/content';
import { pageMetadata } from '@/data/seo';

export const metadata: Metadata = pageMetadata({
  title: 'FAQ',
  description: 'Answers about booking, towing, pickup and changes for trailer hire in Sydney.',
  path: '/faq',
});

export default function FaqPage() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.map((item) => ({
            '@type': 'Question',
            name: item.q,
            acceptedAnswer: { '@type': 'Answer', text: item.a },
          })),
        }}
      />
      <section className="page-hero">
        <div className="container">
          <Lines as="h1" lines={['Frequently asked', 'questions']} />
        </div>
      </section>
      <section className="section--s">
        <div className="container">
          <FaqList items={faqs} />
        </div>
      </section>
    </>
  );
}
