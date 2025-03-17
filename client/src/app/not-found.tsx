// app/not-found.tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col h-screen items-center justify-center bg-gray-50">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="text-xl mt-4 text-gray-600">Page Not Found</p>
      <Link
        href="/"
        className="mt-6 px-6 py-2 text-white bg-cyan-900 rounded hover:bg-cyan-900 transition"
      >
        Go Home
      </Link>
    </div>
  );
}