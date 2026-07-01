import { useState, useRef, useEffect } from 'react';
import { Play, Volume2, VolumeX, Maximize, Minimize, RotateCcw, Pause } from 'lucide-react';

interface VideoPlayerProps {
  videoUrl: string;
  title: string;
  coverUrl?: string;
}

export const VideoPlayer = ({ videoUrl, title, coverUrl }: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    setIsMuted(true);
    return () => {
      video.pause();
    };
  }, [videoUrl]);

  const formatTime = (time: number) => {
    if (!isFinite(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      setIsLoading(true);
      videoRef.current.play().then(() => {
        setIsPlaying(true);
        setIsLoading(false);
      }).catch(() => {
        setIsPlaying(false);
        setIsLoading(false);
      });
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

  const handleRestart = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play();
    setIsPlaying(true);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-gradient-to-br from-tech-dark via-black to-tech-dark rounded-2xl overflow-hidden shadow-2xl shadow-black/50"
      onClick={handlePlayPause}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="aspect-video relative">
        {coverUrl && !isPlaying && (
          <img
            src={coverUrl}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
        <video
          ref={videoRef}
          src={videoUrl}
          className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${isPlaying ? 'opacity-100' : 'opacity-0'}`}
          onTimeUpdate={handleTimeUpdate}
          onDurationChange={handleDurationChange}
          onEnded={() => setIsPlaying(false)}
          onProgress={handleBuffered}
          onWaiting={handleWaiting}
          onCanPlay={handleCanPlay}
          onClick={(e) => e.stopPropagation()}
          preload="metadata"
          playsInline
          loop={false}
          muted
        />
      </div>

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 z-20">
          <div className="relative">
            <div className="w-14 h-14 border-4 border-tech-blue/30 border-t-tech-blue rounded-full animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-4 h-4 bg-tech-blue rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      )}

      {!isPlaying && (
        <div className="absolute inset-0 flex flex-col justify-center items-center z-10">
          <button
            onClick={(e) => { e.stopPropagation(); handlePlayPause(); }}
            className="group relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-r from-tech-blue via-tech-purple to-tech-blue flex items-center justify-center shadow-lg shadow-tech-blue/40 hover:shadow-tech-blue/60 hover:scale-110 transition-all duration-300"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-tech-blue to-tech-purple opacity-0 group-hover:opacity-50 blur-lg transition-opacity duration-300" />
            <Play className="w-10 h-10 sm:w-12 sm:h-12 text-white ml-1 relative z-10" />
          </button>
          <p className="mt-4 text-white/90 text-base sm:text-lg font-medium text-center px-4">{title}</p>
        </div>
      )}

      <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4 sm:p-6 transition-all duration-300 z-10 ${isPlaying && !isHovering ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
        }`}>
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={(e) => { e.stopPropagation(); handlePlayPause(); }}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:text-tech-blue hover:bg-white/20 transition-all duration-300 flex-shrink-0"
          >
            {isPlaying ? <Pause className="w-5 h-5 sm:w-6 sm:h-6" /> : <Play className="w-5 h-5 sm:w-6 sm:h-6 ml-0.5" />}
          </button>

          <div className="flex-1 relative h-2 sm:h-2.5 bg-white/10 backdrop-blur-sm rounded-full cursor-pointer group" onClick={handleSeek}>
            <div className="absolute left-0 top-0 h-full bg-gradient-to-r from-tech-blue via-tech-purple to-tech-pink rounded-full transition-all duration-200" style={{ width: `${progress}%` }} />
            <div className="absolute left-0 top-0 h-full bg-white/30 rounded-full" style={{ width: `${buffered}%` }} />
            <div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" style={{ left: `calc(${progress}% - 8px)` }} />
          </div>

          <span className="text-white/70 text-xs sm:text-sm font-mono flex-shrink-0">{formatTime(currentTime)}</span>
          <span className="text-white/40 text-xs sm:text-sm flex-shrink-0">/</span>
          <span className="text-white/70 text-xs sm:text-sm font-mono flex-shrink-0">{formatTime(duration)}</span>

          <div className="flex items-center gap-1 ml-auto">
            <button
              onClick={(e) => { e.stopPropagation(); toggleMute(); }}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:text-tech-blue hover:bg-white/20 transition-all duration-300 flex-shrink-0"
            >
              {isMuted ? <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" /> : <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); toggleFullscreen(); }}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:text-tech-blue hover:bg-white/20 transition-all duration-300 flex-shrink-0"
            >
              {isFullscreen ? <Minimize className="w-4 h-4 sm:w-5 sm:h-5" /> : <Maximize className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); handleRestart(); }}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:text-tech-blue hover:bg-white/20 transition-all duration-300 flex-shrink-0"
            >
              <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
