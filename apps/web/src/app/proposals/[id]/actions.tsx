"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export function RequestAnalysisButton({ proposalId }: { proposalId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ proposalId }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Analysis failed");
      }
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <button
        className="mt-3 rounded-md bg-neutral-800 px-4 py-2 text-sm hover:bg-neutral-700 disabled:opacity-50"
        onClick={handleClick}
        disabled={loading}
      >
        {loading ? "Analyzing... (may take 30s)" : "Request Analysis"}
      </button>
      {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
    </div>
  );
}

/**
 * Combined registration + voting component.
 * Handles: identity check, registration, and ZK proof generation.
 *
 * Server passes the list of registered commitments so client can check
 * localStorage identity against it without another round-trip.
 */
export function VotingPanel({
  proposalId,
  groupId,
  memberCommitments,
}: {
  proposalId: string;
  groupId: string | null;
  memberCommitments: string[];
}) {
  const router = useRouter();
  const [hasIdentity, setHasIdentity] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [registering, setRegistering] = useState(false);
  const [voting, setVoting] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"info" | "error" | "success">("info");

  useEffect(() => {
    const stored = localStorage.getItem("unita-identity");
    if (stored) {
      const { commitment } = JSON.parse(stored);
      setHasIdentity(true);
      setIsRegistered(memberCommitments.includes(commitment));
    }
  }, [memberCommitments]);

  if (!groupId) {
    return (
      <p className="mt-4 text-sm text-neutral-500">
        This proposal was created before group voting was enabled.
      </p>
    );
  }

  async function handleRegister() {
    setRegistering(true);
    setMessage(null);
    try {
      const stored = localStorage.getItem("unita-identity");
      if (!stored) return;
      const { commitment } = JSON.parse(stored);

      const res = await fetch("/api/groups/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ proposalId, identityCommitment: commitment }),
      });

      if (res.status === 409) {
        setIsRegistered(true);
        return;
      }

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Registration failed");
      }

      setIsRegistered(true);
      setMessage("Registered successfully.");
      setMessageType("success");
      router.refresh();
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Unknown error");
      setMessageType("error");
    } finally {
      setRegistering(false);
    }
  }

  async function handleVote(vote: boolean) {
    setVoting(true);
    setMessage(null);
    try {
      const stored = localStorage.getItem("unita-identity");
      if (!stored) {
        setMessage("No ZK identity found.");
        setMessageType("error");
        setVoting(false);
        return;
      }
      const { privateKey } = JSON.parse(stored);

      // Dynamic import of ZK library (heavy WASM, ~15MB on first use)
      setLoadingText("Loading ZK library...");
      const { restoreIdentity, createGroup, generateVoteProof } = await import(
        "@unita/zk"
      );

      // Restore identity
      const identity = restoreIdentity(privateKey);

      // Fetch latest group members to build Merkle tree
      setLoadingText("Fetching group members...");
      const membersRes = await fetch(`/api/groups/${groupId}/members`);
      const { members } = await membersRes.json();
      const group = createGroup(members.map((c: string) => BigInt(c)));

      // Generate ZK proof (10-30s)
      setLoadingText("Generating ZK proof... (10-30s, ~15MB download on first use)");
      const proof = await generateVoteProof(
        identity,
        group,
        vote ? "1" : "0",
        proposalId
      );

      // Submit vote
      setLoadingText("Submitting vote...");
      const res = await fetch("/api/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          proposalId,
          vote,
          nullifierHash: proof.nullifier.toString(),
          proof,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Vote failed");
      }

      setMessage(vote ? "Voted YES" : "Voted NO");
      setMessageType("success");
      router.refresh();
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Unknown error");
      setMessageType("error");
    } finally {
      setVoting(false);
      setLoadingText("");
    }
  }

  return (
    <div className="mt-4">
      {/* Step 1: Identity */}
      {!hasIdentity && (
        <div className="rounded-lg border border-amber-800 bg-amber-950 p-4">
          <p className="text-sm text-amber-300">
            You need a ZK identity to register and vote.
          </p>
          <a
            href="/identity"
            className="mt-2 inline-block rounded-md bg-amber-900 px-4 py-2 text-sm text-amber-200 hover:bg-amber-800"
          >
            Create ZK Identity
          </a>
        </div>
      )}

      {/* Step 2: Registration */}
      {hasIdentity && !isRegistered && (
        <div>
          <button
            className="rounded-md bg-neutral-800 px-4 py-2 text-sm hover:bg-neutral-700 disabled:opacity-50"
            onClick={handleRegister}
            disabled={registering}
          >
            {registering ? "Registering..." : "Register to Vote"}
          </button>
          <p className="mt-1 text-xs text-neutral-500">
            Registers your identity commitment with this proposal&apos;s voting group.
          </p>
        </div>
      )}

      {/* Step 3: Registered — show vote buttons */}
      {hasIdentity && isRegistered && (
        <div>
          <div className="mb-3 rounded-lg border border-green-800 bg-green-950 p-3">
            <p className="text-sm text-green-300">Registered to vote.</p>
          </div>
          <div className="flex gap-4">
            <button
              className="flex-1 rounded-md border border-green-800 bg-green-950 px-4 py-3 text-green-300 hover:bg-green-900 disabled:opacity-50"
              onClick={() => handleVote(true)}
              disabled={voting}
            >
              Vote YES
            </button>
            <button
              className="flex-1 rounded-md border border-red-800 bg-red-950 px-4 py-3 text-red-300 hover:bg-red-900 disabled:opacity-50"
              onClick={() => handleVote(false)}
              disabled={voting}
            >
              Vote NO
            </button>
          </div>
        </div>
      )}

      {/* Loading state */}
      {voting && loadingText && (
        <p className="mt-2 text-sm text-neutral-400 animate-pulse">
          {loadingText}
        </p>
      )}

      {/* Messages */}
      {message && (
        <p
          className={`mt-2 text-sm ${
            messageType === "error"
              ? "text-red-400"
              : messageType === "success"
                ? "text-green-400"
                : "text-neutral-400"
          }`}
        >
          {message}
        </p>
      )}

      <p className="mt-3 text-xs text-neutral-600">
        Votes are anonymous — ZK proofs verify membership without revealing
        identity.
      </p>
    </div>
  );
}
