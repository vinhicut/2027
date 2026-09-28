import React from 'react';
import { Compass, ShieldCheck, Sparkles, Check, X, Info } from 'lucide-react';
import { FIVE_ELEMENTS_RELATION } from './fengShuiData';

const BAGUA_SYMBOLS = {
  'Khảm': { hex: '☵', desc: 'Nước, Dương thủy, phương Bắc' },
  'Khôn': { hex: '☷', desc: 'Đất, Âm thổ, phương Tây Nam' },
  'Chấn': { hex: '☳', desc: 'Sấm sét, Dương mộc, phương Đông' },
  'Tốn': { hex: '☴', desc: 'Gió, Âm mộc, phương Đông Nam' },
  'Càn': { hex: '☰', desc: 'Trời, Dương kim, phương Tây Bắc' },
  'Đoài': { hex: '☱', desc: 'Đầm lầy, Âm kim, phương Tây' },
  'Cấn': { hex: '☶', desc: 'Núi, Dương thổ, phương Đông Bắc' },
  'Ly': { hex: '☲', desc: 'Lửa, Âm hỏa, phương Nam' },
};

export const OverviewCard = ({
  husbandData,
  courtyardImgUrl,
}) => {
  const elementInfo = FIVE_ELEMENTS_RELATION[husbandData.element];
  const symbol = BAGUA_SYMBOLS[husbandData.maleCung];

  return (
    <div className="space-y-6">
      <div className="relative rounded-2xl overflow-hidden border border-[#E2DDD3] bg-[#FFFFFF] shadow-sm">
        {courtyardImgUrl && (
          <div className="absolute inset-0 z-0">
            <img
              src={courtyardImgUrl}
              alt="Phong thủy kiến trúc"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center opacity-15 filter blur-[0.5px]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#FFFFFF] via-[#FFFFFF]/90 to-transparent" />
          </div>
        )}

        <div className="relative z-10 p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#9E2A1E] mb-2 tracking-wide uppercase">
              <Sparkles className="w-4 h-4" />
              <span>Hồ Sơ Bản Mệnh Bát Trạch · Nam Gia Chủ</span>
            </div>
            <h1 className="font-serif-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1F1914] mb-3">
              Gia Chủ Tuổi {husbandData.canChi} ({husbandData.year})
            </h1>
            <p className="text-sm sm:text-base text-[#4F463D] leading-relaxed max-w-2xl mb-5">
              Theo thuật phong thủy Bát Trạch Minh Kính phương Đông, người sinh năm <strong>{husbandData.year} ({husbandData.canChi})</strong> mang nạp âm{' '}
              <strong>{husbandData.napAm}</strong>. Cung Phi Bát Trạch nam mạng thuộc{' '}
              <strong className="text-[#9E2A1E]">Cung {husbandData.maleCung}</strong>, thuộc nhóm{' '}
              <strong className="text-[#874A00]">{husbandData.maleGroup}</strong>.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-[#FAF7F2] border border-[#E8E1D5] rounded-xl p-3 shadow-2xs">
                <span className="text-[11px] text-[#7A6F64] font-medium block">Năm sinh âm lịch</span>
                <span className="font-serif-heading text-base font-bold text-[#1F1914]">{husbandData.canChi}</span>
                <span className="text-[10px] text-[#8C8174] block mt-0.5">Tướng tinh: {husbandData.lunarAnimal}</span>
              </div>

              <div className="bg-[#FAF7F2] border border-[#E8E1D5] rounded-xl p-3 shadow-2xs">
                <span className="text-[11px] text-[#7A6F64] font-medium block">Cung Mệnh (Cung Phi)</span>
                <span className="font-serif-heading text-base font-bold text-[#9E2A1E]">
                  Cung {husbandData.maleCung} {symbol?.hex}
                </span>
                <span className="text-[10px] text-[#8C8174] block mt-0.5">{husbandData.maleGroup}</span>
              </div>

              <div className="bg-[#FAF7F2] border border-[#E8E1D5] rounded-xl p-3 shadow-2xs">
                <span className="text-[11px] text-[#7A6F64] font-medium block">Ngũ Hành Nạp Âm</span>
                <span className="font-serif-heading text-base font-bold text-[#1F1914]">Mệnh {husbandData.element}</span>
                <span className="text-[10px] text-[#8C8174] truncate block mt-0.5" title={husbandData.napAm}>
                  {husbandData.napAm.split('(')[0]}
                </span>
              </div>

              <div className="bg-[#FAF7F2] border border-[#E8E1D5] rounded-xl p-3 shadow-2xs">
                <span className="text-[11px] text-[#7A6F64] font-medium block">Con số may mắn</span>
                <span className="font-serif-heading text-base font-bold text-[#874A00]">
                  {husbandData.luckyNumbers.join(', ')}
                </span>
                <span className="text-[10px] text-[#8C8174] block mt-0.5">Kích hoạt tài lộc</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-4 flex flex-col items-center justify-center p-6 rounded-2xl bg-[#FAF7F2] border border-[#E8E1D5] shadow-xs">
            <div className="w-20 h-20 rounded-full bg-[#FFFFFF] border-2 border-[#9E2A1E] flex items-center justify-center shadow-xs mb-3 text-3xl font-serif text-[#9E2A1E]">
              {symbol?.hex || '☯'}
            </div>
            <span className="font-serif-heading text-xl font-bold text-[#1F1914]">
              Cung {husbandData.maleCung} ({husbandData.maleGroup})
            </span>
            <span className="text-xs text-[#7A6F64] text-center mt-1 max-w-[220px]">
              {symbol?.desc || 'Bát Quái Diên Niên Chi Mệnh'}
            </span>
            <div className="mt-4 pt-3 border-t border-[#E5DFD4] w-full flex items-center justify-around text-center">
              <div>
                <span className="text-[10px] text-[#7A6F64] block">Trạch Mệnh</span>
                <span className="text-xs font-bold text-[#9E2A1E]">{husbandData.maleGroup.split(' ')[0]} Trạch</span>
              </div>
              <div className="w-px h-6 bg-[#E5DFD4]" />
              <div>
                <span className="text-[10px] text-[#7A6F64] block">Bản Mệnh</span>
                <span className="text-xs font-bold text-[#874A00]">{husbandData.element}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Màu sắc & Phong thủy chi tiết */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-[#FFFFFF] border border-[#E4DED4] rounded-2xl p-5 shadow-xs">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-[#EBF7EE] text-[#059669] flex items-center justify-center">
              <Check className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div>
              <h2 className="font-serif-heading text-sm font-bold text-[#1F1914]">Màu Sắc Tương Sinh</h2>
              <span className="text-xs text-[#70665B]">Hành {elementInfo?.generatedBy} sinh {husbandData.element}</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {husbandData.colorColors.birth.map((c) => (
              <span
                key={c}
                className="px-2.5 py-1 rounded-md text-xs bg-[#F2FBF5] text-[#065F46] border border-[#A7F3D0] font-medium"
              >
                {c}
              </span>
            ))}
          </div>
          <p className="text-xs text-[#524940] mt-3 leading-relaxed">
            Ưu tiên làm màu sơn nhà chủ đạo, màu xe hơi, màu rèm cửa hoặc nội thất lớn để tăng cường vận khí.
          </p>
        </div>

        <div className="bg-[#FFFFFF] border border-[#E4DED4] rounded-2xl p-5 shadow-xs">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-[#F0F6FA] text-[#0284C7] flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div>
              <h2 className="font-serif-heading text-sm font-bold text-[#1F1914]">Màu Sắc Tương Hợp</h2>
              <span className="text-xs text-[#70665B]">Đồng mệnh ({husbandData.element})</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {husbandData.colorColors.same.map((c) => (
              <span
                key={c}
                className="px-2.5 py-1 rounded-md text-xs bg-[#F0F9FF] text-[#0369A1] border border-[#BAE6FD] font-medium"
              >
                {c}
              </span>
            ))}
          </div>
          <p className="text-xs text-[#524940] mt-3 leading-relaxed">
            Màu bản mệnh giúp duy trì thế cân bằng, tinh thần thoải mái, công việc ổn định và vững chắc.
          </p>
        </div>

        <div className="bg-[#FFFFFF] border border-[#E4DED4] rounded-2xl p-5 shadow-xs">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-[#FEF2F2] text-[#DC2626] flex items-center justify-center">
              <X className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div>
              <h2 className="font-serif-heading text-sm font-bold text-[#1F1914]">Màu Sắc Kỵ Tránh</h2>
              <span className="text-xs text-[#70665B]">Hành {elementInfo?.overcomeBy} khắc {husbandData.element}</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {husbandData.colorColors.bad.map((c) => (
              <span
                key={c}
                className="px-2.5 py-1 rounded-md text-xs bg-[#FEF2F2] text-[#B91C1C] border border-[#FECACA] font-medium"
              >
                {c}
              </span>
            ))}
          </div>
          <p className="text-xs text-[#524940] mt-3 leading-relaxed">
            Hạn chế sử dụng làm màu chủ đạo của phòng ngủ hay mặt tiền nhà để tránh sinh cảm giác nặng nề, hao hụt năng lượng.
          </p>
        </div>
      </div>

      {/* Vật phẩm phong thủy gợi ý */}
      <div className="bg-[#FAF7F2] border border-[#E5DFD4] rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#FFFFFF] border border-[#DED7CA] flex items-center justify-center text-[#9E2A1E] shadow-2xs shrink-0">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#1F1914]">Đá Quý & Vật Phẩm Hợp Mệnh Gia Chủ</h3>
            <p className="text-xs text-[#5C5349] mt-0.5">
              Gợi ý bổ trợ năng lượng: <strong className="text-[#874A00]">{elementInfo?.luckyStone}</strong>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-[#7A6F64] bg-[#FFFFFF] px-3 py-1.5 rounded-lg border border-[#E0D9CD] shadow-2xs">
          <Info className="w-4 h-4 text-[#8C8174]" />
          <span>Nên khai quang điểm nhãn khi thỉnh linh vật</span>
        </div>
      </div>
    </div>
  );
};
