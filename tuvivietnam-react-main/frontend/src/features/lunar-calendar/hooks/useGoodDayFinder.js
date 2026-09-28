import { useState, useMemo } from 'react';
import { findGoodDaysInMonth } from '../core/index.js';

export function useGoodDayFinder(initialMonth, initialYear) {
  const [filterMonth, setFilterMonth] = useState(initialMonth);
  const [filterYear, setFilterYear] = useState(initialYear);
  const [selectedPurpose, setSelectedPurpose] = useState('all');

  const goodDays = useMemo(() => {
    return findGoodDaysInMonth(filterMonth, filterYear, selectedPurpose);
  }, [filterMonth, filterYear, selectedPurpose]);

  const handlePrevMonth = () => {
    if (filterMonth === 1) {
      setFilterMonth(12);
      setFilterYear((y) => y - 1);
    } else {
      setFilterMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (filterMonth === 12) {
      setFilterMonth(1);
      setFilterYear((y) => y + 1);
    } else {
      setFilterMonth((m) => m + 1);
    }
  };

  return {
    filterMonth,
    setFilterMonth,
    filterYear,
    setFilterYear,
    selectedPurpose,
    setSelectedPurpose,
    goodDays,
    handlePrevMonth,
    handleNextMonth,
  };
}
