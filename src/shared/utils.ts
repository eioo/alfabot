export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function sample<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

export function chunk<T>(arr: T[], size: number): T[][] {
  return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  );
}

export function getBetween(text: string, start: string, end: string) {
  try {
    return text.split(start)[1].split(end)[0];
  } catch {
    return;
  }
}
