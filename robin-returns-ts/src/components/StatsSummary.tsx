import { StatsSummaryData } from "./DataPage";
import { StatsBox, StatsBoxProps } from "./StatsBox";

interface StatsSummaryProps extends StatsSummaryData {}

export function StatsSummary(props: StatsSummaryProps) {
  return (
    <div className="stats-header">
      <StatsBox {...props} />
    </div>
  );
}
