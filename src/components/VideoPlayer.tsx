import { useState, useRef } from 'react';
import { Play, Volume2, VolumeX, Maximize, Minimize } from 'lucide-react';

interface VideoPlayerProps {
  videoUrl: string;
  title: string;
}

export const VideoPlayer = ({ videoUrl, title }: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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
      setProgress((videoRef.current.currentTime / videoRef.current.duration) * 100);
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

  const formatTime = (seconds: number) => {
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
          onClick={(e) => e.stopPropagation()}
        />
      </div>

      <div className={`absolute inset-0 flex flex-col justify-center items-center bg-black/40 transition-opacity duration-300 ${
        isPlaying ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}>
        <button
          onClick={handlePlayPause}
          className="w-16 h-16 rounded-full bg-white/95 flex items-center justify-center"
        >
          <Play className="w-8 h-8 text-apple-black ml-1" />
        </button>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div
          className="h-1 bg-white/20 rounded-full cursor-pointer mb-3"
          onClick={handleProgressClick}
        >
          <div
            className="h-full bg-white rounded-full transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-white text-xs">
          <span>{formatTime(videoRef.current?.currentTime || 0)}</span>
          <div className="flex items-center gap-4">
            <button
              onClick={(e) => { e.stopPropagation(); setIsMuted(!isMuted); }}
              className="hover:opacity-80 transition-opacity"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); handleFullscreen(); }}
              className="hover:opacity-80 transition-opacity"
            >
              {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
            </button>
          </div>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <div className="absolute top-4 right-4 px-3 py-1.5 bg-black/50 backdrop-blur-sm rounded-full">
        <span className="text-xs text-white">{title}</span>
      </div>
    </div>
  );
};
