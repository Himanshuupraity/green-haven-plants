import { DEMO_CONTACT } from '../utils/format';

export default function WhatsAppButton() {
  const text = encodeURIComponent('Hi Verdora! I would like some help choosing a plant.');
  return (
    <a
      className="whatsapp-btn"
      href={`https://wa.me/${DEMO_CONTACT.whatsapp}?text=${text}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp (demo number)"
    >
      <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true">
        <path
          fill="currentColor"
          d="M16.04 3C9.4 3 4 8.36 4 14.96c0 2.1.56 4.17 1.62 5.98L4 29l8.3-2.17a12.1 12.1 0 0 0 3.74.6h.01C22.68 27.43 28 22.07 28 15.47 28 8.87 22.68 3 16.04 3zm0 22.4h-.01a10 10 0 0 1-5.1-1.4l-.37-.22-4.93 1.29 1.32-4.8-.24-.39a9.8 9.8 0 0 1-1.52-5.24c0-5.48 4.48-9.94 9.98-9.94 5.5 0 9.86 4.88 9.86 10.37 0 5.5-4.47 10.33-9 10.33zm5.46-7.43c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.47 1.07 2.88 1.21 3.08.15.2 2.1 3.2 5.08 4.48.71.31 1.27.49 1.7.63.72.23 1.37.2 1.88.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35z"
        />
      </svg>
      <span className="whatsapp-btn__label">Chat with us</span>
    </a>
  );
}
