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
