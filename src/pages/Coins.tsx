import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { getCoinList } from "../api";
import { CoinData } from "../types/interface";
import Layout from "../components/Layout/Layout";
import Loader from "../components/Loader/Loader";
import CardSlide from "../components/CardSlide/CardSlide";
import CoinLogo from "../assets/images/coin.png";
import MoveToTopBtn from "../components/Buttons/MoveToTopBtn";
import DarkModeBtn from "../components/Buttons/DarkModeBtn";

function Coins() {
  const { isLoading, data } = useQuery<CoinData[]>({
    queryKey: ["allCoins"],
    queryFn: getCoinList,
    select: (data) => data.slice(0, 101),
  });

  return (
    <Layout title="Coin 101">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Header>
            <Logo src={CoinLogo} alt="코인" />
            <Title>Coin 101</Title>
            <DarkModeBtn width={40} fontSize={20} />
          </Header>
          <CardSlide />
          <CoinList>
            {data?.map((coin) => (
              <CoinCard key={coin.id}>
                <CoinLink to={`${coin.id}`} state={{ name: coin.name }}>
                  <Rank>{coin.rank}</Rank>
                  <Img
                    src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                  />
                  <NameAndSymbol>
                    <Name>{coin.name}</Name>
                    <Symbol>{coin.symbol}</Symbol>
                  </NameAndSymbol>
                  <Arrow icon={faChevronRight} />
                </CoinLink>
              </CoinCard>
            ))}
          </CoinList>
        </>
      )}

      <MoveToTopBtn />
    </Layout>
  );
}

export default Coins;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin: 48px 0 24px;

  @media screen and (max-width: 480px) {
    margin-top: 24px;
  }
`;

const Logo = styled.img`
  width: 40px;
  margin-right: 10px;
`;

const Title = styled.h1`
  flex: 1;
  font-size: 40px;
  font-weight: 700;
  color: ${({ theme }) => theme.accentColor};
`;

const CoinList = styled.ul`
  width: 100%;
  margin-bottom: 24px;
`;

const CoinCard = styled.li`
  width: 100%;
  margin-bottom: 12px;
  background-color: ${(props) => props.theme.coinBgColor};
  border-radius: 8px;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      transform: scale(1.05);
      opacity: 0.7;
      h2 {
        color: ${(props) => props.theme.accentColor};
      }
    }
  }
`;

const CoinLink = styled(Link)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 5px;
  padding: 24px 20px;
`;

const Rank = styled.div`
  width: 30px;
  text-align: center;
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.themeColor};
  margin-right: 15px;
`;

const Img = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 20px;
`;

const NameAndSymbol = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-right: 15px;
`;

const Name = styled.h2`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 5px;
`;

const Symbol = styled.span`
  font-size: 12px;
  color: ${(props) => props.theme.subTextColor};
`;

const Arrow = styled(FontAwesomeIcon)``;
