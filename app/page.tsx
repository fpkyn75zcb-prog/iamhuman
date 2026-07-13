export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 text-center">
        <div className="mb-6 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">
          Human Verification for the AI Era
        </div>

        <h1 className="mb-6 text-5xl font-bold md:text-7xl">
          iamhuman
        </h1>

        <h2 className="mb-8 max-w-3xl text-2xl font-semibold md:text-4xl">
          AI can create almost anything.
          <br />
          Trust starts with knowing who is real.
        </h2>

        <p className="mb-10 max-w-2xl text-lg text-gray-400">
          iamhuman helps people prove they are real humans without exposing
          unnecessary personal information. A simple verification badge for an
          AI-powered internet.
        </p>

        <button className="rounded-xl bg-cyan-500 px-8 py-4 text-lg font-semibold text-black transition hover:bg-cyan-400">
          Verify Me
        </button>

        <div className="mt-16 rounded-2xl border border-gray-800 bg-zinc-900 p-8">
          <p className="text-sm text-gray-400">Example Verification</p>

          <h3 className="mt-4 text-2xl font-bold">
            ✓ VERIFIED HUMAN
          </h3>

          <p className="mt-2 text-cyan-400">
            ID: IH-000001
          </p>

          <p className="mt-2 text-gray-400">
            Verification Active
          </p>
        </div>
      </section>
    </main>
  );
}
