import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { votes, proposals } from "@unita/db/schema";
import { eq } from "drizzle-orm";
import { verifyVoteProof } from "@unita/zk";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { proposalId, vote, proof, nullifierHash } = body;

  if (!proposalId || vote === undefined || !proof || !nullifierHash) {
    return NextResponse.json(
      { error: "proposalId, vote, proof, and nullifierHash are required" },
      { status: 400 }
    );
  }

  // Verify proposal exists and is open
  const [proposal] = await db
    .select()
    .from(proposals)
    .where(eq(proposals.id, proposalId));

  if (!proposal) {
    return NextResponse.json(
      { error: "Proposal not found" },
      { status: 404 }
    );
  }

  if (proposal.status !== "open") {
    return NextResponse.json(
      { error: "Proposal is not open for voting" },
      { status: 400 }
    );
  }

  // Verify ZK proof
  const isValid = await verifyVoteProof(proof);
  if (!isValid) {
    return NextResponse.json(
      { error: "Invalid ZK proof" },
      { status: 400 }
    );
  }

  // Store vote (nullifierHash ensures no double-voting via unique constraint)
  try {
    const [stored] = await db
      .insert(votes)
      .values({
        proposalId,
        nullifierHash,
        vote: Boolean(vote),
        proof,
      })
      .returning({ id: votes.id });

    return NextResponse.json({ id: stored.id }, { status: 201 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    if (msg.includes("unique") || msg.includes("duplicate") || msg.includes("23505")) {
      return NextResponse.json(
        { error: "You have already voted on this proposal" },
        { status: 409 }
      );
    }
    throw err;
  }
}
