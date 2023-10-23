import ApexCharts from "react-apexcharts";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../../atoms";
import { ChartData } from "../../types/interface";

interface ChartProps {
  data: ChartData[];
}

function Chart({ data }: ChartProps) {
  const isDark = useRecoilValue(isDarkAtom);

  return (
    <Wrapper>
      <ApexCharts
        type="candlestick"
        series={[
          {
            data:
              data?.map((item) => ({
                x: new Date(item.time_close * 1000),
                y: [item.open, item.high, item.low, item.close],
              })) ?? [],
          },
        ]}
        options={{
          chart: {
            type: "candlestick",
            toolbar: {
              show: false,
            },
            background: "transparent",
          },
          title: {
            text: "CandleStick for 2 weeks",
            align: "left",
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
            labels: {
              formatter: function (val) {
                const day = new Date(val);
                return `${day.getMonth() + 1}/${day.getDate()}`;
              },
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
    </Wrapper>
  );
}

export default Chart;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 30px 0;
`;
