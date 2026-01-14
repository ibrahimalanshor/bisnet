import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(localizedFormat);

export function getChartColor(color, transparent = 1) {
  return {
    red: `rgb(255, 99, 132, ${transparent})`,
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: `rgb(54, 162, 235, ${transparent})`,
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)',
  }[color];
}

export function sleep(ms = 1000) {
  return new Promise((res) => {
    setTimeout(() => res(true), ms);
  });
}

export function debounce(callback, wait) {
  let timeoutId = null;

  return (...args) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      callback.apply(null, args);
    }, wait);
  };
}

export function formatCurrency(num) {
  return new Intl.NumberFormat().format(num);
}

export function formatDate(str, format = 'DD MMMM YYYY HH:mm') {
  return dayjs(str).format(format);
}

export function currencyToNum(cur, options = { failToZero: false }) {
  if (typeof cur === 'number') {
    return cur;
  }

  if (typeof cur !== 'string') {
    return options.failToZero ? 0 : null;
  }

  return Number(cur.replace(/,/gi, ''));
}

export function extractPriceTax(price, tax) {
  const dpp = Math.round(price / (1 + tax));
  const ppn = price - dpp;

  return { ppn, dpp };
}

export function calculateDiscount(type, value, totalPrice) {
  const discount = currencyToNum(value, { failToZero: true });

  if (type === 'value') {
    return discount;
  }

  return (discount / 100) * totalPrice;
}
