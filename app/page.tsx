"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">

      <div className="mx-auto flex max-w-5xl flex-col items-center text-center">

        <div className="mt-10 rounded-full bg-black px-5 py-2 text-sm font-semibold text-white">
          iAmHuman Identity Verification
        </div>


        <h1 className="mt-8 text-5xl font-bold tracking-tight md:text-7xl">
          Prove You Are Human.
        </h1>


        <p className="mt-5 max-w-2xl text-xl text-gray-600">
          Create a verified identity profile, share your verification link,
          and let anyone confirm your status instantly.
        </p>


        <div className="mt-10 flex flex-col gap-4 sm:flex-row">

          <Link
            href="/signup"
            className="rounded-xl bg-black px-8 py-4 font-semibold text-white"
          >
            Get Verified
          </Link>


          <Link
            href="/verify"
            className="rounded-xl border border-gray-300 bg-white px-8 py-4 font-semibold"
          >
            Verify Someone
          </Link>

        </div>



        <div className="mt-20 grid w-full gap-6 md:grid-cols-3">


          <div className="rounded-2xl bg-white p-6 text-left shadow">

            <h2 className="text-xl font-bold">
              Create Identity
            </h2>

            <p className="mt-3 text-gray-600">
              Register your profile and receive your unique verification ID.
            </p>

          </div>



          <div className="rounded-2xl bg-white p-6 text-left shadow">

            <h2 className="text-xl font-bold">
              Share Proof
            </h2>

            <p className="mt-3 text-gray-600">
              Share your verification page or QR code anywhere.
            </p>

          </div>



          <div className="rounded-2xl bg-white p-6 text-left shadow">

            <h2 className="text-xl font-bold">
              Instant Verification
            </h2>

            <p className="mt-3 text-gray-600">
              Anyone can check your public verification status.
            </p>

          </div>


        </div>



        <div className="mt-20 rounded-2xl bg-black p-10 text-white">

          <h2 className="text-3xl font-bold">
            Your identity. Your verification.
          </h2>

          <p className="mt-3 text-gray-300">
            iAmHuman provides a simple way to show verified human identity online.
          </p>

        </div>


      </div>

    </main>
  );
}
