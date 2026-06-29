import { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase } from './supabase';
import multer from 'multer';
import { promises as fs } from 'fs';

const upload = multer({ dest: '/tmp/uploads/' });

export default async function handler(req: any, res: VercelResponse) {
  if (req.method === 'POST') {
    upload.single('file')(req, res, async (err) => {
      if (err) {
        console.error('Multer error:', err);
        return res.status(500).json({ success: false, message: '文件上传失败' });
      }

      try {
        const file = req.file;
        if (!file) {
          return res.status(400).json({ success: false, message: '请选择文件' });
        }

        const fileContent = await fs.readFile(file.path);
        const ext = file.originalname.split('.').pop();
        const filename = `${Date.now()}.${ext}`;

        const { error: uploadError } = await supabase.storage
          .from('uploads')
          .upload(filename, fileContent, {
            contentType: getContentType(ext),
            upsert: true,
          });

        await fs.unlink(file.path);

        if (uploadError) {
          console.error('Supabase upload error:', uploadError);
          return res.status(500).json({ success: false, message: '上传失败' });
        }

        const { data: publicUrlData } = supabase.storage
          .from('uploads')
          .getPublicUrl(filename);

        res.status(200).json({
          success: true,
          url: publicUrlData.publicUrl,
          filename,
          originalName: file.originalname,
        });
      } catch (error) {
        console.error('Upload API error:', error);
        res.status(500).json({ success: false, message: '上传失败', error: error instanceof Error ? error.message : 'Unknown error' });
      }
    });
  } else {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}

function getContentType(ext?: string): string {
  const types: { [key: string]: string } = {
    mp4: 'video/mp4',
    webm: 'video/webm',
    ogg: 'video/ogg',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    webp: 'image/webp',
    gif: 'image/gif',
  };
  return types[ext?.toLowerCase() || ''] || 'application/octet-stream';
}
