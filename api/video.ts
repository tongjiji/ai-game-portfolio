import { createReadStream } from 'fs';
import { join } from 'path';

export default async function handler(req: { query: { url: string } }, res: { setHeader: (arg0: string, arg1: string) => void; status: (arg0: number) => void; end: (arg0?: any) => void; pipe: (arg0: any) => void }) {
  const { url } = req.query;
  
  if (!url) {
    res.status(400).end('url is required');
    return;
  }

  const targetUrl = typeof url === 'string' ? url : url[0];
  
  try {
    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
      },
    });

    if (!response.ok) {
      res.status(response.status).end('Failed to fetch video');
      return;
    }

    res.setHeader('Content-Type', response.headers.get('Content-Type') || 'video/mp4');
    res.setHeader('Content-Length', response.headers.get('Content-Length') || '');
    res.setHeader('Accept-Ranges', 'bytes');
    res.setHeader('Cache-Control', 'public, max-age=604800');
    
    res.status(response.status);
    
    if (response.body) {
      const reader = response.body.getReader();
      
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        res.write(value);
      }
      res.end();
    } else {
      res.end();
    }
  } catch (error) {
    console.error('Video proxy error:', error);
    res.status(500).end('Proxy error');
  }
}