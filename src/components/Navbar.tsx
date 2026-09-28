import React, { useState, useEffect } from 'react';
import { CartItem } from '../data/nutriBarData';

interface NavbarProps {
  cartItems: CartItem[];
  onOpenCart: () => void;
  onSelectFlavorModal?: (flavorId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cartItems, onOpenCart }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const navLinks = [
    { label: 'Trang chủ', href: '#hero' },
    { label: 'Thành phần dinh dưỡng', href: '#ingredients' },
    { label: '6 Hương vị', href: '#flavors' },
    { label: '6 Khoảnh khắc', href: '#moments' },
    { label: 'Lối sống Active', href: '#lifestyle' },
    { label: 'Bao bì', href: '#packaging' },
    { label: 'Bảng giá', href: '#pricing' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b transition-all duration-300 ${
        isScrolled
          ? 'border-slate-200/80 shadow-[0_4px_20px_rgba(0,53,113,0.08)] py-0'
          : 'border-slate-100 shadow-[0_2px_12px_rgba(0,53,113,0.04)]'
      }`}
    >
      <div className="h-20 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Brand Logo & Campaign Badge */}
        <div className="flex items-center gap-4 shrink-0">
          <a className="flex items-center gap-3 group focus:outline-none" href="#hero">
            <div className="h-10 flex items-center">
              <svg fill="none" height="48" viewBox="0 0 240 60" width="190" xmlns="http://www.w3.org/2000/svg">
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
          </a>

          <div className="hidden xl:inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-primary border border-blue-100/80 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#fd761a] mr-2 animate-pulse"></span>
            Chiến Dịch Đề Xuất E-Marketing
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-7">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-slate-700 hover:text-primary transition-colors py-1 relative hover:after:w-full after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Buttons: Cart & Buy Now */}
        <div className="flex items-center gap-3">
          {/* Cart Icon Button with count badge */}
          <button
            onClick={onOpenCart}
            aria-label="Giỏ hàng Nutri Bar"
            className="relative p-2.5 rounded-full hover:bg-blue-50 text-slate-700 hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <span className="material-symbols-outlined text-[24px]">shopping_bag</span>
            {totalCartCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1.5 rounded-full bg-[#fd761a] text-white text-[11px] font-black flex items-center justify-center shadow-md animate-bounce">
                {totalCartCount}
              </span>
            )}
          </button>

          {/* Direct CTA */}
          <a
            href="#pricing"
            className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2.5 rounded-full bg-primary text-white text-xs sm:text-sm font-bold shadow-[0_4px_16px_rgba(0,75,155,0.25)] hover:bg-primary-dark hover:shadow-[0_6px_20px_rgba(0,75,155,0.35)] active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">bolt</span>
            <span>MUA NGAY</span>
          </a>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
            className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <span className="material-symbols-outlined text-[26px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-6 py-6 space-y-4 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-primary border border-blue-100/80 text-xs font-semibold mb-2">
            <span className="w-2 h-2 rounded-full bg-[#fd761a] mr-2 animate-pulse"></span>
            Chiến Dịch Đề Xuất E-Marketing
          </div>
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-semibold text-slate-800 hover:text-primary py-2 border-b border-slate-100 flex items-center justify-between"
              >
                <span>{link.label}</span>
                <span className="material-symbols-outlined text-slate-400 text-[18px]">chevron_right</span>
              </a>
            ))}
          </div>
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCart();
              }}
              className="w-full py-3 rounded-full bg-blue-50 text-primary font-bold text-sm flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
              <span>Xem giỏ hàng ({totalCartCount} món)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
