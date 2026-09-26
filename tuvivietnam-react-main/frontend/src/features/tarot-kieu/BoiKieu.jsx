import React, { useEffect } from 'react';
import './BoiKieu.css';

/**
 * Trang Bói Quẻ Kiều – nhúng HTML gốc (bánh xe + 210 quẻ)
 */
function BoiKieu() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="boikieu-page">
      <div className="boikieu-breadcrumb">Home › Phần mềm › Bói Quẻ Kiều</div>
      <div className="boikieu-iframe-wrap">
        <iframe
          src="/tarot-kieu/boi-que-kieu.html"
          title="Bói Quẻ Kiều"
          className="boikieu-iframe"
        />
      </div>
    </div>
  );
}

export default BoiKieu;
