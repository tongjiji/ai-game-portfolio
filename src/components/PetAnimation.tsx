import { useState, useEffect, useRef } from 'react';

export const PetAnimation = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [wink, setWink] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      setIsScrolling(true);

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = window.setTimeout(() => {
        setIsScrolling(false);
      }, 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const winkInterval = setInterval(() => {
      setWink(true);
      setTimeout(() => setWink(false), 200);
    }, 4000 + Math.random() * 3000);

    return () => clearInterval(winkInterval);
  }, []);

  const floatOffset = Math.sin(scrollY * 0.005) * 10;
  const wingFlapOffset = isScrolling ? Math.sin(scrollY * 0.02) * 15 : Math.sin(Date.now() * 0.003) * 3;
  const tailWagOffset = isScrolling ? Math.sin(scrollY * 0.03) * 20 : Math.sin(Date.now() * 0.005) * 8;
  const rotation = Math.sin(scrollY * 0.003) * 5;
  const opacity = Math.min(1, Math.max(0.6, 1 - scrollY / 2000));

  return (
    <div
      ref={containerRef}
      className="fixed bottom-8 right-8 z-50 pointer-events-none select-none"
      style={{
        transform: `translateY(${floatOffset}px) rotate(${rotation}deg)`,
        opacity,
      }}
    >
      <div className="relative">
        <img
          src="/pets/toothless.png"
          alt="萌宠"
          className="w-32 md:w-40 lg:w-48 drop-shadow-2xl"
          style={{
            filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.3))',
          }}
        />

        <div
          className="absolute top-0 left-0 w-full h-full origin-bottom"
          style={{
            transform: `rotate(${wingFlapOffset * 0.5}deg)`,
            transformOrigin: 'bottom center',
          }}
        >
          <div
            className="absolute top-1/2 left-0 w-1/2 h-1/2 origin-right"
            style={{
              transform: `rotate(${-wingFlapOffset}deg)`,
            }}
          />
          <div
            className="absolute top-1/2 right-0 w-1/2 h-1/2 origin-left"
            style={{
              transform: `rotate(${wingFlapOffset}deg)`,
            }}
          />
        </div>

        <div
          className="absolute bottom-0 right-0 w-1/3 h-1/4 origin-top-left"
          style={{
            transform: `rotate(${tailWagOffset}deg)`,
          }}
        />

        {wink && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="absolute w-8 h-4 bg-black rounded-full opacity-70" style={{ top: '35%', left: '25%' }} />
            <div className="absolute w-8 h-4 bg-black rounded-full opacity-70" style={{ top: '35%', right: '25%' }} />
          </div>
        )}

        <div
          className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-20 h-4 rounded-full blur-md"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.4) 0%, transparent 70%)',
            transform: `translateX(${tailWagOffset * 0.3}px)`,
          }}
        />
      </div>

      <div
        className="absolute -left-4 top-1/2 -translate-y-1/2 bg-black/80 text-white text-xs px-3 py-1.5 rounded-full whitespace-nowrap opacity-0 transition-opacity duration-300"
        style={{
          opacity: isScrolling ? 1 : 0,
          transform: `translateY(${floatOffset}px)`,
        }}
      >
        {isScrolling ? '✨ 跟着你动哦~' : ''}
      </div>
    </div>
  );
};
