import { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase } from '../supabase';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'DELETE') {
    try {
      const filename = req.query.filename as string;
      
      if (!filename) {
        return res.status(400).json({ success: false, message: '缺少文件名' });
      }

      const { error: deleteError } = await supabase.storage
        .from('uploads')
        .remove([filename]);

      if (deleteError) {
        console.error('Delete error:', deleteError);
        return res.status(500).json({ success: false, message: '删除失败' });
      }

      res.status(200).json({ success: true, message: '删除成功' });
    } catch (error) {
      console.error('Delete API error:', error);
      res.status(500).json({ success: false, message: '删除失败', error: error instanceof Error ? error.message : 'Unknown error' });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}
