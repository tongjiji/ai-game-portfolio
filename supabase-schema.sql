CREATE TABLE IF NOT EXISTS profile (
  id TEXT DEFAULT 'default' PRIMARY KEY,
  name TEXT,
  title TEXT,
  slogan TEXT,
  bio TEXT,
  email TEXT,
  phone TEXT,
  location TEXT,
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS works (
  id TEXT PRIMARY KEY,
  title TEXT,
  description TEXT,
  category TEXT,
  aiModel TEXT,
  coverUrl TEXT,
  videoUrl TEXT,
  tags TEXT[],
  details JSONB DEFAULT '{"concept": "", "tools": [], "scene": ""}',
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS skills (
  name TEXT PRIMARY KEY,
  category TEXT,
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS experiences (
  id TEXT PRIMARY KEY DEFAULT uuid_generate_v4(),
  company TEXT,
  role TEXT,
  period TEXT,
  description TEXT,
  achievements TEXT[],
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS education (
  id TEXT PRIMARY KEY DEFAULT uuid_generate_v4(),
  school TEXT,
  degree TEXT,
  major TEXT,
  period TEXT,
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS projects (
  id TEXT PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT,
  period TEXT,
  description TEXT,
  technologies TEXT[],
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS demos (
  id TEXT PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT,
  url TEXT,
  description TEXT,
  technologies TEXT[],
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS contact (
  id TEXT DEFAULT 'default' PRIMARY KEY,
  email TEXT,
  phone TEXT,
  location TEXT,
  socialLinks JSONB DEFAULT '[]',
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW()
);
