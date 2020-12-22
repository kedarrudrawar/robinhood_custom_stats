import axios from "axios";
import { RHOrder, url, Response } from "../ResponseTypes";
import { v4 as uuidv4 } from "uuid";
import { ORDERS_URL } from "./urls";
import extractAllResults from "../processing/extractAllResults";

const CLIENT_ID = "c82SH0WZOsabOXGP2sxqcj34FxkvfnWRZBKlBjFS";

export default async function getAllOrders(): Promise<Response<RHOrder>> {
  const orders = await extractAllResults<RHOrder>(ORDERS_URL, true);
  debugger;
}
