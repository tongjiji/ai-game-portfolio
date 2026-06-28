import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { VideoPlayer } from '../components/VideoPlayer';
import { api } from '../api';
import { works } from '../data/works';

export const PortfolioDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [work, setWork] = useState<typeof works[0] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.works.get(id || '').then((data) => {
      setWork(data);
      setLoading(false);
    }).catch(() => {
      const localWork = works.find((w) => w.id === id);
      setWork(localWork || null);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-apple-gray">加载中...</div>
      </div>
    );
  }

  if (!work) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center px-6">
          <h3 className="text-xl font-semibold text-apple-black mb-2">作品不存在</h3>
          <Link to="/portfolio" className="text-apple-blue text-sm font-medium hover:underline">
            返回作品列表
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="pt-24">
        <div className="max-w-5xl mx-auto px-6 md:px-8">
          <div className="flex items-center gap-4 mb-8">
            <Link
              to="/portfolio"
              className="flex items-center gap-2 text-apple-gray hover:text-apple-black text-sm font-medium transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              返回作品列表
            </Link>
          </div>

          <div className="mb-10">
            <VideoPlayer videoUrl={work.videoUrl} title={work.title} />
          </div>

          <div className="flex items-center gap-3 mb-6">
            <span className="px-4 py-1.5 bg-apple-blue text-white text-xs font-medium rounded-full">
              {work.category}
            </span>
            <span className="px-4 py-1.5 bg-apple-light text-apple-gray text-xs font-medium rounded-full">
              {work.aiModel}
            </span>
            <span className="text-xs text-apple-gray">{work.createdAt}</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-semibold text-apple-black mb-6">
            {work.title}
          </h1>

          <p className="text-apple-gray text-base md:text-lg leading-relaxed mb-10">
            {work.description}
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-apple-light rounded-xl p-6">
                <h3 className="text-lg font-semibold text-apple-black mb-4">创作思路</h3>
                <p className="text-apple-gray leading-relaxed">{work.details.concept}</p>
              </div>

              <div className="bg-apple-light rounded-xl p-6">
                <h3 className="text-lg font-semibold text-apple-black mb-4">创作场景</h3>
                <p className="text-apple-gray leading-relaxed">{work.details.scene}</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-apple-light rounded-xl p-6">
                <h3 className="text-lg font-semibold text-apple-black mb-4">作品标签</h3>
                <div className="flex flex-wrap gap-2">
                  {work.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-white text-apple-gray text-xs font-medium rounded-full border border-gray-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-apple-light rounded-xl p-6">
                <h3 className="text-lg font-semibold text-apple-black mb-4">使用工具</h3>
                <ul className="space-y-2">
                  {work.details.tools.map((tool) => (
                    <li key={tool} className="flex items-center gap-2 text-apple-gray text-sm">
                      <span className="w-1.5 h-1.5 bg-apple-blue rounded-full" />
                      {tool}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-apple-black rounded-xl p-6 text-white">
                <h3 className="text-lg font-semibold mb-4">联系合作</h3>
                <p className="text-gray-400 text-sm mb-4">
                  如果您对这个作品感兴趣，或有合作需求，请随时联系我
                </p>
                <a
                  href="mailto:T_58812@163.com"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-apple-blue text-white text-sm font-medium rounded-full hover:bg-apple-blue-hover transition-colors"
                >
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
