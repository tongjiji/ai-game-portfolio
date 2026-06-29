import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'http://localhost:3001';
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY || '';

const useSupabase = !!supabaseUrl && supabaseUrl.includes('supabase');

const supabase = useSupabase ? createClient(supabaseUrl, supabaseKey) : null;

const BASE_URL = '/api';

export const api = {
  profile: {
    get: async () => {
      if (useSupabase && supabase) {
        const { data, error } = await supabase.from('profile').select('*').single();
        if (error) throw error;
        return data;
      }
      return fetch(`${BASE_URL}/profile`).then(res => res.json());
    },
    update: async (data: any) => {
      if (useSupabase && supabase) {
        const { data: result, error } = await supabase.from('profile').update(data).eq('id', data.id || '1');
        if (error) throw error;
        return result;
      }
      return fetch(`${BASE_URL}/profile`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }).then(res => res.json());
    },
  },
  works: {
    get: async (id?: string) => {
      if (useSupabase && supabase) {
        if (id) {
          const { data, error } = await supabase.from('works').select('*').eq('id', id).single();
          if (error) throw error;
          return data;
        }
        const { data, error } = await supabase.from('works').select('*');
        if (error) throw error;
        return data;
      }
      return fetch(`${BASE_URL}/works${id ? '/' + id : ''}`).then(res => res.json());
    },
    create: async (data: any) => {
      if (useSupabase && supabase) {
        const { data: result, error } = await supabase.from('works').insert([data]);
        if (error) throw error;
        return result;
      }
      return fetch(`${BASE_URL}/works`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }).then(res => res.json());
    },
    update: async (id: string, data: any) => {
      if (useSupabase && supabase) {
        const { data: result, error } = await supabase.from('works').update(data).eq('id', id);
        if (error) throw error;
        return result;
      }
      return fetch(`${BASE_URL}/works/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }).then(res => res.json());
    },
    delete: async (id: string) => {
      if (useSupabase && supabase) {
        const { data, error } = await supabase.from('works').delete().eq('id', id);
        if (error) throw error;
        return data;
      }
      return fetch(`${BASE_URL}/works/${id}`, {
        method: 'DELETE',
      }).then(res => res.json());
    },
  },
  skills: {
    get: async () => {
      if (useSupabase && supabase) {
        const { data, error } = await supabase.from('skills').select('*');
        if (error) throw error;
        return data;
      }
      return fetch(`${BASE_URL}/skills`).then(res => res.json());
    },
    create: async (data: any) => {
      if (useSupabase && supabase) {
        const { data: result, error } = await supabase.from('skills').insert([data]);
        if (error) throw error;
        return result;
      }
      return fetch(`${BASE_URL}/skills`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }).then(res => res.json());
    },
    update: async (name: string, data: any) => {
      if (useSupabase && supabase) {
        const { data: result, error } = await supabase.from('skills').update(data).eq('name', name);
        if (error) throw error;
        return result;
      }
      return fetch(`${BASE_URL}/skills/${name}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }).then(res => res.json());
    },
    delete: async (name: string) => {
      if (useSupabase && supabase) {
        const { data, error } = await supabase.from('skills').delete().eq('name', name);
        if (error) throw error;
        return data;
      }
      return fetch(`${BASE_URL}/skills/${name}`, {
        method: 'DELETE',
      }).then(res => res.json());
    },
  },
  experiences: {
    get: async () => {
      if (useSupabase && supabase) {
        const { data, error } = await supabase.from('experiences').select('*');
        if (error) throw error;
        return data;
      }
      return fetch(`${BASE_URL}/experiences`).then(res => res.json());
    },
    create: async (data: any) => {
      if (useSupabase && supabase) {
        const { data: result, error } = await supabase.from('experiences').insert([data]);
        if (error) throw error;
        return result;
      }
      return fetch(`${BASE_URL}/experiences`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }).then(res => res.json());
    },
    update: async (company: string, data: any) => {
      if (useSupabase && supabase) {
        const { data: result, error } = await supabase.from('experiences').update(data).eq('company', company);
        if (error) throw error;
        return result;
      }
      return fetch(`${BASE_URL}/experiences/${company}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }).then(res => res.json());
    },
    delete: async (company: string) => {
      if (useSupabase && supabase) {
        const { data, error } = await supabase.from('experiences').delete().eq('company', company);
        if (error) throw error;
        return data;
      }
      return fetch(`${BASE_URL}/experiences/${company}`, {
        method: 'DELETE',
      }).then(res => res.json());
    },
  },
  education: {
    get: async () => {
      if (useSupabase && supabase) {
        const { data, error } = await supabase.from('education').select('*');
        if (error) throw error;
        return data;
      }
      return fetch(`${BASE_URL}/education`).then(res => res.json());
    },
    create: async (data: any) => {
      if (useSupabase && supabase) {
        const { data: result, error } = await supabase.from('education').insert([data]);
        if (error) throw error;
        return result;
      }
      return fetch(`${BASE_URL}/education`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }).then(res => res.json());
    },
    update: async (school: string, data: any) => {
      if (useSupabase && supabase) {
        const { data: result, error } = await supabase.from('education').update(data).eq('school', school);
        if (error) throw error;
        return result;
      }
      return fetch(`${BASE_URL}/education/${school}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }).then(res => res.json());
    },
    delete: async (school: string) => {
      if (useSupabase && supabase) {
        const { data, error } = await supabase.from('education').delete().eq('school', school);
        if (error) throw error;
        return data;
      }
      return fetch(`${BASE_URL}/education/${school}`, {
        method: 'DELETE',
      }).then(res => res.json());
    },
  },
  projects: {
    get: async () => {
      if (useSupabase && supabase) {
        const { data, error } = await supabase.from('projects').select('*');
        if (error) throw error;
        return data;
      }
      return fetch(`${BASE_URL}/projects`).then(res => res.json());
    },
    create: async (data: any) => {
      if (useSupabase && supabase) {
        const { data: result, error } = await supabase.from('projects').insert([data]);
        if (error) throw error;
        return result;
      }
      return fetch(`${BASE_URL}/projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }).then(res => res.json());
    },
    update: async (title: string, data: any) => {
      if (useSupabase && supabase) {
        const { data: result, error } = await supabase.from('projects').update(data).eq('title', title);
        if (error) throw error;
        return result;
      }
      return fetch(`${BASE_URL}/projects/${title}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }).then(res => res.json());
    },
    delete: async (title: string) => {
      if (useSupabase && supabase) {
        const { data, error } = await supabase.from('projects').delete().eq('title', title);
        if (error) throw error;
        return data;
      }
      return fetch(`${BASE_URL}/projects/${title}`, {
        method: 'DELETE',
      }).then(res => res.json());
    },
  },
  demos: {
    get: async () => {
      if (useSupabase && supabase) {
        const { data, error } = await supabase.from('demos').select('*');
        if (error) throw error;
        return data;
      }
      return fetch(`${BASE_URL}/demos`).then(res => res.json());
    },
    create: async (data: any) => {
      if (useSupabase && supabase) {
        const { data: result, error } = await supabase.from('demos').insert([data]);
        if (error) throw error;
        return result;
      }
      return fetch(`${BASE_URL}/demos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }).then(res => res.json());
    },
    update: async (name: string, data: any) => {
      if (useSupabase && supabase) {
        const { data: result, error } = await supabase.from('demos').update(data).eq('name', name);
        if (error) throw error;
        return result;
      }
      return fetch(`${BASE_URL}/demos/${name}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }).then(res => res.json());
    },
    delete: async (name: string) => {
      if (useSupabase && supabase) {
        const { data, error } = await supabase.from('demos').delete().eq('name', name);
        if (error) throw error;
        return data;
      }
      return fetch(`${BASE_URL}/demos/${name}`, {
        method: 'DELETE',
      }).then(res => res.json());
    },
  },
  contact: {
    get: async () => {
      if (useSupabase && supabase) {
        const { data, error } = await supabase.from('contact').select('*').single();
        if (error) throw error;
        return data;
      }
      return fetch(`${BASE_URL}/contact`).then(res => res.json());
    },
    update: async (data: any) => {
      if (useSupabase && supabase) {
        const { data: result, error } = await supabase.from('contact').upsert(data, { onConflict: 'id' });
        if (error) throw error;
        return result;
      }
      return fetch(`${BASE_URL}/contact`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }).then(res => res.json());
    },
  },
  upload: {
    single: async (file: File) => {
      if (useSupabase && supabase) {
        const fileExt = file.name.split('.').pop() || 'bin';
        const fileName = `${Date.now()}-${Math.round(Math.random() * 1E9)}.${fileExt}`;
        
        const { error } = await supabase.storage
          .from('videos')
          .upload(fileName, file, {
            cacheControl: '3600',
            upsert: false,
          });
        
        if (error) {
          throw error;
        }
        
        const { data: urlData } = supabase.storage
          .from('videos')
          .getPublicUrl(fileName);
        
        return {
          success: true,
          url: urlData.publicUrl,
          filename: fileName,
          originalName: file.name,
          size: file.size,
        };
      }
      
      const formData = new FormData();
      formData.append('file', file);
      return fetch(`${BASE_URL}/upload`, {
        method: 'POST',
        body: formData,
      }).then(res => res.json());
    },
    delete: async (filename: string) => {
      if (useSupabase && supabase) {
        const { error } = await supabase.storage
          .from('videos')
          .remove([filename]);
        
        return {
          success: !error,
          message: error ? error.message : '文件删除成功',
        };
      }
      return fetch(`${BASE_URL}/uploads/${filename}`, {
        method: 'DELETE',
      }).then(res => res.json());
    },
  },
};
