import { NextRequest, NextResponse } from 'next/server';
import { postToTwitter, postToLinkedIn } from '@/lib/social-posting';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { platform, content, access_token, author_urn } = body;

    if (!platform || !content || !access_token) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    let result;
    switch (platform) {
      case 'twitter':
        result = await postToTwitter(content, { access_token });
        break;
      case 'linkedin':
        if (!author_urn) {
          return NextResponse.json(
            { error: 'LinkedIn requires author_urn' },
            { status: 400 }
          );
        }
        result = await postToLinkedIn(content, { access_token }, author_urn);
        break;
      default:
        return NextResponse.json(
          { error: 'Unsupported platform' },
          { status: 400 }
        );
    }

    if (result.success) {
      const postId = (result as { tweet_id?: string }).tweet_id || (result as { post_id?: string }).post_id;
      return NextResponse.json({ success: true, postId });
    } else {
      return NextResponse.json({ success: false, error: result.error }, { status: 500 });
    }
  } catch (error) {
    console.error('Post error:', error);
    return NextResponse.json(
      { error: 'Failed to post content' },
      { status: 500 }
    );
  }
}
