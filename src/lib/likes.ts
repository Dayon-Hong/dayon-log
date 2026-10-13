/**
 * Optional likes API for a future Cloudflare Worker + D1 deployment.
 * No request is sent until PUBLIC_LIKES_API_URL is configured.
 * The server owns counting and duplicate prevention; the browser never invents a count.
 */
const apiBase = import.meta.env.PUBLIC_LIKES_API_URL?.replace(/\/$/, '');

export const likesAvailable = Boolean(apiBase);

export interface LikeState {
  count: number;
  liked: boolean;
}

function validate(value: unknown): LikeState {
  if (!value || typeof value !== 'object') throw new Error('Invalid likes response');
  const data = value as Record<string, unknown>;
  if (!Number.isSafeInteger(data.count) || (data.count as number) < 0 || typeof data.liked !== 'boolean') {
    throw new Error('Invalid likes response');
  }
  return { count: data.count as number, liked: data.liked };
}

async function request(postId: string, method: 'GET' | 'POST'): Promise<LikeState> {
  if (!apiBase) throw new Error('Likes API is not configured');
  const response = await fetch(`${apiBase}/likes/${encodeURIComponent(postId)}`, {
    method,
    credentials: 'omit',
    headers: { Accept: 'application/json' },
  });
  if (!response.ok) throw new Error(`Likes API returned ${response.status}`);
  return validate(await response.json());
}

export const getLikeState = (postId: string) => request(postId, 'GET');
export const addLike = (postId: string) => request(postId, 'POST');
