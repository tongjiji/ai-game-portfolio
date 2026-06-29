CREATE TABLE IF NOT EXISTS profile (
  id TEXT DEFAULT 'default' PRIMARY KEY,
  name TEXT,
  title TEXT,
  slogan TEXT,
  bio TEXT,
  background TEXT,
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
  title TEXT,
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

ALTER TABLE IF EXISTS profile ADD COLUMN IF NOT EXISTS slogan TEXT;
ALTER TABLE IF EXISTS profile ADD COLUMN IF NOT EXISTS background TEXT;
ALTER TABLE IF EXISTS experiences ADD COLUMN IF NOT EXISTS achievements TEXT[];
ALTER TABLE IF EXISTS demos ADD COLUMN IF NOT EXISTS title TEXT;

DROP POLICY IF EXISTS "Allow all access to profile" ON profile;
CREATE POLICY "Allow all access to profile" ON profile FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow all access to works" ON works;
CREATE POLICY "Allow all access to works" ON works FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow all access to skills" ON skills;
CREATE POLICY "Allow all access to skills" ON skills FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow all access to experiences" ON experiences;
CREATE POLICY "Allow all access to experiences" ON experiences FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow all access to education" ON education;
CREATE POLICY "Allow all access to education" ON education FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow all access to projects" ON projects;
CREATE POLICY "Allow all access to projects" ON projects FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow all access to demos" ON demos;
CREATE POLICY "Allow all access to demos" ON demos FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow all access to contact" ON contact;
CREATE POLICY "Allow all access to contact" ON contact FOR ALL USING (true) WITH CHECK (true);

ALTER TABLE profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE works ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE education ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE demos ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact ENABLE ROW LEVEL SECURITY;