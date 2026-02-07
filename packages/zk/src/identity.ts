import { Identity } from "@semaphore-protocol/core";

/**
 * Create a new Semaphore identity (EdDSA keypair).
 * The private key is stored client-side only — never sent to the server.
 */
export function createIdentity(): Identity {
  return new Identity();
}

/**
 * Restore an identity from a stored private key.
 */
export function restoreIdentity(privateKey: string): Identity {
  return new Identity(privateKey);
}

/**
 * Get the identity commitment (public identifier) for group membership.
 * This is safe to share — it reveals nothing about the private key.
 */
export function getCommitment(identity: Identity): bigint {
  return identity.commitment;
}

/**
 * Serialize identity private key for secure local storage.
 */
export function exportIdentity(identity: Identity): string {
  return identity.export();
}
