import { TableColumn } from "../components/DataTable";
import { url } from "./ResponseTypes";

export type PositionValue = string | number;

export type Position = {
  [fieldName in TableColumn]: PositionValue;
} & {
  instrument: url;
};
