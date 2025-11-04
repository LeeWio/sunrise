import { Button, Card } from "@heroui/react";
import { NodeViewProps, NodeViewWrapper } from "@tiptap/react";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

import { useAudioMetadata } from "./use-audio-metadata";

import { PlayFillIcon, PauseFillIcon } from "@/components/icons";

interface AudioViewProps extends NodeViewProps { }

export const AudioView: React.FC<AudioViewProps> = ({
  node,
  selected,
  updateAttributes,
}) => {
  const { src, title, artist, album, controls, autoplay } = node.attrs;

  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  const {
    metadata,
    isLoading: isMetadataLoading,
    createCoverArtUrl,
  } = useAudioMetadata(src);

  const [coverArtUrl, setCoverArtUrl] = useState<string | null>(null);

  useEffect(() => {
    if (metadata.coverArt) {
      const url = createCoverArtUrl(metadata.coverArt);

      setCoverArtUrl(url);
    } else {
      setCoverArtUrl(null);
    }

    return () => {
      if (coverArtUrl && coverArtUrl.startsWith("blob:")) {
        URL.revokeObjectURL(coverArtUrl);
      }
    };
  }, [metadata.coverArt, createCoverArtUrl]);

  const displayTitle = useMemo(
    () => title || metadata.title || "Unknown Title",
    [title, metadata.title],
  );

  const displayArtist = useMemo(
    () => artist || metadata.artist || "Unknown Artist",
    [artist, metadata.artist],
  );

  const displayAlbum = useMemo(
    () => album || metadata.album || "",
    [album, metadata.album],
  );

  useEffect(() => {
    if (src && metadata.title && !title) {
      updateAttributes({ title: metadata.title });
    }

    if (src && metadata.artist && !artist) {
      updateAttributes({ artist: metadata.artist });
    }

    if (src && metadata.album && !album) {
      updateAttributes({ album: metadata.album });
    }
  }, [metadata, src, title, artist, album, updateAttributes]);

  const albumArt = useMemo(() => {
    if (coverArtUrl) {
      return coverArtUrl;
    }

    if (displayTitle && displayArtist && displayTitle !== "Unknown Title") {
      return `https://ui-avatars.com/api/?name=${encodeURIComponent(displayTitle)}&background=random&size=48&bold=true&format=svg`;
    }

    // Default audio icon
    return "https://ui-avatars.com/api/?name=Audio&background=6366f1&size=48&bold=true&format=svg";
  }, [coverArtUrl, displayTitle, displayArtist]);

  const formatTime = (time: number) => {
    if (!isFinite(time)) return "0:00";

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handlePlay = () => {
      setIsPlaying(true);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [src]);

  const togglePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);

    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);

    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      setVolume(newVolume);
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;

    if (volume > 0) {
      audioRef.current.volume = 0;
      setVolume(0);
    } else {
      audioRef.current.volume = 1;
      setVolume(1);
    }
  };

  const isMuted = volume === 0;

  return (
    <NodeViewWrapper data-drag-handle>
      <Card.Root className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px] shadow-sm">
        <Card.Content className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Album Cover */}
            <div className="md:col-span-1">
              <div className="relative w-full aspect-square max-w-[200px] mx-auto">
                <Image
                  fill
                  alt="Album cover"
                  className="object-cover rounded-lg shadow-md"
                  sizes="(max-width: 768px) 100vw, 200px"
                  src={albumArt}
                />
              </div>
            </div>

            {/* Audio Info and Controls */}
            <div className="md:col-span-3 flex flex-col justify-between">
              {/* Song Info */}
              <div className="mb-4">
                <h3 className="font-semibold text-foreground/90 text-lg mb-1">
                  {displayTitle}
                </h3>
                <p className="text-foreground/70 mb-1">{displayAlbum}</p>
                <p className="text-foreground/60 font-medium">
                  {displayArtist}
                </p>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-xs text-foreground/50 mb-2">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
                <input
                  className="w-full h-2 bg-foreground/20 rounded-lg appearance-none cursor-pointer slider"
                  max={duration || 0}
                  min={0}
                  step={0.1}
                  type="range"
                  value={currentTime}
                  onChange={handleSeek}
                />
              </div>

              {/* Playback Controls */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Button
                    isIconOnly
                    className="w-12 h-12 rounded-full data-hover:bg-foreground/10!"
                    variant="ghost"
                    onPress={togglePlayPause}
                  >
                    {isPlaying ? (
                      <PauseFillIcon size={20} />
                    ) : (
                      <PlayFillIcon size={20} />
                    )}
                  </Button>
                </div>

                {/* Volume Control */}
                <div className="flex items-center gap-3">
                  <Button
                    isIconOnly
                    className="w-8 h-8 data-hover:bg-foreground/10!"
                    variant="ghost"
                    onPress={toggleMute}
                  >
                    {isMuted ? (
                      <PauseFillIcon size={16} />
                    ) : (
                      <PauseFillIcon size={16} />
                    )}
                  </Button>
                  <input
                    className="w-20 h-1.5 bg-foreground/20 rounded-lg appearance-none cursor-pointer"
                    max={1}
                    min={0}
                    step={0.1}
                    type="range"
                    value={volume}
                    onChange={handleVolumeChange}
                  />
                  <span className="text-xs text-foreground/50 w-8">
                    {Math.round(volume * 100)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Card.Content>
      </Card.Root>

      {/* Hidden audio element */}
      <audio ref={audioRef} autoPlay={autoplay} preload="metadata" src={src} />

      {/* Custom styles for range inputs */}
      <style jsx>{`
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: currentColor;
          cursor: pointer;
        }

        input[type="range"]::-moz-range-thumb {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: currentColor;
          cursor: pointer;
          border: none;
        }

        input[type="range"]:focus {
          outline: none;
        }

        input[type="range"]::-webkit-slider-thumb:hover {
          transform: scale(1.2);
        }

        input[type="range"]::-moz-range-thumb:hover {
          transform: scale(1.2);
        }
      `}</style>
    </NodeViewWrapper>
  );
};
