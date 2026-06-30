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
  const [isLoading, setIsLoading] = useState(true);
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
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
      clearTimeout(timeout);
    };
  }, [isPlaying]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackSpeed;
    }
    setShowSpeedMenu(false);
  }, [playbackSpeed]);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const dur = videoRef.current.duration;
      setCurrentTime(current);
      setProgress(dur > 0 ? (current / dur) * 100 : 0);
    }
  };

  const handleDurationChange = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const percent = (e.clientX - rect.left) / rect.width;
      videoRef.current.currentTime = percent * videoRef.current.duration;
      setProgress(percent * 100);
    }
  };

  const handleFullscreen = () => {
    if (containerRef.current) {
      if (!document.fullscreenElement) {
        containerRef.current.requestFullscreen();
        setIsFullscreen(true);
      } else {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  const handleVolumeChange = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleBuffered = () => {
    if (videoRef.current && videoRef.current.buffered.length > 0) {
      const bufferedEnd = videoRef.current.buffered.end(videoRef.current.buffered.length - 1);
      const dur = videoRef.current.duration;
      setBuffered(dur > 0 ? (bufferedEnd / dur) * 100 : 0);
    }
  };

  const handleWaiting = () => {
    setIsLoading(true);
  };

  const handleCanPlay = () => {
    setIsLoading(false);
  };

  const handleSeekBackward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 10);
    }
  };

  const handleSeekForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.min(videoRef.current.duration, videoRef.current.currentTime + 10);
    }
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || !isFinite(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
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
          preload="auto"
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
          onClick={handlePlayPause}
          className="w-20 h-20 rounded-full bg-white/95 flex items-center justify-center hover:scale-110 transition-transform duration-300"
        >
          <Play className="w-10 h-10 text-apple-black ml-1" />
        </button>
      </div>

      <div
        ref={controlsRef}
        className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-300"
      >
        <div
          className="h-1.5 bg-white/20 rounded-full cursor-pointer mb-3"
          onClick={handleProgressClick}
        >
          <div
            className="h-full bg-white/40 rounded-full absolute"
            style={{ width: `${buffered}%` }}
          />
          <div
            className="h-full bg-gradient-to-r from-tech-blue to-tech-purple rounded-full relative transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
          <div
            className="w-4 h-4 bg-white rounded-full absolute -top-1.5 shadow-lg opacity-0 hover:opacity-100 transition-opacity"
            style={{ left: `calc(${progress}% - 8px)` }}
          />
        </div>

        <div className="flex items-center justify-between text-white text-sm">
          <div className="flex items-center gap-3">
            <button
              onClick={(e) => { e.stopPropagation(); handlePlayPause(); }}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
            </button>
            
            <button
              onClick={(e) => { e.stopPropagation(); handleSeekBackward(); }}
              className="w-10 h-10 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            
            <span className="text-white/90 font-medium">{formatTime(currentTime)}</span>
            <span className="text-white/40">/</span>
            <span className="text-white/60">{formatTime(duration)}</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <button
                onClick={(e) => { e.stopPropagation(); setShowSpeedMenu(!showSpeedMenu); }}
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-colors"
              >
                {playbackSpeed}x
              </button>
              
              {showSpeedMenu && (
                <div className="absolute bottom-full right-0 mb-2 w-20 bg-gray-900/95 backdrop-blur-sm rounded-lg overflow-hidden border border-white/10">
                  {SPEEDS.map((speed) => (
                    <button
                      key={speed}
                      onClick={(e) => { e.stopPropagation(); setPlaybackSpeed(speed); }}
                      className={`w-full px-4 py-2 text-left text-sm transition-colors ${
                        playbackSpeed === speed 
                          ? 'bg-tech-blue/30 text-white' 
                          : 'text-white/70 hover:bg-white/10'
                      }`}
                    >
                      {speed}x
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={(e) => { e.stopPropagation(); handleVolumeChange(); }}
              className="w-10 h-10 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); handleSeekForward(); }}
              className="w-10 h-10 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
            >
              <RotateCcw className="w-4 h-4 rotate-180" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); handleFullscreen(); }}
              className="w-10 h-10 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
            >
              {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      <div className="absolute top-4 right-4 px-4 py-2 bg-black/60 backdrop-blur-sm rounded-full">
        <span className="text-sm text-white font-medium">{title}</span>
      </div>
    </div>
  );
};
