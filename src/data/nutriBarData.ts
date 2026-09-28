export interface FlavorItem {
  id: string;
  name: string;
  vietnameseName: string;
  tagline: string;
  colorName: string;
  colorHex: string;
  bgClass: string;
  borderClass: string;
  badgeBg: string;
  badgeText: string;
  calories: number;
  protein: string;
  fiber: string;
  carbs: string;
  fat: string;
  sugar: string;
  description: string;
  ingredients: string[];
  bestMoment: string;
  tasteNote: string;
}

export interface MomentItem {
  id: string;
  step: string;
  timeRange: string;
  title: string;
  quote: string;
  description: string;
  flavorId: string;
  flavorName: string;
  weight: string;
  icon: string;
  colorAccent: string;
  bgClass: string;
  borderClass: string;
  tagClass: string;
}

export interface PackageItem {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  priceFormatted: string;
  image: string;
  badge: string;
  isPopular?: boolean;
  description: string;
  benefits: string[];
  buttonText: string;
  unitWeight: string;
  savingsNote?: string;
}

export const FLAVORS_DATA: FlavorItem[] = [
  {
    id: 'yellow',
    name: 'Vàng Nắng',
    vietnameseName: 'Yến Mạch Xoài',
    tagline: 'Tươi tắn, thanh nhẹ, nạp năng lượng tinh mơ',
    colorName: 'VÀNG NẮNG',
    colorHex: '#facc15',
    bgClass: 'bg-amber-50/80',
    borderClass: 'border-amber-200',
    badgeBg: 'bg-amber-100',
    badgeText: 'text-amber-900',
    calories: 148,
    protein: '7.5g',
    fiber: '4.2g',
    carbs: '18.0g',
    fat: '4.8g',
    sugar: '3.2g tự nhiên',
    description: 'Vị ngọt thanh tự nhiên từ xoài sấy dẻo nhiệt đới hòa quyện cùng yến mạch xốp giòn và sữa tươi Vinamilk. Hương vị thơm mát, kích thích vị giác vào buổi sáng sớm.',
    ingredients: ['Yến mạch nguyên cám 42%', 'Xoài sấy dẻo 18%', 'Đạm whey sữa Vinamilk 15%', 'Mật ong hoa rừng', 'Hạt hướng dương', 'Hạt chia hữu cơ'],
    bestMoment: '07:00 - 09:00 (Buổi sáng khởi động)',
    tasteNote: 'Chua ngọt dịu dàng, giòn bùi nhẹ nhàng, thơm ngậy mùi sữa'
  },
  {
    id: 'orange',
    name: 'Cam Ấm',
    vietnameseName: 'Mơ Sấy & Hạt',
    tagline: 'Chắc dạ êm bụng, êm ái xua tan cồn cào',
    colorName: 'CAM ẤM',
    colorHex: '#fb923c',
    bgClass: 'bg-orange-50/80',
    borderClass: 'border-orange-200',
    badgeBg: 'bg-orange-100',
    badgeText: 'text-orange-900',
    calories: 152,
    protein: '8.0g',
    fiber: '4.5g',
    carbs: '17.5g',
    fat: '5.2g',
    sugar: '3.0g tự nhiên',
    description: 'Sự kết hợp hoàn hảo giữa mơ sấy chua ngọt dẻo thơm, hạt điều béo ngậy và đạm sữa thượng hạng giúp ổn định dạ dày giữa buổi làm việc.',
    ingredients: ['Yến mạch nguyên cám 38%', 'Mơ vàng sấy dẻo 16%', 'Hạt điều rang mộc 14%', 'Protein sữa 15%', 'Bơ cacao tự nhiên'],
    bestMoment: '10:00 - 11:30 (Giữa giờ làm việc)',
    tasteNote: 'Vị chua thanh của mơ cân bằng cùng vị bùi béo hạt điều'
  },
  {
    id: 'green',
    name: 'Xanh Lá',
    vietnameseName: 'Matcha Ngũ Cốc',
    tagline: 'Tỉnh táo tập trung, cân bằng áp lực deadline',
    colorName: 'XANH LÁ',
    colorHex: '#4ade80',
    bgClass: 'bg-emerald-50/80',
    borderClass: 'border-emerald-200',
    badgeBg: 'bg-emerald-100',
    badgeText: 'text-emerald-900',
    calories: 145,
    protein: '7.8g',
    fiber: '5.0g',
    carbs: '16.8g',
    fat: '4.6g',
    sugar: '2.8g tự nhiên',
    description: 'Bột matcha thượng hạng thanh lọc cùng phức hợp ngũ cốc nguyên hạt đem đến sự tỉnh táo kéo dài mà không gây run tay hay tụt năng lượng.',
    ingredients: ['Bột trà xanh Matcha nguyên chất', 'Gạo lứt đỏ sấy giòn', 'Yến mạch cán dẹt', 'Đạm sữa Vinamilk', 'Hạnh nhân lát'],
    bestMoment: '12:30 - 15:00 (Đang bận giờ trưa)',
    tasteNote: 'Thanh mát sâu lắng, hơi chát nhẹ đầu lưỡi, hậu vị ngọt bùi'
  },
  {
    id: 'cyan',
    name: 'Cyan Blue',
    vietnameseName: 'Việt Quất Tự Nhiên',
    tagline: 'Tươi mát bứt phá, xua tan cơn buồn ngủ xế chiều',
    colorName: 'CYAN BLUE',
    colorHex: '#38bdf8',
    bgClass: 'bg-sky-50/80',
    borderClass: 'border-sky-200',
    badgeBg: 'bg-sky-100',
    badgeText: 'text-sky-900',
    calories: 149,
    protein: '8.2g',
    fiber: '4.8g',
    carbs: '17.2g',
    fat: '4.7g',
    sugar: '3.4g tự nhiên',
    description: 'Việt quất Bắc Mỹ giàu chất chống oxy hóa anthocyanin phối trộn cùng đạm sữa tinh khiết, mang lại làn gió sảng khoái đánh thức mọi giác quan.',
    ingredients: ['Việt quất sấy lạnh 20%', 'Yến mạch Úc nguyên cám', 'Hạt bí ngô xanh', 'Protein sữa thủy phân', 'Dầu dừa ép lạnh'],
    bestMoment: '15:30 - 17:00 (Buổi chiều xế)',
    tasteNote: 'Mọng nước thơm nồng quả mọng, kích thích năng lượng tập trung'
  },
  {
    id: 'purple',
    name: 'Tím Nhạt',
    vietnameseName: 'Dâu Rừng Hạt Dẻ',
    tagline: 'Nạp nhanh bền bỉ, sẵn sàng bùng nổ thể lực',
    colorName: 'TÍM NHẠT',
    colorHex: '#c084fc',
    bgClass: 'bg-purple-50/80',
    borderClass: 'border-purple-200',
    badgeBg: 'bg-purple-100',
    badgeText: 'text-purple-900',
    calories: 156,
    protein: '9.0g',
    fiber: '4.6g',
    carbs: '16.5g',
    fat: '5.8g',
    sugar: '3.1g tự nhiên',
    description: 'Hàm lượng protein nâng cấp lên 9g cùng hạt dẻ bùi béo và dâu rừng thơm ngọt, chuẩn bị thể lực sung mãn cho buổi chạy bộ hay tập gym.',
    ingredients: ['Dâu rừng sấy dẻo 17%', 'Hạt dẻ cười nghiền thô', 'Protein cô đặc từ sữa 18%', 'Yến mạch hữu cơ', 'Hạt macca'],
    bestMoment: '17:30 - 19:00 (Trước hoạt động thể thao)',
    tasteNote: 'Đậm đà quả dâu, giòn ngậy hạt dẻ, đầm bụng nhưng nhẹ dạ'
  },
  {
    id: 'navy',
    name: 'Navy Đậm',
    vietnameseName: 'Socola Đen Hạnh Nhân',
    tagline: 'Vỗ về thư thái, thưởng thức êm dịu cuối ngày',
    colorName: 'NAVY ĐẬM',
    colorHex: '#004B9B',
    bgClass: 'bg-blue-50/80',
    borderClass: 'border-blue-200',
    badgeBg: 'bg-blue-100',
    badgeText: 'text-blue-900',
    calories: 154,
    protein: '8.5g',
    fiber: '5.2g',
    carbs: '15.9g',
    fat: '5.9g',
    sugar: '2.5g tự nhiên',
    description: 'Cacao đen nguyên chất 70% giàu flavonoid kết hợp cùng hạnh nhân rang giòn và đạm sữa êm mượt, xoa dịu thần kinh sau một ngày dài bận rộn.',
    ingredients: ['Cacao đen nguyên chất 70%', 'Hạnh nhân nướng mộc 16%', 'Đạm casein từ sữa Vinamilk', 'Yến mạch cám mịn', 'Vanilla tự nhiên'],
    bestMoment: '20:30 - 22:00 (Cuối ngày thư giãn)',
    tasteNote: 'Đắng nhẹ quyến rũ của cacao đen, giòn tan hạnh nhân, ngọt hậu'
  }
];

