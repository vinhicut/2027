import React from 'react';
import {
  Flame,
  DoorOpen,
  Bed,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  Shield,
  Layers,
} from 'lucide-react';
import { getDirectionsEvaluation } from './fengShuiLogic';

export const HomeLayoutGuide = ({ husbandData }) => {
  const directions = getDirectionsEvaluation(husbandData.maleCung);
  const goodDirs = directions.filter((d) => d.starType === 'Cát');
  const badDirs = directions.filter((d) => d.starType === 'Hung');

  return (
    <div className="space-y-8">
      <div className="bg-[#FFFFFF] border border-[#E4DED4] rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#9E2A1E] mb-1 tracking-wide uppercase">
          <Layers className="w-4 h-4" />
          <span>Cẩm Nang Phong Thủy Kiến Trúc Nhà Ở Hiện Đại</span>
        </div>
        <h2 className="font-serif-heading text-2xl sm:text-3xl font-bold text-[#1F1914] mb-2">
          Quy Tắc Bố Trí Không Gian Theo Tuổi {husbandData.canChi}
        </h2>
        <p className="text-xs sm:text-sm text-[#4A4239] leading-relaxed max-w-3xl">
          Trong thuật phong thủy nhà ở Bát Trạch, không phải mọi vị trí trong nhà đều cần đặt hướng tốt. Cốt lõi là nghệ thuật cân bằng âm dương: <strong>Khu vực thanh tịnh cần Cát (Tọa Cát Hướng Cát)</strong>, còn <strong>khu vực dơ uế xả hung cần tọa ở phương Hung (Tọa Hung Hướng Cát)</strong> để trấn áp và đốt cháy tà khí.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          <div className="bg-[#EBF7EE] border border-[#A7F3D0] rounded-xl p-4 shadow-xs">
            <span className="text-xs font-bold text-[#065F46] uppercase tracking-wider block mb-2 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#059669]" /> 4 Phương Vị Cát Tường (Gia Chủ {husbandData.maleCung})
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs text-[#1F1914]">
              {goodDirs.map((d) => (
                <div key={d.direction} className="bg-[#FFFFFF] p-2.5 rounded-lg border border-[#A7F3D0]/60 font-medium">
                  <strong className="text-[#059669] font-bold">{d.direction}</strong>: {d.star}
                </div>
              ))}
            </div>
            <p className="text-[11px] text-[#047857] mt-2 font-medium">
              Dùng để: Mở cửa chính, đặt ban thờ gia tiên, giường ngủ, phòng làm việc.
            </p>
          </div>

          <div className="bg-[#FEF2F2] border border-[#FECACA] rounded-xl p-4 shadow-xs">
            <span className="text-xs font-bold text-[#991B1B] uppercase tracking-wider block mb-2 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-[#DC2626]" /> 4 Phương Vị Hung Sát (Gia Chủ {husbandData.maleCung})
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs text-[#1F1914]">
              {badDirs.map((d) => (
                <div key={d.direction} className="bg-[#FFFFFF] p-2.5 rounded-lg border border-[#FECACA]/60 font-medium">
                  <strong className="text-[#DC2626] font-bold">{d.direction}</strong>: {d.star}
                </div>
              ))}
            </div>
            <p className="text-[11px] text-[#B91C1C] mt-2 font-medium">
              Dùng để: Đặt bếp tọa hung, đặt nhà vệ sinh, nhà kho, hầm tự hoại để xả tà khí.
            </p>
          </div>
        </div>
      </div>

      {/* Chi tiết từng không gian chức năng */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* 1. Cửa chính & Phòng khách */}
        <div className="bg-[#FFFFFF] border border-[#E4DED4] rounded-2xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-[#FAF4ED] text-[#9E2A1E] flex items-center justify-center mb-3">
              <DoorOpen className="w-5 h-5" />
            </div>
            <h3 className="font-serif-heading font-bold text-[#1F1914] text-base mb-1">1. Cửa Chính (Khí Khẩu)</h3>
            <span className="text-xs text-[#059669] font-bold block mb-3 uppercase">Nguyên tắc: Tọa Cát Hướng Cát</span>
            <p className="text-xs text-[#524940] leading-relaxed mb-4">
              Cửa chính là nơi nạp khí nuôi sống toàn bộ ngôi nhà. Phải luôn mở nhìn về 1 trong 4 hướng tốt của gia chủ, ưu tiên số 1 là <strong>Sinh Khí</strong> hoặc <strong>Diên Niên</strong>.
            </p>
            <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#EAE3D6] text-xs text-[#5C5349] space-y-1">
              <div>• Không để cửa chính thông thẳng ra cửa hậu (thoát khí).</div>
              <div>• Tránh góc nhọn hoặc cột điện chĩa thẳng vào cửa.</div>
            </div>
          </div>
        </div>

        {/* 2. Bếp Nấu */}
        <div className="bg-[#FFFFFF] border border-[#E4DED4] rounded-2xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-[#FAF4ED] text-[#9E2A1E] flex items-center justify-center mb-3">
              <Flame className="w-5 h-5" />
            </div>
            <h3 className="font-serif-heading font-bold text-[#1F1914] text-base mb-1">2. Bếp Nấu (Táo Quân)</h3>
            <span className="text-xs text-[#9E2A1E] font-bold block mb-3 uppercase">Nguyên tắc: Tọa Hung Hướng Cát</span>
            <p className="text-xs text-[#524940] leading-relaxed mb-4">
              Tuyệt đối không đặt bếp ở hướng tốt. Bếp phải <strong>đặt tại phương vị hung</strong> (như Tuyệt Mệnh, Ngũ Quỷ) và <strong>mặt bếp xoay về hướng cát</strong> để lửa thiêu rụi xui rủi.
            </p>
            <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#EAE3D6] text-xs text-[#5C5349] space-y-1">
              <div>• Không đặt bếp đối diện trực tiếp cửa vệ sinh.</div>
              <div>• Tránh đặt bếp ngay sát dưới phòng ngủ hoặc ban thờ bên trên.</div>
            </div>
          </div>
        </div>

        {/* 3. Phòng Ngủ */}
        <div className="bg-[#FFFFFF] border border-[#E4DED4] rounded-2xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-[#FAF4ED] text-[#9E2A1E] flex items-center justify-center mb-3">
              <Bed className="w-5 h-5" />
            </div>
            <h3 className="font-serif-heading font-bold text-[#1F1914] text-base mb-1">3. Phòng Ngủ & Đầu Giường</h3>
            <span className="text-xs text-[#059669] font-bold block mb-3 uppercase">Nguyên tắc: Tọa Cát Hướng Cát</span>
            <p className="text-xs text-[#524940] leading-relaxed mb-4">
              Con người dành 1/3 cuộc đời trong phòng ngủ. Đầu giường nên kê tựa vào hướng <strong>Thiên Y</strong> (chữa bệnh tật) hoặc <strong>Diên Niên</strong> (tình cảm bền chặt).
            </p>
            <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#EAE3D6] text-xs text-[#5C5349] space-y-1">
              <div>• Đầu giường không kê dưới xà ngang đè lên.</div>
              <div>• Gương soi không chiếu thẳng vào chân giường ngủ.</div>
            </div>
          </div>
        </div>
      </div>

      {/* 5 Thế Sát Thường Gặp & Cách Hóa Giải Nhanh */}
      <div className="bg-[#FAF7F2] border border-[#E2DBD0] rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="w-5 h-5 text-[#9E2A1E]" />
          <div>
            <h3 className="font-serif-heading text-lg font-bold text-[#1F1914]">
              Hóa Giải 4 Thế Phạm Phong Thủy Thường Gặp Nhất
            </h3>
            <span className="text-xs text-[#70665B]">Các thế sát phổ biến trong nhà phố và căn hộ chung cư hiện nay</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-[#FFFFFF] p-4 rounded-xl border border-[#E5DFD4] shadow-2xs">
            <h4 className="font-bold text-[#1F1914] mb-1 flex items-center gap-1.5 text-sm">
              <AlertTriangle className="w-4 h-4 text-[#D97706]" /> 1. Đường hoặc ngõ đâm thẳng vào cửa (Thương Sát)
            </h4>
            <p className="text-[#524940] leading-relaxed mb-2">
              Dòng xe cộ chạy thẳng tạo luồng khí xung sát mạnh khiến gia đạo bất an, dễ gặp tai nạn bất ngờ hoặc hao tài.
            </p>
            <div className="p-2.5 rounded-lg bg-[#FAF5EE] text-[#8C3A27] font-medium border border-[#E9DACB]">
              <strong>Hóa giải:</strong> Trồng hàng cây xanh cản khí, xây bức bình phong chắn gió, hoặc treo gương Bát Quái lồi trước cổng.
            </div>
          </div>

          <div className="bg-[#FFFFFF] p-4 rounded-xl border border-[#E5DFD4] shadow-2xs">
            <h4 className="font-bold text-[#1F1914] mb-1 flex items-center gap-1.5 text-sm">
              <AlertTriangle className="w-4 h-4 text-[#D97706]" /> 2. Cửa chính thông thẳng cửa sau (Xuyên Đường Sát)
            </h4>
            <p className="text-[#524940] leading-relaxed mb-2">
              Gió và tài lộc đi vào cửa trước rồi tuột thẳng ra cửa sau mà không đọng lại trong nhà (tiền vào cửa trước ra cửa sau).
            </p>
            <div className="p-2.5 rounded-lg bg-[#FAF5EE] text-[#8C3A27] font-medium border border-[#E9DACB]">
              <strong>Hóa giải:</strong> Đặt vách ngăn trang trí, chậu cây cảnh tán rộng hoặc treo rèm che ở giữa để luân chuyển dòng khí.
            </div>
          </div>

          <div className="bg-[#FFFFFF] p-4 rounded-xl border border-[#E5DFD4] shadow-2xs">
            <h4 className="font-bold text-[#1F1914] mb-1 flex items-center gap-1.5 text-sm">
              <AlertTriangle className="w-4 h-4 text-[#D97706]" /> 3. Xà ngang đè lên ban thờ hoặc giường ngủ
            </h4>
            <p className="text-[#524940] leading-relaxed mb-2">
              Tạo cảm giác bị đè nén, nhức đầu, áp lực nặng nề trong công việc và giấc ngủ chập chờn.
            </p>
            <div className="p-2.5 rounded-lg bg-[#FAF5EE] text-[#8C3A27] font-medium border border-[#E9DACB]">
              <strong>Hóa giải:</strong> Đóng trần thạch cao phẳng che khuất dầm xà, hoặc xê dịch giường ngủ ra khỏi phạm vi dầm đè.
            </div>
          </div>

          <div className="bg-[#FFFFFF] p-4 rounded-xl border border-[#E5DFD4] shadow-2xs">
            <h4 className="font-bold text-[#1F1914] mb-1 flex items-center gap-1.5 text-sm">
              <AlertTriangle className="w-4 h-4 text-[#D97706]" /> 4. Cửa nhà vệ sinh đối diện bếp nấu hoặc cửa chính
            </h4>
            <p className="text-[#524940] leading-relaxed mb-2">
              Thủy Hỏa tương xung (Thủy của nhà vệ sinh dập tắt Hỏa bếp), uế khí lan tỏa làm ảnh hưởng đường ruột và tài lộc gia đình.
            </p>
            <div className="p-2.5 rounded-lg bg-[#FAF5EE] text-[#8C3A27] font-medium border border-[#E9DACB]">
              <strong>Hóa giải:</strong> Luôn đóng kín cửa vệ sinh, lắp quạt thông gió, treo rèm hạt gỗ hoặc đặt cây trầu bà hút ẩm.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
