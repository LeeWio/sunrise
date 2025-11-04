import { Button, Card } from "@heroui/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import {
  BackwardFillIcon,
  ForwardFillIcon,
  PauseFillIcon,
  PlayFillIcon,
} from "../icons";

import { useMetadata } from "./hooks/use-metadata";

interface MusicPlayerProps {
  url: string;
  autoplay: boolean;
}
export const MusicPlayer = ({ url, autoplay }: MusicPlayerProps) => {
  const { metadata, coverUrl, loading, error } = useMetadata(url);

  const audioRef = useRef<HTMLAudioElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const togglePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  };

  const formatTime = (time: number) => {
    if (!isFinite(time)) return "0:00";

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);

    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;

    const volume = audioRef.current.volume;

    if (volume > 0) {
      audioRef.current.volume = 0;
    } else {
      audioRef.current.volume = 1;
    }
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
  }, [url, metadata]);

  return (
    <Card.Root className="w-[500px] items-stretch md:flex-row">
      <Image
        alt="cover url"
        className="object-cover rounded-panel pointer-events-none aspect-square w-full select-none max-w-[136px]"
        height={200}
        src={"https://heroui.com/images/album-cover.png"}
        width={200}
      />

      <div className="flex flex-1 flex-col gap-3">
        <Card.Header className="gap-1">
          <Card.Title className="gap-0.5">
            <div className="font-bold">Daily Mix</div>
            <div className="font-light text-sm">12 Tracks</div>
          </Card.Title>

          {/* TODO: 后期用 Heroui 滑动组件代替 */}
          <Card.Description className="flex text-xs flex-row justify-between gap-2">
            <span>{formatTime(currentTime)}</span>
            <input
              className="w-full"
              max={duration}
              min={0}
              step={0.1}
              type="range"
              value={currentTime}
              onChange={handleSeek}
            />
            <span>{formatTime(duration)}</span>
          </Card.Description>
        </Card.Header>

        <Card.Footer className="mt-auto flex w-full flex-row items-center justify-between">
          <div>adf</div>
          <div className="flex">
            <Button isIconOnly size="sm" variant="ghost">
              <BackwardFillIcon />
            </Button>

            <Button
              isIconOnly
              size="sm"
              variant="ghost"
              onPress={togglePlayPause}
            >
              {isPlaying ? <PauseFillIcon /> : <PlayFillIcon />}
            </Button>

            <Button isIconOnly size="sm" variant="ghost">
              <ForwardFillIcon />
            </Button>
          </div>
        </Card.Footer>
      </div>
      <audio ref={audioRef} autoPlay={autoplay} preload="metadata" src={url} />
    </Card.Root>
  );
};
