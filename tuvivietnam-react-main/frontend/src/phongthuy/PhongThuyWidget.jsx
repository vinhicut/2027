import React, { useState } from 'react';
import { Header } from './Header';
import { SelectorBar } from './SelectorBar';
import { OverviewCard } from './OverviewCard';
import { DirectionsSection } from './DirectionsSection';
import { InteractiveCompass } from './InteractiveCompass';
import { SpouseCompatibilitySection } from './SpouseCompatibilitySection';
import { SingleHomeownerGuide } from './SingleHomeownerGuide';
import { HomeLayoutGuide } from './HomeLayoutGuide';
import { getYearDetails } from './sixtyHoaGiap';
import { Printer, Compass, Heart, Home, Sparkles } from 'lucide-react';

export const PhongThuyWidget = ({
  initialHusbandYear = 1990,
  initialWifeYear = 1992,
  initialIsSingle = false,
  courtyardImgUrl,
  luopanImgUrl,
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isSingle, setIsSingle] = useState(initialIsSingle);
  const [husbandYear, setHusbandYear] = useState(initialHusbandYear);
  const [wifeYear, setWifeYear] = useState(initialWifeYear);

  const husbandData = getYearDetails(husbandYear);
  const wifeData = getYearDetails(wifeYear);

  const handlePrint = () => {
    window.print();
  };

  const handleSelectPotentialSpouse = (potentialWifeYear) => {
    setWifeYear(potentialWifeYear);
    setIsSingle(false);
    setActiveTab('spouse');
  };

  return (
    <div className="feng-shui-widget w-full bg-[#F8F6F0] text-[#2D2722] font-sans selection:bg-[#9E2A1E] selection:text-white rounded-2xl overflow-hidden">
      {/* Header */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} isSingle={isSingle} />

      {/* Main Container */}
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Selector */}
        <SelectorBar
          husbandYear={husbandYear}
          setHusbandYear={setHusbandYear}
          wifeYear={wifeYear}
          setWifeYear={setWifeYear}
          husbandData={husbandData}
          wifeData={wifeData}
          isSingle={isSingle}
          setIsSingle={setIsSingle}
        />

        {/* Dynamic Tab Switch */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 bg-[#FFFFFF] p-2 rounded-2xl border border-[#E4DED4] shadow-xs">
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'overview'
                  ? 'bg-[#9E2A1E] text-white shadow-xs'
                  : 'text-[#645A50] hover:text-[#1F1914] hover:bg-[#F5F2EB]'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>Cung Mệnh Bản Thân</span>
            </button>

            <button
              onClick={() => setActiveTab('directions')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'directions'
                  ? 'bg-[#9E2A1E] text-white shadow-xs'
                  : 'text-[#645A50] hover:text-[#1F1914] hover:bg-[#F5F2EB]'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>8 Hướng Nhà Cát Hung</span>
            </button>

            <button
              onClick={() => setActiveTab('compass')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'compass'
                  ? 'bg-[#9E2A1E] text-white shadow-xs'
                  : 'text-[#645A50] hover:text-[#1F1914] hover:bg-[#F5F2EB]'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>La Bàn 360°</span>
            </button>

            {isSingle ? (
              <button
                onClick={() => setActiveTab('single')}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                  activeTab === 'single'
                    ? 'bg-[#DB2777] text-white shadow-xs'
                    : 'text-[#645A50] hover:text-[#1F1914] hover:bg-[#F5F2EB]'
                }`}
              >
                <Sparkles className="w-4 h-4 text-[#F472B6]" />
                <span>Độc Thân & Tìm Tuổi Hợp</span>
              </button>
            ) : (
              <button
                onClick={() => setActiveTab('spouse')}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                  activeTab === 'spouse'
                    ? 'bg-[#9E2A1E] text-white shadow-xs'
                    : 'text-[#645A50] hover:text-[#1F1914] hover:bg-[#F5F2EB]'
                }`}
              >
                <Heart className="w-4 h-4 text-[#F43F5E]" />
                <span>Hợp Tuổi Vợ Chồng</span>
              </button>
            )}

            <button
              onClick={() => setActiveTab('layout')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'layout'
                  ? 'bg-[#9E2A1E] text-white shadow-xs'
                  : 'text-[#645A50] hover:text-[#1F1914] hover:bg-[#F5F2EB]'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Bố Trí Phòng Ốc</span>
            </button>
          </div>

          <button
            onClick={handlePrint}
            className="px-3 py-2 text-xs font-medium text-[#70665B] hover:text-[#1F1914] bg-[#FAF7F2] hover:bg-[#F4EFE6] border border-[#E0D8CB] rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 ml-auto"
          >
            <Printer className="w-4 h-4" />
            <span className="hidden sm:inline">In kết quả</span>
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <OverviewCard
            husbandData={husbandData}
            courtyardImgUrl={courtyardImgUrl}
            luopanImgUrl={luopanImgUrl}
          />
        )}

        {activeTab === 'directions' && (
          <DirectionsSection
            husbandData={husbandData}
            wifeData={wifeData}
          />
        )}

        {activeTab === 'compass' && (
          <InteractiveCompass
            husbandData={husbandData}
            wifeData={wifeData}
            luopanImgUrl={luopanImgUrl}
          />
        )}

        {activeTab === 'spouse' && !isSingle && (
          <SpouseCompatibilitySection
            husbandYear={husbandYear}
            wifeYear={wifeYear}
          />
        )}

        {activeTab === 'single' && isSingle && (
          <SingleHomeownerGuide
            husbandData={husbandData}
            onSelectPotentialSpouse={handleSelectPotentialSpouse}
          />
        )}

        {activeTab === 'layout' && (
          <HomeLayoutGuide husbandData={husbandData} />
        )}
      </div>
    </div>
  );
};

export default PhongThuyWidget;
