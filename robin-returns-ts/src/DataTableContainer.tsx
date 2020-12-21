import React, { useEffect, useState } from "react";
import DataTable from "./statistics/DataTable";
import { SIMPLE_ORDERS } from "./statistics/OrdersFixtures";
import {
  FULL_POSITIONS_RESPONSE_1,
  POSITION,
} from "./statistics/PositionsFixtures";
import InstrumentMap from "./statistics/processing/InterfaceMapping";
import { addRealizedProfits } from "./statistics/processing/processOrders";
import { processPositions } from "./statistics/processing/processPositions";
import {
  RHOrdersResponse,
  RHPosition,
  RHPositionsResponse,
} from "./statistics/ResponseTypes";

const ALL_POSITIONS_MAPPING: InstrumentMap<RHPosition> = {};
for (const position of FULL_POSITIONS_RESPONSE_1.results) {
  ALL_POSITIONS_MAPPING[position.instrument] = position;
}

function DataTableContainer(): JSX.Element {
  const [ordersFromServer, setOrdersFromServer] = useState<RHOrdersResponse>(
    SIMPLE_ORDERS
  );

  const [
    positionsFromServer,
    setPositionsFromServer,
  ] = useState<RHPositionsResponse>(FULL_POSITIONS_RESPONSE_1);

  useEffect(() => {
    // TODO kedar: cache previous
    const basePositions = processPositions(positionsFromServer);
    const positionsWithRealizedProfits = addRealizedProfits(
      ordersFromServer,
      basePositions
    );
    // const positionsWithProfits = addUnrealizedProfits(positionsFromServer, )
  }, [positionsFromServer, ordersFromServer]);

  return <DataTable positions={[POSITION, POSITION]} />;
}

export default DataTableContainer;
