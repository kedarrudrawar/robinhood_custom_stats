import { beautifyPrice, beautifyReturns } from "./beautifyUtils";
import { StatsSummaryData } from "./DataPage";

export interface StatsBoxProps extends StatsSummaryData {}

export function StatsBox(props: StatsBoxProps) {
  const {
    totalInvested,
    totalRealizedReturn,
    totalUnrealizedReturn,
    totalCash,
  } = props;

  return (
    <div className="stats-box">
      <div className="stats-box-title text">Total Portfolio</div>
      <div className="stats-box-value condensed">
        {beautifyPrice(totalInvested + totalCash)}
      </div>
      <div className={"stats-box-data-row"}>
        <div className="data-row-categ text">Realized Return</div>
        <div
          className={`data-row-value condensed ${
            totalRealizedReturn > 0 ? "positive" : "negative"
          }`}
        >
          {beautifyReturns(totalRealizedReturn)}
        </div>
      </div>
      <div className="stats-box-data-row">
        <div className="data-row-categ text">Unrealized Return</div>
        <div
          className={`data-row-value condensed ${
            totalUnrealizedReturn > 0 ? "positive" : "negative"
          }`}
        >
          {beautifyReturns(totalUnrealizedReturn)}
        </div>
      </div>
      <div className="stats-box-data-row">
        <div className="data-row-categ text">Buying Power</div>
        <div className="data-row-value condensed">
          {beautifyPrice(totalCash)}
        </div>
      </div>
      <div className="stats-box-data-row">
        <div className="data-row-categ text">Total Investment</div>
        <div className="data-row-value condensed">
          {beautifyPrice(totalInvested)}
        </div>
      </div>
    </div>
  );
}
