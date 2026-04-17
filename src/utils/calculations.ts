export const calculateRealised = (cg: any) =>
  cg.stcg.profits -
  cg.stcg.losses +
  (cg.ltcg.profits - cg.ltcg.losses);

export const updateAfterHarvesting = (
  base: any,
  selected: string[],
  holdings: any[]
) => {
  if (!base) return base;

  const updated = {
    stcg: {
      profits: base.stcg.profits,
      losses: base.stcg.losses,
    },
    ltcg: {
      profits: base.ltcg.profits,
      losses: base.ltcg.losses,
    },
  };

  selected.forEach((coin) => {
    const item = holdings.find((h) => h.coin === coin);
    if (!item) return;

    const st = item.stcg?.gain ?? 0;
    const lt = item.ltcg?.gain ?? 0;

    // SHORT TERM
    if (st >= 0) {
      updated.stcg.profits += st;
    } else {
      updated.stcg.losses += Math.abs(st);
    }

    // LONG TERM
    if (lt >= 0) {
      updated.ltcg.profits += lt;
    } else {
      updated.ltcg.losses += Math.abs(lt);
    }
  });

  return updated;
};