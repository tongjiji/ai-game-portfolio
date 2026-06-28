import { Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { VideoWork } from '../data/works';

interface VideoCardProps {
  work: VideoWork;
  featured?: boolean;
}

export const VideoCard = ({ work, featured = false }: VideoCardProps) => {
  return (
    <Link
      to={`/portfolio/${work.id}`}
      className={`group block overflow-hidden bg-white ${
        featured ? '' : 'border border-gray-100 rounded-xl'
      }`}
    >
      <div className={`relative ${featured ? 'aspect-video' : 'aspect-video rounded-t-xl overflow-hidden'}`}>
        <img
          src={work.coverUrl}
          alt={work.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
            <Play className="w-6 h-6 text-apple-black ml-0.5" />
          </div>
        </div>
      </div>

      <div className={`p-4 md:p-5 ${featured ? '' : 'rounded-b-xl'}`}>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs text-apple-gray">{work.category}</span>
          <span className="w-1 h-1 bg-apple-gray rounded-full" />
          <span className="text-xs text-apple-gray">{work.aiModel}</span>
        </div>
        
        <h3 className="text-base font-semibold text-apple-black mb-2 group-hover:text-apple-blue transition-colors duration-300">
          {work.title}
        </h3>
        
        <p className="text-sm text-apple-gray line-clamp-2">
          {work.description}
        </p>

        <div className="flex items-center justify-between mt-4">
          <span className="text-xs text-apple-gray">{work.createdAt}</span>
          <span className="text-xs text-apple-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            查看详情 →
          </span>
        </div>
      </div>
    </Link>
  );
};
