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
    const db = readDB();
    
    if (req.method === 'GET') {
      const id = req.query.id as string;
      if (id) {
        const work = db.works.find((w: any) => w.id === id);
        if (work) {
          res.status(200).json(work);
        } else {
          res.status(404).json({ success: false, message: '作品不存在' });
        }
      } else {
        res.status(200).json(db.works);
      }
    } else if (req.method === 'POST') {
      const newWork = {
        ...req.body,
        id: Date.now().toString(),
        createdAt: new Date().toISOString().split('T')[0]
      };
      db.works.unshift(newWork);
      writeDB(db);
      res.status(200).json({ success: true, message: '作品添加成功', data: newWork });
    } else if (req.method === 'PUT') {
      const id = req.query.id as string;
      const index = db.works.findIndex((w: any) => w.id === id);
      if (index !== -1) {
        db.works[index] = { ...db.works[index], ...req.body };
        writeDB(db);
        res.status(200).json({ success: true, message: '作品更新成功' });
      } else {
        res.status(404).json({ success: false, message: '作品不存在' });
      }
    } else if (req.method === 'DELETE') {
      const id = req.query.id as string;
      const index = db.works.findIndex((w: any) => w.id === id);
      if (index !== -1) {
        db.works.splice(index, 1);
        writeDB(db);
        res.status(200).json({ success: true, message: '作品删除成功' });
      } else {
        res.status(404).json({ success: false, message: '作品不存在' });
      }
    } else {
      res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }
  } catch (error) {
    console.error('API error:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}
