import styled from "styled-components";
import { Helmet } from "react-helmet-async";

interface LayoutProps {
  title: string;
  children: React.ReactNode;
}

const Layout = ({ title, children }: LayoutProps) => {
  return (
    <Container>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {children}
    </Container>
  );
};

export default Layout;

const Container = styled.div`
  position: relative;
  max-width: 480px;
  min-height: 100vh;
  margin: 0 auto;
  padding: 0 20px;
`;
