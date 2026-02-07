"use client";

import { useState, useEffect } from "react";

export default function IdentityPage() {
  const [identity, setIdentity] = useState<{
    commitment: string;
    hasPrivateKey: boolean;
  } | null>(null);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    // Check if identity exists in localStorage
    const stored = localStorage.getItem("unita-identity");
    if (stored) {
      const parsed = JSON.parse(stored);
      setIdentity({
        commitment: parsed.commitment,
        hasPrivateKey: true,
      });
    }
  }, []);

  async function handleCreate() {
    setCreating(true);
    try {
      // Dynamic import — Semaphore SNARK artifacts are ~15MB, only load when needed
      const { createIdentity, getCommitment, exportIdentity } = await import(
        "@unita/zk"
      );
      const id = createIdentity();
      const commitment = getCommitment(id).toString();
      const privateKey = exportIdentity(id);

      localStorage.setItem(
        "unita-identity",
        JSON.stringify({ commitment, privateKey })
      );

      setIdentity({ commitment, hasPrivateKey: true });
    } catch (err) {
      console.error("Failed to create identity:", err);
    } finally {
      setCreating(false);
    }
  }

  function handleClear() {
    localStorage.removeItem("unita-identity");
    setIdentity(null);
  }

  return (
    <div className="mx-auto max-w-xl">
      <h1 className="text-2xl font-bold">ZK Identity</h1>
      <p className="mt-2 text-sm text-neutral-400">
        Your Semaphore identity lets you vote anonymously. The private key stays
        in your browser — it is never sent to any server.
      </p>

      {identity ? (
        <div className="mt-8 space-y-4">
          <div className="rounded-lg border border-green-900 bg-green-950 p-5">
            <p className="text-sm font-medium text-green-300">
              Identity Active
            </p>
            <p className="mt-2 text-xs text-neutral-400">
              Commitment (public identifier):
            </p>
            <code className="mt-1 block break-all rounded bg-neutral-900 p-2 text-xs text-neutral-300">
              {identity.commitment}
            </code>
          </div>

          <p className="text-xs text-neutral-500">
            This commitment is safe to share. It proves group membership without
            revealing your identity.
          </p>

          <button
            onClick={handleClear}
            className="rounded-md border border-red-800 px-4 py-2 text-sm text-red-400 hover:bg-red-950"
          >
            Delete Identity
          </button>
        </div>
      ) : (
        <div className="mt-8">
          <button
            onClick={handleCreate}
            disabled={creating}
            className="w-full rounded-md bg-white px-4 py-3 text-sm font-medium text-neutral-900 hover:bg-neutral-200 disabled:opacity-50"
          >
            {creating
              ? "Generating identity (downloading SNARK artifacts ~15MB)..."
              : "Generate ZK Identity"}
          </button>
          <p className="mt-3 text-xs text-neutral-500">
            Creates an EdDSA keypair using Semaphore v4. Your private key is
            stored locally in your browser only.
          </p>
        </div>
      )}
    </div>
  );
}
