import React, { useState } from 'react';
import { CartItem } from '../data/nutriBarData';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState<{ text: string; isError?: boolean } | null>(null);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = Math.round(subtotal * discountPercent);
  const shippingFee = subtotal >= 200000 || subtotal === 0 ? 0 : 25000;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = promoCode.trim().toUpperCase();
    if (cleanCode === 'VINAMILK2025' || cleanCode === 'BANVANDUCHAT') {
      setDiscountPercent(0.1); // 10% OFF
      setPromoMessage({ text: 'Áp dụng mã thành công! Bạn được giảm 10%.' });
    } else if (cleanCode === 'FREESHIP') {
      setDiscountPercent(0.05);
      setPromoMessage({ text: 'Áp dụng mã FREESHIP thành công!' });
    } else if (!cleanCode) {
      setPromoMessage({ text: 'Vui lòng nhập mã giảm giá.', isError: true });
    } else {
      setPromoMessage({ text: 'Mã khuyến mãi không hợp lệ hoặc đã hết hạn.', isError: true });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity animate-in fade-in"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[24px]">shopping_bag</span>
              <h3 className="font-headline font-black text-lg text-slate-900">Giỏ Hàng Nutri Bar</h3>
              <span className="px-2 py-0.5 rounded-full bg-blue-100 text-primary text-xs font-bold">
                {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
              </span>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          {/* Cart Content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4 text-slate-500">
                <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[40px]">shopping_basket</span>
                </div>
                <h4 className="font-headline font-bold text-lg text-slate-800">Giỏ hàng của bạn đang trống</h4>
                <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
                  Hãy chọn ngay các hương vị Nutri Bar yêu thích hoặc combo ngày dài để nạp năng lượng trọn vẹn!
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-full bg-primary text-white text-xs font-bold hover:bg-primary-dark transition-all"
                >
                  Xem thực đơn 6 vị
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-2xl border border-slate-200 bg-white hover:border-blue-200 transition-all flex gap-3 items-center group shadow-sm"
                  >
                    <div className="w-16 h-16 rounded-xl bg-slate-50 flex items-center justify-center p-1.5 shrink-0 border border-slate-100">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-start justify-between gap-1">
                        <h5 className="font-headline font-bold text-sm text-slate-900 truncate">
                          {item.title}
                        </h5>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-slate-400 hover:text-red-500 p-1 transition-colors"
                          title="Xóa"
                        >
                          <span className="material-symbols-outlined text-[16px]">delete</span>
                        </button>
                      </div>
                      {item.flavorVariant && (
                        <p className="text-xs text-[#fd761a] font-semibold truncate">
                          Vị: {item.flavorVariant}
                        </p>
                      )}
                      <div className="flex items-center justify-between pt-1">
                        <span className="text-xs font-bold text-primary font-headline">
                          {(item.price * item.quantity).toLocaleString('vi-VN')} đ
                        </span>

                        <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                          <button
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="w-6 h-6 flex items-center justify-center hover:bg-slate-200 text-slate-600 transition-colors"
                          >
                            -
                          </button>
                          <span className="w-7 text-center text-xs font-bold text-slate-800">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="w-6 h-6 flex items-center justify-center hover:bg-slate-200 text-slate-600 transition-colors"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Free shipping threshold progress */}
                <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-100 text-xs text-slate-700 space-y-1.5">
                  <div className="flex justify-between font-semibold">
                    <span>
                      {subtotal >= 200000
                        ? '🎉 Chúc mừng! Bạn được MIỄN PHÍ vận chuyển toàn quốc.'
                        : `Mua thêm ${(200000 - subtotal).toLocaleString('vi-VN')} đ để được Freeship`}
                    </span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-blue-200 overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all duration-300"
                      style={{ width: `${Math.min(100, (subtotal / 200000) * 100)}%` }}
                    />
                  </div>
                </div>

                {/* Promo code form */}
                <form onSubmit={handleApplyPromo} className="pt-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Mã ưu đãi (VD: VINAMILK2025)"
                      className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-200 uppercase font-semibold focus:outline-none focus:border-primary"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-slate-800 hover:bg-primary text-white text-xs font-bold rounded-xl transition-colors shrink-0"
                    >
                      Áp dụng
                    </button>
                  </div>
                  {promoMessage && (
                    <p
                      className={`text-xs mt-1.5 font-medium ${
                        promoMessage.isError ? 'text-red-500' : 'text-emerald-600'
                      }`}
                    >
                      {promoMessage.text}
                    </p>
                  )}
                </form>
              </div>
            )}
          </div>

          {/* Footer & Checkout */}
          {cartItems.length > 0 && (
            <div className="p-5 border-t border-slate-100 bg-slate-50 space-y-3">
              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Tạm tính</span>
                  <span className="font-semibold text-slate-800">
                    {subtotal.toLocaleString('vi-VN')} đ
                  </span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Giảm giá</span>
                    <span className="font-semibold">
                      -{discountAmount.toLocaleString('vi-VN')} đ
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Phí giao hàng</span>
                  <span className="font-semibold text-slate-800">
                    {shippingFee === 0 ? 'Miễn phí' : `${shippingFee.toLocaleString('vi-VN')} đ`}
                  </span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline font-headline">
                  <span className="text-sm font-bold text-slate-900">Tổng thanh toán</span>
                  <span className="text-xl font-black text-primary">
                    {grandTotal.toLocaleString('vi-VN')} đ
                  </span>
                </div>
              </div>

              <button
                onClick={onCheckout}
                className="w-full py-3.5 rounded-full bg-primary hover:bg-primary-dark text-white font-headline text-sm font-bold shadow-lg shadow-blue-900/20 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <span>TIẾN HÀNH ĐẶT HÀNG</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
