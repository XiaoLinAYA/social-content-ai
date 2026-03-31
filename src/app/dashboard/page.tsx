"use client";

import { useState } from "react";
import Link from "next/link";

type Platform = "twitter" | "linkedin" | "instagram";
type Tone = "professional" | "casual" | "humorous" | "inspirational";

export default function DashboardPage() {
  const [platform, setPlatform] = useState<Platform>("twitter");
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState<Tone>("professional");
  const [generating, setGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setGenerating(true);
    setError(null);
    setGeneratedContent(null);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ platform, topic, tone }),
      });

      const data = await response.json();

      if (data.success) {
        setGeneratedContent(data.content);
      } else {
        setError(data.error || "Failed to generate content");
      }
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <header className="bg-gray-800 border-b border-gray-700">
        <nav className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-white">
            SocialContent AI
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-gray-300">Welcome!</span>
            <button className="text-gray-300 hover:text-white transition">Logout</button>
          </div>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-8">Dashboard</h1>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-6">Generate Content</h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Platform
                </label>
                <div className="flex gap-2">
                  {(["twitter", "linkedin", "instagram"] as Platform[]).map((p) => (
                    <button
                      key={p}
                      onClick={() => setPlatform(p)}
                      className={`px-4 py-2 rounded-lg capitalize transition ${
                        platform === p
                          ? "bg-blue-600 text-white"
                          : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Topic
                </label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="AI and automation for businesses"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Tone
                </label>
                <div className="flex gap-2 flex-wrap">
                  {(["professional", "casual", "humorous", "inspirational"] as Tone[]).map(
                    (t) => (
                      <button
                        key={t}
                        onClick={() => setTone(t)}
                        className={`px-4 py-2 rounded-lg capitalize transition ${
                          tone === t
                            ? "bg-blue-600 text-white"
                            : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                        }`}
                      >
                        {t}
                      </button>
                    )
                  )}
                </div>
              </div>

              <button
                onClick={handleGenerate}
                disabled={generating}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white py-3 rounded-lg font-semibold transition"
              >
                {generating ? "Generating..." : "Generate Content"}
              </button>

              {error && (
                <div className="bg-red-500/20 border border-red-500 text-red-400 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-6">Generated Content</h2>

            {generatedContent ? (
              <div>
                <div className="bg-gray-700 rounded-lg p-4 text-white whitespace-pre-wrap mb-4">
                  {generatedContent}
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition">
                    Copy to Clipboard
                  </button>
                  <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition">
                    Schedule Post
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-gray-400 text-center py-12">
                <p>Your generated content will appear here</p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 bg-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-6">Quick Stats</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">0</div>
              <div className="text-gray-400">Posts Generated</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">0</div>
              <div className="text-gray-400">Posts Scheduled</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">0</div>
              <div className="text-gray-400">Accounts Connected</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">30</div>
              <div className="text-gray-400">Posts Remaining</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
