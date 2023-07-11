import styled from "styled-components";

interface PriceItemProps {
  name: string;
  desc?: string;
  value: number | string;
}

const PriceItem = ({ name, desc, value }: PriceItemProps) => {
  return (
    <Wrapper>
      <Name>{name}</Name>
      <Desc>{desc}</Desc>
      <Value>{value}</Value>
    </Wrapper>
  );
};

export default PriceItem;

const Wrapper = styled.li`
  display: flex;
  align-items: center;
  padding: 20px;
  font-weight: 600;
`;

const Name = styled.span``;

const Desc = styled.span`
  flex: 1;
  font-size: 13px;
  color: ${({ theme }) => theme.subTextColor};
  margin: 0 5px;
`;

const Value = styled.span``;
