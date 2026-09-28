import {
  BAGUA_DIRECTIONS_MAP,
  CAN_CLASHES,
  CAN_HARMONIES,
  DIRECTIONS_LIST,
  SIX_CLASHES,
  SIX_HARMONIES,
  SIX_HARMS,
  SPOUSE_CUNG_MAP,
  STAR_INFO,
  THREE_HARMONIES,
} from './fengShuiData';
import { getYearDetails } from './sixtyHoaGiap';

export function getDirectionsEvaluation(cung) {
  const directionsMap = BAGUA_DIRECTIONS_MAP[cung];

  return DIRECTIONS_LIST.map((dirItem) => {
    const star = directionsMap[dirItem.direction];
    const info = STAR_INFO[star];

    let door = '';
    let altar = '';
    let kitchen = '';
    let bedroom = '';
    let toilet = '';

    if (info.type === 'Cát') {
      if (star === 'Sinh Khí') {
        door = 'Thượng cát - Cung tốt nhất để mở cửa chính nghênh tài đón lộc';
        altar = 'Đại cát - Bàn thờ nhìn về hướng Sinh Khí giúp gia vận thịnh vượng';
        kitchen = 'Không nên đặt bếp tọa tại đây vì sẽ thiêu đốt tài lộc sinh khí';
        bedroom = 'Rất tốt cho phòng ngủ gia chủ, kích hoạt danh tiếng và sinh con quý tử';
        toilet = 'Tuyệt đối cấm kỵ đặt nhà vệ sinh tại hướng Sinh Khí';
      } else if (star === 'Thiên Y') {
        door = 'Rất tốt - Đón nhận sinh khí trị bệnh tật, gia đạo bình an';
        altar = 'Đại cát - Hướng bàn thờ giúp cả nhà trường thọ, tiêu trừ ốm đau';
        kitchen = 'Không nên tọa bếp tại đây (làm suy giảm sức khỏe gia đình)';
        bedroom = 'Tuyệt vời nhất cho phòng ngủ, giúp giấc ngủ sâu, hồi phục sức khỏe';
        toilet = 'Tuyệt đối không đặt nhà vệ sinh tại hướng Thiên Y';
      } else if (star === 'Diên Niên') {
        door = 'Rất tốt - Vợ chồng hòa thuận, các mối quan hệ ngoại giao hanh thông';
        altar = 'Tốt - Giữ gìn gia phong ấm êm, con cháu thảo hiền';
        kitchen = 'Không nên tọa bếp tại đây';
        bedroom = 'Rất tốt cho phòng ngủ vợ chồng, gia tăng tình cảm keo sơn';
        toilet = 'Cấm kỵ đặt nhà vệ sinh tại hướng Diên Niên';
      } else {
        door = 'Khá tốt - Gia đạo yên ấm, bình an, ít sóng gió';
        altar = 'Rất tốt - Hướng Phục Vị thích hợp cho sự thanh tịnh, tâm linh';
        kitchen = 'Không nên tọa bếp tại đây';
        bedroom = 'Thích hợp cho phòng làm việc, phòng đọc sách, con cái học thi cử';
        toilet = 'Không nên đặt nhà vệ sinh tại đây';
      }
    } else {
      if (star === 'Tuyệt Mệnh') {
        door = 'Đại hung - Tuyệt đối không mở cửa chính hướng này (hao tài tổn mạng)';
        altar = 'Cấm kỵ đặt bàn thờ nhìn về hướng Tuyệt Mệnh';
        kitchen = 'Đắc cách Tọa Hung Hướng Cát: Đặt bếp tại đây để thiêu đốt tai họa Tuyệt Mệnh';
        bedroom = 'Tránh đặt phòng ngủ (dễ mất ngủ, ác mộng, ốm đau dai dẳng)';
        toilet = 'Rất tốt - Đặt nhà vệ sinh tọa Tuyệt Mệnh để cuốn trôi hung sát';
      } else if (star === 'Ngũ Quỷ') {
        door = 'Đại hung - Dễ gặp thị phi tranh chấp, hỏa hoạn, mất cắp của cải';
        altar = 'Cấm kỵ đặt bàn thờ nhìn về hướng Ngũ Quỷ';
        kitchen = 'Đắc cách Tọa Hung Hướng Cát: Bếp tọa Ngũ Quỷ nhìn về Sinh Khí giải hung';
        bedroom = 'Tránh đặt phòng ngủ (tinh thần bất an, dễ gặp tiểu nhân)';
        toilet = 'Rất tốt - Đặt nhà vệ sinh tọa Ngũ Quỷ để tiêu trừ thị phi hung khí';
      } else if (star === 'Lục Sát') {
        door = 'Hung - Tình cảm lục đục, dễ vướng kiện tụng tranh chấp';
        altar = 'Không tốt cho bàn thờ';
        kitchen = 'Đắc cách: Bếp tọa Lục Sát giúp thiêu đốt mâu thuẫn bất hòa';
        bedroom = 'Không nên đặt phòng ngủ vợ chồng tại đây (dễ sinh nghi kỵ)';
        toilet = 'Tốt - Đặt khu phụ, nhà vệ sinh để dập tan tai ương';
      } else {
        door = 'Hung - Hay gặp chuyện trắc trở vụn vặt, hao tốn tiền bạc';
        altar = 'Không nên đặt bàn thờ nhìn về hướng Họa Hại';
        kitchen = 'Đắc cách: Bếp tọa Họa Hại hóa giải vận hạn xui rủi';
        bedroom = 'Nên tránh đặt phòng ngủ chính';
        toilet = 'Tốt - Đặt nhà vệ sinh để hóa giải hung khí Lộc Tồn';
      }
    }

    return {
      direction: dirItem.direction,
      angleRange: dirItem.angleRange,
      degreesCenter: dirItem.degreesCenter,
      star,
      starType: info.type,
      alias: info.alias,
      score: info.score,
      badgeColor: info.badgeColor,
      summary: info.summary,
      fullDesc: info.fullDesc,
      cures: info.cures,
      spatialUsage: { door, altar, kitchen, bedroom, toilet },
    };
  });
}

