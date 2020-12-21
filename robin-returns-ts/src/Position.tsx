import { TableColumn } from "./statistics/DataTable";
import { SIMPLE_POSITIONS_RESPONSE } from "./statistics/PositionsFixtures";
import { url } from "./statistics/ResponseTypes";

export type PositionValue = string | number;

export type Position = {
  [fieldName in TableColumn]: PositionValue;
} & {
  instrument: url;
};
