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

function formatWork(work: any) {
  if (!work) return null;
  return {
    id: work.id,
    title: work.title,
    description: work.description,
    category: work.category,
    aiModel: work.aimodel || work.aiModel,
    coverUrl: work.coverurl || work.coverUrl,
    videoUrl: work.videourl || work.videoUrl,
    tags: work.tags || [],
    details: work.details || { concept: '', tools: [], scene: '' },
    createdAt: work.createdat || work.createdAt,
    updatedAt: work.updatedat || work.updatedAt,
  };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method === 'GET') {
      const id = req.query.id as string;
      if (id) {
        const { data: work, error } = await supabase
          .from('works')
          .select('*')
          .eq('id', id)
          .single();

        if (error) {
          console.error('Work query error:', error);
          return res.status(404).json({ success: false, message: '作品不存在', error: error.message });
        }

        res.status(200).json(formatWork(work));
      } else {
        const { data: works, error } = await supabase
          .from('works')
          .select('*');

        if (error) {
          console.error('Works query error:', error);
          return res.status(500).json({ success: false, message: '获取作品列表失败', error: error.message });
        }

        res.status(200).json((works || []).map(formatWork));
      }
    } else if (req.method === 'POST') {
      const { createdAt, updatedAt, ...workData } = req.body;
      const newWork = {
        ...workData,
        id: workData.id || Date.now().toString(),
        createdat: new Date().toISOString(),
        updatedat: new Date().toISOString(),
      };

      const { data: work, error } = await supabase
        .from('works')
        .insert(newWork)
        .select()
        .single();

      if (error) {
        console.error('Work create error:', error);
        return res.status(500).json({ success: false, message: '添加作品失败', error: error.message });
      }

      res.status(200).json({ success: true, message: '作品添加成功', data: formatWork(work) });
    } else if (req.method === 'PUT') {
      const id = req.query.id as string;

      const { createdAt, updatedAt, ...updateData } = req.body;
      const { error } = await supabase
        .from('works')
        .update({
          ...updateData,
          updatedat: new Date().toISOString(),
        })
        .eq('id', id);

      if (error) {
        console.error('Work update error:', error);
        return res.status(500).json({ success: false, message: '更新作品失败', error: error.message });
      }

      res.status(200).json({ success: true, message: '作品更新成功' });
    } else if (req.method === 'DELETE') {
      const id = req.query.id as string;

      const { error } = await supabase
        .from('works')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Work delete error:', error);
        return res.status(500).json({ success: false, message: '删除作品失败', error: error.message });
      }

      res.status(200).json({ success: true, message: '作品删除成功' });
    } else {
      res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }
  } catch (error) {
    console.error('API error:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error', error: error instanceof Error ? error.message : 'Unknown error' });
  }
}
