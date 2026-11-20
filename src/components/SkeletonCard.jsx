export default function SkeletonCard() {
  return (
    <div className="product-card skeleton-card" aria-hidden="true">
      <div className="skeleton skeleton--img" />
      <div className="product-card__body">
        <div className="skeleton skeleton--line" style={{ width: '45%' }} />
        <div className="skeleton skeleton--line" style={{ width: '80%', height: 18 }} />
        <div className="skeleton skeleton--line" style={{ width: '35%' }} />
        <div className="skeleton skeleton--btn" />
      </div>
    </div>
  );
}
