import React, { useState } from 'react';
import {
  Compass,
  CheckCircle2,
  AlertTriangle,
  Flame,
  DoorOpen,
  Bed,
  Shield,
  Layers,
} from 'lucide-react';
import { getDirectionsEvaluation } from './fengShuiLogic';

export const DirectionsSection = ({
  husbandData,
  wifeData,
}) => {
  const [selectedPerson, setSelectedPerson] = useState('husband');
  const [filterType, setFilterType] = useState('all');

  const currentPerson = selectedPerson === 'husband' ? husbandData : wifeData;
  const currentCung = selectedPerson === 'husband' ? husbandData.maleCung : wifeData.femaleCung;
  const currentGroup = selectedPerson === 'husband' ? husbandData.maleGroup : wifeData.femaleGroup;

  const directions = getDirectionsEvaluation(currentCung);
  const husbandDirs = getDirectionsEvaluation(husbandData.maleCung);
  const wifeDirs = getDirectionsEvaluation(wifeData.femaleCung);

  const goodDirections = directions.filter((d) => d.starType === 'Cát');
  const badDirections = directions.filter((d) => d.starType === 'Hung');

  const filteredDirections =
    filterType === 'all'
      ? directions
      : filterType === 'good'
      ? goodDirections
      : badDirections;

  return (
    <div className="space-y-8">
      <div className="bg-[#FFFFFF] border border-[#E4DED4] rounded-2xl p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#ECE5DA]">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#9E2A1E] mb-1 tracking-wide uppercase">
              <Compass className="w-4 h-4" />
              <span>Bát Trạch Minh Kính · 8 Phương Vị Khí Trường</span>
            </div>
            <h2 className="font-serif-heading text-xl sm:text-2xl font-bold text-[#1F1914]">
              Định Hướng Nhà Cát Hung Cho {selectedPerson === 'husband' ? 'Nam Gia Chủ' : 'Nữ Gia Chủ'}
            </h2>
            <p className="text-xs sm:text-sm text-[#645A50] mt-1">
              Dựa trên Cung Phi <strong className="text-[#1F1914]">{currentCung}</strong> ({currentGroup}) của tuổi{' '}
              <strong className="text-[#1F1914]">{currentPerson.canChi} ({currentPerson.year})</strong>
            </p>
          </div>

          {/* Toggle chuyển đổi đối tượng xem */}
          <div className="flex items-center gap-2">
            <div className="inline-flex p-1 bg-[#FAF6F0] rounded-xl border border-[#E2DBD0]">
              <button
                onClick={() => setSelectedPerson('husband')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  selectedPerson === 'husband'
                    ? 'bg-[#9E2A1E] text-white shadow-xs'
                    : 'text-[#645A50] hover:text-[#1F1914]'
                }`}
              >
                Chồng ({husbandData.canChi} - {husbandData.maleCung})
              </button>
              <button
                onClick={() => setSelectedPerson('wife')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  selectedPerson === 'wife'
                    ? 'bg-[#059669] text-white shadow-xs'
                    : 'text-[#645A50] hover:text-[#1F1914]'
                }`}
              >
                Vợ ({wifeData.canChi} - {wifeData.femaleCung})
              </button>
            </div>
          </div>
        </div>

        {/* Bộ lọc loại sao */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4">
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-[#70665B] font-medium mr-1">Hiển thị:</span>
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1 text-xs rounded-lg font-medium transition-colors cursor-pointer ${
                filterType === 'all'
                  ? 'bg-[#1F1914] text-white'
                  : 'bg-[#FAF7F2] text-[#554C42] border border-[#E0D8CB]'
              }`}
            >
              Tất cả 8 hướng
            </button>
            <button
              onClick={() => setFilterType('good')}
              className={`px-3 py-1 text-xs rounded-lg font-medium transition-colors cursor-pointer flex items-center gap-1 ${
                filterType === 'good'
                  ? 'bg-[#059669] text-white'
                  : 'bg-[#EBF7EE] text-[#065F46] border border-[#A7F3D0]'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" /> 4 Hướng Tốt (Cát Trạch)
            </button>
            <button
              onClick={() => setFilterType('bad')}
              className={`px-3 py-1 text-xs rounded-lg font-medium transition-colors cursor-pointer flex items-center gap-1 ${
                filterType === 'bad'
                  ? 'bg-[#DC2626] text-white'
                  : 'bg-[#FEF2F2] text-[#991B1B] border border-[#FECACA]'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" /> 4 Hướng Xấu (Hung Trạch)
            </button>
          </div>

          <div className="text-xs text-[#70665B]">
            Thuộc mệnh: <strong className="text-[#9E2A1E] font-bold">{currentGroup}</strong>
          </div>
        </div>
      </div>

      {/* Grid 8 hướng nhà */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredDirections.map((item) => {
          const isGood = item.starType === 'Cát';
          return (
            <div
              key={item.direction}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden flex flex-col justify-between ${
                isGood
                  ? 'bg-[#FFFFFF] border-[#D1E7DD] hover:border-[#10B981] shadow-xs'
                  : 'bg-[#FFFFFF] border-[#F8D7DA] hover:border-[#EF4444] shadow-xs'
              }`}
            >
              <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <span className="text-xs font-semibold text-[#7A6F64] block">
                      Góc {item.angleRange} ({item.degreesCenter}°)
                    </span>
                    <h3 className="font-serif-heading text-xl font-bold text-[#1F1914] flex items-center gap-1.5 mt-0.5">
                      Hướng {item.direction}
                    </h3>
                  </div>

                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      isGood
                        ? 'bg-[#EBF7EE] text-[#059669] border border-[#A7F3D0]'
                        : 'bg-[#FEF2F2] text-[#DC2626] border border-[#FECACA]'
                    }`}
                  >
                    {item.star} ({item.starType})
                  </span>
                </div>

                <div className="mb-3">
                  <span className="text-[11px] font-medium text-[#7A6F64] block">Tên sao: {item.alias}</span>
                  <p className="text-xs font-semibold text-[#1F1914] mt-1 leading-snug">
                    {item.summary}
                  </p>
                </div>

                <p className="text-xs text-[#524940] leading-relaxed mb-4 line-clamp-3">
                  {item.fullDesc}
                </p>

                {/* Ứng dụng cụ thể cho từng phòng */}
                <div className="space-y-1.5 pt-3 border-t border-[#EFEAE2] text-[11px]">
                  <div className="flex items-start gap-1.5 text-[#3A332C]">
                    <DoorOpen className="w-3.5 h-3.5 text-[#8C8174] shrink-0 mt-0.5" />
                    <span><strong>Cửa chính:</strong> {item.spatialUsage.door}</span>
                  </div>
                  <div className="flex items-start gap-1.5 text-[#3A332C]">
                    <Bed className="w-3.5 h-3.5 text-[#8C8174] shrink-0 mt-0.5" />
                    <span><strong>Phòng ngủ:</strong> {item.spatialUsage.bedroom}</span>
                  </div>
                  <div className="flex items-start gap-1.5 text-[#3A332C]">
                    <Flame className="w-3.5 h-3.5 text-[#8C8174] shrink-0 mt-0.5" />
                    <span><strong>Bếp nấu:</strong> {item.spatialUsage.kitchen}</span>
                  </div>
                </div>
              </div>

              {/* Giải pháp hóa giải nếu là hướng hung */}
              {!isGood && item.cures && (
                <div className="bg-[#FFF8F8] border-t border-[#FEE2E2] p-3 text-[11px] text-[#991B1B]">
                  <div className="flex items-center gap-1 font-bold mb-0.5">
                    <Shield className="w-3 h-3 text-[#DC2626]" />
                    <span>Phương pháp hóa giải:</span>
                  </div>
                  <p className="leading-tight text-[#7F1D1D] opacity-90">{item.cures}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bảng so sánh nhanh hướng nhà giữa hai vợ chồng */}
      <div className="bg-[#FAF7F2] border border-[#E5DFD4] rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Layers className="w-5 h-5 text-[#9E2A1E]" />
          <div>
            <h3 className="font-serif-heading text-lg font-bold text-[#1F1914]">
              Bảng Đối Chiếu 8 Phương Vị Giữa Hai Vợ Chồng
            </h3>
            <span className="text-xs text-[#70665B]">
              Giúp gia chủ chọn hướng nhà và hướng bếp hòa hợp khi hai vợ chồng thuộc hai cung mệnh khác nhau
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#E0D8CC] text-[#70665B] uppercase text-[10px] tracking-wider">
                <th className="py-2.5 px-3 font-semibold">Phương Vị</th>
                <th className="py-2.5 px-3 font-semibold">Góc Độ</th>
                <th className="py-2.5 px-3 font-semibold">
                  Chồng ({husbandData.canChi} - {husbandData.maleCung})
                </th>
                <th className="py-2.5 px-3 font-semibold">
                  Vợ ({wifeData.canChi} - {wifeData.femaleCung})
                </th>
                <th className="py-2.5 px-3 font-semibold">Đánh Giá Phối Hợp & Lời Khuyên Bố Trí</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EFE8DD]">
              {husbandDirs.map((hDir, idx) => {
                const wDir = wifeDirs[idx];
                const hGood = hDir.starType === 'Cát';
                const wGood = wDir.starType === 'Cát';

                let verdict = '';
                let verdictBadge = '';
                if (hGood && wGood) {
                  verdict = 'Song cát đại lợi - Rất tốt để mở cửa chính, hướng nhà hoặc phòng khách.';
                  verdictBadge = 'bg-[#EBF7EE] text-[#059669] border-[#A7F3D0]';
                } else if (hGood && !wGood) {
                  verdict = 'Hợp chồng, khắc vợ - Vẫn ưu tiên hướng nhà theo chồng, hóa giải phòng ngủ hoặc bếp cho vợ.';
                  verdictBadge = 'bg-[#FAF5FF] text-[#7E22CE] border-[#E9D5FF]';
                } else if (!hGood && wGood) {
                  verdict = 'Khắc chồng, hợp vợ - Nếu nhà hướng này, nên mở thêm cửa phụ hoặc dùng màu sắc ngũ hành trung gian.';
                  verdictBadge = 'bg-[#FFFBEB] text-[#B45309] border-[#FDE68A]';
                } else {
                  verdict = 'Song hung - Tuyệt đối không chọn làm hướng nhà chính; rất tốt để đặt bếp tọa hung hướng cát hoặc nhà vệ sinh.';
                  verdictBadge = 'bg-[#FEF2F2] text-[#DC2626] border-[#FECACA]';
                }

                return (
                  <tr key={hDir.direction} className="hover:bg-[#FFFFFF]/60">
                    <td className="py-3 px-3 font-bold text-[#1F1914]">{hDir.direction}</td>
                    <td className="py-3 px-3 text-[#70665B]">{hDir.degreesCenter}°</td>
                    <td className="py-3 px-3">
                      <span
                        className={`inline-flex px-2 py-0.5 rounded text-[11px] font-semibold border ${
                          hGood
                            ? 'bg-[#EBF7EE] text-[#059669] border-[#A7F3D0]'
                            : 'bg-[#FEF2F2] text-[#DC2626] border-[#FECACA]'
                        }`}
                      >
                        {hDir.star} ({hDir.starType})
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`inline-flex px-2 py-0.5 rounded text-[11px] font-semibold border ${
                          wGood
                            ? 'bg-[#EBF7EE] text-[#059669] border-[#A7F3D0]'
                            : 'bg-[#FEF2F2] text-[#DC2626] border-[#FECACA]'
                        }`}
                      >
                        {wDir.star} ({wDir.starType})
                      </span>
                    </td>
                    <td className="py-3 px-3 text-[#4A4239] leading-relaxed">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold border ${verdictBadge}`}>
                          {hGood && wGood ? 'ĐẠI CÁT' : !hGood && !wGood ? 'SONG HUNG' : 'BÌNH HÒA'}
                        </span>
                        <span>{verdict}</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
