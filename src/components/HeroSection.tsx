import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { profile } from '../data/profile';

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center bg-apple-black text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-apple-dark via-apple-black to-apple-black" />
      
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <p className="text-sm text-gray-400 mb-6 tracking-wider">
          {profile.title}
        </p>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold mb-6 leading-tight">
          {profile.slogan}
        </h1>

        <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          {profile.bio.substring(0, 100)}...
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/portfolio"
            className="group flex items-center justify-center gap-2 px-8 py-3.5 bg-apple-blue text-white text-sm font-medium rounded-full hover:bg-apple-blue-hover transition-colors duration-300"
          >
            查看作品
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <a
            href={`mailto:${profile.contact.email}`}
            className="px-8 py-3.5 border border-white/30 text-white text-sm font-medium rounded-full hover:bg-white/5 transition-colors duration-300"
          >
            联系我
          </a>
        </div>

        <div className="mt-20 grid grid-cols-4 gap-8 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-semibold">8年</div>
            <div className="text-xs text-gray-500 mt-1">开发经验</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-semibold">5+</div>
            <div className="text-xs text-gray-500 mt-1">核心项目</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-semibold">40%</div>
            <div className="text-xs text-gray-500 mt-1">效率提升</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-semibold">4个</div>
            <div className="text-xs text-gray-500 mt-1">个人Demo</div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-5 h-8 border border-white/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-white/50 rounded-full" />
        </div>
      </div>
    </section>
  );
};
