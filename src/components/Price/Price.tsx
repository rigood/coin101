import styled from "styled-components";
import { PriceData } from "../../types/interface";
import PercentItem from "./PercentItem";
import PriceItem from "./PriceItem";

interface PriceProps {
  data: PriceData;
}

function Price({ data }: PriceProps) {
  const quotesUSD = data.quotes.USD;

  return (
    <Container>
      <PriceItem
        name="All Time High"
        desc={"(" + quotesUSD.ath_date.slice(0, 10).replaceAll("-", ". ") + ")"}
        value={"$" + quotesUSD.ath_price.toFixed(3)}
      />
      <PercentItem name="From ATH" value={quotesUSD.percent_from_price_ath} />
      <PercentItem name="15 minutes" value={quotesUSD.percent_change_15m} />
      <PercentItem name="30 Minutes" value={quotesUSD.percent_change_30m} />
      <PercentItem name="1 Hour" value={quotesUSD.percent_change_1h} />
      <PercentItem name="6 Hours" value={quotesUSD.percent_change_6h} />
      <PercentItem name="12 Hours" value={quotesUSD.percent_change_12h} />
      <PercentItem name="24 Hours" value={quotesUSD.percent_change_24h} />
      <PercentItem name="7 Days" value={quotesUSD.percent_change_7d} />
      <PercentItem name="30 Days" value={quotesUSD.percent_change_30d} />
      <PercentItem name="1 Year" value={quotesUSD.percent_change_1y} />
    </Container>
  );
}

export default Price;

const Container = styled.ul`
  display: flex;
  flex-direction: column;
  margin: 20px 0;
  padding: 10px 4px;
  background-color: ${(props) => props.theme.coinBgColor};
  border-radius: 8px;
`;
