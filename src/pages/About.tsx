import { useState, useEffect } from 'react';
import { Mail, MapPin, Briefcase, GraduationCap, Award, Code, Globe, ExternalLink, Smartphone } from 'lucide-react';
import { api } from '../api';
import { profile as defaultProfile } from '../data/profile';

export const About = () => {
  const [profile, setProfile] = useState(defaultProfile);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.profile.get().then((data) => {
      setProfile(data);
      setLoading(false);
    }).catch(() => {
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-tech-dark flex items-center justify-center">
        <div className="text-tech-blue text-glow-blue">加载中...</div>
      </div>
    );
  }

  const skillCategories = [...new Set(profile.skills.map((s: { category: string }) => s.category))];

  return (
    <div className="min-h-screen bg-tech-dark">
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-semibold text-white text-glow-white mb-4">
              关于我
            </h1>
            <p className="text-white/60 max-w-xl mx-auto">
              从前端开发到AI辅助编程，持续探索技术新边界
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            <div className="glass-card rounded-2xl p-8 hover:glass-card-hover transition-all duration-300">
              <h2 className="text-xl font-semibold text-tech-blue text-glow-blue mb-6 flex items-center gap-3">
                <Code className="w-6 h-6" />
                转型故事
              </h2>
              <div className="space-y-4">
                <p className="text-white/70 leading-relaxed">{profile.bio}</p>
                <p className="text-white/70 leading-relaxed">{profile.background}</p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white text-glow-white mb-6 flex items-center gap-3">
                <Briefcase className="w-6 h-6 text-tech-blue" />
                工作经历
              </h2>
              <div className="space-y-8">
                {profile.experience.map((exp: { company: string; role: string; period: string; description: string; achievements: string[] }, index) => (
                  <div key={index} className="border-l-2 border-tech-blue pl-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-white text-lg">{exp.company}</h3>
                        <p className="text-tech-blue font-medium">{exp.role}</p>
                      </div>
                      <p className="text-white/50 mt-2 md:mt-0">{exp.period}</p>
                    </div>
                    <p className="text-white/70 mb-4">{exp.description}</p>
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement: string, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-white/70">
                          <span className="w-1.5 h-1.5 bg-gradient-to-r from-tech-blue to-tech-purple rounded-full mt-1.5 flex-shrink-0" />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white text-glow-white mb-6 flex items-center gap-3">
                <Globe className="w-6 h-6 text-tech-blue" />
                个人Demo
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {profile.demos.map((demo: { title: string; url: string; description: string; technologies: string[] }, index) => (
                  <div
                    key={index}
                    className="glass-card rounded-xl p-6 hover:glass-card-hover transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        {demo.url.includes('miniprogram') || demo.url === '#' ? (
                          <Smartphone className="w-6 h-6 text-tech-blue" />
                        ) : (
                          <Globe className="w-6 h-6 text-tech-blue" />
                        )}
                        <h3 className="font-semibold text-white">{demo.title}</h3>
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

            <div>
              <h2 className="text-xl font-semibold text-white text-glow-white mb-6">项目经历</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {profile.projects.map((project: { title: string; period: string; description: string; technologies: string[] }, index) => (
                  <div
                    key={index}
                    className="glass-card rounded-xl p-6 hover:glass-card-hover transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-white">{project.title}</h3>
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

            <div>
              <h2 className="text-xl font-semibold text-white text-glow-white mb-6">专业技能</h2>
              <div className="space-y-6">
                {skillCategories.map((category) => (
                  <div key={category}>
                    <p className="text-sm font-medium text-tech-blue mb-3">{category}</p>
                    <div className="flex flex-wrap gap-3">
                      {profile.skills
                        .filter((s: { category: string }) => s.category === category)
                        .map((skill: { name: string }) => (
                          <span
                            key={skill.name}
                            className="px-5 py-2.5 glass-card text-white/90 text-sm font-medium rounded-full hover:glass-card-hover transition-all duration-300"
                          >
                            {skill.name}
                          </span>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-gradient-to-br from-tech-blue/20 via-tech-purple/20 to-tech-pink/20 rounded-2xl p-8 text-white border border-tech-blue/30">
              <div className="text-center mb-8">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-tech-blue via-tech-purple to-tech-pink flex items-center justify-center mx-auto mb-4 shadow-lg shadow-tech-blue/30">
                  <span className="text-3xl font-semibold">{profile.name.charAt(0)}</span>
                </div>
                <h3 className="text-xl font-semibold">{profile.name}</h3>
                <p className="text-tech-blue text-sm mt-1">{profile.title}</p>
              </div>

              <div className="space-y-4">
                <a
                  href={`mailto:${profile.contact.email}`}
                  className="flex items-center gap-3 text-white/70 hover:text-tech-blue transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  <span className="text-sm">{profile.contact.email}</span>
                </a>
                <div className="flex items-center gap-3 text-white/70">
                  <MapPin className="w-5 h-5" />
                  <span className="text-sm">{profile.contact.location}</span>
                </div>
              </div>

              {/* <div className="mt-8 flex gap-3 justify-center">
                {profile.contact.social.map((social: { name: string; url: string }) => (
                  <a
                    key={social.name}
                    href={social.url}
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-tech-blue/30 hover:text-tech-blue transition-all duration-300"
                    title={social.name}
                  >
                    {social.name.charAt(0)}
                  </a>
                ))}
              </div> */}
            </div>

            <div className="bg-tech-dark/90 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-tech-blue/30 transition-all duration-300 z-10">
              <h3 className="text-lg font-semibold text-tech-blue mb-4 flex items-center gap-2">
                <GraduationCap className="w-5 h-5" />
                教育背景
              </h3>
              <div className="space-y-4">
                {profile.education.map((edu: { school: string; degree: string; major: string; period: string }, index) => (
                  <div key={index}>
                    <h4 className="font-semibold text-white">{edu.school}</h4>
                    <p className="text-sm text-white/60">{edu.degree} · {edu.major}</p>
                    <p className="text-xs text-white/40 mt-1">{edu.period}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-tech-dark/90 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-tech-purple/30 transition-all duration-300 z-10">
              <h3 className="text-lg font-semibold text-tech-purple mb-4 flex items-center gap-2">
                <Award className="w-5 h-5" />
                自我评价
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-gradient-to-r from-tech-blue to-tech-purple rounded-full mt-1.5 flex-shrink-0" />
                  <span className="text-sm text-white/70">善于和同事、领导沟通交流，能够很快融入团队</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-gradient-to-r from-tech-blue to-tech-purple rounded-full mt-1.5 flex-shrink-0" />
                  <span className="text-sm text-white/70">对待工作认真负责，具有强烈的责任意识，能承受较大工作压力</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-gradient-to-r from-tech-blue to-tech-purple rounded-full mt-1.5 flex-shrink-0" />
                  <span className="text-sm text-white/70">逻辑思路清晰，有良好的学习能力，对新技术有强烈好奇心</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-gradient-to-r from-tech-blue to-tech-purple rounded-full mt-1.5 flex-shrink-0" />
                  <span className="text-sm text-white/70">掌握AI辅助编程技能，善于使用AI工具提升开发效率</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-tech-darker">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-16">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-semibold text-white text-glow-white mb-6">
              联系我
            </h2>
            <p className="text-white/50 max-w-xl mx-auto mb-10">
              如果您有合作需求或想了解更多信息，欢迎随时联系我
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={`mailto:${profile.contact.email}`}
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-tech-blue to-tech-purple text-white text-sm font-medium rounded-full border-glow-blue hover:scale-105 transition-all duration-300"
              >
                <Mail className="w-5 h-5" />
                {profile.contact.email}
              </a>
              <div className="flex gap-3">
                {profile.contact.social.map((social: { name: string; url: string }) => (
                  <a
                    key={social.name}
                    href={social.url}
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-tech-blue/30 hover:text-tech-blue transition-all duration-300"
                    title={social.name}
                  >
                    {social.name.charAt(0)}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
