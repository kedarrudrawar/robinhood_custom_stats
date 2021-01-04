import { StatsSummaryData } from "components/DataPage";

export const ZERO_STATS_SUMMARY: StatsSummaryData = {
  totalCash: 0,
  totalRealizedReturn: 0,
  totalUnrealizedReturn: 0,
  totalInvested: 0,
  totalAccountValue: 0,
};

export const STATS_SUMMARY_1: StatsSummaryData = {
  totalCash: 1000,
  totalRealizedReturn: 1000,
  totalUnrealizedReturn: -1000,
  totalInvested: 5000,
  totalAccountValue: 6000,
};
