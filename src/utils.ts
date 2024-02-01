export function isValue<T>(item: T | undefined | null): item is T {
  return !!item;
}

export function isKey<T extends object>(x: T, k: PropertyKey): k is keyof T {
  return k in x;
}

export function uuid() {
  return crypto.randomUUID();
}
export function toCapitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function formatSecondsAsTime(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secondsRemaining = seconds % 60;

  const formatter = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  const [h, m, s] = formatter
    .format(new Date(0, 0, 0, hours, minutes, secondsRemaining))
    .split(":");
  return `${h} ч. ${m} мин. ${s} сек.`;
}
