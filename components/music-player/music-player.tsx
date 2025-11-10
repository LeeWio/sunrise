"use client";

import { Avatar, Button, Card, Label, Slider, Tooltip } from "@heroui/react";
import { AvatarFallback, AvatarImage } from "@heroui/react";
import { useEffect, useRef, useState, useCallback } from "react";

import {
  BackwardFillIcon,
  ForwardFillIcon,
  PauseFillIcon,
  PlayFillIcon,
  HeartIcon,
  Volume2FillIcon,
  VolumeXFillIcon,
  SpeakerWave2Icon,
} from "../icons";

import { useMetadata } from "./hooks/use-metadata";

// 重复模式
type RepeatMode = "off" | "all" | "one";

// 组件尺寸
type Size = "sm" | "md" | "lg";

// 显示变体
type Variant = "default" | "compact" | "minimal";

// 音乐播放器接口
interface MusicPlayerProps {
  // ===== 必需参数 =====
  url: string;

  // ===== 基础配置 =====
  autoplay?: boolean;

  // ===== 覆盖信息（可选，如果不提供将使用自动解析的数据） =====
  title?: string;
  artist?: string;
  album?: string;
  coverImage?: string;
  duration?: number;

  // ===== 功能开关 =====
  showProgressBar?: boolean;
  showControls?: boolean;
  showFavorite?: boolean;
  showRepeat?: boolean;
  showShuffle?: boolean;
  showVolumeControl?: boolean;
  showTrackInfo?: boolean;

  // ===== 默认状态 =====
  defaultVolume?: number;
  defaultFavorited?: boolean;
  defaultRepeat?: RepeatMode;
  defaultShuffle?: boolean;

  // ===== 样式定制 =====
  className?: string;
  size?: Size;
  variant?: Variant;

  // ===== 回调事件 =====
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
  onTimeUpdate?: (currentTime: number) => void;
  onDurationChange?: (duration: number) => void;
  onVolumeChange?: (volume: number) => void;
  onFavoriteChange?: (isFavorited: boolean) => void;
  onRepeatChange?: (mode: RepeatMode) => void;
  onShuffleChange?: (isShuffled: boolean) => void;
  onError?: (error: Error) => void;
  onReady?: () => void;
}

