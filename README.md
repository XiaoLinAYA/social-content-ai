# SocialContent AI

AI-powered social media content automation platform.

## Features

- Generate engaging social media posts with AI
- Support for X (Twitter), LinkedIn, and Instagram
- Schedule and automate content posting
- Three pricing tiers: Starter ($9), Pro ($29), Enterprise ($99)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Edit .env.local with your API keys
```

### Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# OpenRouter (for AI content generation)
OPENROUTER_API_KEY=your_openrouter_api_key

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

# Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Build

```bash
npm run build
npm start
```

## Tech Stack

- **Frontend:** Next.js 14, React 18, Tailwind CSS
- **Backend:** Next.js API routes
- **Database:** Supabase (Postgres + Auth)
- **AI:** OpenRouter (Claude, Llama models)
- **Payments:** Stripe

## Cost Structure

| Component | Provider | Free Tier |
|-----------|----------|-----------|
| Hosting | Railway/Render | Up to $5/month |
| AI | OpenRouter | Free credits |
| Database | Supabase | 500MB storage |
| **Total** | | **$0-5/month** |

## Revenue Model

- **Starter ($9/mo):** 30 posts, 1 account
- **Pro ($29/mo):** 90 posts, 3 accounts
- **Enterprise ($99/mo):** Unlimited everything

Target: 11 Starter customers = $99/month

## Deployment

### Vercel (Recommended)

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Set environment variables in Vercel dashboard.

### Render

1. Connect your GitHub repo to Render
2. Create a Web Service with:
   - Build Command: `npm run build`
   - Start Command: `npm start`
3. Add environment variables in Render dashboard.

### Railway

1. Connect your GitHub repo to Railway
2. Railway auto-detects Next.js
3. Add environment variables in Railway dashboard.

## Required API Keys

Before deploying, set up these services:

1. **Supabase**: Create project at supabase.com
   - Get `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`

2. **OpenRouter**: Create account at openrouter.ai
   - Get free credits
   - Get `OPENROUTER_API_KEY`

3. **Stripe**: Create account at stripe.com
   - Create 3 products with prices
   - Get `STRIPE_SECRET_KEY` and `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - Set up price IDs in environment variables:
     - `STRIPE_STARTER_PRICE_ID`
     - `STRIPE_PRO_PRICE_ID`
     - `STRIPE_ENTERPRISE_PRICE_ID`

4. **Twitter/X**: Create developer account
   - Create App with OAuth 2.0
   - Get `TWITTER_CLIENT_ID` and `TWITTER_CLIENT_SECRET`

5. **LinkedIn**: Create developer app
   - Get `LINKEDIN_CLIENT_ID` and `LINKEDIN_CLIENT_SECRET`
