import { Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { VideoWork } from '../data/works';

interface VideoCardProps {
  work: VideoWork;
}

export const VideoCard = ({ work }: VideoCardProps) => {
  return (
    <Link
      to={`/portfolio/${work.id}`}
      className="group block overflow-hidden glass-card rounded-xl hover:glass-card-hover transition-all duration-500"
    >
      <div className="relative aspect-video rounded-t-xl overflow-hidden">
        <img
          src={work.coverUrl}
          alt={work.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-14 h-14 rounded-full bg-tech-blue/80 flex items-center justify-center shadow-lg shadow-tech-blue/30">
            <Play className="w-6 h-6 text-white ml-0.5" />
          </div>
        </div>
      </div>

      <div className="p-4 md:p-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs text-tech-blue">{work.category}</span>
          <span className="w-1 h-1 bg-tech-blue rounded-full" />
          <span className="text-xs text-tech-purple">{work.aiModel}</span>
        </div>

        <h3 className="text-base font-semibold text-white mb-2 group-hover:text-tech-blue group-hover:text-glow-blue transition-all duration-300">
          {work.title}
        </h3>

        <p className="text-sm text-white/60 line-clamp-2">
          {work.description}
        </p>

        <div className="flex items-center justify-between mt-4">
          <span className="text-xs text-white/40">{work.createdAt}</span>
          <span className="text-xs text-tech-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            查看详情 →
          </span>
        </div>
      </div>
    </Link>
  );
};
