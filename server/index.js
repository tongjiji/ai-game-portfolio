import express from 'express';
import cors from 'cors';
import multer from 'multer';
import fs from 'fs-extra';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: '1000mb' }));
app.use(express.urlencoded({ extended: true, limit: '1000mb' }));

const uploadsDir = path.join(path.dirname(new URL(import.meta.url).pathname), '../public/uploads');
fs.ensureDirSync(uploadsDir);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, uniqueSuffix + ext);
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 1000 * 1024 * 1024
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['video/mp4', 'video/webm', 'video/ogg', 'image/jpeg', 'image/png', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('文件类型不允许'), false);
    }
  }
});

const dbPath = path.join(path.dirname(new URL(import.meta.url).pathname), 'data/db.json');

const readDB = () => {
  const data = fs.readFileSync(dbPath, 'utf8');
  return JSON.parse(data);
};

const writeDB = (data) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

app.use('/uploads', express.static(uploadsDir));

app.get('/api/profile', (req, res) => {
  const db = readDB();
  res.json(db.profile);
});

app.put('/api/profile', (req, res) => {
  const db = readDB();
  db.profile = req.body;
  writeDB(db);
  res.json({ success: true, message: '个人信息更新成功' });
});

app.get('/api/works', (req, res) => {
  const db = readDB();
  res.json(db.works);
});

app.get('/api/works/:id', (req, res) => {
  const db = readDB();
  const work = db.works.find(w => w.id === req.params.id);
  if (work) {
    res.json(work);
  } else {
    res.status(404).json({ success: false, message: '作品不存在' });
  }
});

app.post('/api/works', (req, res) => {
  const db = readDB();
  const newWork = {
    ...req.body,
    id: Date.now().toString(),
    createdAt: new Date().toISOString().split('T')[0]
  };
  db.works.unshift(newWork);
  writeDB(db);
  res.json({ success: true, message: '作品添加成功', data: newWork });
});

app.put('/api/works/:id', (req, res) => {
  const db = readDB();
  const index = db.works.findIndex(w => w.id === req.params.id);
  if (index !== -1) {
    db.works[index] = { ...db.works[index], ...req.body };
    writeDB(db);
    res.json({ success: true, message: '作品更新成功' });
  } else {
    res.status(404).json({ success: false, message: '作品不存在' });
  }
});

app.delete('/api/works/:id', (req, res) => {
  const db = readDB();
  const index = db.works.findIndex(w => w.id === req.params.id);
  if (index !== -1) {
    const deleted = db.works.splice(index, 1)[0];
    if (deleted.videoUrl && deleted.videoUrl.includes('/uploads/')) {
      const videoPath = path.join(path.dirname(new URL(import.meta.url).pathname), '../public', deleted.videoUrl);
      fs.remove(videoPath).catch(() => {});
    }
    if (deleted.coverUrl && deleted.coverUrl.includes('/uploads/')) {
      const coverPath = path.join(path.dirname(new URL(import.meta.url).pathname), '../public', deleted.coverUrl);
      fs.remove(coverPath).catch(() => {});
    }
    writeDB(db);
    res.json({ success: true, message: '作品删除成功' });
  } else {
    res.status(404).json({ success: false, message: '作品不存在' });
  }
});

app.post('/api/upload', upload.single('file'), (req, res) => {
  if (req.file) {
    const fileUrl = `/uploads/${req.file.filename}`;
    res.json({ 
      success: true, 
      url: fileUrl, 
      filename: req.file.filename,
      originalName: req.file.originalname,
      size: req.file.size
    });
  } else {
    res.status(400).json({ success: false, message: '上传失败' });
  }
});

app.post('/api/upload-multiple', upload.fields([
  { name: 'video', maxCount: 1 },
  { name: 'cover', maxCount: 1 }
]), (req, res) => {
  const result = {};
  if (req.files.video) {
    result.videoUrl = `/uploads/${req.files.video[0].filename}`;
  }
  if (req.files.cover) {
    result.coverUrl = `/uploads/${req.files.cover[0].filename}`;
  }
  res.json({ success: true, ...result });
});

app.delete('/api/uploads/:filename', (req, res) => {
  const filePath = path.join(uploadsDir, req.params.filename);
  fs.remove(filePath)
    .then(() => {
      res.json({ success: true, message: '文件删除成功' });
    })
    .catch(() => {
      res.status(404).json({ success: false, message: '文件不存在' });
    });
});

app.get('/api/uploads', (req, res) => {
  fs.readdir(uploadsDir, (err, files) => {
    if (err) {
      res.status(500).json({ success: false, message: '读取目录失败' });
      return;
    }
    const fileList = files.map(file => ({
      name: file,
      url: `/uploads/${file}`,
      type: file.includes('.mp4') || file.includes('.webm') || file.includes('.ogg') ? 'video' : 'image',
      size: fs.statSync(path.join(uploadsDir, file)).size
    }));
    res.json(fileList);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
