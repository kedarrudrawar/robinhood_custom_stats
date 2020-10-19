import React, { useEffect } from "react";
import * as dataAPI from "../../api/data";

async function generateEquityData(header: FullHeader, activeBool: boolean) {
  const pos = await dataAPI.getPositionsEquity(header, activeBool); // active equity positions
}

export function EquityData(props): JSX.Element {
  useEffect(() => {}, []);
  return <div />;
}
