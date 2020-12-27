import { ORDERS_URL } from "./urls";
import extractAllResults from "./extractAllResults";
import { RHOrder } from "statistics/ResponseTypes";

export default async function getAllOrders(): Promise<Array<RHOrder>> {
  return await extractAllResults<RHOrder>(ORDERS_URL, true);
}
