/**
 * geometry.js
 * Tính toán tọa độ không gian: định vị huy hiệu Tuần/Triệt và tam giác Mệnh-Tài-Quan.
 */

function getBoundaryPosition(c1, c2) {
    c1 = Number(c1);
    c2 = Number(c2);
    const pair = [c1, c2].sort((a, b) => a - b).join("-");
    const BOUNDARY_MAP = {
        "5-6": { top: "12.5%", left: "25%", orientation: "v", type: "divider-v" },
        "6-7": { top: "25%", left: "50%", orientation: "h", type: "tab-down" },
        "7-8": { top: "12.5%", left: "75%", orientation: "v", type: "divider-v" },
        "8-9": { top: "25%", left: "87.5%", orientation: "h", type: "divider-h" },
        "9-10": { top: "50%", left: "87.5%", orientation: "h", type: "divider-h" },
        "10-11": { top: "75%", left: "87.5%", orientation: "h", type: "divider-h" },
        "0-11": { top: "87.5%", left: "75%", orientation: "v", type: "divider-v" },
        "0-1": { top: "75%", left: "50%", orientation: "h", type: "tab-up" },
        "1-2": { top: "87.5%", left: "25%", orientation: "v", type: "divider-v" },
        "2-3": { top: "75%", left: "12.5%", orientation: "h", type: "divider-h" },
        "3-4": { top: "50%", left: "12.5%", orientation: "h", type: "divider-h" },
        "4-5": { top: "25%", left: "12.5%", orientation: "h", type: "divider-h" }
    };
    return BOUNDARY_MAP[pair] || { top: "50%", left: "50%", orientation: "h", type: "divider-h" };
}

function positionTuanTrietBadges(tuanCung, trietCung) {
    let tuan = document.getElementById("badgeTuan");
    let triet = document.getElementById("badgeTriet");
    const board = document.getElementById("tuviBoard");
    if (!board) return;

    if (!tuan) {
        tuan = document.createElement("div");
        tuan.id = "badgeTuan";
        tuan.className = "badge-tuan-triet badge-tuan";
        tuan.textContent = "Tuần";
        board.appendChild(tuan);
    } else if (tuan.parentElement !== board) {
        board.appendChild(tuan);
    }

    if (!triet) {
        triet = document.createElement("div");
        triet.id = "badgeTriet";
        triet.className = "badge-tuan-triet badge-triet";
        triet.textContent = "Triệt";
        board.appendChild(triet);
    } else if (triet.parentElement !== board) {
        board.appendChild(triet);
    }

    const hasTuan = Boolean(tuanCung && tuanCung.length >= 2 && tuanCung[0] !== undefined && tuanCung[0] !== null && tuanCung[1] !== undefined && tuanCung[1] !== null);
    const hasTriet = Boolean(trietCung && trietCung.length >= 2 && trietCung[0] !== undefined && trietCung[0] !== null && trietCung[1] !== undefined && trietCung[1] !== null);

    if (!hasTuan) tuan.style.display = "none";
    if (!hasTriet) triet.style.display = "none";

    if (!hasTuan && !hasTriet) return;

    const pTuan = hasTuan ? getBoundaryPosition(tuanCung[0], tuanCung[1]) : null;
    const pTriet = hasTriet ? getBoundaryPosition(trietCung[0], trietCung[1]) : null;

    function applyBadgeStyle(el, pos) {
        if (!el || !pos) return;
        el.classList.remove("badge-tab-down", "badge-tab-up", "badge-divider-h", "badge-divider-v");
        if (pos.type === "tab-down") {
            el.classList.add("badge-tab-down");
        } else if (pos.type === "tab-up") {
            el.classList.add("badge-tab-up");
        } else if (pos.type === "divider-v") {
            el.classList.add("badge-divider-v");
        } else {
            el.classList.add("badge-divider-h");
        }
    }

    if (hasTuan) {
        tuan.style.display = "inline-flex";
        applyBadgeStyle(tuan, pTuan);
    }
    if (hasTriet) {
        triet.style.display = "inline-flex";
        applyBadgeStyle(triet, pTriet);
    }

    const isCollision = Boolean(hasTuan && hasTriet && pTuan.top === pTriet.top && pTuan.left === pTriet.left);

    if (isCollision) {
        if (pTuan.orientation === "v") {
            tuan.style.top = `calc(${pTuan.top} - 11px)`;
            tuan.style.left = pTuan.left;
            triet.style.top = `calc(${pTuan.top} + 11px)`;
            triet.style.left = pTuan.left;
        } else {
            tuan.style.top = pTuan.top;
            tuan.style.left = `calc(${pTuan.left} - 23px)`;
            triet.style.top = pTuan.top;
            triet.style.left = `calc(${pTuan.left} + 23px)`;
        }
    } else {
        if (hasTuan) {
            tuan.style.top = pTuan.top;
            tuan.style.left = pTuan.left;
        }
        if (hasTriet) {
            triet.style.top = pTriet.top;
            triet.style.left = pTriet.left;
        }
    }
}

