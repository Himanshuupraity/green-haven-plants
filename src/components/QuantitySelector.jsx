import { Minus, Plus } from 'lucide-react';

export default function QuantitySelector({ value, onChange, min = 1, max = 10, small = false }) {
  return (
    <div className={`qty ${small ? 'qty--small' : ''}`}>
      <button type="button" onClick={() => onChange(value - 1)} disabled={value <= min} aria-label="Decrease quantity">
        <Minus size={small ? 14 : 16} />
      </button>
      <span aria-live="polite">{value}</span>
      <button type="button" onClick={() => onChange(value + 1)} disabled={value >= max} aria-label="Increase quantity">
        <Plus size={small ? 14 : 16} />
      </button>
    </div>
  );
}
