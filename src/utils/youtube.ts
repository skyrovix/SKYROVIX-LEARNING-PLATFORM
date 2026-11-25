export const SKYROVIX_YOUTUBE_CHANNEL = 'https://www.youtube.com/@skyrovix';

/**
 * Extracts an 11-character YouTube video ID from standard watch, youtu.be,
 * shorts, live, or embed URLs (or returns raw ID if already 11 chars).
 */
export function extractYouTubeId(input: string): string | null {
  if (!input) return null;
  const trimmed = input.trim();

  // Raw 11-char ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }

  try {
    const url = new URL(trimmed.startsWith('http') ? trimmed : `https://${trimmed}`);
    const host = url.hostname.replace(/^www\./, '').toLowerCase();

    if (host === 'youtu.be') {
      const id = url.pathname.split('/').filter(Boolean)[0];
      return id ? id.slice(0, 11) : null;
    }

    if (host === 'youtube.com' || host === 'm.youtube.com' || host === 'youtube-nocookie.com') {
      const vParam = url.searchParams.get('v');
      if (vParam) return vParam.slice(0, 11);

      const parts = url.pathname.split('/').filter(Boolean);
      if (parts.length >= 2 && ['embed', 'shorts', 'live', 'v'].includes(parts[0])) {
        return parts[1].slice(0, 11);
      }
    }
  } catch {
    // Fallback regex
    const match = trimmed.match(/(?:v=|youtu\.be\/|embed\/|shorts\/|live\/)([a-zA-Z0-9_-]{11})/);
    if (match?.[1]) return match[1];
  }

  return null;
}

/**
 * Normalizes any YouTube video URL to an embeddable https://www.youtube.com/embed/{id} URL.
 */
export function toYouTubeEmbedUrl(url: string): string {
  const id = extractYouTubeId(url);
  if (id) {
    return `https://www.youtube.com/embed/${id}`;
  }
  return url.trim();
}

export function isYouTubeUrl(url: string): boolean {
  if (!url) return false;
  const lower = url.toLowerCase();
  return lower.includes('youtube.com') || lower.includes('youtu.be') || Boolean(extractYouTubeId(url));
}

export function getYouTubeThumbnail(url: string): string | null {
  const id = extractYouTubeId(url);
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null;
}
