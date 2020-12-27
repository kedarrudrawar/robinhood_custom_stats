import React from "react";
import { StatsSummaryData } from "./DataPage";
import { StatsSummary } from "./StatsSummary";

export interface StatsHeaderProps extends StatsSummaryData {
  headerButtons: Array<{ onClick: () => any; content: string }>;
}

export function StatsHeader(props: StatsHeaderProps): JSX.Element {
  const { headerButtons, ...statsSummaryData } = props;

  return (
    <div className="header">
      <StatsSummary {...statsSummaryData} />
      <div className="header-btns">
        {headerButtons.map((btn) => {
          return (
            <button className="text header-btn" onClick={btn.onClick}>
              {btn.content}
            </button>
          );
        })}
      </div>
    </div>
  );
}
