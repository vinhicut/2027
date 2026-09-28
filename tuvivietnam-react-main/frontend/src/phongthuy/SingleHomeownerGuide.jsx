import React from 'react';
import {
  Sparkles,
  Heart,
  CheckCircle2,
  UserCheck,
  Award,
  Info,
} from 'lucide-react';
import { evaluateSpouseCompatibility } from './fengShuiLogic';

export const SingleHomeownerGuide = ({
  husbandData,
  onSelectPotentialSpouse,
}) => {
  const candidateYears = Array.from(
    { length: 15 },
    (_, i) => husbandData.year - 8 + i
  ).filter((y) => y >= 1950 && y <= 2026);

  const bestMatches = candidateYears
    .map((wYear) => evaluateSpouseCompatibility(husbandData.year, wYear))
    .sort((a, b) => b.score - a.score)
    .slice(0, 6);

  let peachBlossomDirection = 'Đông';
  let peachBlossomAnimal = 'Mão';
  let peachBlossomCure = 'Đặt bình hoa tươi màu xanh hoặc nuôi cá cảnh bơi lội';

  const chi = husbandData.chi;
  if (['Dần', 'Ngọ', 'Tuất'].includes(chi)) {
    peachBlossomDirection = 'Đông (90°)';
    peachBlossomAnimal = 'Mão';
    peachBlossomCure = 'Đặt bình hoa mẫu đơn, hoa hồng tươi (4 cành) hoặc cây kim ngân xanh mướt tại phương Đông.';
  } else if (['Thân', 'Tý', 'Thìn'].includes(chi)) {
    peachBlossomDirection = 'Tây (270°)';
    peachBlossomAnimal = 'Dậu';
    peachBlossomCure = 'Đặt chuông gió đồng, đôi thiên nga bằng kim loại hoặc bình hoa ly trắng (7 cành) tại phương Tây.';
  } else if (['Hợi', 'Mão', 'Mùi'].includes(chi)) {
    peachBlossomDirection = 'Bắc (0°)';
    peachBlossomAnimal = 'Tý';
    peachBlossomCure = 'Đặt thác nước phong thủy mini, hồ cá nhỏ hoặc bình hoa thủy sinh (1 hoặc 6 cành) tại phương Bắc.';
  } else {
    peachBlossomDirection = 'Nam (180°)';
    peachBlossomAnimal = 'Ngọ';
    peachBlossomCure = 'Đặt quả cầu thạch anh hồng, thắp đèn ngủ ánh sáng ấm hoặc bình hoa tươi màu đỏ (9 cành) tại phương Nam.';
  }

  return (
    <div className="space-y-8">
      <div className="bg-[#FFFFFF] border border-[#E4DED4] rounded-2xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#DB2777]/5 rounded-bl-full pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#DB2777] mb-2 uppercase tracking-wide">
            <Sparkles className="w-4 h-4" />
            <span>Chuyên Đề Cho Nam Gia Chủ Độc Thân (Chưa Lập Gia Đình)</span>
          </div>
          <h2 className="font-serif-heading text-2xl sm:text-3xl font-bold text-[#1F1914] mb-3">
            Kích Hoạt Đào Hoa Tình Duyên & Định Hướng Không Gian Sống
          </h2>
          <p className="text-sm text-[#4A4239] leading-relaxed mb-6">
            Gia chủ tuổi <strong>{husbandData.canChi} ({husbandData.year})</strong> khi chưa lập gia đình, toàn bộ trường khí ngôi nhà được định hướng 100% theo bản mệnh <strong>Cung {husbandData.maleCung} ({husbandData.maleGroup})</strong> của chính bạn. Đây là giai đoạn vàng để xây dựng nền tảng sự nghiệp vững chắc đồng thời kích hoạt vị trí Đào Hoa Vị để sớm gặp ý trung nhân tâm đầu ý hợp.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-[#FFF5F7] border border-[#FBCFE8] rounded-xl p-4">
              <span className="text-xs font-bold text-[#9D174D] uppercase tracking-wider block mb-1">
                Phương Vị Đào Hoa (Tình Duyên):
              </span>
              <div className="text-lg font-serif-heading font-bold text-[#BE185D]">
                Phương {peachBlossomDirection} (Vị trí {peachBlossomAnimal})
              </div>
              <p className="text-xs text-[#831843] mt-2 leading-relaxed">
                {peachBlossomCure}
              </p>
            </div>

            <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-xl p-4">
              <span className="text-xs font-bold text-[#166534] uppercase tracking-wider block mb-1">
                Nguyên Tắc Nhà Cho Nam Độc Thân:
              </span>
              <div className="text-lg font-serif-heading font-bold text-[#15803D]">
                Dương Trạch Độc Tôn · Vượng Khí
              </div>
              <p className="text-xs text-[#14532D] mt-2 leading-relaxed">
                Phòng ngủ và bàn làm việc ưu tiên đặt ở hướng <strong>Sinh Khí</strong> hoặc <strong>Diên Niên</strong> để vừa phát tài vừa giữ các mối quan hệ xã giao tốt đẹp.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Gợi ý các tuổi nữ hợp nhất với nam gia chủ */}
      <div className="bg-[#FAF7F2] border border-[#E5DFD4] rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-[#ECE5DA] gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#9E2A1E] mb-1 uppercase tracking-wide">
              <Heart className="w-4 h-4 fill-[#9E2A1E]/20 text-[#9E2A1E]" />
              <span>Tra Cứu Nhân Duyên Tiền Định</span>
            </div>
            <h3 className="font-serif-heading text-xl font-bold text-[#1F1914]">
              Top Tuổi Nữ Hợp Nhất Với Nam {husbandData.canChi} ({husbandData.year})
            </h3>
            <span className="text-xs text-[#7A6F64]">
              Được tự động tính toán đối chiếu qua 4 trụ cột: Bát Trạch Du Niên, Ngũ Hành Nạp Âm, Thiên Can và Tam Hợp Địa Chi
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-[#065F46] bg-[#EBF7EE] border border-[#A7F3D0] px-3 py-1.5 rounded-lg shrink-0">
            <CheckCircle2 className="w-4 h-4 text-[#059669]" />
            <span>Điểm số từ cao xuống thấp</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {bestMatches.map((match, idx) => {
            const { wife } = match;
            return (
              <div
                key={wife.year}
                className="bg-[#FFFFFF] border border-[#E2DBD0] rounded-xl p-5 hover:border-[#9E2A1E] transition-all shadow-2xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-full bg-[#FAF3EC] text-[#9E2A1E] text-xs font-bold flex items-center justify-center border border-[#E7D6C5]">
                          {idx + 1}
                        </span>
                        <h4 className="font-serif-heading text-lg font-bold text-[#1F1914]">
                          Nữ Tuổi {wife.canChi}
                        </h4>
                      </div>
                      <span className="text-xs text-[#7A6F64] ml-6.5 block">
                        Sinh năm {wife.year} (Mệnh {wife.element} · Cung {wife.femaleCung})
                      </span>
                    </div>

                    <div className="text-right">
                      <div className="text-xl font-bold font-serif-heading text-[#1F1914] leading-none">
                        {match.score}
                        <span className="text-xs font-sans text-[#7A6F64]">/10</span>
                      </div>
                      <span
                        className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white inline-block mt-1"
                        style={{ backgroundColor: match.ratingColor }}
                      >
                        {match.rating.split(' ')[0]}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1.5 my-3 text-xs bg-[#FAF8F5] p-3 rounded-lg border border-[#EDE7DE]">
                    <div className="flex items-center justify-between">
                      <span className="text-[#7A6F64]">Cung phi phối:</span>
                      <strong className="text-[#9E2A1E]">{match.cungPhi.star} ({match.cungPhi.starType})</strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#7A6F64]">Ngũ hành:</span>
                      <strong className="text-[#1F1914]">{match.nguHanh.relation}</strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#7A6F64]">Địa chi con giáp:</span>
                      <strong className="text-[#1F1914]">{match.diaChi.relation}</strong>
                    </div>
                  </div>

                  <p className="text-xs text-[#524940] leading-relaxed line-clamp-2 mb-4">
                    {match.overviewAdvice}
                  </p>
                </div>

                <button
                  onClick={() => onSelectPotentialSpouse(wife.year)}
                  className="w-full py-2 bg-[#FAF5EE] hover:bg-[#9E2A1E] hover:text-white text-[#9E2A1E] border border-[#E6D8C8] hover:border-[#9E2A1E] rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Chọn Xem Chi Tiết Tuổi Này</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lời khuyên vàng cho gia chủ độc thân */}
      <div className="bg-[#FFFFFF] border border-[#E4DED4] rounded-2xl p-6 sm:p-8 shadow-xs">
        <h3 className="font-serif-heading text-lg font-bold text-[#1F1914] mb-3 flex items-center gap-2">
          <Award className="w-5 h-5 text-[#9E2A1E]" />
          <span>4 Điều Phong Thủy Cần Nhớ Khi Nam Gia Chủ Độc Thân Xây Sửa Nhà</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs leading-relaxed text-[#4A4239]">
          <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E9E2D6]">
            <strong className="text-[#1F1914] font-bold block mb-1 text-sm">1. Không để phòng ngủ quá lạnh lẽo, âm u</strong>
            <p>Người độc thân nên giữ ánh sáng tự nhiên đầy đủ, tránh để nhà quá nhiều góc tối tạo cảm giác cô đơn u uất. Dùng đèn vàng ấm áp và mở cửa đón gió sinh khí mỗi sáng.</p>
          </div>

          <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E9E2D6]">
            <strong className="text-[#1F1914] font-bold block mb-1 text-sm">2. Giường ngủ nên có đôi gối & điểm tựa vững chãi</strong>
            <p>Dù ngủ một mình vẫn nên sử dụng hai gối trên giường và đặt đầu giường tựa vào bức tường kiên cố, tượng trưng cho việc sẵn sàng đón nhận bạn đời trong tương lai gần.</p>
          </div>

          <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E9E2D6]">
            <strong className="text-[#1F1914] font-bold block mb-1 text-sm">3. Bố trí bàn làm việc ở phương vị Sinh Khí / Phục Vị</strong>
            <p>Khai thông sự nghiệp là tiền đề quan trọng cho gia đạo. Bàn làm việc quay về hướng Sinh Khí của bản mệnh giúp gia chủ tập trung, thăng tiến công danh vững chắc.</p>
          </div>

          <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E9E2D6]">
            <strong className="text-[#1F1914] font-bold block mb-1 text-sm">4. Không đặt gương đối diện trực tiếp giường ngủ</strong>
            <p>Gương soi phản chiếu giường dễ gây giật mình, hao tổn dương khí và sinh tâm lý bất an, ảnh hưởng tiêu cực đến giấc ngủ và đường tình duyên.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
