export const formatCurrencyRange = (range) => {
  return range.map(formatCurrency).join(" - ");
};

export const formatCurrency = (amount) => {
  if (amount >= 1000000000) {
    return (amount / 1000000000).toFixed(1).replace(/\.0$/, "") + " T";
  } else if (amount >= 1000000) {
    return (amount / 1000000).toFixed(1).replace(/\.0$/, "") + " Tr";
  } else if (amount >= 1000) {
    return (amount / 1000).toFixed(0) + "k";
  } else {
    return amount.toString();
  }
};
