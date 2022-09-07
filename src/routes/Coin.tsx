import { useParams, useLocation } from "react-router-dom";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { Route, Routes, Link, useMatch } from "react-router-dom";
import Chart from "./Chart";
import Price from "./Price";
import { useQuery } from "@tanstack/react-query";
import { fetchCoinInfo, fetchCoinTickers } from "../api";
import { Helmet } from "react-helmet";

const Container = styled.div``;

const Header = styled.header``;

const Title = styled.h1``;

const Loader = styled.span``;

const Overview = styled.div``;

const OverviewItem = styled.div``;

const Tabs = styled.div``;

const Tab = styled.span<{ isActive: boolean }>`
  color: ${(props) => (props.isActive ? props.theme.accentColor : props.theme.textColor)};
`;

interface LocationState {
  state: {
    name: string;
  };
}

interface IInfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface IPriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

function Coin() {
  const { coinId } = useParams();
  // const [loading, setLoading] = useState(true);
  const { state } = useLocation() as LocationState;
  // const [info, setInfo] = useState<IInfoData>();
  // const [priceInfo, setPriceInfo] = useState<IPriceData>();
  const chartMatch = useMatch("/:coinId/chart");
  const priceMatch = useMatch("/:coinId/price");
  // useEffect(() => {
  //   (async () => {
  //     const infoData = await (await fetch(`https://api.coinpaprika.com/v1/coins/${coinIdd}`)).json();
  //     const priceData = await (await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)).json();
  //     setInfo(infoData);
  //     setPriceInfo(priceData);
  //     setLoading(false);
  //   })();
  // }, [coinId]);
  const { isLoading: infoLoading, data: infoData } = useQuery<IInfoData>(["info", coinId], () => fetchCoinInfo(coinId!), { refetchInterval: 5000 });
  const { isLoading: tickersLoading, data: tickersData } = useQuery<IPriceData>(["tickers", coinId], () => fetchCoinTickers(coinId!));
  const loading = infoLoading || tickersLoading;
  return (
    <Container>
      <Helmet>
        <title>{state?.name ? state.name : loading ? "로딩중" : infoData?.name}</title>
      </Helmet>
      <Header>
        <Title>{state?.name ? state.name : loading ? "로딩중" : infoData?.name}</Title>
      </Header>
      {loading ? (
        <Loader>로딩중</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>랭킹 {infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>심볼 {infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>시세 {tickersData?.quotes.USD.price.toFixed(3)}</span>
            </OverviewItem>
            <OverviewItem>
              <span>설명 {infoData?.description}</span>
            </OverviewItem>
            <OverviewItem>
              <span>총공급가 {tickersData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>최대공급가 {tickersData?.max_supply}</span>
            </OverviewItem>
          </Overview>
          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to="chart">차트</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to="price">시세</Link>
            </Tab>
          </Tabs>
          <Routes>
            <Route path="chart" element={<Chart coinId={coinId!} />}></Route>
            <Route path="price" element={<Price />}></Route>
          </Routes>
        </>
      )}
    </Container>
  );
}

export default Coin;
