import { VercelRequest, VercelResponse } from '@vercel/node';
import { generateClientToken, type HandleUploadBody } from '@vercel/blob/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const jsonBody = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const body = jsonBody as HandleUploadBody;
    
    if (body.type === 'blob.generate-client-token') {
      const options: Parameters<typeof generateClientToken>[0] = {
        pathname: body.payload.pathname,
        clientPayload: body.payload.clientPayload,
        multipart: body.payload.multipart,
      };
      
      if (process.env.BLOB_READ_WRITE_TOKEN) {
        options.token = process.env.BLOB_READ_WRITE_TOKEN;
      }
      if (process.env.BLOB_STORE_ID) {
        options.storeId = process.env.BLOB_STORE_ID;
      }
      
      const token = await generateClientToken(options);
      
      return res.status(200).json({ token });
    }

    return res.status(400).json({ error: 'Unknown request type' });
  } catch (error) {
    console.error('Upload handler error:', error);
    res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Internal server error',
      env: {
        hasBlobToken: !!process.env.BLOB_READ_WRITE_TOKEN,
        hasStoreId: !!process.env.BLOB_STORE_ID,
        hasOidcToken: !!process.env.VERCEL_OIDC_TOKEN,
      }
    });
  }
}
