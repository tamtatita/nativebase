import { formatDistanceToNow, parseISO, format } from "date-fns";

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

export const formatISOTOAgo = (time) => {
  const timeAgo = formatDistanceToNow(new Date(time), { addSuffix: true });
  return timeAgo;
};

export const formatISOToDateTime = (isoString) => {
  // Phân tích chuỗi ISO thành đối tượng Date
  const date = parseISO(isoString);

  // Định dạng lại thành dd/mm/yyyy hh:mm:ss
  return format(date, "dd/MM/yyyy HH:mm:ss");
};
