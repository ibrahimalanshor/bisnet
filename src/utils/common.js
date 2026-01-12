import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(localizedFormat);

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
