"use client";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/5511996154581"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Fale conosco pelo WhatsApp"
      className="whatsapp-fab"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="white">
        <path d="M16 2C8.28 2 2 8.28 2 16c0 2.48.67 4.8 1.84 6.8L2 30l7.4-1.8A13.93 13.93 0 0 0 16 30c7.72 0 14-6.28 14-14S23.72 2 16 2zm0 25.6c-2.18 0-4.22-.6-5.96-1.64l-.42-.26-4.4 1.06 1.1-4.28-.28-.44A11.56 11.56 0 0 1 4.4 16C4.4 9.6 9.6 4.4 16 4.4S27.6 9.6 27.6 16 22.4 27.6 16 27.6zm6.34-8.6c-.34-.18-2.02-1-2.34-1.1-.32-.12-.56-.18-.8.18-.24.34-.9 1.1-1.1 1.34-.2.22-.4.26-.74.08-.34-.18-1.44-.52-2.74-1.66-1.02-.9-1.7-2-1.9-2.34-.2-.34-.02-.52.14-.7.16-.16.34-.4.52-.6.18-.2.24-.34.36-.56.12-.24.06-.44-.02-.62-.08-.18-.8-1.92-1.1-2.62-.28-.68-.58-.58-.8-.58h-.68c-.24 0-.62.08-.94.42-.32.34-1.22 1.18-1.22 2.88s1.24 3.34 1.42 3.56c.18.24 2.44 3.74 5.92 5.24.82.36 1.46.58 1.96.74.82.26 1.58.22 2.16.14.66-.1 2.02-.82 2.3-1.62.28-.78.28-1.46.2-1.6-.08-.16-.3-.24-.64-.4z"/>
      </svg>
      <style>{`
        .whatsapp-fab {
          position: fixed;
          bottom: 28px;
          right: 28px;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 58px;
          height: 58px;
          border-radius: 50%;
          background-color: #25D366;
          box-shadow: 0 4px 16px rgba(0,0,0,0.35);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .whatsapp-fab:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 20px rgba(0,0,0,0.45);
        }
      `}</style>
    </a>
  );
}
