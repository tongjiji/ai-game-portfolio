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

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method === 'GET') {
      console.log('Profile GET - Environment check:', {
        hasSUPABASE_URL: !!process.env.SUPABASE_URL,
        hasSUPABASE_SERVICE_ROLE_KEY: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
        hasVITE_SUPABASE_URL: !!process.env.VITE_SUPABASE_URL,
        supabaseUrl,
      });

      const { data: profile, error: profileError } = await supabase
        .from('profile')
        .select('*')
        .eq('id', 'default')
        .single();

      if (profileError) {
        console.error('Profile query error:', profileError);
        if (profileError.code === 'PGRST116' || profileError.message?.includes('not found')) {
          const { data: newProfile } = await supabase
            .from('profile')
            .insert({ id: 'default' })
            .select()
            .single();
          return res.status(200).json({
            ...newProfile,
            skills: [],
            experience: [],
            education: [],
            projects: [],
            demos: [],
            contact: {},
          });
        }
        return res.status(500).json({ success: false, message: '获取个人信息失败', error: profileError.message });
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
        contact: contact || {},
      });
    } else if (req.method === 'PUT') {
      const { skills, experience, education, projects, demos, contact, ...profileData } = req.body;

      const { error: profileError } = await supabase
        .from('profile')
        .upsert({
          id: 'default',
          ...profileData,
          updatedAt: new Date().toISOString(),
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
          await supabase
            .from('skills')
            .upsert({
              name: skill.name,
              category: skill.category,
              updatedAt: new Date().toISOString(),
            });
        }
      }

      if (experience && Array.isArray(experience)) {
        await supabase.from('experiences').delete();
        
        for (const exp of experience) {
          await supabase
            .from('experiences')
            .insert({
              id: exp.id || Date.now().toString(),
              ...exp,
              createdAt: exp.createdAt || new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            });
        }
      }

      if (education && Array.isArray(education)) {
        await supabase.from('education').delete();
        
        for (const edu of education) {
          await supabase
            .from('education')
            .insert({
              id: edu.id || Date.now().toString(),
              ...edu,
              createdAt: edu.createdAt || new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            });
        }
      }

      if (projects && Array.isArray(projects)) {
        await supabase.from('projects').delete();
        
        for (const proj of projects) {
          await supabase
            .from('projects')
            .insert({
              id: proj.id || Date.now().toString(),
              ...proj,
              createdAt: proj.createdAt || new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            });
        }
      }

      if (demos && Array.isArray(demos)) {
        await supabase.from('demos').delete();
        
        for (const demo of demos) {
          await supabase
            .from('demos')
            .insert({
              id: demo.id || Date.now().toString(),
              ...demo,
              createdAt: demo.createdAt || new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            });
        }
      }

      if (contact) {
        await supabase
          .from('contact')
          .upsert({
            id: 'default',
            ...contact,
            updatedAt: new Date().toISOString(),
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