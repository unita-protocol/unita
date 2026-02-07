"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewProposalPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/proposals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create proposal");
      }

      const { id } = await res.json();

      // Fire AI analysis in background — don't await
      fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ proposalId: id }),
      }).catch(() => {
        // Analysis failure is non-critical — user can retry from proposal page
      });

      router.push(`/proposals/${id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-xl">
      <h1 className="text-2xl font-bold">New Proposal</h1>
      <p className="mt-2 text-sm text-neutral-400">
        Submit a proposal for AI-powered analysis and anonymous community
        voting.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-neutral-300"
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            required
            maxLength={256}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 w-full rounded-md border border-neutral-700 bg-neutral-900 px-3 py-2 text-neutral-100 placeholder-neutral-500 focus:border-neutral-500 focus:outline-none"
            placeholder="e.g., Universal Basic Income pilot program"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-neutral-300"
          >
            Description
          </label>
          <textarea
            id="description"
            required
            rows={8}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 w-full rounded-md border border-neutral-700 bg-neutral-900 px-3 py-2 text-neutral-100 placeholder-neutral-500 focus:border-neutral-500 focus:outline-none"
            placeholder="Describe the proposal in detail. What problem does it solve? What resources are needed? Who benefits?"
          />
        </div>

        {error && (
          <p className="text-sm text-red-400">{error}</p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-md bg-white px-4 py-2 text-sm font-medium text-neutral-900 hover:bg-neutral-200 disabled:opacity-50"
        >
          {submitting ? "Creating..." : "Create Proposal"}
        </button>

        <p className="text-xs text-neutral-500 text-center">
          AI analysis by 3 agents (Ijtihad, Economist, Guardian) starts automatically after creation.
        </p>
      </form>
    </div>
  );
}
