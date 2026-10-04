import React, { useEffect, useRef, useState, useCallback } from 'react';
import { CheckCircle2, MessageCircle, X } from 'lucide-react';
import './LaSoTuVi.css';

const zaloContacts = [
  { label: 'Zalo 1', phone: '0924.6161.99', href: 'https://zalo.me/0924616199' },
  { label: 'Zalo 2', phone: '0385.497.085', href: 'https://zalo.me/0385497085' },
];

function ServiceDialog({ eyebrow, title, price, description, benefits, onClose }) {
  return (
    <div
      className="laso-service-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section className="laso-service-dialog" role="dialog" aria-modal="true" aria-labelledby="laso-service-title">
        <button type="button" className="laso-service-close" onClick={onClose} aria-label="Đóng cửa sổ">
          <X size={20} />
        </button>
        <p className="laso-service-eyebrow">{eyebrow}</p>
        <h2 id="laso-service-title" className="laso-service-title">{title}</h2>
        <p className="laso-service-price">{price}</p>
        <p className="laso-service-description">{description}</p>
        <ul className="laso-service-benefits">
          {benefits.map((benefit) => (
            <li key={benefit}>
              <CheckCircle2 size={17} aria-hidden="true" />
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
        <div className="laso-service-contacts">
          {zaloContacts.map((contact) => (
            <a key={contact.phone} href={contact.href} target="_blank" rel="noopener noreferrer">
              <MessageCircle size={17} aria-hidden="true" />
              <span>{contact.label}: {contact.phone}</span>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}

function LifetimeReadingDialog({ onClose }) {
  return (
    <ServiceDialog
      eyebrow="Gói luận giải đầy đủ"
      title="Luận giải chi tiết trọn đời"
      price="199.000đ"
      description="Nhận bản luận giải PDF chi tiết, dễ lưu trữ và xem lại. Gửi ngày giờ sinh qua Zalo để được hướng dẫn đặt luận giải."
      benefits={[
        'Bản luận giải PDF 15-20 trang về 12 cung trọn đời.',
        'Phân tích 10 năm đại vận và tiểu vận năm nay, năm tới.',
        'Luận giải công danh, tài lộc, tình duyên và gia đạo.',
        'Gợi ý phong thủy và phương pháp hóa giải sao xấu.',
      ]}
      onClose={onClose}
    />
  );
}

function PrivateConsultationDialog({ onClose }) {
  return (
    <ServiceDialog
      eyebrow="Tư vấn trực tiếp 1-1"
      title="Đặt lịch luận giải riêng với Thầy"
      price="500.000đ / lá số"
      description="Đàm thoại riêng qua Zalo (gọi thoại hoặc video) cùng Thầy Tử Vi Hồng Ân để trao đổi trực tiếp về lá số và vấn đề bạn quan tâm."
      benefits={[
        'Luận giải bản mệnh, đại vận và tiểu vận.',
        'Trao đổi về sự nghiệp, tài lộc, tình duyên và gia đạo.',
        'Chủ động chọn thời gian hẹn qua Zalo.',
      ]}
      onClose={onClose}
    />
  );
}

/**
 * Phân hệ Lập Lá Số Tử Vi Đẩu Số - Tích hợp thống nhất với Website
 * Tự động đồng bộ chiều cao qua postMessage, loại bỏ hoàn toàn thanh cuộn lồng nhau.
 */
function LaSoTuVi() {
  const iframeRef = useRef(null);
  const [frameHeight, setFrameHeight] = useState(1040);
  const [activeService, setActiveService] = useState(null);

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

    function handleServiceModalMessage(event) {
      if (
        event.origin !== window.location.origin ||
        event.source !== iframeRef.current?.contentWindow ||
        event.data?.type !== 'TUVI_OPEN_SERVICE_MODAL'
      ) {
        return;
      }

      if (event.data.service === 'lifetime' || event.data.service === 'consultation') {
        setActiveService(event.data.service);
      }
    }

    function handleResizeMessage(e) {
      if (e.data && e.data.type === 'TUVI_IFRAME_RESIZE' && e.data.height) {
        setFrameHeight(Math.max(680, Math.ceil(e.data.height)));
      }
    }

    window.addEventListener('message', handleResizeMessage);
    window.addEventListener('message', handleServiceModalMessage);
    window.addEventListener('resize', requestHeight);

    return () => {
      window.removeEventListener('message', handleResizeMessage);
      window.removeEventListener('message', handleServiceModalMessage);
      window.removeEventListener('resize', requestHeight);
    };
  }, [requestHeight]);

  useEffect(() => {
    if (!activeService) return undefined;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setActiveService(null);
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeService]);

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
      {activeService === 'lifetime' && <LifetimeReadingDialog onClose={() => setActiveService(null)} />}
      {activeService === 'consultation' && <PrivateConsultationDialog onClose={() => setActiveService(null)} />}
    </div>
  );
}

export default LaSoTuVi;