export const MusicPlayer = ({
  url,
  autoplay = false,

  title: propTitle,
  artist: propArtist,
  album: propAlbum,
  coverImage: propCoverImage,
  duration: propDuration,

  showProgressBar = true,
  showControls = true,
  showFavorite = true,
  showRepeat = true,
  showShuffle = true,
  showVolumeControl = true,
  showTrackInfo = true,

  defaultVolume = 0.8,
  defaultFavorited = false,
  defaultRepeat = "off",
  defaultShuffle = false,

  className = "",
  size = "md",
  variant = "default",

  onPlay,
  onPause,
  onEnded,
  onTimeUpdate,
  onDurationChange,
  onVolumeChange,
  onFavoriteChange,
  onRepeatChange,
  onShuffleChange,
  onError,
  onReady,
}: MusicPlayerProps) => {
  // 使用 useMetadata hook 自动解析音频元数据
  const {
    metadata,
    coverUrl: extractedCoverUrl,
    loading: metadataLoading,
    error: metadataError,
  } = useMetadata(url);

  // 优先使用手动传递的参数，否则使用解析的数据
  const title = propTitle || metadata?.common.title || "Unknown Title";
  const artist = propArtist || metadata?.common.artist || "Unknown Artist";
  const album = propAlbum || metadata?.common.album;
  const coverImage =
    propCoverImage ||
    extractedCoverUrl ||
    "https://heroui.com/images/album-cover.png";
  const parsedDuration = metadata?.format.duration || 0;

  // 音频状态 - 学习 audio-view.tsx 的简洁模式
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(propDuration || parsedDuration || 0);
  const [volume, setVolume] = useState(defaultVolume);

  // 控制状态
  const [isFavorited, setIsFavorited] = useState(defaultFavorited);
  const [repeatMode, setRepeatMode] = useState<RepeatMode>(defaultRepeat);
  const [isShuffled, setIsShuffled] = useState(defaultShuffle);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 简化的播放/暂停 - 直接学习 audio-view.tsx
  const togglePlayPause = useCallback(async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        // 确保音频已加载
        if (audioRef.current.readyState < 2) {
          await new Promise((resolve, reject) => {
            const timeout = setTimeout(() => {
              reject(new Error("Audio loading timeout"));
            }, 5000);

            audioRef.current!.addEventListener(
              "canplay",
              () => {
                clearTimeout(timeout);
                resolve(undefined);
              },
              { once: true },
            );
          });
        }

        await audioRef.current.play();
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";

      // 处理浏览器自动播放策略
      if (errorMessage.includes("user didn't interact")) {
        // 不设置错误状态，避免阻止播放器显示
        // 只通过回调通知，让用户界面正常显示
      } else {
        setError(errorMessage);
      }

      onError?.(err instanceof Error ? err : new Error(errorMessage));
    }
  }, [isPlaying, onError]);

  // 简化的时间跳转
  const seekTo = useCallback((time: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = time;
  }, []);

  // 上一曲
  const skipPrevious = useCallback(() => {
    if (currentTime > 3) {
      seekTo(0);
    }
  }, [currentTime, seekTo]);

  // 下一曲
  const skipNext = useCallback(() => {
    // Next track functionality should be handled by parent component
  }, []);

  // 状态切换函数
  const toggleFavorite = useCallback(() => {
    setIsFavorited(!isFavorited);
    onFavoriteChange?.(!isFavorited);
  }, [isFavorited, onFavoriteChange]);

  const toggleRepeat = useCallback(() => {
    const modes: RepeatMode[] = ["off", "all", "one"];
    const newMode = modes[(modes.indexOf(repeatMode) + 1) % modes.length];

    setRepeatMode(newMode);
    onRepeatChange?.(newMode);
  }, [repeatMode, onRepeatChange]);

  const toggleShuffle = useCallback(() => {
    setIsShuffled(!isShuffled);
    onShuffleChange?.(!isShuffled);
  }, [isShuffled, onShuffleChange]);

  // 音量控制 - 学习 audio-view.tsx 的简洁方式
  const handleVolumeChange = useCallback(
    (newVolume: number) => {
      if (!audioRef.current) return;
      audioRef.current.volume = newVolume;
      setVolume(newVolume);
      onVolumeChange?.(newVolume);
    },
    [onVolumeChange],
  );

  const toggleMute = useCallback(() => {
    if (volume > 0) {
      handleVolumeChange(0);
    } else {
      handleVolumeChange(1);
    }
  }, [volume, handleVolumeChange]);

  const isMuted = volume === 0;

  // 简单的格式化函数
  const formatTime = useCallback((time: number) => {
    if (!isFinite(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }, []);

  // 音量图标
  const getVolumeIcon = () =>
    isMuted ? (
      <VolumeXFillIcon className="size-4" />
    ) : (
      <Volume2FillIcon className="size-4" />
    );

  // 单一音频事件处理器 - 学习 audio-view.tsx 的简洁模式
  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    // 直接设置音频属性
    audio.src = url;
    audio.preload = "metadata";
    audio.volume = volume;

    // 简单的事件处理器 - 完全学习 audio-view.tsx
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
      setLoading(false);
      onReady?.();
      if (audio.duration && !propDuration) {
        onDurationChange?.(audio.duration);
      }
    };
    const handlePlay = () => {
      setIsPlaying(true);
      onPlay?.();
    };
    const handlePause = () => {
      setIsPlaying(false);
      onPause?.();
    };
    const handleEnded = () => {
      setIsPlaying(false);
      onEnded?.();
      if (repeatMode === "one") {
        audio.currentTime = 0;
        audio.play().catch(() => {});
      }
    };
    const handleError = () => {
      const audioError = audio.error;

      // 如果没有真正的音频错误，不要设置错误状态
      if (!audioError) {
        setLoading(false);

        return;
      }

      const errorMessage = audioError.message || "Audio loading failed";

      // 对于自动播放策略相关的错误，不设置错误状态
      if (
        errorMessage.includes("user didn't interact") ||
        errorMessage.includes("play() failed") ||
        errorMessage.includes("autoplay")
      ) {
        setLoading(false);

        return;
      }

      setError(errorMessage);
      setLoading(false);
      onError?.(new Error(errorMessage));
    };

    // 添加事件监听器 - 学习 audio-view.tsx 的模式
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
    };
  }, [
    url,
    volume,
    repeatMode,
    propDuration,
    onReady,
    onDurationChange,
    onPlay,
    onPause,
    onEnded,
    onError,
  ]);

  // URL 更新处理
  useEffect(() => {
    const audio = audioRef.current;

    if (audio && audio.src !== url) {
      audio.src = url;
      audio.load();
      setIsPlaying(false);
      setCurrentTime(0);
      setLoading(true);
      setError(null);
    }
  }, [url]);

  // 音量更新
  useEffect(() => {
    const audio = audioRef.current;

    if (audio && audio.volume !== volume) {
      audio.volume = volume;
    }
  }, [volume]);

  // 元数据时长更新
  useEffect(() => {
    if (parsedDuration > 0 && !propDuration && duration !== parsedDuration) {
      setDuration(parsedDuration);
    }
  }, [parsedDuration, propDuration, duration]);

  // 元数据错误处理
  useEffect(() => {
    if (metadataError) {
      setError(metadataError.message);
      onError?.(metadataError);
    }
  }, [metadataError, onError]);

  // 自动播放
  useEffect(() => {
    if (autoplay && !loading && !isPlaying) {
      setTimeout(togglePlayPause, 100);
    }
  }, [autoplay, loading, isPlaying, togglePlayPause]);

  // 响应式样式函数
  const getResponsiveClasses = useCallback(() => {
    switch (size) {
      case "sm":
        return {
          container: "w-full max-w-sm",
          cover: "size-16 sm:size-20",
          title: "text-lg sm:text-xl",
          button: "size-8 sm:size-9",
          controls: "gap-2 sm:gap-3",
          padding: "p-4 sm:p-6",
        };
      case "lg":
        return {
          container: "w-full max-w-4xl xl:max-w-5xl",
          cover: "size-32 sm:size-40",
          title: "text-2xl sm:text-3xl xl:text-4xl",
          button: "size-12 sm:size-14",
          controls: "gap-4 sm:gap-6",
          padding: "p-6 sm:p-8 lg:p-10",
        };
      case "md":
      default:
        return {
          container: "w-full max-w-2xl lg:max-w-3xl",
          cover: "size-20 sm:size-24",
          title: "text-xl sm:text-2xl",
          button: "size-10 sm:size-11",
          controls: "gap-3 sm:gap-4",
          padding: "p-5 sm:p-7",
        };
    }
  }, [size]);

  const responsiveClasses = getResponsiveClasses();

  // 错误状态
  if (error || metadataError) {
    return (
      <Card.Root className={`w-full ${responsiveClasses.padding} ${className}`}>
        <div className="text-center text-danger">
          <p>Audio loading failed</p>
          <p className="text-sm text-danger/60">
            {error || metadataError?.message}
          </p>
        </div>
      </Card.Root>
    );
  }

  // 紧凑模式
  if (variant === "compact") {
    return (
      <Card.Root className={`w-full ${responsiveClasses.padding} ${className}`}>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Avatar.Root
            className={`${responsiveClasses.cover} shrink-0 rounded-lg`}
          >
            <AvatarImage
              alt={title}
              className="object-cover rounded-lg"
              src={coverImage}
            />
            <AvatarFallback className="rounded-lg bg-gradient-to-br from-primary/20 to-accent/20">
              <div className="text-2xl sm:text-3xl">♪</div>
            </AvatarFallback>
          </Avatar.Root>

          <div className="flex-1 w-full">
            {showTrackInfo && (
              <div className="mb-3">
                <div
                  className={`font-semibold ${responsiveClasses.title} truncate`}
                >
                  {title}
                </div>
                <div className="text-sm text-foreground/70 truncate">
                  {artist}
                </div>
              </div>
            )}

            {showProgressBar && (
              <div className="mb-3">
                <Slider
                  maxValue={duration || 100}
                  minValue={0}
                  value={currentTime}
                  onChange={seekTo as any}
                >
                  <Label>{formatTime(currentTime)}</Label>
                  <Slider.Output>{formatTime(duration)}</Slider.Output>
                  <Slider.Track>
                    <Slider.Fill />
                    <Slider.Thumb />
                  </Slider.Track>
                </Slider>
              </div>
            )}

            {showControls && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button
                    isIconOnly
                    size="sm"
                    variant="ghost"
                    onPress={skipPrevious}
                  >
                    <BackwardFillIcon className="size-4" />
                  </Button>
                  <Button
                    isIconOnly
                    size="sm"
                    variant="ghost"
                    onPress={togglePlayPause}
                  >
                    {isPlaying ? <PauseFillIcon /> : <PlayFillIcon />}
                  </Button>
                  <Button
                    isIconOnly
                    size="sm"
                    variant="ghost"
                    onPress={skipNext}
                  >
                    <ForwardFillIcon className="size-4" />
                  </Button>
                </div>

                <div className="flex items-center gap-2">
                  {showFavorite && (
                    <Button
                      isIconOnly
                      className={
                        isFavorited ? "text-danger" : "text-foreground/60"
                      }
                      size="sm"
                      variant="ghost"
                      onPress={toggleFavorite}
                    >
                      <HeartIcon
                        className="size-4"
                        fill={isFavorited ? "currentColor" : "none"}
                      />
                    </Button>
                  )}
                  {showVolumeControl && (
                    <Button
                      isIconOnly
                      className="text-foreground/60"
                      size="sm"
                      variant="ghost"
                      onPress={toggleMute}
                    >
                      {getVolumeIcon()}
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <audio
          ref={audioRef}
          preload="metadata"
          src={url}
          title={`Playing: ${title} by ${artist}`}
        />
      </Card.Root>
    );
  }

  // 极简模式
  if (variant === "minimal") {
    return (
      <div
        className={`flex flex-col sm:flex-row items-center gap-4 w-full ${className}`}
      >
        <Button
          isIconOnly
          className="rounded-full flex-shrink-0"
          size={size === "sm" ? "sm" : size === "lg" ? "lg" : "md"}
          variant="ghost"
          onPress={togglePlayPause}
        >
          {isPlaying ? <PauseFillIcon /> : <PlayFillIcon />}
        </Button>

        {showTrackInfo && (
          <div className="min-w-0 flex-1 text-center sm:text-left">
            <div className="font-medium truncate">{title}</div>
            <div className="text-sm text-foreground/70 truncate">{artist}</div>
          </div>
        )}

        {showProgressBar && (
          <div className="flex-1 w-full sm:w-auto order-2 sm:order-1">
            <Slider
              maxValue={duration || 100}
              minValue={0}
              value={currentTime}
              onChange={seekTo as any}
            >
              <Slider.Track>
                <Slider.Fill />
                <Slider.Thumb />
              </Slider.Track>
            </Slider>
          </div>
        )}

        <audio
          ref={audioRef}
          preload="metadata"
          src={url}
          title={`Playing: ${title} by ${artist}`}
        />
      </div>
    );
  }

  // 默认模式
  return (
    <Card variant="default">
      <Card.Header className="flex flex-row gap-2">
        <img
          alt="Indie Hackers community"
          className="pointer-events-none aspect-square w-14 select-none rounded-2xl object-cover"
          loading="lazy"
          src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/demo1.jpg"
        />
        <div className="text-gray-300">
          <div className="font-extrabold text-lg">Ditto</div>
          <div className="font-bold text-md">NewJeans</div>
        </div>
      </Card.Header>
      <Card.Content className="w-full text-gray-500">
        <Slider
          className="w-full flex flex-row items-center justify-center"
          defaultValue={30}
        >
          <Label className="text-gray-500">0:00</Label>
          <Slider.Track>
            <Slider.Fill />
            <Slider.Thumb />
          </Slider.Track>
          <Slider.Output>3:00</Slider.Output>
        </Slider>
      </Card.Content>
      <Card.Footer className="flex items-center justify-between">
        <Button isIconOnly size="lg" variant="ghost">
          <HeartIcon />
        </Button>
        <div>
          <Button isIconOnly variant="ghost">
            <BackwardFillIcon />
          </Button>
          <Button isIconOnly variant="ghost">
            <PlayFillIcon />
          </Button>
          <Button isIconOnly variant="ghost">
            <ForwardFillIcon />
          </Button>
        </div>

        <Tooltip delay={0}>
          <Button isIconOnly variant="ghost">
            <SpeakerWave2Icon />
          </Button>
          <Tooltip.Content className="flex h-40 items-center justify-center">
            <Slider className="h-full" defaultValue={30} orientation="vertical">
              <Slider.Output />
              <Slider.Track>
                <Slider.Fill />
                <Slider.Thumb />
              </Slider.Track>
            </Slider>
          </Tooltip.Content>
        </Tooltip>
      </Card.Footer>
    </Card>
  );
};
