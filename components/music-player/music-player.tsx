import { Avatar, Button, Card, Label, Popover, Slider } from "@heroui/react";
import { AvatarFallback, AvatarImage } from "@heroui/react";
import { TooltipContent, TooltipRoot, TooltipTrigger } from "@heroui/react";
import { useCallback, useEffect, useRef, useState } from "react";

import {
  BackwardFillIcon,
  ForwardFillIcon,
  PauseFillIcon,
  PlayFillIcon,
  HeartIcon,
  RepeatIcon,
  ShuffleIcon,
  Volume2FillIcon,
  VolumeXFillIcon,
} from "../icons";

import { useMetadata } from "./hooks/use-metadata";

// 音频加载状态
type LoadingState = "idle" | "loading" | "loaded" | "error";

// 重复模式
type RepeatMode = "off" | "all" | "one";

// 组件尺寸
type Size = "sm" | "md" | "lg";

// 显示变体
type Variant = "default" | "compact" | "minimal";

// 预加载策略
type Preload = "none" | "metadata" | "auto";

// 音乐播放器接口
interface MusicPlayerProps {
  // ===== 必需参数 =====
  url: string;

  // ===== 基础配置 =====
  autoplay?: boolean;
  _preload?: Preload;

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
  _preload = "metadata",

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

  // 音频相关状态
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(propDuration || parsedDuration || 0);
  const [loadingState, setLoadingState] = useState<LoadingState>("idle");
  const [error, setError] = useState<string | null>(null);

  // 播放控制状态
  const [isFavorited, setIsFavorited] = useState(defaultFavorited);
  const [repeatMode, setRepeatMode] = useState<RepeatMode>(defaultRepeat);
  const [isShuffled, setIsShuffled] = useState(defaultShuffle);
  const [volume, setVolume] = useState(defaultVolume);
  const [previousVolume, setPreviousVolume] = useState(defaultVolume);
  const [isMuted, setIsMuted] = useState(false);

  // 使用 ref 来避免循环依赖
  const isPlayingRef = useRef(isPlaying);
  const updatingRef = useRef(false);

  // 同步 isPlayingRef 和 isPlaying state
  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  // 播放/暂停切换 - 简化版本
  const togglePlayPause = useCallback(() => {
    const audio = audioRef.current;

    if (!audio || loadingState === "error") return;

    // 防止循环调用
    if (updatingRef.current) {
      return;
    }

    if (isPlayingRef.current) {
      // 立即更新 UI 状态
      setIsPlaying(false);
      isPlayingRef.current = false;

      updatingRef.current = true;
      audio.pause();
      setTimeout(() => {
        updatingRef.current = false;
      }, 50);
    } else {
      // 立即更新 UI 状态
      setIsPlaying(true);
      isPlayingRef.current = true;

      updatingRef.current = true;
      const playPromise = audio.play();

      if (playPromise) {
        playPromise.catch((err) => {
          // 播放失败时恢复状态
          setIsPlaying(false);
          isPlayingRef.current = false;
          setError(err.message);
          onError?.(err);
          updatingRef.current = false;
        });
      } else {
        // 对于某些浏览器，play() 可能不返回 Promise
        setTimeout(() => {
          updatingRef.current = false;
        }, 100);
      }
    }
  }, [loadingState, onError]);

  // 跳转到指定时间
  const seekTo = useCallback(
    (time: number) => {
      if (!audioRef.current || loadingState === "error") return;

      audioRef.current.currentTime = time;
      setCurrentTime(time);
    },
    [loadingState],
  );

  // 上一曲
  const skipPrevious = useCallback(() => {
    // 如果当前时间超过3秒，重新开始播放
    if (currentTime > 3) {
      seekTo(0);
    } else {
      // 否则可以触发上一曲事件（需要父组件处理）
    }
  }, [currentTime, seekTo]);

  // 下一曲
  const skipNext = useCallback(() => {
    // Next track functionality should be handled by parent component
  }, []);

  // 收藏切换
  const toggleFavorite = useCallback(() => {
    const newFavorited = !isFavorited;

    setIsFavorited(newFavorited);
    onFavoriteChange?.(newFavorited);
  }, [isFavorited, onFavoriteChange]);

