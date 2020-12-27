import Timestamp from "components/Timestamp";
import React from "react";
import { Position } from "statistics/Position";
import DataTable from "./DataTable";

interface DataTableContainerProps {
  positions: Array<Position>;
}

export function DataTableContainer(
  props: DataTableContainerProps
): JSX.Element {
  return (
    <div>
      <div className="bottom-container">
        <div className="history-container">
          <Timestamp />
          <DataTable positions={props.positions} />
        </div>
      </div>
    </div>
  );
}

export default DataTableContainer;
