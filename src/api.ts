const BASE_URL = `https://api.coinpaprika.com/v1`;

export async function getCoinList() {
  return await fetch(`${BASE_URL}/coins`).then((res) => res.json());
}

export async function getCoinPriceData(coinId: string) {
  return await fetch(`${BASE_URL}/tickers/${coinId}`).then((res) => res.json());
}

export async function getCoinChartData(coinId: string) {
  return await fetch(
    `https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`
  )
    .then((res) => res.json())
    .then((data) => {
      if ("error" in data) {
        throw new Error("no chart data");
      } else {
        return data;
      }
    });
}
