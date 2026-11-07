import Link from 'next/link';
import { site } from '@/data/site';
import { JsonLd } from './JsonLd';

export interface Crumb {
  name: string;
  /** Path on this site. The last crumb is the current page and is not a link. */
  path: string;
}

/** Visible breadcrumb trail plus its BreadcrumbList structured data. Only real, indexed paths belong here. */
export function Breadcrumbs({ crumbs }: { crumbs: readonly Crumb[] }) {
  return (
    <>
      <nav aria-label="Breadcrumb" className="breadcrumbs">
        <ol>
          {crumbs.map((crumb, index) => {
            const last = index === crumbs.length - 1;
            return (
              <li key={crumb.path}>
                {last ? <span aria-current="page">{crumb.name}</span> : <Link href={crumb.path}>{crumb.name}</Link>}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: crumbs.map((crumb, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: crumb.name,
            item: `${site.url}${crumb.path === '/' ? '' : crumb.path}`,
          })),
        }}
      />
    </>
  );
}
