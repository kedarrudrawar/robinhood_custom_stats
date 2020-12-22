import axios from "axios";
import { RHOrder, url, Response } from "../ResponseTypes";
import { ORDERS_URL } from "./urls";
import extractAllResults from "./extractAllResults";

export default async function getAllOrders(): Promise<Array<RHOrder>> {
  return await extractAllResults<RHOrder>(ORDERS_URL, true);
}
