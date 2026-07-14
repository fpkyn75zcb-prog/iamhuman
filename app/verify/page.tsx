"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function VerifySearchPage() {
  const [id, setId] = useState("");
  const router = useRouter();

  function searchVerification() {
    if (!id.trim()) return;

    router.push(`/verify/${id.trim()}`);
  }

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md rounded-lg border p-8">

        <h1 className="text-3xl font-bold">
          Verify Someone
        </h1>

        <p className="mt-4">
          Enter their iAmHuman Verification ID.
        </p>

        <input
          className="mt-6 w-full rounded border p-3"
          placeholder="IH-774889"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />

        <button
          className="mt-4 w-full rounded bg-black px-4 py-3 text-white"
          onClick={searchVerification}
        >
          Check Verification
        </button>

      </div>
    </main>
  );
}
