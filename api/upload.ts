import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { filename } = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    
    if (!filename) {
      return res.status(400).json({ error: 'filename is required' });
    }

    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return res.status(500).json({ error: 'BLOB_READ_WRITE_TOKEN is not set' });
    }

    const uploadUrl = `https://blob.vercel-storage.com/${filename}?token=${process.env.BLOB_READ_WRITE_TOKEN}`;

    return res.status(200).json({ 
      uploadUrl,
      url: `https://public.blob.vercel-storage.com/${filename}`,
    });
  } catch (error) {
    console.error('Upload handler error:', error);
    res.status(500).json({ error: error instanceof Error ? error.message : 'Internal server error' });
  }
}
