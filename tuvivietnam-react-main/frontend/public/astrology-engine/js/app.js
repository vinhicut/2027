/**
 * app.js
 * Điểm khởi nhập chính của ứng dụng Frontend.
 * Điều phối gọi API Backend /api/calculate, khởi tạo các bộ điều khiển và xử lý sự kiện toàn cục.
 */

let currentRequestId = 0;
const OVERLAY_BUFFER_TIME = 200; // ms

async function generateTuVi() {
    const requestId = ++currentRequestId;

    // Ẩn lớp phủ mờ thông báo
    if (typeof hideTuViStaleNotice === "function") {
        hideTuViStaleNotice();
    }

    // BƯỚC 1: KÍCH HOẠT MÀN CHE LOADING
    if (typeof showTuViLoading === "function") {
        showTuViLoading();
    }

    const bufferPromise = new Promise(resolve => setTimeout(resolve, OVERLAY_BUFFER_TIME));

    // Thu thập tham số đầu vào
    const payload = (typeof collectInputParams === "function")
        ? collectInputParams()
        : {};

    const apiUrl = (window.location.origin && window.location.origin !== "null" && window.location.protocol.startsWith("http"))
        ? `${window.location.origin}/api/calculate`
        : "http://localhost:8080/api/calculate";

    let chartData = null;

    try {
        // BƯỚC 2: GỌI API LẤY DỮ LIỆU TÍNH TOÁN
        try {
            const res = await fetch(apiUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });
            if (!res.ok) throw new Error("Lỗi HTTP " + res.status);
            chartData = await res.json();
        } catch (apiErr) {
            console.warn("Lỗi gọi API từ origin chính, thử fallback localhost:8080...", apiErr);
            const resLocal = await fetch("http://localhost:8080/api/calculate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });
            if (resLocal.ok) {
                chartData = await resLocal.json();
            }
        }

        if (requestId !== currentRequestId) {
            return;
        }

        // BƯỚC 3: ĐỢI THỜI GIAN ĐỆM ĐẢM BẢO MÀN CHE ĐÃ PHỦ KÍN
        await bufferPromise;

        if (requestId !== currentRequestId) {
            return;
        }

        // BƯỚC 4: RENDER DỮ LIỆU LÁ SỐ MỚI BÊN DƯỚI MÀN CHE
        if (chartData && typeof renderTuViBoard === "function") {
            renderTuViBoard(chartData);
        }
    } catch (err) {
        console.error("Không thể cập nhật lá số:", err);
    } finally {
        if (requestId === currentRequestId) {
            // BƯỚC 5: HẠ MÀN CHE
            if (typeof hideTuViLoading === "function") {
                await hideTuViLoading();
            }
            if (typeof notifyParentHeight === "function") {
                notifyParentHeight();
                setTimeout(notifyParentHeight, 150);
            }
        }
    }
}

// Xử lý sự kiện co giãn màn hình
window.addEventListener('resize', () => {
    if (typeof syncResponsiveWidths === "function") {
        syncResponsiveWidths();
    }
    const cur = window.getCurrentChartData ? window.getCurrentChartData() : window.currentChartData;
    if (cur) {
        if (typeof updateMenhTaiQuanTriangle === "function") {
            updateMenhTaiQuanTriangle(cur.menhPos);
        }
        if (typeof positionTuanTrietBadges === "function") {
            positionTuanTrietBadges(cur.tuan_cung, cur.triet_cung);
        }
    }
    if (typeof notifyParentHeight === "function") {
        notifyParentHeight();
    }
});

// Xử lý chuẩn bị in
window.addEventListener('beforeprint', () => {
    const cur = window.getCurrentChartData ? window.getCurrentChartData() : window.currentChartData;
    if (cur) {
        if (typeof updateMenhTaiQuanTriangle === "function") {
            updateMenhTaiQuanTriangle(cur.menhPos);
        }
        if (typeof positionTuanTrietBadges === "function") {
            positionTuanTrietBadges(cur.tuan_cung, cur.triet_cung);
        }
    }
});

// Khởi chạy khi tài liệu HTML sẵn sàng
document.addEventListener("DOMContentLoaded", () => {
    if (typeof initDropdowns === "function") initDropdowns();
    if (typeof initEventListeners === "function") initEventListeners();
    if (typeof updateDaysInMonth === "function") updateDaysInMonth();
    generateTuVi();
    if (typeof notifyParentHeight === "function") {
        notifyParentHeight();
        setTimeout(notifyParentHeight, 200);
        setTimeout(notifyParentHeight, 800);
    }
});

window.addEventListener('load', () => {
    if (typeof notifyParentHeight === "function") {
        notifyParentHeight();
        setTimeout(notifyParentHeight, 300);
    }
});

if (typeof ResizeObserver !== 'undefined') {
    const ro = new ResizeObserver(() => {
        if (typeof notifyParentHeight === "function") notifyParentHeight();
    });
    ro.observe(document.body);
}

window.generateTuVi = generateTuVi;

