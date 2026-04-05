import React, { useRef, useState, useEffect } from "react";
import { NodeViewWrapper, NodeViewProps } from "@tiptap/react";
import { Button, Slider, Card } from "@heroui/react";
import { PlayFill, Pause, MusicNote } from "../../../icons";

const formatTime = (timeInSeconds: number) => {
  if (isNaN(timeInSeconds) || !isFinite(timeInSeconds)) return "00:00";
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

export const AudioPlayerNode: React.FC<NodeViewProps> = ({ node, editor }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const src = node.attrs.src;

  // Sync state with audio element
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const setAudioData = () => {
      setDuration(audio.duration);
      setCurrentTime(audio.currentTime);
    };

    const setAudioTime = () => setCurrentTime(audio.currentTime);
    const handleAudioEnd = () => setIsPlaying(false);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener("loadedmetadata", setAudioData);
    audio.addEventListener("timeupdate", setAudioTime);
    audio.addEventListener("ended", handleAudioEnd);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    // Initial check in case it's already loaded
    if (audio.readyState > 0) {
      setAudioData();
    }

    return () => {
      audio.removeEventListener("loadedmetadata", setAudioData);
      audio.removeEventListener("timeupdate", setAudioTime);
      audio.removeEventListener("ended", handleAudioEnd);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, [src]);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
  };

  const handleSeek = (value: number | number[]) => {
    const seekTime = Array.isArray(value) ? value[0] : value;
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };

  return (
    <NodeViewWrapper
      className={`relative my-4 flex w-full max-w-sm select-none items-center justify-center transition-all ${
        editor.isActive("audio") ? "ring-2 ring-primary ring-offset-2" : ""
      }`}
      data-drag-handle
    >
      {/* Hidden native audio element */}
      <audio ref={audioRef} src={src} preload="metadata" />

      <Card className="w-full shadow-sm border border-default-200">
        <Card.Content className="flex flex-row items-center gap-3 p-2 pr-4">
          <Button
            isIconOnly
            radius="full"
            variant="light"
            onPress={togglePlayPause}
            aria-label={isPlaying ? "Pause" : "Play"}
            className="text-foreground"
          >
            {isPlaying ? <Pause /> : <PlayFill />}
          </Button>

          <div className="flex items-center gap-3 flex-1 text-xs text-default-500 font-medium">
            <span className="w-10 text-right shrink-0">{formatTime(currentTime)}</span>
            
            <Slider
              aria-label="Audio progress"
              size="sm"
              value={currentTime}
              maxValue={duration || 100}
              onChange={handleSeek}
              className="flex-1"
            />
            
            <span className="w-10 text-left shrink-0">{formatTime(duration)}</span>
          </div>
          
          <div className="shrink-0 text-default-400">
            <MusicNote />
          </div>
        </Card.Content>
      </Card>
    </NodeViewWrapper>
  );
};
