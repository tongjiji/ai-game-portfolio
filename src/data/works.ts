export interface VideoWork {
  id: string;
  title: string;
  description: string;
  coverUrl: string;
  videoUrl: string;
  category: string;
  aiModel: string;
  createdAt: string;
  tags: string[];
  details: {
    concept: string;
    tools: string[];
    scene: string;
  };
}

export const works: VideoWork[] = [
  {
    id: '1',
    title: '未来城市漫游',
    description: '探索AI生成的赛博朋克都市景观，展现未来科技与艺术的完美融合',
    coverUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=futuristic%20cyberpunk%20city%20neon%20lights%20night%20scene%20cinematic&image_size=landscape_16_9',
    videoUrl: 'https://thftfh6tw.hd-bkt.clouddn.com/喷雾.mp4',
    category: '创意短片',
    aiModel: 'Runway',
    createdAt: '2024-01-15',
    tags: ['赛博朋克', '城市景观', 'AI生成'],
    details: {
      concept: '通过AI技术构建一个充满未来感的虚拟城市，融合霓虹灯光与建筑美学，营造沉浸式的视觉体验',
      tools: ['Runway Gen-2', 'Midjourney', 'DaVinci Resolve'],
      scene: '个人创意项目，展示AI视频生成能力'
    }
  },
  {
    id: '2',
    title: '品牌概念宣传片',
    description: '为科技品牌打造的概念宣传片，展现产品的创新设计与未来愿景',
    coverUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20tech%20product%20concept%20minimalist%20futuristic%20lighting&image_size=landscape_16_9',
    videoUrl: 'https://thftfh6tw.hd-bkt.clouddn.com/山.mp4',
    category: '营销视频',
    aiModel: '可灵',
    createdAt: '2024-01-10',
    tags: ['品牌宣传', '科技产品', '概念设计'],
    details: {
      concept: '运用AI工具快速生成品牌视觉概念，展现产品的科技感与设计美学',
      tools: ['可灵 AI', 'After Effects', 'Cinema 4D'],
      scene: '商业合作项目，为科技初创公司制作品牌素材'
    }
  },
  {
    id: '3',
    title: '虚拟人访谈实录',
    description: 'AI驱动的虚拟人物访谈，探讨人工智能与创意产业的未来发展',
    coverUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=realistic%20AI%20virtual%20human%20portrait%20digital%20art%20futuristic&image_size=landscape_16_9',
    videoUrl: 'https://thftfh6tw.hd-bkt.clouddn.com/山2.mp4',
    category: '虚拟人视频',
    aiModel: '即梦',
    createdAt: '2024-01-05',
    tags: ['虚拟人', '访谈', 'AI对话'],
    details: {
      concept: '通过AI虚拟人技术创建真实感对话场景，探索人机交互的新可能性',
      tools: ['即梦 AI', 'Character Creator', 'OBS Studio'],
      scene: '技术探索项目，展示AI虚拟人应用潜力'
    }
  },
  {
    id: '4',
    title: '梦境探索动画',
    description: '基于AI生成的奇幻动画短片，带领观众进入一个超现实的梦境世界',
    coverUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=surreal%20dream%20landscape%20fantasy%20colorful%20abstract%20art&image_size=landscape_16_9',
    videoUrl: 'https://thftfh6tw.hd-bkt.clouddn.com/当我成功千....mp4',
    category: '动画短片',
    aiModel: 'Runway',
    createdAt: '2024-01-01',
    tags: ['动画', '奇幻', '梦境'],
    details: {
      concept: '利用AI生成逐帧动画素材，结合传统动画技术，打造独特的视觉风格',
      tools: ['Runway Gen-2', 'Blender', 'Premiere Pro'],
      scene: '个人艺术创作，探索AI与动画的结合'
    }
  },
  {
    id: '5',
    title: '产品展示短片',
    description: '为消费电子品牌制作的产品展示视频，突出产品细节与使用场景',
    coverUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=consumer%20electronics%20product%20showcase%20clean%20studio%20lighting&image_size=landscape_16_9',
    videoUrl: 'https://thftfh6tw.hd-bkt.clouddn.com/水印麻绕龙.mp4',
    category: '营销视频',
    aiModel: '可灵',
    createdAt: '2023-12-28',
    tags: ['产品展示', '消费电子', '品牌内容'],
    details: {
      concept: '结合AI生成背景与真实产品拍摄，打造高质量的产品展示内容',
      tools: ['可灵 AI', 'C4D', 'After Effects'],
      scene: '商业项目，为消费电子品牌制作营销素材'
    }
  },
  {
    id: '6',
    title: 'AI艺术家纪录片',
    description: '记录AI艺术创作过程的纪录片，展示从构思到成品的完整流程',
    coverUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=artist%20workspace%20creative%20studio%20digital%20art%20tools&image_size=landscape_16_9',
    videoUrl: 'https://thftfh6tw.hd-bkt.clouddn.com/水印麻绕龙2.mp4',
    category: '创意短片',
    aiModel: '即梦',
    createdAt: '2023-12-20',
    tags: ['纪录片', '创作过程', 'AI艺术'],
    details: {
      concept: '通过记录方式展现AI艺术创作的独特魅力，让观众了解AI创作的幕后故事',
      tools: ['即梦 AI', 'Final Cut Pro', 'ScreenFlow'],
      scene: '个人纪录片项目'
    }
  }
];

export const featuredWorks = works.slice(0, 4);
