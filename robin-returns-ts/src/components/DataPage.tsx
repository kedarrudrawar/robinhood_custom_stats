import React, { useEffect, useState } from "react";

import { getAllServerData } from "../statistics/DAO/getAllServerData";
import { SymbolAndCurrentPrice } from "../statistics/DAO/getAllSymbolsAndCurrentPrices";
import { SERVER_DATA_1 } from "../statistics/fixtures/ServerDataFixtures";
import { STATS_SUMMARY_1 } from "../statistics/fixtures/StatsSummaryFixtures";
import { Position } from "../statistics/Position";
import { populateProfitsFromServerData } from "../statistics/processing/calculateProfits";
import { generateBasePositionsFromServerData } from "../statistics/processing/generateBasePositions";
import InstrumentMap, {
  instrumentMapToArray,
} from "../statistics/processing/instrumentMapping";
import { populateDividendsFromServerData } from "../statistics/processing/populateDividends";
import { RHDividend, RHOrder, RHPosition } from "../statistics/ResponseTypes";
import { TableColumn } from "./DataTable";
import DataTableContainer from "./DataTableContainer";
import { StatsSummary } from "./StatsSummary";

const DEBUG = false;

export interface ServerData {
  ordersArrays: InstrumentMap<Array<RHOrder>>;
  positions: InstrumentMap<RHPosition>;
  dividends: InstrumentMap<Array<RHDividend>>;
  symbolAndCurrentPrice: InstrumentMap<SymbolAndCurrentPrice>;
}

export interface StatsSummaryData {
  totalInvested: number;
  totalRealizedReturn: number;
  totalUnrealizedReturn: number;
  totalCash: number;
}

export function DataPage(): JSX.Element {
  const [hydratedPositions, setHydratedPositions] = useState<Array<Position>>(
    []
  );

  const [statsSummaryData, setStatsSummaryData] = useState<StatsSummaryData>(
    STATS_SUMMARY_1
  );

  const [serverData, setServerData] = useState<ServerData>({
    ordersArrays: {},
    positions: {},
    dividends: {},
    symbolAndCurrentPrice: {},
  });

  async function fetchAndSetServerData(
    options: { debug: boolean } = { debug: false }
  ): Promise<ServerData> {
    let data: ServerData;
    if (!options.debug) {
      data = await getAllServerData();
    } else {
      data = SERVER_DATA_1;
    }
    setServerData(data);
    return data;
  }

  // Fetch full positions and orders from server
  useEffect(() => {
    fetchAndSetServerData({ debug: DEBUG });
  }, []);

  useEffect(() => {
    const basePositions = generateBasePositionsFromServerData(serverData);

    const positionsWithProfits = populateProfitsFromServerData(
      serverData,
      basePositions
    );

    const allPositionsWithEarnings = populateDividendsFromServerData(
      serverData,
      positionsWithProfits
    );
    setHydratedPositions(instrumentMapToArray(allPositionsWithEarnings));
  }, [serverData]);

  useEffect(() => {
    const statsSummary: StatsSummaryData = {
      totalCash: 0,
      totalRealizedReturn: 0,
      totalUnrealizedReturn: 0,
      totalInvested: 0,
    };
    for (const position of hydratedPositions) {
      statsSummary.totalRealizedReturn +=
        position[TableColumn.REALIZED_PROFIT] ?? 0;
      statsSummary.totalUnrealizedReturn +=
        position[TableColumn.UNREALIZED_PROFIT] ?? 0;
      statsSummary.totalInvested +=
        position[TableColumn.QUANTITY] *
        (position[TableColumn.CURRENT_PRICE] ?? 0);
    }

    setStatsSummaryData(statsSummary);
  }, [hydratedPositions]);

  return (
    <div>
      <StatsSummary {...statsSummaryData} />
      <DataTableContainer positions={hydratedPositions} />
    </div>
  );
}