export function evaluateSpouseCompatibility(husbandYear, wifeYear) {
  const husband = getYearDetails(husbandYear);
  const wife = getYearDetails(wifeYear);

  const cungStar = SPOUSE_CUNG_MAP[husband.maleCung][wife.femaleCung];
  const starMeta = STAR_INFO[cungStar];
  let cungScore = 5;
  let cungDetail = '';
  let cungCures = undefined;

  switch (cungStar) {
    case 'Sinh Khí':
      cungScore = 10;
      cungDetail = `Chồng cung ${husband.maleCung} lấy vợ cung ${wife.femaleCung} gặp được cung Sinh Khí (Thuộc sao Tham Lang). Vợ chồng kết hợp đại cát đại lợi, gia đình êm ấm, phú quý song toàn, con cái hiển vinh.`;
      break;
    case 'Diên Niên':
      cungScore = 9.5;
      cungDetail = `Chồng cung ${husband.maleCung} lấy vợ cung ${wife.femaleCung} gặp cung Diên Niên (Phúc Đức - Sao Vũ Khúc). Tình cảm vợ chồng keo sơn gắn bó, bách niên giai lão, hậu vận hưng vượng.`;
      break;
    case 'Thiên Y':
      cungScore = 9;
      cungDetail = `Chồng cung ${husband.maleCung} lấy vợ cung ${wife.femaleCung} gặp cung Thiên Y (Sao Cự Môn). Được quý nhân trợ lực, vợ chồng sống lâu khỏe mạnh, tiền của vững bền, gia đạo an vui.`;
      break;
    case 'Phục Vị':
      cungScore = 8.5;
      cungDetail = `Chồng cung ${husband.maleCung} lấy vợ cung ${wife.femaleCung} gặp cung Phục Vị (Sao Tả Phù). Gia đạo yên bình, cuộc sống êm ấm vững chắc, tài vận trung bình nhưng con cái ngoan ngoãn đỗ đạt.`;
      break;
    case 'Họa Hại':
      cungScore = 4;
      cungDetail = `Chồng cung ${husband.maleCung} lấy vợ cung ${wife.femaleCung} phạm cung Họa Hại (Sao Lộc Tồn). Hay gặp chuyện xui rủi lặt vặt, bất đồng ý kiến, dễ bị tiểu nhân quấy rầy.`;
      cungCures = 'Hóa giải: Chọn hướng bếp tọa Họa Hại quay về hướng Phục Vị của chồng; hoặc sinh con thuộc cung Phục Vị để gia đình hòa khí.';
      break;
    case 'Lục Sát':
      cungScore = 3;
      cungDetail = `Chồng cung ${husband.maleCung} lấy vợ cung ${wife.femaleCung} phạm cung Lục Sát (Sao Văn Khúc). Vợ chồng dễ sinh nghi kỵ, khắc khẩu, tài chính thăng trầm hoặc vướng chuyện thị phi.`;
      cungCures = 'Hóa giải: Bố trí hướng bếp quay về Diên Niên, giường ngủ đặt cung tốt, sinh con mang cung Diên Niên để giải trừ sát khí.';
      break;
    case 'Ngũ Quỷ':
      cungScore = 2;
      cungDetail = `Chồng cung ${husband.maleCung} lấy vợ cung ${wife.femaleCung} phạm cung Ngũ Quỷ (Sao Liêm Trinh). Dễ hao tài tốn của, sức khỏe suy giảm, hay xảy ra tranh cãi lớn, gia đạo bất an.`;
      cungCures = 'Hóa giải: Dùng nguyên tắc "Ngũ Quỷ giao Sinh Khí" - Đặt hướng bếp hoặc sinh con rơi vào cung Sinh Khí để hóa giải hung tinh Liêm Trinh.';
      break;
    case 'Tuyệt Mệnh':
      cungScore = 1;
      cungDetail = `Chồng cung ${husband.maleCung} lấy vợ cung ${wife.femaleCung} phạm cung Tuyệt Mệnh (Sao Phá Quân). Đây là cung xấu nhất, dễ hao hụt tiền tài hoặc đau ốm, tình cảm gặp nhiều sóng gió nếu không biết cách hóa giải.`;
      cungCures = 'Hóa giải: Cực kỳ linh nghiệm bằng cách dùng bếp "Tuyệt Mệnh sinh Thiên Y" (đặt bếp quay về hướng Thiên Y của chồng), sinh con cung Thiên Y, và tu tâm tích đức.';
      break;
  }

  const hEl = husband.element;
  const wEl = wife.element;
  let nguHanhRelation = 'Bình hòa';
  let nguHanhScore = 5;
  let nguHanhDetail = '';
  let nguHanhCures = undefined;

  const generates = {
    'Kim': 'Thủy',
    'Thủy': 'Mộc',
    'Mộc': 'Hỏa',
    'Hỏa': 'Thổ',
    'Thổ': 'Kim',
  };
  const overcomes = {
    'Kim': 'Mộc',
    'Mộc': 'Thổ',
    'Thổ': 'Thủy',
    'Thủy': 'Hỏa',
    'Hỏa': 'Kim',
  };

  if (generates[hEl] === wEl) {
    nguHanhRelation = 'Tương sinh';
    nguHanhScore = 9.5;
    nguHanhDetail = `Chồng mệnh ${hEl} (${husband.napAm}) tương sinh cho Vợ mệnh ${wEl} (${wife.napAm}). Chồng nâng đỡ che chở cho vợ, gia đình sung túc, con cái thuận hòa.`;
  } else if (generates[wEl] === hEl) {
    nguHanhRelation = 'Tương sinh';
    nguHanhScore = 10;
    nguHanhDetail = `Vợ mệnh ${wEl} (${wife.napAm}) tương sinh cho Chồng mệnh ${hEl} (${husband.napAm}). Vợ vượng phu ích tử, phò tá đắc lực cho sự nghiệp công danh của người chồng.`;
  } else if (hEl === wEl) {
    nguHanhRelation = 'Tương hòa';
    nguHanhScore = 8;
    nguHanhDetail = `Hai vợ chồng cùng mang mệnh ${hEl} (Lưỡng ${hEl}). Đồng thanh tương ứng, đồng khí tương cầu, dễ thấu hiểu và cùng nhau tạo dựng cơ nghiệp vững chắc.`;
  } else if (overcomes[hEl] === wEl) {
    nguHanhRelation = 'Tương khắc';
    nguHanhScore = 4;
    nguHanhDetail = `Chồng mệnh ${hEl} khắc Vợ mệnh ${wEl}. Theo cổ thư, chồng khắc vợ vẫn có thể hòa hợp nếu chồng là trụ cột bao dung, tuy nhiên đôi khi vẫn phát sinh bất đồng quan điểm.`;
    nguHanhCures = `Hóa giải: Dùng ngũ hành gián tiếp để làm cầu nối tương sinh (ví dụ Kim khắc Mộc thì chọn con cái hoặc nội thất mang hành Thủy: Kim sinh Thủy, Thủy sinh Mộc).`;
  } else {
    nguHanhRelation = 'Tương khắc';
    nguHanhScore = 3;
    nguHanhDetail = `Vợ mệnh ${wEl} khắc Chồng mệnh ${hEl} (Vợ khắc Chồng là thế nghịch). Trong nhà người vợ có xu hướng lấn lướt hoặc dễ nảy sinh cãi vã, cần nhường nhịn thấu hiểu.`;
    nguHanhCures = `Hóa giải: Dùng yếu tố trung gian hóa giải (ví dụ Hỏa khắc Kim thì bổ sung Thổ để Hỏa sinh Thổ, Thổ sinh Kim). Sinh con hợp mệnh hòa giải.`;
  }

  let thienCanRelation = 'Bình hòa';
  let thienCanScore = 6;
  let thienCanDetail = `Thiên Can của chồng (${husband.can}) và vợ (${wife.can}) ở thế bình hòa, không tương hợp cũng không phạm xung phá.`;

  const isCanHarmonious = CAN_HARMONIES.some(
    ([c1, c2]) => (husband.can === c1 && wife.can === c2) || (husband.can === c2 && wife.can === c1)
  );
  const isCanClash = CAN_CLASHES.some(
    ([c1, c2]) => (husband.can === c1 && wife.can === c2) || (husband.can === c2 && wife.can === c1)
  );

  if (isCanHarmonious) {
    thienCanRelation = 'Tương sinh / Can hợp';
    thienCanScore = 10;
    thienCanDetail = `Chồng can ${husband.can} và Vợ can ${wife.can} thuộc cặp Thiên Can Tương Hợp. Trời đất tác thành, vợ chồng hòa thuận, suy nghĩ tương đồng, làm ăn dễ gặp may mắn.`;
  } else if (isCanClash) {
    thienCanRelation = 'Tương xung / khắc';
    thienCanScore = 3;
    thienCanDetail = `Chồng can ${husband.can} và Vợ can ${wife.can} phạm Thiên Can Tương Xung. Tính cách đôi khi đối chọi nhau, cần lắng nghe và kiềm chế cái tôi cá nhân.`;
  }

  let diaChiRelation = 'Bình Hòa';
  let diaChiScore = 6;
  let diaChiDetail = `Địa Chi tuổi chồng (${husband.chi} - ${husband.lunarAnimal}) và vợ (${wife.chi} - ${wife.lunarAnimal}) bình hòa, không phạm xung cũng không nằm trong nhóm tam hợp.`;
  let diaChiCures = undefined;

  const isTamHop = THREE_HARMONIES.some(
    group => group.includes(husband.chi) && group.includes(wife.chi)
  );
  const isLucHop = SIX_HARMONIES.some(
    ([c1, c2]) => (husband.chi === c1 && wife.chi === c2) || (husband.chi === c2 && wife.chi === c1)
  );
  const isLucXung = SIX_CLASHES.some(
    ([c1, c2]) => (husband.chi === c1 && wife.chi === c2) || (husband.chi === c2 && wife.chi === c1)
  );
  const isLucHai = SIX_HARMS.some(
    ([c1, c2]) => (husband.chi === c1 && wife.chi === c2) || (husband.chi === c2 && wife.chi === c1)
  );

  if (isTamHop) {
    diaChiRelation = 'Tam Hợp';
    diaChiScore = 10;
    diaChiDetail = `Địa chi tuổi chồng (${husband.chi}) và vợ (${wife.chi}) nằm trong bộ Tam Hợp quý tướng. Vợ chồng tâm đầu ý hợp, cùng chung chí hướng, sự nghiệp phát triển thuận buồm xuôi gió.`;
  } else if (isLucHop) {
    diaChiRelation = 'Lục Hợp';
    diaChiScore = 9.5;
    diaChiDetail = `Địa chi tuổi chồng (${husband.chi}) và vợ (${wife.chi}) tạo thành thế Lục Hợp hoàn hảo. Tình duyên thắm thiết bền chặt, luôn có sự tương trợ chở che lẫn nhau.`;
  } else if (isLucXung) {
    diaChiRelation = 'Tứ Hành Xung / Lục Xung';
    diaChiScore = 2.5;
    diaChiDetail = `Địa chi tuổi chồng (${husband.chi}) và vợ (${wife.chi}) phạm thế Lục Xung (thuộc Tứ Hành Xung). Tính khí dễ va chạm, bất đồng trong sinh hoạt thường nhật.`;
    diaChiCures = 'Hóa giải: Đặt linh vật tam hợp trợ mệnh, chọn năm sinh con hợp địa chi để làm cầu nối hóa giải lục xung (ví dụ Tý - Ngọ thì chọn con tuổi Sửu hoặc Dần/Mùi).';
  } else if (isLucHai) {
    diaChiRelation = 'Lục Hại';
    diaChiScore = 3;
    diaChiDetail = `Địa chi tuổi chồng (${husband.chi}) và vợ (${wife.chi}) phạm thế Lục Hại. Dễ sinh hiểu lầm hoặc cản trở đường công danh nếu thiếu sự cảm thông.`;
    diaChiCures = 'Hóa giải: Sinh con hóa giải, nhường nhịn và bố trí phong thủy nhà ở hài hòa.';
  }

  const totalScore = Number(
    ((cungScore * 0.4) + (nguHanhScore * 0.3) + (diaChiScore * 0.2) + (thienCanScore * 0.1)).toFixed(1)
  );

  let rating = 'Bình Hòa (Khá)';
  let ratingColor = '#059669';

  if (totalScore >= 8.5) {
    rating = 'Đại Cát (Rất Tốt)';
    ratingColor = '#10B981';
  } else if (totalScore >= 7.0) {
    rating = 'Cát (Tốt)';
    ratingColor = '#0284C7';
  } else if (totalScore >= 5.5) {
    rating = 'Bình Hòa (Khá)';
    ratingColor = '#F59E0B';
  } else if (totalScore >= 4.0) {
    rating = 'Thứ Hung (Cần Hóa Giải)';
    ratingColor = '#EA580C';
  } else {
    rating = 'Đại Hung (Khắc Kỵ)';
    ratingColor = '#DC2626';
  }

  const remedySolutions = [];
  if (cungCures) remedySolutions.push(cungCures);
  if (nguHanhCures) remedySolutions.push(nguHanhCures);
  if (diaChiCures) remedySolutions.push(diaChiCures);

  remedySolutions.push(
    'Bố trí hướng bếp theo nguyên tắc Bát Trạch: Đặt bếp theo tuổi của người chồng để hóa hung thành cát, hoặc kết hợp "Đàn ông xây nhà, đàn bà xây tổ ấm" để chọn hướng hài hòa cả đôi bên.',
    'Chọn năm sinh con hợp tuổi: Đứa con đóng vai trò như cây cầu phong thủy nối ngũ hành và cung mệnh của hai vợ chồng, biến nguy thành an, gia tăng sinh khí.',
    'Tu tâm dưỡng tính: Phong thủy xưa có câu "Đức năng thắng số" - Sự tôn trọng, lắng nghe, bao dung giữa hai vợ chồng chính là phong thủy mạnh mẽ nhất giúp gia đạo trường tồn vượng phát.'
  );

  let overviewAdvice = '';
  if (totalScore >= 8.0) {
    overviewAdvice = `Đôi bạn có số duyên tiền định rất tốt. Các yếu tố Cung Mệnh và Ngũ Hành bổ trợ mạnh mẽ cho nhau, đem lại cuộc sống hôn nhân hạnh phúc, tài lộc dồi dào, hậu vận viên mãn.`;
  } else if (totalScore >= 6.0) {
    overviewAdvice = `Đôi bạn đạt mức hòa hợp tương đối tốt. Cuộc sống hôn nhân sẽ có những lúc cần lắng nghe nhau hơn, tuy nhiên chỉ cần khéo léo vun vén và sắp xếp phong thủy nhà ở hài hòa thì vạn sự đều hanh thông.`;
  } else {
    overviewAdvice = `Hai tuổi có một số yếu tố xung khắc về cung phi hoặc can chi, ngũ hành. Tuy nhiên trong phong thủy vạn vật tương sinh tương khắc luôn có cách chuyển hóa; áp dụng đúng phương pháp hóa giải hướng nhà, hướng bếp và sinh con sẽ giúp gia đình bền chặt, bình an.`;
  }

  return {
    husband,
    wife,
    score: totalScore,
    rating,
    ratingColor,
    cungPhi: {
      star: cungStar,
      starType: starMeta.type,
      score: cungScore,
      detail: cungDetail,
      cures: cungCures,
    },
    nguHanh: {
      husbandElement: hEl,
      wifeElement: wEl,
      relation: nguHanhRelation,
      score: nguHanhScore,
      detail: nguHanhDetail,
      cures: nguHanhCures,
    },
    thienCan: {
      husbandCan: husband.can,
      wifeCan: wife.can,
      relation: thienCanRelation,
      score: thienCanScore,
      detail: thienCanDetail,
    },
    diaChi: {
      husbandChi: husband.chi,
      wifeChi: wife.chi,
      relation: diaChiRelation,
      score: diaChiScore,
      detail: diaChiDetail,
      cures: diaChiCures,
    },
    overviewAdvice,
    remedySolutions,
  };
}
