export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function sample<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}
