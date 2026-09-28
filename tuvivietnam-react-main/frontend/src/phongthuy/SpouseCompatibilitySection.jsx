import React from 'react';
import {
  Heart,
  Flame,
  Baby,
  Home,
  ShieldCheck,
  Sparkles,
  Info,
  Compass,
} from 'lucide-react';
import { evaluateSpouseCompatibility } from './fengShuiLogic';

export const SpouseCompatibilitySection = ({
  husbandYear,
  wifeYear,
}) => {
  const analysis = evaluateSpouseCompatibility(husbandYear, wifeYear);
  const { husband, wife } = analysis;

  return (
    <div className="space-y-8">
      <div className="bg-[#FFFFFF] border border-[#E4DED4] rounded-2xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#9E2A1E]/5 rounded-bl-full pointer-events-none" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#9E2A1E] mb-1 tracking-wide uppercase">
              <Heart className="w-4 h-4 fill-[#9E2A1E]/20 text-[#9E2A1E]" />
              <span>Luận Giải Hôn Nhân Phong Thủy Bát Trạch & Tử Vi</span>
            </div>
            <h2 className="font-serif-heading text-2xl sm:text-3xl font-bold text-[#1F1914] mb-2">
              Chồng {husband.canChi} ({husband.year}) & Vợ {wife.canChi} ({wife.year})
            </h2>
            <p className="text-sm text-[#4A4239] leading-relaxed mb-4">
              {analysis.overviewAdvice}
            </p>

            <div className="flex flex-wrap items-center gap-2.5 text-xs">
              <span className="px-3 py-1.5 rounded-lg bg-[#FAF7F2] border border-[#E8E1D5] text-[#1F1914] shadow-xs">
                Chồng: <strong className="text-[#9E2A1E]">Cung {husband.maleCung}</strong> · Mệnh {husband.napAm.split('(')[0]}
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-[#FAF7F2] border border-[#E8E1D5] text-[#1F1914] shadow-xs">
                Vợ: <strong className="text-[#059669]">Cung {wife.femaleCung}</strong> · Mệnh {wife.napAm.split('(')[0]}
              </span>
            </div>
          </div>

          <div className="md:col-span-4 flex flex-col items-center justify-center p-6 bg-[#FAF7F2] border border-[#E8E1D5] rounded-2xl text-center shadow-xs">
            <span className="text-xs text-[#70665B] mb-1 font-semibold uppercase tracking-wider">
              Chỉ Số Tương Hợp
            </span>
            <div className="text-4xl sm:text-5xl font-bold font-serif-heading text-[#1F1914] my-1">
              {analysis.score}
              <span className="text-lg text-[#7A6F64] font-sans font-normal">/10</span>
            </div>
            <span
              className="mt-2 px-3.5 py-1 rounded-full text-xs font-bold text-white shadow-2xs"
              style={{ backgroundColor: analysis.ratingColor }}
            >
              {analysis.rating}
            </span>
          </div>
        </div>
      </div>

      {/* 4 Trụ Cột Đánh Giá Hôn Nhân */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* 1. Cung Phi Bát Trạch */}
        <div className="bg-[#FFFFFF] border border-[#E4DED4] rounded-2xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-[#9E2A1E]" />
                <h3 className="font-bold text-[#1F1914] text-base">1. Cung Mệnh Bát Trạch (Du Niên)</h3>
              </div>
              <span
                className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                  analysis.cungPhi.starType === 'Cát'
                    ? 'bg-[#EBF7EE] text-[#059669] border border-[#A7F3D0]'
                    : 'bg-[#FEF2F2] text-[#DC2626] border border-[#FECACA]'
                }`}
              >
                {analysis.cungPhi.star} ({analysis.cungPhi.starType})
              </span>
            </div>
            <p className="text-xs text-[#524940] leading-relaxed mb-3">
              {analysis.cungPhi.detail}
            </p>
          </div>

          {analysis.cungPhi.cures && (
            <div className="mt-3 p-3 bg-[#FEF2F2] rounded-xl border border-[#FECACA] text-xs text-[#991B1B]">
              <strong>Cách hóa giải:</strong> {analysis.cungPhi.cures}
            </div>
          )}
        </div>

        {/* 2. Ngũ Hành Bản Mệnh */}
        <div className="bg-[#FFFFFF] border border-[#E4DED4] rounded-2xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-[#D97706]" />
                <h3 className="font-bold text-[#1F1914] text-base">2. Ngũ Hành Nạp Âm Bản Mệnh</h3>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#FAF7F2] text-[#1F1914] border border-[#E0D8CB]">
                {analysis.nguHanh.relation} ({analysis.nguHanh.score}đ)
              </span>
            </div>
            <p className="text-xs text-[#524940] leading-relaxed mb-3">
              {analysis.nguHanh.detail}
            </p>
          </div>

          {analysis.nguHanh.cures && (
            <div className="mt-3 p-3 bg-[#FEF2F2] rounded-xl border border-[#FECACA] text-xs text-[#991B1B]">
              <strong>Cách hóa giải:</strong> {analysis.nguHanh.cures}
            </div>
          )}
        </div>

        {/* 3. Địa Chi (Con Giáp) */}
        <div className="bg-[#FFFFFF] border border-[#E4DED4] rounded-2xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#0284C7]" />
                <h3 className="font-bold text-[#1F1914] text-base">3. Địa Chi (Tuổi Con Giáp)</h3>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#FAF7F2] text-[#1F1914] border border-[#E0D8CB]">
                {analysis.diaChi.relation} ({analysis.diaChi.score}đ)
              </span>
            </div>
            <p className="text-xs text-[#524940] leading-relaxed mb-3">
              {analysis.diaChi.detail}
            </p>
          </div>

          {analysis.diaChi.cures && (
            <div className="mt-3 p-3 bg-[#FEF2F2] rounded-xl border border-[#FECACA] text-xs text-[#991B1B]">
              <strong>Cách hóa giải:</strong> {analysis.diaChi.cures}
            </div>
          )}
        </div>

        {/* 4. Thiên Can */}
        <div className="bg-[#FFFFFF] border border-[#E4DED4] rounded-2xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#059669]" />
                <h3 className="font-bold text-[#1F1914] text-base">4. Thiên Can Đôi Bên</h3>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#FAF7F2] text-[#1F1914] border border-[#E0D8CB]">
                {analysis.thienCan.relation} ({analysis.thienCan.score}đ)
              </span>
            </div>
            <p className="text-xs text-[#524940] leading-relaxed mb-3">
              {analysis.thienCan.detail}
            </p>
          </div>

          <div className="mt-3 p-3 bg-[#FAF7F2] rounded-xl border border-[#E5DFD4] text-xs text-[#5C5349]">
            Thiên can hòa hợp giúp đời sống tinh thần đồng điệu, làm việc dễ đạt đồng thuận.
          </div>
        </div>
      </div>

      {/* Phương pháp hóa giải toàn diện phong thủy hôn nhân */}
      <div className="bg-[#FAF7F2] border border-[#E2DBD0] rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#9E2A1E] mb-2 uppercase tracking-wide">
          <ShieldCheck className="w-4 h-4" />
          <span>Biện Pháp Cân Bằng Hóa Giải Hôn Nhân & Gia Đạo</span>
        </div>
        <h3 className="font-serif-heading text-xl sm:text-2xl font-bold text-[#1F1914] mb-3">
          Giải Pháp Phong Thủy Cải Thiện Vận Khí Cho Đôi Bạn
        </h3>
        <p className="text-xs sm:text-sm text-[#4F463D] leading-relaxed max-w-3xl mb-6">
          Cổ nhân có câu: <em>"Nhất Mệnh, Nhì Vận, Tam Phong Thủy, Tứ Tích Âm Đức, Ngũ Độc Thư"</em>. Tuổi tác chỉ là một phần tiền định, quan trọng nhất là việc sử dụng phương hướng nhà ở, hướng bếp và đức hạnh để vun bồi hạnh phúc gia đình.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#FFFFFF] p-5 rounded-xl border border-[#E5DFD5] shadow-2xs">
            <div className="w-8 h-8 rounded-lg bg-[#FAF4ED] text-[#9E2A1E] flex items-center justify-center mb-3">
              <Home className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-[#1F1914] mb-1">Hướng Bếp Hóa Giải</h4>
            <p className="text-xs text-[#524940] leading-relaxed">
              Đặt bếp quay về hướng tốt theo cung mệnh của người chồng. Bếp mang tính Hỏa có công năng thiêu đốt tà khí, hóa hung thành cát, giúp gia đình ấm êm.
            </p>
          </div>

          <div className="bg-[#FFFFFF] p-5 rounded-xl border border-[#E5DFD5] shadow-2xs">
            <div className="w-8 h-8 rounded-lg bg-[#FAF4ED] text-[#9E2A1E] flex items-center justify-center mb-3">
              <Baby className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-[#1F1914] mb-1">Chọn Năm Sinh Con Hợp Tuổi</h4>
            <p className="text-xs text-[#524940] leading-relaxed">
              Sinh con mang Cung Phi hoặc Ngũ Hành đóng vai trò trung gian hóa giải xung khắc giữa cha và mẹ, mang lại luồng sinh khí mới cho toàn bộ ngôi nhà.
            </p>
          </div>

          <div className="bg-[#FFFFFF] p-5 rounded-xl border border-[#E5DFD5] shadow-2xs">
            <div className="w-8 h-8 rounded-lg bg-[#FAF4ED] text-[#9E2A1E] flex items-center justify-center mb-3">
              <Heart className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-[#1F1914] mb-1">Tâm Đức & Hòa Hợp</h4>
            <p className="text-xs text-[#524940] leading-relaxed">
              Sự nhường nhịn, yêu thương, cùng nhau tu dưỡng tâm tính chính là phong thủy mạnh nhất. Gia đình hòa thuận thì tự khắc vạn sự hưng long.
            </p>
          </div>
        </div>

        <div className="mt-5 pt-4 border-t border-[#ECE5DA] flex items-center gap-2 text-xs text-[#7A6F64]">
          <Info className="w-4 h-4 text-[#8C8174] shrink-0" />
          <span>Bát Trạch Phong Thủy nhấn mạnh lấy đức trị mệnh, lấy cát chế hung. Mọi xung khắc đều có phương thức hóa giải phù hợp.</span>
        </div>
      </div>
    </div>
  );
};