function updateMenhTaiQuanTriangle(menhPos) {
    if (menhPos === undefined || menhPos === null) return;
    menhPos = Number(menhPos);
    if (isNaN(menhPos)) return;
    const quanPos = (menhPos + 4) % 12;
    const taiPos = (menhPos + 8) % 12;

    const tb = document.getElementById("thien-ban");
    const poly = document.getElementById("polyMenhTaiQuan");
    if (!poly || !tb) return;

    const tbRect = tb.getBoundingClientRect();

    function getHouseContactPoint(pos) {
        const STATIC_COORDS = {
            0: { x: 750, y: 1000 },  // Tý
            1: { x: 250, y: 1000 },  // Sửu
            2: { x: 0,   y: 1000 },  // Dần
            3: { x: 0,   y: 750 },   // Mão
            4: { x: 0,   y: 250 },   // Thìn
            5: { x: 0,   y: 0 },     // Tỵ
            6: { x: 250, y: 0 },     // Ngọ
            7: { x: 750, y: 0 },     // Mùi
            8: { x: 1000, y: 0 },    // Thân
            9: { x: 1000, y: 250 },  // Dậu
            10: { x: 1000, y: 750 }, // Tuất
            11: { x: 1000, y: 1000 } // Hợi
        };

        if (!tbRect || tbRect.width <= 0) {
            return STATIC_COORDS[pos];
        }

        const houseEl = document.getElementById(`house-${pos}`);
        if (!houseEl) return STATIC_COORDS[pos];
        const hRect = houseEl.getBoundingClientRect();
        if (hRect.width <= 0) return STATIC_COORDS[pos];

        let x, y;
        switch (pos) {
            case 0:
            case 1:
                x = ((hRect.left + hRect.width / 2 - tbRect.left) / tbRect.width) * 1000;
                y = 1000;
                break;
            case 2:
                x = 0;
                y = 1000;
                break;
            case 3:
            case 4:
                x = 0;
                y = ((hRect.top + hRect.height / 2 - tbRect.top) / tbRect.height) * 1000;
                break;
            case 5:
                x = 0;
                y = 0;
                break;
            case 6:
            case 7:
                x = ((hRect.left + hRect.width / 2 - tbRect.left) / tbRect.width) * 1000;
                y = 0;
                break;
            case 8:
                x = 1000;
                y = 0;
                break;
            case 9:
            case 10:
                x = 1000;
                y = ((hRect.top + hRect.height / 2 - tbRect.top) / tbRect.height) * 1000;
                break;
            case 11:
                x = 1000;
                y = 1000;
                break;
            default:
                return STATIC_COORDS[pos];
        }

        x = Math.max(0, Math.min(1000, x));
        y = Math.max(0, Math.min(1000, y));
        return { x, y };
    }

    const pM = getHouseContactPoint(menhPos);
    const pQ = getHouseContactPoint(quanPos);
    const pT = getHouseContactPoint(taiPos);

    poly.setAttribute("points", `${pM.x.toFixed(1)},${pM.y.toFixed(1)} ${pQ.x.toFixed(1)},${pQ.y.toFixed(1)} ${pT.x.toFixed(1)},${pT.y.toFixed(1)}`);
}

window.getBoundaryPosition = getBoundaryPosition;
window.positionTuanTrietBadges = positionTuanTrietBadges;
window.updateMenhTaiQuanTriangle = updateMenhTaiQuanTriangle;
