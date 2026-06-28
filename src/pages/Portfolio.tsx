import { useState, useEffect } from 'react';
import { VideoCard } from '../components/VideoCard';
import { CategoryFilter } from '../components/CategoryFilter';
import { api } from '../api';
import { works as defaultWorks } from '../data/works';
import { categories, aiModels } from '../data/categories';

export const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedModel, setSelectedModel] = useState('all');
  const [works, setWorks] = useState(defaultWorks);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.works.get().then((data) => {
      setWorks(data);
      setLoading(false);
    }).catch(() => {
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-apple-gray">加载中...</div>
      </div>
    );
  }

  const filteredWorks = works.filter((work: { category: string; aiModel: string }) => {
    const matchCategory = selectedCategory === 'all' || work.category === selectedCategory;
    const matchModel = selectedModel === 'all' || work.aiModel === selectedModel;
    return matchCategory && matchModel;
  });

  const simpleCategories = categories.map((c) => ({ id: c.id, name: c.name }));

  return (
    <div className="min-h-screen bg-white">
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-semibold text-apple-black mb-4">
              作品合集
            </h1>
            <p className="text-apple-gray max-w-xl mx-auto">
              探索我的AI视频创作作品
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 pb-24">
        <div className="mb-10">
          <CategoryFilter
            categories={simpleCategories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>

        <div className="flex flex-wrap gap-3 mb-10">
          {aiModels.map((model) => (
            <button
              key={model.id}
              onClick={() => setSelectedModel(model.id)}
              className={`px-5 py-2 text-sm font-medium rounded-full transition-all duration-300 ${selectedModel === model.id
                  ? 'bg-apple-blue text-white'
                  : 'bg-apple-light text-apple-gray hover:bg-gray-200'
                }`}
            >
              {model.name}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between mb-8">
          <span className="text-sm text-apple-gray">
            共 {filteredWorks.length} 个作品
          </span>
        </div>

        {filteredWorks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWorks.map((work: typeof defaultWorks[0], index) => (
              <div
                key={work.id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <VideoCard work={work} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h3 className="text-xl font-semibold text-apple-black mb-2">暂无作品</h3>
            <p className="text-apple-gray">当前筛选条件下没有找到作品</p>
          </div>
        )}
      </div>
    </div>
  );
};
