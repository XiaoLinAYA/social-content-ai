const TWITTER_API_BASE = 'https://api.twitter.com/2';
const LINKEDIN_API_BASE = 'https://api.linkedin.com/v2';

export interface TwitterCredentials {
  access_token: string;
  refresh_token?: string;
  expires_at?: number;
}

export interface LinkedInCredentials {
  access_token: string;
  refresh_token?: string;
  expires_at?: number;
}

export async function postToTwitter(
  content: string,
  credentials: TwitterCredentials
): Promise<{ success: boolean; tweet_id?: string; error?: string }> {
  try {
    const response = await fetch(`${TWITTER_API_BASE}/tweets`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${credentials.access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: content }),
    });

    if (!response.ok) {
      const error = await response.json();
      return { success: false, error: error.detail || 'Failed to post tweet' };
    }

    const data = await response.json();
    return { success: true, tweet_id: data.data?.id };
  } catch (error) {
    return { success: false, error: 'Network error posting to Twitter' };
  }
}

export async function postToLinkedIn(
  content: string,
  credentials: LinkedInCredentials,
  authorUrn: string
): Promise<{ success: boolean; post_id?: string; error?: string }> {
  try {
    const response = await fetch(`${LINKEDIN_API_BASE}/ugcPosts`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${credentials.access_token}`,
        'Content-Type': 'application/json',
        'X-Restli-Protocol-Version': '2.0.0',
      },
      body: JSON.stringify({
        author: authorUrn,
        lifecycleState: 'PUBLISHED',
        specificContent: {
          'com.linkedin.ugc.ShareContent': {
            shareCommentary: { text: content },
            shareMediaCategory: 'NONE',
          },
        },
        visibility: {
          'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC',
        },
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      return { success: false, error: error.message || 'Failed to post to LinkedIn' };
    }

    const data = await response.json();
    return { success: true, post_id: data.id };
  } catch (error) {
    return { success: false, error: 'Network error posting to LinkedIn' };
  }
}

export async function getTwitterUser(credentials: TwitterCredentials) {
  const response = await fetch(`${TWITTER_API_BASE}/users/me`, {
    headers: { Authorization: `Bearer ${credentials.access_token}` },
  });
  return response.json();
}

export async function getLinkedInUser(credentials: LinkedInCredentials) {
  const response = await fetch(`${LINKEDIN_API_BASE}/me`, {
    headers: { Authorization: `Bearer ${credentials.access_token}` },
  });
  return response.json();
}
