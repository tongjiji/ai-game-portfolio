import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize, RotateCcw } from 'lucide-react';

interface VideoPlayerProps {
  videoUrl: string;
  title: string;
}

const SPEEDS = [0.5, 0.75, 1, 1.25, 1.5, 2];

export const VideoPlayer = ({ videoUrl, title }: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [buffered, setBuffered] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = () => {
      if (controlsRef.current) {
        controlsRef.current.classList.remove('opacity-0');
        controlsRef.current.classList.add('opacity-100');
      }
    };

    let timeout: ReturnType<typeof setTimeout>;
    const handleMouseLeave = () => {
      timeout = setTimeout(() => {
        if (controlsRef.current && isPlaying) {
          controlsRef.current.classList.remove('opacity-100');
          controlsRef.current.classList.add('opacity-0');
        }
      }, 3000);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      clearTimeout(timeout);
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [isPlaying]);

  useEffect(() => {
    if (videoRef.current && isPlaying && !isLoaded) {
      videoRef.current.load();
      setIsLoaded(true);
    }
  }, [isPlaying, isLoaded]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    if (!videoRef.current) return;
    
    if (!isLoaded) {
      videoRef.current.load();
      setIsLoaded(true);
      setIsLoading(true);
      videoRef.current.play().then(() => {
        setIsPlaying(true);
        setIsLoading(false);
      }).catch(() => {
        setIsLoading(false);
      });
    } else if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {});
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

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleSpeedChange = (speed: number) => {
    if (!videoRef.current) return;
    videoRef.current.playbackRate = speed;
    setPlaybackSpeed(speed);
    setShowSpeedMenu(false);
  };

  const handleRestart = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play();
    setIsPlaying(true);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-black rounded-xl overflow-hidden"
      onClick={handlePlayPause}
    >
      <div className="aspect-video">
        <video
          ref={videoRef}
          src={videoUrl}
          className="w-full h-full"
          onTimeUpdate={handleTimeUpdate}
          onDurationChange={handleDurationChange}
          onEnded={() => setIsPlaying(false)}
          onProgress={handleBuffered}
          onWaiting={handleWaiting}
          onCanPlay={handleCanPlay}
          onClick={(e) => e.stopPropagation()}
          preload="none"
        />
      </div>

      {isLoading && isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin" />
        </div>
      )}

      <div className={`absolute inset-0 flex flex-col justify-center items-center bg-black/40 transition-opacity duration-300 ${
        isPlaying ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handlePlayPause();
          }}
          className="w-20 h-20 rounded-full bg-gradient-to-r from-tech-blue to-tech-purple flex items-center justify-center border-glow-blue hover:scale-110 transition-transform duration-300"
        >
          <Play className="w-10 h-10 text-white ml-1" />
        </button>
        <p className="mt-4 text-white/80 text-lg font-medium">{title}</p>
      </div>

      <div
        ref={controlsRef}
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300 ${
          isPlaying && !isLoading ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePlayPause();
            }}
            className="text-white hover:text-tech-blue transition-colors"
          >
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
          </button>

          <div className="flex-1 relative h-2 bg-white/20 rounded-full cursor-pointer" onClick={handleSeek}>
            <div 
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-tech-blue to-tech-purple rounded-full"
              style={{ width: `${progress}%` }}
            />
            <div 
              className="absolute left-0 top-0 h-full bg-white/40 rounded-full"
              style={{ width: `${buffered}%` }}
            />
            <div 
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full opacity-0 hover:opacity-100 transition-opacity"
              style={{ left: `calc(${progress}% - 8px)` }}
            />
          </div>

          <span className="text-white/70 text-sm">{formatTime(currentTime)}</span>
          <span className="text-white/40 text-sm">/</span>
          <span className="text-white/70 text-sm">{formatTime(duration)}</span>

          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowSpeedMenu(!showSpeedMenu);
              }}
              className="text-white/70 hover:text-white text-sm font-medium px-2 py-1 rounded"
            >
              {playbackSpeed}x
            </button>
            {showSpeedMenu && (
              <div className="absolute bottom-full left-0 mb-2 bg-black/90 rounded-lg p-2 flex flex-col">
                {SPEEDS.map((speed) => (
                  <button
                    key={speed}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSpeedChange(speed);
                    }}
                    className={`px-4 py-1.5 text-sm rounded ${playbackSpeed === speed ? 'bg-tech-blue text-white' : 'text-white/70 hover:text-white'}`}
                  >
                    {speed}x
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleMute();
            }}
            className="text-white hover:text-tech-blue transition-colors"
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleFullscreen();
            }}
            className="text-white hover:text-tech-blue transition-colors"
          >
            {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleRestart();
            }}
            className="text-white hover:text-tech-blue transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};