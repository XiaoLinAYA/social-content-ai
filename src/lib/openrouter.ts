const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || '';
const OPENROUTER_BASE_URL = 'https://openrouter.ai/api/v1';

export type ContentPlatform = 'twitter' | 'linkedin' | 'instagram';

interface GenerateContentOptions {
  platform: ContentPlatform;
  topic?: string;
  tone?: 'professional' | 'casual' | 'humorous' | 'inspirational';
  include_hashtags?: boolean;
  max_length?: number;
}

const PLATFORM_PROMPTS = {
  twitter: {
    system: 'You are an expert social media copywriter for Twitter/X. Create engaging, concise posts (max 280 characters) that drive engagement.',
    length: 280,
  },
  linkedin: {
    system: 'You are a professional content creator for LinkedIn. Create thought-provoking posts that establish expertise and drive professional engagement.',
    length: 3000,
  },
  instagram: {
    system: 'You are a creative social media manager for Instagram. Create captivating captions that complement visual content and drive engagement.',
    length: 2200,
  },
};

export async function generateContent(options: GenerateContentOptions): Promise<string> {
  const { platform, topic = 'AI and automation for businesses', tone = 'professional', include_hashtags = true } = options;
  const config = PLATFORM_PROMPTS[platform];

  const hashtags = include_hashtags
    ? platform === 'twitter'
      ? '\n\n#AI #Automation #SocialMedia'
      : platform === 'linkedin'
      ? '\n\n#AI #Automation #DigitalMarketing'
      : '\n\n#AI #ContentCreation #SocialMedia'
    : '';

  const userMessage = `Generate a ${tone} ${platform} post about: ${topic}${hashtags}`;

  try {
    const response = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
        'X-Title': 'SocialContent AI',
      },
      body: JSON.stringify({
        model: 'anthropic/claude-3-haiku',
        messages: [
          { role: 'system', content: config.system },
          { role: 'user', content: userMessage },
        ],
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenRouter API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || 'Unable to generate content';
  } catch (error) {
    console.error('Content generation error:', error);
    throw error;
  }
}

export async function generateBatchContent(
  platform: ContentPlatform,
  topics: string[],
  tone: 'professional' | 'casual' | 'humorous' | 'inspirational' = 'professional'
): Promise<string[]> {
  const results = await Promise.all(
    topics.map(topic => generateContent({ platform, topic, tone }))
  );
  return results;
}
