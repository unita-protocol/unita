import {
  pgTable,
  uuid,
  text,
  timestamp,
  integer,
  jsonb,
  boolean,
  varchar,
  unique,
} from "drizzle-orm/pg-core";

export const proposals = pgTable("proposals", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: varchar("title", { length: 256 }).notNull(),
  description: text("description").notNull(),
  authorIdentityCommitment: text("author_identity_commitment"),
  groupId: uuid("group_id").references(() => groups.id),
  status: varchar("status", { length: 32 }).notNull().default("open"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  closesAt: timestamp("closes_at"),
});

export const aiAnalyses = pgTable("ai_analyses", {
  id: uuid("id").defaultRandom().primaryKey(),
  proposalId: uuid("proposal_id")
    .references(() => proposals.id)
    .notNull(),
  agentRole: varchar("agent_role", { length: 64 }).notNull(), // 'ijtihad' | 'economist' | 'guardian'
  model: varchar("model", { length: 64 }).notNull(), // 'claude-sonnet-4-5-20250929' | 'gemini-2.0-flash' | etc
  analysis: jsonb("analysis").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const votes = pgTable("votes", {
  id: uuid("id").defaultRandom().primaryKey(),
  proposalId: uuid("proposal_id")
    .references(() => proposals.id)
    .notNull(),
  nullifierHash: text("nullifier_hash").notNull().unique(), // prevents double voting
  vote: boolean("vote").notNull(), // true = yes, false = no
  proof: jsonb("proof").notNull(), // Semaphore ZK proof
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const groups = pgTable("groups", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 128 }).notNull(),
  description: text("description"),
  memberCount: integer("member_count").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const groupMembers = pgTable(
  "group_members",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    groupId: uuid("group_id")
      .references(() => groups.id)
      .notNull(),
    identityCommitment: text("identity_commitment").notNull(),
    joinedAt: timestamp("joined_at").defaultNow().notNull(),
  },
  (table) => [unique().on(table.groupId, table.identityCommitment)]
);
