import React, { useRef, useState, useEffect } from "react";
import { NodeViewWrapper, NodeViewProps } from "@tiptap/react";
import { Button, Slider, Card } from "@heroui/react";
import { PlayFill, Pause, MusicNote, BackwardStepFill, ForwardStepFill, BroadcastSignal } from "../../../icons";

const formatTime = (timeInSeconds: number) => {
  if (isNaN(timeInSeconds) || !isFinite(timeInSeconds)) return "00:00";
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

export const AudioPlayerNode: React.FC<NodeViewProps> = ({ node, editor, updateAttributes }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const src = node.attrs.src;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        updateAttributes({ src: event.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

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

  const skipBackward = () => {
    if (audioRef.current) {
      const newTime = Math.max(0, audioRef.current.currentTime - 15);
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const skipForward = () => {
    if (audioRef.current) {
      const newTime = Math.min(duration, audioRef.current.currentTime + 15);
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  if (!src) {
    return (
      <NodeViewWrapper
        className={`relative my-4 flex w-full max-w-sm select-none items-center justify-center transition-all ${
          editor.isActive("audio") ? "ring-2 ring-primary ring-offset-2" : ""
        }`}
        data-drag-handle
      >
        <Card className="w-full" variant="secondary">
          <Card.Content className="flex flex-col items-center justify-center gap-4 text-center py-8">
            <div className="bg-surface flex size-12 shrink-0 items-center justify-center rounded-xl text-muted shadow-sm">
              <MusicNote className="size-6" />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium">Add an audio file</p>
              <p className="text-muted text-xs">Supports MP3, WAV, OGG</p>
            </div>
            <Button variant="secondary" onPress={() => fileInputRef.current?.click()}>
              Choose File
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept="audio/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </Card.Content>
        </Card>
      </NodeViewWrapper>
    );
  }

  return (
    <NodeViewWrapper
      className={`relative my-4 flex w-full max-w-sm select-none items-center justify-center transition-all ${
        editor.isActive("audio") ? "ring-2 ring-primary ring-offset-2" : ""
      }`}
      data-drag-handle
    >
      {/* Hidden native audio element */}
      <audio ref={audioRef} src={src} preload="metadata" />

      <Card className="w-full overflow-hidden bg-background/60 shadow-medium backdrop-blur-md">
        <Card.Content className="flex flex-row gap-4 p-4">
          {/* Left: Album Art Placeholder */}
          <div className="flex size-24 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 shadow-inner">
            <MusicNote className="text-white/70 size-10 drop-shadow-md" />
          </div>

          {/* Right: Content & Controls */}
          <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="flex min-w-0 flex-col gap-0.5">
                <p className="truncate text-sm font-semibold">Audio Track</p>
                <p className="text-muted truncate text-xs">Local File</p>
              </div>
              <Button isIconOnly className="-mr-2 -mt-1 shrink-0 rounded-full" size="sm" variant="tertiary">
                <BroadcastSignal className="size-4" />
              </Button>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4">
              <Button isIconOnly className="rounded-full" size="sm" variant="tertiary" onPress={skipBackward}>
                <BackwardStepFill className="size-4" />
              </Button>
              <Button isIconOnly className="scale-125 rounded-full" size="sm" variant="tertiary" onPress={togglePlayPause}>
                {isPlaying ? <Pause className="size-4" /> : <PlayFill className="size-4" />}
              </Button>
              <Button isIconOnly className="rounded-full" size="sm" variant="tertiary" onPress={skipForward}>
                <ForwardStepFill className="size-4" />
              </Button>
            </div>

            {/* Slider & Time */}
            <div className="mt-2 flex flex-col gap-1">
              <Slider
                aria-label="Audio progress"
                className="w-full"
                maxValue={duration || 100}
                value={currentTime}
                onChange={handleSeek}
              >
                <Slider.Track>
                  <Slider.Fill />
                  <Slider.Thumb />
                </Slider.Track>
              </Slider>
              <div className="text-muted flex items-center justify-between px-0.5 text-[10px] font-medium">
                <span>{formatTime(currentTime)}</span>
                <span>-{formatTime(Math.max(0, duration - currentTime))}</span>
              </div>
            </div>
          </div>
        </Card.Content>
      </Card>
    </NodeViewWrapper>
  );
};
