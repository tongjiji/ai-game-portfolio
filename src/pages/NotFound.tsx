import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center">
      <div className="text-center px-6">
        <h1 className="text-4xl md:text-5xl font-semibold text-apple-black mb-4">
          404
        </h1>
        <h2 className="text-xl font-semibold text-apple-black mb-2">页面未找到</h2>
        <p className="text-apple-gray mb-8">
          抱歉，您访问的页面不存在。请检查网址是否正确，或返回首页继续浏览。
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 px-8 py-3 bg-apple-black text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            返回首页
          </Link>
          <Link
            to="/portfolio"
            className="px-8 py-3 border border-gray-300 text-apple-black text-sm font-medium rounded-full hover:bg-apple-light transition-colors"
          >
            浏览作品
          </Link>
        </div>
      </div>
    </div>
  );
};
