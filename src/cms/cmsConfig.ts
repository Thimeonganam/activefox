export interface FieldConfig {
  key: 'title' | 'subtitle' | 'description' | 'content' | 'mediaUrl' | 'mediaUrl2';
  label: string;
  type: 'text' | 'textarea' | 'image' | 'richtext';
}

export interface BlockConfig {
  id: string;
  name: string;
  fields: FieldConfig[];
}

export interface PageConfig {
  id: string;
  title: string;
  path: string;
  blocks: BlockConfig[];
}

export const cmsPages: PageConfig[] = [
  {
    id: 'home',
    title: 'Trang Chủ',
    path: '/',
    blocks: [
      {
        id: 'hero',
        name: 'Hero Section',
        fields: [
          { key: 'title', label: 'Tiêu Đề Lớn', type: 'text' },
          { key: 'subtitle', label: 'Phụ Đề', type: 'text' },
          { key: 'description', label: 'Mô Tả', type: 'textarea' },
          { key: 'mediaUrl', label: 'Video / Ảnh Nền (URL)', type: 'image' }
        ]
      },
      {
        id: 'brand_intro',
        name: 'Định Vị (Tiêu Đề & Mô Tả)',
        fields: [
          { key: 'title', label: 'Tiêu Đề', type: 'text' },
          { key: 'description', label: 'Mô Tả', type: 'textarea' }
        ]
      },
      {
        id: 'brand_panel_1',
        name: 'Định Vị - Panel 1',
        fields: [
          { key: 'title', label: 'Tiêu Đề', type: 'text' },
          { key: 'subtitle', label: 'Phụ Đề', type: 'text' },
          { key: 'description', label: 'Nội Dung', type: 'textarea' },
          { key: 'mediaUrl', label: 'Hình Ảnh (URL)', type: 'image' }
        ]
      },
      {
        id: 'brand_panel_2',
        name: 'Định Vị - Panel 2',
        fields: [
          { key: 'title', label: 'Tiêu Đề', type: 'text' },
          { key: 'subtitle', label: 'Phụ Đề', type: 'text' },
          { key: 'description', label: 'Nội Dung', type: 'textarea' },
          { key: 'mediaUrl', label: 'Hình Ảnh (URL)', type: 'image' }
        ]
      },
      {
        id: 'brand_panel_3',
        name: 'Định Vị - Panel 3',
        fields: [
          { key: 'title', label: 'Tiêu Đề', type: 'text' },
          { key: 'subtitle', label: 'Phụ Đề', type: 'text' },
          { key: 'description', label: 'Nội Dung', type: 'textarea' },
          { key: 'mediaUrl', label: 'Hình Ảnh (URL)', type: 'image' }
        ]
      },
      {
        id: 'brand_panel_4',
        name: 'Định Vị - Panel 4',
        fields: [
          { key: 'title', label: 'Tiêu Đề', type: 'text' },
          { key: 'subtitle', label: 'Phụ Đề', type: 'text' },
          { key: 'description', label: 'Nội Dung', type: 'textarea' },
          { key: 'mediaUrl', label: 'Hình Ảnh (URL)', type: 'image' }
        ]
      }
    ]
  },
  {
    id: 'hybrid_training',
    title: 'Hybrid Training',
    path: '/bo-mon/hybrid-training',
    blocks: [
      {
        id: 'hero',
        name: 'Hero Section',
        fields: [
          { key: 'title', label: 'Tiêu Đề', type: 'text' },
          { key: 'description', label: 'Mô Tả Ngắn', type: 'textarea' }
        ]
      },
      {
        id: 'overview',
        name: 'Giới Thiệu (Lợi ích)',
        fields: [
          { key: 'title', label: 'Lợi Ích 1', type: 'text' },
          { key: 'description', label: 'Mô Tả 1', type: 'textarea' },
          { key: 'subtitle', label: 'Lợi Ích 2', type: 'text' },
          { key: 'content', label: 'Mô Tả 2', type: 'textarea' },
          { key: 'mediaUrl', label: 'Lợi Ích 3 (Text)', type: 'text' },
          { key: 'mediaUrl2', label: 'Mô Tả 3', type: 'textarea' }
        ]
      },
      {
        id: 'component_1',
        name: 'Lộ Trình - Bài 1',
        fields: [
          { key: 'title', label: 'Tên', type: 'text' },
          { key: 'description', label: 'Mô tả', type: 'textarea' },
          { key: 'mediaUrl', label: 'Hình Ảnh', type: 'image' }
        ]
      },
      {
        id: 'component_2',
        name: 'Lộ Trình - Bài 2',
        fields: [
          { key: 'title', label: 'Tên', type: 'text' },
          { key: 'description', label: 'Mô tả', type: 'textarea' },
          { key: 'mediaUrl', label: 'Hình Ảnh', type: 'image' }
        ]
      },
      {
        id: 'component_3',
        name: 'Lộ Trình - Bài 3',
        fields: [
          { key: 'title', label: 'Tên', type: 'text' },
          { key: 'description', label: 'Mô tả', type: 'textarea' },
          { key: 'mediaUrl', label: 'Hình Ảnh', type: 'image' }
        ]
      }
    ]
  },
  {
    id: 'fox_strength',
    title: 'Fox Strength',
    path: '/bo-mon/fox-strength',
    blocks: [
      {
        id: 'hero',
        name: 'Hero Section',
        fields: [
          { key: 'title', label: 'Tiêu Đề', type: 'text' },
          { key: 'description', label: 'Mô Tả Ngắn', type: 'textarea' },
          { key: 'mediaUrl', label: 'Hình Ảnh (URL)', type: 'image' }
        ]
      },
      {
        id: 'benefits',
        name: 'Lợi Ích Của Lớp',
        fields: [
          { key: 'title', label: 'Tiêu Đề Benefit 1', type: 'text' },
          { key: 'description', label: 'Mô tả Benefit 1', type: 'textarea' },
          { key: 'subtitle', label: 'Tiêu Đề Benefit 2', type: 'text' },
          { key: 'content', label: 'Mô tả Benefit 2', type: 'textarea' }
        ]
      },
      {
        id: 'program_1',
        name: 'Giáo Án Tập Luyện - Bài 1',
        fields: [
          { key: 'title', label: 'Tên Bài Tập', type: 'text' },
          { key: 'description', label: 'Mô tả bài tập', type: 'textarea' },
          { key: 'mediaUrl', label: 'Hình Ảnh', type: 'image' }
        ]
      },
      {
        id: 'program_2',
        name: 'Giáo Án Tập Luyện - Bài 2',
        fields: [
          { key: 'title', label: 'Tên Bài Tập', type: 'text' },
          { key: 'description', label: 'Mô tả bài tập', type: 'textarea' },
          { key: 'mediaUrl', label: 'Hình Ảnh', type: 'image' }
        ]
      },
      {
        id: 'program_3',
        name: 'Giáo Án Tập Luyện - Bài 3',
        fields: [
          { key: 'title', label: 'Tên Bài Tập', type: 'text' },
          { key: 'description', label: 'Mô tả bài tập', type: 'textarea' },
          { key: 'mediaUrl', label: 'Hình Ảnh', type: 'image' }
        ]
      }
    ]
  },
  {
    id: 'fox_run',
    title: 'Fox Run',
    path: '/bo-mon/fox-run',
    blocks: [
      {
        id: 'hero',
        name: 'Hero Section',
        fields: [
          { key: 'title', label: 'Tiêu Đề', type: 'text' },
          { key: 'mediaUrl', label: 'Hình Ảnh', type: 'image' }
        ]
      },
      {
        id: 'benefits',
        name: 'Lợi Ích',
        fields: [
          { key: 'title', label: 'Lợi Ích 1', type: 'text' },
          { key: 'description', label: 'Mô tả 1', type: 'textarea' },
          { key: 'subtitle', label: 'Lợi Ích 2', type: 'text' },
          { key: 'content', label: 'Mô tả 2', type: 'textarea' },
          { key: 'mediaUrl', label: 'Lợi Ích 3', type: 'text' },
          { key: 'mediaUrl2', label: 'Mô tả 3', type: 'textarea' }
        ]
      },
      {
        id: 'program_1',
        name: 'Giáo Trình - Bài 1',
        fields: [
          { key: 'title', label: 'Tên Bài Tập', type: 'text' },
          { key: 'description', label: 'Mô tả', type: 'textarea' },
          { key: 'mediaUrl', label: 'Hình Ảnh', type: 'image' }
        ]
      },
      {
        id: 'program_2',
        name: 'Giáo Trình - Bài 2',
        fields: [
          { key: 'title', label: 'Tên Bài Tập', type: 'text' },
          { key: 'description', label: 'Mô tả', type: 'textarea' },
          { key: 'mediaUrl', label: 'Hình Ảnh', type: 'image' }
        ]
      },
      {
        id: 'program_3',
        name: 'Giáo Trình - Bài 3',
        fields: [
          { key: 'title', label: 'Tên Bài Tập', type: 'text' },
          { key: 'description', label: 'Mô tả', type: 'textarea' },
          { key: 'mediaUrl', label: 'Hình Ảnh', type: 'image' }
        ]
      }
    ]
  },
  {
    id: 'hyrox',
    title: 'Hyrox Class',
    path: '/bo-mon/hyrox',
    blocks: [
      {
        id: 'hero',
        name: 'Hero Section',
        fields: [
          { key: 'title', label: 'Tiêu Đề', type: 'text' },
          { key: 'description', label: 'Mô Tả Ngắn', type: 'textarea' }
        ]
      },
      {
        id: 'overview',
        name: 'Giới Thiệu',
        fields: [
          { key: 'title', label: 'Tiêu Đề Lớn', type: 'text' },
          { key: 'description', label: 'Nội dung', type: 'textarea' }
        ]
      },
      {
        id: 'station_1',
        name: 'Trạm 1 (Sled Push)',
        fields: [
          { key: 'title', label: 'Tên Trạm', type: 'text' },
          { key: 'subtitle', label: 'Ý Nghĩa', type: 'text' },
          { key: 'description', label: 'Mô tả', type: 'textarea' },
          { key: 'mediaUrl', label: 'Hình Ảnh', type: 'image' }
        ]
      },
      {
        id: 'station_2',
        name: 'Trạm 2 (Burpee)',
        fields: [
          { key: 'title', label: 'Tên Trạm', type: 'text' },
          { key: 'subtitle', label: 'Ý Nghĩa', type: 'text' },
          { key: 'description', label: 'Mô tả', type: 'textarea' },
          { key: 'mediaUrl', label: 'Hình Ảnh', type: 'image' }
        ]
      },
      {
        id: 'station_3',
        name: 'Trạm 3 (Rowing)',
        fields: [
          { key: 'title', label: 'Tên Trạm', type: 'text' },
          { key: 'subtitle', label: 'Ý Nghĩa', type: 'text' },
          { key: 'description', label: 'Mô tả', type: 'textarea' },
          { key: 'mediaUrl', label: 'Hình Ảnh', type: 'image' }
        ]
      },
      {
        id: 'station_4',
        name: 'Trạm 4 (Weight)',
        fields: [
          { key: 'title', label: 'Tên Trạm', type: 'text' },
          { key: 'subtitle', label: 'Ý Nghĩa', type: 'text' },
          { key: 'description', label: 'Mô tả', type: 'textarea' },
          { key: 'mediaUrl', label: 'Hình Ảnh', type: 'image' }
        ]
      }
    ]
  },
  {
    id: 'do_khop',
    title: 'Độ Khớp',
    path: '/bo-mon/do-khop',
    blocks: [
      {
        id: 'hero',
        name: 'Hero Section',
        fields: [
          { key: 'title', label: 'Tiêu Đề', type: 'text' },
          { key: 'description', label: 'Mô Tả Ngắn', type: 'textarea' },
          { key: 'subtitle', label: 'Slogan nhỏ', type: 'text' },
          { key: 'mediaUrl', label: 'Hình Ảnh', type: 'image' }
        ]
      },
      {
        id: 'overview',
        name: 'Giới thiệu & Quy Trình',
        fields: [
          { key: 'title', label: 'Tiêu Đề Lớn', type: 'text' },
          { key: 'subtitle', label: 'Mô Tả Trên', type: 'text' },
          { key: 'description', label: 'Số liệu 1', type: 'text' },
          { key: 'content', label: 'Mô tả số liệu 1', type: 'text' },
          { key: 'mediaUrl', label: 'Số liệu 2', type: 'text' },
          { key: 'mediaUrl2', label: 'Mô tả số liệu 2', type: 'text' }
        ]
      },
      {
        id: 'program_1',
        name: 'Chương Trình 1',
        fields: [
          { key: 'title', label: 'Tên', type: 'text' },
          { key: 'description', label: 'Mô tả', type: 'textarea' },
          { key: 'mediaUrl', label: 'Hình Ảnh', type: 'image' }
        ]
      },
      {
        id: 'program_2',
        name: 'Chương Trình 2',
        fields: [
          { key: 'title', label: 'Tên', type: 'text' },
          { key: 'description', label: 'Mô tả', type: 'textarea' },
          { key: 'mediaUrl', label: 'Hình Ảnh', type: 'image' }
        ]
      },
      {
        id: 'program_3',
        name: 'Chương Trình 3',
        fields: [
          { key: 'title', label: 'Tên', type: 'text' },
          { key: 'description', label: 'Mô tả', type: 'textarea' },
          { key: 'mediaUrl', label: 'Hình Ảnh', type: 'image' }
        ]
      }
    ]
  },
  {
    id: 'recovery',
    title: 'Trị Liệu & Phục Hồi',
    path: '/tri-lieu',
    blocks: [
      {
        id: 'hero',
        name: 'Hero Section',
        fields: [
          { key: 'title', label: 'Tiêu Đề', type: 'text' },
          { key: 'description', label: 'Mô Tả Ngắn', type: 'textarea' },
          { key: 'mediaUrl', label: 'Ảnh Banner', type: 'image' }
        ]
      },
      {
        id: 'wellbeing',
        name: 'Well-being Services',
        fields: [
          { key: 'title', label: 'Tiêu Đề', type: 'text' },
          { key: 'description', label: 'Mô Tả', type: 'textarea' }
        ]
      },
      {
        id: 'tech',
        name: 'High-Tech Services',
        fields: [
          { key: 'title', label: 'Tiêu Đề', type: 'text' },
          { key: 'description', label: 'Mô Tả', type: 'textarea' }
        ]
      }
    ]
  },
  {
    id: 'massage_therapy',
    title: 'Massage Trị Liệu',
    path: '/dich-vu/massage-tri-lieu',
    blocks: [
      {
        id: 'hero',
        name: 'Hero Section',
        fields: [
          { key: 'title', label: 'Tiêu Đề', type: 'text' },
          { key: 'subtitle', label: 'Phụ Đề', type: 'text' },
          { key: 'mediaUrl', label: 'Ảnh Banner', type: 'image' }
        ]
      },
      {
        id: 'overview',
        name: 'Tổng Quan',
        fields: [
          { key: 'title', label: 'Tiêu Đề Lớn', type: 'text' },
          { key: 'description', label: 'Mô Tả', type: 'textarea' },
          { key: 'mediaUrl', label: 'Hình Ảnh', type: 'image' }
        ]
      },
      {
        id: 'services',
        name: 'Chi Tiết Dịch Vụ',
        fields: [
          { key: 'title', label: 'Tiêu Đề', type: 'text' },
          { key: 'description', label: 'Mô Tả', type: 'textarea' }
        ]
      }
    ]
  },
  {
    id: 'coaching',
    title: 'Đội Ngũ HLV',
    path: '/huan-luyen-vien',
    blocks: [
      {
        id: 'hero',
        name: 'Hero Banner',
        fields: [
          { key: 'title', label: 'Tiêu Đề', type: 'text' }
        ]
      }
    ]
  }
];
