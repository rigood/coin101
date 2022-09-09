import styled, { keyframes } from "styled-components";

import { useRecoilValue, useSetRecoilState } from "recoil";

import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun, faChevronRight, faChevronUp } from "@fortawesome/free-solid-svg-icons";

import { isDarkAtom } from "../atoms";
import { fetchCoins } from "../api";
import CardSlide from "./CardSlide";

export const Container = styled.div`
  position: relative;
  max-width: 480px;
  margin: 0 auto;
  padding: 0 20px;
`;

export const Btn = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  color: ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.btnBgColor};
  font-size: 25px;
  &:hover {
    color: ${(props) => props.theme.accentColor};
    cursor: pointer;
  }
`;

export const ThemeBtn = styled(Btn)`
  position: fixed;
  top: 30px;
  right: 30px;
`;

export const TopBtn = styled(Btn)`
  position: fixed;
  bottom: 30px;
  right: 30px;
`;

const CoinBounce = keyframes`
  0% {
    opacity: 0;
    transform: translateX(200px) rotate(0);
  }
  60% {
    opacity: 1;
    transform: translateX(15px) rotateZ(-360deg);
  }
`;

export const Header = styled.header`
  overflow: hidden;
  display: flex;
  align-items: flex-end;
  height: 100px;
  margin-bottom: 24px;
  .nomadCoinsLogo {
    width: 40px;
    height: 40px;
    transform: translateX(15px) rotateZ(-360deg);
    animation: ${CoinBounce} 4s infinite ease-in-out;
  }
`;

export const Title = styled.h1`
  font-size: 40px;
  font-weight: bold;
  color: ${(props) => props.theme.accentColor};
`;

export const Loader = styled.div`
  margin-top: 60px;
  text-align: center;
  img {
    width: 100px;
    height: 100px;
  }
`;

const CoinList = styled.ul``;

const Coin = styled.li`
  margin-bottom: 12px;
  padding: 24px 20px;
  border-radius: 8px;
  background-color: ${(props) => props.theme.coinBgColor};
  transition: all 2.6s infinite ease-in-out;
  a {
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: all 0.2s ease-in-out;
    .leftRow {
      display: flex;
      align-items: center;
    }
  }
  &:hover {
    cursor: pointer;
    opacity: 0.7;
    transform: scale(1.05);
    h2 {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Rank = styled.div`
  width: 15px;
  margin-right: 15px;
  font-size: 15px;
  font-weight: bold;
`;

const Img = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 20px;
`;

const NameSymbol = styled.div`
  display: flex;
  flex-direction: column;
  h2 {
    margin-bottom: 5px;
    font-size: 18px;
    font-weight: bold;
  }
  span {
    font-size: 12px;
    opacity: 0.8;
  }
`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  const { isLoading, data } = useQuery<ICoin[]>(["allCoins"], fetchCoins);

  const isDark = useRecoilValue(isDarkAtom);
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom((prev) => !prev);

  const moveToTop = () => (document.documentElement.scrollTop = 0);

  return (
    <Container>
      <Helmet>
        <title>Coins | Nomad Coins</title>
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
        <Title>Nomad Coins</Title>
        <img className="nomadCoinsLogo" src="/coin-favicon64.png" alt="logo" />
      </Header>
      {isLoading ? (
        <Loader>
          <img src="/clock.gif" alt="Loading clock" />
        </Loader>
      ) : (
        <>
          <CardSlide />
          <CoinList>
            {data?.slice(0, 100).map((coin) => (
              <Coin key={coin.id}>
                <Link to={`${coin.id}`} state={{ name: coin.name }}>
                  <div className="leftRow">
                    <Rank>{coin.rank}</Rank>
                    <Img src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} />
                    <NameSymbol>
                      <h2>{coin.name}</h2>
                      <span>{coin.symbol}</span>
                    </NameSymbol>
                  </div>
                  <div className="rightRow">
                    <FontAwesomeIcon icon={faChevronRight} />
                  </div>
                </Link>
              </Coin>
            ))}
          </CoinList>
        </>
      )}
      <TopBtn onClick={moveToTop}>
        <FontAwesomeIcon icon={faChevronUp} />
      </TopBtn>
    </Container>
  );
}

export default Coins;
