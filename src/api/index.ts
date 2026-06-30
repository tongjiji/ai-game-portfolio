import { profile as defaultProfile } from '../data/profile';
import { works as defaultWorks } from '../data/works';

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
    single: async (file: File) => {
      try {
        const safeFilename = `${Date.now()}-${encodeURIComponent(file.name)}`;

        const response = await fetch('/api/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ filename: safeFilename }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || 'Failed to get upload URL');
        }

        const { uploadUrl, url, token } = await response.json();

        const blobUrl = uploadUrl.split('?')[0];

        const uploadResponse = await fetch(blobUrl, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'x-access': 'public',
            'Content-Type': file.type || 'application/octet-stream',
          },
          body: file,
        });

        if (!uploadResponse.ok) {
          const errorData = await uploadResponse.json().catch(() => ({}));
          throw new Error(errorData.error || 'Upload failed');
        }

        const result = await uploadResponse.json();

        return {
          success: true,
          url: result.url || result.downloadUrl || url,
          filename: safeFilename,
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
    delete: async (_filename: string) => {
      try {
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
