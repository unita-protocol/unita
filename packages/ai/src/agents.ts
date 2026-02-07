import { generateObject, generateText } from "ai";
import { google } from "@ai-sdk/google";
import { z } from "zod";
import {
  IJTIHAD_SYSTEM_PROMPT,
  ECONOMIST_SYSTEM_PROMPT,
  GUARDIAN_SYSTEM_PROMPT,
} from "./prompts";

export type AgentRole = "ijtihad" | "economist" | "guardian";

export interface AgentResult {
  role: AgentRole;
  model: string;
  analysis: Record<string, unknown>;
  raw: string;
}

// Using Gemini 3 Flash (free tier: 5 RPM, 250 RPD)
// 3 agents per analysis = 1 analysis/min, ~83 analyses/day
const MODEL_ID = "gemini-3-flash-preview";

// Zod schemas for structured output — eliminates JSON parsing issues
const ijtihadSchema = z.object({
  forArgument: z.string().describe("Strongest steel-man argument FOR the proposal"),
  againstArgument: z.string().describe("Strongest steel-man argument AGAINST the proposal"),
  unintendedConsequences: z.array(z.string()).describe("3 unintended consequences"),
  beneficiaries: z.string().describe("Who benefits financially"),
  costBearers: z.string().describe("Who bears the cost"),
  logicalConsistency: z.number().min(1).max(10).describe("Logical consistency score 1-10"),
  fallacies: z.string().describe("Any logical fallacies found"),
});

const economistSchema = z.object({
  capitalIntensity: z.enum(["High", "Medium", "Low"]),
  laborIntensity: z.enum(["High", "Medium", "Low"]),
  budgetTradeoffs: z.array(z.string()).describe("3 specific budget areas to cut"),
  hiddenCosts: z.string().describe("Hidden costs of 'free' services"),
  fiveYearImpact: z.object({
    gdp: z.string(),
    employment: z.string(),
    publicDebt: z.string(),
  }),
});

const guardianSchema = z.object({
  fundamentalRightsViolations: z.array(z.string()).describe("Articles 1-15 violations"),
  governancePrincipleConflicts: z.array(z.string()).describe("Articles 16-35 conflicts"),
  suggestedAmendments: z.array(z.string()).describe("Amendments to make it constitutional"),
  verdict: z.enum(["PASS", "CONDITIONAL", "REJECT"]),
  reasoning: z.string().describe("Explanation of the verdict"),
});

const AGENT_CONFIGS = {
  ijtihad: {
    systemPrompt: IJTIHAD_SYSTEM_PROMPT,
    schema: ijtihadSchema,
    modelName: MODEL_ID,
  },
  economist: {
    systemPrompt: ECONOMIST_SYSTEM_PROMPT,
    schema: economistSchema,
    modelName: MODEL_ID,
  },
  guardian: {
    systemPrompt: GUARDIAN_SYSTEM_PROMPT,
    schema: guardianSchema,
    modelName: MODEL_ID,
  },
} as const;

/**
 * Run a single AI agent analysis on a proposal.
 * Uses Zod schema for structured output (no manual JSON parsing).
 */
export async function runAgent(
  role: AgentRole,
  proposalTitle: string,
  proposalDescription: string
): Promise<AgentResult> {
  const config = AGENT_CONFIGS[role];

  try {
    // generateObject provides type-safe structured output via Zod schema
    const { object } = await generateObject({
      model: google(MODEL_ID),
      system: config.systemPrompt,
      prompt: `Proposal: "${proposalTitle}"\n\nDescription:\n${proposalDescription}`,
      schema: config.schema,
      maxRetries: 2,
    });

    return {
      role,
      model: config.modelName,
      analysis: object as Record<string, unknown>,
      raw: JSON.stringify(object),
    };
  } catch {
    // Fallback: try without structured output if schema validation fails
    const { text } = await generateText({
      model: google(MODEL_ID),
      system: config.systemPrompt,
      prompt: `Proposal: "${proposalTitle}"\n\nDescription:\n${proposalDescription}\n\nRespond ONLY with valid JSON.`,
      maxRetries: 2,
    });

    let analysis: Record<string, unknown>;
    try {
      const cleaned = text.replace(/^```(?:json)?\s*\n?/m, "").replace(/\n?```\s*$/m, "");
      analysis = JSON.parse(cleaned);
    } catch {
      analysis = { raw: text, parseError: true, fallback: true };
    }

    return {
      role,
      model: config.modelName,
      analysis,
      raw: text,
    };
  }
}

/**
 * Run all three agents in parallel on a proposal.
 * Returns all results, including disagreements between models.
 */
export async function analyzeProposal(
  proposalTitle: string,
  proposalDescription: string
): Promise<AgentResult[]> {
  const roles: AgentRole[] = ["ijtihad", "economist", "guardian"];

  const results = await Promise.allSettled(
    roles.map((role) => runAgent(role, proposalTitle, proposalDescription))
  );

  return results
    .filter(
      (r): r is PromiseFulfilledResult<AgentResult> => r.status === "fulfilled"
    )
    .map((r) => r.value);
}
