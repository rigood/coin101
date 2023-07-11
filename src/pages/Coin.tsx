import { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import ReactTooltip from "react-tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { getCoinHistory, getCoinPrice } from "../api";
import { ChartData, PriceData } from "../interface";
import { getImg } from "../utils";
import Layout from "../components/layout/Layout";
import Loader from "../components/loader/Loader";
import MoveBackBtn from "../components/buttons/MoveBackBtn";
import Chart from "../components/Chart/Chart";
import NoChart from "../components/Chart/NoChart";
import Price from "../components/Price/Price";
import { LoaderWrapper } from "./Coins";

interface LocationState {
  state: {
    name: string;
  };
}

function Coin() {
  const { coinId } = useParams();
  const { state } = useLocation() as LocationState;

  const [tab, setTab] = useState("chart");

  const { isLoading: priceLoading, data: priceData } = useQuery<PriceData>(
    ["tickers", coinId],
    () => getCoinPrice(coinId!)
  );

  const {
    isLoading: chartLoading,
    isError,
    data: chartData,
  } = useQuery<ChartData[]>({
    queryKey: ["chart", coinId],
    queryFn: () => getCoinHistory(coinId!),
    select: (data) => data.filter((_, index) => index > 5 && index < 20),
    retry: 1,
  });

  const isLoading = priceLoading || chartLoading;

  return (
    <Layout title={state?.name}>
      {isLoading ? (
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      ) : priceData ? (
        <>
          <Header>
            <MoveBackBtn />
            <Title>{priceData.symbol}</Title>
          </Header>
          <Info>
            <Img src={getImg(priceData.symbol)} />
            <Name>{priceData.name}</Name>
          </Info>
          <CurrentPrice>${priceData?.quotes.USD.price.toFixed(3)}</CurrentPrice>
          <PriceChange value={priceData?.quotes.USD.percent_change_24h!}>
            {priceData?.quotes.USD.percent_change_24h}%
          </PriceChange>

          <Rank>Rank # {priceData.rank}</Rank>
          <StatusContainer>
            <Status border>
              <StatusTitle data-tip="Current Price x Circulating Supply">
                Market Cap <FontAwesomeIcon icon={faCircleInfo} />
              </StatusTitle>
              <StatusContent>
                {(priceData?.quotes.USD.market_cap! / 1000000000).toFixed(2)}B
              </StatusContent>
            </Status>
            <Status>
              <StatusTitle data-tip="Total value of crypto traded in the past 24 hours">
                24H Volume <FontAwesomeIcon icon={faCircleInfo} />
              </StatusTitle>
              <StatusContent>
                {(priceData?.quotes.USD.volume_24h! / 1000000000).toFixed(2)}B
              </StatusContent>
            </Status>
            <ReactTooltip place="bottom" effect="float" />
          </StatusContainer>

          <Tabs>
            <Tab isActive={tab === "chart"} onClick={() => setTab("chart")}>
              Chart
            </Tab>
            <Tab isActive={tab === "price"} onClick={() => setTab("price")}>
              Price
            </Tab>
          </Tabs>
          {tab === "chart" && isError && <NoChart />}
          {tab === "chart" && !isError && <Chart data={chartData!} />}
          {tab === "price" && <Price data={priceData} />}
        </>
      ) : null}
    </Layout>
  );
}

export default Coin;

const Header = styled.header`
  display: flex;
  align-items: flex-end;
  margin: 48px 0;
`;

const Title = styled.div`
  margin-left: 10px;
  font-size: 24px;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
`;

const Img = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 12px;
`;

const Name = styled.h1`
  font-size: 40px;
  font-weight: 700;
  margin-right: 12px;
  color: ${(props) => props.theme.accentColor};
  word-break: break-all;
`;

const CurrentPrice = styled.h2`
  font-size: 48px;
  font-weight: 700;
  letter-spacing: 2px;
  margin-bottom: 12px;
`;

const PriceChange = styled.div<{ value: number }>`
  font-size: 32px;
  font-weight: 600;
  color: ${({ value, theme }) =>
    value === 0 ? theme.textColor : value > 0 ? "#f23d3d" : "#13bf36"};
  margin-bottom: 48px;

  &::before {
    font-size: 24px;
    content: "${({ value }) => (value === 0 ? "" : value > 0 ? "▲ " : "▼ ")}";
  }
`;

const Rank = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: ${(props) => props.theme.accentColor};
  margin-bottom: 12px;
`;

const StatusContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-bottom: 48px;
  padding: 24px;
  border-radius: 8px;
  background-color: ${(props) => props.theme.coinBgColor};
`;

const Status = styled.div<{ border?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-right: ${(props) => props.border && "1px solid #c2c2c2"};
`;

const StatusTitle = styled.div`
  font-size: 14px;
  color: ${(props) => props.theme.subTextColor};
  letter-spacing: -0.3px;
  margin-bottom: 14px;
  cursor: pointer;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const StatusContent = styled.div`
  font-size: 28px;
  font-weight: 600;
  letter-spacing: 2px;
`;

const Tabs = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const Tab = styled.span<{ isActive: boolean }>`
  padding-bottom: 5px;
  border-bottom: ${({ isActive, theme }) =>
    isActive ? `5px solid ${theme.accentColor}` : ""};
  font-size: 20px;
  font-weight: 600;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  cursor: pointer;
`;
