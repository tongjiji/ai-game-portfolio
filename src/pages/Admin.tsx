import { useState, useEffect } from 'react';
import { User, Video, Upload, Plus, Edit2, Trash2, Save, X, LogOut, Code, Briefcase, GraduationCap, Mail, Layers } from 'lucide-react';
import { api } from '../api';
import { profile as defaultProfile } from '../data/profile';
import { works as defaultWorks } from '../data/works';

type TabType = 'profile' | 'skills' | 'experience' | 'education' | 'projects' | 'demos' | 'contact' | 'works' | 'upload';

type SkillType = { name: string; category: string };
type ExperienceType = { company: string; role: string; period: string; description: string; achievements: string[] };
type EducationType = { school: string; degree: string; major: string; period: string };
type ProjectType = { title: string; period: string; description: string; technologies: string[] };
type DemoType = { title: string; url: string; description: string; technologies: string[] };
type SocialType = { name: string; url: string; icon: string };
type WorkType = typeof defaultWorks[0];

export const Admin = () => {
  const [activeTab, setActiveTab] = useState<TabType>('profile');
  const [profile, setProfile] = useState(defaultProfile);
  const [works, setWorks] = useState(defaultWorks);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [uploadedFileUrl, setUploadedFileUrl] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [showCreateWorkAfterUpload, setShowCreateWorkAfterUpload] = useState(false);

  const [editingSkill, setEditingSkill] = useState<SkillType | null>(null);
  const [editingExperience, setEditingExperience] = useState<ExperienceType | null>(null);
  const [editingEducation, setEditingEducation] = useState<EducationType | null>(null);
  const [editingProject, setEditingProject] = useState<ProjectType | null>(null);
  const [editingDemo, setEditingDemo] = useState<DemoType | null>(null);
  const [editingSocial, setEditingSocial] = useState<SocialType | null>(null);
  const [editingWork, setEditingWork] = useState<WorkType | null>(null);
  const [showAddWork, setShowAddWork] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [profileData, worksData] = await Promise.all([
        api.profile.get(),
        api.works.get() as Promise<any[]>,
      ]);
      setProfile(profileData);
      setWorks(worksData);
    } catch (error) {
      console.error('加载数据失败:', error);
    }
  };

  const handleProfileUpdate = async () => {
    try {
      await api.profile.update(profile);
      setMessage('个人信息更新成功');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('更新失败');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleSkillAdd = async (data: SkillType) => {
    const updatedSkills = [...profile.skills, data];
    try {
      await api.profile.update({ ...profile, skills: updatedSkills });
      setProfile({ ...profile, skills: updatedSkills });
      setEditingSkill(null);
      setMessage('技能添加成功');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('添加失败');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleSkillUpdate = async (index: number, data: SkillType) => {
    const updatedSkills = [...profile.skills];
    updatedSkills[index] = data;
    try {
      await api.profile.update({ ...profile, skills: updatedSkills });
      setProfile({ ...profile, skills: updatedSkills });
      setEditingSkill(null);
      setMessage('技能更新成功');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('更新失败');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleSkillDelete = async (index: number) => {
    if (!confirm('确定要删除这个技能吗？')) return;
    const updatedSkills = profile.skills.filter((_, i) => i !== index);
    try {
      await api.profile.update({ ...profile, skills: updatedSkills });
      setProfile({ ...profile, skills: updatedSkills });
      setMessage('技能删除成功');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('删除失败');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleExperienceAdd = async (data: ExperienceType) => {
    const updated = [...profile.experience, data];
    try {
      await api.profile.update({ ...profile, experience: updated });
      setProfile({ ...profile, experience: updated });
      setEditingExperience(null);
      setMessage('工作经历添加成功');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('添加失败');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleExperienceUpdate = async (index: number, data: ExperienceType) => {
    const updated = [...profile.experience];
    updated[index] = data;
    try {
      await api.profile.update({ ...profile, experience: updated });
      setProfile({ ...profile, experience: updated });
      setEditingExperience(null);
      setMessage('工作经历更新成功');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('更新失败');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleExperienceDelete = async (index: number) => {
    if (!confirm('确定要删除这条工作经历吗？')) return;
    const updated = profile.experience.filter((_, i) => i !== index);
    try {
      await api.profile.update({ ...profile, experience: updated });
      setProfile({ ...profile, experience: updated });
      setMessage('工作经历删除成功');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('删除失败');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleEducationAdd = async (data: EducationType) => {
    const updated = [...profile.education, data];
    try {
      await api.profile.update({ ...profile, education: updated });
      setProfile({ ...profile, education: updated });
      setEditingEducation(null);
      setMessage('教育背景添加成功');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('添加失败');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleEducationUpdate = async (index: number, data: EducationType) => {
    const updated = [...profile.education];
    updated[index] = data;
    try {
      await api.profile.update({ ...profile, education: updated });
      setProfile({ ...profile, education: updated });
      setEditingEducation(null);
      setMessage('教育背景更新成功');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('更新失败');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleEducationDelete = async (index: number) => {
    if (!confirm('确定要删除这条教育背景吗？')) return;
    const updated = profile.education.filter((_, i) => i !== index);
    try {
      await api.profile.update({ ...profile, education: updated });
      setProfile({ ...profile, education: updated });
      setMessage('教育背景删除成功');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('删除失败');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleProjectAdd = async (data: ProjectType) => {
    const updated = [...profile.projects, data];
    try {
      await api.profile.update({ ...profile, projects: updated });
      setProfile({ ...profile, projects: updated });
      setEditingProject(null);
      setMessage('项目添加成功');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('添加失败');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleProjectUpdate = async (index: number, data: ProjectType) => {
    const updated = [...profile.projects];
    updated[index] = data;
    try {
      await api.profile.update({ ...profile, projects: updated });
      setProfile({ ...profile, projects: updated });
      setEditingProject(null);
      setMessage('项目更新成功');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('更新失败');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleProjectDelete = async (index: number) => {
    if (!confirm('确定要删除这个项目吗？')) return;
    const updated = profile.projects.filter((_, i) => i !== index);
    try {
      await api.profile.update({ ...profile, projects: updated });
      setProfile({ ...profile, projects: updated });
      setMessage('项目删除成功');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('删除失败');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleDemoAdd = async (data: DemoType) => {
    const updated = [...profile.demos, data];
    try {
      await api.profile.update({ ...profile, demos: updated });
      setProfile({ ...profile, demos: updated });
      setEditingDemo(null);
      setMessage('Demo添加成功');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('添加失败');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleDemoUpdate = async (index: number, data: DemoType) => {
    const updated = [...profile.demos];
    updated[index] = data;
    try {
      await api.profile.update({ ...profile, demos: updated });
      setProfile({ ...profile, demos: updated });
      setEditingDemo(null);
      setMessage('Demo更新成功');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('更新失败');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleDemoDelete = async (index: number) => {
    if (!confirm('确定要删除这个Demo吗？')) return;
    const updated = profile.demos.filter((_, i) => i !== index);
    try {
      await api.profile.update({ ...profile, demos: updated });
      setProfile({ ...profile, demos: updated });
      setMessage('Demo删除成功');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('删除失败');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleSocialAdd = async (data: SocialType) => {
    const updated = [...profile.contact.social, data];
    try {
      await api.profile.update({ ...profile, contact: { ...profile.contact, social: updated } });
      setProfile({ ...profile, contact: { ...profile.contact, social: updated } });
      setEditingSocial(null);
      setMessage('社交链接添加成功');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('添加失败');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleSocialUpdate = async (index: number, data: SocialType) => {
    const updated = [...profile.contact.social];
    updated[index] = data;
    try {
      await api.profile.update({ ...profile, contact: { ...profile.contact, social: updated } });
      setProfile({ ...profile, contact: { ...profile.contact, social: updated } });
      setEditingSocial(null);
      setMessage('社交链接更新成功');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('更新失败');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleSocialDelete = async (index: number) => {
    if (!confirm('确定要删除这个社交链接吗？')) return;
    const updated = profile.contact.social.filter((_, i) => i !== index);
    try {
      await api.profile.update({ ...profile, contact: { ...profile.contact, social: updated } });
      setProfile({ ...profile, contact: { ...profile.contact, social: updated } });
      setMessage('社交链接删除成功');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('删除失败');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleWorkAdd = async (data: any) => {
    try {
      await api.works.create(data);
      setShowAddWork(false);
      loadData();
      setMessage('作品添加成功');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('添加失败');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleWorkUpdate = async (id: string, data: any) => {
    try {
      await api.works.update(id, data);
      setEditingWork(null);
      loadData();
      setMessage('作品更新成功');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('更新失败');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleWorkDelete = async (id: string) => {
    if (!confirm('确定要删除这个作品吗？')) return;
    try {
      await api.works.delete(id);
      loadData();
      setMessage('作品删除成功');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('删除失败');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const confirmDeleteWork = async (work: WorkType) => {
    if (!confirm(`确定要删除作品「${work.title}」吗？同时会删除关联的视频和封面文件。`)) return;
    try {
      if (work.videoUrl && work.videoUrl.includes('/uploads/')) {
        const filename = work.videoUrl.split('/uploads/')[1];
        await api.upload.delete(filename);
      }
      if (work.coverUrl && work.coverUrl.includes('/uploads/')) {
        const filename = work.coverUrl.split('/uploads/')[1];
        await api.upload.delete(filename);
      }
      await api.works.delete(work.id);
      loadData();
      setMessage('作品删除成功');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('删除失败');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleFileUpload = async (file: File) => {
    setUploading(true);
    setUploadProgress(0);

    try {
      const result = await api.upload.single(file);
      if (result.success && result.url) {
        setUploadedFileUrl(result.url);
        setUploadedFileName(result.originalName || result.filename || '');
        setShowCreateWorkAfterUpload(true);
        setMessage(`上传成功: ${result.url}`);
      } else {
        setMessage(result.message || '上传失败');
      }
    } catch (error) {
      setMessage('上传失败');
    }

    setUploading(false);
    setUploadProgress(100);
  };

  const tabs = [
    { id: 'profile' as TabType, label: '个人信息', icon: User },
    { id: 'skills' as TabType, label: '技能管理', icon: Code },
    { id: 'experience' as TabType, label: '工作经历', icon: Briefcase },
    { id: 'education' as TabType, label: '教育背景', icon: GraduationCap },
    { id: 'projects' as TabType, label: '项目经历', icon: Layers },
    { id: 'demos' as TabType, label: 'Demo管理', icon: Code },
    { id: 'contact' as TabType, label: '联系信息', icon: Mail },
    { id: 'works' as TabType, label: '作品管理', icon: Video },
    { id: 'upload' as TabType, label: '文件上传', icon: Upload },
  ];

  const categories = ['创意短片', '营销视频', '虚拟人视频', '动画短片'];
  const aiModels = ['Runway', '可灵', '即梦', 'Omni'];
  const skillCategories = ['前端基础', '前端框架', '状态管理', 'UI组件库', '数据可视化', '工作流', '构建工具', 'CSS预处理器', '版本控制', '工程化', '后端技术', '实时通信', '跨端开发', 'AI工具'];
  const socialIcons = ['github', 'juejin', 'bilibili', 'wechat', 'twitter', 'linkedin'];

  const renderEditModal = (_type: string, title: string, children: React.ReactNode, onClose: () => void) => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h3 className="text-xl font-semibold text-apple-black">{title}</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 space-y-4">{children}</div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-apple-light">
      <div className="flex">
        <aside className="w-64 bg-apple-black text-white fixed h-full overflow-y-auto">
          <div className="p-6 border-b border-white/10">
            <h1 className="text-xl font-semibold">管理后台</h1>
          </div>
          <nav className="p-4">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${activeTab === tab.id ? 'bg-apple-blue text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
          <div className="absolute bottom-0 w-full p-4 border-t border-white/10">
            <button
              onClick={() => {
                sessionStorage.removeItem('admin_auth');
                window.location.href = '/admin/login';
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              退出登录
            </button>
          </div>
        </aside>

        <main className="ml-64 p-8">
          {message && (
            <div className={`mb-6 p-4 rounded-lg ${message.includes('成功') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {message}
            </div>
          )}

          {activeTab === 'profile' && (
            <div>
              <h2 className="text-2xl font-semibold text-apple-black mb-6">个人信息</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-apple-gray mb-2">姓名</label>
                      <input
                        type="text"
                        value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-apple-gray mb-2">职位</label>
                      <input
                        type="text"
                        value={profile.title}
                        onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-apple-gray mb-2">邮箱</label>
                      <input
                        type="email"
                        value={profile.contact.email}
                        onChange={(e) => setProfile({ ...profile, contact: { ...profile.contact, email: e.target.value } })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-apple-gray mb-2">电话</label>
                      <input
                        type="tel"
                        value={profile.contact.phone}
                        onChange={(e) => setProfile({ ...profile, contact: { ...profile.contact, phone: e.target.value } })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-apple-gray mb-2">所在地</label>
                      <input
                        type="text"
                        value={profile.contact.location}
                        onChange={(e) => setProfile({ ...profile, contact: { ...profile.contact, location: e.target.value } })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-apple-gray mb-2">slogan</label>
                      <input
                        type="text"
                        value={profile.slogan}
                        onChange={(e) => setProfile({ ...profile, slogan: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-apple-gray mb-2">个人简介</label>
                      <textarea
                        value={profile.bio}
                        onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-apple-gray mb-2">职业背景</label>
                      <textarea
                        value={profile.background}
                        onChange={(e) => setProfile({ ...profile, background: e.target.value })}
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={handleProfileUpdate}
                className="mt-6 flex items-center gap-2 px-4 py-2 bg-apple-blue text-white rounded-lg hover:bg-apple-blue-hover transition-colors"
              >
                <Save className="w-4 h-4" />
                保存修改
              </button>
            </div>
          )}

          {activeTab === 'skills' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-apple-black">技能管理</h2>
                <button onClick={() => setEditingSkill({ name: '', category: '' })} className="flex items-center gap-2 px-4 py-2 bg-apple-blue text-white rounded-lg hover:bg-apple-blue-hover transition-colors">
                  <Plus className="w-4 h-4" />
                  添加技能
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {profile.skills.map((skill, index) => (
                  <div key={index} className="bg-white rounded-xl p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-apple-black">{skill.name}</h3>
                        <span className="px-2 py-1 bg-apple-light text-apple-gray text-xs rounded-full">{skill.category}</span>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => setEditingSkill({ ...skill, __index: index } as any)} className="p-2 text-apple-gray hover:text-apple-blue hover:bg-apple-light rounded-lg transition-colors">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleSkillDelete(index)} className="p-2 text-apple-gray hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'experience' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-apple-black">工作经历</h2>
                <button onClick={() => setEditingExperience({ company: '', role: '', period: '', description: '', achievements: [] })} className="flex items-center gap-2 px-4 py-2 bg-apple-blue text-white rounded-lg hover:bg-apple-blue-hover transition-colors">
                  <Plus className="w-4 h-4" />
                  添加经历
                </button>
              </div>
              <div className="space-y-4">
                {profile.experience.map((exp, index) => (
                  <div key={index} className="bg-white rounded-xl p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-apple-black">{exp.company}</h3>
                        <p className="text-apple-gray">{exp.role} | {exp.period}</p>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => setEditingExperience({ ...exp, __index: index } as any)} className="p-2 text-apple-gray hover:text-apple-blue hover:bg-apple-light rounded-lg transition-colors">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleExperienceDelete(index)} className="p-2 text-apple-gray hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <p className="text-apple-gray mb-4">{exp.description}</p>
                    <div className="space-y-2">
                      {exp.achievements.map((achievement, i) => (
                        <p key={i} className="text-sm text-apple-gray flex items-start gap-2">
                          <span className="text-apple-blue mt-1">•</span>
                          {achievement}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'education' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-apple-black">教育背景</h2>
                <button onClick={() => setEditingEducation({ school: '', degree: '', major: '', period: '' })} className="flex items-center gap-2 px-4 py-2 bg-apple-blue text-white rounded-lg hover:bg-apple-blue-hover transition-colors">
                  <Plus className="w-4 h-4" />
                  添加教育背景
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {profile.education.map((edu, index) => (
                  <div key={index} className="bg-white rounded-xl p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-apple-black">{edu.school}</h3>
                        <p className="text-apple-gray">{edu.degree} | {edu.major}</p>
                        <p className="text-sm text-apple-gray">{edu.period}</p>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => setEditingEducation({ ...edu, __index: index } as any)} className="p-2 text-apple-gray hover:text-apple-blue hover:bg-apple-light rounded-lg transition-colors">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleEducationDelete(index)} className="p-2 text-apple-gray hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'projects' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-apple-black">项目经历</h2>
                <button onClick={() => setEditingProject({ title: '', period: '', description: '', technologies: [] })} className="flex items-center gap-2 px-4 py-2 bg-apple-blue text-white rounded-lg hover:bg-apple-blue-hover transition-colors">
                  <Plus className="w-4 h-4" />
                  添加项目
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {profile.projects.map((project, index) => (
                  <div key={index} className="bg-white rounded-xl p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-apple-black">{project.title}</h3>
                        <p className="text-sm text-apple-gray">{project.period}</p>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => setEditingProject({ ...project, __index: index } as any)} className="p-2 text-apple-gray hover:text-apple-blue hover:bg-apple-light rounded-lg transition-colors">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleProjectDelete(index)} className="p-2 text-apple-gray hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <p className="text-apple-gray mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, i) => (
                        <span key={i} className="px-2 py-1 bg-apple-light text-apple-gray text-xs rounded-full">{tech}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'demos' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-apple-black">Demo管理</h2>
                <button onClick={() => setEditingDemo({ title: '', url: '', description: '', technologies: [] })} className="flex items-center gap-2 px-4 py-2 bg-apple-blue text-white rounded-lg hover:bg-apple-blue-hover transition-colors">
                  <Plus className="w-4 h-4" />
                  添加Demo
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {profile.demos.map((demo, index) => (
                  <div key={index} className="bg-white rounded-xl p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-apple-black">{demo.title}</h3>
                        <a href={demo.url} target="_blank" rel="noopener noreferrer" className="text-sm text-apple-blue hover:underline">{demo.url}</a>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => setEditingDemo({ ...demo, __index: index } as any)} className="p-2 text-apple-gray hover:text-apple-blue hover:bg-apple-light rounded-lg transition-colors">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDemoDelete(index)} className="p-2 text-apple-gray hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <p className="text-apple-gray mb-4">{demo.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {demo.technologies.map((tech, i) => (
                        <span key={i} className="px-2 py-1 bg-apple-light text-apple-gray text-xs rounded-full">{tech}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'contact' && (
            <div>
              <h2 className="text-2xl font-semibold text-apple-black mb-6">联系信息</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-apple-gray mb-2">邮箱</label>
                      <input
                        type="email"
                        value={profile.contact.email}
                        onChange={(e) => setProfile({ ...profile, contact: { ...profile.contact, email: e.target.value } })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-apple-gray mb-2">电话</label>
                      <input
                        type="tel"
                        value={profile.contact.phone}
                        onChange={(e) => setProfile({ ...profile, contact: { ...profile.contact, phone: e.target.value } })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-apple-gray mb-2">所在地</label>
                      <input
                        type="text"
                        value={profile.contact.location}
                        onChange={(e) => setProfile({ ...profile, contact: { ...profile.contact, location: e.target.value } })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                  </div>
                  <button onClick={handleProfileUpdate} className="mt-6 flex items-center gap-2 px-4 py-2 bg-apple-blue text-white rounded-lg hover:bg-apple-blue-hover transition-colors">
                    <Save className="w-4 h-4" />
                    保存修改
                  </button>
                </div>
                <div className="bg-white rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-apple-black">社交链接</h3>
                    <button onClick={() => setEditingSocial({ name: '', url: '', icon: 'github' })} className="flex items-center gap-2 px-3 py-1.5 bg-apple-blue text-white text-sm rounded-lg hover:bg-apple-blue-hover transition-colors">
                      <Plus className="w-3 h-3" />
                      添加链接
                    </button>
                  </div>
                  <div className="space-y-3">
                    {profile.contact.social.map((social, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-apple-light rounded-lg">
                        <div className="flex items-center gap-3">
                          <span className="w-8 h-8 bg-apple-blue/10 rounded-full flex items-center justify-center text-apple-blue text-sm font-medium">
                            {social.name[0]}
                          </span>
                          <div>
                            <p className="font-medium text-apple-black">{social.name}</p>
                            <p className="text-sm text-apple-gray">{social.url}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => setEditingSocial({ ...social, __index: index } as any)} className="p-2 text-apple-gray hover:text-apple-blue hover:bg-white rounded-lg transition-colors">
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleSocialDelete(index)} className="p-2 text-apple-gray hover:text-red-500 hover:bg-white rounded-lg transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'works' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-apple-black">作品管理</h2>
                <button onClick={() => setShowAddWork(true)} className="flex items-center gap-2 px-4 py-2 bg-apple-blue text-white rounded-lg hover:bg-apple-blue-hover transition-colors">
                  <Plus className="w-4 h-4" />
                  添加作品
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {works.map((work: WorkType) => (
                  <div key={work.id} className="bg-white rounded-xl overflow-hidden">
                    <div className="aspect-video">
                      <img src={work.coverUrl} alt={work.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-apple-black mb-2">{work.title}</h3>
                      <p className="text-sm text-apple-gray mb-3 line-clamp-2">{work.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                          <span className="px-2 py-1 bg-apple-light text-apple-gray text-xs rounded-full">{work.category}</span>
                          <span className="px-2 py-1 bg-apple-light text-apple-gray text-xs rounded-full">{work.aiModel}</span>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => setEditingWork(work)} className="p-2 text-apple-gray hover:text-apple-blue hover:bg-apple-light rounded-lg transition-colors">
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleWorkDelete(work.id)} className="p-2 text-apple-gray hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'upload' && (
            <div>
              <h2 className="text-2xl font-semibold text-apple-black mb-6">文件上传</h2>
              <div className="bg-white rounded-xl p-8">
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-apple-blue transition-colors">
                  <input type="file" accept="video/*,image/*" onChange={(e) => { if (e.target.files?.[0]) handleFileUpload(e.target.files[0]); }} className="hidden" id="file-upload" />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-lg font-medium text-apple-black mb-2">点击或拖拽文件到此处</p>
                    <p className="text-sm text-apple-gray">支持视频(mp4/webm/ogg)和图片(jpg/png/webp)，最大1000MB</p>
                  </label>
                  {uploading && (
                    <div className="mt-6">
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div className="bg-apple-blue h-2 rounded-full transition-all" style={{ width: `${uploadProgress}%` }} />
                      </div>
                      <p className="text-sm text-apple-gray">上传中...</p>
                    </div>
                  )}
                </div>
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-apple-black mb-4">已上传文件</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {works.map((work: WorkType) => (
                      <div key={work.id} className="bg-apple-light rounded-xl p-4">
                        <div className="aspect-video mb-3 rounded-lg overflow-hidden bg-black">
                          {work.videoUrl && work.videoUrl.includes('/uploads/') ? (
                            <video src={work.videoUrl} controls className="w-full h-full" />
                          ) : work.coverUrl ? (
                            <img src={work.coverUrl} alt={work.title} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-500">
                              <Video className="w-8 h-8" />
                            </div>
                          )}
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-apple-black text-sm truncate">{work.title}</h4>
                            <div className="flex gap-2 mt-1">
                              {work.videoUrl && work.videoUrl.includes('/uploads/') && <span className="text-xs px-2 py-0.5 bg-red-100 text-red-600 rounded">视频</span>}
                              {work.coverUrl && work.coverUrl.includes('/uploads/') && <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-600 rounded">图片</span>}
                            </div>
                          </div>
                          <div className="flex gap-1">
                            <button onClick={() => setEditingWork(work)} className="p-2 text-apple-gray hover:text-apple-blue hover:bg-white rounded-lg transition-colors">
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button onClick={() => confirmDeleteWork(work)} className="p-2 text-apple-gray hover:text-red-500 hover:bg-white rounded-lg transition-colors">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {editingSkill && renderEditModal('skill', editingSkill.name ? '编辑技能' : '添加技能', (
            <>
              <div>
                <label className="block text-sm font-medium text-apple-gray mb-2">技能名称</label>
                <input type="text" defaultValue={editingSkill.name} id="skill-name" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-apple-gray mb-2">分类</label>
                <select id="skill-category" defaultValue={editingSkill.category} className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                  {skillCategories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div className="flex gap-3 pt-4">
                <button onClick={() => setEditingSkill(null)} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">取消</button>
                <button onClick={() => {
                  const name = (document.getElementById('skill-name') as HTMLInputElement).value;
                  const category = (document.getElementById('skill-category') as HTMLSelectElement).value;
                  if ((editingSkill as any).__index !== undefined) {
                    handleSkillUpdate((editingSkill as any).__index, { name, category });
                  } else {
                    handleSkillAdd({ name, category });
                  }
                }} className="flex-1 px-4 py-2 bg-apple-blue text-white rounded-lg hover:bg-apple-blue-hover transition-colors">保存</button>
              </div>
            </>
          ), () => setEditingSkill(null))}

          {editingExperience && renderEditModal('experience', editingExperience.company ? '编辑工作经历' : '添加工作经历', (
            <>
              <div>
                <label className="block text-sm font-medium text-apple-gray mb-2">公司名称</label>
                <input type="text" defaultValue={editingExperience.company} id="exp-company" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-apple-gray mb-2">职位</label>
                  <input type="text" defaultValue={editingExperience.role} id="exp-role" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-apple-gray mb-2">时间段</label>
                  <input type="text" defaultValue={editingExperience.period} id="exp-period" placeholder="如：2021.8 - 2026.2" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-apple-gray mb-2">工作描述</label>
                <textarea defaultValue={editingExperience.description} id="exp-desc" rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-apple-gray mb-2">主要成就（每行一条）</label>
                <textarea defaultValue={editingExperience.achievements.join('\n')} id="exp-achievements" rows={4} placeholder="每行输入一条成就" className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none" />
              </div>
              <div className="flex gap-3 pt-4">
                <button onClick={() => setEditingExperience(null)} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">取消</button>
                <button onClick={() => {
                  const company = (document.getElementById('exp-company') as HTMLInputElement).value;
                  const role = (document.getElementById('exp-role') as HTMLInputElement).value;
                  const period = (document.getElementById('exp-period') as HTMLInputElement).value;
                  const description = (document.getElementById('exp-desc') as HTMLTextAreaElement).value;
                  const achievements = (document.getElementById('exp-achievements') as HTMLTextAreaElement).value.split('\n').filter(Boolean);
                  if ((editingExperience as any).__index !== undefined) {
                    handleExperienceUpdate((editingExperience as any).__index, { company, role, period, description, achievements });
                  } else {
                    handleExperienceAdd({ company, role, period, description, achievements });
                  }
                }} className="flex-1 px-4 py-2 bg-apple-blue text-white rounded-lg hover:bg-apple-blue-hover transition-colors">保存</button>
              </div>
            </>
          ), () => setEditingExperience(null))}

          {editingEducation && renderEditModal('education', editingEducation.school ? '编辑教育背景' : '添加教育背景', (
            <>
              <div>
                <label className="block text-sm font-medium text-apple-gray mb-2">学校名称</label>
                <input type="text" defaultValue={editingEducation.school} id="edu-school" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-apple-gray mb-2">学历</label>
                  <input type="text" defaultValue={editingEducation.degree} id="edu-degree" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-apple-gray mb-2">专业</label>
                  <input type="text" defaultValue={editingEducation.major} id="edu-major" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-apple-gray mb-2">时间段</label>
                <input type="text" defaultValue={editingEducation.period} id="edu-period" placeholder="如：2024.1 - 至今" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
              </div>
              <div className="flex gap-3 pt-4">
                <button onClick={() => setEditingEducation(null)} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">取消</button>
                <button onClick={() => {
                  const school = (document.getElementById('edu-school') as HTMLInputElement).value;
                  const degree = (document.getElementById('edu-degree') as HTMLInputElement).value;
                  const major = (document.getElementById('edu-major') as HTMLInputElement).value;
                  const period = (document.getElementById('edu-period') as HTMLInputElement).value;
                  if ((editingEducation as any).__index !== undefined) {
                    handleEducationUpdate((editingEducation as any).__index, { school, degree, major, period });
                  } else {
                    handleEducationAdd({ school, degree, major, period });
                  }
                }} className="flex-1 px-4 py-2 bg-apple-blue text-white rounded-lg hover:bg-apple-blue-hover transition-colors">保存</button>
              </div>
            </>
          ), () => setEditingEducation(null))}

          {editingProject && renderEditModal('project', editingProject.title ? '编辑项目' : '添加项目', (
            <>
              <div>
                <label className="block text-sm font-medium text-apple-gray mb-2">项目名称</label>
                <input type="text" defaultValue={editingProject.title} id="proj-title" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-apple-gray mb-2">时间段</label>
                <input type="text" defaultValue={editingProject.period} id="proj-period" placeholder="如：2023.8 - 2025.11" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-apple-gray mb-2">项目描述</label>
                <textarea defaultValue={editingProject.description} id="proj-desc" rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-apple-gray mb-2">技术栈（逗号分隔）</label>
                <input type="text" defaultValue={editingProject.technologies.join(', ')} id="proj-tech" placeholder="Vue 3, React, TypeScript" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
              </div>
              <div className="flex gap-3 pt-4">
                <button onClick={() => setEditingProject(null)} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">取消</button>
                <button onClick={() => {
                  const title = (document.getElementById('proj-title') as HTMLInputElement).value;
                  const period = (document.getElementById('proj-period') as HTMLInputElement).value;
                  const description = (document.getElementById('proj-desc') as HTMLTextAreaElement).value;
                  const technologies = (document.getElementById('proj-tech') as HTMLInputElement).value.split(',').map(t => t.trim()).filter(Boolean);
                  if ((editingProject as any).__index !== undefined) {
                    handleProjectUpdate((editingProject as any).__index, { title, period, description, technologies });
                  } else {
                    handleProjectAdd({ title, period, description, technologies });
                  }
                }} className="flex-1 px-4 py-2 bg-apple-blue text-white rounded-lg hover:bg-apple-blue-hover transition-colors">保存</button>
              </div>
            </>
          ), () => setEditingProject(null))}

          {editingDemo && renderEditModal('demo', editingDemo.title ? '编辑Demo' : '添加Demo', (
            <>
              <div>
                <label className="block text-sm font-medium text-apple-gray mb-2">Demo名称</label>
                <input type="text" defaultValue={editingDemo.title} id="demo-title" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-apple-gray mb-2">访问链接</label>
                <input type="url" defaultValue={editingDemo.url} id="demo-url" placeholder="https://example.com" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-apple-gray mb-2">描述</label>
                <textarea defaultValue={editingDemo.description} id="demo-desc" rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-apple-gray mb-2">技术栈（逗号分隔）</label>
                <input type="text" defaultValue={editingDemo.technologies.join(', ')} id="demo-tech" placeholder="React, TypeScript, Vite" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
              </div>
              <div className="flex gap-3 pt-4">
                <button onClick={() => setEditingDemo(null)} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">取消</button>
                <button onClick={() => {
                  const title = (document.getElementById('demo-title') as HTMLInputElement).value;
                  const url = (document.getElementById('demo-url') as HTMLInputElement).value;
                  const description = (document.getElementById('demo-desc') as HTMLTextAreaElement).value;
                  const technologies = (document.getElementById('demo-tech') as HTMLInputElement).value.split(',').map(t => t.trim()).filter(Boolean);
                  if ((editingDemo as any).__index !== undefined) {
                    handleDemoUpdate((editingDemo as any).__index, { title, url, description, technologies });
                  } else {
                    handleDemoAdd({ title, url, description, technologies });
                  }
                }} className="flex-1 px-4 py-2 bg-apple-blue text-white rounded-lg hover:bg-apple-blue-hover transition-colors">保存</button>
              </div>
            </>
          ), () => setEditingDemo(null))}

          {editingSocial && renderEditModal('social', editingSocial.name ? '编辑社交链接' : '添加社交链接', (
            <>
              <div>
                <label className="block text-sm font-medium text-apple-gray mb-2">平台名称</label>
                <input type="text" defaultValue={editingSocial.name} id="social-name" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-apple-gray mb-2">链接地址</label>
                <input type="url" defaultValue={editingSocial.url} id="social-url" placeholder="https://example.com" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-apple-gray mb-2">图标名称</label>
                <select id="social-icon" defaultValue={editingSocial.icon} className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                  {socialIcons.map((icon) => (
                    <option key={icon} value={icon}>{icon}</option>
                  ))}
                </select>
              </div>
              <div className="flex gap-3 pt-4">
                <button onClick={() => setEditingSocial(null)} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">取消</button>
                <button onClick={() => {
                  const name = (document.getElementById('social-name') as HTMLInputElement).value;
                  const url = (document.getElementById('social-url') as HTMLInputElement).value;
                  const icon = (document.getElementById('social-icon') as HTMLSelectElement).value;
                  if ((editingSocial as any).__index !== undefined) {
                    handleSocialUpdate((editingSocial as any).__index, { name, url, icon });
                  } else {
                    handleSocialAdd({ name, url, icon });
                  }
                }} className="flex-1 px-4 py-2 bg-apple-blue text-white rounded-lg hover:bg-apple-blue-hover transition-colors">保存</button>
              </div>
            </>
          ), () => setEditingSocial(null))}

          {showAddWork && renderEditModal('work', '添加作品', (
            <>
              <div>
                <label className="block text-sm font-medium text-apple-gray mb-2">标题</label>
                <input type="text" id="add-work-title" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-apple-gray mb-2">描述</label>
                <textarea id="add-work-desc" rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-apple-gray mb-2">分类</label>
                  <select id="add-work-category" className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                    {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-apple-gray mb-2">AI模型</label>
                  <select id="add-work-model" className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                    {aiModels.map((model) => <option key={model} value={model}>{model}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-apple-gray mb-2">封面URL</label>
                <input type="text" id="add-work-cover" placeholder="/uploads/xxx.jpg 或外部链接" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-apple-gray mb-2">视频URL</label>
                <input type="text" id="add-work-video" placeholder="/uploads/xxx.mp4 或外部链接" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-apple-gray mb-2">标签（逗号分隔）</label>
                <input type="text" id="add-work-tags" placeholder="标签1,标签2,标签3" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-apple-gray mb-2">创作思路</label>
                <textarea id="add-work-concept" rows={2} placeholder="描述创作思路" className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-apple-gray mb-2">使用工具（逗号分隔）</label>
                <input type="text" id="add-work-tools" placeholder="工具1,工具2,工具3" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-apple-gray mb-2">创作场景</label>
                <input type="text" id="add-work-scene" placeholder="描述创作场景" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
              </div>
              <div className="flex gap-3 pt-4">
                <button onClick={() => setShowAddWork(false)} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">取消</button>
                <button onClick={() => {
                  const title = (document.getElementById('add-work-title') as HTMLInputElement).value;
                  const desc = (document.getElementById('add-work-desc') as HTMLTextAreaElement).value;
                  const category = (document.getElementById('add-work-category') as HTMLSelectElement).value;
                  const model = (document.getElementById('add-work-model') as HTMLSelectElement).value;
                  const cover = (document.getElementById('add-work-cover') as HTMLInputElement).value;
                  const video = (document.getElementById('add-work-video') as HTMLInputElement).value;
                  const tags = (document.getElementById('add-work-tags') as HTMLInputElement).value.split(',').map(t => t.trim()).filter(Boolean);
                  const concept = (document.getElementById('add-work-concept') as HTMLTextAreaElement).value;
                  const tools = (document.getElementById('add-work-tools') as HTMLInputElement).value.split(',').map(t => t.trim()).filter(Boolean);
                  const scene = (document.getElementById('add-work-scene') as HTMLInputElement).value;
                  handleWorkAdd({ title, description: desc, category, aiModel: model, coverUrl: cover, videoUrl: video, tags, details: { concept, tools, scene } });
                }} className="flex-1 px-4 py-2 bg-apple-blue text-white rounded-lg hover:bg-apple-blue-hover transition-colors">添加</button>
              </div>
            </>
          ), () => setShowAddWork(false))}

          {editingWork && renderEditModal('work', '编辑作品', (
            <>
              <div>
                <label className="block text-sm font-medium text-apple-gray mb-2">标题</label>
                <input type="text" defaultValue={editingWork.title} id="edit-work-title" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-apple-gray mb-2">描述</label>
                <textarea defaultValue={editingWork.description} id="edit-work-desc" rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-apple-gray mb-2">分类</label>
                  <select defaultValue={editingWork.category} id="edit-work-category" className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                    {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-apple-gray mb-2">AI模型</label>
                  <select defaultValue={editingWork.aiModel} id="edit-work-model" className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                    {aiModels.map((model) => <option key={model} value={model}>{model}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-apple-gray mb-2">封面URL</label>
                <input type="text" defaultValue={editingWork.coverUrl} id="edit-work-cover" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-apple-gray mb-2">视频URL</label>
                <input type="text" defaultValue={editingWork.videoUrl} id="edit-work-video" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-apple-gray mb-2">标签（逗号分隔）</label>
                <input type="text" defaultValue={editingWork.tags?.join(', ') || ''} id="edit-work-tags" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-apple-gray mb-2">创作思路</label>
                <textarea defaultValue={editingWork.details?.concept || ''} id="edit-work-concept" rows={2} className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-apple-gray mb-2">使用工具（逗号分隔）</label>
                <input type="text" defaultValue={editingWork.details?.tools?.join(', ') || ''} id="edit-work-tools" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-apple-gray mb-2">创作场景</label>
                <input type="text" defaultValue={editingWork.details?.scene || ''} id="edit-work-scene" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
              </div>
              <div className="flex gap-3 pt-4">
                <button onClick={() => setEditingWork(null)} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">取消</button>
                <button onClick={() => {
                  const title = (document.getElementById('edit-work-title') as HTMLInputElement).value;
                  const desc = (document.getElementById('edit-work-desc') as HTMLTextAreaElement).value;
                  const category = (document.getElementById('edit-work-category') as HTMLSelectElement).value;
                  const model = (document.getElementById('edit-work-model') as HTMLSelectElement).value;
                  const cover = (document.getElementById('edit-work-cover') as HTMLInputElement).value;
                  const video = (document.getElementById('edit-work-video') as HTMLInputElement).value;
                  const tags = (document.getElementById('edit-work-tags') as HTMLInputElement).value.split(',').map(t => t.trim()).filter(Boolean);
                  const concept = (document.getElementById('edit-work-concept') as HTMLTextAreaElement).value;
                  const tools = (document.getElementById('edit-work-tools') as HTMLInputElement).value.split(',').map(t => t.trim()).filter(Boolean);
                  const scene = (document.getElementById('edit-work-scene') as HTMLInputElement).value;
                  handleWorkUpdate(editingWork.id, { title, description: desc, category, aiModel: model, coverUrl: cover, videoUrl: video, tags, details: { concept, tools, scene } });
                }} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-apple-blue-hover transition-colors">保存</button>
              </div>
            </>
          ), () => setEditingWork(null))}

          {showCreateWorkAfterUpload && renderEditModal('work', '创建作品', (
            <>
              <div className="bg-apple-light p-4 rounded-lg mb-4">
                <p className="text-sm text-apple-gray">已上传文件：</p>
                <p className="text-sm font-medium text-apple-black">{uploadedFileName}</p>
                <p className="text-xs text-apple-blue mt-1">{uploadedFileUrl}</p>
                {uploadedFileUrl.endsWith('.mp4') || uploadedFileUrl.endsWith('.webm') || uploadedFileUrl.endsWith('.ogg') ? (
                  <video src={uploadedFileUrl} controls className="w-full mt-3 rounded-lg" />
                ) : (
                  <img src={uploadedFileUrl} alt="预览" className="w-full mt-3 rounded-lg" />
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-apple-gray mb-2">标题</label>
                <input type="text" id="new-work-title" placeholder="输入作品标题" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-apple-gray mb-2">描述</label>
                <textarea id="new-work-desc" rows={3} placeholder="输入作品介绍" className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-apple-gray mb-2">分类</label>
                  <select id="new-work-category" className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                    {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-apple-gray mb-2">AI模型</label>
                  <select id="new-work-model" className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                    {aiModels.map((model) => <option key={model} value={model}>{model}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-apple-gray mb-2">封面URL</label>
                <input type="text" id="new-work-cover" placeholder="/uploads/xxx.jpg 或外部链接" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-apple-gray mb-2">视频URL</label>
                <input type="text" id="new-work-video" defaultValue={uploadedFileUrl} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-apple-gray mb-2">标签（逗号分隔）</label>
                <input type="text" id="new-work-tags" placeholder="标签1,标签2,标签3" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-apple-gray mb-2">创作思路</label>
                <textarea id="new-work-concept" rows={2} placeholder="描述创作思路" className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-apple-gray mb-2">使用工具（逗号分隔）</label>
                <input type="text" id="new-work-tools" placeholder="工具1,工具2,工具3" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-apple-gray mb-2">创作场景</label>
                <input type="text" id="new-work-scene" placeholder="描述创作场景" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
              </div>
              <div className="flex gap-3 pt-4">
                <button onClick={() => setShowCreateWorkAfterUpload(false)} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">暂不创建</button>
                <button onClick={() => {
                  const title = (document.getElementById('new-work-title') as HTMLInputElement).value;
                  const desc = (document.getElementById('new-work-desc') as HTMLTextAreaElement).value;
                  const category = (document.getElementById('new-work-category') as HTMLSelectElement).value;
                  const model = (document.getElementById('new-work-model') as HTMLSelectElement).value;
                  const cover = (document.getElementById('new-work-cover') as HTMLInputElement).value;
                  const video = (document.getElementById('new-work-video') as HTMLInputElement).value;
                  const tags = (document.getElementById('new-work-tags') as HTMLInputElement).value.split(',').map(t => t.trim()).filter(Boolean);
                  const concept = (document.getElementById('new-work-concept') as HTMLTextAreaElement).value;
                  const tools = (document.getElementById('new-work-tools') as HTMLInputElement).value.split(',').map(t => t.trim()).filter(Boolean);
                  const scene = (document.getElementById('new-work-scene') as HTMLInputElement).value;
                  handleWorkAdd({ title, description: desc, category, aiModel: model, coverUrl: cover, videoUrl: video, tags, details: { concept, tools, scene } });
                  setShowCreateWorkAfterUpload(false);
                  setUploadedFileUrl('');
                  setUploadedFileName('');
                }} className="flex-1 px-4 py-2 bg-apple-blue text-white rounded-lg hover:bg-apple-blue-hover transition-colors">创建作品</button>
              </div>
            </>
          ), () => {
            setShowCreateWorkAfterUpload(false);
            setUploadedFileUrl('');
            setUploadedFileName('');
          })}
        </main>
      </div>
    </div>
  );
};
