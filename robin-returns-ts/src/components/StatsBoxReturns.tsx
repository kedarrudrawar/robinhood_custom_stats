import { beautifyReturns } from "util/beautifyForRender";

export interface StatsBoxReturnsProps {
  returnsValue: number;
}

export function StatsBoxReturns(props: StatsBoxReturnsProps) {
  return (
    <div
      className={`data-row-value condensed ${
        props.returnsValue > 0 ? "positive" : "negative"
      }`}
    >
      {beautifyReturns(props.returnsValue)}
    </div>
  );
}
