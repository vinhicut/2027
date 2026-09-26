import React, { useEffect, useRef, useState, useCallback } from 'react';
import './LaSoTuVi.css';

/**
 * Phân hệ Lập Lá Số Tử Vi Đẩu Số - Tích hợp thống nhất với Website
 * Tự động đồng bộ chiều cao qua postMessage, loại bỏ hoàn toàn thanh cuộn lồng nhau.
 */
function LaSoTuVi() {
  const iframeRef = useRef(null);
  const [frameHeight, setFrameHeight] = useState(1040);

  const requestHeight = useCallback(() => {
    try {
      if (iframeRef.current && iframeRef.current.contentWindow) {
        iframeRef.current.contentWindow.postMessage({ type: 'REQUEST_TUVI_HEIGHT' }, '*');
      }
    } catch {
      /* cross-origin guard */
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);

    function handleResizeMessage(e) {
      if (e.data && e.data.type === 'TUVI_IFRAME_RESIZE' && e.data.height) {
        setFrameHeight(Math.max(680, Math.ceil(e.data.height)));
      }
    }

    window.addEventListener('message', handleResizeMessage);
    window.addEventListener('resize', requestHeight);

    return () => {
      window.removeEventListener('message', handleResizeMessage);
      window.removeEventListener('resize', requestHeight);
    };
  }, [requestHeight]);

  return (
    <div className="laso-unified-page">
      <div className="laso-unified-wrap">
        <iframe
          ref={iframeRef}
          src="/astrology-engine/laso-tuvi.html?v=2409"
          title="Lá Số Tử Vi Đẩu Số"
          className="laso-unified-iframe"
          style={{ height: `${frameHeight}px` }}
          scrolling="no"
          frameBorder="0"
          onLoad={() => {
            requestHeight();
            setTimeout(requestHeight, 200);
            setTimeout(requestHeight, 600);
          }}
        />
      </div>
    </div>
  );
}

export default LaSoTuVi;
