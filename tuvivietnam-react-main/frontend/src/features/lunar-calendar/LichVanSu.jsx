import React from 'react';
import './LichVanSu.css';

import { useLichVanSu } from './hooks/useLichVanSu.js';
import { useDateConverterSync } from './hooks/useDateConverterSync.js';

import CalendarTabNav from './components/common/CalendarTabNav.jsx';
import DualDateSyncBar from './components/converter/DualDateSyncBar.jsx';

import DailyTearCalendar from './components/daily/DailyTearCalendar.jsx';
import HourlyFortuneMatrix from './components/daily/HourlyFortuneMatrix.jsx';
import DayDeitiesAndStars from './components/daily/DayDeitiesAndStars.jsx';
import DepartureAndConflicts from './components/daily/DepartureAndConflicts.jsx';
import MiniMonthCalendar from './components/daily/MiniMonthCalendar.jsx';

import MonthlyCalendarGrid from './components/monthly/MonthlyCalendarGrid.jsx';
import MonthlyDayInspector from './components/monthly/MonthlyDayInspector.jsx';

import GoodDayFilterView from './components/goodDays/GoodDayFilterView.jsx';

/**
 * TÍNH NĂNG LỊCH VẠN SỰ - TỬ VI HỒNG ÂN
 * Kiến trúc Modules phân tầng Clean Architecture, chuẩn hóa thuật toán phương Đông.
 */
function LichVanSu() {
  const {
    today,
    activeTab,
    setActiveTab,
    selectedDate,
    setSelectedDate,
    viewMonth,
    setViewMonth,
    viewYear,
    setViewYear,
    dayAlmanac,
    monthAlmanac,
    isSelectedToday,
    handlePrevDay,
    handleNextDay,
    handleGoToday,
    handleSelectDay,
    handleSelectDayAndSwitchToDaily,
    handlePrevMonth,
    handleNextMonth,
  } = useLichVanSu();

  const {
    commitSolarDate,
    commitLunarDate,
    handleSolarStep,
    handleLunarStep,
  } = useDateConverterSync({
    selectedDate,
    setSelectedDate,
    setViewMonth,
    setViewYear,
    dayAlmanac,
  });

  return (
    <div className="lvs-master-container">
      {/* 1. KHỐI ĐIỀU HƯỚNG TAB & BỘ QUY ĐỔI ÂM - DƯƠNG SONG HÀNH */}
      <section className="lvs-control-header-panel">
        <CalendarTabNav
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        <DualDateSyncBar
          dayAlmanac={dayAlmanac}
          selectedDate={selectedDate}
          commitSolarDate={commitSolarDate}
          commitLunarDate={commitLunarDate}
          onSolarStep={handleSolarStep}
          onLunarStep={handleLunarStep}
        />
      </section>

      {/* 2. VÙNG NỘI DUNG THEO TAB */}
      <main className="lvs-tab-content-area">
        {/* TAB 1: NGÀY (DAILY VIEW) */}
        {activeTab === 'daily' && (
          <div className="lvs-daily-layout">
            <div className="daily-top-row">
              {/* Cột trái: Lốc lịch ngày + Lịch tháng thu nhỏ + Hướng xuất hành & Tuổi xung */}
              <div className="daily-left-column">
                <DailyTearCalendar
                  dayData={dayAlmanac}
                  onPrevDay={handlePrevDay}
                  onNextDay={handleNextDay}
                  onGoToday={handleGoToday}
                  isToday={isSelectedToday}
                />

                <MiniMonthCalendar
                  viewMonth={viewMonth}
                  viewYear={viewYear}
                  selectedDay={selectedDate}
                  onSelectDay={handleSelectDay}
                  onPrevMonth={handlePrevMonth}
                  onNextMonth={handleNextMonth}
                  today={today}
                />

                <DepartureAndConflicts
                  departures={dayAlmanac.departures}
                  conflicts={dayAlmanac.conflicts}
                />
              </div>

              {/* Cột phải: Việc nên làm/kiêng + Lục Diệu + Thập nhị trực & Nhị thập bát tú + Bách Thần Sát */}
              <div className="daily-right-column">
                <DayDeitiesAndStars dayData={dayAlmanac} />
              </div>
            </div>

            {/* Bố cục 12 Giờ Hoàng Đạo & Giờ Xuất Hành Lý Thuần Phong (Full-width 100%) */}
            <section className="daily-fullwidth-hourly-section">
              <HourlyFortuneMatrix
                hourlyDeities={dayAlmanac.hourlyDeities}
              />
            </section>
          </div>
        )}

        {/* TAB 2: THÁNG TOÀN CẢNH (MONTHLY VIEW) */}
        {activeTab === 'monthly' && (
          <div className="lvs-monthly-layout">
            <div className="monthly-calendar-container">
              <MonthlyCalendarGrid
                monthData={monthAlmanac}
                selectedDay={selectedDate}
                onSelectDay={handleSelectDay}
                onPrevMonth={handlePrevMonth}
                onNextMonth={handleNextMonth}
                onGoToday={handleGoToday}
                today={today}
              />
            </div>

            <MonthlyDayInspector
              dayAlmanac={dayAlmanac}
              onSwitchToDaily={() => setActiveTab('daily')}
            />
          </div>
        )}

        {/* TAB 3: TÌM NGÀY TỐT THEO MỤC ĐÍCH (GOOD DAYS VIEW) */}
        {activeTab === 'good_days' && (
          <GoodDayFilterView
            initialMonth={selectedDate.month}
            initialYear={selectedDate.year}
            onSelectDayAndSwitch={handleSelectDayAndSwitchToDaily}
          />
        )}
      </main>
    </div>
  );
}

export default LichVanSu;
