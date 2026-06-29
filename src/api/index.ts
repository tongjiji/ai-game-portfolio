import { createClient } from '@supabase/supabase-js';
import { profile as defaultProfile } from '../data/profile';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

const seedDefaultData = async () => {
  if (!supabase) return;
  
  try {
    const { data: profiles } = await supabase.from('profile').select('*');
    
    if (!profiles || profiles.length === 0) {
      await supabase.from('profile').insert({
        id: '1',
        name: defaultProfile.name,
        title: defaultProfile.title,
        slogan: defaultProfile.slogan,
        bio: defaultProfile.bio,
        background: defaultProfile.background,
        email: defaultProfile.contact.email,
        phone: defaultProfile.contact.phone,
        location: defaultProfile.contact.location,
      });

      if (defaultProfile.skills.length > 0) {
        await supabase.from('skills').insert(defaultProfile.skills.map((s, i) => ({
          id: `skill_${i}`,
          name: s.name,
          category: s.category,
        })));
      }

      if (defaultProfile.experience.length > 0) {
        await supabase.from('experiences').insert(defaultProfile.experience.map((e, i) => ({
          id: `exp_${i}`,
          company: e.company,
          role: e.role,
          period: e.period,
          description: e.description,
          achievements: e.achievements,
        })));
      }

      if (defaultProfile.education.length > 0) {
        await supabase.from('education').insert(defaultProfile.education.map((edu, i) => ({
          id: `edu_${i}`,
          school: edu.school,
          degree: edu.degree,
          major: edu.major,
          period: edu.period,
        })));
      }

      if (defaultProfile.projects.length > 0) {
        await supabase.from('projects').insert(defaultProfile.projects.map((p, i) => ({
          id: `proj_${i}`,
          title: p.title,
          period: p.period,
          description: p.description,
          technologies: p.technologies,
        })));
      }

      if (defaultProfile.demos.length > 0) {
        await supabase.from('demos').insert(defaultProfile.demos.map((d, i) => ({
          id: `demo_${i}`,
          name: d.title,
          url: d.url,
          description: d.description,
          technologies: d.technologies,
        })));
      }
    }
  } catch (error) {
    console.warn('Failed to seed default data:', error);
  }
};

