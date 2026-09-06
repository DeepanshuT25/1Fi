export const formatCurrency = (amount) => {
  if (amount === null || amount === undefined) return '';
  return `${Math.round(amount).toLocaleString('en-IN')}`;
};