  // 重复模式切换
  const toggleRepeat = useCallback(() => {
    const modes: RepeatMode[] = ["off", "all", "one"];
    const currentIndex = modes.indexOf(repeatMode);
    const newMode = modes[(currentIndex + 1) % modes.length];

    setRepeatMode(newMode);
    onRepeatChange?.(newMode);
  }, [repeatMode, onRepeatChange]);

  // 随机播放切换
  const toggleShuffle = useCallback(() => {
    const newShuffled = !isShuffled;

    setIsShuffled(newShuffled);
    onShuffleChange?.(newShuffled);
  }, [isShuffled, onShuffleChange]);

  // 音量调节
  const handleVolumeChange = useCallback(
    (newVolume: number) => {
      if (!audioRef.current) return;

      audioRef.current.volume = newVolume;
      setVolume(newVolume);
      setPreviousVolume(newVolume);

      // 如果音量大于0，取消静音状态
      if (newVolume > 0) {
        setIsMuted(false);
      }

      onVolumeChange?.(newVolume);
    },
    [onVolumeChange],
  );

  // 静音切换
  const toggleMute = useCallback(() => {
    if (!audioRef.current) return;

    if (isMuted) {
      // 取消静音，恢复之前的音量
      audioRef.current.volume = previousVolume;
      setVolume(previousVolume);
      setIsMuted(false);
      onVolumeChange?.(previousVolume);
    } else {
      // 静音，保存当前音量
      setPreviousVolume(volume);
      audioRef.current.volume = 0;
      setVolume(0);
      setIsMuted(true);
      onVolumeChange?.(0);
    }
  }, [isMuted, previousVolume, volume, onVolumeChange]);

  // 获取当前音量图标
  const getVolumeIcon = () => {
    if (volume === 0 || isMuted) {
      return <VolumeXFillIcon className="size-4" />;
    }

    return <Volume2FillIcon className="size-4" />;
  };

  // 格式化时间
  const formatTime = useCallback((time: number) => {
    if (!isFinite(time)) return "0:00";

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }, []);

  // 获取尺寸相关的类名
  const getSizeClasses = useCallback(() => {
    switch (size) {
      case "sm":
        return {
          container: "max-w-sm",
          cover: "size-16",
          title: "text-lg",
          controls: "gap-2",
          button: "size-8",
        };
      case "lg":
        return {
          container: "max-w-3xl",
          cover: "size-32",
          title: "text-3xl",
          controls: "gap-6",
          button: "size-12",
        };
      case "md":
      default:
        return {
          container: "max-w-2xl",
          cover: "size-24",
          title: "text-2xl",
          controls: "gap-4",
          button: "size-10",
        };
    }
  }, [size]);

  // 简化的音频事件处理 - 只在挂载时设置一次
  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    // 设置音频源
    audio.src = url;
    audio.preload = "metadata";
    audio.volume = volume;

    const handleLoadedData = () => {
      const audioDuration = audio.duration;

      if (audioDuration && !propDuration) {
        setDuration(audioDuration);
        onDurationChange?.(audioDuration);
      }
      setLoadingState("loaded");
      onReady?.();
    };

    const handleTimeUpdate = () => {
      const newCurrentTime = audio.currentTime;

      if (Math.abs(newCurrentTime - currentTime) > 0.1) {
        setCurrentTime(newCurrentTime);
        onTimeUpdate?.(newCurrentTime);
      }
    };

    const handlePlay = () => {
      // 只有在非手动触发时才更新状态（避免重复设置）
      if (!updatingRef.current) {
        setIsPlaying(true);
        isPlayingRef.current = true;
        onPlay?.();
      }
    };

