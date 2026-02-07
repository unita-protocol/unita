import { generateProof, verifyProof, Group, Identity } from "@semaphore-protocol/core";
import type { SemaphoreProof } from "@semaphore-protocol/core";

export type { SemaphoreProof };

/**
 * Generate a ZK proof that the user is a group member and is voting.
 *
 * @param identity - User's Semaphore identity (private)
 * @param group - The voting group (all member commitments)
 * @param vote - The vote value (e.g., "yes" or "no")
 * @param proposalId - Used as scope to prevent double-voting on same proposal
 * @returns ZK proof that can be verified without revealing the voter
 */
export async function generateVoteProof(
  identity: Identity,
  group: Group,
  vote: string,
  proposalId: string
): Promise<SemaphoreProof> {
  return generateProof(identity, group, vote, proposalId);
}

/**
 * Verify a ZK vote proof server-side.
 * Returns true if the proof is valid — voter is a member and hasn't double-voted.
 */
export async function verifyVoteProof(
  proof: SemaphoreProof
): Promise<boolean> {
  return verifyProof(proof);
}
