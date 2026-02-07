import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { groupMembers } from "@unita/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ groupId: string }> }
) {
  const { groupId } = await params;

  const members = await db
    .select({ identityCommitment: groupMembers.identityCommitment })
    .from(groupMembers)
    .where(eq(groupMembers.groupId, groupId));

  return NextResponse.json({
    members: members.map((m) => m.identityCommitment),
  });
}
