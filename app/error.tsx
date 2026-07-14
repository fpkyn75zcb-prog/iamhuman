"use client";

import { useEffect } from "react";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error");
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="rounded-lg bg-white p-8 text-center shadow">
        <h2 className="mb-3 text-xl font-semibold">
          Something went wrong
        </h2>

        <p className="mb-6 text-gray-600">
          Please try again.
        </p>

        <button
          onClick={() => reset()}
          className="rounded bg-black px-5 py-2 text-white hover:bg-gray-800"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
