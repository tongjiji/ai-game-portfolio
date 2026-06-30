import { VercelRequest, VercelResponse } from '@vercel/node';
import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const jsonBody = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const body = jsonBody as HandleUploadBody;
    
    const result = await handleUpload({
      body,
      request: req as any,
      onBeforeGenerateToken: async (pathname) => {
        return {
          allowed: true,
          tokenPayload: JSON.stringify({ pathname }),
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        console.log('Upload completed:', blob.url);
      },
    });

    res.status(200).json(result);
  } catch (error) {
    console.error('Upload handler error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
