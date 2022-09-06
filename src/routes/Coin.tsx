import { useParams, useLocation } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";

const Container = styled.div``;

const Header = styled.header``;

const Title = styled.h1``;

const Loader = styled.span``;

interface LocationState {
  state: {
    name: string;
  };
}

function Coin() {
  const coinId = useParams();
  const [loading, setLoading] = useState(true);
  const { state } = useLocation() as LocationState;
  return (
    <Container>
      <Header>
        <Title>{state?.name || "로딩중"}</Title>
      </Header>
      {loading ? <Loader>로딩중</Loader> : null}
    </Container>
  );
}

export default Coin;
