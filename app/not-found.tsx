import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="rounded-lg bg-white p-8 text-center shadow">
        <h1 className="mb-3 text-4xl font-bold">
          404
        </h1>

        <p className="mb-6 text-gray-600">
          Page not found.
        </p>

        <Link
          href="/"
          className="rounded bg-black px-5 py-2 text-white hover:bg-gray-800"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
