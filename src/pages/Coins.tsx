import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { getCoins } from "../api";
import Layout from "../components/layout/Layout";
import MoveToTopBtn from "../components/buttons/MoveToTopBtn";
import Loader from "../components/loader/Loader";
import { CoinData } from "../interface";
import Coin101Logo from "../assets/logo.png";
import CoinLogo from "../assets/coin.png";
import CardSlide from "../components/CardSlide/CardSlide";

function Coins() {
  const { isLoading, data } = useQuery<CoinData[]>(["allCoins"], getCoins);

  return (
    <Layout title="Coin 101">
      {isLoading ? (
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      ) : (
        <>
          <Header>
            <Logo src={CoinLogo} alt="코인" />
            <Title>Coin 101</Title>
          </Header>
          <CardSlide />
          <CoinList>
            {data?.slice(0, 101).map((coin) => (
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
  align-items: flex-end;
  margin: 48px 0 24px;
`;

export const LoaderWrapper = styled.div`
  min-height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.img`
  width: 40px;
  margin-right: 10px;
`;

const Title = styled.h1`
  font-size: 40px;
  font-weight: 700;
  color: ${({ theme }) => theme.accentColor};
`;

// const Logo = styled.img`
//   width: 200px;
//   margin-bottom: 24px;
//   user-select: none;
// `;

// const Title = styled.h1`
//   font-family: "OTWelcomeRA";
//   color: ${(props) => props.theme.themeColor};
//   text-align: center;
//   line-height: 1.2;
// `;

const CoinList = styled.ul`
  width: 100%;
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
