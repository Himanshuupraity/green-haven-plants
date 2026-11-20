import EmptyState from '../components/EmptyState';

export default function NotFound() {
  return (
    <div className="container page-pad">
      <EmptyState
        title="This page has wandered off into the garden"
        text="The page you’re looking for doesn’t exist or may have moved."
        actionLabel="Back to Shop"
        actionTo="/shop"
      />
    </div>
  );
}
