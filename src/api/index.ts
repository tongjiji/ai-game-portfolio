import { profile as defaultProfile } from '../data/profile';
import { works as defaultWorks } from '../data/works';
import type { VideoWork } from '../data/works';

export const api = {
  profile: {
    get: async () => {
      return defaultProfile;
    },
    update: async (_data: any) => {
      return { success: true, message: '个人信息更新成功' };
    },
  },
  works: {
    get: async (id?: string): Promise<VideoWork[] | VideoWork | null> => {
      if (id) {
        const work = defaultWorks.find(w => w.id === id);
        return work || null;
      }
      return defaultWorks;
    },
    create: async (_data: any) => {
      return { success: true, message: '作品添加成功', data: null };
    },
    update: async (_id: string, _data: any) => {
      return { success: true, message: '作品更新成功' };
    },
    delete: async (_id: string) => {
      return { success: true, message: '作品删除成功' };
    },
  },
  upload: {
    single: async (_file: File) => {
      return { success: true, url: '/uploads/test.mp4', filename: 'test.mp4', originalName: 'test.mp4', size: 0 };
    },
    delete: async (_filename: string) => {
      return { success: true, message: '文件删除成功' };
    },
  },
};
