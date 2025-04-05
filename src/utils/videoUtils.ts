
/**
 * Extract video ID from YouTube, Vimeo, or other video platform URLs
 */
export const extractVideoId = (url: string): { platform: string; id: string } | null => {
  // YouTube
  const youtubeRegex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const youtubeMatch = url.match(youtubeRegex);
  if (youtubeMatch) {
    return { platform: 'youtube', id: youtubeMatch[1] };
  }
  
  // Vimeo
  const vimeoRegex = /(?:vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|)(\d+)(?:|\/\?)|player\.vimeo\.com\/video\/(\d+))/;
  const vimeoMatch = url.match(vimeoRegex);
  if (vimeoMatch) {
    return { platform: 'vimeo', id: vimeoMatch[1] || vimeoMatch[2] };
  }
  
  return null;
};

/**
 * Get thumbnail URL based on video URL (YouTube, Vimeo, etc.)
 */
export const getVideoThumbnail = async (videoUrl: string): Promise<string> => {
  if (!videoUrl) {
    throw new Error("No video URL provided");
  }
  
  const videoInfo = extractVideoId(videoUrl);
  if (!videoInfo) {
    throw new Error("Unsupported video URL format");
  }
  
  if (videoInfo.platform === 'youtube') {
    // YouTube thumbnails (use maxresdefault for best quality)
    return `https://img.youtube.com/vi/${videoInfo.id}/mqdefault.jpg`;
  } else if (videoInfo.platform === 'vimeo') {
    try {
      // Vimeo requires an API call to get the thumbnail
      const response = await fetch(`https://vimeo.com/api/v2/video/${videoInfo.id}.json`);
      const data = await response.json();
      return data[0].thumbnail_large;
    } catch (error) {
      console.error("Error fetching Vimeo thumbnail:", error);
      throw error;
    }
  }
  
  throw new Error("Unsupported video platform");
};
