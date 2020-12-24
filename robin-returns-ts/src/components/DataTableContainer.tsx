import React, { useEffect, useState } from "react";

import { getAllServerData } from "../statistics/DAO/getAllServerData";
import { SymbolAndCurrentPrice } from "../statistics/DAO/getAllSymbolsAndCurrentPrices";
import { Position } from "../statistics/Position";
import { populateProfitsFromServerData } from "../statistics/processing/calculateProfits";
import { generateBasePositionsFromServerData } from "../statistics/processing/generateBasePositions";
import InstrumentMap, {
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

  return <DataTable positions={hydratedPositions} />;
}

export default DataTableContainer;
