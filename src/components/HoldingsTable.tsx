import styled from "styled-components";
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const Th = styled.th`
  text-align: left;
  padding: 12px;
  font-size: 14px;
  color: gray;
  border-bottom: 1px solid #e5e7eb;
  cursor: pointer;
`;

const Td = styled.td`
  padding: 14px 12px;
  border-bottom: 1px solid #f1f5f9;
`;

const Tr = styled.tr`
  &:hover {
    background: #f8fafc;
  }
`;

const AssetCell = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  img {
    width: 28px;
    height: 28px;
    border-radius: 50%;
  }

  p {
    font-size: 12px;
    color: gray;
    margin: 0;
  }
`;
const Gain = styled.div<{ $positive: boolean }>`
  color: ${({ $positive }) => ($positive ? "#16a34a" : "#dc2626")};
  font-weight: 500;

  span {
    display: block;
    font-size: 12px;
    color: gray;
  }
`;
const formatCurrency = (value: number) => {
  const rounded = Number(value.toFixed(2));

  if (rounded === 0) return "$0.00";

  const sign = rounded > 0 ? "+" : "-";

  return `${sign} $${Math.abs(rounded).toFixed(2)}`;
};
const Tooltip = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;

  &:hover span {
    visibility: visible;
    opacity: 1;
  }
`;

const TooltipText = styled.span`
  visibility: hidden;
  opacity: 0;
  transition: 0.2s ease-in-out;

  position: absolute;
  bottom: 125%;
  left: 50%;
  transform: translateX(-50%);

  background-color: #111827;
  color: #ffffff;
  padding: 6px 8px;
  border-radius: 6px;
  font-size: 11px;
  white-space: nowrap;
  z-index: 10;
`;
export default function HoldingsTable({
  data,
  selected,
  setSelected,
  setSortKey,
  sortKey,
  sortOrder,
  setSortOrder,
}: any) {
  const toggle = (coin: string) => {
    selected.includes(coin)
        ? setSelected(selected.filter((i: string) => i !== coin))
        : setSelected([...selected, coin]);
    };

  const sort = (key: string) => {
    if (sortKey === key)
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  return (
    <Table>
      {/* <thead>
        <tr>
          <Th></Th>
          <Th onClick={() => sort("coin")}>Asset</Th>
          <Th onClick={() => sort("price")}>Price</Th>
          <Th onClick={() => sort("stcg")}>ST</Th>
          <Th onClick={() => sort("ltcg")}>LT</Th>
        </tr>
      </thead> */}
      <thead>
        <Tr>
            <Th></Th>
            <Th onClick={() => sort("coin")}>Asset</Th>
            <Th>Holdings</Th>
            <Th>Current Price</Th>
            <Th>Short-Term</Th>
            <Th>Long-Term</Th>
            <Th>Amount to Sell</Th>
        </Tr>
        </thead>

      <tbody>
        {data.map((item: any, idx: number) => (
          <Tr key={idx}>
            <Td>
            <input
                type="checkbox"
                checked={selected.includes(item.coin)}
                onChange={() => toggle(item.coin)}
            />
            </Td>
            <Td onClick={() => sort("coin")}>
            <AssetCell>
                <img src={item.logo} alt={item.coin} />
                <div>
                <strong>{item.coinName}</strong>
                <p>{item.coin}</p>
                </div>
            </AssetCell>
            </Td>
            <Td>
            {item.totalHolding.toFixed(4)}
            {/* {formatCurrency(item.totalHolding)} */}
            <br />
            <small>{item.averageBuyPrice.toFixed(2)}/{item.coin}</small>
            </Td>
            <Td>{item.currentPrice.toLocaleString()}</Td>
            <Td>
            <Gain $positive={item.stcg.gain >= 0}>
                {/* ₹{formatCurrency(item.stcg.gain)} */}
                <Tooltip>
                {formatCurrency(item.stcg.gain)}
                <TooltipText>{item.stcg.gain}</TooltipText>
                </Tooltip>
                <span>{item.stcg.balance.toFixed(4)} {item.coin}</span>
            </Gain>
            </Td>
            <Td>
            <Gain $positive={item.ltcg.gain >= 0}>
                {/* ₹{formatCurrency(item.ltcg.gain)} */}
                <Tooltip>
                {formatCurrency(item.ltcg.gain)}
                <TooltipText>{item.ltcg.gain}</TooltipText>
                </Tooltip>
                <span>{item.ltcg.balance.toFixed(4)} {item.coin}</span>
            </Gain>
            </Td>
            <Td>
            {selected.includes(item.coin)
                ? `${item.totalHolding.toFixed(4)} ${item.coin}`
                : "-"}
            </Td>
          </Tr>
        ))}
      </tbody>
    </Table>
  );
}