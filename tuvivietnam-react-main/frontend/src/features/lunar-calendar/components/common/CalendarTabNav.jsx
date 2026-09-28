import React from 'react';

function CalendarTabNav({ activeTab, onTabChange }) {
  const tabs = [
    { id: 'daily', label: 'Ngày' },
    { id: 'monthly', label: 'Tháng toàn cảnh' },
    { id: 'good_days', label: 'Ngày tốt' },
  ];

  return (
    <nav className="lvs-vertical-nav" aria-label="Điều hướng chế độ xem Lịch">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          className={`v-nav-btn ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
}

export default React.memo(CalendarTabNav);
