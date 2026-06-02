import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="container-page flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="text-7xl font-bold text-gradient">404</p>
      <h1 className="mt-4 text-2xl font-semibold text-white">
        Page not found
      </h1>
      <p className="mt-2 max-w-md text-slate-400">
        The page you're looking for doesn't exist or may have moved.
      </p>
      <Link href="/" className="btn-primary mt-8">
        Back to speed test
      </Link>
    </main>
  );
}
