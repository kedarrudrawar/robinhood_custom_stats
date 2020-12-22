import React, { useEffect, useState } from "react";
import { getAllCurrentPrices } from "./statistics/DAO/getAllCurrentPrices";
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
import InstrumentMap, {
  createInstrumentToArrayMapping,
  createInstrumentToItemMapping,
} from "./statistics/processing/instrumentMapping";
import { populateDividends } from "./statistics/processing/populateDividends";
import {
  BasePosition,
  generateBasePositions,
} from "./statistics/processing/generateBasePositions";
import { RHOrder, RHPosition, url } from "./statistics/ResponseTypes";

const ALL_POSITIONS_MAPPING: InstrumentMap<RHPosition> = {};
for (const position of FULL_POSITIONS_RESPONSE_1.results) {
  ALL_POSITIONS_MAPPING[position.instrument] = position;
}

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

  // const [hydratedPositions, setHydratedPosition] = useState<>();

  async function fetchAndSetPositionsFromServer(): Promise<void> {
    const positions = await getAllPositions();
    setPositionsFromServer(createInstrumentToItemMapping(positions));
  }

  async function fetchAndSetOrdersFromServer(): Promise<void> {
    const orders = await getAllOrders();
    const instrumentMapping = createInstrumentToArrayMapping<RHOrder>(orders);
    debugger;
    setOrdersFromServer(instrumentMapping);
  }

  async function fetchAndSetBasePositions(): Promise<void> {
    const basePositions = await generateBasePositions(positionsFromServer);
    setBasePositions(basePositions);
  }

  // Fetch full positions and orders from server
  useEffect(() => {
    // Fetch positions
    fetchAndSetPositionsFromServer();

    // Fetch orders
    fetchAndSetOrdersFromServer();
  }, []);

  // Fetch current prices and create base positions
  useEffect(() => {
    fetchAndSetBasePositions();
  }, [positionsFromServer]);

  // Calculate profits and dividends
  useEffect(() => {
    const basePositionsWithRealizedProfits = addRealizedProfits(
      ordersFromServer,
      basePositions
    );
    const positionsWithProfits = addUnrealizedProfits(
      positionsFromServer,
      basePositions
    );
    // const hydratedPositions = populateDividends(positionsWithProfits);
  }, [ordersFromServer]);

  return <DataTable positions={[POSITION, POSITION]} />;
}

export default DataTableContainer;
