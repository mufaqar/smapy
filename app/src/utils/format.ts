export const formatPrice = (value?: number) =>
  value && value < 0
    ? `($${(-value || 0).toFixed(2)})`
    : `$${(value || 0).toFixed(2)}`;
