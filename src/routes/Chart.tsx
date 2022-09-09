import ApexCharts from "react-apexcharts";
import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";
import { fetchCoinHistory } from "../api";
import { Loader } from "./Coins";

interface ChartProps {
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

function Chart({ coinId }: ChartProps) {
  const isDark = useRecoilValue(isDarkAtom);
  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId), { refetchInterval: 10000 });
  return (
    <div>
      {isLoading ? (
        <Loader>
          <img src={process.env.PUBLIC_URL + "/assets/clock.gif"} alt="Loading clock" />
        </Loader>
      ) : (
        <ApexCharts
          type="candlestick"
          series={[
            {
              data:
                data?.map((price) => ({
                  x: new Date(price.time_close * 1000),
                  y: [price.open, price.high, price.low, price.close],
                })) ?? [],
            },
          ]}
          options={{
            chart: {
              type: "candlestick",
              width: 500,
              height: 350,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            theme: {
              mode: isDark ? "dark" : "light",
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
              categories: data?.map((price) => new Date(price.time_close * 1000)),
              labels: {
                format: "M/d",
                style: {
                  colors: "#9c88ff",
                },
              },
            },
            plotOptions: {
              candlestick: {
                colors: {
                  upward: "#f23d3d",
                  downward: "#13bf36",
                },
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
