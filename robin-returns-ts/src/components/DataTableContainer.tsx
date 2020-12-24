import React, { useCallback, useEffect, useState } from "react";
import { server } from "sinon";

import getAllOrders from "../statistics/DAO/getAllOrders";
import getAllPositions from "../statistics/DAO/getAllPositions";
import { getAllServerData } from "../statistics/DAO/getAllServerData";
import { SymbolAndCurrentPrice } from "../statistics/DAO/getAllSymbolsAndCurrentPrices";
import { getPaidDividends } from "../statistics/DAO/getDividends";
import {
  POSITION,
  RH_POSITION_1,
} from "../statistics/fixtures/PositionsFixtures";
import { BasePosition, Position } from "../statistics/Position";
import {
  populateProfits,
  populateProfitsFromServerData,
} from "../statistics/processing/calculateProfits";
import {
  generateBasePositions,
  generateBasePositionsFromServerData,
} from "../statistics/processing/generateBasePositions";
import InstrumentMap, {
  createInstrumentToArrayMapping,
  createInstrumentToItemMapping,
  instrumentMapToArray,
} from "../statistics/processing/instrumentMapping";
import { populateDividendsFromServerData } from "../statistics/processing/populateDividends";
import { RHDividend, RHOrder, RHPosition } from "../statistics/ResponseTypes";
import DataTable from "./DataTable";

export interface ServerData {
  ordersArrays: InstrumentMap<Array<RHOrder>>;
  positions: InstrumentMap<RHPosition>;
  dividends: InstrumentMap<Array<RHDividend>>;
  symbolAndCurrentPrice: InstrumentMap<SymbolAndCurrentPrice>;
}

function DataTableContainer(): JSX.Element {
  const [hydratedPositions, setHydratedPositions] = useState<Array<Position>>(
    []
  );

  const [serverData, setServerData] = useState<ServerData>({
    ordersArrays: {},
    positions: {},
    dividends: {},
    symbolAndCurrentPrice: {},
  });

  async function fetchAndSetServerData(): Promise<ServerData> {
    const data = await getAllServerData();
    setServerData(data);
    return data;
  }

  // Fetch full positions and orders from server
  useEffect(() => {
    fetchAndSetServerData();
    // async function hydratePositions() {
    //   const serverData = await fetchAndSetServerData();
    //   const basePositions = generateBasePositionsFromServerData(serverData);

    //   const positionsWithProfits = populateProfitsFromServerData(
    //     serverData,
    //     basePositions
    //   );

    //   const allPositionsWithEarnings = populateDividendsFromServerData(
    //     serverData,
    //     positionsWithProfits
    //   );

    //   // Filter out watchlist positions
    //   const finalPositions = removeWatchlistPositions(
    //     instrumentMapToArray(allPositionsWithEarnings)
    //   );

    //   setHydratedPositions(finalPositions);
    // }

    // hydratePositions();
  }, []);

  useEffect(() => {
    // const basePositions = generateBasePositionsFromServerData(serverData);

    // const positionsWithProfits = populateProfitsFromServerData(
    //   serverData,
    //   basePositions
    // );

    // const allPositionsWithEarnings = populateDividendsFromServerData(
    //   serverData,
    //   positionsWithProfits
    // );

    // // Filter out watchlist positions
    // const finalPositions = removeWatchlistPositions(
    //   instrumentMapToArray(allPositionsWithEarnings)
    // );

    // fetchAndSetServerData().then((serverData) => {
    const basePositions = generateBasePositionsFromServerData(serverData);

    const positionsWithProfits = populateProfitsFromServerData(
      serverData,
      basePositions
    );

    const allPositionsWithEarnings = populateDividendsFromServerData(
      serverData,
      positionsWithProfits
    );

    // Filter out watchlist positions
    // const finalPositions = removeWatchlistPositions(
    //   instrumentMapToArray(allPositionsWithEarnings)
    // );
    setHydratedPositions(instrumentMapToArray(allPositionsWithEarnings));
    // });
  }, [serverData]);

  return <DataTable positions={hydratedPositions} />;
}

export default DataTableContainer;
