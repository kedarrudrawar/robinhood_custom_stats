import React, { useCallback, useEffect, useState } from "react";

import getAllOrders from "../statistics/DAO/getAllOrders";
import getAllPositions from "../statistics/DAO/getAllPositions";
import { Position } from "../statistics/Position";
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

  const [hydratedPositions, setHydratedPositions] = useState<Array<Position>>(
    []
  );

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
    const hydratedPositions = removeWatchlistPositions(
      instrumentMapToArray(allPositionsWithEarnings)
    );

    setHydratedPositions(hydratedPositions);
  }, [basePositions, ordersFromServer, positionsFromServer]);

  return <DataTable positions={hydratedPositions} />;
}

export default DataTableContainer;
