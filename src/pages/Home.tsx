import { useState, useEffect } from 'react';
import { Sparkles, Mail, MapPin, GraduationCap, Award, ChevronRight, Globe, ExternalLink } from 'lucide-react';
import { ImageBackground } from '../components/ImageBackground';
import { api } from '../api';
import { profile as defaultProfile } from '../data/profile';

export const Home = () => {
  const [profile, setProfile] = useState(defaultProfile);
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.profile.get().then((data) => {
      setProfile(data);
      setLoading(false);
    }).catch(() => {
      setLoading(false);
    });
  }, []);

  const skillCategories = [...new Set(profile.skills.map((s: { category: string }) => s.category))];

  const tabs = [
    { id: 'profile', label: '个人信息', icon: Sparkles },
    { id: 'skills', label: '专业技能', icon: ChevronRight },
    { id: 'experience', label: '工作经历', icon: Award },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-tech-dark flex items-center justify-center">
        <div className="text-tech-blue text-glow-blue">加载中...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-tech-dark tech-grid" style={{ scrollSnapType: 'y mandatory', overflowY: 'scroll', height: '100vh' }}>
      <div className="fixed inset-0 scanline z-50 pointer-events-none" />

      <ImageBackground imageSrc="/pets/1.webp" id="hero">
        <div className="text-center px-4">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Sparkles className="w-4 h-4 text-tech-blue" />
            <span className="text-xs text-tech-blue tracking-[0.3em] uppercase text-glow-blue">
              {profile.title}
            </span>
            <Sparkles className="w-4 h-4 text-tech-blue" />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight">
            <span className="block text-white text-glow-white">8年前端</span>
            <span className="block gradient-text text-glow-blue">AI探索者</span>
          </h1>
          <p className="text-white/70 text-sm sm:text-lg md:text-xl max-w-2xl mx-auto mb-8">{profile.bio}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="/portfolio" className="px-8 py-3 bg-gradient-to-r from-tech-blue to-tech-purple text-white font-medium rounded-full border-glow-blue hover:scale-105 transition-all duration-300">
              查看作品
            </a>
            <a href="#about" className="px-8 py-3 glass-card text-white font-medium rounded-full hover:glass-card-hover transition-all duration-300">
              了解更多
            </a>
          </div>
          <div className="flex items-center justify-center gap-4 sm:gap-6 mt-8 sm:mt-12 px-4">
            <div className="text-center flex-1">
              <div className="text-2xl sm:text-3xl font-bold text-tech-blue text-glow-blue">8+</div>
              <div className="text-xs text-white/50 mt-1">年开发经验</div>
            </div>
            <div className="text-center flex-1">
              <div className="text-2xl sm:text-3xl font-bold text-tech-purple text-glow-purple">20+</div>
              <div className="text-xs text-white/50 mt-1">项目经验</div>
            </div>
            <div className="text-center flex-1">
              <div className="text-2xl sm:text-3xl font-bold text-tech-cyan text-glow-blue">5+</div>
              <div className="text-xs text-white/50 mt-1">AI工具</div>
            </div>
            <div className="text-center flex-1">
              <div className="text-2xl sm:text-3xl font-bold text-tech-pink text-glow-pink">100+</div>
              <div className="text-xs text-white/50 mt-1">代码提交</div>
            </div>
          </div>
        </div>
      </ImageBackground>

      <ImageBackground imageSrc="/pets/2.webp" id="about">
        <div className="max-w-7xl mx-auto px-4 h-full relative">
          <div className="text-center mb-6 pt-4">
            <span className="text-tech-blue text-xs tracking-wider uppercase text-glow-blue">About Me</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 text-white text-glow-white">个人简介</h2>
          </div>

          <div className="flex justify-center mb-6">
            <div className="inline-flex glass-card rounded-full p-1 flex-wrap justify-center">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-4 md:px-6 py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 ${activeTab === tab.id ? 'bg-gradient-to-r from-tech-blue to-tech-purple text-white shadow-lg shadow-tech-blue/30' : 'text-white/60 hover:text-white hover:bg-white/5'}`}>
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="overflow-y-auto max-h-[calc(100vh-260px)] sm:max-h-[calc(100vh-240px)] pr-2">
            {activeTab === 'profile' && (
              <div className="space-y-4">
                <div className="glass-card rounded-2xl p-4 sm:p-5">
                  <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-tech-blue via-tech-purple to-tech-pink flex items-center justify-center shadow-lg shadow-tech-blue/25">
                      <span className="text-lg sm:text-xl font-bold text-white">{profile.name.charAt(0)}</span>
                    </div>
                    <div className="text-center sm:text-left">
                      <h3 className="text-base sm:text-lg font-bold text-white text-glow-white">{profile.name}</h3>
                      <p className="text-tech-blue text-xs sm:text-sm">{profile.title}</p>
                      <div className="flex items-center justify-center sm:justify-start gap-3 mt-1 flex-wrap">
                        <a href={`mailto:${profile.contact.email}`} className="flex items-center gap-1 text-white/60 hover:text-tech-blue transition-colors">
                          <Mail className="w-3 h-3" />
                          <span className="text-xs truncate max-w-[150px]">{profile.contact.email}</span>
                        </a>
                        <div className="flex items-center gap-1 text-white/60">
                          <MapPin className="w-3 h-3" />
                          <span className="text-xs">{profile.contact.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <h3 className="text-sm font-semibold text-tech-blue text-glow-blue mb-2">职业背景</h3>
                  <div className="space-y-2">
                    <p className="text-white/80 text-xs sm:text-sm leading-relaxed">{profile.bio}</p>
                    <p className="text-white/80 text-xs sm:text-sm leading-relaxed">{profile.background}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="glass-card rounded-xl p-3 sm:p-4">
                    <h3 className="text-xs sm:text-sm font-semibold text-tech-blue mb-2 flex items-center gap-2">
                      <GraduationCap className="w-3 h-3 sm:w-4 sm:h-4" />
                      教育背景
                    </h3>
                    <div className="space-y-2">
                      {profile.education.map((edu: { school: string; degree: string; major: string; period: string }, index) => (
                        <div key={index} className="pb-2 border-b border-white/10 last:border-0 last:pb-0">
                          <h4 className="font-semibold text-white text-xs">{edu.school}</h4>
                          <p className="text-xs text-white/60">{edu.degree} · {edu.major}</p>
                          <p className="text-xs text-white/40">{edu.period}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="glass-card rounded-xl p-3 sm:p-4">
                    <h3 className="text-xs sm:text-sm font-semibold text-tech-purple mb-2 flex items-center gap-2">
                      <Award className="w-3 h-3 sm:w-4 sm:h-4" />
                      核心优势
                    </h3>
                    <ul className="space-y-1.5">
                      {['8年前端开发经验，技术功底扎实', '精通React/Vue等主流框架', '熟练使用AI辅助开发工具提升效率', '逻辑思路清晰，学习能力强'].map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-gradient-to-r from-tech-blue to-tech-purple rounded-full mt-1 flex-shrink-0" />
                          <span className="text-xs text-white/80">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'skills' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {skillCategories.map((category) => (
                  <div key={category} className="glass-card rounded-xl p-3 sm:p-4">
                    <p className="text-tech-blue text-xs font-medium mb-2 flex items-center gap-1.5">
                      <ChevronRight className="w-3 h-3" />
                      {category}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {profile.skills.filter((s: { category: string }) => s.category === category).map((skill: { name: string }) => (
                        <span key={skill.name} className="px-2 py-0.5 bg-gradient-to-r from-tech-blue/20 to-tech-purple/20 text-white/90 text-xs font-medium rounded-full border border-tech-blue/30">
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'experience' && (
              <div className="space-y-3">
                {profile.experience.map((exp: { company: string; role: string; period: string; description: string; achievements: string[] }, index) => (
                  <div key={index} className="glass-card rounded-xl p-3 sm:p-5">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                      <div>
                        <h4 className="text-sm sm:text-base font-bold text-white">{exp.company}</h4>
                        <p className="text-tech-blue text-xs">{exp.role}</p>
                      </div>
                      <span className="text-xs text-white/60 bg-white/5 px-3 py-1 rounded-full mt-2 md:mt-0 whitespace-nowrap">{exp.period}</span>
                    </div>
                    <p className="text-white/80 text-xs sm:text-sm mb-3 leading-relaxed">{exp.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {exp.achievements.map((achievement: string, idx) => (
                        <span key={idx} className="px-2 py-1 bg-tech-blue/10 text-white/80 text-xs rounded-lg border border-tech-blue/20">
                          ✓ {achievement}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </ImageBackground>

      <ImageBackground imageSrc="/pets/3.webp" id="demos">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-6">
            <span className="text-tech-blue text-xs tracking-wider uppercase text-glow-blue">Demos</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 text-white text-glow-white flex items-center justify-center gap-3">
              <Globe className="w-6 h-6" />
              个人Demo
            </h2>
            <p className="text-white/60 mt-2 max-w-xl mx-auto text-xs">自主开发的Web应用项目，展示技术能力与产品思维</p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:gap-4">
            {profile.demos.map((demo: { title: string; url: string; description: string; technologies: string[] }, index) => (
              <div key={index} className="group glass-card rounded-2xl p-4 sm:p-5">
                <div className="flex items-start justify-between mb-3 sm:mb-4">
                  <div className="flex items-center gap-2 sm:gap-3">
                    {demo.url.includes('miniprogram') || demo.url === '#' ? (
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-tech-blue/20 flex items-center justify-center">
                        <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 text-tech-blue" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-tech-purple/20 flex items-center justify-center">
                        <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-tech-purple" />
                      </div>
                    )}
                    <h3 className="text-sm sm:text-base font-semibold text-white group-hover:text-tech-blue transition-all duration-300">
                      {demo.title}
                    </h3>
                  </div>
                  {demo.url !== '#' && (
                    <a href={demo.url} target="_blank" rel="noopener noreferrer" className="text-tech-blue hover:text-glow-blue flex items-center gap-1">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-white/60 mb-3 sm:mb-4">{demo.description}</p>
                <div className="flex flex-wrap gap-1 sm:gap-2">
                  {demo.technologies.map((tech) => (
                    <span key={tech} className="px-2 py-0.5 sm:px-3 sm:py-1 bg-gradient-to-r from-tech-blue/20 to-tech-purple/20 text-white/90 text-xs font-medium rounded-full border border-tech-blue/30">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </ImageBackground>

      <ImageBackground imageSrc="/pets/4.webp" id="projects">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-6">
            <span className="text-tech-blue text-xs tracking-wider uppercase text-glow-blue">Projects</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 text-white text-glow-white">项目经验</h2>
            <p className="text-white/60 mt-2 max-w-xl mx-auto text-xs">参与的企业级项目，涵盖金融、教育、零售等多个领域</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {profile.projects.map((project: { title: string; period: string; description: string; technologies: string[] }, index) => (
              <div key={index} className="glass-card rounded-xl p-3 sm:p-5">
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <h3 className="text-sm sm:text-base font-semibold text-white">{project.title}</h3>
                  <span className="text-xs text-white/50">{project.period}</span>
                </div>
                <p className="text-xs sm:text-sm text-white/60 mb-3">{project.description}</p>
                <div className="flex flex-wrap gap-1 sm:gap-2">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="px-2 py-0.5 sm:px-3 sm:py-1 bg-gradient-to-r from-tech-blue/20 to-tech-purple/20 text-white/90 text-xs font-medium rounded-full border border-tech-blue/30">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </ImageBackground>

      <ImageBackground imageSrc="/pets/5.webp" id="contact">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <span className="text-tech-blue text-xs tracking-wider uppercase text-glow-blue">Contact</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 text-white text-glow-white">联系我</h2>
          <p className="text-white/60 mt-4 max-w-xl mx-auto text-xs sm:text-sm">如果您有合作需求或想了解更多信息，欢迎随时联系我</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <a href={`mailto:${profile.contact.email}`} className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-tech-blue to-tech-purple text-white font-medium rounded-full border-glow-blue hover:scale-105 transition-all duration-300">
              <Mail className="w-5 h-5" />
              {profile.contact.email}
            </a>
          </div>
        </div>
      </ImageBackground>
    </div>
  );
};
