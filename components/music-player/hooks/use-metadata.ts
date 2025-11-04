import { IAudioMetadata, parseBlob } from "music-metadata";
import { useCallback, useEffect, useRef, useState } from "react";

export const useMetadata = (audioUrl: string) => {
  const [metadata, setMetadata] = useState<IAudioMetadata | null>(null);
  const [coverUrl, setCoverUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const isRequestInProgress = useRef(false);
  const currentCoverUrl = useRef<string | null>(null);

  const extractMetadata = useCallback(async (url: string) => {
    if (!url || isRequestInProgress.current) {
      return;
    }

    setLoading(true);
    setError(null);
    isRequestInProgress.current = true;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Failed to fetch audio: ${response.statusText}`);
      }

      const blob = await response.blob();
      const meta = await parseBlob(blob);

      setMetadata(meta);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Failed to fetch parse audio"),
      );
      setMetadata(null);
    } finally {
      setLoading(false);
      isRequestInProgress.current = false;
    }
  }, []);

  const clearMetadata = useCallback(() => {
    if (currentCoverUrl.current) {
      URL.revokeObjectURL(currentCoverUrl.current);
      currentCoverUrl.current = null;
    }

    setMetadata(null);
    setCoverUrl(null);
    setError(null);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (currentCoverUrl.current) {
      URL.revokeObjectURL(currentCoverUrl.current);
      currentCoverUrl.current = null;
    }

    if (!metadata?.common.picture?.length) {
      setCoverUrl(null);

      return;
    }

    const picture = metadata.common.picture[0];
    const uint8Array = new Uint8Array(picture.data);
    const blob = new Blob([uint8Array], { type: picture.format });
    const url = URL.createObjectURL(blob);

    currentCoverUrl.current = url;
    setCoverUrl(url);
  }, [metadata]);

  useEffect(() => {
    if (audioUrl) {
      extractMetadata(audioUrl);
    } else {
      clearMetadata();
    }

    return () => {
      clearMetadata();
    };
  }, [audioUrl, extractMetadata]);

  return {
    metadata,
    coverUrl,
    loading,
    error,
    refresh: () => audioUrl && extractMetadata(audioUrl),
    clearMetadata,
  };
};
