export function getISTDate() {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  return new Date(utc + 5.5 * 3600 * 1000);
}

export function getISTHour() {
  const d = getISTDate();
  return d.getHours() + d.getMinutes() / 60;
}

export function inWindow(startH, endH) {
  const h = getISTHour();
  return h >= startH && h < endH;
}

export function formatIST() {
  return getISTDate().toLocaleTimeString('en-IN', {
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true,
  });
}

export function fmtNum(n) {
  if (n >= 1e6) return (n / 1e6).toFixed(1) + 'M';
  if (n >= 1e3) return (n / 1e3).toFixed(0) + 'K';
  return String(n);
}

export function momGrowthIndexes(arr, threshold) {
  const result = [];
  for (let i = 1; i < arr.length; i++) {
    if ((arr[i] - arr[i - 1]) / arr[i - 1] > threshold) result.push(i);
  }
  return result;
}
