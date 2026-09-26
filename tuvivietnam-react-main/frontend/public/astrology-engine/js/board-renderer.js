/**
 * board-renderer.js
 * Quản lý vẽ giao diện lá số, 12 cung Địa Bàn và Thiên Bàn trung tâm.
 * Tối ưu DocumentFragment chống DOM thrashing và hỗ trợ cập nhật tên độc lập.
 */

// Khởi tạo biến toàn cục lưu trữ mã ID duy nhất đã sử dụng trong phiên
window._generatedTuViIds = window._generatedTuViIds || new Set();

let currentChartData = null;
window.currentChartData = null;

function getCurrentChartData() {
    return currentChartData;
}

function setCurrentChartData(chart) {
    currentChartData = chart;
    window.currentChartData = chart;
}

/**
 * Trích xuất ký tự viết tắt tên người dùng (viết hoa, chuyển tự tiếng Việt chuẩn ASCII)
 * Ví dụ: "Nguyễn Văn A" -> "NVA"
 */
function getInitials(name) {
    if (!name || typeof name !== 'string') return "HA";
    let clean = name.normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/Đ/g, "D")
        .replace(/[^a-zA-Z0-9\s]/g, "")
        .trim();
    if (!clean) return "HA";
    let words = clean.split(/\s+/).filter(w => w.length > 0);
    if (words.length === 0) return "HA";
    let initials = words.map(w => w[0].toUpperCase()).join("");
    return initials || "HA";
}

/**
 * Thuật toán sinh 8 chữ số ngẫu nhiên duy nhất tuyệt đối (Strict Unique)
 * Kết hợp timestamp millisecond, high-resolution performance timer và crypto random/Math random
 */
function generateStrictUniqueIdDigits() {
    let digits = "";
    let attempts = 0;
    while (attempts < 1000) {
        attempts++;
        const now = Date.now();
        const perf = (typeof performance !== "undefined" && performance.now) ? performance.now() : Math.random() * 1000;
        const rand = (typeof crypto !== "undefined" && crypto.getRandomValues)
            ? (crypto.getRandomValues(new Uint32Array(1))[0] % 100000000)
            : Math.floor(Math.random() * 100000000);

        const mixed = Math.abs(Math.floor((now ^ Math.floor(perf * 1000) ^ rand ^ (attempts * 7919)))) % 100000000;
        digits = String(mixed).padStart(8, '0');

        if (!window._generatedTuViIds.has(digits)) {
            window._generatedTuViIds.add(digits);
            return digits;
        }
    }
    return String(Math.floor(10000000 + Math.random() * 90000000));
}

/**
 * Cập nhật tên đương số trực tiếp trên Thiên Bàn và mã ID mờ mà không cần gọi lại API
 */
function updateBoardNameOnly(name) {
    const safeName = (name && name.trim()) ? name.trim() : "Vô Danh";
    const nameEl = document.getElementById("tb-name");
    if (nameEl) {
        nameEl.innerText = safeName;
    }
    if (currentChartData) {
        if (currentChartData.thien_ban) {
            currentChartData.thien_ban.ho_ten = safeName;
        }
        if (!currentChartData.idDigits) {
            currentChartData.idDigits = generateStrictUniqueIdDigits();
        }
        const initials = getInitials(safeName);
        const idCode = `${initials}-${currentChartData.idDigits}`;
        currentChartData.idCode = idCode;
        const idCodeEl = document.getElementById("tb-id-code");
        if (idCodeEl) {
            idCodeEl.innerText = idCode;
        }
    }
}