    const handlePause = () => {
      // 只有在非手动触发时才更新状态（避免重复设置）
      if (!updatingRef.current) {
        setIsPlaying(false);
        isPlayingRef.current = false;
        onPause?.();
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      isPlayingRef.current = false;
      onEnded?.();

      // 处理重复播放
      if (repeatMode === "one") {
        audio.currentTime = 0;
        audio.play().catch(() => {});
      }
    };

    const handleError = (e: Event) => {
      const audioError = (e.target as HTMLAudioElement).error;
      const errorMessage = audioError?.message || "Audio loading failed";

      setError(errorMessage);
      setLoadingState("error");
      onError?.(new Error(errorMessage));
    };

    // 添加事件监听
    const events = [
      { event: "loadeddata", handler: handleLoadedData },
      { event: "timeupdate", handler: handleTimeUpdate },
      { event: "play", handler: handlePlay },
      { event: "pause", handler: handlePause },
      { event: "ended", handler: handleEnded },
      { event: "error", handler: handleError },
    ];

    events.forEach(({ event, handler }) => {
      audio.addEventListener(event, handler);
    });

    return () => {
      events.forEach(({ event, handler }) => {
        audio.removeEventListener(event, handler);
      });
    };
  }, []);

  // 更新音频源和属性
  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    if (audio.src !== url) {
      audio.src = url;
      audio.load(); // 重新加载音频
      // 重置状态
      setIsPlaying(false);
      setCurrentTime(0);
      setLoadingState("loading");
      setError(null);
    }
  }, [url]);

  // 更新音量
  useEffect(() => {
    const audio = audioRef.current;

    if (audio && audio.volume !== volume) {
      audio.volume = volume;
    }
  }, [volume]);

  // 更新解析的时长
  useEffect(() => {
    if (parsedDuration > 0 && !propDuration && duration !== parsedDuration) {
      setDuration(parsedDuration);
    }
  }, [parsedDuration, propDuration, duration]);

  // 处理元数据错误
  useEffect(() => {
    if (metadataError) {
      setError(metadataError.message);
      onError?.(metadataError);
    }
  }, [metadataError, onError]);

  // 处理自动播放
  useEffect(() => {
    if (autoplay && loadingState === "loaded" && !isPlayingRef.current) {
      // 延迟一点时间确保所有状态都设置好了
      setTimeout(() => {
        togglePlayPause();
      }, 100);
    }
  }, [autoplay, loadingState]);

  const sizeClasses = getSizeClasses();

  // 如果有错误，显示错误状态
  if (loadingState === "error" || metadataError) {
    return (
      <Card.Root className={`w-full p-4 ${className}`}>
        <div className="text-center text-danger">
          <p>
            {metadataError
              ? "Metadata extraction failed"
              : "Audio loading failed"}
          </p>
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
      <Card.Root className={`w-full ${className}`}>
        <div className="flex items-center gap-4 p-4">
          {/* 封面图片 */}
          <Avatar.Root className={`${sizeClasses.cover} shrink-0 rounded-lg`}>
            <AvatarImage
              alt={title}
              className="object-cover rounded-lg"
              src={coverImage}
            />
            <AvatarFallback className="rounded-lg bg-gradient-to-br from-primary/20 to-accent/20">
              <div className="text-2xl">♪</div>
            </AvatarFallback>
          </Avatar.Root>

          {/* 信息和控制 */}
          <div className="flex-1">
            {showTrackInfo && (
              <div className="mb-2">
                <div className="font-semibold">{title}</div>
                <div className="text-sm text-foreground/70">{artist}</div>
              </div>
            )}

            {showProgressBar && (
              <div className="mb-2">
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
                </div>
              </div>
            )}
          </div>
        </div>

        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <audio ref={audioRef} title={`Playing: ${title} by ${artist}`} />
      </Card.Root>
    );
  }

  // 极简模式
  if (variant === "minimal") {
    return (
      <div className={`flex items-center gap-4 ${className}`}>
        <Button
          isIconOnly
          className="rounded-full"
          size={size === "sm" ? "sm" : size === "lg" ? "lg" : "md"}
          variant="ghost"
          onPress={togglePlayPause}
        >
          {isPlaying ? <PauseFillIcon /> : <PlayFillIcon />}
        </Button>

        {showTrackInfo && (
          <div>
            <div className="font-medium">{title}</div>
            <div className="text-sm text-foreground/70">{artist}</div>
          </div>
        )}

        {showProgressBar && (
          <div className="flex-1">
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

        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <audio ref={audioRef} title={`Playing: ${title} by ${artist}`} />
      </div>
    );
  }

  // 默认模式
  return (
    <Card.Root
      className={`w-full ${sizeClasses.container} overflow-hidden ${className}`}
    >
      {/* 背景渐变 */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />

      <div className="relative flex flex-col gap-6 p-8 md:flex-row md:items-center md:gap-8">
        {/* 专辑封面 */}
        <div className="relative mx-auto shrink-0 md:mx-0">
          <Avatar.Root className={`${sizeClasses.cover} rounded-xl`}>
            <AvatarImage
              alt="Album cover"
              className="aspect-square w-full rounded-xl object-cover"
              src={coverImage}
            />
            <AvatarFallback className="rounded-xl bg-gradient-to-br from-primary/20 to-accent/20">
              <div className="text-center">
                <div className="text-3xl font-bold text-foreground/60">♪</div>
                <div className="text-sm text-foreground/40">Album</div>
              </div>
            </AvatarFallback>
          </Avatar.Root>

          {/* 播放指示器 */}
          {isPlaying && (
            <div className="absolute -bottom-2 -right-2 flex items-center justify-center rounded-full bg-primary p-2 shadow-lg">
              <div className="flex items-center gap-0.5">
                <div className="h-1 w-0.5 bg-white animate-pulse" />
                <div className="h-1 w-0.5 bg-white animate-pulse delay-75" />
                <div className="h-1 w-0.5 bg-white animate-pulse delay-150" />
              </div>
            </div>
          )}
        </div>

        {/* 播放器和信息 */}
        <div className="flex flex-1 flex-col gap-6">
          {/* 曲目信息 */}
          <Card.Header className="gap-2 pb-0">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                {showTrackInfo && (
                  <>
                    <Card.Title className={`${sizeClasses.title} font-bold`}>
                      {title}
                    </Card.Title>
                    <Card.Description className="text-base text-foreground/70">
                      {artist}
                      {album && ` • ${album}`}
                    </Card.Description>
                  </>
                )}
              </div>

              {showFavorite && (
                <TooltipRoot delay={0}>
                  <TooltipTrigger asChild>
                    <Button
                      isIconOnly
                      className="mt-1"
                      size="md"
                      variant="ghost"
                      onPress={toggleFavorite}
                    >
                      <HeartIcon
                        className="size-5"
                        fill={isFavorited ? "currentColor" : "none"}
                      />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      {isFavorited
                        ? "Remove from favorites"
                        : "Add to favorites"}
                    </p>
                  </TooltipContent>
                </TooltipRoot>
              )}
            </div>
          </Card.Header>

          {/* 进度条 */}
          {showProgressBar && (
            <div className="space-y-3">
              <Slider
                className="w-full"
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

          {/* 控制按钮 */}
          {showControls && (
            <div className="flex items-center justify-center gap-4">
              <div className="flex items-center gap-1">
                {showRepeat && (
                  <TooltipRoot delay={0}>
                    <TooltipTrigger asChild>
                      <Button
                        isIconOnly
                        className={
                          repeatMode !== "off"
                            ? "text-primary"
                            : "text-foreground/60"
                        }
                        size="sm"
                        variant="ghost"
                        onPress={toggleRepeat}
                      >
                        <RepeatIcon className="size-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        {repeatMode === "off" && "Enable repeat"}
                        {repeatMode === "all" && "Repeat all"}
                        {repeatMode === "one" && "Repeat one"}
                      </p>
                    </TooltipContent>
                  </TooltipRoot>
                )}

                {showShuffle && (
                  <TooltipRoot delay={0}>
                    <TooltipTrigger asChild>
                      <Button
                        isIconOnly
                        className={
                          isShuffled ? "text-primary" : "text-foreground/60"
                        }
                        size="sm"
                        variant="ghost"
                        onPress={toggleShuffle}
                      >
                        <ShuffleIcon className="size-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{isShuffled ? "Disable shuffle" : "Enable shuffle"}</p>
                    </TooltipContent>
                  </TooltipRoot>
                )}
              </div>

              <div className="flex items-center gap-2">
                <TooltipRoot delay={0}>
                  <TooltipTrigger asChild>
                    <Button
                      isIconOnly
                      size="md"
                      variant="ghost"
                      onPress={skipPrevious}
                    >
                      <BackwardFillIcon className="size-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Previous track</p>
                  </TooltipContent>
                </TooltipRoot>

                <Button
                  isIconOnly
                  isDisabled={loadingState === "loading"}
                  size="lg"
                  variant="ghost"
                  onPress={togglePlayPause}
                >
                  {loadingState === "loading" ? (
                    <div className="animate-spin">⟳</div>
                  ) : isPlaying ? (
                    <PauseFillIcon className="size-6" />
                  ) : (
                    <PlayFillIcon className="size-6" />
                  )}
                </Button>

                <TooltipRoot delay={0}>
                  <TooltipTrigger asChild>
                    <Button
                      isIconOnly
                      size="md"
                      variant="ghost"
                      onPress={skipNext}
                    >
                      <ForwardFillIcon className="size-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Next track</p>
                  </TooltipContent>
                </TooltipRoot>
              </div>

              {showVolumeControl && (
                <Popover>
                  <Popover.Trigger>
                    <Button
                      isIconOnly
                      size="sm"
                      variant="ghost"
                      onPress={toggleMute}
                    >
                      {getVolumeIcon()}
                    </Button>
                  </Popover.Trigger>

                  <Popover.Content
                    className="w-48 p-4"
                    offset={8}
                    placement="top"
                  >
                    <Popover.Dialog>
                      <Popover.Heading className="text-sm font-medium mb-3">
                        Volume Control
                      </Popover.Heading>

                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <Button
                            isIconOnly
                            className="text-foreground/60"
                            size="sm"
                            variant="ghost"
                            onPress={toggleMute}
                          >
                            {getVolumeIcon()}
                          </Button>

                          <div className="flex-1">
                            <Slider
                              className="w-full"
                              maxValue={1}
                              minValue={0}
                              step={0.01}
                              value={isMuted ? 0 : volume}
                              onChange={handleVolumeChange as any}
                            >
                              <Slider.Output />
                              <Slider.Track>
                                <Slider.Fill />
                                <Slider.Thumb />
                              </Slider.Track>
                            </Slider>
                          </div>

                          <span className="text-xs text-foreground/60 w-8 text-right">
                            {Math.round((isMuted ? 0 : volume) * 100)}%
                          </span>
                        </div>

                        {/* 快速音量按钮 */}
                        <div className="flex justify-center gap-2">
                          <Button
                            className="text-xs"
                            variant="ghost"
                            onPress={() => handleVolumeChange(0)}
                          >
                            0%
                          </Button>
                          <Button
                            className="text-xs"
                            variant="ghost"
                            onPress={() => handleVolumeChange(0.25)}
                          >
                            25%
                          </Button>
                          <Button
                            className="text-xs"
                            variant="ghost"
                            onPress={() => handleVolumeChange(0.5)}
                          >
                            50%
                          </Button>
                          <Button
                            className="text-xs"
                            variant="ghost"
                            onPress={() => handleVolumeChange(0.75)}
                          >
                            75%
                          </Button>
                          <Button
                            className="text-xs"
                            size="sm"
                            variant="ghost"
                            onPress={() => handleVolumeChange(1)}
                          >
                            100%
                          </Button>
                        </div>
                      </div>
                    </Popover.Dialog>
                  </Popover.Content>
                </Popover>
              )}
            </div>
          )}
        </div>
      </div>

      <Card.Footer className="flex justify-between items-center text-sm text-foreground/50">
        <div>HeroUI v3 Music Player</div>
        <div>
          {metadataLoading
            ? "Loading metadata..."
            : loadingState === "loading"
              ? "Loading audio..."
              : "Ready"}
        </div>
      </Card.Footer>

      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio ref={audioRef} title={`Playing: ${title} by ${artist}`} />
    </Card.Root>
  );
};
