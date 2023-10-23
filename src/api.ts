const BASE_URL = `https://api.coinpaprika.com/v1`;

export async function getCoins() {
  return await fetch(`${BASE_URL}/coins`).then((res) => res.json());
}

export async function getCoinPrice(coinId: string) {
  return await fetch(`${BASE_URL}/tickers/${coinId}`).then((res) => res.json());
}

export async function getCoinHistory(coinId: string) {
  const endDate = Math.floor(Date.now() / 1000);

  const MILLISECONDS_FOR_TWO_WEEKS = 60 * 60 * 24 * 7 * 2;
  const startDate = endDate - MILLISECONDS_FOR_TWO_WEEKS;

  return await fetch(
    `https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}&start=${startDate}&end=${endDate}`
  ).then((res) => res.json());
}
