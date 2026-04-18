import { useState } from "react";
import styled from "styled-components";
import { Info } from "lucide-react";

declare module "styled-components" {
  export interface DefaultTheme {
    card: string;
    bg: string;
  }
}

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Wrapper = styled.div`
  margin-top: 20px;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #e5e7eb;
`;

const Header = styled.div`
  padding: 14px 18px;
  background: ${({ theme }) => theme.card};
  cursor: pointer;
  font-weight: 600;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Content = styled.div`
  padding: 14px 18px;
  font-size: 13px;
  color: gray;
  background: ${({ theme }) => theme.bg};
  line-height: 1.6;
`;

export default function Accordion() {
  const [open, setOpen] = useState(false);

  return (
    <Wrapper>
      <Header onClick={() => setOpen(!open)}>
        <TitleWrapper>
          <Info size={16} color="#3b82f6" />
          Important Notes
        </TitleWrapper>
        <span>{open ? "▲" : "▼"}</span>
      </Header>

      {open && (
        <Content>
          <ul>
            <li>Tax harvesting helps reduce taxable capital gains.</li>
            <li>Select assets with losses to offset profits.</li>
            <li>Short-term gains are taxed higher than long-term.</li>
            <li>This is a simulation, not financial advice.</li>
          </ul>
        </Content>
      )}
    </Wrapper>
  );
}