import { useState, useRef, useEffect } from 'react';
import { Play, Volume2, VolumeX, Maximize, Minimize, RotateCcw, Pause } from 'lucide-react';

interface VideoPlayerProps {
  videoUrl: string;
  title: string;
  coverUrl?: string;
}

export const VideoPlayer = ({ videoUrl, title, coverUrl }: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
       const video = videoRef.current;
    if (!video) return;

    video.muted = false;
    setIsMuted(false);
    video.play().then(() => {
      setIsPlaying(true);
      setIsLoading(false);
    }).catch(() => {
      setIsPlaying(false);
      setIsLoading(false);
    });

    return () => {
      video.pause();
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [videoUrl]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('msfullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('msfullscreenchange', handleFullscreenChange);
    };
  }, []);

  useEffect(() => {
    if (isPlaying && controlsVisible) {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
      controlsTimeoutRef.current = setTimeout(() => {
        setControlsVisible(false);
      }, 3000);
    }
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [isPlaying, controlsVisible]);

  const formatTime = (time: number) => {
    if (!isFinite(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      setIsLoading(true);
      videoRef.current.play().then(() => {
        setIsPlaying(true);
        setIsLoading(false);
      }).catch(() => {
        setIsPlaying(false);
        setIsLoading(false);
      });
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
    setProgress((videoRef.current.currentTime / videoRef.current.duration) * 100);
  };

  const handleDurationChange = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const newTime = percent * videoRef.current.duration;
    videoRef.current.currentTime = newTime;
  };

  const handleBuffered = () => {
    if (!videoRef.current) return;
    const bufferedTime = videoRef.current.buffered.length > 0
      ? videoRef.current.buffered.end(videoRef.current.buffered.length - 1)
      : 0;
    setBuffered((bufferedTime / videoRef.current.duration) * 100);
  };

  const handleWaiting = () => {
    setIsLoading(true);
  };

  const handleCanPlay = () => {
    setIsLoading(false);
  };

  const handlePlay = () => {
    setIsPlaying(true);
    setIsLoading(false);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      const video = videoRef.current;
      const container = containerRef.current;
      if (video?.requestFullscreen) {
        video.requestFullscreen();
      } else if ((video as any)?.webkitEnterFullscreen) {
        (video as any).webkitEnterFullscreen();
      } else if (container?.requestFullscreen) {
        container.requestFullscreen();
      } else if ((container as any)?.webkitRequestFullscreen) {
        (container as any).webkitRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen();
      }
    }
  };

  const handleRestart = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play();
    setIsPlaying(true);
  };

  const handleContainerClick = () => {
    if (isPlaying) {
      setControlsVisible(!controlsVisible);
    } else {
      handlePlayPause();
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full bg-black rounded-xl overflow-hidden ${
        isFullscreen
          ? 'fixed inset-0 z-50'
          : ''
      }`}
      onClick={handleContainerClick}
    >
      <div className={`relative ${isFullscreen ? 'w-full h-full' : 'aspect-video'}`}>
        {coverUrl && !isPlaying && !isLoading && (
          <img
            src={coverUrl}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <video
          ref={videoRef}
          src={videoUrl}
          className={`absolute inset-0 w-full h-full ${isFullscreen ? 'object-contain' : 'object-cover'}`}
          onTimeUpdate={handleTimeUpdate}
          onDurationChange={handleDurationChange}
          onEnded={() => setIsPlaying(false)}
          onProgress={handleBuffered}
          onWaiting={handleWaiting}
          onCanPlay={handleCanPlay}
          onPlay={handlePlay}
          onPause={handlePause}
          preload="auto"
          playsInline
          loop={false}
        />
      </div>

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 z-20">
          <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin" />
        </div>
      )}

      {!isPlaying && !isLoading && (
        <div className="absolute inset-0 flex flex-col justify-center items-center z-10 bg-black/30">
          <button
            onClick={(e) => { e.stopPropagation(); handlePlayPause(); }}
            className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
          >
            <Play className="w-8 h-8 ml-1" />
          </button>
        </div>
      )}

      <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 transition-opacity duration-300 z-10 ${
        controlsVisible || !isPlaying ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}>
        <div className="flex items-center gap-3">
          <button
            onClick={(e) => { e.stopPropagation(); handlePlayPause(); }}
            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors flex-shrink-0"
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
          </button>

          <div className="flex-1 relative h-2 bg-white/20 rounded-full cursor-pointer group" onClick={(e) => { e.stopPropagation(); handleSeek(e); }}>
            <div className="absolute left-0 top-0 h-full bg-white rounded-full" style={{ width: `${progress}%` }} />
            <div className="absolute left-0 top-0 h-full bg-white/40 rounded-full" style={{ width: `${buffered}%` }} />
            <div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" style={{ left: `calc(${progress}% - 8px)` }} />
          </div>

          <span className="text-white/70 text-sm font-mono flex-shrink-0">{formatTime(currentTime)}</span>
          <span className="text-white/40 text-sm flex-shrink-0">/</span>
          <span className="text-white/70 text-sm font-mono flex-shrink-0">{formatTime(duration)}</span>

          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={(e) => { e.stopPropagation(); toggleMute(); }}
              className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors flex-shrink-0"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <button
onClick = {(e) => { e.stopPropagation(); toggleFullscreen(); }}
        className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors flex-shrink-0"
            >
          {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
        </button>
        <button
              onClick={(e) => { e.stopPropagation(); handleRestart(); }}
              className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors flex-shrink-0"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};