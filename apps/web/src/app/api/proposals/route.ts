import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { proposals, groups } from "@unita/db/schema";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { title, description } = body;

  if (!title || !description) {
    return NextResponse.json(
      { error: "Title and description are required" },
      { status: 400 }
    );
  }

  if (title.length > 256) {
    return NextResponse.json(
      { error: "Title must be 256 characters or less" },
      { status: 400 }
    );
  }

  // Create group and proposal in a transaction
  const [group] = await db
    .insert(groups)
    .values({ name: title.trim() })
    .returning({ id: groups.id });

  const [proposal] = await db
    .insert(proposals)
    .values({
      title: title.trim(),
      description: description.trim(),
      groupId: group.id,
      status: "open",
    })
    .returning({ id: proposals.id });

  return NextResponse.json({ id: proposal.id }, { status: 201 });
}
