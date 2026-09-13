export function JsonToCss(styles) {
  if (!styles) return '';
  const value = Object.entries(styles)
    .map(([property, value]) => `${property}: ${value}`)
    .join('; ');

  return `style="${value}"`;
}
