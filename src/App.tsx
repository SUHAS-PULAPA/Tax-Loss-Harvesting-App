import { useEffect, useState } from "react";
import styled from "styled-components";

import Accordion from "./components/Accordion";
import CapitalCard from "./components/CapitalCard";
import HoldingsTable from "./components/HoldingsTable";
import PreCard from "./components/PreCard";
import { fetchHoldings, fetchCapitalGains } from "./services/api";
import { calculateRealised } from "./utils/calculations";

const Container = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: auto;
`;

const SearchInput = styled.input`
  margin-top: 20px;
  padding: 10px 14px;
  width: 100%;
  border-radius: 8px;
  border: 1px solid #e5e7eb;

  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #3b82f6;
  }
`;

const Toggle = styled.button`
  position: fixed;
  top: 20px;
  right: 20px;

  background: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text};

  border: 1px solid #e5e7eb;
  padding: 8px 14px;
  border-radius: 20px;

  cursor: pointer;
  font-size: 13px;
  font-weight: 500;

  box-shadow: 0 4px 10px rgba(0,0,0,0.08);

  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const CardsWrapper = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;

  /* Mobile */
  flex-direction: column;

  /* Tablet & Desktop */
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

export default function App({ dark, setDark }: any) {
  const [holdings, setHoldings] = useState<any[]>([]);
  const [cg, setCg] = useState<any>(null);
  const [selected, setSelected] = useState<string[]>([]);

  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    fetchHoldings().then((data) => setHoldings(data as any[]));
    fetchCapitalGains().then((data) => setCg(data as any));
  }, []);

  if (!cg) return <p>Loading...</p>;

  // let filtered = holdings.filter((i) =>
  //   i.coin.toLowerCase().includes(search.toLowerCase())
  // );

  let filtered = holdings.filter((i) => {
  if (!i || !i.coin) return false;

  return i.coin
    .toLowerCase()
    .includes(search.toLowerCase());
});

  if (sortKey) {
    filtered.sort((a, b) => {
      let A = a[sortKey] || a.stcg.gain;
      let B = b[sortKey] || b.stcg.gain;
      return sortOrder === "asc" ? A - B : B - A;
    });
  }
    const calculateAfter = () => {
  // if (!cg) return null;

  if (!cg) return <p>Loading...</p>;
  // safe deep copy
  const updated = {
    stcg: {
      profits: cg.stcg?.profits || 0,
      losses: cg.stcg?.losses || 0,
    },
    ltcg: {
      profits: cg.ltcg?.profits || 0,
      losses: cg.ltcg?.losses || 0,
    },
  };

  selected.forEach((coin: string) => {
    const item = holdings.find((h: any) => h.coin === coin);
    if (!item) return;

    const st = item.stcg?.gain ?? 0;
    const lt = item.ltcg?.gain ?? 0;

    // STCG
    if (st > 0) updated.stcg.profits += st;
    else updated.stcg.losses += Math.abs(st);

    // LTCG
    if (lt > 0) updated.ltcg.profits += lt;
    else updated.ltcg.losses += Math.abs(lt);
  });

  return updated;
};
const afterCg = calculateAfter();
  const pre = calculateRealised(cg);
  const post = calculateRealised(afterCg);

  return (
    <Container>
      <Toggle onClick={() => setDark(!dark)}>
  {dark ? "🌙 Dark" : "☀️ Light"}
</Toggle>

      <Accordion />

      <CardsWrapper>
        <PreCard data={cg} title="Pre Harvesting" />
        <CapitalCard
  data={afterCg}
  title="After Harvesting"
  $blue
  preValue={pre}
/>
      </CardsWrapper>
<br />
      {pre > post && <p>Save ₹{(pre - post).toFixed(2)}</p>}

      <SearchInput
  placeholder="Search assets..."
  onChange={(e) => setSearch(e.target.value)}
/>

      <HoldingsTable
        data={filtered}
        selected={selected}
        setSelected={setSelected}
        sortKey={sortKey}
        sortOrder={sortOrder}
        setSortKey={setSortKey}
        setSortOrder={setSortOrder}
      />
    </Container>
  );
}