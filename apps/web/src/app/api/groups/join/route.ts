import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { proposals, groups, groupMembers } from "@unita/db/schema";
import { eq, sql } from "drizzle-orm";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { proposalId, identityCommitment } = body;

  if (!proposalId || !identityCommitment) {
    return NextResponse.json(
      { error: "proposalId and identityCommitment are required" },
      { status: 400 }
    );
  }

  // Look up proposal's groupId
  const [proposal] = await db
    .select({ groupId: proposals.groupId })
    .from(proposals)
    .where(eq(proposals.id, proposalId));

  if (!proposal || !proposal.groupId) {
    return NextResponse.json(
      { error: "Proposal not found or has no voting group" },
      { status: 404 }
    );
  }

  // Insert member into group
  try {
    await db.insert(groupMembers).values({
      groupId: proposal.groupId,
      identityCommitment,
    });

    // Increment member count
    await db
      .update(groups)
      .set({ memberCount: sql`${groups.memberCount} + 1` })
      .where(eq(groups.id, proposal.groupId));

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    if (msg.includes("unique") || msg.includes("duplicate") || msg.includes("23505")) {
      return NextResponse.json(
        { error: "Already registered for this proposal" },
        { status: 409 }
      );
    }
    throw err;
  }
}
