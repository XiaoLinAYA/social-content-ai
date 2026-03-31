import { NextRequest, NextResponse } from 'next/server';
import { generateContent, ContentPlatform } from '@/lib/openrouter';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { platform, topic, tone, include_hashtags } = body;

    if (!platform || !['twitter', 'linkedin', 'instagram'].includes(platform)) {
      return NextResponse.json(
        { error: 'Invalid platform. Must be twitter, linkedin, or instagram.' },
        { status: 400 }
      );
    }

    const content = await generateContent({
      platform: platform as ContentPlatform,
      topic,
      tone,
      include_hashtags,
    });

    return NextResponse.json({ content, success: true });
  } catch (error) {
    console.error('Content generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate content' },
      { status: 500 }
    );
  }
}
