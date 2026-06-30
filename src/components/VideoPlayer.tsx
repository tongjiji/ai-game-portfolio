import { useState, useRef, useEffect } from 'react';
import { Play, Volume2, VolumeX, Maximize, Minimize, RotateCcw } from 'lucide-react';

interface VideoPlayerProps {
  videoUrl: string;
  title: string;
}

export const VideoPlayer = ({ videoUrl, title }: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    setIsMuted(true);
    video.play().then(() => {
      setIsPlaying(true);
    }).catch(() => {
      setIsPlaying(false);
    });
    return () => {
      video.pause();
    };
  }, [videoUrl]);

  const formatTime = (time: number) => {
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

  const handleRestart = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play();
    setIsPlaying(true);
  };

  return (
    <div ref={containerRef} className="relative w-full bg-black rounded-xl overflow-hidden" onClick={handlePlayPause}>
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
          playsInline
          loop={false}
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
          onClick={(e) => { e.stopPropagation(); handlePlayPause(); }}
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-r from-tech-blue to-tech-purple flex items-center justify-center border-glow-blue hover:scale-110 transition-transform duration-300"
        >
          <Play className="w-8 h-8 sm:w-10 sm:h-10 text-white ml-1" />
        </button>
        <p className="mt-3 text-white/80 text-sm sm:text-lg font-medium text-center px-4">{title}</p>
      </div>
      <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 sm:p-4 transition-opacity duration-300 ${
        isPlaying && !isLoading ? 'opacity-0' : 'opacity-100'
      }`}>
        <div className="flex items-center gap-2 sm:gap-3">
          <button onClick={(e) => { e.stopPropagation(); handlePlayPause(); }} className="text-white hover:text-tech-blue transition-colors flex-shrink-0">
            {isPlaying ? (
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
              </svg>
            ) : (
              <Play className="w-5 h-5 sm:w-6 sm:h-6" />
            )}
          </button>
          <div className="flex-1 relative h-1.5 sm:h-2 bg-white/20 rounded-full cursor-pointer" onClick={handleSeek}>
            <div className="absolute left-0 top-0 h-full bg-gradient-to-r from-tech-blue to-tech-purple rounded-full" style={{ width: `${progress}%` }} />
            <div className="absolute left-0 top-0 h-full bg-white/40 rounded-full" style={{ width: `${buffered}%` }} />
          </div>
          <span className="text-white/70 text-xs sm:text-sm flex-shrink-0">{formatTime(currentTime)}</span>
          <span className="text-white/40 text-xs sm:text-sm flex-shrink-0">/</span>
          <span className="text-white/70 text-xs sm:text-sm flex-shrink-0">{formatTime(duration)}</span>
          <button onClick={(e) => { e.stopPropagation(); toggleMute(); }} className="text-white hover:text-tech-blue transition-colors flex-shrink-0">
            {isMuted ? <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" /> : <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />}
          </button>
          <button onClick={(e) => { e.stopPropagation(); toggleFullscreen(); }} className="text-white hover:text-tech-blue transition-colors flex-shrink-0">
            {isFullscreen ? <Minimize className="w-4 h-4 sm:w-5 sm:h-5" /> : <Maximize className="w-4 h-4 sm:w-5 sm:h-5" />}
          </button>
          <button onClick={(e) => { e.stopPropagation(); handleRestart(); }} className="text-white hover:text-tech-blue transition-colors flex-shrink-0">
            <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
