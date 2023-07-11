import styled from "styled-components";

interface PercentItemProps {
  name: string;
  value: number;
}

const PercentItem = ({ name, value }: PercentItemProps) => {
  return (
    <Wrapper>
      <Name>{name}</Name>
      <Value value={value}>{value}%</Value>
    </Wrapper>
  );
};

export default PercentItem;

const Wrapper = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  font-weight: 600;
`;

const Name = styled.span``;

const Value = styled.div<{ value: number }>`
  color: ${({ value, theme }) =>
    value === 0 ? theme.textColor : value > 0 ? "#f23d3d" : "#13bf36"};

  &::before {
    content: "${({ value }) => (value === 0 ? "" : value > 0 ? "▲ " : "▼ ")}";
  }
`;
