import styled from "styled-components";

import { useRecoilValue, useSetRecoilState } from "recoil";

import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import { Route, Routes, Link, useMatch } from "react-router-dom";
import { useParams, useLocation } from "react-router-dom";
import ReactTooltip from "react-tooltip";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faMoon, faSun, faCircleInfo } from "@fortawesome/free-solid-svg-icons";

import { isDarkAtom } from "../atoms";
import { Container, ThemeBtn, Loader } from "./Coins";
import Chart from "./Chart";
import Price from "./Price";
import { fetchCoinInfo, fetchCoinTickers } from "../api";

const Header = styled.header`
  display: flex;
  align-items: flex-end;
  height: 70px;
`;

const BackBtn = styled.button`
  margin-right: 15px;
  background-color: transparent;
  color: ${(props) => props.theme.textColor};
  font-size: 20px;
  line-height: 24px;
`;

const Title = styled.h2`
  font-size: 24px;
`;

const Img = styled.img`
  width: 48px;
  height: 48px;
  margin-right: 12px;
`;

const CoinName = styled.div`
  display: flex;
  align-items: flex-end;
  margin-top: 50px;
  margin-bottom: 40px;
  border-radius: 8px;
  h2 {
    margin-right: 10px;
    font-size: 40px;
    font-weight: bold;
    color: ${(props) => props.theme.accentColor};
  }
  span {
    margin-bottom: 6px;
    font-size: 16px;
    opacity: 0.8;
  }
`;

const CoinPrice = styled.h1`
  margin-bottom: 10px;
  font-size: 48px;
  font-weight: 600;
  letter-spacing: 2px;
`;

const CoinPriceChange = styled.h2<{ value: number }>`
  margin-bottom: 50px;
  font-size: 32px;
  font-weight: 600;
  color: ${(props) => (props.value === 0 ? props.theme.textColor : props.value > 0 ? "#f23d3d" : "#13bf36")};
  &::before {
    content: "${(props) => (props.value === 0 ? "" : props.value > 0 ? "▲ " : "▼ ")}";
    font-size: 24px;
  }
`;

const TabLayout = styled.span`
  display: inline-block;
  margin-bottom: 16px;
  font-size: 20px;
  font-weight: bold;
  color: ${(props) => props.theme.accentColor};
`;

const CoinRank = styled(TabLayout)``;

const CoinStatusContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin-bottom: 40px;
  padding: 15px 0px;
  border-radius: 8px;
  background-color: ${(props) => props.theme.coinBgColor};
`;

const CoinStatus = styled.div<{ border: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  border-right: ${(props) => (props.border ? "1px solid #c2c2c2" : null)};
  span:first-child {
    font-size: 14px;
    margin-bottom: 14px;
    color: #c2c5cc;
    letter-spacing: -0.3px;
    cursor: pointer;
    &:hover {
      color: ${(props) => props.theme.accentColor};
    }
  }
  span:last-child {
    font-size: 28px;
    font-weight: 600;
    letter-spacing: 2px;
  }
`;

const Tabs = styled.div`
  margin-bottom: 5px;
`;

const Tab = styled(TabLayout)<{ isActive: boolean }>`
  margin-right: 20px;
  padding-bottom: 5px;
  border-bottom: ${(props) => (props.isActive ? `5px solid ${props.theme.accentColor}` : "")};
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
  development_CoinStatus: string;
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
  const { state } = useLocation() as LocationState;

  const { isLoading: infoLoading, data: infoData } = useQuery<IInfoData>(["info", coinId], () => fetchCoinInfo(coinId!), { refetchInterval: 5000 });
  const { isLoading: tickersLoading, data: tickersData } = useQuery<IPriceData>(["tickers", coinId], () => fetchCoinTickers(coinId!));
  const loading = infoLoading || tickersLoading;

  const chartMatch = useMatch("/:coinId/chart");
  const priceMatch = useMatch("/:coinId/price");

  const isDark = useRecoilValue(isDarkAtom);
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom((prev) => !prev);

  return (
    <Container>
      <Helmet>
        <title>{state?.name ? `${state.name} | Nomad Coins` : loading ? "Loading..." : `${infoData?.name} | Nomad Coins`}</title>
      </Helmet>
      {isDark ? (
        <ThemeBtn onClick={toggleDarkAtom}>
          <FontAwesomeIcon icon={faSun} />
        </ThemeBtn>
      ) : (
        <ThemeBtn onClick={toggleDarkAtom}>
          <FontAwesomeIcon icon={faMoon} />
        </ThemeBtn>
      )}
      <Header>
        <BackBtn>
          <Link to="/">
            <FontAwesomeIcon icon={faChevronLeft} />
          </Link>
        </BackBtn>
        <Title>{state?.name ? state.name : loading ? "Loading..." : infoData?.name}</Title>
      </Header>
      {loading ? (
        <Loader>
          <img src={process.env.PUBLIC_URL + "/assets/clock.gif"} alt="Loading clock" />
        </Loader>
      ) : (
        <>
          <CoinName>
            <Img src={`https://coinicons-api.vercel.app/api/icon/${infoData?.symbol.toLowerCase()}`} />
            <h2>{infoData?.name}</h2>
            <span>{infoData?.symbol}</span>
          </CoinName>
          <CoinPrice>${tickersData?.quotes.USD.price.toFixed(3)}</CoinPrice>
          <CoinPriceChange value={tickersData?.quotes.USD.percent_change_24h || 0}>{tickersData?.quotes.USD.percent_change_24h}%</CoinPriceChange>
          <CoinRank>Rank # {infoData?.rank}</CoinRank>

          <CoinStatusContainer>
            <CoinStatus border={true}>
              <span data-tip="Current Price x Circulating Supply">
                Market Cap <FontAwesomeIcon icon={faCircleInfo} />
              </span>
              <span>{((tickersData?.quotes.USD.market_cap || 0) / 1000000000).toFixed(2)}B</span>
            </CoinStatus>
            <CoinStatus border={false}>
              <span data-tip="Total value of crypto traded in the past 24 hours">
                24H Volume <FontAwesomeIcon icon={faCircleInfo} />
              </span>
              <span>{((tickersData?.quotes.USD.volume_24h || 0) / 1000000000).toFixed(2)}B</span>
            </CoinStatus>
            <ReactTooltip place="bottom" effect="float" />
          </CoinStatusContainer>

          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to="chart">Chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to="price">Price</Link>
            </Tab>
          </Tabs>

          <Routes>
            <Route path="chart" element={<Chart coinId={coinId!} />}></Route>
            <Route path="price" element={<Price coinId={coinId!} />}></Route>
          </Routes>
        </>
      )}
    </Container>
  );
}

export default Coin;
