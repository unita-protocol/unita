import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { proposals, aiAnalyses } from "@unita/db/schema";
import { eq } from "drizzle-orm";
import { analyzeProposal } from "@unita/ai";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { proposalId } = body;

  if (!proposalId) {
    return NextResponse.json(
      { error: "proposalId is required" },
      { status: 400 }
    );
  }

  // Fetch proposal
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

  // Run all 3 AI agents in parallel
  const results = await analyzeProposal(proposal.title, proposal.description);

  // Store results
  const stored = await db
    .insert(aiAnalyses)
    .values(
      results.map((r) => ({
        proposalId,
        agentRole: r.role,
        model: r.model,
        analysis: r.analysis,
      }))
    )
    .returning();

  return NextResponse.json({ analyses: stored }, { status: 201 });
}
