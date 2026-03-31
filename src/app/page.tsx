import Link from "next/link";

const pricingTiers = [
  {
    name: "Starter",
    price: 9,
    description: "Perfect for individuals and small creators",
    features: [
      "30 AI-generated posts/month",
      "1 social account",
      "X (Twitter) integration",
      "Basic analytics",
      "Email support",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    price: 29,
    description: "For growing businesses and creators",
    features: [
      "90 AI-generated posts/month",
      "3 social accounts",
      "X + LinkedIn integration",
      "Advanced analytics",
      "Content scheduling",
      "Priority support",
    ],
    cta: "Get Started",
    popular: true,
  },
  {
    name: "Enterprise",
    price: 99,
    description: "For agencies and large teams",
    features: [
      "Unlimited posts",
      "Unlimited accounts",
      "All platforms",
      "White-label option",
      "API access",
      "Dedicated support",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <header className="border-b border-gray-700">
        <nav className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-white">SocialContent AI</div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-gray-300 hover:text-white transition">
              Login
            </Link>
            <Link
              href="/signup"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
            >
              Sign Up
            </Link>
          </div>
        </nav>
      </header>

      <main>
        <section className="max-w-6xl mx-auto px-4 py-20 text-center">
          <h1 className="text-5xl font-bold text-white mb-6">
            AI-Powered Social Media
            <br />
            <span className="text-blue-400">Content Automation</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10">
            Generate engaging social media posts in seconds. Schedule them automatically.
            Grow your presence without the daily grind.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/signup"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition"
            >
              Start Free Trial
            </Link>
            <a
              href="#pricing"
              className="border border-gray-500 hover:border-gray-400 text-white px-8 py-3 rounded-lg text-lg transition"
            >
              View Pricing
            </a>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-800 rounded-xl p-6">
              <div className="text-4xl mb-4">1️⃣</div>
              <h3 className="text-xl font-semibold text-white mb-2">Connect Accounts</h3>
              <p className="text-gray-400">
                Link your X, LinkedIn, or Instagram accounts in seconds.
              </p>
            </div>
            <div className="bg-gray-800 rounded-xl p-6">
              <div className="text-4xl mb-4">2️⃣</div>
              <h3 className="text-xl font-semibold text-white mb-2">AI Generates Content</h3>
              <p className="text-gray-400">
                Our AI creates engaging posts tailored to your industry and audience.
              </p>
            </div>
            <div className="bg-gray-800 rounded-xl p-6">
              <div className="text-4xl mb-4">3️⃣</div>
              <h3 className="text-xl font-semibold text-white mb-2">Schedule & Publish</h3>
              <p className="text-gray-400">
                Review, edit if needed, and schedule posts for optimal times.
              </p>
            </div>
          </div>
        </section>

        <section id="pricing" className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-gray-400 text-center mb-12">
            Start free. Scale as you grow.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {pricingTiers.map((tier) => (
              <div
                key={tier.name}
                className={`rounded-xl p-6 ${
                  tier.popular
                    ? "bg-blue-600 ring-2 ring-blue-400"
                    : "bg-gray-800"
                }`}
              >
                {tier.popular && (
                  <span className="inline-block bg-yellow-400 text-gray-900 text-xs font-bold px-2 py-1 rounded mb-4">
                    MOST POPULAR
                  </span>
                )}
                <h3 className="text-xl font-semibold text-white mb-2">{tier.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-white">${tier.price}</span>
                  <span className="text-gray-300">/month</span>
                </div>
                <p className="text-gray-300 text-sm mb-6">{tier.description}</p>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-gray-200">
                      <span className="text-green-400">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 rounded-lg font-semibold transition ${
                    tier.popular
                      ? "bg-white text-blue-600 hover:bg-gray-100"
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                  }`}
                >
                  {tier.cta}
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Automate Your Social Media?
          </h2>
          <p className="text-gray-400 mb-8">
            Join hundreds of businesses already using AI to scale their content.
          </p>
          <Link
            href="/signup"
            className="inline-block bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition"
          >
            Start Your Free Trial
          </Link>
        </section>
      </main>

      <footer className="border-t border-gray-700 mt-20">
        <div className="max-w-6xl mx-auto px-4 py-8 text-center text-gray-400">
          <p>© 2024 SocialContent AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
