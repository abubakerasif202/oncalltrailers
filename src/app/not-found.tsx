import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="px-5 pb-24 pt-44 text-center sm:px-8">
      <p className="display blue-text text-[clamp(6rem,20vw,14rem)]">404</p>
      <h1 className="display text-4xl text-white sm:text-6xl">This page took a wrong turn</h1>
      <p className="mx-auto mt-4 max-w-md text-lg text-mute">
        The page you are after does not exist. Head back and pick a trailer instead.
      </p>
      <Link href="/" className="btn btn-primary mt-8">
        Back to home
      </Link>
    </div>
  );
}
