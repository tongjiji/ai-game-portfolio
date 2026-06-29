import { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || 'https://qidxycrdtxrdaxulyqey.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_KEY || 'sb_publishable_3mU9pl05MkYfRUsOgig2UA_SxrHVSEh';

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

const defaultProfile = {
  name: '童基芽',
  title: '高级前端开发工程师',
  slogan: '8年前端经验，持续探索AI辅助开发新边界',
  bio: '拥有8年前端开发经验，精通React/Vue等主流框架，主导过多个大型金融系统、企业中台、低代码平台的架构设计与开发。善于运用AI辅助工具提升开发效率，积极拥抱AI时代，持续探索Vibe Coding与AI应用开发。',
  background: '2018年进入互联网行业，从基础前端开发做起，逐步成长为高级前端工程师。2020年开始接触AI技术，2023年深入研究AI辅助编程，熟练掌握Cursor、Trae、GitHub Copilot等AI开发助手，将AI能力融入日常开发工作。',
};

const defaultSkills = [
  { name: 'HTML5/CSS3', category: '前端基础' },
  { name: 'JavaScript/TypeScript', category: '前端基础' },
  { name: 'React', category: '前端框架' },
  { name: 'Vue 3', category: '前端框架' },
  { name: 'Redux Toolkit', category: '状态管理' },
  { name: 'Pinia', category: '状态管理' },
  { name: 'Ant Design', category: 'UI组件库' },
  { name: 'Element Plus', category: 'UI组件库' },
  { name: 'ECharts', category: '数据可视化' },
  { name: 'BPMN.js', category: '工作流' },
  { name: 'Vite', category: '构建工具' },
  { name: 'Webpack', category: '构建工具' },
  { name: 'Sass', category: 'CSS预处理器' },
  { name: 'Git', category: '版本控制' },
  { name: 'CI/CD', category: '工程化' },
  { name: 'Node.js', category: '后端技术' },
  { name: 'WebSocket', category: '实时通信' },
  { name: 'Rax', category: '跨端开发' },
  { name: 'uni-app', category: '跨端开发' },
  { name: 'Cursor', category: 'AI工具' },
  { name: 'Trae', category: 'AI工具' },
  { name: 'GitHub Copilot', category: 'AI工具' },
];

const defaultExperience = [
  {
    id: '1',
    company: '深圳市法本信息科技股份有限公司杭州分公司',
    role: '高级前端开发',
    period: '2021.8 - 2026.2',
    description: '主导金融系统、企业中台、低代码平台、钉钉/企业微信跨端微应用等多类型前端项目的架构设计与核心模块开发，覆盖需求拆解、技术方案选型、核心代码编写、性能优化全流程。',
    achievements: [
      '负责前端工程化体系搭建（CI/CD流水线、模块化打包、多环境配置），集成BPMN.js/ECharts/高德地图等第三方工具',
      '主导项目性能优化与交互体验升级，解决大型应用渲染卡顿、加载缓慢等核心问题，整体开发效率提升40%',
      '系统线上故障率降低35%',
      '2024年荣获部门"新锐数码宝贝·技术星"荣誉',
    ],
  },
  {
    id: '2',
    company: '浙江微一案信息科技有限公司',
    role: '前端开发',
    period: '2018.3 - 2021.7',
    description: '负责新零售系统、商家代理后台的PC/移动端全栈开发，对接后端API实现数据动态渲染与业务逻辑落地，支撑10+核心业务模块迭代。',
    achievements: [
      '主导高复用UI组件库开发，覆盖表单、图表、弹窗等80+通用组件，组件复用率达75%',
      '新功能开发周期缩短50%',
      '跟进前端新技术落地，完成新老项目的迁移',
    ],
  },
];

const defaultEducation = [
  { id: '1', school: '浙江海洋大学', degree: '本科（在职提升）', major: '计算机科学与技术', period: '2024.1 - 至今' },
  { id: '2', school: '浙江交通职业技术学院', degree: '大专', major: '汽车运用工程', period: '2016.3 - 2018.7' },
];

const defaultProjects = [
  {
    id: '1',
    title: '浙交所信息系统',
    period: '2023.8 - 2025.11',
    description: '服务商管理系统+佳置业官网与门户后台配置，支撑超千家服务商的资质审核、需求管理、资产运营等核心业务。',
    technologies: ['Vue 3', 'Pinia', 'Element Plus', 'Vite', 'Sass', 'Axios', 'ECharts', 'BPMN.js', '高德地图API'],
  },
  {
    id: '2',
    title: '中原资产/光大金瓯/钉钉微应用',
    period: '2023.8 - 2025.8',
    description: '中原资产后台管理系统/光大金瓯金融资产管理平台，管理不良收购、不良处置、非金等项目类型及审批流程。',
    technologies: ['React', 'ice.js', 'Ant Design Pro', 'Redux Toolkit', 'WebSocket', 'Rax'],
  },
  {
    id: '3',
    title: '数字人才项目',
    period: '2023.3 - 2023.7',
    description: '基于AECP低代码平台快速搭建教育系统核心功能，通过JSON Schema动态表单引擎实现80%业务模块可视化配置。',
    technologies: ['AECP低代码平台', 'GraphQL', 'Fusion Design'],
  },
  {
    id: '4',
    title: '神农鼎/A+质量水位/开山斧',
    period: '2021.8 - 2022.12',
    description: '中台架构设计与实现，基于Bigfish在雨燕中台搭建标准化模板，集成Umi插件体系。',
    technologies: ['Bigfish', 'Umi', 'Ant Design Pro', 'Ant Design Charts'],
  },
  {
    id: '5',
    title: '商家层级代理后台/商家新零售后台',
    period: '2018.3 - 2021.7',
    description: '负责商家商品、订单相关前端页面的开发与实现，基于后端API数据动态渲染商品信息、订单信息。',
    technologies: ['React', 'Flex布局', '响应式设计'],
  },
];

const defaultDemos = [
  {
    id: '1',
    title: '基尔的待办清单',
    url: 'https://todolist.tjysuperman.com',
    description: '专门用来记工作待办，够轻够快，不需要学习成本。拆解了任务录入、分类、优先级、状态这几个核心功能，目标是让每次记录控制在3步以内完成。',
    technologies: ['React', 'TypeScript', 'Vite'],
  },
  {
    id: '2',
    title: '基尔 AI工作室',
    url: 'https://ai.tjysuperman.com',
    description: '统一的地方把常用的AI能力都放进来，减少切换成本。完成了多模型接入、对话管理、Prompt模板管理等模块。',
    technologies: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'React Router'],
  },
  {
    id: '3',
    title: '数据可视化大屏',
    url: 'https://lsd.tjysuperman.com',
    description: '把关键指标汇总展示的大屏，重点处理了大屏在不同分辨率下的适配问题，以及多图表之间联动时的性能问题。',
    technologies: ['React', 'TypeScript', 'Vite', 'ECharts'],
  },
  {
    id: '4',
    title: '小工具合集（体验版小程序）',
    url: '#',
    description: '把常用工具都塞进来，规划了工具分类，完成了各功能模块的独立开发和整合，统一了交互风格。',
    technologies: ['uni-app', 'Vue 3', 'SCSS', 'Canvas', '微信小程序'],
  },
];

