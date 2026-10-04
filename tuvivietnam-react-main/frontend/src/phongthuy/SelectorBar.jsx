import React from 'react';
import { Calendar, User, Heart, Sparkles, Check } from 'lucide-react';
import { getYearDetails } from './sixtyHoaGiap';

const COMMON_YEARS = [1984, 1986, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1998, 2000];

export const SelectorBar = ({
  husbandYear,
  setHusbandYear,
  wifeYear,
  setWifeYear,
  husbandData,
  wifeData,
  isSingle,
  setIsSingle,
}) => {
  const years = Array.from({ length: 82 }, (_, i) => 2026 - i);

  return (
    <div className="bg-[#FFFFFF] border border-[#E5DFD5] rounded-2xl p-4 sm:p-6 shadow-sm mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-[#EFE8DD] gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-[#70665B] uppercase tracking-wider">
            Tình Trạng Gia Chủ:
          </span>
          <div className="inline-flex p-1 bg-[#FAF6F0] rounded-xl border border-[#E2DBD0]">
            <button
              onClick={() => setIsSingle(false)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                !isSingle
                  ? 'bg-[#FFFFFF] text-[#9E2A1E] shadow-xs border border-[#E4D5C5]'
                  : 'text-[#645A50] hover:text-[#1F1914]'
              }`}
            >
              <Heart className="w-3.5 h-3.5 fill-[#9E2A1E]/20 text-[#9E2A1E]" />
              <span>Đã Lập Gia Đình (Có Tuổi Vợ)</span>
            </button>
            <button
              onClick={() => setIsSingle(true)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                isSingle
                  ? 'bg-[#9E2A1E] text-white shadow-xs'
                  : 'text-[#645A50] hover:text-[#1F1914]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Chưa Lập Gia Đình (Độc Thân)</span>
            </button>
          </div>
        </div>

        {isSingle && (
          <div className="flex items-center gap-1.5 text-xs text-[#9E2A1E] bg-[#FDF2F2] border border-[#FECACA] px-3 py-1 rounded-lg">
            <Check className="w-3.5 h-3.5 text-[#DC2626]" />
            <span>Chế độ độc thân: Tối ưu 100% hướng nhà theo nam gia chủ & gợi ý tuổi phối ngẫu</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-end">
        {/* Năm sinh Nam gia chủ */}
        <div className={isSingle ? 'md:col-span-8' : 'md:col-span-5'}>
          <label className="flex items-center justify-between text-xs font-semibold text-[#5A5147] mb-2 uppercase tracking-wider">
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-[#9E2A1E]" />
              Năm Sinh Nam Gia Chủ (Dương Lịch)
            </span>
            <span className="text-[#9E2A1E] font-bold">
              {husbandData.canChi} · {husbandData.element}
            </span>
          </label>
          <div className="relative">
            <select
              value={husbandYear}
              onChange={(e) => setHusbandYear(Number(e.target.value))}
              className="w-full bg-[#FAF7F2] border border-[#DED7CB] rounded-xl px-4 py-3 text-base text-[#1F1914] font-medium appearance-none focus:outline-none focus:border-[#9E2A1E] focus:ring-1 focus:ring-[#9E2A1E] transition-all cursor-pointer shadow-2xs"
            >
              {years.map((y) => {
                const info = getYearDetails(y);
                return (
                  <option key={`m-${y}`} value={y} className="bg-[#FFFFFF] text-[#1F1914]">
                    Năm {y} - {info.canChi} ({info.element} - Cung {info.maleCung})
                  </option>
                );
              })}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-[#7A6F64]">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Năm sinh Nữ gia chủ / Người phối ngẫu (chỉ hiện khi đã lập gia đình) */}
        {!isSingle && (
          <div className="md:col-span-5">
            <label className="flex items-center justify-between text-xs font-semibold text-[#5A5147] mb-2 uppercase tracking-wider">
              <span className="flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-[#DB2777]" />
                Năm Sinh Vợ / Nữ Gia Chủ (Dương Lịch)
              </span>
              <span className="text-[#059669] font-bold">
                {wifeData.canChi} · {wifeData.element}
              </span>
            </label>
            <div className="relative">
              <select
                value={wifeYear}
                onChange={(e) => setWifeYear(Number(e.target.value))}
                className="w-full bg-[#FAF7F2] border border-[#DED7CB] rounded-xl px-4 py-3 text-base text-[#1F1914] font-medium appearance-none focus:outline-none focus:border-[#DB2777] focus:ring-1 focus:ring-[#DB2777] transition-all cursor-pointer shadow-2xs"
              >
                {years.map((y) => {
                  const info = getYearDetails(y);
                  return (
                    <option key={`f-${y}`} value={y} className="bg-[#FFFFFF] text-[#1F1914]">
                      Năm {y} - {info.canChi} ({info.element} - Cung {info.femaleCung})
                    </option>
                  );
                })}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-[#7A6F64]">
                <Calendar className="w-4 h-4" />
              </div>
            </div>
          </div>
        )}

        {/* Nút hành động nhanh */}
        {/* <div className={isSingle ? 'md:col-span-4' : 'md:col-span-2'}>
          <div className="flex gap-2">
            <button
              onClick={() => {
                setHusbandYear(1990);
                setWifeYear(1992);
              }}
              title="Đặt lại năm mặc định"
              className="w-full py-3 px-3 bg-[#F4EFE6] hover:bg-[#EAE2D5] text-[#4A4239] rounded-xl font-medium text-xs border border-[#DCD3C5] transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Đặt lại</span>
            </button>
          </div>
        </div> */}
      </div>

      {/* Lối tắt chọn nhanh các năm sinh phổ biến */}
      <div className="mt-4 pt-3.5 border-t border-[#F0EAE1] flex flex-wrap items-center gap-1.5">
        <span className="text-[11px] text-[#7A6F64] font-medium mr-1 flex items-center gap-1">
          <Calendar className="w-3 h-3 text-[#9E2A1E]" /> Chọn nhanh tuổi nam:
        </span>
        {COMMON_YEARS.map((y) => {
          const isSelected = husbandYear === y;
          const yData = getYearDetails(y);
          return (
            <button
              key={y}
              onClick={() => setHusbandYear(y)}
              className={`px-2.5 py-1 text-xs rounded-lg transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[#9E2A1E] text-white font-semibold shadow-xs'
                  : 'bg-[#FAF7F2] text-[#554C42] border border-[#E0D8CB] hover:bg-[#F2ECE1] hover:text-[#1F1914]'
              }`}
            >
              {y} ({yData.canChi.split(' ')[1]})
            </button>
          );
        })}
      </div>
    </div>
  );
};
