"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="mx-auto flex max-w-4xl flex-col items-center text-center">

        <h1 className="mt-16 text-5xl font-bold">
          iAmHuman
        </h1>

        <p className="mt-4 text-xl">
          A simple human verification system.
        </p>

        <p className="mt-4 max-w-xl text-gray-600">
          Create your verification ID, share your
          verification link, and allow others to confirm
          your verified status.
        </p>

        <div className="mt-10 flex gap-4">

          <Link
            href="/signup"
            className="rounded bg-black px-6 py-3 text-white"
          >
            Get Verified
          </Link>

          <Link
            href="/verify"
            className="rounded border px-6 py-3"
          >
            Verify Someone
          </Link>

        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">

          <div className="rounded border p-6">
            <h2 className="font-bold">
              1. Create
            </h2>
            <p className="mt-2 text-sm">
              Sign up and receive your unique
              verification ID.
            </p>
          </div>

          <div className="rounded border p-6">
            <h2 className="font-bold">
              2. Share
            </h2>
            <p className="mt-2 text-sm">
              Share your public verification link
              or QR code.
            </p>
          </div>

          <div className="rounded border p-6">
            <h2 className="font-bold">
              3. Verify
            </h2>
            <p className="mt-2 text-sm">
              Anyone can check your verification
              status.
            </p>
          </div>

        </div>

      </div>
    </main>
  );
}