const defaultContact = {
  email: 'T_58812@163.com',
  phone: '17606523114',
  location: '杭州',
};

async function seedDefaultData() {
  try {
    await supabase.from('profile').upsert({ id: 'default', ...defaultProfile });
    await supabase.from('skills').delete();
    for (const skill of defaultSkills) {
      await supabase.from('skills').insert(skill);
    }
    await supabase.from('experiences').delete();
    for (const exp of defaultExperience) {
      await supabase.from('experiences').insert(exp);
    }
    await supabase.from('education').delete();
    for (const edu of defaultEducation) {
      await supabase.from('education').insert(edu);
    }
    await supabase.from('projects').delete();
    for (const proj of defaultProjects) {
      await supabase.from('projects').insert(proj);
    }
    await supabase.from('demos').delete();
    for (const demo of defaultDemos) {
      await supabase.from('demos').insert(demo);
    }
    await supabase.from('contact').upsert({ id: 'default', ...defaultContact });
  } catch (error) {
    console.error('Seed data error:', error);
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method === 'GET') {
      const { data: profile, error: profileError } = await supabase
        .from('profile')
        .select('*')
        .eq('id', 'default')
        .single();

      if (profileError || !profile || !profile.name) {
        await seedDefaultData();
        const { data: seededProfile } = await supabase
          .from('profile')
          .select('*')
          .eq('id', 'default')
          .single();

        const { data: skills } = await supabase.from('skills').select('*');
        const { data: experiences } = await supabase.from('experiences').select('*');
        const { data: education } = await supabase.from('education').select('*');
        const { data: projects } = await supabase.from('projects').select('*');
        const { data: demos } = await supabase.from('demos').select('*');
        const { data: contact } = await supabase.from('contact').select('*').eq('id', 'default').single();

        return res.status(200).json({
          ...seededProfile,
          skills: skills || [],
          experience: experiences || [],
          education: education || [],
          projects: projects || [],
          demos: demos || [],
          contact: {
            ...(contact || {}),
            social: (contact?.socialLinks as any) || [],
          },
        });
      }

      const { data: skills } = await supabase.from('skills').select('*');
      const { data: experiences } = await supabase.from('experiences').select('*');
      const { data: education } = await supabase.from('education').select('*');
      const { data: projects } = await supabase.from('projects').select('*');
      const { data: demos } = await supabase.from('demos').select('*');
      const { data: contact } = await supabase.from('contact').select('*').eq('id', 'default').single();

      res.status(200).json({
        ...profile,
        skills: skills || [],
        experience: experiences || [],
        education: education || [],
        projects: projects || [],
        demos: demos || [],
        contact: {
          ...(contact || {}),
          social: (contact?.socialLinks as any) || [],
        },
      });
    } else if (req.method === 'PUT') {
      const { skills, experience, education, projects, demos, contact, createdAt, updatedAt, ...profileData } = req.body;

      const { error: profileError } = await supabase
        .from('profile')
        .upsert({
          id: 'default',
          ...profileData,
        });

      if (profileError) {
        console.error('Profile update error:', profileError);
        return res.status(500).json({ success: false, message: '更新个人信息失败', error: profileError.message });
      }

      if (skills && Array.isArray(skills)) {
        const existingSkills = await supabase.from('skills').select('name');
        const existingNames = (existingSkills.data || []).map(s => s.name);
        const newNames = skills.map(s => s.name);
        
        for (const name of existingNames) {
          if (!newNames.includes(name)) {
            await supabase.from('skills').delete().eq('name', name);
          }
        }
        
        for (const skill of skills) {
          const { createdAt: _, updatedAt: __, ...skillData } = skill;
          await supabase
            .from('skills')
            .upsert({
              name: skillData.name,
              category: skillData.category,
            });
        }
      }

      if (experience && Array.isArray(experience)) {
        await supabase.from('experiences').delete();
        
        for (const exp of experience) {
          const { createdAt: _, updatedAt: __, ...expData } = exp;
          await supabase
            .from('experiences')
            .insert({
              id: expData.id || Date.now().toString(),
              company: expData.company,
              role: expData.role,
              period: expData.period,
              description: expData.description,
              achievements: expData.achievements || [],
            });
        }
      }

      if (education && Array.isArray(education)) {
        await supabase.from('education').delete();
        
        for (const edu of education) {
          const { createdAt: _, updatedAt: __, ...eduData } = edu;
          await supabase
            .from('education')
            .insert({
              id: eduData.id || Date.now().toString(),
              school: eduData.school,
              degree: eduData.degree,
              major: eduData.major,
              period: eduData.period,
            });
        }
      }

      if (projects && Array.isArray(projects)) {
        await supabase.from('projects').delete();
        
        for (const proj of projects) {
          const { createdAt: _, updatedAt: __, ...projData } = proj;
          await supabase
            .from('projects')
            .insert({
              id: projData.id || Date.now().toString(),
              title: projData.title,
              period: projData.period,
              description: projData.description,
              technologies: projData.technologies || [],
            });
        }
      }

      if (demos && Array.isArray(demos)) {
        await supabase.from('demos').delete();
        
        for (const demo of demos) {
          const { createdAt: _, updatedAt: __, ...demoData } = demo;
          await supabase
            .from('demos')
            .insert({
              id: demoData.id || Date.now().toString(),
              title: demoData.title,
              url: demoData.url,
              description: demoData.description,
              technologies: demoData.technologies || [],
            });
        }
      }

      if (contact) {
        const { createdAt: _, updatedAt: __, social, ...contactData } = contact;
        await supabase
          .from('contact')
          .upsert({
            id: 'default',
            email: contactData.email,
            phone: contactData.phone,
            location: contactData.location,
            socialLinks: social || [],
          });
      }

      res.status(200).json({ success: true, message: '个人信息更新成功' });
    } else {
      res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }
  } catch (error) {
    console.error('API error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ success: false, message: 'Internal Server Error', error: errorMessage });
  }
}