export const MOMENTS_DATA: MomentItem[] = [
  {
    id: '01',
    step: '01',
    timeRange: '07:00 - 09:00',
    title: 'BUỔI SÁNG',
    quote: '“Sáng đủ chất, ngày đủ lực”',
    description: 'Khởi động ngày mới tinh khôi, cung cấp nguồn năng lượng sạch giúp bạn tự tin bước vào những cuộc họp sáng mà không lo đói cồn cào.',
    flavorId: 'yellow',
    flavorName: 'Vị Vàng Yến Mạch Xoài',
    weight: '35g',
    icon: 'wb_sunny',
    colorAccent: 'text-[#ca8a04]',
    bgClass: 'bg-amber-50/60',
    borderClass: 'border-amber-200/70',
    tagClass: 'bg-amber-100 text-amber-900'
  },
  {
    id: '02',
    step: '02',
    timeRange: '10:00 - 11:30',
    title: 'GIỮA GIỜ',
    quote: '“Giữa giờ, đừng để bụng chờ”',
    description: 'Khi dạ dày bắt đầu lên tiếng trước giờ cơm trưa, một thanh nhỏ giúp xoa dịu cơn đói tức thì mà không làm đầy hơi hay nặng bụng.',
    flavorId: 'orange',
    flavorName: 'Vị Cam Mơ Sấy & Hạt',
    weight: '35g',
    icon: 'laptop_mac',
    colorAccent: 'text-[#ea580c]',
    bgClass: 'bg-orange-50/60',
    borderClass: 'border-orange-200/70',
    tagClass: 'bg-orange-100 text-orange-900'
  },
  {
    id: '03',
    step: '03',
    timeRange: '12:30 - 15:00',
    title: 'ĐANG BẬN',
    quote: '“Bận vẫn ăn, khỏe vẫn làm”',
    description: 'Khi công việc dồn dập, ăn trưa qua loa bên bàn phím. NUTRI BAR tiếp tế đạm và ngũ cốc lành mạnh để bạn duy trì hiệu suất cao.',
    flavorId: 'green',
    flavorName: 'Vị Xanh Matcha Ngũ Cốc',
    weight: '35g',
    icon: 'work',
    colorAccent: 'text-[#16a34a]',
    bgClass: 'bg-emerald-50/60',
    borderClass: 'border-emerald-200/70',
    tagClass: 'bg-emerald-100 text-emerald-900'
  },
  {
    id: '04',
    step: '04',
    timeRange: '15:30 - 17:00',
    title: 'BUỔI CHIỀU',
    quote: '“Chiều xuống, năng lượng lên”',
    description: 'Đánh tan cơn uể oải giờ xế chiều với việt quất thanh mát, lấy lại sự tập trung tỉnh táo để bứt phá những deadline chót của ngày.',
    flavorId: 'cyan',
    flavorName: 'Vị Cyan Việt Quất Tự Nhiên',
    weight: '35g',
    icon: 'local_cafe',
    colorAccent: 'text-[#0284c7]',
    bgClass: 'bg-sky-50/60',
    borderClass: 'border-sky-200/70',
    tagClass: 'bg-sky-100 text-sky-900'
  },
  {
    id: '05',
    step: '05',
    timeRange: '17:30 - 19:00',
    title: 'TRƯỚC HOẠT ĐỘNG',
    quote: '“Nạp nhanh, sẵn sàng chiến”',
    description: '30 phút trước buổi tập thể thao, gym hay chạy bộ. Nguồn năng lượng giải phóng tức thì giúp cơ bắp sẵn sàng bùng nổ sức mạnh.',
    flavorId: 'purple',
    flavorName: 'Vị Tím Dâu Rừng & Hạt Dẻ',
    weight: '35g',
    icon: 'fitness_center',
    colorAccent: 'text-[#9333ea]',
    bgClass: 'bg-purple-50/60',
    borderClass: 'border-purple-200/70',
    tagClass: 'bg-purple-100 text-purple-900'
  },
  {
    id: '06',
    step: '06',
    timeRange: '20:30 - 22:00',
    title: 'CUỐI NGÀY',
    quote: '“Ngày dài rồi, nhớ chăm mình”',
    description: 'Khép lại một ngày nhiều nỗ lực với socola đen đậm vị sang trọng, vỗ về dạ dày nhẹ nhàng trước khi bước vào giấc ngủ an lành.',
    flavorId: 'navy',
    flavorName: 'Vị Socola Đen & Hạnh Nhân',
    weight: '35g',
    icon: 'bedtime',
    colorAccent: 'text-[#004B9B]',
    bgClass: 'bg-blue-50/60',
    borderClass: 'border-blue-200/70',
    tagClass: 'bg-blue-100 text-blue-900'
  }
];

