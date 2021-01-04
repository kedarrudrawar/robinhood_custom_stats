import { RHInstrument } from "statistics/DAO/ServerResponseTypes";

export const INSTRUMENT_1: RHInstrument = {
  id: "2ed64ef4-2c1a-44d6-832d-1be84741dc41",
  url:
    "https://api.robinhood.com/instruments/2ed64ef4-2c1a-44d6-832d-1be84741dc41/",
  quote: "https://api.robinhood.com/quotes/DIS/",
  fundamentals: "https://api.robinhood.com/fundamentals/DIS/",
  splits:
    "https://api.robinhood.com/instruments/2ed64ef4-2c1a-44d6-832d-1be84741dc41/splits/",
  state: "active",
  market: "https://api.robinhood.com/markets/XNYS/",
  simple_name: "Disney",
  name: "The Walt Disney Company",
  tradeable: true,
  tradability: "tradable",
  symbol: "DIS",
  bloomberg_unique: "EQ0010046300001000",
  margin_initial_ratio: "0.5000",
  maintenance_ratio: "0.2500",
  country: "US",
  day_trade_ratio: "0.2500",
  list_date: "1990-01-02",
  min_tick_size: null,
  type: "stock",
  tradable_chain_id: "8cc47804-88bd-419d-baa4-6264021ddd0e",
  rhs_tradability: "tradable",
  fractional_tradability: "tradable",
  default_collar_fraction: "0.05",
};
