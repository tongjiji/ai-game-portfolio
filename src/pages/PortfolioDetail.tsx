import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { VideoPlayer } from '../components/VideoPlayer';
import { api } from '../api';
import { works } from '../data/works';
import { formatDate } from '../utils/format';

export const PortfolioDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [work, setWork] = useState<typeof works[0] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const localWork = works.find((w) => w.id === id);
    if (localWork) {
      setWork(localWork);
      setIsLoading(false);
    }

    const fetchWork = async () => {
      try {
        const data = await api.works.get(id || '');
        if (data) {
          setWork(data as typeof works[0]);
        }
        setIsLoading(false);
      } catch {
        setIsLoading(false);
      }
    };
    fetchWork();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-tech-dark flex items-center justify-center">
        <div className="text-center px-6">
          <div className="w-12 h-12 border-4 border-tech-blue/30 border-t-tech-blue rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/60 text-sm">加载中...</p>
        </div>
      </div>
    );
  }

  if (!work) {
    return (
      <div className="min-h-screen bg-tech-dark flex items-center justify-center">
        <div className="text-center px-6">
          <h3 className="text-xl font-semibold text-white mb-2">作品不存在</h3>
          <Link to="/portfolio" className="text-tech-blue text-sm font-medium hover:text-glow-blue">
            返回作品列表
          </Link>
        </div>
      </div>
    );
  }

  const details = work.details || { concept: '', tools: [], scene: '' };
  const tags = work.tags || [];

  return (
    <div className="min-h-screen bg-tech-dark">
      <div className="pt-24">
        <div className="max-w-5xl mx-auto px-6 md:px-8">
          <div className="flex items-center gap-4 mb-8">
            <Link to="/portfolio" className="flex items-center gap-2 text-white/70 hover:text-tech-blue text-sm font-medium transition-colors">
              <ArrowLeft className="w-5 h-5" />
              返回作品列表
            </Link>
          </div>

          <div className="mb-10">
            <VideoPlayer videoUrl={work.videoUrl} title={work.title} />
          </div>

          <div className="flex items-center gap-3 mb-6">
            <span className="px-4 py-1.5 bg-gradient-to-r from-tech-blue to-tech-purple text-white text-xs font-medium rounded-full border-glow-blue">
              {work.category}
            </span>
            <span className="px-4 py-1.5 glass-card text-white/80 text-xs font-medium rounded-full">
              {work.aiModel}
            </span>
            <span className="text-xs text-white/40">{formatDate(work.createdAt)}</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-semibold text-white text-glow-white mb-6">
            {work.title}
          </h1>

          <p className="text-white/70 text-base md:text-lg leading-relaxed mb-10">
            {work.description}
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="glass-card rounded-xl p-6 hover:glass-card-hover transition-all duration-300">
                <h3 className="text-lg font-semibold text-tech-blue text-glow-blue mb-4">创作思路</h3>
                <p className="text-white/70 leading-relaxed">{details.concept}</p>
              </div>

              <div className="glass-card rounded-xl p-6 hover:glass-card-hover transition-all duration-300">
                <h3 className="text-lg font-semibold text-tech-purple text-glow-purple mb-4">创作场景</h3>
                <p className="text-white/70 leading-relaxed">{details.scene}</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="glass-card rounded-xl p-6 hover:glass-card-hover transition-all duration-300">
                <h3 className="text-lg font-semibold text-tech-blue mb-4">作品标签</h3>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-gradient-to-r from-tech-blue/20 to-tech-purple/20 text-white/90 text-xs font-medium rounded-full border border-tech-blue/30">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="glass-card rounded-xl p-6 hover:glass-card-hover transition-all duration-300">
                <h3 className="text-lg font-semibold text-tech-purple mb-4">使用工具</h3>
                <ul className="space-y-2">
                  {details.tools.map((tool) => (
                    <li key={tool} className="flex items-center gap-2 text-white/70 text-sm">
                      <span className="w-1.5 h-1.5 bg-gradient-to-r from-tech-blue to-tech-purple rounded-full" />
                      {tool}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gradient-to-br from-tech-blue/20 via-tech-purple/20 to-tech-pink/20 rounded-xl p-6 border border-tech-blue/30">
                <h3 className="text-lg font-semibold text-white mb-4">联系合作</h3>
                <p className="text-white/60 text-sm mb-4">如果您对这个作品感兴趣，或有合作需求，请随时联系我</p>
                <a href="mailto:T_58812@163.com" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-tech-blue to-tech-purple text-white text-sm font-medium rounded-full border-glow-blue hover:scale-105 transition-all duration-300">
                  发送邮件
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
