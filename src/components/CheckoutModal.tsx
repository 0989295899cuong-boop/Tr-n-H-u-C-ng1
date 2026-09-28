import React, { useState } from 'react';
import { CartItem } from '../data/nutriBarData';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onOrderSuccess: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onOrderSuccess,
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: 'Hà Nội',
    paymentMethod: 'cod',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState<string | null>(null);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingFee = subtotal >= 200000 ? 0 : 25000;
  const grandTotal = subtotal + shippingFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.address) {
      alert('Vui lòng điền đầy đủ họ tên, số điện thoại và địa chỉ giao hàng.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const trackingCode = 'VNM-NB-' + Math.floor(100000 + Math.random() * 900000);
      setOrderConfirmed(trackingCode);
      onOrderSuccess();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div onClick={onClose} className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" />

      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        {orderConfirmed ? (
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
              <span className="material-symbols-outlined text-[36px]">check_circle</span>
            </div>
            <div className="space-y-2">
              <h3 className="font-headline font-black text-2xl text-slate-900">
                Đặt Hàng Thành Công!
              </h3>
              <p className="text-sm text-slate-600">
                Cảm ơn bạn đã lựa chọn Vinamilk NUTRI BAR đồng hành cùng nhịp sống năng động!
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 text-left space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Mã đơn hàng:</span>
                <span className="font-headline font-black text-primary text-sm">{orderConfirmed}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Người nhận:</span>
                <span className="font-bold text-slate-800">{formData.fullName} ({formData.phone})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Địa chỉ giao:</span>
                <span className="font-semibold text-slate-800 text-right">{formData.address}, {formData.city}</span>
              </div>
              <div className="flex justify-between border-t border-blue-200/50 pt-2 text-sm font-bold text-slate-900">
                <span>Tổng tiền:</span>
                <span className="text-primary font-black">{grandTotal.toLocaleString('vi-VN')} đ</span>
              </div>
            </div>

            <p className="text-xs text-slate-400 italic">
              *Đây là hệ thống đặt hàng demo thuộc Đề án E-Marketing Học Thuật Vinamilk Nutri Bar.
            </p>

            <button
              onClick={() => {
                setOrderConfirmed(null);
                onClose();
              }}
              className="w-full py-3.5 rounded-full bg-primary hover:bg-primary-dark text-white font-headline text-sm font-bold transition-all shadow-md"
            >
              Hoàn tất & Quay lại trang chủ
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="font-headline font-black text-xl text-primary">Thông Tin Giao Hàng</h3>
                <p className="text-xs text-slate-500">Vinamilk NUTRI BAR E-Commerce Express</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-full hover:bg-slate-100 text-slate-400 flex items-center justify-center transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">Họ và tên *</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Nguyễn Văn A"
                    className="w-full h-10 px-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">Số điện thoại *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="0989 295 899"
                    className="w-full h-10 px-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-700">Địa chỉ nhận hàng *</label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Số nhà, tên đường, phường/xã..."
                  className="w-full h-10 px-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">Tỉnh / Thành phố</label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full h-10 px-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary bg-white"
                  >
                    <option value="Hà Nội">Hà Nội</option>
                    <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
                    <option value="Đà Nẵng">Đà Nẵng</option>
                    <option value="Cần Thơ">Cần Thơ</option>
                    <option value="Hải Phòng">Hải Phòng</option>
                    <option value="Tỉnh khác">Tỉnh khác</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">Phương thức thanh toán</label>
                  <select
                    value={formData.paymentMethod}
                    onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                    className="w-full h-10 px-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary bg-white"
                  >
                    <option value="cod">Thanh toán khi nhận hàng (COD)</option>
                    <option value="qr">Chuyển khoản QR ngân hàng / MoMo</option>
                    <option value="card">Thẻ tín dụng / Ghi nợ quốc tế</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-700">Ghi chú giao hàng (nếu có)</label>
                <input
                  type="text"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Ví dụ: Giao vào giờ hành chính, gọi trước khi đến..."
                  className="w-full h-10 px-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            {/* Quick summary */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
              <div className="flex justify-between text-slate-600">
                <span>Số lượng sản phẩm ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})</span>
                <span className="font-bold text-slate-800">{subtotal.toLocaleString('vi-VN')} đ</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Phí vận chuyển</span>
                <span className="font-bold text-emerald-600">
                  {shippingFee === 0 ? 'Miễn phí toàn quốc' : `${shippingFee.toLocaleString('vi-VN')} đ`}
                </span>
              </div>
              <div className="flex justify-between items-baseline pt-2 border-t border-slate-200 text-slate-900 font-headline">
                <span className="font-bold">Tổng thanh toán:</span>
                <span className="text-xl font-black text-primary">
                  {grandTotal.toLocaleString('vi-VN')} đ
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-full bg-primary hover:bg-primary-dark text-white font-headline text-sm font-bold shadow-lg shadow-blue-900/20 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>
                  <span>Đang xử lý đơn hàng...</span>
                </>
              ) : (
                <>
                  <span>XÁC NHẬN ĐẶT HÀNG</span>
                  <span className="material-symbols-outlined text-[18px]">done_all</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