export const PACKAGES_DATA: PackageItem[] = [
  {
    id: 'single',
    title: 'THANH ĐƠN · 35G',
    subtitle: 'Trải nghiệm thử',
    price: 18000,
    priceFormatted: '18.000',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBh7sTaPwzSa8Flbhxv4G3yQXHJk8eZbN1syuB-zMohLVNMsecUdMljn6iLtjlrUQcjUaLBQSVXEId9YRNVhb_ycctReC3nMRF5_n0MtIg6Nr1z_IM-Kfq65pc20F9iWsz2hPcrE2uOb9ACz5vTqIrQPWStVeJf4L1XlJez9fRlXnqYiRs2eNeJhvyVYdoPmqnYnIDm1lqCSCSP03X4HZ1eWhXppTcTTmdykub5hvcwu9yId4tlzpYDPMbWE1Mx8lzixw',
    badge: '1 Thanh 35g',
    description: 'Một lựa chọn nhanh gọn cho những lúc cần ăn nhẹ tức thì mà không cần mua số lượng lớn.',
    benefits: [
      'Tùy chọn 1 trong 6 hương vị',
      'Gọn gàng trong túi áo, balo',
      'Nạp ngay 150 kcal sạch'
    ],
    buttonText: 'MUA 1 THANH',
    unitWeight: '35g'
  },
  {
    id: 'box-6',
    title: 'HỘP 6 THANH',
    subtitle: 'Trọn vẹn 1 ngày cùng bạn',
    price: 99000,
    priceFormatted: '99.000',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCB5_GiMmnus2qMtC0rB0oTQfUPvNc9b_Di76eHZYiILjDwQkylhCDNdMAtie6r8RIUkVkpERSMp-DDmwZJWP3ziua9q_GuiOYQ1zVruqxiXIPU1amtlp_sfLI44aKtIy28vpTIzJUIVa8cAnbm1drntsiS7MIdIDt8Uw8cj_T94QR_rxdgGSiuv-TiBl4JGdwuDfMdr5vPB5ZPgYLcLvssH25n5WgW0Kg624sQV6nLiNTt9bcomJpxwhwQ0uRMZo6fKA',
    badge: 'Hộp Trọn Vẹn 6 Vị',
    isPopular: true,
    description: '6 thanh · 6 màu · 6 khoảnh khắc. Lựa chọn khuyên dùng cho trải nghiệm trọn vẹn cả ngày dài năng động.',
    benefits: [
      'Đầy đủ 6 hương vị độc bản',
      'Hộp quà tặng thẩm mỹ cao cấp',
      'Tặng cẩm nang dinh dưỡng bỏ túi',
      'Tiết kiệm 9.000đ so với mua lẻ'
    ],
    buttonText: 'CHỌN HỘP 6 THANH',
    unitWeight: '210g (6 x 35g)',
    savingsNote: 'Tiết kiệm 9.000đ'
  },
  {
    id: 'carton-24',
    title: 'THÙNG 4 HỘP · 24 THANH',
    subtitle: 'Tiết kiệm cả tuần',
    price: 360000,
    priceFormatted: '360.000',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCh59qfDpljFO9IsFqomGwygGirGXs7Xxih_2LaW2cCWjDayJoOJ9EBfOpDMivlozOibpc37tRhsqwg_XYEpoo_gE9Z9LwoiXjKNoYTyzSuE_5WN_UCjycZP98mZFCjnKFkCp7d1sOGC_tZINlHJrC0DT9QYiXnGZ4r0DWUBmF6cgArv-lrc9g9zPFMvq1e34YbnEBiOQ-pt6-Hm1daAEnVHA1xKi88LZkmlWZ7XjhtKoCpp9mqvZclKAolBHB3c53ppQ',
    badge: 'MIỄN PHÍ VẬN CHUYỂN',
    description: 'Tiết kiệm chi phí tối đa cho thói quen dinh dưỡng đều đặn mỗi tuần của gia đình và văn phòng.',
    benefits: [
      'Gồm 4 hộp nguyên vẹn (24 thanh)',
      'Tối ưu chi phí tiết kiệm 15%',
      'Giao hàng tận nơi miễn phí toàn quốc'
    ],
    buttonText: 'CHỌN THÙNG 24 THANH',
    unitWeight: '840g Net (24 x 35g)',
    savingsNote: 'Tiết kiệm 72.000đ'
  }
];

export interface CartItem {
  id: string;
  packageId: string;
  title: string;
  price: number;
  quantity: number;
  flavorVariant?: string;
  image: string;
  weight: string;
}
