import type { Metadata } from 'next';
import { FaqList } from '@/components/FaqList';
import { JsonLd } from '@/components/JsonLd';
import { faqs } from '@/data/content';

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Answers about self-service pickup, what you need to hire a trailer, extensions and returns.',
  alternates: { canonical: '/faq' },
};

export default function FaqPage() {
  return (
    <div className="px-5 pb-24 pt-36 sm:px-8">
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
      <div className="mx-auto max-w-4xl">
        <h1 className="display mb-10 text-6xl text-white sm:text-8xl">
          Frequently asked <span className="blue-text">questions</span>
        </h1>
        <FaqList items={faqs} />
      </div>
    </div>
  );
}
