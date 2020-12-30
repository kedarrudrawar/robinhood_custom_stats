import React, { useContext, useEffect, useState } from "react";

import { getAllServerData } from "statistics/DAO/getAllServerData";
import { SymbolAndCurrentPrice } from "statistics/DAO/getAllSymbolsAndCurrentPrices";
import { SERVER_DATA_1 } from "statistics/fixtures/ServerDataFixtures";
import { STATS_SUMMARY_1 } from "statistics/fixtures/StatsSummaryFixtures";
import { Position } from "statistics/Position";
import { populateProfitsFromServerData } from "statistics/processing/calculateProfits";
import { generateBasePositionsFromServerData } from "statistics/processing/generateBasePositions";
import InstrumentMap, {
  instrumentMapToArray,
} from "statistics/processing/instrumentMapping";
import { populateDividendsFromServerData } from "statistics/processing/populateDividends";
import removeWatchlistPositions from "statistics/processing/removeWatchlistPositions";
import {
  RHOrder,
  RHPosition,
  RHDividend,
} from "statistics/DAO/RHPortfolioDataResponseTypes";
import { TableColumn } from "./statistics/DataTable";
import LoadingLottie from "./LoadingLottie";
import { StatsHeader } from "./statistics/StatsHeader";
import DataTableContainer from "./statistics/DataTableContainer";
import { AuthContext } from "login/AuthContext";
import { RobinhoodBaseToken } from "DAOConstants";

const DEBUG = false;

export interface AccountInfo {
  portfolioCash: number;
  totalMarketValue: number;
}

export interface ServerData {
  ordersArrays: InstrumentMap<Array<RHOrder>>;
  positions: InstrumentMap<RHPosition>;
  dividends: InstrumentMap<Array<RHDividend>>;
  symbolAndCurrentPrice: InstrumentMap<SymbolAndCurrentPrice>;
  accountInfo: AccountInfo;
}

export interface StatsSummaryData {
  totalInvested: number;
  totalRealizedReturn: number;
  totalUnrealizedReturn: number;
  totalCash: number;
}

export function DataPage(): JSX.Element {
  const [loadingState, setLoadingState] = useState<boolean>(true);
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
    accountInfo: {
      totalMarketValue: 0,
      portfolioCash: 0,
    },
  });
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);

  const { token: TOKEN, logout } = useContext(AuthContext);

  async function fetchAndSetServerData(
    options: { debug: boolean; token: RobinhoodBaseToken | null } = {
      debug: true,
      token: null,
    }
  ): Promise<ServerData> {
    let data: ServerData;
    if (options.debug || options.token == null) {
      data = { ...SERVER_DATA_1 };
    } else {
      data = await getAllServerData(options.token);
    }
    setServerData(data);
    setUpdatedAt(new Date().toLocaleTimeString());
    return data;
  }

  // Fetch full positions and orders from server
  useEffect(() => {
    fetchAndSetServerData({ debug: DEBUG, token: TOKEN });
  }, [TOKEN]);

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

    const filteredPositions = removeWatchlistPositions(
      instrumentMapToArray(allPositionsWithEarnings)
    );

    setHydratedPositions(filteredPositions);

    const {
      portfolioCash: totalCash,
      totalMarketValue,
    } = serverData.accountInfo;
    const totalInvested = totalMarketValue + totalCash;

    let totalRealizedReturn = 0;
    let totalUnrealizedReturn = 0;

    for (const position of filteredPositions) {
      totalRealizedReturn += position[TableColumn.REALIZED_PROFIT] ?? 0;
      totalUnrealizedReturn += position[TableColumn.UNREALIZED_PROFIT] ?? 0;
    }

    setStatsSummaryData({
      totalCash,
      totalInvested,
      totalRealizedReturn,
      totalUnrealizedReturn,
    });

    // TODO kedar: figure out a better way to set loading
    if (filteredPositions.length > 0) {
      setLoadingState(false);
    }
  }, [serverData]);

  if (loadingState) {
    return <LoadingLottie />;
  }
  return (
    <div style={{ height: "100%" }}>
      <StatsHeader
        {...statsSummaryData}
        headerButtons={[
          {
            content: "Refresh",
            onClick: () => {
              setLoadingState(true);
              fetchAndSetServerData({ debug: DEBUG, token: TOKEN });
            },
          },
          { content: "Log out", onClick: logout },
        ]}
      />
      <DataTableContainer positions={hydratedPositions} updatedAt={updatedAt} />
    </div>
  );
}
