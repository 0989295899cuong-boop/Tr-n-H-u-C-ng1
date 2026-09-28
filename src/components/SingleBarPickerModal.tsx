import React, { useState } from 'react';
import { FLAVORS_DATA, FlavorItem } from '../data/nutriBarData';

interface SingleBarPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (selectedFlavor: FlavorItem, quantity: number) => void;
}

export const SingleBarPickerModal: React.FC<SingleBarPickerModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  const [selectedFlavor, setSelectedFlavor] = useState<FlavorItem>(FLAVORS_DATA[0]);
  const [quantity, setQuantity] = useState(1);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div onClick={onClose} className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" />

      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                Trải Nghiệm Thử 35G
              </span>
              <h3 className="font-headline font-black text-2xl text-primary">
                Chọn Hương Vị Nutri Bar
              </h3>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full hover:bg-slate-100 text-slate-400 flex items-center justify-center transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          <p className="text-xs text-slate-600">
            Hãy chọn hương vị bạn muốn nếm thử hôm nay. Mỗi thanh cung cấp nguồn đạm từ sữa và yến mạch tự nhiên.
          </p>

          {/* 6 Flavor Options Radio Grid */}
          <div className="grid grid-cols-2 gap-2.5">
            {FLAVORS_DATA.map((fl) => {
              const isSelected = selectedFlavor.id === fl.id;
              return (
                <button
                  key={fl.id}
                  type="button"
                  onClick={() => setSelectedFlavor(fl)}
                  className={`p-3 rounded-2xl border text-left flex items-start gap-2.5 transition-all ${
                    isSelected
                      ? 'border-primary ring-2 ring-primary/20 bg-blue-50/50 shadow-sm'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full mt-1 shrink-0"
                    style={{ backgroundColor: fl.colorHex }}
                  />
                  <div className="min-w-0">
                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      {fl.colorName}
                    </p>
                    <p className="font-headline font-bold text-xs text-slate-900 truncate">
                      {fl.vietnameseName}
                    </p>
                    <p className="text-[10px] text-slate-500">{fl.calories} kcal</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Quantity selector */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
            <div>
              <span className="font-bold text-xs text-slate-800 block">Số lượng thanh:</span>
              <span className="text-xs text-primary font-black">
                {(18000 * quantity).toLocaleString('vi-VN')} đ (18.000 đ/thanh)
              </span>
            </div>
            <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 flex items-center justify-center hover:bg-slate-100 text-slate-600 font-bold transition-colors"
              >
                -
              </button>
              <span className="w-10 text-center font-bold text-sm text-slate-800">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 flex items-center justify-center hover:bg-slate-100 text-slate-600 font-bold transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* Submit action */}
          <button
            type="button"
            onClick={() => {
              onConfirm(selectedFlavor, quantity);
              onClose();
            }}
            className="w-full py-4 rounded-full bg-primary hover:bg-primary-dark text-white font-headline text-sm font-bold shadow-lg shadow-blue-900/20 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
            <span>Thêm vào giỏ hàng · {(18000 * quantity).toLocaleString('vi-VN')} đ</span>
          </button>
        </div>
      </div>
    </div>
  );
};