function renderTuViBoard(chart) {
    setCurrentChartData(chart);
    let tb = chart.thien_ban;
    let db = chart.dia_ban;

    // Sinh hoặc giữ nguyên mã ID duy nhất 8 số cho lá số này
    if (!chart.idDigits) {
        chart.idDigits = generateStrictUniqueIdDigits();
    }
    const initials = getInitials(tb.ho_ten);
    const idCode = `${initials}-${chart.idDigits}`;
    chart.idCode = idCode;

    // Hiển thị mã ID watermark góc dưới bên phải Thiên bàn
    const idCodeEl = document.getElementById("tb-id-code");
    if (idCodeEl) {
        idCodeEl.innerText = idCode;
    }

    // Cập nhật Thiên Bàn (1 Cột Dọc Đầy ĐỦ)
    const nameEl = document.getElementById("tb-name");
    if (nameEl) nameEl.innerText = tb.ho_ten;

    const sYearEl = document.getElementById("tb-solar-year");
    if (sYearEl) sYearEl.innerText = tb.duong_lich.nam;

    const lYearEl = document.getElementById("tb-lunar-year");
    if (lYearEl) lYearEl.innerText = tb.am_lich.can_chi_nam;

    let lYear = (tb.am_lich.calc_nam !== undefined) ? tb.am_lich.calc_nam : tb.am_lich.nam;
    const lYearTag = document.getElementById("tb-lunar-year-tag");
    if (lYearTag) lYearTag.innerText = `(N.${lYear})`;

    const sMonthEl = document.getElementById("tb-solar-month");
    if (sMonthEl) sMonthEl.innerText = String(tb.duong_lich.thang).padStart(2, '0');

    const lMonthEl = document.getElementById("tb-lunar-month");
    if (lMonthEl) lMonthEl.innerText = tb.am_lich.can_chi_thang;

    let lMonth = (tb.am_lich.calc_thang !== undefined) ? tb.am_lich.calc_thang : tb.am_lich.thang;
    let lIsLeap = (tb.am_lich.calc_thang_nhuan !== undefined) ? tb.am_lich.calc_thang_nhuan : tb.am_lich.thang_nhuan;
    const lMonthTag = document.getElementById("tb-lunar-month-tag");
    if (lMonthTag) lMonthTag.innerText = `(Th.${lMonth}${lIsLeap ? 'N' : ''})`;

    const sDayEl = document.getElementById("tb-solar-day");
    if (sDayEl) sDayEl.innerText = String(tb.duong_lich.ngay).padStart(2, '0');

    const lDayEl = document.getElementById("tb-lunar-day");
    if (lDayEl) lDayEl.innerText = tb.am_lich.can_chi_ngay;

    let lDay = (tb.am_lich.calc_ngay !== undefined) ? tb.am_lich.calc_ngay : tb.am_lich.ngay;
    const lDayTag = document.getElementById("tb-lunar-day-tag");
    if (lDayTag) lDayTag.innerText = `(Ng.${lDay})`;

    let solarHourStr = `${String(tb.duong_lich.gio).padStart(2, '0')}:${String(tb.duong_lich.phut).padStart(2, '0')}`;
    const sHourEl = document.getElementById("tb-solar-hour");
    if (sHourEl) sHourEl.innerText = solarHourStr;

    const lHourEl = document.getElementById("tb-lunar-hour");
    if (lHourEl) lHourEl.innerText = tb.am_lich.can_chi_gio;

    const lHourTag = document.getElementById("tb-lunar-hour-tag");
    if (lHourTag) lHourTag.innerText = `(G.${solarHourStr})`;

    const sWatchEl = document.getElementById("tb-solar-watch");
    if (sWatchEl) sWatchEl.innerText = tb.nam_xem_han.nam;

    const lWatchEl = document.getElementById("tb-lunar-watch");
    if (lWatchEl) lWatchEl.innerText = tb.nam_xem_han.can_chi;

    const tuoiMuEl = document.getElementById("tb-tuoi-mu");
    if (tuoiMuEl) tuoiMuEl.innerText = `${tb.nam_xem_han.tuoi_mu} tuổi`;

    const amDuongEl = document.getElementById("tb-am-duong");
    if (amDuongEl) amDuongEl.innerText = tb.am_duong_menh;

    const menhEl = document.getElementById("tb-menh");
    if (menhEl) menhEl.innerText = tb.menh_nap_am;

    const cucEl = document.getElementById("tb-cuc");
    if (cucEl) cucEl.innerText = tb.cuc;

    const chuMenhEl = document.getElementById("tb-chu-menh");
    if (chuMenhEl) chuMenhEl.innerText = tb.chu_menh;

    const chuThanEl = document.getElementById("tb-chu-than");
    if (chuThanEl) chuThanEl.innerText = tb.chu_than;

    const amDuongLyEl = document.getElementById("tb-am-duong-ly");
    if (amDuongLyEl) amDuongLyEl.innerText = tb.am_duong_ly;

    const cucMenhLyEl = document.getElementById("tb-cuc-menh-ly");
    if (cucMenhLyEl) cucMenhLyEl.innerText = tb.cuc_menh_tuong_quan;

    const thanCuEl = document.getElementById("tb-than-cu");
    if (thanCuEl) thanCuEl.innerText = tb.than_cu;

    // Xóa 12 Cung cũ (trừ Thiên Bàn)
    const board = document.getElementById("tuviBoard");
    if (!board) return;
    const existingHouses = board.querySelectorAll(".house");
    existingHouses.forEach(h => h.remove());

    // TỐI ƯU HIỆU NĂNG: Sử dụng DocumentFragment để gom 12 cung, append duy nhất 1 lần vào DOM
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < 12; i++) {
        let c = db[i];
        let houseEl = document.createElement("div");
        houseEl.className = "house";
        houseEl.id = `house-${i}`;

        // Header - Địa Chi & Tên Cung & Đại Hạn
        let chiHanh = (window.CHI_HANH && window.CHI_HANH[i]) ? window.CHI_HANH[i] : "";

        let headerHtml = `
            <div class="house-header">
                <div class="house-header-left ${chiHanh}">
                    <span class="chi-cung">${c.cung_chi}</span>
                </div>
                <div class="cung-name-wrap">
                    <span class="cung-name">${c.ten_cung}</span>
                </div>
                <div class="house-header-right">
                    <span class="dai-han">${c.dai_han}</span>
                </div>
            </div>`;

        // Chính tinh (Zone 2)
        let chinhTinhHtml = `<div class="chinh-tinh-box">`;
        if (c.chinh_tinh.length > 0) {
            c.chinh_tinh.forEach(s => {
                let dtClass = s.dac_tinh ? `dac-tinh` : '';
                let dtText = s.dac_tinh ? `(${s.dac_tinh})` : '';
                chinhTinhHtml += `<div class="chinh-tinh-item ${s.ngu_hanh}">${s.ten}<span class="${dtClass}">${dtText}</span></div>`;
            });
        } else {
            chinhTinhHtml += `<div class="chinh-tinh-item vo-chinh-dieu"></div>`;
        }
        chinhTinhHtml += `</div>`;

        // Tự động ép chuyển các sao "Tướng Quân" và "Thái Tuế" sang cột bên phải
        const FORCE_RIGHT_STARS = ["Tướng Quân", "Thái Tuế"];
        const rawTot = c.phu_tinh_tot.filter(s => !FORCE_RIGHT_STARS.includes(s.ten));
        const forcedRight = c.phu_tinh_tot.filter(s => FORCE_RIGHT_STARS.includes(s.ten));
        const rawXau = [...c.phu_tinh_xau, ...forcedRight];

        const priTot = window.PHU_TINH_PRIORITY_TOT || {};
        const priXau = window.PHU_TINH_PRIORITY_XAU || {};
        const saoNguHanh = window.SAO_NGU_HANH || {};

        // Sắp xếp phụ tinh theo chuẩn thứ tự
        const sortedTot = [...rawTot].sort((a, b) => {
            const pA = priTot[a.ten] !== undefined ? priTot[a.ten] : 99;
            const pB = priTot[b.ten] !== undefined ? priTot[b.ten] : 99;
            return pA - pB;
        });

        const sortedXau = [...rawXau].sort((a, b) => {
            const pA = priXau[a.ten] !== undefined ? priXau[a.ten] : 99;
            const pB = priXau[b.ten] !== undefined ? priXau[b.ten] : 99;
            return pA - pB;
        });

        // Phụ tinh 2 cột (Zone 3)
        let leftColHtml = `<div class="phu-tinh-col left">`;
        sortedTot.forEach(s => {
            let dt = s.dac_tinh ? ` (${s.dac_tinh})` : '';
            leftColHtml += `<span class="star-item ${s.ngu_hanh}">${s.ten}${dt}</span>`;
        });
        c.sao_luu.filter(l => l.loai === "tot").forEach(l => {
            let baseName = l.ten.replace("L.", "");
            let hanh = saoNguHanh[baseName] || "tho";
            leftColHtml += `<span class="star-item ${hanh} luu">${l.ten}</span>`;
        });
        leftColHtml += `</div>`;

        let rightColHtml = `<div class="phu-tinh-col right">`;
        sortedXau.forEach(s => {
            let dt = s.dac_tinh ? ` (${s.dac_tinh})` : '';
            let cls = s.ngu_hanh || 'hoa';
            rightColHtml += `<span class="star-item ${cls}">${s.ten}${dt}</span>`;
        });
        c.sao_luu.filter(l => l.loai === "xau").forEach(l => {
            let baseName = l.ten.replace("L.", "");
            let hanh = saoNguHanh[baseName] || "hoa";
            rightColHtml += `<span class="star-item ${hanh} luu">${l.ten}</span>`;
        });
        rightColHtml += `</div>`;

        let phuTinhGridHtml = `<div class="phu-tinh-grid">${leftColHtml}${rightColHtml}</div>`;

        // Chân cung (Zone 4)
        let footerHtml = `
            <div class="house-footer">
                <span class="tieu-han-label">${c.tieu_han_chi}</span>
                <span class="trang-sinh-label">${c.trang_sinh}</span>
                <span class="nguyet-han-label">Th.${c.nguyet_han_thang}</span>
            </div>`;

        houseEl.innerHTML = headerHtml + chinhTinhHtml + phuTinhGridHtml + footerHtml;
        fragment.appendChild(houseEl);
    }

    // Đính kèm trọn vẹn 12 cung vào DOM một lần duy nhất
    board.appendChild(fragment);

    // Kẻ tam giác nét đứt Mệnh - Tài - Quan
    if (typeof updateMenhTaiQuanTriangle === "function") {
        updateMenhTaiQuanTriangle(chart.menhPos);
    }

    // Định vị huy hiệu Tuần và Triệt trên vách ngăn
    if (typeof positionTuanTrietBadges === "function") {
        positionTuanTrietBadges(chart.tuan_cung, chart.triet_cung);
    }

    // Cập nhật JSON Viewer nếu có
    const jsonEl = document.getElementById("jsonOutputContent");
    if (jsonEl) jsonEl.innerText = JSON.stringify(chart, null, 2);
}

window.renderTuViBoard = renderTuViBoard;
window.updateBoardNameOnly = updateBoardNameOnly;
window.getCurrentChartData = getCurrentChartData;
window.setCurrentChartData = setCurrentChartData;
window.getInitials = getInitials;
window.generateStrictUniqueIdDigits = generateStrictUniqueIdDigits;
