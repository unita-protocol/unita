import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { proposals } from "@unita/db/schema";
import { eq } from "drizzle-orm";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  const { status } = body;

  if (status !== "closed") {
    return NextResponse.json(
      { error: "Only 'closed' status is supported" },
      { status: 400 }
    );
  }

  const [proposal] = await db
    .select()
    .from(proposals)
    .where(eq(proposals.id, id));

  if (!proposal) {
    return NextResponse.json(
      { error: "Proposal not found" },
      { status: 404 }
    );
  }

  if (proposal.status !== "open") {
    return NextResponse.json(
      { error: "Proposal is already closed" },
      { status: 400 }
    );
  }

  await db
    .update(proposals)
    .set({ status: "closed" })
    .where(eq(proposals.id, id));

  return NextResponse.json({ ok: true });
}
