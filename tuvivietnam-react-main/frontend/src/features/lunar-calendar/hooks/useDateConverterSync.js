import { useCallback } from 'react';
import {
  convertLunar2Solar,
  getLeapMonthOfYear,
  getDaysInLunarMonth,
} from '../core/index.js';

export function useDateConverterSync({
  selectedDate,
  setSelectedDate,
  setViewMonth,
  setViewYear,
  dayAlmanac,
}) {
  /**
   * Commit ngày Dương Lịch đầy đủ sau khi kiểm tra hợp lệ
   */
  const commitSolarDate = useCallback(
    (d, m, y) => {
      const safeY = Math.max(1900, Math.min(2100, parseInt(y, 10) || selectedDate.year));
      const safeM = Math.max(1, Math.min(12, parseInt(m, 10) || selectedDate.month));
      const maxDays = new Date(safeY, safeM, 0).getDate();
      const safeD = Math.max(1, Math.min(maxDays, parseInt(d, 10) || selectedDate.day));

      setSelectedDate({ day: safeD, month: safeM, year: safeY });
      setViewMonth(safeM);
      setViewYear(safeY);
    },
    [selectedDate, setSelectedDate, setViewMonth, setViewYear]
  );

  /**
   * Commit ngày Âm Lịch đầy đủ sang Dương Lịch
   */
  const commitLunarDate = useCallback(
    (ld, lm, ly, requestedLeap = 0) => {
      const safeY = Math.max(1900, Math.min(2100, parseInt(ly, 10) || dayAlmanac.lunar.year));
      const safeM = Math.max(1, Math.min(12, parseInt(lm, 10) || dayAlmanac.lunar.month));

      // Kiểm tra xem năm đó có tháng nhuận không và tháng này có phải tháng nhuận không
      const leapMonth = getLeapMonthOfYear(safeY, 7);
      const isLeap = safeM === leapMonth && requestedLeap === 1 ? 1 : 0;

      // Giới hạn ngày theo số ngày thực tế trong tháng âm lịch (29 hay 30 ngày)
      const maxDays = getDaysInLunarMonth(safeM, safeY, isLeap, 7);
      const safeD = Math.max(1, Math.min(maxDays, parseInt(ld, 10) || dayAlmanac.lunar.day));

      const solarRes = convertLunar2Solar(safeD, safeM, safeY, isLeap, 7);
      if (solarRes && solarRes[0] > 0) {
        const [sd, sm, sy] = solarRes;
        setSelectedDate({ day: sd, month: sm, year: sy });
        setViewMonth(sm);
        setViewYear(sy);
      }
    },
    [dayAlmanac, setSelectedDate, setViewMonth, setViewYear]
  );

  /**
   * Tăng / Giảm nút bấm stepper Dương Lịch
   */
  const handleSolarStep = useCallback(
    (field, delta) => {
      const d = selectedDate.day;
      const m = selectedDate.month;
      const y = selectedDate.year;

      if (field === 'day') {
        const cur = new Date(y, m - 1, d + delta);
        commitSolarDate(cur.getDate(), cur.getMonth() + 1, cur.getFullYear());
        return;
      }
      if (field === 'month') {
        const cur = new Date(y, m - 1 + delta, 1);
        commitSolarDate(d, cur.getMonth() + 1, cur.getFullYear());
        return;
      }
      if (field === 'year') {
        commitSolarDate(d, m, y + delta);
      }
    },
    [selectedDate, commitSolarDate]
  );

  /**
   * Tăng / Giảm nút bấm stepper Âm Lịch (xử lý mượt mà cả tháng nhuận)
   */
  const handleLunarStep = useCallback(
    (field, delta) => {
      let ld = dayAlmanac.lunar.day;
      let lm = dayAlmanac.lunar.month;
      let ly = dayAlmanac.lunar.year;
      let isLeap = dayAlmanac.lunar.isLeap ? 1 : 0;

      if (field === 'day') {
        const maxDays = getDaysInLunarMonth(lm, ly, isLeap, 7);
        ld += delta;
        if (ld < 1) ld = 1;
        if (ld > maxDays) ld = maxDays;
        commitLunarDate(ld, lm, ly, isLeap);
        return;
      }

      if (field === 'month') {
        const leapMonth = getLeapMonthOfYear(ly, 7);

        if (delta > 0) {
          // Tăng tháng
          if (leapMonth > 0 && lm === leapMonth && isLeap === 0) {
            // Bước từ tháng thường vào tháng nhuận
            isLeap = 1;
          } else {
            isLeap = 0;
            lm += 1;
            if (lm > 12) {
              lm = 1;
              ly += 1;
            }
          }
        } else {
          // Giảm tháng
          if (leapMonth > 0 && lm === leapMonth && isLeap === 1) {
            // Bước lùi từ tháng nhuận về tháng thường
            isLeap = 0;
          } else {
            lm -= 1;
            if (lm < 1) {
              lm = 12;
              ly -= 1;
            }
            // Nếu tháng vừa lùi tới là tháng nhuận của năm
            const prevYearLeap = getLeapMonthOfYear(ly, 7);
            if (prevYearLeap === lm) {
              isLeap = 1;
            } else {
              isLeap = 0;
            }
          }
        }
        commitLunarDate(ld, lm, ly, isLeap);
        return;
      }

      if (field === 'year') {
        ly += delta;
        commitLunarDate(ld, lm, ly, isLeap);
      }
    },
    [dayAlmanac, commitLunarDate]
  );

  return {
    commitSolarDate,
    commitLunarDate,
    handleSolarStep,
    handleLunarStep,
  };
}
