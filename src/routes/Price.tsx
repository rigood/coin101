import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { fetchCoinTickers } from "../api";

const CoinPrice = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  padding: 10px 4px;
  border-radius: 8px;
  background-color: ${(props) => props.theme.coinBgColor};
`;

const CoinPriceItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  span {
    font-weight: 600;
    span {
      font-size: 13px;
      opacity: 0.5;
    }
  }
`;

const CoinPriceChange = styled.span<{ value: number }>`
  font-weight: 600;
  color: ${(props) => (props.value === 0 ? props.theme.textColor : props.value > 0 ? "#f23d3d" : "#13bf36")};
  &::before {
    content: "${(props) => (props.value === 0 ? "" : props.value > 0 ? "▲ " : "▼ ")}";
  }
`;

interface PriceProps {
  coinId: string;
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

function Price({ coinId }: PriceProps) {
  const { isLoading: tickersLoading, data: tickersData } = useQuery<IPriceData>(["tickers", coinId], () => fetchCoinTickers(coinId));
  return (
    <div>
      <CoinPrice>
        <CoinPriceItem>
          <span>
            All Time High <span>({tickersData?.quotes.USD.ath_date.slice(0, 10).replaceAll("-", ". ")})</span>
          </span>
          <span>${tickersData?.quotes.USD.ath_price.toFixed(3)}</span>
        </CoinPriceItem>
        <CoinPriceItem>
          <span>From ATH</span>
          <CoinPriceChange value={tickersData?.quotes.USD.percent_from_price_ath || 0}>{tickersData?.quotes.USD.percent_from_price_ath}%</CoinPriceChange>
        </CoinPriceItem>
        <CoinPriceItem>
          <span>15 minutes</span>
          <CoinPriceChange value={tickersData?.quotes.USD.percent_change_15m || 0}>{tickersData?.quotes.USD.percent_change_15m}%</CoinPriceChange>
        </CoinPriceItem>
        <CoinPriceItem>
          <span>30 Minutes</span>
          <CoinPriceChange value={tickersData?.quotes.USD.percent_change_30m || 0}>{tickersData?.quotes.USD.percent_change_30m}%</CoinPriceChange>
        </CoinPriceItem>
        <CoinPriceItem>
          <span>1 Hour</span>
          <CoinPriceChange value={tickersData?.quotes.USD.percent_change_1h || 0}>{tickersData?.quotes.USD.percent_change_1h}%</CoinPriceChange>
        </CoinPriceItem>
        <CoinPriceItem>
          <span>6 Hours</span>
          <CoinPriceChange value={tickersData?.quotes.USD.percent_change_6h || 0}>{tickersData?.quotes.USD.percent_change_6h}%</CoinPriceChange>
        </CoinPriceItem>
        <CoinPriceItem>
          <span>12 Hours</span>
          <CoinPriceChange value={tickersData?.quotes.USD.percent_change_12h || 0}>{tickersData?.quotes.USD.percent_change_12h}%</CoinPriceChange>
        </CoinPriceItem>
        <CoinPriceItem>
          <span>24 Hours</span>
          <CoinPriceChange value={tickersData?.quotes.USD.percent_change_24h || 0}>{tickersData?.quotes.USD.percent_change_24h}%</CoinPriceChange>
        </CoinPriceItem>
        <CoinPriceItem>
          <span>7 Days</span>
          <CoinPriceChange value={tickersData?.quotes.USD.percent_change_7d || 0}>{tickersData?.quotes.USD.percent_change_7d}%</CoinPriceChange>
        </CoinPriceItem>
        <CoinPriceItem>
          <span>30 Days</span>
          <CoinPriceChange value={tickersData?.quotes.USD.percent_change_30d || 0}>{tickersData?.quotes.USD.percent_change_30d}%</CoinPriceChange>
        </CoinPriceItem>
        <CoinPriceItem>
          <span>1 Year</span>
          <CoinPriceChange value={tickersData?.quotes.USD.percent_change_1y || 0}>{tickersData?.quotes.USD.percent_change_1y}%</CoinPriceChange>
        </CoinPriceItem>
      </CoinPrice>
    </div>
  );
}

export default Price;
