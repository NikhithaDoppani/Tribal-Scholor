export function LoadingState() {
  return (
    <div className="flex items-center justify-center py-24">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-ink-200 border-t-saffron-500" />
        <p className="text-sm text-ink-500">Loading…</p>
      </div>
    </div>
  );
}
