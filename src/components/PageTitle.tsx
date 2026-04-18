import styled from "styled-components";

const Wrapper = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`;

const Title = styled.h1`
  font-size: 22px;
  font-weight: 700;

  @media (min-width: 768px) {
    font-size: 26px;
  }
`;

const Info = styled.span`
  font-size: 14px;
  color: #3b82f6;
  cursor: pointer;
  position: relative;

  &:hover::after {
    content: "Tax-loss harvesting helps reduce your taxable capital gains by offsetting profits with losses.";
    
    position: absolute;
    top: 24px;
    left: 0;

    width: 260px;
    padding: 10px;

    background: ${({ theme }) => theme.card};
    color: ${({ theme }) => theme.text};

    border: 1px solid #e5e7eb;
    border-radius: 8px;

    font-size: 12px;
    line-height: 1.4;

    box-shadow: 0 6px 16px rgba(0,0,0,0.1);
  }
`;

export default function PageTitle() {
  return (
    <Wrapper>
      <Title>Tax Harvesting</Title>
      <Info>How it works?</Info>
    </Wrapper>
  );
}