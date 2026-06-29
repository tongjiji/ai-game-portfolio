import { useState, useEffect, useCallback } from 'react';
import { Sparkles, Mail, MapPin, GraduationCap, Award, ChevronRight, Globe, ExternalLink, ArrowDown } from 'lucide-react';
import { api } from '../api';
import { profile as defaultProfile } from '../data/profile';

const SECTION_IDS = ['hero', 'about', 'demos', 'projects', 'contact'];

export const Home = () => {
  const [profile, setProfile] = useState(defaultProfile);
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(true);
  const [currentSection, setCurrentSection] = useState(0);
  const [isPlayingCurrent, setIsPlayingCurrent] = useState(true);

  useEffect(() => {
    api.profile.get().then((data) => {
      setProfile(data);
      setLoading(false);
    }).catch(() => {
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    let scrollTimeout: ReturnType<typeof setTimeout>;
    
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      if (isPlayingCurrent && e.deltaY > 0) {
        return;
      }

      const direction = e.deltaY > 0 ? 1 : -1;
      const newSection = Math.max(0, Math.min(SECTION_IDS.length - 1, currentSection + direction));
      
      if (newSection !== currentSection) {
        scrollToSection(newSection);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      (e as any).startY = touch.clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touch = e.changedTouches[0];
      const startY = (e as any).startY || touch.clientY;
      const deltaY = startY - touch.clientY;
      
      if (Math.abs(deltaY) < 50) return;

      if (isPlayingCurrent && deltaY > 0) {
        return;
      }

      const direction = deltaY > 0 ? 1 : -1;
      const newSection = Math.max(0, Math.min(SECTION_IDS.length - 1, currentSection + direction));
      
      if (newSection !== currentSection) {
        scrollToSection(newSection);
      }
    };

    const scrollToSection = (index: number) => {
      const element = document.getElementById(SECTION_IDS[index]);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    };

    const updateCurrentSection = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      
      for (let i = 0; i < SECTION_IDS.length; i++) {
        const element = document.getElementById(SECTION_IDS[i]);
        if (!element) continue;
        
        const rect = element.getBoundingClientRect();
        const elTop = rect.top + window.scrollY;
        const elBottom = elTop + window.innerHeight;
        
        if (scrollPosition >= elTop && scrollPosition < elBottom) {
          setCurrentSection(i);
          break;
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(updateCurrentSection, 100);
    });

    updateCurrentSection();

    return () => {
      clearTimeout(scrollTimeout);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('scroll', updateCurrentSection);
    };
  }, [currentSection, isPlayingCurrent]);

  const handlePlayComplete = useCallback((sectionId: string) => {
    if (SECTION_IDS[currentSection] === sectionId) {
      setIsPlayingCurrent(false);
    }
  }, [currentSection]);

  const handleVideoStart = useCallback((sectionId: string) => {
    if (SECTION_IDS[currentSection] === sectionId) {
      setIsPlayingCurrent(true);
    }
  }, [currentSection]);

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
    <div className="bg-tech-dark tech-grid w-screen h-screen overflow-hidden">
      <div className="fixed inset-0 scanline z-50 pointer-events-none" />

      <div className="w-full h-full overflow-y-auto scroll-smooth" style={{ scrollSnapType: 'y mandatory' }}>
        <section 
          id="hero"
          className="relative w-full h-screen scroll-snap-start overflow-hidden"
        >
          <div className="absolute inset-0">
            <video
              autoPlay
              muted
              loop={false}
              playsInline
              className="w-full h-full object-cover"
              onPlay={() => handleVideoStart('hero')}
              onEnded={() => handlePlayComplete('hero')}
            >
              <source src="/pets/1.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
            <div className="absolute inset-0 tech-grid opacity-30" />
          </div>

          <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-4">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Sparkles className="w-4 h-4 text-tech-blue" />
              <span className="text-xs text-tech-blue tracking-[0.3em] uppercase text-glow-blue">
                {profile.title}
              </span>
              <Sparkles className="w-4 h-4 text-tech-blue" />
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight text-center">
              <span className="block text-white text-glow-white">8年前端</span>
              <span className="block gradient-text text-glow-blue">
                AI探索者
              </span>
            </h1>
            <p className="text-white/70 text-lg sm:text-xl max-w-2xl mx-auto mb-10 text-center">
              {profile.bio}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/portfolio"
                className="px-8 py-3 bg-gradient-to-r from-tech-blue to-tech-purple text-white font-medium rounded-full border-glow-blue hover:scale-105 transition-all duration-300"
              >
                查看作品
              </a>
              <a
                href="#about"
                className="px-8 py-3 glass-card text-white font-medium rounded-full hover:glass-card-hover transition-all duration-300"
              >
                了解更多
              </a>
            </div>
            <div className="flex items-center justify-center gap-8 mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-tech-blue text-glow-blue">8+</div>
                <div className="text-xs text-white/50 mt-1">年开发经验</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-tech-purple text-glow-purple">20+</div>
                <div className="text-xs text-white/50 mt-1">项目经验</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-tech-cyan text-glow-blue">5+</div>
                <div className="text-xs text-white/50 mt-1">AI工具</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-tech-pink text-glow-pink">100+</div>
                <div className="text-xs text-white/50 mt-1">代码提交</div>
              </div>
            </div>
          </div>

          {!isPlayingCurrent && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-tech-blue/80 animate-bounce">
              <span className="text-xs tracking-[0.2em] uppercase font-semibold">SCROLL</span>
              <div className="w-6 h-10 rounded-full border-2 border-tech-blue/60 flex items-start justify-center p-2 bg-tech-dark/50">
                <ArrowDown className="w-3 h-3 text-tech-blue animate-bounce" />
              </div>
            </div>
          )}
        </section>

        <section 
          id="about"
          className="relative w-full h-screen scroll-snap-start overflow-hidden"
        >
          <div className="absolute inset-0">
            <video
              autoPlay
              muted
              loop={false}
              playsInline
              className="w-full h-full object-cover"
              onPlay={() => handleVideoStart('about')}
              onEnded={() => handlePlayComplete('about')}
            >
              <source src="/pets/2.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
            <div className="absolute inset-0 tech-grid opacity-30" />
          </div>

          <div className="relative z-10 w-full h-full px-4">
            <div className="max-w-7xl mx-auto h-full">
              <div className="text-center mb-6 pt-4">
                <span className="text-tech-blue text-xs tracking-wider uppercase text-glow-blue">About Me</span>
                <h2 className="text-3xl md:text-4xl font-bold mt-2 text-white text-glow-white">个人简介</h2>
              </div>

              <div className="flex justify-center mb-6">
                <div className="inline-flex glass-card rounded-full p-1 flex-wrap justify-center">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-4 md:px-6 py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 ${
                          activeTab === tab.id
                            ? 'bg-gradient-to-r from-tech-blue to-tech-purple text-white shadow-lg shadow-tech-blue/30'
                            : 'text-white/60 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        {tab.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="overflow-y-auto max-h-[calc(100vh-160px)] pr-2">
                {activeTab === 'profile' && (
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    <div className="md:col-span-7">
                      <div className="glass-card rounded-2xl p-5 hover:glass-card-hover transition-all duration-300">
                        <h3 className="text-base font-semibold text-tech-blue text-glow-blue mb-3">职业背景</h3>
                        <div className="space-y-2">
                          <p className="text-white/80 text-xs md:text-sm leading-relaxed">{profile.bio}</p>
                          <p className="text-white/80 text-xs md:text-sm leading-relaxed">{profile.background}</p>
                        </div>
                      </div>
                    </div>

                    <div className="md:col-span-5 space-y-4">
                      <div className="bg-gradient-to-br from-tech-blue/20 via-tech-purple/20 to-tech-pink/20 backdrop-blur-md rounded-2xl p-5 border border-tech-blue/30 text-center border-glow-blue">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-tech-blue via-tech-purple to-tech-pink flex items-center justify-center mx-auto mb-3 shadow-lg shadow-tech-blue/25">
                          <span className="text-xl font-bold text-white">{profile.name.charAt(0)}</span>
                        </div>
                        <h3 className="text-lg font-bold text-white text-glow-white">{profile.name}</h3>
                        <p className="text-tech-blue text-xs mt-1">{profile.title}</p>
                        <div className="mt-4 space-y-2">
                          <a
                            href={`mailto:${profile.contact.email}`}
                            className="flex items-center justify-center gap-2 text-white/80 hover:text-tech-blue transition-colors"
                          >
                            <Mail className="w-4 h-4" />
                            <span className="text-xs">{profile.contact.email}</span>
                          </a>
                          <div className="flex items-center justify-center gap-2 text-white/80">
                            <MapPin className="w-4 h-4" />
                            <span className="text-xs">{profile.contact.location}</span>
                          </div>
                        </div>
                      </div>

                      <div className="glass-card rounded-xl p-4 hover:glass-card-hover transition-all duration-300">
                        <h3 className="text-sm font-semibold text-tech-blue mb-2 flex items-center gap-2">
                          <GraduationCap className="w-4 h-4" />
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

                      <div className="glass-card rounded-xl p-4 hover:glass-card-hover transition-all duration-300">
                        <h3 className="text-sm font-semibold text-tech-purple mb-2 flex items-center gap-2">
                          <Award className="w-4 h-4" />
                          核心优势
                        </h3>
                        <ul className="space-y-1.5">
                          {[
                            '8年前端开发经验，技术功底扎实',
                            '精通React/Vue等主流框架',
                            '熟练使用AI辅助开发工具提升效率',
                            '逻辑思路清晰，学习能力强'
                          ].map((item, idx) => (
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
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {skillCategories.map((category) => (
                      <div key={category} className="glass-card rounded-xl p-4 hover:glass-card-hover transition-all duration-300">
                        <p className="text-tech-blue text-xs font-medium mb-2 flex items-center gap-1.5">
                          <ChevronRight className="w-3 h-3" />
                          {category}
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {profile.skills
                            .filter((s: { category: string }) => s.category === category)
                            .map((skill: { name: string }) => (
                              <span
                                key={skill.name}
                                className="px-2 py-1 bg-gradient-to-r from-tech-blue/20 to-tech-purple/20 text-white/90 text-xs font-medium rounded-full border border-tech-blue/30"
                              >
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
                      <div key={index} className="glass-card rounded-xl p-5 hover:glass-card-hover transition-all duration-300">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                          <div>
                            <h4 className="text-base font-bold text-white">{exp.company}</h4>
                            <p className="text-tech-blue text-xs">{exp.role}</p>
                          </div>
                          <span className="text-xs text-white/60 bg-white/5 px-3 py-1 rounded-full mt-2 md:mt-0 whitespace-nowrap">{exp.period}</span>
                        </div>
                        <p className="text-white/80 text-xs mb-3 leading-relaxed">{exp.description}</p>
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
          </div>

          {!isPlayingCurrent && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-tech-blue/80 animate-bounce">
              <span className="text-xs tracking-[0.2em] uppercase font-semibold">SCROLL</span>
              <div className="w-6 h-10 rounded-full border-2 border-tech-blue/60 flex items-start justify-center p-2 bg-tech-dark/50">
                <ArrowDown className="w-3 h-3 text-tech-blue animate-bounce" />
              </div>
            </div>
          )}
        </section>

        <section 
          id="demos"
          className="relative w-full h-screen scroll-snap-start overflow-hidden"
        >
          <div className="absolute inset-0">
            <video
              autoPlay
              muted
              loop={false}
              playsInline
              className="w-full h-full object-cover"
              onPlay={() => handleVideoStart('demos')}
              onEnded={() => handlePlayComplete('demos')}
            >
              <source src="/pets/3.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
            <div className="absolute inset-0 tech-grid opacity-30" />
          </div>

          <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-4">
            <div className="max-w-7xl mx-auto w-full">
              <div className="text-center mb-6">
                <span className="text-tech-blue text-xs tracking-wider uppercase text-glow-blue">Demos</span>
                <h2 className="text-3xl md:text-4xl font-bold mt-2 text-white text-glow-white flex items-center justify-center gap-3">
                  <Globe className="w-6 h-6" />
                  个人Demo
                </h2>
                <p className="text-white/60 mt-2 max-w-xl mx-auto text-xs">
                  自主开发的Web应用项目，展示技术能力与产品思维
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {profile.demos.map((demo: { title: string; url: string; description: string; technologies: string[] }, index) => (
                  <div
                    key={index}
                    className="group glass-card rounded-2xl p-5 hover:glass-card-hover transition-all duration-500"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        {demo.url.includes('miniprogram') || demo.url === '#' ? (
                          <div className="w-10 h-10 rounded-xl bg-tech-blue/20 flex items-center justify-center">
                            <ExternalLink className="w-5 h-5 text-tech-blue" />
                          </div>
                        ) : (
                          <div className="w-10 h-10 rounded-xl bg-tech-purple/20 flex items-center justify-center">
                            <Globe className="w-5 h-5 text-tech-purple" />
                          </div>
                        )}
                        <h3 className="text-base font-semibold text-white group-hover:text-tech-blue group-hover:text-glow-blue transition-all duration-300">
                          {demo.title}
                        </h3>
                      </div>
                      {demo.url !== '#' && (
                        <a
                          href={demo.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-tech-blue hover:text-glow-blue flex items-center gap-1"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                    <p className="text-sm text-white/60 mb-4">{demo.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {demo.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-gradient-to-r from-tech-blue/20 to-tech-purple/20 text-white/90 text-xs font-medium rounded-full border border-tech-blue/30"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {!isPlayingCurrent && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-tech-blue/80 animate-bounce">
              <span className="text-xs tracking-[0.2em] uppercase font-semibold">SCROLL</span>
              <div className="w-6 h-10 rounded-full border-2 border-tech-blue/60 flex items-start justify-center p-2 bg-tech-dark/50">
                <ArrowDown className="w-3 h-3 text-tech-blue animate-bounce" />
              </div>
            </div>
          )}
        </section>

        <section 
          id="projects"
          className="relative w-full h-screen scroll-snap-start overflow-hidden"
        >
          <div className="absolute inset-0">
            <video
              autoPlay
              muted
              loop={false}
              playsInline
              className="w-full h-full object-cover"
              onPlay={() => handleVideoStart('projects')}
              onEnded={() => handlePlayComplete('projects')}
            >
              <source src="/pets/4.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
            <div className="absolute inset-0 tech-grid opacity-30" />
          </div>

          <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-4">
            <div className="max-w-7xl mx-auto w-full">
              <div className="text-center mb-6">
                <span className="text-tech-blue text-xs tracking-wider uppercase text-glow-blue">Projects</span>
                <h2 className="text-3xl md:text-4xl font-bold mt-2 text-white text-glow-white">项目经验</h2>
                <p className="text-white/60 mt-2 max-w-xl mx-auto text-xs">
                  参与的企业级项目，涵盖金融、教育、零售等多个领域
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {profile.projects.map((project: { title: string; period: string; description: string; technologies: string[] }, index) => (
                  <div
                    key={index}
                    className="glass-card rounded-xl p-5 hover:glass-card-hover transition-all duration-500"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-base font-semibold text-white">{project.title}</h3>
                      <span className="text-xs text-white/50">{project.period}</span>
                    </div>
                    <p className="text-sm text-white/60 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-gradient-to-r from-tech-blue/20 to-tech-purple/20 text-white/90 text-xs font-medium rounded-full border border-tech-blue/30"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {!isPlayingCurrent && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-tech-blue/80 animate-bounce">
              <span className="text-xs tracking-[0.2em] uppercase font-semibold">SCROLL</span>
              <div className="w-6 h-10 rounded-full border-2 border-tech-blue/60 flex items-start justify-center p-2 bg-tech-dark/50">
                <ArrowDown className="w-3 h-3 text-tech-blue animate-bounce" />
              </div>
            </div>
          )}
        </section>

        <section 
          id="contact"
          className="relative w-full h-screen scroll-snap-start overflow-hidden"
        >
          <div className="absolute inset-0">
            <video
              autoPlay
              muted
              loop={false}
              playsInline
              className="w-full h-full object-cover"
              onPlay={() => handleVideoStart('contact')}
              onEnded={() => handlePlayComplete('contact')}
            >
              <source src="/pets/5.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
            <div className="absolute inset-0 tech-grid opacity-30" />
          </div>

          <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-4">
            <div className="max-w-3xl mx-auto text-center">
              <span className="text-tech-blue text-xs tracking-wider uppercase text-glow-blue">Contact</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 text-white text-glow-white">联系我</h2>
              <p className="text-white/60 mt-4 max-w-xl mx-auto text-sm">
                如果您有合作需求或想了解更多信息，欢迎随时联系我
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
                <a
                  href={`mailto:${profile.contact.email}`}
                  className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-tech-blue to-tech-purple text-white font-medium rounded-full border-glow-blue hover:scale-105 transition-all duration-300"
                >
                  <Mail className="w-5 h-5" />
                  {profile.contact.email}
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
