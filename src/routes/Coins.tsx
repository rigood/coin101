import styled from "styled-components";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Container = styled.div``;

const Header = styled.header``;

const Title = styled.h1``;

const CoinList = styled.ul``;

const Loader = styled.span``;

const Coin = styled.li``;

const Img = styled.img``;

interface CoinInterface {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  const [coins, setCoins] = useState<CoinInterface[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const response = await fetch("https://api.coinpaprika.com/v1/coins");
      const json = await response.json();
      setCoins(json.slice(0, 100));
      setLoading(false);
    })();
  }, []);
  return (
    <Container>
      <Header>
        <Title>코인</Title>
      </Header>
      {loading ? (
        <Loader>로딩중</Loader>
      ) : (
        <CoinList>
          {coins.map((coin) => (
            <Coin key={coin.id}>
              <Link to={`/${coin.id}`}>
                <Img src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinList>
      )}
    </Container>
  );
}

export default Coins;
