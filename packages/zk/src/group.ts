import { Group } from "@semaphore-protocol/core";

/**
 * Create a new Semaphore group for a proposal's voters.
 * Members are identified by their identity commitments.
 */
export function createGroup(members: bigint[] = []): Group {
  const group = new Group();
  for (const member of members) {
    group.addMember(member);
  }
  return group;
}

/**
 * Add a member to an existing group.
 */
export function addMember(group: Group, commitment: bigint): void {
  group.addMember(commitment);
}

/**
 * Check if a commitment is a member of the group.
 */
export function isMember(group: Group, commitment: bigint): boolean {
  return group.indexOf(commitment) !== -1;
}

/**
 * Export group members for storage/transmission.
 */
export function exportMembers(group: Group): string[] {
  return group.members.map((m) => m.toString());
}
