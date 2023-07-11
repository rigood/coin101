export function getImg(coinSymbol: string) {
  return `https://coinicons-api.vercel.app/api/icon/${coinSymbol.toLowerCase()}`;
}
