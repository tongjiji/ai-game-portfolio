import { profile as defaultProfile } from '../data/profile';
import { works as defaultWorks } from '../data/works';
import { createClient } from '@supabase/supabase-js';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile } from '@ffmpeg/util';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://qidxycrdtxrdaxulyqey.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY || 'sb_publishable_3mU9pl05MkYfRUsOgig2UA_SxrHVSEh';

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

const MAX_FILE_SIZE = 50 * 1024 * 1024;

export const api = {
  profile: {
    get: async () => {
      try {
        const response = await fetch('/api/profile');
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      } catch {
        return defaultProfile;
      }
    },
    update: async (data: any) => {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return response.json();
    },
  },
  works: {
    get: async (id?: string) => {
      try {
        const response = await fetch(`/api/works${id ? '?id=' + id : ''}`);
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      } catch {
        if (id) {
          return defaultWorks.find(w => w.id === id) || null;
        }
        return defaultWorks;
      }
    },
    create: async (data: any) => {
      const response = await fetch('/api/works', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return response.json();
    },
    update: async (id: string, data: any) => {
      const response = await fetch(`/api/works?id=${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return response.json();
    },
    delete: async (id: string) => {
      const response = await fetch(`/api/works?id=${id}`, {
        method: 'DELETE',
      });
      return response.json();
    },
  },
  upload: {
    single: async (file: File, onProgress?: (progress: number) => void) => {
      try {
        const ext = file.name.split('.').pop();
        const filename = `${Date.now()}.${ext}`;

        let uploadFile = file;

        if (file.type.startsWith('video/') && file.size > MAX_FILE_SIZE && ext) {
          uploadFile = await compressVideo(file, ext, onProgress);
        }

        const { error } = await supabase.storage
          .from('videos')
          .upload(filename, uploadFile, {
            contentType: getContentType(ext),
            upsert: true,
          });

        if (error) {
          throw error;
        }

        const { data: publicUrlData } = supabase.storage
          .from('videos')
          .getPublicUrl(filename);

        return {
          success: true,
          url: publicUrlData.publicUrl,
          filename,
          originalName: file.name,
        };
      } catch (error) {
        console.error('Upload error:', error);
        return {
          success: false,
          message: '上传失败',
          error: error instanceof Error ? error.message : 'Unknown error',
        };
      }
    },
    delete: async (filename: string) => {
      try {
        const { error } = await supabase.storage
          .from('videos')
          .remove([filename]);

        if (error) {
          throw error;
        }

        return { success: true, message: '删除成功' };
      } catch (error) {
        console.error('Delete error:', error);
        return {
          success: false,
          message: '删除失败',
          error: error instanceof Error ? error.message : 'Unknown error',
        };
      }
    },
  },
};

async function compressVideo(file: File, ext: string, onProgress?: (progress: number) => void): Promise<File> {
  const ffmpeg = new FFmpeg();
  await ffmpeg.load();

  const inputPath = `input.${ext}`;
  const outputPath = `output.${ext}`;

  await ffmpeg.writeFile(inputPath, await fetchFile(file));

  const targetSize = MAX_FILE_SIZE * 0.9;
  const duration = await getVideoDuration(file);
  const targetBitrate = Math.floor((targetSize * 8) / duration / 1000);

  ffmpeg.on('progress', ({ progress }) => {
    if (onProgress) {
      onProgress(progress);
    }
  });

  await ffmpeg.exec([
    '-i', inputPath,
    '-b:v', `${targetBitrate}k`,
    '-maxrate', `${targetBitrate * 1.1}k`,
    '-bufsize', `${targetBitrate * 2}k`,
    '-c:a', 'aac',
    '-b:a', '128k',
    '-preset', 'medium',
    '-y',
    outputPath,
  ]);

  const data = await ffmpeg.readFile(outputPath);
  const blob = new Blob([data], { type: getContentType(ext) });

  return new File([blob], file.name, { type: getContentType(ext) });
}

function getVideoDuration(file: File): Promise<number> {
  return new Promise((resolve) => {
    const video = document.createElement('video');
    video.preload = 'metadata';
    video.onloadedmetadata = () => {
      resolve(video.duration || 60);
      URL.revokeObjectURL(video.src);
    };
    video.onerror = () => {
      resolve(60);
    };
    video.src = URL.createObjectURL(file);
  });
}

function getContentType(ext?: string): string {
  const types: { [key: string]: string } = {
    mp4: 'video/mp4',
    webm: 'video/webm',
    ogg: 'video/ogg',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    webp: 'image/webp',
    gif: 'image/gif',
    svg: 'image/svg+xml',
  };
  return types[ext?.toLowerCase() || ''] || 'application/octet-stream';
}
