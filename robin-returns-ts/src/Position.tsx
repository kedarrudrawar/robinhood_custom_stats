import { TableColumn } from "./statistics/DataTable";
import { url } from "./statistics/ResponseTypes";

export type PositionValue = string | number;

export type Position = {
  [fieldName in TableColumn]: PositionValue;
} & {
  instrument: url;
};
