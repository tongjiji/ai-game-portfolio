import { ArrowDown } from 'lucide-react';

interface ImageBackgroundProps {
  imageSrc: string;
  children: React.ReactNode;
  id: string;
  showScrollIndicator?: boolean;
}

export const ImageBackground = ({ imageSrc, children, id, showScrollIndicator = true }: ImageBackgroundProps) => {
  return (
    <div
      id={id}
      className="relative w-full h-screen flex items-center justify-center overflow-hidden scroll-smooth"
      style={{ scrollSnapAlign: 'start' }}
    >
      <div className="absolute inset-0">
        <img
          src={imageSrc}
          alt=""
          className="w-full h-full object-cover"
        />
        
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.4), rgba(0,0,0,0.7))',
          }}
        />
        
        <div className="absolute inset-0 tech-grid opacity-30" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4">
        {children}
      </div>

      {showScrollIndicator && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-tech-blue/80 animate-bounce">
          <span className="text-xs tracking-[0.2em] uppercase font-semibold">SCROLL</span>
          <div className="w-6 h-10 rounded-full border-2 border-tech-blue/60 flex items-start justify-center p-2 bg-tech-dark/50">
            <ArrowDown className="w-3 h-3 text-tech-blue animate-bounce" />
          </div>
        </div>
      )}
    </div>
  );
};
