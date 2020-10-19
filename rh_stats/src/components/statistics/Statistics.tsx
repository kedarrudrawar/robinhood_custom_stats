import React, { useState, useEffect } from "react";
import "../../UI/css/Statistics.css";
import { ReactComponent as ArrowIcon } from "../../UI/images/arrow.svg";
import { ReactComponent as SortIcon } from "../../UI/images/sort.svg";
import { Head } from "../misc/html_head";
import * as dataAPI from "../../api/data";
import * as utils from "../../utils";
import auth from "../../auth/auth";
import Loading from "../misc/loading";
import * as analysis from "../Analysis";
import { DataFrame, Series } from "pandas-js/dist/core";
import { Redirect } from "react-router-dom";
import Table from "./Table";

const equity_df_columns: Array<string> = [
  "instrument",
  "price",
  "tradability",
  "quantity",
  "average_buy_price",
  "dividend",
  "realized profit",
  "symbol",
  "unrealized profit",
  "equity",
];

const equity_columns_to_display: Array<string> = [
  "Name",
  "Average Cost",
  "Equity",
  "Dividend",
  "Realized Return",
  "Unrealized Return",
  "Current Price",
];

const all_equity_fields: Array<string> = [
  ...equity_columns_to_display,
  "Tradability",
  "Quantity",
  "Unrealized Percent Return",
];

let equity_keyword_mapping: { [keyword: string]: string } = {
  Name: "symbol",
  "Average Cost": "average_buy_price",
  Dividend: "dividend",
  Equity: "equity",
  "Realized Return": "realized profit",
  "Unrealized Return": "unrealized profit",
  "Unrealized Percent Return": "percent unrealized profit",
  "Earning Potential": "earning potential",
  "Current Price": "price",
  Tradability: "tradability",
  Quantity: "quantity",
};

let equity_specs: {
  render: () => {};
  [key: string]: string;
} = all_equity_fields.map((element) => ({
  render: () => {},
  display_column_name: element,
  df_column_name: equity_keyword_mapping[element],
  data: null,
}));

export function Statistics(): JSX.Element {
  // TODO Kedar: Try auth.isAuthenticated()
  const [loggedIn, setLoggedIn] = useState<boolean>(true);

  const [lastUpdatedAt, setLastUpdatedAt] = useState<string>("");

  const [activeCategory, setActiveCategory] = useState("equities");

  const [totalInvested, setTotalInvested] = useState(0);
  const [cash, setCash] = useState(0);

  const [equityHistory, setEquityHistory] = useState<Array<
    Array<string>
  > | null>(null);
  const [refresh, setRefresh] = useState(0);

  const [sortedBy, setSortedBy] = useState("symbol");
  const [ascending, setAscending] = useState(true);

  return <div />;
}
