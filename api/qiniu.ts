import qiniu from 'qiniu';

export default async function handler(req: { query: { key: string } }, res: { json: (arg0: { url: string } | { error: string }) => void; status: (arg0: number) => void }) {
  const { key } = req.query;
  
  if (!key) {
    res.status(400).json({ error: 'key is required' });
    return;
  }

  const accessKey = process.env.QINIU_ACCESS_KEY;
  const secretKey = process.env.QINIU_SECRET_KEY;
  const domain = process.env.QINIU_DOMAIN || 'thftfh6tw.hd-bkt.clouddn.com';

  if (!accessKey || !secretKey) {
    res.status(500).json({ error: 'Qiniu credentials not configured' });
    return;
  }

  const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
  const deadline = Math.floor(Date.now() / 1000) + 3600;
  const policy = new qiniu.rs.GetPolicy({ deadline });
  const url = policy.makeRequest(`https://${domain}/${key}`);

  res.json({ url });
}