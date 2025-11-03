import { useCallback, useEffect, useState } from "react";
import * as mm from "music-metadata";

export interface AudioMetadataProps {
  title?: string;
  artist?: string;
  album?: string;
  year?: string;
  genre?: string;
  duration?: number;
  bitrate?: string;
  format?: string;
  coverArt?: {
    format: string;
    data: Uint8Array;
  } | null;
}

export const useAudioMetadata = (src: string) => {
  const [metadata, setMetadata] = useState<AudioMetadataProps>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const extractMetadata = useCallback(async (audioSrc: string) => {
    if (!audioSrc) return;

    setIsLoading(true);
    setError(null);

    try {
      if (audioSrc.startsWith("blob:")) {
        const response = await fetch(audioSrc);

        if (!response.ok) {
          throw new Error("Failed to fetch audio file");
        }

        const blob = await response.blob();
        const buffer = await blob.arrayBuffer();
        const uint8Array = new Uint8Array(buffer);

        const metadata = await mm.parseBuffer(uint8Array);

        processMetadata(metadata);

        console.log(metadata);
      } else {
        const response = await fetch(audioSrc);

        if (!response.ok) {
          throw new Error("Failed to fetch audio file");
        }

        const buffer = await response.arrayBuffer();
        const uint8Array = new Uint8Array(buffer);

        const metadata = await mm.parseBuffer(uint8Array);

        processMetadata(metadata);

        console.log(metadata);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to extract metadata",
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  const processMetadata = (parsedMetadata: mm.IAudioMetadata) => {
    const common = parsedMetadata.common;
    const format = parsedMetadata.format;

    setMetadata({
      title: common.title,
      artist: common.artist,
      album: common.album,
      year: common.year?.toString() || undefined,
      genre: common.genre?.[0],
      duration: format.duration,
      format: format.container || format.codec,
      coverArt:
        common.picture && common.picture.length > 0
          ? {
            format: common.picture[0].format,
            data: common.picture[0].data,
          }
          : null,
    });
  };

  const createCoverArtUrl = useCallback(
    (coverData?: { format: string; data: Uint8Array } | null) => {
      if (!coverData || !coverData.data) return null;

      try {
        const uint8Array = new Uint8Array(coverData.data);
        const blob = new Blob([uint8Array], { type: coverData.format });

        return URL.createObjectURL(blob);
      } catch (err) {
        console.log("Error creating cover art url:", err);

        return null;
      }
    },

    [],
  );

  const clearMetadata = useCallback(() => {
    (setMetadata({}), setError(null));
  }, []);

  useEffect(() => {
    if (src) {
      extractMetadata(src);
    } else {
      clearMetadata();
    }

    return () => { };
  }, [src, extractMetadata, clearMetadata]);

  return {
    metadata,
    isLoading,
    error,
    extractMetadata,
    createCoverArtUrl,
    clearMetadata,
  };
};