export const api = {
  profile: {
    get: async () => {
      if (!supabase) {
        const response = await fetch('/api/profile');
        return response.json();
      }
      
      try {
        await seedDefaultData();
        
        const { data: profiles, error } = await supabase.from('profile').select('*');
        if (error) throw error;
        
        const profile = profiles?.[0] || {};
        
        const [skills, experience, education, projects, demos] = await Promise.all([
          supabase.from('skills').select('*').then(res => res.data || []),
          supabase.from('experiences').select('*').then(res => res.data || []),
          supabase.from('education').select('*').then(res => res.data || []),
          supabase.from('projects').select('*').then(res => res.data || []),
          supabase.from('demos').select('*').then(res => res.data || []),
        ]);
        
        return {
          ...profile,
          skills: skills || [],
          experience: experience || [],
          education: education || [],
          projects: projects || [],
          demos: demos || [],
          contact: {
            email: profile.email || '',
            phone: profile.phone || '',
            location: profile.location || '',
            social: [],
          },
        };
      } catch (error) {
        console.warn('Supabase error, fallback to local:', error);
        const response = await fetch('/api/profile');
        return response.json();
      }
    },
    update: async (data: any) => {
      if (!supabase) {
        const response = await fetch('/api/profile', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        return response.json();
      }
      
      try {
        const { error: profileError } = await supabase.from('profile').upsert({
          id: '1',
          name: data.name,
          title: data.title,
          slogan: data.slogan,
          bio: data.bio,
          background: data.background,
          email: data.contact?.email || '',
          phone: data.contact?.phone || '',
          location: data.contact?.location || '',
        }, { onConflict: 'id' });
        
        if (profileError) throw profileError;
        
        await supabase.from('skills').delete().neq('id', '');
        if (data.skills && data.skills.length > 0) {
          await supabase.from('skills').insert(data.skills.map((s: any, i: number) => ({
            id: `skill_${i}`,
            name: s.name,
            category: s.category,
          })));
        }
        
        await supabase.from('experiences').delete().neq('id', '');
        if (data.experience && data.experience.length > 0) {
          await supabase.from('experiences').insert(data.experience.map((e: any, i: number) => ({
            id: `exp_${i}`,
            company: e.company,
            role: e.role,
            period: e.period,
            description: e.description,
            achievements: e.achievements,
          })));
        }
        
        await supabase.from('education').delete().neq('id', '');
        if (data.education && data.education.length > 0) {
          await supabase.from('education').insert(data.education.map((edu: any, i: number) => ({
            id: `edu_${i}`,
            school: edu.school,
            degree: edu.degree,
            major: edu.major,
            period: edu.period,
          })));
        }
        
        await supabase.from('projects').delete().neq('id', '');
        if (data.projects && data.projects.length > 0) {
          await supabase.from('projects').insert(data.projects.map((p: any, i: number) => ({
            id: `proj_${i}`,
            title: p.title,
            period: p.period,
            description: p.description,
            technologies: p.technologies,
          })));
        }
        
        await supabase.from('demos').delete().neq('id', '');
        if (data.demos && data.demos.length > 0) {
          await supabase.from('demos').insert(data.demos.map((d: any, i: number) => ({
            id: `demo_${i}`,
            name: d.title,
            url: d.url,
            description: d.description,
            technologies: d.technologies,
          })));
        }
        
        return { success: true, message: '个人信息更新成功' };
      } catch (error) {
        console.error('Supabase update error:', error);
        throw error;
      }
    },
  },
  works: {
    get: async (id?: string) => {
      if (!supabase) {
        const response = await fetch(`/api/works${id ? '/' + id : ''}`);
        return response.json();
      }
      
      try {
        if (id) {
          const { data, error } = await supabase.from('works').select('*').eq('id', id).single();
          if (error) throw error;
          return data;
        }
        const { data, error } = await supabase.from('works').select('*');
        if (error) throw error;
        return data;
      } catch (error) {
        const response = await fetch(`/api/works${id ? '/' + id : ''}`);
        return response.json();
      }
    },
    create: async (data: any) => {
      if (!supabase) {
        const response = await fetch('/api/works', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        return response.json();
      }
      
      try {
        const { data: result, error } = await supabase.from('works').insert([{
          ...data,
          id: data.id || Date.now().toString(),
          createdAt: data.createdAt || new Date().toISOString().split('T')[0],
        }]);
        if (error) throw error;
        return { success: true, message: '作品添加成功', data: result?.[0] };
      } catch (error) {
        throw error;
      }
    },
    update: async (id: string, data: any) => {
      if (!supabase) {
        const response = await fetch(`/api/works/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        return response.json();
      }
      
      try {
        const { error } = await supabase.from('works').update(data).eq('id', id);
        if (error) throw error;
        return { success: true, message: '作品更新成功' };
      } catch (error) {
        throw error;
      }
    },
    delete: async (id: string) => {
      if (!supabase) {
        const response = await fetch(`/api/works/${id}`, {
          method: 'DELETE',
        });
        return response.json();
      }
      
      try {
        const { error } = await supabase.from('works').delete().eq('id', id);
        if (error) throw error;
        return { success: true, message: '作品删除成功' };
      } catch (error) {
        throw error;
      }
    },
  },
  upload: {
    single: async (file: File) => {
      const formData = new FormData();
      formData.append('file', file);
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      return response.json();
    },
    delete: async (filename: string) => {
      const response = await fetch(`/api/uploads/${filename}`, {
        method: 'DELETE',
      });
      return response.json();
    },
  },
};
