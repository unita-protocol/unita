export default function Home() {
  return (
    <div className="flex flex-col items-center gap-12 py-16">
      <div className="text-center">
        <h1 className="text-5xl font-bold tracking-tight">UNITA</h1>
        <p className="mt-4 text-lg text-neutral-400">
          Global P2P Liquid Democracy &amp; Resource Equilibrium
        </p>
      </div>

      <div className="grid w-full max-w-2xl gap-6 sm:grid-cols-2">
        <a
          href="/proposals/new"
          className="rounded-lg border border-neutral-800 bg-neutral-900 p-6 transition hover:border-neutral-600"
        >
          <h2 className="text-lg font-semibold">Create Proposal</h2>
          <p className="mt-2 text-sm text-neutral-400">
            Submit a proposal for AI analysis and community voting.
          </p>
        </a>

        <a
          href="/proposals"
          className="rounded-lg border border-neutral-800 bg-neutral-900 p-6 transition hover:border-neutral-600"
        >
          <h2 className="text-lg font-semibold">View Proposals</h2>
          <p className="mt-2 text-sm text-neutral-400">
            Browse open proposals, read AI analysis, cast anonymous votes.
          </p>
        </a>

        <a
          href="/identity"
          className="rounded-lg border border-neutral-800 bg-neutral-900 p-6 transition hover:border-neutral-600"
        >
          <h2 className="text-lg font-semibold">ZK Identity</h2>
          <p className="mt-2 text-sm text-neutral-400">
            Generate your anonymous identity. Vote without revealing who you
            are.
          </p>
        </a>

        <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-6 opacity-50">
          <h2 className="text-lg font-semibold">Delegation</h2>
          <p className="mt-2 text-sm text-neutral-400">
            Delegate your vote to experts. Coming soon.
          </p>
        </div>
      </div>

      <div className="mt-8 text-center text-sm text-neutral-500">
        <p>
          Propose &rarr; AI Analyzes &rarr; Vote with ZK Proofs &rarr; See
          Results
        </p>
      </div>
    </div>
  );
}
