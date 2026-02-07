import { db } from "@/lib/db";
import { proposals, aiAnalyses, votes, groupMembers } from "@unita/db/schema";
import { eq, count } from "drizzle-orm";
import { notFound } from "next/navigation";
import { RequestAnalysisButton, VotingPanel } from "./actions";

export const dynamic = "force-dynamic";

const agentColors: Record<string, { border: string; bg: string; badge: string }> = {
  ijtihad: { border: "border-green-800", bg: "bg-green-950", badge: "bg-green-900 text-green-300" },
  economist: { border: "border-blue-800", bg: "bg-blue-950", badge: "bg-blue-900 text-blue-300" },
  guardian: { border: "border-amber-800", bg: "bg-amber-950", badge: "bg-amber-900 text-amber-300" },
};

export default async function ProposalPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [proposal] = await db
    .select()
    .from(proposals)
    .where(eq(proposals.id, id));

  if (!proposal) notFound();

  const analyses = await db
    .select()
    .from(aiAnalyses)
    .where(eq(aiAnalyses.proposalId, id));

  const allVotes = await db
    .select()
    .from(votes)
    .where(eq(votes.proposalId, id));

  const yesCount = allVotes.filter((v) => v.vote === true).length;
  const noCount = allVotes.filter((v) => v.vote === false).length;
  const totalVotes = yesCount + noCount;

  // Get registered member count + commitments
  let registeredCount = 0;
  let memberCommitments: string[] = [];
  if (proposal.groupId) {
    const [result] = await db
      .select({ count: count() })
      .from(groupMembers)
      .where(eq(groupMembers.groupId, proposal.groupId));
    registeredCount = result?.count ?? 0;

    const members = await db
      .select({ identityCommitment: groupMembers.identityCommitment })
      .from(groupMembers)
      .where(eq(groupMembers.groupId, proposal.groupId));
    memberCommitments = members.map((m) => m.identityCommitment);
  }

  // Find guardian verdict
  const guardianAnalysis = analyses.find((a) => a.agentRole === "guardian");
  const guardianData = guardianAnalysis?.analysis as Record<string, unknown> | undefined;
  const rawVerdict = guardianData?.verdict ?? guardianData?.recommendation;
  const verdict = typeof rawVerdict === "string" ? rawVerdict : null;

  return (
    <div>
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold">{proposal.title}</h1>
        <span
          className={`rounded-full px-2 py-0.5 text-xs ${
            proposal.status === "open"
              ? "bg-green-900 text-green-300"
              : "bg-neutral-800 text-neutral-400"
          }`}
        >
          {proposal.status}
        </span>
      </div>

      <p className="mt-4 whitespace-pre-wrap text-neutral-300">
        {proposal.description}
      </p>

      <p className="mt-3 text-xs text-neutral-600">
        Created {new Date(proposal.createdAt).toLocaleDateString()}
      </p>

      {/* Guardian Verdict Banner */}
      {verdict && (
        <div
          className={`mt-6 rounded-lg border p-4 ${
            verdict === "PASS"
              ? "border-green-800 bg-green-950"
              : verdict === "REJECT"
                ? "border-red-800 bg-red-950"
                : "border-amber-800 bg-amber-950"
          }`}
        >
          <p className="text-sm font-medium">
            <span className="text-neutral-400">Guardian Verdict: </span>
            <span
              className={
                verdict === "PASS"
                  ? "text-green-300"
                  : verdict === "REJECT"
                    ? "text-red-300"
                    : "text-amber-300"
              }
            >
              {verdict}
            </span>
          </p>
        </div>
      )}

      {/* AI Analysis Section */}
      <section className="mt-10">
        <h2 className="text-xl font-semibold">AI Analysis</h2>

        {analyses.length === 0 ? (
          <div className="mt-4 rounded-lg border border-neutral-800 bg-neutral-900 p-6 text-center">
            <p className="text-neutral-400">
              AI analysis pending. It will appear here once complete.
            </p>
            <RequestAnalysisButton proposalId={id} />
          </div>
        ) : (
          <div className="mt-4 space-y-4">
            {analyses.map((a) => {
              const data = a.analysis as Record<string, unknown>;
              const colors = agentColors[a.agentRole] ?? {
                border: "border-neutral-800",
                bg: "bg-neutral-900",
                badge: "bg-neutral-800 text-neutral-300",
              };
              return (
                <details
                  key={a.id}
                  className={`rounded-lg border ${colors.border} ${colors.bg}`}
                  open={a.agentRole === "guardian"}
                >
                  <summary className="cursor-pointer p-5">
                    <div className="inline-flex items-center gap-3">
                      <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${colors.badge}`}>
                        {a.agentRole}
                      </span>
                      <span className="text-xs text-neutral-500">{a.model}</span>
                    </div>
                  </summary>
                  <div className="border-t border-neutral-800 px-5 pb-5 pt-3">
                    <div className="space-y-3 text-sm text-neutral-300">
                      {Object.entries(data).map(([key, value]) => {
                        if (key === "raw" || key === "parseError") return null;
                        return (
                          <div key={key}>
                            <span className="font-medium text-neutral-400">
                              {key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase())}:
                            </span>{" "}
                            {Array.isArray(value) ? (
                              <ul className="ml-4 mt-1 list-disc space-y-1">
                                {value.map((item, i) => (
                                  <li key={i}>{String(item)}</li>
                                ))}
                              </ul>
                            ) : typeof value === "object" && value !== null ? (
                              <pre className="ml-4 mt-1 whitespace-pre-wrap text-xs">
                                {JSON.stringify(value, null, 2)}
                              </pre>
                            ) : (
                              <span>{String(value)}</span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </details>
              );
            })}
          </div>
        )}
      </section>

      {/* Voting Section */}
      <section className="mt-10">
        <h2 className="text-xl font-semibold">Vote</h2>

        {/* Results Dashboard */}
        {totalVotes > 0 && (
          <div className="mt-4 space-y-3">
            {/* Vote Bar */}
            <div className="overflow-hidden rounded-full h-6 flex">
              {yesCount > 0 && (
                <div
                  className="bg-green-700 flex items-center justify-center text-xs font-medium text-green-100 transition-all"
                  style={{ width: `${(yesCount / totalVotes) * 100}%` }}
                >
                  {Math.round((yesCount / totalVotes) * 100)}% YES
                </div>
              )}
              {noCount > 0 && (
                <div
                  className="bg-red-700 flex items-center justify-center text-xs font-medium text-red-100 transition-all"
                  style={{ width: `${(noCount / totalVotes) * 100}%` }}
                >
                  {Math.round((noCount / totalVotes) * 100)}% NO
                </div>
              )}
            </div>

            {/* Vote Counts */}
            <div className="flex justify-between text-sm">
              <span className="text-green-400">YES: {yesCount}</span>
              <span className="text-neutral-500">Total: {totalVotes}</span>
              <span className="text-red-400">NO: {noCount}</span>
            </div>

            {/* Participation */}
            {registeredCount > 0 && (
              <p className="text-xs text-neutral-500">
                {totalVotes} of {registeredCount} registered voters have voted ({Math.round((totalVotes / registeredCount) * 100)}%)
              </p>
            )}
          </div>
        )}

        {totalVotes === 0 && (
          <p className="mt-2 text-sm text-neutral-500">No votes yet.</p>
        )}

        {/* Registration + Voting */}
        <VotingPanel
          proposalId={id}
          groupId={proposal.groupId}
          memberCommitments={memberCommitments}
        />
      </section>
    </div>
  );
}
