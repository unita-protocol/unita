import { db } from "@/lib/db";
import { proposals } from "@unita/db/schema";
import { desc } from "drizzle-orm";

export const dynamic = "force-dynamic";

export default async function ProposalsPage() {
  const allProposals = await db
    .select()
    .from(proposals)
    .orderBy(desc(proposals.createdAt));

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Proposals</h1>
        <a
          href="/proposals/new"
          className="rounded-md bg-white px-4 py-2 text-sm font-medium text-neutral-900 hover:bg-neutral-200"
        >
          New Proposal
        </a>
      </div>

      {allProposals.length === 0 ? (
        <p className="mt-8 text-center text-neutral-500">
          No proposals yet. Be the first to create one.
        </p>
      ) : (
        <div className="mt-6 space-y-4">
          {allProposals.map((p) => (
            <a
              key={p.id}
              href={`/proposals/${p.id}`}
              className="block rounded-lg border border-neutral-800 bg-neutral-900 p-5 transition hover:border-neutral-600"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">{p.title}</h2>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs ${
                    p.status === "open"
                      ? "bg-green-900 text-green-300"
                      : "bg-neutral-800 text-neutral-400"
                  }`}
                >
                  {p.status}
                </span>
              </div>
              <p className="mt-2 line-clamp-2 text-sm text-neutral-400">
                {p.description}
              </p>
              <p className="mt-3 text-xs text-neutral-600">
                {new Date(p.createdAt).toLocaleDateString()}
              </p>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
