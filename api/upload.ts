import { VercelRequest, VercelResponse } from '@vercel/node';
import { handleUpload } from '@vercel/blob/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

  try {
    const jsonResponse = await handleUpload({
      body,
      request: req,
      onBeforeGenerateToken: async (pathname) => {
        return {
          allowedContentTypes: [
            'image/jpeg', 
            'image/png', 
            'image/webp',
            'video/mp4',
            'video/webm',
            'video/ogg',
          ],
          tokenPayload: JSON.stringify({}),
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        console.log('Upload completed:', blob);
      },
    });

    return res.status(200).json(jsonResponse);
  } catch (error) {
    console.error('Upload handler error:', error);
    return res.status(500).json({ error: error instanceof Error ? error.message : 'Internal server error' });
  }
}
