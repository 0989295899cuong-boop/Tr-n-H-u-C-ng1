import React, { useState } from 'react';
import {
  FLAVORS_DATA,
  MOMENTS_DATA,
  PACKAGES_DATA,
  FlavorItem,
  CartItem,
} from './data/nutriBarData';
import { Navbar } from './components/Navbar';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { FlavorDetailModal } from './components/FlavorDetailModal';
import { SingleBarPickerModal } from './components/SingleBarPickerModal';
import { Toast } from './components/Toast';

export default function App() {
  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'initial-box6',
      packageId: 'box-6',
      title: 'Hộp 6 Thanh Vinamilk Nutri Bar',
      price: 99000,
      quantity: 1,
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCB5_GiMmnus2qMtC0rB0oTQfUPvNc9b_Di76eHZYiILjDwQkylhCDNdMAtie6r8RIUkVkpERSMp-DDmwZJWP3ziua9q_GuiOYQ1zVruqxiXIPU1amtlp_sfLI44aKtIy28vpTIzJUIVa8cAnbm1drntsiS7MIdIDt8Uw8cj_T94QR_rxdgGSiuv-TiBl4JGdwuDfMdr5vPB5ZPgYLcLvssH25n5WgW0Kg624sQV6nLiNTt9bcomJpxwhwQ0uRMZo6fKA',
      weight: '210g (6x35g)',
    },
  ]);

  // Modal states
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedFlavorModal, setSelectedFlavorModal] = useState<FlavorItem | null>(null);
  const [isSinglePickerOpen, setIsSinglePickerOpen] = useState(false);

  // Active moment filter or routine highlight
  const [activeMomentId, setActiveMomentId] = useState<string>('01');

  // Newsletter Email state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Cart actions
  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    setToastMessage('Đã xóa sản phẩm khỏi giỏ hàng');
  };

  const handleAddFlavorToCart = (flavor: FlavorItem, quantity: number = 1) => {
    const itemId = `single-${flavor.id}`;
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === itemId);
      if (existing) {
        return prev.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          id: itemId,
          packageId: 'single',
          title: `Thanh Nutri Bar 35g - ${flavor.vietnameseName}`,
          price: 18000,
          quantity: quantity,
          flavorVariant: `${flavor.colorName} (${flavor.vietnameseName})`,
          image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuBh7sTaPwzSa8Flbhxv4G3yQXHJk8eZbN1syuB-zMohLVNMsecUdMljn6iLtjlrUQcjUaLBQSVXEId9YRNVhb_ycctReC3nMRF5_n0MtIg6Nr1z_IM-Kfq65pc20F9iWsz2hPcrE2uOb9ACz5vTqIrQPWStVeJf4L1XlJez9fRlXnqYiRs2eNeJhvyVYdoPmqnYnIDm1lqCSCSP03X4HZ1eWhXppTcTTmdykub5hvcwu9yId4tlzpYDPMbWE1Mx8lzixw',
          weight: '35g',
        },
      ];
    });
    setToastMessage(`Đã thêm ${quantity} thanh ${flavor.vietnameseName} vào giỏ hàng!`);
  };

  const handleAddPackageToCart = (packageId: string) => {
    if (packageId === 'single') {
      setIsSinglePickerOpen(true);
      return;
    }

    const pkg = PACKAGES_DATA.find((p) => p.id === packageId);
    if (!pkg) return;

    setCartItems((prev) => {
      const existing = prev.find((item) => item.packageId === pkg.id);
      if (existing) {
        return prev.map((item) =>
          item.packageId === pkg.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: `${pkg.id}-${Date.now()}`,
          packageId: pkg.id,
          title: pkg.title,
          price: pkg.price,
          quantity: 1,
          image: pkg.image,
          weight: pkg.unitWeight,
        },
      ];
    });

    setToastMessage(`Đã thêm ${pkg.title} vào giỏ hàng!`);
    setIsCartOpen(true);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      alert('Vui lòng nhập địa chỉ email hợp lệ!');
      return;
    }
    setToastMessage(`Cảm ơn bạn! Mẫu thử 6 vị sẽ được gửi đến ${newsletterEmail}`);
    setNewsletterEmail('');
  };

  return (
    <div className="min-h-screen bg-[#f8faff] text-[#111c2d] selection:bg-[#d7e2ff] selection:text-[#001b3f]">
      {/* 0. NAVBAR */}
      <Navbar
        cartItems={cartItems}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* MAIN CONTAINER */}
      <main className="w-full pt-20">
        <div className="flex flex-col w-full">
          {/* ========================================================
              1. HERO SECTION (INSPIRED BY REFERENCE 1. HERO)
          ======================================================== */}
          <section
            className="relative w-full overflow-hidden bg-gradient-to-b from-[#eef4ff] via-[#f7faff] to-white pt-12 pb-20 lg:py-20"
            id="hero"
          >
            <div className="absolute -top-40 right-10 w-[600px] h-[600px] bg-blue-200/35 rounded-full blur-3xl pointer-events-none -z-0"></div>
            <div className="absolute bottom-0 left-10 w-[450px] h-[450px] bg-amber-100/40 rounded-full blur-3xl pointer-events-none -z-0"></div>

            <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                <div className="lg:col-span-6 space-y-6">
                  {/* Campaign Pill */}
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100/80 text-primary border border-blue-200/60 text-xs sm:text-sm font-bold tracking-wide shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
                    CHIẾN DỊCH RA MẮT ĐỀ XUẤT · VINAMILK NUTRI BAR
                  </div>

                  {/* Brand & Main Heading */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="text-primary font-black tracking-wider uppercase text-2xl sm:text-3xl font-headline">
                        VINAMILK
                      </span>
                      <span className="h-6 w-[2px] bg-slate-300"></span>
                      <span className="px-3 py-1 rounded-md bg-primary/10 text-primary font-bold text-xs tracking-widest uppercase">
                        E-Commerce Concept
                      </span>
                    </div>

                    <h1 className="font-headline font-black text-4xl sm:text-5xl lg:text-6xl text-primary tracking-tight uppercase leading-[1.08]">
                      BẬN VẪN ĐỦ CHẤT
                    </h1>

                    <p className="font-headline font-semibold text-xl sm:text-2xl text-slate-700 leading-snug">
                      Một ngày có thể rất bận. Nhưng đừng quên chăm mình.
                    </p>
                  </div>

                  <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                    Vinamilk NUTRI BAR – thanh dinh dưỡng ăn liền kết hợp protein từ sữa, yến mạch nguyên cám và các loại hạt tuyển chọn. Nạp trọn dưỡng chất lành mạnh chỉ trong một lần mở gói.
                  </p>

                  {/* Timeline Badge Pill */}
                  <div className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white border border-blue-100 shadow-sm text-slate-800 text-xs sm:text-sm font-bold">
                    <span className="material-symbols-outlined text-[#fd761a] text-[22px]">
                      calendar_clock
                    </span>
                    <span>6 THANH · 6 KHOẢNH KHẮC · 1 NGÀY CÙNG BẠN</span>
                  </div>

                  {/* Floating Quick Benefit Pills */}
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-1">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-semibold text-slate-700 shadow-sm">
                      <span className="material-symbols-outlined text-blue-600 text-[18px]">
                        water_drop
                      </span>{' '}
                      Protein từ sữa
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-semibold text-slate-700 shadow-sm">
                      <span className="material-symbols-outlined text-amber-600 text-[18px]">
                        grain
                      </span>{' '}
                      Yến mạch tự nhiên
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-semibold text-slate-700 shadow-sm">
                      <span className="material-symbols-outlined text-emerald-600 text-[18px]">
                        eco
                      </span>{' '}
                      Hạt giàu dinh dưỡng
                    </div>
                  </div>

                  {/* Dual CTA */}
                  <div className="flex flex-wrap items-center gap-4 pt-3">
                    <a
                      className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-primary text-white font-headline text-base font-bold shadow-[0_10px_25px_-5px_rgba(0,75,155,0.4)] hover:bg-primary-dark hover:-translate-y-0.5 active:scale-95 transition-all"
                      href="#pricing"
                    >
                      <span>MUA NGAY</span>
                      <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                    </a>
                    <a
                      className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-white text-primary border-2 border-primary/30 font-headline text-base font-bold hover:border-primary hover:bg-blue-50/50 active:scale-95 transition-all shadow-sm"
                      href="#flavors"
                    >
                      <span>KHÁM PHÁ NUTRI BAR</span>
                      <span className="material-symbols-outlined text-[19px]">expand_more</span>
                    </a>
                  </div>
                </div>

                {/* Hero Visual Focal Point with Packaging Image */}
                <div className="lg:col-span-6 relative flex justify-center">
                  <div className="relative w-full max-w-[580px] rounded-3xl overflow-hidden bg-gradient-to-tr from-white to-blue-50/80 p-3 sm:p-4 shadow-[0_20px_50px_rgba(0,53,113,0.12)] border border-blue-100 group">
                    <div className="relative rounded-2xl overflow-hidden bg-white aspect-[5/4] sm:aspect-square flex items-center justify-center">
                      <img
                        alt="Vinamilk Nutri Bar Hero Banner"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4zz-WgkkkPykowqyY9NQ5mfdSkPDP2Mq_MYU7Ni57vXL6Wl-suFWe6-IrsVD9cDJE7mgz2FWbCeY1WVShaYbLOvmYUuzUMyFDS2ylP4ihzbGEpsCOuH9aHCJtA1f0LmpBKogr-rRenWPxltWNOrh_o6C5w2wLOfA7P0yZAN1MwugBwapvkG2rzLzZ-n9G_GmKngaQsBM1ligJgNG12bfYbgo_g3_J27utUdPfR4TiSdWGGSL9qHvT2pTyq1Rjacsm0P3RT2S81xcgzA"
                      />
                    </div>
                    {/* Floating Overlays */}
                    <div className="absolute top-7 right-7 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/95 backdrop-blur-md text-primary font-headline text-xs font-extrabold shadow-lg border border-blue-50">
                      <span className="material-symbols-outlined text-emerald-600 text-[18px]">
                        verified
                      </span>
                      100% ĂN LIỀN TIỆN LỢI
                    </div>
                    <div className="absolute bottom-7 left-7 right-7 p-3.5 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-100 shadow-xl flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                        <span className="font-headline font-bold text-xs sm:text-sm text-slate-800 uppercase tracking-wide">
                          6 Vị Độc Bản · Đầy Đủ Chất
                        </span>
                      </div>
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-primary/10 text-primary">
                        Sẵn sàng nạp năng lượng
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ========================================================
              2. INGREDIENT STORY (INSPIRED BY REFERENCE 2)
          ======================================================== */}
          <section className="w-full bg-white py-20 border-t border-slate-100" id="ingredients">
            <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-primary font-headline text-xs font-bold tracking-wider uppercase">
                    2. INGREDIENT STORY
                  </div>
                  <h2 className="font-headline font-black text-3xl sm:text-4xl text-primary uppercase tracking-tight">
                    CÂU CHUYỆN THÀNH PHẦN
                  </h2>
                  <p className="text-slate-600 text-base sm:text-lg max-w-2xl">
                    Công thức cân bằng dinh dưỡng từ 3 trụ cột tự nhiên, bảo chứng bởi chất lượng Vinamilk.
                  </p>
                </div>
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest hidden md:block">
                  Thanh Dinh Dưỡng Thế Hệ Mới
                </div>
              </div>

              {/* 3 Clean Visual Storytelling Cards matching Reference Image 2 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                {/* Card 1: Protein từ sữa */}
                <div className="rounded-3xl bg-slate-50 border border-slate-200/80 p-6 flex flex-col justify-between hover:shadow-xl hover:border-blue-200 transition-all group">
                  <div className="space-y-5">
                    <div className="w-full h-56 rounded-2xl overflow-hidden bg-white shadow-inner relative flex items-center justify-center p-4">
                      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/10 to-transparent"></div>
                      <div className="w-full h-full rounded-xl overflow-hidden bg-blue-50/50 flex flex-col items-center justify-center text-center p-4 relative">
                        <span className="material-symbols-outlined text-[72px] text-blue-500 group-hover:scale-110 transition-transform">
                          water_drop
                        </span>
                        <span className="font-headline font-black text-blue-900 text-lg mt-2">
                          DÒNG SỮA TƯƠI VINAMILK
                        </span>
                        <span className="text-xs text-blue-600 font-semibold">
                          100% Protein Chất Lượng Cao
                        </span>
                      </div>
                      <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-blue-600 text-white font-headline text-xs font-bold">
                        Trụ cột 01
                      </span>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-headline font-extrabold text-2xl text-primary">Protein từ sữa</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        Nền tảng gắn liền với thế mạnh dinh dưỡng từ sữa của Vinamilk, cung cấp nguồn đạm chất lượng cao giúp duy trì thể lực dẻo dai và tái tạo năng lượng nhanh chóng cho cơ thể.
                      </p>
                    </div>
                  </div>
                  <div className="pt-5 mt-4 border-t border-slate-200 flex items-center justify-between text-xs font-bold text-primary">
                    <span>Hấp thụ nhanh</span>
                    <span className="material-symbols-outlined text-[18px]">verified</span>
                  </div>
                </div>

                {/* Card 2: Yến mạch */}
                <div className="rounded-3xl bg-slate-50 border border-slate-200/80 p-6 flex flex-col justify-between hover:shadow-xl hover:border-amber-200 transition-all group">
                  <div className="space-y-5">
                    <div className="w-full h-56 rounded-2xl overflow-hidden bg-white shadow-inner relative flex items-center justify-center p-4">
                      <div className="absolute inset-0 bg-gradient-to-t from-amber-900/10 to-transparent"></div>
                      <div className="w-full h-full rounded-xl overflow-hidden bg-amber-50/60 flex flex-col items-center justify-center text-center p-4 relative">
                        <span className="material-symbols-outlined text-[72px] text-amber-600 group-hover:scale-110 transition-transform">
                          grain
                        </span>
                        <span className="font-headline font-black text-amber-950 text-lg mt-2">
                          YẾN MẠCH NGUYÊN CÁM
                        </span>
                        <span className="text-xs text-amber-700 font-semibold">
                          Carb Chậm & Giàu Chất Xơ Tự Nhiên
                        </span>
                      </div>
                      <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-amber-600 text-white font-headline text-xs font-bold">
                        Trụ cột 02
                      </span>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-headline font-extrabold text-2xl text-primary">Yến mạch</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        Tạo nên kết cấu đặc trưng của thanh dinh dưỡng, cung cấp nguồn tinh bột chuyển hóa bền bỉ, giúp no lâu tự nhiên và không gây tăng đường huyết đột ngột trong giờ làm việc.
                      </p>
                    </div>
                  </div>
                  <div className="pt-5 mt-4 border-t border-slate-200 flex items-center justify-between text-xs font-bold text-amber-700">
                    <span>Chắc dạ êm bụng</span>
                    <span className="material-symbols-outlined text-[18px]">hourglass_top</span>
                  </div>
                </div>

                {/* Card 3: Các loại hạt */}
                <div className="rounded-3xl bg-slate-50 border border-slate-200/80 p-6 flex flex-col justify-between hover:shadow-xl hover:border-emerald-200 transition-all group">
                  <div className="space-y-5">
                    <div className="w-full h-56 rounded-2xl overflow-hidden bg-white shadow-inner relative flex items-center justify-center p-4">
                      <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/10 to-transparent"></div>
                      <div className="w-full h-full rounded-xl overflow-hidden bg-emerald-50/60 flex flex-col items-center justify-center text-center p-4 relative">
                        <span className="material-symbols-outlined text-[72px] text-emerald-600 group-hover:scale-110 transition-transform">
                          nature
                        </span>
                        <span className="font-headline font-black text-emerald-950 text-lg mt-2">
                          HẠT DINH DƯỠNG & TRÁI CÂY
                        </span>
                        <span className="text-xs text-emerald-700 font-semibold">
                          Hạnh Nhân, Điều, Mơ & Việt Quất
                        </span>
                      </div>
                      <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-emerald-600 text-white font-headline text-xs font-bold">
                        Trụ cột 03
                      </span>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-headline font-extrabold text-2xl text-primary">Các loại hạt</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        Tạo độ giòn rụm và trải nghiệm nhai sảng khoái, bổ sung các acid béo lành mạnh Omega-3, vitamin E cùng khoáng chất tự nhiên nguyên bản tăng cường trí não.
                      </p>
                    </div>
                  </div>
                  <div className="pt-5 mt-4 border-t border-slate-200 flex items-center justify-between text-xs font-bold text-emerald-700">
                    <span>Giòn bùi tự nhiên</span>
                    <span className="material-symbols-outlined text-[18px]">favorite</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ========================================================
              3. 6 HƯƠNG VỊ / BỘ SẢN PHẨM (INSPIRED BY REFERENCE 3)
          ======================================================== */}
          <section className="w-full bg-[#f4f7fc] py-20" id="flavors">
            <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
              <div className="text-center max-w-3xl mx-auto space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-primary font-headline text-xs font-bold tracking-wider uppercase">
                  3. 6 HƯƠNG VỊ / BỘ SẢN PHẨM
                </div>
                <h2 className="font-headline font-black text-3xl sm:text-4xl text-primary uppercase tracking-tight">
                  6 SẮC MÀU · 6 VỊ BÙNG NỔ
                </h2>
                <p className="text-slate-600 text-base sm:text-lg">
                  Thiết kế bao bì dạng thanh tiện dụng 35g, phủ kín mọi sở thích vị giác từ thanh mát, béo bùi đến đậm đà.
                </p>
              </div>

              {/* Official Wrappers Showcase */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                  <div>
                    <h4 className="font-headline font-bold text-lg text-primary">
                      Bộ Sưu Tập 6 Gói Dạng Thanh 35G (Mặt Trước)
                    </h4>
                    <p className="text-xs text-slate-500">
                      Bao bì chuyên dụng màng nhôm đa lớp giữ trọn độ giòn và dưỡng chất · Nhấp vào từng vị để xem bảng dinh dưỡng
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-blue-50 text-primary text-xs font-semibold">
                      100% Snack Ready
                    </span>
                  </div>
                </div>

                {/* High-res packaging showcase */}
                <div className="w-full rounded-2xl overflow-hidden bg-slate-50/50 p-2 sm:p-4 border border-slate-100 relative group cursor-pointer" onClick={() => setSelectedFlavorModal(FLAVORS_DATA[0])}>
                  <img
                    alt="6 Hương vị Vinamilk Nutri Bar mặt trước"
                    className="w-full h-auto object-contain rounded-xl hover:scale-[1.01] transition-transform duration-300"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAMgbdE0CNXZrwlg4qaQ9ca0-FnVt2HM7MXKMHW3Mj7fAwKQc8mUOjr3HVxlJj3K7grYXE842NXc1afKQ7etClMWaIqCL1RKnJ0jdFUNfVQBSjWrMsGdaoEkQf5YycPTgPYiF9YHDXDPysF9F0S2HNik1kD-rWfL6SPky7WartxF8XZGJJ7cRbuUyEEPwlp30y9kRQTnMqMzO1azyEO_GRa3EoUUlm1Cl_wLMO-3iEHiyX12Br3UcMyTX6QXLMYTIhTdw"
                  />
                  <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                    <span className="px-4 py-2 rounded-full bg-white/95 text-primary text-xs font-bold shadow-lg">
                      Bấm vào từng vị bên dưới để xem chi tiết
                    </span>
                  </div>
                </div>

                {/* Flavor list badges matching colors with click-to-view feature */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-2">
                  {FLAVORS_DATA.map((flavor) => (
                    <button
                      key={flavor.id}
                      type="button"
                      onClick={() => setSelectedFlavorModal(flavor)}
                      className={`p-3 rounded-2xl ${flavor.bgClass} ${flavor.borderClass} border text-center transition-all hover:scale-105 hover:shadow-md cursor-pointer group`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full inline-block mb-1 shadow-sm group-hover:scale-125 transition-transform"
                        style={{ backgroundColor: flavor.colorHex }}
                      ></span>
                      <p className="font-headline font-bold text-xs text-slate-800">
                        {flavor.colorName}
                      </p>
                      <p className="text-[11px] text-slate-600 font-medium">
                        {flavor.vietnameseName}
                      </p>
                      <span className="text-[10px] text-primary font-bold mt-1 inline-block opacity-80 group-hover:opacity-100">
                        Xem chi tiết →
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ========================================================
              4. 6 KHOẢNH KHẮC TRONG NGÀY (INSPIRED BY REFERENCE 4)
          ======================================================== */}
          <section className="w-full bg-white py-20" id="moments">
            <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
              <div className="text-center max-w-3xl mx-auto space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-primary font-headline text-xs font-bold tracking-wider uppercase">
                  4. 6 KHOẢNH KHẮC TRONG NGÀY
                </div>
                <h2 className="font-headline font-black text-3xl sm:text-4xl text-primary uppercase tracking-tight">
                  MỖI KHOẢNH KHẮC · MỘT CÁCH CHĂM MÌNH
                </h2>
                <p className="text-slate-600 text-base sm:text-lg">
                  Lịch trình dày đặc không còn là lý do để bạn bỏ bê cơ thể. Nạp năng lượng chuẩn lúc, đúng nhịp sinh học.
                </p>

                {/* Interactive Time Selector Chips */}
                <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
                  <span className="text-xs font-bold text-slate-400 mr-1">Khung giờ:</span>
                  {MOMENTS_DATA.map((moment) => (
                    <button
                      key={moment.id}
                      onClick={() => setActiveMomentId(moment.id)}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                        activeMomentId === moment.id
                          ? 'bg-primary text-white shadow-sm ring-2 ring-primary/30'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {moment.timeRange.split(' - ')[0]} · {moment.title}
                    </button>
                  ))}
                </div>
              </div>

              {/* 6 Interactive Cards Grid matching Reference 4 exactly */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {MOMENTS_DATA.map((m) => {
                  const isHighlighted = activeMomentId === m.id;
                  const matchedFlavor = FLAVORS_DATA.find((f) => f.id === m.flavorId);
                  return (
                    <div
                      key={m.id}
                      onClick={() => {
                        setActiveMomentId(m.id);
                        if (matchedFlavor) setSelectedFlavorModal(matchedFlavor);
                      }}
                      className={`rounded-3xl ${m.bgClass} ${m.borderClass} border p-6 space-y-4 hover:shadow-xl transition-all flex flex-col justify-between cursor-pointer group ${
                        isHighlighted ? 'ring-2 ring-primary/50 shadow-lg scale-[1.02]' : ''
                      }`}
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className={`font-headline font-black text-3xl ${m.colorAccent}`}>
                            {m.step}
                          </span>
                          <span className={`px-3 py-1 rounded-full ${m.tagClass} font-headline text-xs font-bold`}>
                            {m.timeRange}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`material-symbols-outlined text-[22px] ${m.colorAccent}`}>
                            {m.icon}
                          </span>
                          <h3 className="font-headline font-black text-xl text-slate-800">
                            {m.title}
                          </h3>
                        </div>
                        <div className="p-3 rounded-xl bg-white shadow-sm border border-slate-100">
                          <p className="font-headline font-bold text-slate-900 text-sm italic">
                            {m.quote}
                          </p>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                          {m.description}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-semibold text-slate-700">
                        <span className="group-hover:text-primary transition-colors flex items-center gap-1">
                          <span>{m.flavorName}</span>
                          <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                        </span>
                        <span className="font-bold">{m.weight}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ========================================================
              5. LIFESTYLE CONTEXTS (INSPIRED BY REFERENCE 5)
          ======================================================== */}
          <section className="w-full bg-[#f8faff] py-20 border-t border-slate-100" id="lifestyle">
            <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
              <div className="text-center max-w-3xl mx-auto space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-primary font-headline text-xs font-bold tracking-wider uppercase">
                  5. LIFESTYLE ACTIVE
                </div>
                <h2 className="font-headline font-black text-3xl sm:text-4xl text-primary uppercase tracking-tight">
                  ĐI CÙNG BẠN, DÙ BẠN ĐANG Ở ĐÂU
                </h2>
                <p className="text-slate-600 text-base sm:text-lg">
                  Thiết kế nhỏ gọn vừa vặn túi xách, balo để luôn sẵn sàng nạp năng lượng trong mọi bối cảnh đời thực.
                </p>
              </div>

              {/* 4 Lifestyle cards matching Reference 5 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="rounded-3xl bg-white p-6 border border-slate-200/80 shadow-sm hover:shadow-lg transition-all space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-primary flex items-center justify-center">
                    <span className="material-symbols-outlined text-[26px]">school</span>
                  </div>
                  <h3 className="font-headline font-bold text-xl text-primary">Ở trường</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Giữa hai tiết học căng thẳng vẫn có một khoảng nghỉ nhỏ 5 phút để nạp chất và lấy lại độ tập trung cao.
                  </p>
                </div>

                <div className="rounded-3xl bg-white p-6 border border-slate-200/80 shadow-sm hover:shadow-lg transition-all space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[26px]">apartment</span>
                  </div>
                  <h3 className="font-headline font-bold text-xl text-primary">Ở văn phòng</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Deadline không chờ, nhưng bạn vẫn có thể ăn nhẹ một cách lành mạnh, sạch sẽ ngay tại bàn làm việc.
                  </p>
                </div>

                <div className="rounded-3xl bg-white p-6 border border-slate-200/80 shadow-sm hover:shadow-lg transition-all space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[26px]">directions_subway</span>
                  </div>
                  <h3 className="font-headline font-bold text-xl text-primary">Trên đường đi</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Nhỏ gọn để bỏ vào túi áo khoác, balo hay túi xách, sẵn sàng xé gói dùng ngay khi kẹt xe hay di chuyển vội.
                  </p>
                </div>

                <div className="rounded-3xl bg-white p-6 border border-slate-200/80 shadow-sm hover:shadow-lg transition-all space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[26px]">sports_tennis</span>
                  </div>
                  <h3 className="font-headline font-bold text-xl text-primary">Trước hoạt động</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Dễ mang theo khi đến phòng gym, sân tập cầu lông hoặc tham gia các hoạt động teambuilding ngoài trời.
                  </p>
                </div>
              </div>

              {/* Quote Banner */}
              <div className="text-center py-4">
                <div className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-blue-50 via-white to-blue-50 border border-blue-200/70 shadow-sm">
                  <p className="font-headline font-extrabold text-xl sm:text-2xl text-primary italic">
                    “Một thanh nhỏ cho những ngày không nhỏ.”
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ========================================================
              6. PRODUCT DETAILS & PACKAGING SHOWCASE (INSPIRED BY REFERENCE 6)
          ======================================================== */}
          <section className="w-full bg-white py-20 border-t border-slate-100" id="packaging">
            <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
              <div className="text-center max-w-3xl mx-auto space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-primary font-headline text-xs font-bold tracking-wider uppercase">
                  6. PRODUCT & PACKAGING
                </div>
                <h2 className="font-headline font-black text-3xl sm:text-4xl text-primary uppercase tracking-tight">
                  HỆ THỐNG BAO BÌ CHUẨN QUỐC TẾ
                </h2>
                <p className="text-slate-600 text-base sm:text-lg">
                  Đầy đủ quy cách đóng gói từ thanh đơn trải nghiệm, hộp 6 thanh quà tặng đến thùng 24 thanh tiết kiệm cho gia đình.
                </p>
              </div>

              {/* Showcase Grid using official high-res assets */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Box 6 bars details */}
                <div className="rounded-3xl bg-slate-50 border border-slate-200 p-6 sm:p-8 space-y-6 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full bg-primary text-white font-headline text-xs font-bold">
                        Hộp 6 Thanh · 210g
                      </span>
                      <span className="text-xs text-slate-500 font-semibold">6 vị trọn vẹn</span>
                    </div>
                    <h3 className="font-headline font-black text-2xl text-primary">
                      Bộ Nhận Diện Bao Bì Hộp 6 Thanh
                    </h3>
                    <p className="text-sm text-slate-600">
                      Mặt trước, mặt sau bảng thành phần dinh dưỡng và các mặt bên mô tả trực quan 6 khoảnh khắc.
                    </p>
                    <div className="w-full rounded-2xl overflow-hidden bg-white p-3 border border-slate-100 shadow-sm flex items-center justify-center">
                      <img
                        alt="Bộ nhận diện bao bì hộp 6 thanh Vinamilk Nutri Bar"
                        className="w-full h-auto object-contain hover:scale-105 transition-transform duration-500"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCB5_GiMmnus2qMtC0rB0oTQfUPvNc9b_Di76eHZYiILjDwQkylhCDNdMAtie6r8RIUkVkpERSMp-DDmwZJWP3ziua9q_GuiOYQ1zVruqxiXIPU1amtlp_sfLI44aKtIy28vpTIzJUIVa8cAnbm1drntsiS7MIdIDt8Uw8cj_T94QR_rxdgGSiuv-TiBl4JGdwuDfMdr5vPB5ZPgYLcLvssH25n5WgW0Kg624sQV6nLiNTt9bcomJpxwhwQ0uRMZo6fKA"
                      />
                    </div>
                  </div>
                  <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs font-bold text-slate-700">
                    <span>Quy cách: Hộp giấy Ivory cao cấp cán màng mờ</span>
                    <span className="text-primary font-bold">210g (6x35g)</span>
                  </div>
                </div>

                {/* Carton 24 bars details */}
                <div className="rounded-3xl bg-slate-50 border border-slate-200 p-6 sm:p-8 space-y-6 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full bg-emerald-700 text-white font-headline text-xs font-bold">
                        Thùng 4 Hộp · 24 Thanh
                      </span>
                      <span className="text-xs text-slate-500 font-semibold">Tiết kiệm cả tuần</span>
                    </div>
                    <h3 className="font-headline font-black text-2xl text-primary">
                      Quy Cách Thùng Carton Trưng Bày
                    </h3>
                    <p className="text-sm text-slate-600">
                      Thiết kế thùng carton cao cấp vừa bảo vệ sản phẩm vận chuyển an toàn vừa là kệ trưng bày bắt mắt tại điểm bán.
                    </p>
                    <div className="w-full rounded-2xl overflow-hidden bg-white p-3 border border-slate-100 shadow-sm flex items-center justify-center">
                      <img
                        alt="Thùng 4 Hộp 24 Thanh Vinamilk Nutri Bar"
                        className="w-full h-auto object-contain hover:scale-105 transition-transform duration-500"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCh59qfDpljFO9IsFqomGwygGirGXs7Xxih_2LaW2cCWjDayJoOJ9EBfOpDMivlozOibpc37tRhsqwg_XYEpoo_gE9Z9LwoiXjKNoYTyzSuE_5WN_UCjycZP98mZFCjnKFkCp7d1sOGC_tZINlHJrC0DT9QYiXnGZ4r0DWUBmF6cgArv-lrc9g9zPFMvq1e34YbnEBiOQ-pt6-Hm1daAEnVHA1xKi88LZkmlWZ7XjhtKoCpp9mqvZclKAolBHB3c53ppQ"
                      />
                    </div>
                  </div>
                  <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs font-bold text-slate-700">
                    <span>Quy cách: Thùng 4 hộp (24 thanh x 35g)</span>
                    <span className="text-emerald-700 font-bold">840g Net</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ========================================================
              7. PRICING CARDS (INSPIRED BY REFERENCE 7)
          ======================================================== */}
          <section className="w-full bg-[#f4f7fc] py-24" id="pricing">
            <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
              <div className="text-center max-w-3xl mx-auto space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-primary font-headline text-xs font-bold tracking-wider uppercase">
                  7. PRICING & PACKAGES
                </div>
                <h2 className="font-headline font-black text-3xl sm:text-4xl text-primary uppercase tracking-tight">
                  CHỌN GÓI NUTRI BAR PHÙ HỢP VỚI BẠN
                </h2>
                <p className="text-slate-600 text-base sm:text-lg">
                  Linh hoạt trải nghiệm từ thanh đơn nhanh gọn đến combo trọn vẹn cả tuần nhiều ưu đãi.
                </p>
              </div>

              {/* 3 Pricing Cards matching Reference 7 */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
                {/* 1) THANH ĐƠN - 35G */}
                <div className="rounded-3xl bg-white border border-slate-200 p-8 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all space-y-6">
                  <div className="space-y-6">
                    <div className="w-full h-48 rounded-2xl bg-slate-50 flex items-center justify-center p-3 relative overflow-hidden group">
                      <img
                        alt="Thanh đơn Vinamilk Nutri Bar 35g"
                        className="h-full w-auto object-contain transition-transform duration-500 group-hover:scale-110"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBh7sTaPwzSa8Flbhxv4G3yQXHJk8eZbN1syuB-zMohLVNMsecUdMljn6iLtjlrUQcjUaLBQSVXEId9YRNVhb_ycctReC3nMRF5_n0MtIg6Nr1z_IM-Kfq65pc20F9iWsz2hPcrE2uOb9ACz5vTqIrQPWStVeJf4L1XlJez9fRlXnqYiRs2eNeJhvyVYdoPmqnYnIDm1lqCSCSP03X4HZ1eWhXppTcTTmdykub5hvcwu9yId4tlzpYDPMbWE1Mx8lzixw"
                      />
                      <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-200 text-slate-700 text-xs font-bold">
                        1 Thanh 35g
                      </span>
                    </div>

                    <div className="space-y-2">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                        Trải nghiệm thử
                      </span>
                      <h3 className="font-headline font-black text-2xl text-primary">
                        THANH ĐƠN · 35G
                      </h3>
                    </div>

                    <div className="flex items-baseline gap-1.5 pb-2 border-b border-slate-100">
                      <span className="font-headline font-black text-4xl text-slate-900">18.000</span>
                      <span className="font-headline font-bold text-lg text-slate-500">VNĐ</span>
                    </div>

                    <p className="text-sm text-slate-600">
                      Một lựa chọn nhanh gọn cho những lúc cần ăn nhẹ tức thì mà không cần mua số lượng lớn.
                    </p>

                    <ul className="space-y-3 pt-2 text-sm text-slate-700">
                      <li className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-emerald-600 text-[18px]">
                          check_circle
                        </span>
                        <span>Tùy chọn 1 trong 6 hương vị</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-emerald-600 text-[18px]">
                          check_circle
                        </span>
                        <span>Gọn gàng trong túi áo, balo</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-emerald-600 text-[18px]">
                          check_circle
                        </span>
                        <span>Nạp ngay 150 kcal sạch</span>
                      </li>
                    </ul>
                  </div>

                  <button
                    onClick={() => setIsSinglePickerOpen(true)}
                    className="w-full py-4 rounded-full bg-slate-100 text-primary hover:bg-primary hover:text-white font-headline text-sm font-bold active:scale-95 transition-all"
                  >
                    MUA 1 THANH
                  </button>
                </div>

                {/* 2) HỘP 6 THANH (LỰA CHỌN NỔI BẬT / FEATURED) */}
                <div className="rounded-3xl bg-white border-2 border-primary p-8 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,75,155,0.18)] relative space-y-6 scale-100 lg:-translate-y-2">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-1.5 rounded-full bg-primary text-white font-headline text-xs font-black tracking-widest uppercase shadow-md whitespace-nowrap">
                    LỰA CHỌN NỔI BẬT
                  </div>

                  <div className="space-y-6 pt-2">
                    <div className="w-full h-48 rounded-2xl bg-blue-50/50 flex items-center justify-center p-3 relative overflow-hidden group">
                      <img
                        alt="Hộp 6 thanh Vinamilk Nutri Bar"
                        className="h-full w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCB5_GiMmnus2qMtC0rB0oTQfUPvNc9b_Di76eHZYiILjDwQkylhCDNdMAtie6r8RIUkVkpERSMp-DDmwZJWP3ziua9q_GuiOYQ1zVruqxiXIPU1amtlp_sfLI44aKtIy28vpTIzJUIVa8cAnbm1drntsiS7MIdIDt8Uw8cj_T94QR_rxdgGSiuv-TiBl4JGdwuDfMdr5vPB5ZPgYLcLvssH25n5WgW0Kg624sQV6nLiNTt9bcomJpxwhwQ0uRMZo6fKA"
                      />
                      <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-primary text-white text-xs font-bold">
                        Hộp Trọn Vẹn 6 Vị
                      </span>
                    </div>

                    <div className="space-y-2">
                      <span className="text-xs font-bold text-[#fd761a] uppercase tracking-widest">
                        Trọn vẹn 1 ngày cùng bạn
                      </span>
                      <h3 className="font-headline font-black text-2xl text-primary">
                        HỘP 6 THANH
                      </h3>
                    </div>

                    <div className="flex items-baseline gap-1.5 pb-2 border-b border-slate-100">
                      <span className="font-headline font-black text-5xl text-primary">99.000</span>
                      <span className="font-headline font-bold text-lg text-slate-500">VNĐ</span>
                    </div>

                    <p className="text-sm text-slate-600 font-medium">
                      6 thanh · 6 màu · 6 khoảnh khắc. Lựa chọn khuyên dùng cho trải nghiệm trọn vẹn cả ngày dài năng động.
                    </p>

                    <ul className="space-y-3 pt-2 text-sm text-slate-800 font-medium">
                      <li className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-[20px]">
                          check_circle
                        </span>
                        <span>Đầy đủ 6 hương vị độc bản</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-[20px]">
                          check_circle
                        </span>
                        <span>Hộp quà tặng thẩm mỹ cao cấp</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-[20px]">
                          check_circle
                        </span>
                        <span>Tặng cẩm nang dinh dưỡng bỏ túi</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-[20px]">
                          check_circle
                        </span>
                        <span>Tiết kiệm 9.000đ so với mua lẻ</span>
                      </li>
                    </ul>
                  </div>

                  <button
                    onClick={() => handleAddPackageToCart('box-6')}
                    className="w-full py-4 rounded-full bg-primary text-white hover:bg-primary-dark shadow-[0_10px_20px_rgba(0,75,155,0.3)] font-headline text-base font-bold active:scale-95 transition-all"
                  >
                    CHỌN HỘP 6 THANH
                  </button>
                </div>

                {/* 3) THÙNG 4 HỘP · 24 THANH */}
                <div className="rounded-3xl bg-white border border-slate-200 p-8 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all space-y-6">
                  <div className="space-y-6">
                    <div className="w-full h-48 rounded-2xl bg-slate-50 flex items-center justify-center p-3 relative overflow-hidden group">
                      <img
                        alt="Thùng 24 thanh Vinamilk Nutri Bar"
                        className="h-full w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCh59qfDpljFO9IsFqomGwygGirGXs7Xxih_2LaW2cCWjDayJoOJ9EBfOpDMivlozOibpc37tRhsqwg_XYEpoo_gE9Z9LwoiXjKNoYTyzSuE_5WN_UCjycZP98mZFCjnKFkCp7d1sOGC_tZINlHJrC0DT9QYiXnGZ4r0DWUBmF6cgArv-lrc9g9zPFMvq1e34YbnEBiOQ-pt6-Hm1daAEnVHA1xKi88LZkmlWZ7XjhtKoCpp9mqvZclKAolBHB3c53ppQ"
                      />
                      <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-bold">
                        MIỄN PHÍ VẬN CHUYỂN
                      </span>
                    </div>

                    <div className="space-y-2">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                        Tiết kiệm cả tuần
                      </span>
                      <h3 className="font-headline font-black text-2xl text-primary">
                        THÙNG 4 HỘP · 24 THANH
                      </h3>
                    </div>

                    <div className="flex items-baseline gap-1.5 pb-2 border-b border-slate-100">
                      <span className="font-headline font-black text-4xl text-slate-900">360.000</span>
                      <span className="font-headline font-bold text-lg text-slate-500">VNĐ</span>
                    </div>

                    <p className="text-sm text-slate-600">
                      Tiết kiệm chi phí tối đa cho thói quen dinh dưỡng đều đặn mỗi tuần của gia đình và văn phòng.
                    </p>

                    <ul className="space-y-3 pt-2 text-sm text-slate-700">
                      <li className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-emerald-600 text-[18px]">
                          check_circle
                        </span>
                        <span>Gồm 4 hộp nguyên vẹn (24 thanh)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-emerald-600 text-[18px]">
                          check_circle
                        </span>
                        <span>Tối ưu chi phí tiết kiệm 15%</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-emerald-600 text-[18px]">
                          check_circle
                        </span>
                        <span>Giao hàng tận nơi miễn phí toàn quốc</span>
                      </li>
                    </ul>
                  </div>

                  <button
                    onClick={() => handleAddPackageToCart('carton-24')}
                    className="w-full py-4 rounded-full bg-slate-100 text-primary hover:bg-primary hover:text-white font-headline text-sm font-bold active:scale-95 transition-all"
                  >
                    CHỌN THÙNG 24 THANH
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* ========================================================
              8. EMOTIONAL STATEMENT & FINAL CTA (INSPIRED BY REFERENCE 8)
          ======================================================== */}
          <section className="w-full bg-[#004B9B] text-white py-24 relative overflow-hidden">
            <div className="absolute -bottom-32 -right-32 w-[550px] h-[550px] bg-blue-600 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
            <div className="absolute -top-32 -left-32 w-[450px] h-[450px] bg-[#002f66] rounded-full blur-3xl opacity-60 pointer-events-none"></div>

            <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
              {/* Big Emotional Statement */}
              <div className="text-center max-w-4xl mx-auto space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider border border-white/20">
                  8. CTA / EMOTIONAL
                </div>
                <h2 className="font-headline font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight uppercase leading-tight">
                  “BẠN CÓ THỂ BẬN.<br />
                  NHƯNG ĐỪNG QUÊN CHĂM MÌNH.”
                </h2>
                <p className="font-headline font-bold text-xl sm:text-2xl text-blue-100 tracking-wide">
                  NUTRI BAR – BẬN VẪN ĐỦ CHẤT.
                </p>
              </div>

              {/* Final CTA Card with Lifestyle & Product Image */}
              <div className="max-w-4xl mx-auto rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 p-6 sm:p-10 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="space-y-4 max-w-md">
                  <h3 className="font-headline font-extrabold text-2xl text-white">
                    Sẵn Sàng Cho Một Ngày Năng Động?
                  </h3>
                  <p className="text-blue-100 text-sm leading-relaxed">
                    Đừng để những cơn đói bất chợt làm chậm bước tiến của bạn. Nạp ngay năng lượng lành mạnh với 6 thanh Nutri Bar.
                  </p>
                  <div className="flex items-center gap-3 pt-2">
                    <a
                      className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-primary font-headline text-base font-extrabold shadow-xl hover:bg-blue-50 active:scale-95 transition-all"
                      href="#pricing"
                    >
                      <span>MUA NUTRI BAR</span>
                      <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                    </a>
                  </div>
                </div>

                <div className="w-full md:w-64 aspect-square rounded-2xl overflow-hidden bg-white/20 p-2 border border-white/30 shrink-0">
                  <img
                    alt="Lifestyle Nutri Bar"
                    className="w-full h-full object-cover rounded-xl"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4zz-WgkkkPykowqyY9NQ5mfdSkPDP2Mq_MYU7Ni57vXL6Wl-suFWe6-IrsVD9cDJE7mgz2FWbCeY1WVShaYbLOvmYUuzUMyFDS2ylP4ihzbGEpsCOuH9aHCJtA1f0LmpBKogr-rRenWPxltWNOrh_o6C5w2wLOfA7P0yZAN1MwugBwapvkG2rzLzZ-n9G_GmKngaQsBM1ligJgNG12bfYbgo_g3_J27utUdPfR4TiSdWGGSL9qHvT2pTyq1Rjacsm0P3RT2S81xcgzA"
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* ========================================================
          FOOTER WITH ACADEMIC DISCLAIMER & NEWSLETTER
      ======================================================== */}
      <footer className="w-full bg-[#f4f7fc] text-slate-600 pt-16 pb-12 border-t border-slate-200">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Academic Note Disclaimer */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-amber-500 text-[26px] mt-0.5 shrink-0">
                info
              </span>
              <div className="space-y-1">
                <span className="font-headline font-bold text-slate-800 text-sm block">
                  Lưu Ý Đề Án Ý Niệm E-Marketing Học Thuật
                </span>
                <p className="text-xs text-slate-500">
                  Đây là sản phẩm giả định được nghiên cứu và thiết kế phục vụ đề án kế hoạch E-Marketing tại trường Đại học. Toàn bộ thông số và thương hiệu Vinamilk được sử dụng cho mục đích học tập phi thương mại.
                </p>
              </div>
            </div>
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-50 text-primary border border-blue-100 text-xs font-bold shrink-0">
              <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></span>
              Vinamilk Innovation Lab 2025
            </div>
          </div>

          {/* Main Footer Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4 space-y-4">
              <div className="h-8 flex items-center">
                <svg fill="none" height="42" viewBox="0 0 240 60" width="180" xmlns="http://www.w3.org/2000/svg">
                  <g fill="#004B9B">
                    <text
                      fontFamily="'Plus Jakarta Sans', -apple-system, sans-serif"
                      fontSize="28"
                      fontWeight="900"
                      letterSpacing="-0.5"
                      x="0"
                      y="38"
                    >
                      VINAMILK
                    </text>
                  </g>
                  <rect fill="#CBD5E1" height="26" rx="1" width="2" x="145" y="16"></rect>
                  <g>
                    <rect fill="#004B9B" fillOpacity="0.1" height="22" rx="6" width="80" x="155" y="18"></rect>
                    <text
                      fill="#004B9B"
                      fontFamily="'Plus Jakarta Sans', -apple-system, sans-serif"
                      fontSize="11.5"
                      fontWeight="800"
                      letterSpacing="1.2"
                      x="162"
                      y="34"
                    >
                      NUTRI BAR
                    </text>
                  </g>
                </svg>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-sm">
                Thanh dinh dưỡng ăn liền thế hệ mới từ Vinamilk. Định hình phong cách sống hiện đại, năng động với tuyên ngôn “BẬN VẪN ĐỦ CHẤT”. Nạp trọn năng lượng lành mạnh mọi lúc mọi nơi.
              </p>
              <div className="flex items-center gap-3 pt-1">
                <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-primary shadow-sm">
                  <span className="material-symbols-outlined text-[16px]">eco</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-primary shadow-sm">
                  <span className="material-symbols-outlined text-[16px]">verified</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-primary shadow-sm">
                  <span className="material-symbols-outlined text-[16px]">science</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-3">
              <span className="font-headline font-bold text-slate-800 text-xs tracking-wider uppercase block">
                Khám Phá
              </span>
              <ul className="space-y-2 text-xs">
                <li>
                  <a className="hover:text-primary transition-colors" href="#hero">
                    Trang chủ
                  </a>
                </li>
                <li>
                  <a className="hover:text-primary transition-colors" href="#ingredients">
                    Câu chuyện thành phần
                  </a>
                </li>
                <li>
                  <a className="hover:text-primary transition-colors" href="#flavors">
                    6 Hương vị
                  </a>
                </li>
                <li>
                  <a className="hover:text-primary transition-colors" href="#moments">
                    6 Khoảnh khắc dùng
                  </a>
                </li>
                <li>
                  <a className="hover:text-primary transition-colors" href="#lifestyle">
                    Lối sống Active
                  </a>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-2 space-y-3">
              <span className="font-headline font-bold text-slate-800 text-xs tracking-wider uppercase block">
                Hỗ Trợ
              </span>
              <ul className="space-y-2 text-xs">
                <li>
                  <a className="hover:text-primary transition-colors" href="#pricing">
                    Bảng giá sản phẩm
                  </a>
                </li>
                <li>
                  <a className="hover:text-primary transition-colors" href="#ingredients">
                    Bảng dưỡng chất
                  </a>
                </li>
                <li>
                  <a className="hover:text-primary transition-colors" href="#packaging">
                    Quy cách đóng gói
                  </a>
                </li>
                <li>
                  <a className="hover:text-primary transition-colors" href="#hero">
                    Cam kết dinh dưỡng
                  </a>
                </li>
                <li>
                  <a className="hover:text-primary transition-colors" href="mailto:0989295899cuong@gmail.com">
                    Liên hệ nhóm đề án
                  </a>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-4 space-y-3">
              <span className="font-headline font-bold text-slate-800 text-xs tracking-wider uppercase block">
                Đăng Ký Nhận Mẫu Thử Ra Mắt
              </span>
              <p className="text-xs text-slate-500">
                Nhận ngay bộ mẫu thử 6 vị NUTRI BAR cùng cẩm nang năng lượng bỏ túi dành cho sinh viên và giới văn phòng.
              </p>
              <form className="space-y-2 pt-1" onSubmit={handleNewsletterSubmit}>
                <div className="flex items-center gap-2">
                  <input
                    className="flex-1 h-11 px-4 rounded-full bg-white border border-slate-200 text-xs text-slate-800 outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-sm"
                    placeholder="Nhập email của bạn..."
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                  />
                  <button
                    className="h-11 px-5 rounded-full bg-primary text-white text-xs font-bold hover:bg-primary-dark transition-all flex items-center justify-center shrink-0 shadow-sm cursor-pointer"
                    type="submit"
                  >
                    <span>ĐĂNG KÝ</span>
                  </button>
                </div>
                <span className="text-[11px] text-slate-400 block">
                  *Khảo sát trải nghiệm phi thương mại phục vụ nghiên cứu.
                </span>
              </form>
            </div>
          </div>

          {/* Bottom Copyright */}
          <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>© 2025 Vinamilk NUTRI BAR Concept. Đề án E-Marketing Học Thuật.</p>
            <div className="flex items-center gap-4">
              <a className="hover:text-primary transition-colors" href="#hero">
                Quy chế đề án
              </a>
              <span>•</span>
              <a className="hover:text-primary transition-colors" href="#hero">
                Bảo mật nghiên cứu
              </a>
              <span>•</span>
              <a className="hover:text-primary transition-colors" href="#hero">
                Báo cáo dự án
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* FLOATING ACTION CART TRIGGER BUTTON (MOBILE & DESKTOP QUICK ACCESS) */}
      <div className="fixed bottom-6 left-6 z-40">
        <button
          onClick={() => setIsCartOpen(true)}
          className="flex items-center gap-2 px-4 py-3 rounded-full bg-white text-primary border border-blue-200 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-0.5 group"
        >
          <div className="relative">
            <span className="material-symbols-outlined text-primary text-[22px]">shopping_bag</span>
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#fd761a]" />
            )}
          </div>
          <span className="text-xs font-bold font-headline hidden sm:inline">Giỏ Hàng</span>
          <span className="text-xs font-black px-2 py-0.5 rounded-full bg-blue-100 text-primary">
            {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
          </span>
        </button>
      </div>

      {/* MODALS & DRAWERS */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        onOrderSuccess={() => {
          setCartItems([]);
          setToastMessage('Đặt hàng thành công! Mã đơn đã được ghi nhận.');
        }}
      />

      <FlavorDetailModal
        flavor={selectedFlavorModal}
        onClose={() => setSelectedFlavorModal(null)}
        onAddToCart={(flavor) => {
          handleAddFlavorToCart(flavor, 1);
          setIsCartOpen(true);
        }}
      />

      <SingleBarPickerModal
        isOpen={isSinglePickerOpen}
        onClose={() => setIsSinglePickerOpen(false)}
        onConfirm={(flavor, qty) => {
          handleAddFlavorToCart(flavor, qty);
          setIsCartOpen(true);
        }}
      />

      <Toast
        message={toastMessage}
        onClose={() => setToastMessage(null)}
      />
    </div>
  );
}
