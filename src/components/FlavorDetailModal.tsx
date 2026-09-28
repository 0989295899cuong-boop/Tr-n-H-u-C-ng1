import React from 'react';
import { FlavorItem } from '../data/nutriBarData';

interface FlavorDetailModalProps {
  flavor: FlavorItem | null;
  onClose: () => void;
  onAddToCart: (flavor: FlavorItem) => void;
}

export const FlavorDetailModal: React.FC<FlavorDetailModalProps> = ({
  flavor,
  onClose,
  onAddToCart,
}) => {
  if (!flavor) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div onClick={onClose} className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" />

      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        {/* Header color accent */}
        <div
          className="h-3 w-full"
          style={{ backgroundColor: flavor.colorHex }}
        />

        <div className="p-6 sm:p-8 space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span
                  className="w-3.5 h-3.5 rounded-full inline-block"
                  style={{ backgroundColor: flavor.colorHex }}
                />
                <span className="text-xs font-black uppercase tracking-wider text-slate-500 font-headline">
                  {flavor.colorName}
                </span>
                <span className="text-slate-300">·</span>
                <span className="text-xs font-bold text-slate-600">35g / thanh</span>
              </div>
              <h3 className="font-headline font-black text-2xl sm:text-3xl text-primary">
                {flavor.vietnameseName}
              </h3>
              <p className="text-xs font-semibold text-slate-600 italic">
                “{flavor.tagline}”
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full hover:bg-slate-100 text-slate-400 flex items-center justify-center transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          {/* Description */}
          <p className="text-sm text-slate-600 leading-relaxed">
            {flavor.description}
          </p>

          {/* Macro Nutrition Facts Table */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <span className="font-headline font-bold text-xs uppercase text-slate-700">
                Giá Trị Dinh Dưỡng (1 Thanh 35g)
              </span>
              <span className="font-headline font-black text-primary text-base">
                {flavor.calories} kcal
              </span>
            </div>

            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="p-2.5 rounded-xl bg-white border border-slate-100 shadow-sm">
                <span className="text-[10px] text-slate-500 uppercase font-semibold block">Protein</span>
                <span className="font-headline font-black text-sm text-blue-600">{flavor.protein}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-slate-100 shadow-sm">
                <span className="text-[10px] text-slate-500 uppercase font-semibold block">Chất Xơ</span>
                <span className="font-headline font-black text-sm text-emerald-600">{flavor.fiber}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-slate-100 shadow-sm">
                <span className="text-[10px] text-slate-500 uppercase font-semibold block">Carb Tự Nhiên</span>
                <span className="font-headline font-black text-sm text-amber-600">{flavor.carbs}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-slate-100 shadow-sm">
                <span className="text-[10px] text-slate-500 uppercase font-semibold block">Chất Béo Tốt</span>
                <span className="font-headline font-black text-sm text-purple-600">{flavor.fat}</span>
              </div>
            </div>
          </div>

          {/* Ingredients list */}
          <div className="space-y-2">
            <span className="font-headline font-bold text-xs uppercase text-slate-700 tracking-wider">
              Thành phần chọn lọc:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {flavor.ingredients.map((ing, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium"
                >
                  {ing}
                </span>
              ))}
            </div>
          </div>

          {/* Best Moment & Taste Note */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-100 space-y-1">
              <span className="font-bold text-primary flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">schedule</span>
                Thời điểm lý tưởng:
              </span>
              <p className="text-slate-700">{flavor.bestMoment}</p>
            </div>
            <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-100 space-y-1">
              <span className="font-bold text-amber-800 flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">restaurant</span>
                Cảm nhận vị giác:
              </span>
              <p className="text-slate-700">{flavor.tasteNote}</p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-2 flex items-center gap-3">
            <button
              onClick={() => {
                onAddToCart(flavor);
                onClose();
              }}
              className="flex-1 py-3.5 rounded-full bg-primary hover:bg-primary-dark text-white font-headline text-sm font-bold shadow-md shadow-blue-900/20 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
              <span>Chọn vị này (18.000 đ)</span>
            </button>
            <button
              onClick={onClose}
              className="px-5 py-3.5 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold text-xs transition-colors"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
