import { db } from "@/lib/db";
import { proposals, votes, aiAnalyses } from "@unita/db/schema";
import { desc, eq, count, sql } from "drizzle-orm";

export const dynamic = "force-dynamic";

export default async function ProposalsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status: filterStatus } = await searchParams;

  let query = db
    .select()
    .from(proposals)
    .orderBy(desc(proposals.createdAt));

  if (filterStatus === "open" || filterStatus === "closed") {
    query = query.where(eq(proposals.status, filterStatus)) as typeof query;
  }

  const allProposals = await query;

  // Get vote counts per proposal
  const voteCounts = await db
    .select({
      proposalId: votes.proposalId,
      yesCount: count(sql`CASE WHEN ${votes.vote} = true THEN 1 END`),
      noCount: count(sql`CASE WHEN ${votes.vote} = false THEN 1 END`),
      total: count(),
    })
    .from(votes)
    .groupBy(votes.proposalId);

  // Get analysis status per proposal
  const analysisCounts = await db
    .select({
      proposalId: aiAnalyses.proposalId,
      agentCount: count(),
    })
    .from(aiAnalyses)
    .groupBy(aiAnalyses.proposalId);

  const voteMap = new Map(voteCounts.map((v) => [v.proposalId, v]));
  const analysisMap = new Map(analysisCounts.map((a) => [a.proposalId, a.agentCount]));

  const filters = [
    { label: "All", value: undefined },
    { label: "Open", value: "open" },
    { label: "Closed", value: "closed" },
  ];

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

      {/* Filter Tabs */}
      <div className="mt-4 flex gap-1">
        {filters.map((f) => {
          const isActive = filterStatus === f.value || (!filterStatus && !f.value);
          const href = f.value ? `/proposals?status=${f.value}` : "/proposals";
          return (
            <a
              key={f.label}
              href={href}
              className={`rounded-md px-3 py-1.5 text-sm ${
                isActive
                  ? "bg-neutral-800 text-neutral-100"
                  : "text-neutral-500 hover:text-neutral-300"
              }`}
            >
              {f.label}
            </a>
          );
        })}
      </div>

      {allProposals.length === 0 ? (
        <p className="mt-8 text-center text-neutral-500">
          {filterStatus
            ? `No ${filterStatus} proposals.`
            : "No proposals yet. Be the first to create one."}
        </p>
      ) : (
        <div className="mt-6 space-y-4">
          {allProposals.map((p) => {
            const v = voteMap.get(p.id);
            const agentCount = analysisMap.get(p.id) ?? 0;
            const yesCount = v?.yesCount ?? 0;
            const noCount = v?.noCount ?? 0;
            const totalVotes = v?.total ?? 0;

            return (
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
                <div className="mt-3 flex items-center gap-4 text-xs text-neutral-500">
                  <span>{new Date(p.createdAt).toLocaleDateString()}</span>
                  {agentCount > 0 && (
                    <span className="text-blue-400">
                      {agentCount}/3 analyzed
                    </span>
                  )}
                  {totalVotes > 0 && (
                    <div className="flex items-center gap-2">
                      <div className="flex h-2 w-20 overflow-hidden rounded-full">
                        <div
                          className="bg-green-600"
                          style={{ width: `${(yesCount / totalVotes) * 100}%` }}
                        />
                        <div
                          className="bg-red-600"
                          style={{ width: `${(noCount / totalVotes) * 100}%` }}
                        />
                      </div>
                      <span>
                        <span className="text-green-400">{yesCount}</span>
                        {"/"}
                        <span className="text-red-400">{noCount}</span>
                      </span>
                    </div>
                  )}
                </div>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}
