import React from "react";
import { beautifyPrice } from "util/beautifyForRender";
import { StatsSummaryData } from "../DataPage";
import { StatsBoxCategory } from "./StatsBoxCategory";
import { StatsBoxReturns } from "./StatsBoxReturns";

export interface StatsBoxProps extends StatsSummaryData {}

export function StatsBox(props: StatsBoxProps) {
  const {
    totalInvested,
    totalRealizedReturn,
    totalUnrealizedReturn,
    totalCash,
    totalAccountValue,
  } = props;

  return (
    <div className="stats-box">
      <div className="stats-box-title text">Total Portfolio</div>
      <div className="stats-box-value condensed">
        {beautifyPrice(totalAccountValue)}
      </div>
      <div className={"stats-box-data-row"}>
        <StatsBoxCategory category={"Realized Return"} />
        <StatsBoxReturns returnsValue={totalRealizedReturn} />
      </div>
      <div className="stats-box-data-row">
        <StatsBoxCategory category={"Unrealized Return"} />
        <StatsBoxReturns returnsValue={totalUnrealizedReturn} />
      </div>
      <div className="stats-box-data-row">
        <StatsBoxCategory category={"Buying Power"} />
        <div className="data-row-value condensed">
          {beautifyPrice(totalCash)}
        </div>
      </div>
      <div className="stats-box-data-row">
        <StatsBoxCategory category={"Total Investment"} />
        <div className="data-row-value condensed">
          {beautifyPrice(totalInvested)}
        </div>
      </div>
    </div>
  );
}
