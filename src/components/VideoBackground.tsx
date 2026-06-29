import { useState, useEffect, useRef, useCallback, forwardRef } from 'react';
import type { ForwardedRef } from 'react';
import { ArrowDown } from 'lucide-react';

interface VideoBackgroundProps {
  videoSrc: string;
  children: React.ReactNode;
  id: string;
  showScrollIndicator?: boolean;
  hasPlayed?: boolean;
  onPlayComplete?: () => void;
  onPlayingChange?: (isPlaying: boolean) => void;
}

export const VideoBackground = forwardRef<HTMLDivElement, VideoBackgroundProps>(
  ({ videoSrc, children, id, showScrollIndicator = true, hasPlayed = false, onPlayComplete, onPlayingChange }, ref: ForwardedRef<HTMLDivElement>) => {
    const [isPlayingState, setIsPlayingState] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const [showContent, setShowContent] = useState(false);
    const [posterUrl, setPosterUrl] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const videoRef = useRef<HTMLVideoElement>(null);
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInViewRef = useRef(false);
    const hasStartedPlayingRef = useRef(false);

    const setIsPlaying = (playing: boolean) => {
      setIsPlayingState(playing);
      onPlayingChange?.(playing);
    };

    const isPlaying = isPlayingState;

    const captureFrame = useCallback((time?: number) => {
      if (videoRef.current) {
        const video = videoRef.current;
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth || 1920;
        canvas.height = video.videoHeight || 1080;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          if (time !== undefined) {
            video.currentTime = time;
          }
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          const url = canvas.toDataURL('image/jpeg', 0.8);
          setPosterUrl(url);
        }
      }
    }, []);

    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              isInViewRef.current = true;
              if (!hasPlayed && !hasStartedPlayingRef.current) {
                hasStartedPlayingRef.current = true;
                setIsPlaying(true);
                if (videoRef.current) {
                  videoRef.current.load();
                  videoRef.current.play().catch(() => {
                    setIsComplete(true);
                    setTimeout(() => setShowContent(true), 300);
                    onPlayComplete?.();
                  });
                }
              }
            } else {
              isInViewRef.current = false;
              if (videoRef.current && !isComplete) {
                videoRef.current.pause();
              }
            }
          });
        },
        { threshold: 0.5, rootMargin: '0px 0px -10% 0px' }
      );

      if (sectionRef.current) {
        observer.observe(sectionRef.current);
      }

      return () => {
        observer.disconnect();
      };
    }, [hasPlayed, onPlayComplete]);

    useEffect(() => {
      if (!hasPlayed && videoRef.current) {
        videoRef.current.onloadedmetadata = () => {
          captureFrame(0.1);
          setIsLoading(false);
        };
      }
    }, [hasPlayed, captureFrame]);

    const handleVideoEnd = () => {
      captureFrame();
      setIsPlaying(false);
      setIsComplete(true);
      setTimeout(() => setShowContent(true), 300);
      onPlayComplete?.();
    };

    const handleVideoTimeUpdate = () => {
      if (videoRef.current) {
        const video = videoRef.current;
        if (video.duration - video.currentTime < 0.5) {
          captureFrame();
        }
      }
    };

    const handleVideoError = () => {
      setIsLoading(false);
      setIsComplete(true);
      setTimeout(() => setShowContent(true), 300);
    };

    const handleVideoCanPlay = () => {
      setIsLoading(false);
    };

    useEffect(() => {
      if (ref) {
        if (typeof ref === 'function') {
          ref(sectionRef.current);
        } else {
          ref.current = sectionRef.current;
        }
      }
    }, [ref]);

    return (
      <div
        ref={sectionRef}
        id={id}
        className="relative w-full h-full flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0">
          {!isComplete ? (
            <>
              {posterUrl && (
                <img
                  src={posterUrl}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
                  style={{ opacity: isLoading ? 1 : 0 }}
                />
              )}
              <video
                ref={videoRef}
                className="w-full h-full object-cover transition-opacity duration-500"
                style={{ opacity: isLoading ? 0 : 1 }}
                autoPlay={false}
                muted
                loop={false}
                playsInline
                preload="metadata"
                poster={posterUrl}
                onEnded={handleVideoEnd}
                onTimeUpdate={handleVideoTimeUpdate}
                onError={handleVideoError}
                onCanPlay={handleVideoCanPlay}
              >
                <source src={videoSrc} type="video/mp4" />
              </video>
            </>
          ) : posterUrl ? (
            <img
              src={posterUrl}
              alt=""
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-tech-dark via-tech-darker to-tech-dark" />
          )}
          
          <div
            className="absolute inset-0 transition-opacity duration-500"
            style={{
              background: isPlaying 
                ? 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.2), rgba(0,0,0,0.4))' 
                : 'linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.4), rgba(0,0,0,0.7))',
            }}
          />
          
          <div className="absolute inset-0 tech-grid opacity-30" />
        </div>

        {isLoading && !hasPlayed && (
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 border-4 border-tech-blue/30 border-t-tech-blue rounded-full animate-spin" />
              <span className="text-tech-blue/80 text-sm tracking-[0.2em] uppercase">Loading...</span>
            </div>
          </div>
        )}

        <div
          className={`relative z-10 w-full max-w-7xl mx-auto px-4 transition-all duration-1000 ${
            showContent || hasPlayed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {children}
        </div>

        {showScrollIndicator && !isPlaying && !isLoading && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-tech-blue/80 animate-bounce">
            <span className="text-xs tracking-[0.2em] uppercase font-semibold">SCROLL</span>
            <div className="w-6 h-10 rounded-full border-2 border-tech-blue/60 flex items-start justify-center p-2 bg-tech-dark/50">
              <ArrowDown className="w-3 h-3 text-tech-blue animate-bounce" />
            </div>
          </div>
        )}
      </div>
    );
  }
);

VideoBackground.displayName = 'VideoBackground';
