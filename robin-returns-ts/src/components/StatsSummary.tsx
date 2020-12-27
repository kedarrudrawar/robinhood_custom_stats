import _ from "underscore";
import { StatsSummaryData } from "./DataPage";
import { StatsBox } from "./StatsBox";

interface StatsSummaryProps extends StatsSummaryData {}

export function StatsSummary(props: StatsSummaryProps) {
  return <StatsBox {...props} />;
}
