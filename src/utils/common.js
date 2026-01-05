export function sleep(ms = 1000) {
  return new Promise((res) => {
    setTimeout(() => res(true), ms);
  });
}
