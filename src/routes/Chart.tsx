import { useQuery } from "@tanstack/react-query";
import { fetchCoinHistory } from "../api";
import ApexCharts from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";

interface ChartProops {
  coinId: string;
}

interface IHistorical {
  close: number;
  high: number;
  low: number;
  market_cap: number;
  open: number;
  time_close: number;
  time_open: number;
  volume: number;
}

function Chart({ coinId }: ChartProops) {
  const isDark = useRecoilValue(isDarkAtom);
  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId), { refetchInterval: 10000 });
  console.log(data);
  return (
    <div>
      {isLoading ? (
        "로딩중"
      ) : (
        <ApexCharts
          type="candlestick"
          series={[
            {
              data:
                data?.map((price) => ({
                  x: new Date(price.time_open * 1000),
                  y: [price.open, price.low, price.high, price.close],
                })) ?? [],
            },
          ]}
          options={{
            theme: {
              mode: "dark",
            },
            chart: {
              type: "candlestick",
              height: 350,
              width: 500,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            stroke: {
              curve: "smooth",
              width: 2,
            },
            yaxis: {
              show: false,
            },
            xaxis: {
              type: "datetime",
              categories: data?.map((price) => new Date(price.time_close * 1000).toISOString()),
              labels: {
                style: {
                  colors: "#9c88ff",
                },
              },
            },
            plotOptions: {
              candlestick: {
                colors: {
                  upward: "#3C90EB",
                  downward: "#DF7D46",
                },
              },
            },
          }}
          // type="line"
          // series={[
          //   {
          //     name: "Price",
          //     data: data?.map((price) => price.close) ?? [],
          //   },
          // ]}
          // options={{
          //   theme: {
          //     mode: "dark",
          //   },
          //   chart: {
          //     height: 300,
          //     width: 500,
          //     toolbar: {
          //       show: false,
          //     },
          //     background: "transparent",
          //   },
          //   grid: { show: false },
          //   stroke: {
          //     curve: "smooth",
          //     width: 4,
          //   },
          //   yaxis: {
          //     show: false,
          //   },
          //   xaxis: {
          //     axisBorder: { show: false },
          //     axisTicks: { show: false },
          //     labels: {
          //       show: false,
          //     },
          //     type: "datetime",
          //     categories: data?.map((price) => new Date(price.time_close * 1000).toISOString()),
          //   },
          //   fill: {
          //     type: "gradient",
          //     gradient: { gradientToColors: ["#0be881"], stops: [0, 100] },
          //   },
          //   colors: ["#0fbcf9"],
          //   tooltip: {
          //     y: {
          //       formatter: (value) => `$${value.toFixed(2)}`,
          //     },
          //   },
          // }}
        />
      )}
    </div>
  );
}

export default Chart;
