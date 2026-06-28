export interface Category {
  id: string;
  name: string;
  icon: string;
}

export const categories: Category[] = [
  { id: 'all', name: '全部作品', icon: 'Grid3X3' },
  { id: '创意短片', name: '创意短片', icon: 'Film' },
  { id: '营销视频', name: '营销视频', icon: 'TrendingUp' },
  { id: '虚拟人视频', name: '虚拟人视频', icon: 'User' },
  { id: '动画短片', name: '动画短片', icon: 'Sparkles' },
];

export const aiModels = [
  { id: 'all', name: '全部模型' },
  { id: 'Runway', name: 'Runway' },
  { id: '可灵', name: '可灵' },
  { id: '即梦', name: '即梦' },
  { id: 'Omni', name: 'Omni' },
];
