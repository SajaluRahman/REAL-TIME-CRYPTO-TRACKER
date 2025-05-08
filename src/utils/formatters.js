export const formatCurrency = (value) => {
  return `$${Number(value).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

export const formatLargeNumber = (value) => {
  if (!value) return '∞';
  if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
  if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
  return `$${value.toLocaleString()}`;
};

export const formatNumber = (value) => {
  if (!value) return '0';
  return Number(value).toLocaleString('en-US', { minimumFractionDigits: 0 });
};