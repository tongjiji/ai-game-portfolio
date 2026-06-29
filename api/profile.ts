import { VercelRequest, VercelResponse } from '@vercel/node';
import fs from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'server', 'data', 'db.json');

const readDB = () => {
  const data = fs.readFileSync(dbPath, 'utf8');
  return JSON.parse(data);
};

const writeDB = (data: any) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

export default function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method === 'GET') {
      const db = readDB();
      res.status(200).json(db.profile);
    } else if (req.method === 'PUT') {
      const db = readDB();
      db.profile = req.body;
      writeDB(db);
      res.status(200).json({ success: true, message: '个人信息更新成功' });
    } else {
      res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }
  } catch (error) {
    console.error('API error:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}
