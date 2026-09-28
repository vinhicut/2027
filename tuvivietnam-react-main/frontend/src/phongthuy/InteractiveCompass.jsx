import React, { useState } from 'react';
import {
  Compass,
  CheckCircle2,
  AlertTriangle,
  Navigation,
} from 'lucide-react';
import { getDirectionsEvaluation } from './fengShuiLogic';

const COMPASS_SECTORS = [
  { direction: 'Bắc', angle: 0, label: 'BẮC (Khảm)' },
  { direction: 'Đông Bắc', angle: 45, label: 'Đ.BẮC (Cấn)' },
  { direction: 'Đông', angle: 90, label: 'ĐÔNG (Chấn)' },
  { direction: 'Đông Nam', angle: 135, label: 'Đ.NAM (Tốn)' },
  { direction: 'Nam', angle: 180, label: 'NAM (Ly)' },
  { direction: 'Tây Nam', angle: 225, label: 'T.NAM (Khôn)' },
  { direction: 'Tây', angle: 270, label: 'TÂY (Đoài)' },
  { direction: 'Tây Bắc', angle: 315, label: 'T.BẮC (Càn)' },
];

export const InteractiveCompass = ({
  husbandData,
  wifeData,
  luopanImgUrl,
}) => {
  const [selectedPerson, setSelectedPerson] = useState('husband');
  const [currentAngle, setCurrentAngle] = useState(135);

  const currentPerson = selectedPerson === 'husband' ? husbandData : wifeData;
  const currentCung = selectedPerson === 'husband' ? husbandData.maleCung : wifeData.femaleCung;
  const directions = getDirectionsEvaluation(currentCung);

  const normalizedAngle = ((currentAngle % 360) + 360) % 360;

  const currentSector = COMPASS_SECTORS.reduce((closest, sector) => {
    const diff = Math.min(
      Math.abs(sector.angle - normalizedAngle),
      360 - Math.abs(sector.angle - normalizedAngle)
    );
    const closestDiff = Math.min(
      Math.abs(closest.angle - normalizedAngle),
      360 - Math.abs(closest.angle - normalizedAngle)
    );
    return diff < closestDiff ? sector : closest;
  }, COMPASS_SECTORS[0]);

  const activeDirectionEval = directions.find(
    (d) => d.direction === currentSector.direction
  );

  return (
    <div className="space-y-8">
      <div className="bg-[#FFFFFF] border border-[#E4DED4] rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-[#ECE5DA] gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#9E2A1E] mb-1 tracking-wide uppercase">
              <Compass className="w-4 h-4" />
              <span>La Kinh Bát Trạch 360° Trực Quan</span>
            </div>
            <h2 className="font-serif-heading text-2xl font-bold text-[#1F1914]">
              Đo Hướng Nhà Theo La Bàn Phong Thủy
            </h2>
            <p className="text-xs sm:text-sm text-[#70665B] mt-0.5">
              Xoay kim la bàn hoặc trượt thanh điều chỉnh để kiểm tra khí trường của bất kỳ hướng nhà nào
            </p>
          </div>

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
                Theo Chồng ({husbandData.maleCung})
              </button>
              <button
                onClick={() => setSelectedPerson('wife')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  selectedPerson === 'wife'
                    ? 'bg-[#059669] text-white shadow-xs'
                    : 'text-[#645A50] hover:text-[#1F1914]'
                }`}
              >
                Theo Vợ ({wifeData.femaleCung})
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Vòng quay La Bàn */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center">
            <div className="relative w-72 h-72 sm:w-96 sm:h-96 rounded-full border-4 border-[#8B2519] bg-[#FAF8F5] shadow-md flex items-center justify-center select-none overflow-hidden">
              {/* Ảnh nền La kinh nếu có */}
              {luopanImgUrl && (
                <img
                  src={luopanImgUrl}
                  alt="La kinh phong thủy"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover opacity-15 filter blur-[0.2px] pointer-events-none"
                />
              )}

              {/* Vòng tròn chia độ ngoài */}
              <div className="absolute inset-2 rounded-full border border-[#D5CCC0] pointer-events-none" />
              <div className="absolute inset-8 rounded-full border border-[#E2DAD0] pointer-events-none" />

              {/* 8 Cung Phương Vị Xung Quanh */}
              {COMPASS_SECTORS.map((sector) => {
                const evalItem = directions.find((d) => d.direction === sector.direction);
                const isGood = evalItem?.starType === 'Cát';
                const isCurrent = sector.direction === currentSector.direction;

                // Tọa độ vị trí chữ trên vòng tròn
                const rad = ((sector.angle - 90) * Math.PI) / 180;
                const radius = 135; // bán kính cho kích thước tương ứng
                const x = Math.cos(rad) * radius;
                const y = Math.sin(rad) * radius;

                return (
                  <button
                    key={sector.direction}
                    onClick={() => setCurrentAngle(sector.angle)}
                    style={{
                      transform: `translate(${x}px, ${y}px)`,
                    }}
                    className={`absolute z-20 flex flex-col items-center justify-center p-1.5 rounded-lg transition-transform cursor-pointer ${
                      isCurrent
                        ? 'scale-110 shadow-sm ring-2 ring-[#9E2A1E]'
                        : 'hover:scale-105'
                    } ${
                      isGood
                        ? 'bg-[#EBF7EE] border border-[#A7F3D0] text-[#065F46]'
                        : 'bg-[#FEF2F2] border border-[#FECACA] text-[#991B1B]'
                    }`}
                  >
                    <span className="text-[10px] font-bold leading-none">{sector.direction}</span>
                    <span className="text-[9px] font-semibold leading-none mt-0.5 opacity-90">
                      {evalItem?.star}
                    </span>
                  </button>
                );
              })}

              {/* Kim Chỉ Nam Xoay Tương Tác */}
              <div
                className="absolute z-10 w-full h-full pointer-events-none transition-transform duration-300 ease-out"
                style={{ transform: `rotate(${currentAngle}deg)` }}
              >
                {/* Đầu kim chỉ đỏ (Hướng Đang Đo) */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 flex flex-col items-center">
                  <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[40px] border-b-[#DC2626] drop-shadow-sm" />
                  <span className="text-[9px] font-black text-[#DC2626] uppercase mt-0.5 bg-white px-1 rounded shadow-2xs">
                    HƯỚNG NHÀ
                  </span>
                </div>

                {/* Đuôi kim (Tọa Nhà) */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center">
                  <span className="text-[9px] font-black text-[#645A50] uppercase mb-0.5 bg-white px-1 rounded shadow-2xs">
                    TỌA
                  </span>
                  <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[40px] border-t-[#645A50]" />
                </div>

                {/* Trục tâm la bàn */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#1F1914] border-2 border-[#FFFFFF] shadow-md flex items-center justify-center text-white text-[10px] font-bold">
                  ☯
                </div>
              </div>

              {/* Vạch tia độ ở tâm */}
              <div className="text-center z-0 pointer-events-none">
                <span className="font-serif-heading text-3xl font-bold text-[#1F1914] block leading-none">
                  {normalizedAngle}°
                </span>
                <span className="text-[11px] text-[#7A6F64] font-medium uppercase tracking-wider mt-1 block">
                  {currentSector.direction}
                </span>
              </div>
            </div>

            {/* Thanh trượt điều chỉnh góc xoay */}
            <div className="w-full max-w-sm mt-6">
              <div className="flex items-center justify-between text-xs text-[#7A6F64] mb-1.5 font-medium">
                <span>0° (Bắc)</span>
                <span className="font-bold text-[#9E2A1E] text-sm">Góc độ hiện tại: {normalizedAngle}°</span>
                <span>360°</span>
              </div>
              <input
                type="range"
                min="0"
                max="359"
                value={currentAngle}
                onChange={(e) => setCurrentAngle(Number(e.target.value))}
                className="w-full h-2 bg-[#E6DFD5] rounded-lg appearance-none cursor-pointer accent-[#9E2A1E]"
              />
              <div className="flex justify-between mt-2 text-[11px] text-[#8C8174]">
                <button
                  onClick={() => setCurrentAngle(0)}
                  className="hover:text-[#1F1914] hover:underline cursor-pointer"
                >
                  Bắc (0°)
                </button>
                <button
                  onClick={() => setCurrentAngle(90)}
                  className="hover:text-[#1F1914] hover:underline cursor-pointer"
                >
                  Đông (90°)
                </button>
                <button
                  onClick={() => setCurrentAngle(180)}
                  className="hover:text-[#1F1914] hover:underline cursor-pointer"
                >
                  Nam (180°)
                </button>
                <button
                  onClick={() => setCurrentAngle(270)}
                  className="hover:text-[#1F1914] hover:underline cursor-pointer"
                >
                  Tây (270°)
                </button>
              </div>
            </div>
          </div>

          {/* Chi tiết hướng đang trỏ */}
          <div className="lg:col-span-5 space-y-4">
            {activeDirectionEval && (
              <div
                className={`rounded-2xl border p-6 ${
                  activeDirectionEval.starType === 'Cát'
                    ? 'bg-[#F2FAF4] border-[#A7F3D0]'
                    : 'bg-[#FFF8F8] border-[#FECACA]'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Navigation className="w-5 h-5 text-[#9E2A1E]" />
                    <span className="text-xs font-bold text-[#7A6F64] uppercase tracking-wider">
                      Kết Quả Đo Hướng: {normalizedAngle}°
                    </span>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1 ${
                      activeDirectionEval.starType === 'Cát'
                        ? 'bg-[#EBF7EE] text-[#059669] border border-[#A7F3D0]'
                        : 'bg-[#FEF2F2] text-[#DC2626] border border-[#FECACA]'
                    }`}
                  >
                    {activeDirectionEval.starType === 'Cát' ? (
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    ) : (
                      <AlertTriangle className="w-3.5 h-3.5" />
                    )}
                    {activeDirectionEval.star} ({activeDirectionEval.starType})
                  </span>
                </div>

                <h3 className="font-serif-heading text-2xl font-bold text-[#1F1914] mb-1">
                  Nhà Hướng {activeDirectionEval.direction} ({activeDirectionEval.degreesCenter}°)
                </h3>
                <span className="text-xs text-[#7A6F64] block mb-3">
                  Thuộc sao: <strong>{activeDirectionEval.alias}</strong> · Điểm cát hung: <strong>{activeDirectionEval.score}/10</strong>
                </span>

                <div className="bg-[#FFFFFF] p-4 rounded-xl border border-[#E4DED4] mb-4">
                  <span className="text-xs font-bold text-[#1F1914] block mb-1">Ý nghĩa phương vị:</span>
                  <p className="text-xs text-[#4A4239] leading-relaxed">
                    {activeDirectionEval.fullDesc}
                  </p>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex items-start gap-2 bg-[#FFFFFF]/80 p-2.5 rounded-lg border border-[#E5DFD4]">
                    <span className="font-bold text-[#1F1914] shrink-0">Cửa chính:</span>
                    <span className="text-[#554C42]">{activeDirectionEval.spatialUsage.door}</span>
                  </div>

                  <div className="flex items-start gap-2 bg-[#FFFFFF]/80 p-2.5 rounded-lg border border-[#E5DFD4]">
                    <span className="font-bold text-[#1F1914] shrink-0">Ban thờ:</span>
                    <span className="text-[#554C42]">{activeDirectionEval.spatialUsage.altar}</span>
                  </div>

                  <div className="flex items-start gap-2 bg-[#FFFFFF]/80 p-2.5 rounded-lg border border-[#E5DFD4]">
                    <span className="font-bold text-[#1F1914] shrink-0">Phòng ngủ:</span>
                    <span className="text-[#554C42]">{activeDirectionEval.spatialUsage.bedroom}</span>
                  </div>
                </div>

                {activeDirectionEval.starType === 'Hung' && activeDirectionEval.cures && (
                  <div className="mt-4 p-3 bg-[#FEF2F2] rounded-xl border border-[#FCA5A5] text-xs text-[#991B1B]">
                    <span className="font-bold block mb-1">Phương pháp hóa giải nếu nhà phạm hướng này:</span>
                    <p className="leading-relaxed">{activeDirectionEval.cures}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
