import React, { useCallback, useEffect, useState } from "react";
import { filter } from "underscore";

import getAllOrders from "../statistics/DAO/getAllOrders";
import getAllPositions from "../statistics/DAO/getAllPositions";
import { UserFriendlyPosition } from "../statistics/Position";
import {
  addRealizedProfits,
  addUnrealizedProfits,
} from "../statistics/processing/calculateProfits";
import {
  BasePosition,
  generateBasePositions,
} from "../statistics/processing/generateBasePositions";
import InstrumentMap, {
  createInstrumentToArrayMapping,
  createInstrumentToItemMapping,
  instrumentMapToArray,
} from "../statistics/processing/instrumentMapping";
import { populateDividends } from "../statistics/processing/populateDividends";
import removeWatchlistPositions from "../statistics/processing/removeWatchlistPositions";
import { RHOrder, RHPosition } from "../statistics/ResponseTypes";
import beautifyPositions from "./beautifyPositions";
import DataTable from "./DataTable";

function DataTableContainer(): JSX.Element {
  const [ordersFromServer, setOrdersFromServer] = useState<
    InstrumentMap<Array<RHOrder>>
  >({});

  const [positionsFromServer, setPositionsFromServer] = useState<
    InstrumentMap<RHPosition>
  >({});

  const [basePositions, setBasePositions] = useState<
    InstrumentMap<BasePosition>
  >({});

  // TODO kedar: Change back to regular position, and change how it's rendered in DataTable.tsx
  const [hydratedPositions, setHydratedPositions] = useState<
    Array<UserFriendlyPosition>
  >([]);

  async function fetchAndSetPositionsFromServer(): Promise<void> {
    const positions = await getAllPositions();
    setPositionsFromServer(createInstrumentToItemMapping(positions));
  }

  async function fetchAndSetOrdersFromServer(): Promise<void> {
    const orders = await getAllOrders();
    const instrumentMapping = createInstrumentToArrayMapping<RHOrder>(orders);
    setOrdersFromServer(instrumentMapping);
  }

  const fetchAndSetBasePositions = useCallback(
    async (positionsFromServer: InstrumentMap<RHPosition>): Promise<void> => {
      const basePositions = await generateBasePositions(positionsFromServer);
      setBasePositions(basePositions);
    },
    []
  );

  // Fetch full positions and orders from server
  useEffect(() => {
    fetchAndSetPositionsFromServer();
    fetchAndSetOrdersFromServer();
  }, []);

  // Fetch current prices and create base positions
  useEffect(() => {
    fetchAndSetBasePositions(positionsFromServer);
  }, [fetchAndSetBasePositions, positionsFromServer]);

  // Calculate profits and dividends
  useEffect(() => {
    const basePositionsWithRealizedProfits = addRealizedProfits(
      ordersFromServer,
      basePositions
    );
    const positionsWithProfits = addUnrealizedProfits(
      positionsFromServer,
      basePositionsWithRealizedProfits
    );
    const allPositionsWithEarnings = populateDividends(positionsWithProfits);

    // Filter out watchlist positions
    const filteredPositions = removeWatchlistPositions(
      instrumentMapToArray(allPositionsWithEarnings)
    );

    // Convert position fields to user-friendly formats
    const hydratedPositions = beautifyPositions(filteredPositions);

    setHydratedPositions(hydratedPositions);
  }, [basePositions, ordersFromServer, positionsFromServer]);

  return <DataTable positions={hydratedPositions} />;
}

export default DataTableContainer;
