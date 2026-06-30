export default async function handler(req: { query: { url: string } }, res: { setHeader: (arg0: string, arg1: string) => void; status: (arg0: number) => void; send: (arg0: any) => void }) {
  const { url } = req.query;
  
  if (!url) {
    res.status(400).send('url is required');
    return;
  }

  const targetUrl = typeof url === 'string' ? url : url[0];
  
  try {
    const response = await fetch(targetUrl, {
      headers: {
        'Referer': '',
      },
    });

    res.setHeader('Content-Type', response.headers.get('Content-Type') || 'video/mp4');
    res.setHeader('Content-Length', response.headers.get('Content-Length') || '');
    res.setHeader('Accept-Ranges', 'bytes');
    
    const arrayBuffer = await response.arrayBuffer();
    res.status(response.status).send(Buffer.from(arrayBuffer));
  } catch (error) {
    console.error('Video proxy error:', error);
    res.status(500).send('Proxy error');
  }
}