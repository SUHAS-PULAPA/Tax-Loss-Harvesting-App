import styled from "styled-components";
import { calculateRealised } from "../utils/calculations";

const Card1 = styled.div<{ $blue?: boolean }>`
  background: #ffffff;
  color: #000000;
  padding: 20px;
  border-radius: 16px;
  flex: 1;
  box-shadow: 0 8px 20px rgba(0,0,0,0.08);
`;

const Title = styled.h3`
  margin-bottom: 16px;
`;

const Table = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  row-gap: 10px;
  font-size: 14px;
`;

const Header = styled.div`
  opacity: 0.7;
  font-size: 12px;
`;

const Divider = styled.div`
  height: 1px;
  background: rgba(255,255,255,0.2);
  margin: 10px 0;
`;

const Bold = styled.div`
  font-weight: bold;
`;

const Footer = styled.div`
  margin-top: 12px;
`;

const Save = styled.div`
  color: #bbf7d0;
  margin-top: 6px;
  font-size: 13px;
`;

const format = (v: number) => {
  const val = Number(v.toFixed(2));
  if (val === 0) return "$0.00";
  return `${val > 0 ? "+" : "-"} $${Math.abs(val).toFixed(2)}`;
};

export default function CapitalCard({
  data,
  title,
  $blue,
  preValue,
}: any) {
  const stProfit = data.stcg.profits;
  const stLoss = data.stcg.losses;

  const ltProfit = data.ltcg.profits;
  const ltLoss = data.ltcg.losses;

  const stNet = stProfit - stLoss;
  const ltNet = ltProfit - ltLoss;

  const total = calculateRealised(data);

  const saved = preValue ? preValue - total : 0;

  return (
    <Card1 $blue={$blue}>
      <Title>{title}</Title>

      <Table>
        <div></div>
        <Header>Short-term</Header>
        <Header>Long-term</Header>

        <div>Profits</div>
        <div>{format(stProfit)}</div>
        <div>{format(ltProfit)}</div>

        <div>Losses</div>
        <div>{format(-stLoss)}</div>
        <div>{format(-ltLoss)}</div>
      </Table>

      <Divider />

      <Table>
        <div>Net Capital Gains</div>
        <Bold>{format(stNet)}</Bold>
        <Bold>{format(ltNet)}</Bold>
      </Table>

      <Footer>
        <div>
          Effective Capital Gains: <b>{format(total)}</b>
        </div>

        {saved > 0 && (
          <Save>
            You are going to save upto {format(saved)}
          </Save>
        )}
      </Footer>
    </Card1>
  );
}