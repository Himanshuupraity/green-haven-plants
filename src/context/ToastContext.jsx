import { createContext, useCallback, useContext, useRef, useState } from 'react';
import { CheckCircle2, Heart, Info, X } from 'lucide-react';

const ToastContext = createContext(null);

const ICONS = { success: CheckCircle2, wishlist: Heart, info: Info };

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const idRef = useRef(0);

  const dismiss = useCallback((id) => {
    setToasts((list) => list.map((t) => (t.id === id ? { ...t, leaving: true } : t)));
    setTimeout(() => setToasts((list) => list.filter((t) => t.id !== id)), 250);
  }, []);

  const showToast = useCallback(
    ({ title, message, type = 'success', image }) => {
      const id = ++idRef.current;
      setToasts((list) => [...list.slice(-2), { id, title, message, type, image }]);
      setTimeout(() => dismiss(id), 3200);
    },
    [dismiss]
  );

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <div className="toast-stack" role="status" aria-live="polite">
        {toasts.map((t) => {
          const Icon = ICONS[t.type] || CheckCircle2;
          return (
            <div key={t.id} className={`toast toast--${t.type} ${t.leaving ? 'is-leaving' : ''}`}>
              {t.image ? (
                <img src={t.image} alt="" className="toast__img" />
              ) : (
                <span className="toast__icon">
                  <Icon size={18} />
                </span>
              )}
              <div className="toast__body">
                <strong>{t.title}</strong>
                {t.message && <span>{t.message}</span>}
              </div>
              <button className="toast__close" onClick={() => dismiss(t.id)} aria-label="Dismiss">
                <X size={16} />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
