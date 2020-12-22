import React, { useEffect, useState } from "react";
import getAllOrders from "./statistics/DAO/getAllOrders";
import getAllPositions from "./statistics/DAO/getAllPositions";

import DataTable from "./statistics/DataTable";
import {
  FULL_POSITIONS_RESPONSE_1,
  POSITION,
} from "./statistics/fixtures/PositionsFixtures";
import {
  addRealizedProfits,
  addUnrealizedProfits,
} from "./statistics/processing/calculateProfits";
import InstrumentMap from "./statistics/processing/instrumentMapping";
import {
  BasePosition,
  convertToBasePositions,
} from "./statistics/processing/processPositions";
import {
  RHOrder,
  RHOrdersResponse,
  RHPosition,
  RHPositionsResponse,
} from "./statistics/ResponseTypes";

const ALL_POSITIONS_MAPPING: InstrumentMap<RHPosition> = {};
for (const position of FULL_POSITIONS_RESPONSE_1.results) {
  ALL_POSITIONS_MAPPING[position.instrument] = position;
}

function DataTableContainer(): JSX.Element {
  const [ordersFromServer, setOrdersFromServer] = useState<Array<RHOrder>>([]);

  const [positionsFromServer, setPositionsFromServer] = useState<
    Array<RHPosition>
  >([]);

  const [basePositions, setBasePositions] = useState<Array<BasePosition>>([]);

  const [currentPrices, setCurrentPrices] = useState<InstrumentMap<number>>({});

  async function fetchAndSetPositions(): Promise<Array<RHPosition>> {
    const positions = await getAllPositions();
    setPositionsFromServer(positions);
    return positions;
  }

  async function fetchAndSetOrders(): Promise<Array<RHOrder>> {
    const orders = await getAllOrders();
    setOrdersFromServer(orders);
    return orders;
  }

  // Fetch server data
  useEffect(() => {
    // TODO kedar: cache previous

    // Fetch positions
    fetchAndSetPositions();

    // Fetch orders
    fetchAndSetOrders();
  }, [fetchAndSetPositions, fetchAndSetOrders]);

  // Process positions and orders
  useEffect(() => {
    const basePositions = convertToBasePositions(positionsFromServer);
    setBasePositions(basePositions);

    const basePositionsWithRealizedProfits = addRealizedProfits(
      ordersFromServer,
      basePositions
    );
    // const positionsWithProfits = addUnrealizedProfits();
  }, [positionsFromServer]);

  // Process orders
  useEffect(() => {}, [ordersFromServer]);

  return <DataTable positions={[POSITION, POSITION]} />;
}

export default DataTableContainer;
