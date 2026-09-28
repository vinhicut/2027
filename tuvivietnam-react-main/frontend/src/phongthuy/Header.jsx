import React from 'react';
import { Compass, Sparkles, Heart } from 'lucide-react';

export const Header = ({ activeTab, setActiveTab, isSingle }) => {
  const navItems = [
    { id: 'overview', label: 'Bát Trạch Gia Chủ' },
    { id: 'directions', label: '8 Hướng Nhà Cát Hung' },
    { id: 'compass', label: 'La Bàn Bát Quái' },
    {
      id: isSingle ? 'single' : 'spouse',
      label: isSingle ? 'Độc Thân & Đào Hoa' : 'Xem Tuổi Vợ Chồng',
    },
    { id: 'layout', label: 'Cẩm Nang Bố Trí' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#FFFFFF]/95 backdrop-blur-md border-b border-[#E8E2D8] shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#9E2A1E] border border-[#B73324] flex items-center justify-center text-[#FFF7EC] shadow-sm">
              <Compass className="w-6 h-6 stroke-[1.8]" />
            </div>
            <div>
              <span className="font-serif-heading text-lg sm:text-xl font-bold tracking-tight text-[#1F1914] block leading-tight">
                Phong Thủy Bát Trạch
              </span>
              <span className="text-xs text-[#7A6F64] hidden sm:block">
                Định Cung Mệnh · Khai Phương Vị · Gia Đạo Hưng Vượng
              </span>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-3 py-2 text-sm font-medium transition-colors cursor-pointer rounded-lg whitespace-nowrap flex items-center gap-1.5 ${
                    isActive
                      ? 'text-[#9E2A1E] bg-[#F4EBE2] border border-[#E4D5C5] font-semibold'
                      : 'text-[#645A50] hover:text-[#1F1914] hover:bg-[#F5F2EB]'
                  }`}
                >
                  {item.id === 'single' && <Sparkles className="w-3.5 h-3.5 text-[#DB2777]" />}
                  {item.id === 'spouse' && <Heart className="w-3.5 h-3.5 text-[#DB2777]" />}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-[#F3EFE6] text-[#6E4426] border border-[#E2DBD0]">
              Bát Trạch Minh Kính
            </span>
          </div>
        </div>
      </div>

      {/* Mobile navigation tab scroll */}
      <div className="lg:hidden flex overflow-x-auto py-2.5 px-4 gap-1.5 border-t border-[#EFE9DF] bg-[#FAF8F5] scrollbar-none">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 flex items-center gap-1.5 transition-colors cursor-pointer ${
                isActive
                  ? 'bg-[#9E2A1E] text-white shadow-xs font-semibold'
                  : 'text-[#645A50] bg-[#FFFFFF] border border-[#E5DFD5]'
              }`}
            >
              {item.id === 'single' && <Sparkles className="w-3 h-3 text-[#FBCFE8]" />}
              {item.id === 'spouse' && <Heart className="w-3 h-3 text-[#FBCFE8]" />}
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};
