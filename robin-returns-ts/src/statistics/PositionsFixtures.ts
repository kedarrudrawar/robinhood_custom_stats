import { Position } from "../Position";
import { TableColumn } from "./DataTable";
import { RHPositionsResponse } from "./ResponseTypes";

export const FULL_POSITIONS_RESPONSE_1: RHPositionsResponse = {
  next: null,
  previous: null,
  results: [
    {
      url:
        "https://api.robinhood.com/positions/925501777/450dfc6d-5510-4d40-abfb-f633b7d9be3e/",
      instrument:
        "https://api.robinhood.com/instruments/450dfc6d-5510-4d40-abfb-f633b7d9be3e/",
      account: "https://api.robinhood.com/accounts/925501777/",
      account_number: "925501777",
      average_buy_price: "91.3659",
      pending_average_buy_price: "91.3659",
      quantity: "14.05874700",
      intraday_average_buy_price: "0.0000",
      intraday_quantity: "0.00000000",
      shares_available_for_exercise: "14.05874700",
      shares_held_for_buys: "0.00000000",
      shares_held_for_sells: "0.00000000",
      shares_held_for_stock_grants: "0.00000000",
      shares_held_for_options_collateral: "0.00000000",
      shares_held_for_options_events: "0.00000000",
      shares_pending_from_options_events: "0.00000000",
      shares_available_for_closing_short_position: "0.00000000",
      updated_at: "2020-11-13T14:52:26.376189Z",
      created_at: "2020-04-30T17:32:59.643955Z",
    },
    {
      url:
        "https://api.robinhood.com/positions/925501777/e39ed23a-7bd1-4587-b060-71988d9ef483/",
      instrument:
        "https://api.robinhood.com/instruments/e39ed23a-7bd1-4587-b060-71988d9ef483/",
      account: "https://api.robinhood.com/accounts/925501777/",
      account_number: "925501777",
      average_buy_price: "454.1437",
      pending_average_buy_price: "454.1437",
      quantity: "2.43315100",
      intraday_average_buy_price: "0.0000",
      intraday_quantity: "0.00000000",
      shares_available_for_exercise: "2.43315100",
      shares_held_for_buys: "0.00000000",
      shares_held_for_sells: "0.00000000",
      shares_held_for_stock_grants: "0.00000000",
      shares_held_for_options_collateral: "0.00000000",
      shares_held_for_options_events: "0.00000000",
      shares_pending_from_options_events: "0.00000000",
      shares_available_for_closing_short_position: "0.00000000",
      updated_at: "2020-12-02T14:32:19.238109Z",
      created_at: "2020-01-08T18:47:53.092057Z",
    },
    {
      url:
        "https://api.robinhood.com/positions/925501777/50810c35-d215-4866-9758-0ada4ac79ffa/",
      instrument:
        "https://api.robinhood.com/instruments/50810c35-d215-4866-9758-0ada4ac79ffa/",
      account: "https://api.robinhood.com/accounts/925501777/",
      account_number: "925501777",
      average_buy_price: "179.5365",
      pending_average_buy_price: "179.5365",
      quantity: "7.02509100",
      intraday_average_buy_price: "0.0000",
      intraday_quantity: "0.00000000",
      shares_available_for_exercise: "7.02509100",
      shares_held_for_buys: "0.00000000",
      shares_held_for_sells: "0.00000000",
      shares_held_for_stock_grants: "0.00000000",
      shares_held_for_options_collateral: "0.00000000",
      shares_held_for_options_events: "0.00000000",
      shares_pending_from_options_events: "0.00000000",
      shares_available_for_closing_short_position: "0.00000000",
      updated_at: "2020-12-11T14:41:33.918929Z",
      created_at: "2020-02-21T15:36:44.671119Z",
    },
    {
      url:
        "https://api.robinhood.com/positions/925501777/79b7c6e2-1cad-4160-8ae4-ee43a8e50840/",
      instrument:
        "https://api.robinhood.com/instruments/79b7c6e2-1cad-4160-8ae4-ee43a8e50840/",
      account: "https://api.robinhood.com/accounts/925501777/",
      account_number: "925501777",
      average_buy_price: "98.2469",
      pending_average_buy_price: "98.2469",
      quantity: "9.99543700",
      intraday_average_buy_price: "0.0000",
      intraday_quantity: "0.00000000",
      shares_available_for_exercise: "9.99543700",
      shares_held_for_buys: "0.00000000",
      shares_held_for_sells: "0.00000000",
      shares_held_for_stock_grants: "0.00000000",
      shares_held_for_options_collateral: "0.00000000",
      shares_held_for_options_events: "0.00000000",
      shares_pending_from_options_events: "0.00000000",
      shares_available_for_closing_short_position: "0.00000000",
      updated_at: "2020-12-09T19:16:05.868953Z",
      created_at: "2020-07-13T14:00:29.430240Z",
    },
    {
      url:
        "https://api.robinhood.com/positions/925501777/f3acdd2f-6580-4c75-a69c-81481cc4c235/",
      instrument:
        "https://api.robinhood.com/instruments/f3acdd2f-6580-4c75-a69c-81481cc4c235/",
      account: "https://api.robinhood.com/accounts/925501777/",
      account_number: "925501777",
      average_buy_price: "139.5269",
      pending_average_buy_price: "139.5269",
      quantity: "5.12862200",
      intraday_average_buy_price: "0.0000",
      intraday_quantity: "0.00000000",
      shares_available_for_exercise: "5.12862200",
      shares_held_for_buys: "0.00000000",
      shares_held_for_sells: "0.00000000",
      shares_held_for_stock_grants: "0.00000000",
      shares_held_for_options_collateral: "0.00000000",
      shares_held_for_options_events: "0.00000000",
      shares_pending_from_options_events: "0.00000000",
      shares_available_for_closing_short_position: "0.00000000",
      updated_at: "2020-12-17T16:52:29.524985Z",
      created_at: "2020-06-11T18:06:52.063710Z",
    },
    {
      url:
        "https://api.robinhood.com/positions/925501777/c0bb3aec-bd1e-471e-a4f0-ca011cbec711/",
      instrument:
        "https://api.robinhood.com/instruments/c0bb3aec-bd1e-471e-a4f0-ca011cbec711/",
      account: "https://api.robinhood.com/accounts/925501777/",
      account_number: "925501777",
      average_buy_price: "3069.4413",
      pending_average_buy_price: "3069.4413",
      quantity: "0.38966700",
      intraday_average_buy_price: "3185.9309",
      intraday_quantity: "0.01569400",
      shares_available_for_exercise: "0.38966700",
      shares_held_for_buys: "0.00000000",
      shares_held_for_sells: "0.00000000",
      shares_held_for_stock_grants: "0.00000000",
      shares_held_for_options_collateral: "0.00000000",
      shares_held_for_options_events: "0.00000000",
      shares_pending_from_options_events: "0.00000000",
      shares_available_for_closing_short_position: "0.00000000",
      updated_at: "2020-12-18T18:43:53.017184Z",
      created_at: "2019-12-18T21:57:18.326361Z",
    },
    {
      url:
        "https://api.robinhood.com/positions/925501777/b2e06903-5c44-46a4-bd42-2a696f9d68e1/",
      instrument:
        "https://api.robinhood.com/instruments/b2e06903-5c44-46a4-bd42-2a696f9d68e1/",
      account: "https://api.robinhood.com/accounts/925501777/",
      account_number: "925501777",
      average_buy_price: "245.1698",
      pending_average_buy_price: "245.1698",
      quantity: "4.37755200",
      intraday_average_buy_price: "0.0000",
      intraday_quantity: "0.00000000",
      shares_available_for_exercise: "4.37755200",
      shares_held_for_buys: "0.00000000",
      shares_held_for_sells: "0.00000000",
      shares_held_for_stock_grants: "0.00000000",
      shares_held_for_options_collateral: "0.00000000",
      shares_held_for_options_events: "0.00000000",
      shares_pending_from_options_events: "0.00000000",
      shares_available_for_closing_short_position: "0.00000000",
      updated_at: "2020-11-30T20:23:52.726937Z",
      created_at: "2020-02-06T16:45:32.183660Z",
    },
    {
      url:
        "https://api.robinhood.com/positions/925501777/e480c0d8-7afc-45da-a10c-56f2eb4aaf2a/",
      instrument:
        "https://api.robinhood.com/instruments/e480c0d8-7afc-45da-a10c-56f2eb4aaf2a/",
      account: "https://api.robinhood.com/accounts/925501777/",
      account_number: "925501777",
      average_buy_price: "92.6742",
      pending_average_buy_price: "92.6742",
      quantity: "11.16118800",
      intraday_average_buy_price: "0.0000",
      intraday_quantity: "0.00000000",
      shares_available_for_exercise: "0.16118800",
      shares_held_for_buys: "0.00000000",
      shares_held_for_sells: "11.00000000",
      shares_held_for_stock_grants: "0.00000000",
      shares_held_for_options_collateral: "0.00000000",
      shares_held_for_options_events: "0.00000000",
      shares_pending_from_options_events: "0.00000000",
      shares_available_for_closing_short_position: "0.00000000",
      updated_at: "2020-12-18T16:26:21.029814Z",
      created_at: "2020-09-23T14:37:51.215759Z",
    },
    {
      url:
        "https://api.robinhood.com/positions/925501777/ec4f4a5a-cbd2-4417-aac6-bc13926e7833/",
      instrument:
        "https://api.robinhood.com/instruments/ec4f4a5a-cbd2-4417-aac6-bc13926e7833/",
      account: "https://api.robinhood.com/accounts/925501777/",
      account_number: "925501777",
      average_buy_price: "58.1829",
      pending_average_buy_price: "58.1829",
      quantity: "10.87003200",
      intraday_average_buy_price: "0.0000",
      intraday_quantity: "0.00000000",
      shares_available_for_exercise: "10.87003200",
      shares_held_for_buys: "0.01004000",
      shares_held_for_sells: "0.00000000",
      shares_held_for_stock_grants: "0.00000000",
      shares_held_for_options_collateral: "0.00000000",
      shares_held_for_options_events: "0.00000000",
      shares_pending_from_options_events: "0.00000000",
      shares_available_for_closing_short_position: "0.00000000",
      updated_at: "2020-12-19T03:33:38.125150Z",
      created_at: "2020-04-21T15:53:52.042620Z",
    },
    {
      url:
        "https://api.robinhood.com/positions/925501777/e140f07b-02f0-4299-9925-e8c59eaf0fe5/",
      instrument:
        "https://api.robinhood.com/instruments/e140f07b-02f0-4299-9925-e8c59eaf0fe5/",
      account: "https://api.robinhood.com/accounts/925501777/",
      account_number: "925501777",
      average_buy_price: "15.0682",
      pending_average_buy_price: "15.0682",
      quantity: "37.00000000",
      intraday_average_buy_price: "0.0000",
      intraday_quantity: "0.00000000",
      shares_available_for_exercise: "37.00000000",
      shares_held_for_buys: "0.00000000",
      shares_held_for_sells: "0.00000000",
      shares_held_for_stock_grants: "0.00000000",
      shares_held_for_options_collateral: "0.00000000",
      shares_held_for_options_events: "0.00000000",
      shares_pending_from_options_events: "0.00000000",
      shares_available_for_closing_short_position: "0.00000000",
      updated_at: "2020-12-16T15:55:52.967760Z",
      created_at: "2020-04-16T15:49:58.941346Z",
    },
    {
      url:
        "https://api.robinhood.com/positions/925501777/a117698a-e3b6-4857-bcdb-9ca89cbbc697/",
      instrument:
        "https://api.robinhood.com/instruments/a117698a-e3b6-4857-bcdb-9ca89cbbc697/",
      account: "https://api.robinhood.com/accounts/925501777/",
      account_number: "925501777",
      average_buy_price: "116.2962",
      pending_average_buy_price: "116.2962",
      quantity: "5.39604800",
      intraday_average_buy_price: "0.0000",
      intraday_quantity: "0.00000000",
      shares_available_for_exercise: "5.39604800",
      shares_held_for_buys: "0.00000000",
      shares_held_for_sells: "0.00000000",
      shares_held_for_stock_grants: "0.00000000",
      shares_held_for_options_collateral: "0.00000000",
      shares_held_for_options_events: "0.00000000",
      shares_pending_from_options_events: "0.00000000",
      shares_available_for_closing_short_position: "0.00000000",
      updated_at: "2020-11-10T15:19:29.420979Z",
      created_at: "2020-10-23T14:59:56.950919Z",
    },
    {
      url:
        "https://api.robinhood.com/positions/925501777/976a91bc-1210-4dd7-bc47-c1e348a54216/",
      instrument:
        "https://api.robinhood.com/instruments/976a91bc-1210-4dd7-bc47-c1e348a54216/",
      account: "https://api.robinhood.com/accounts/925501777/",
      account_number: "925501777",
      average_buy_price: "65.3043",
      pending_average_buy_price: "65.3043",
      quantity: "7.78371500",
      intraday_average_buy_price: "0.0000",
      intraday_quantity: "0.00000000",
      shares_available_for_exercise: "7.78371500",
      shares_held_for_buys: "0.00000000",
      shares_held_for_sells: "0.00000000",
      shares_held_for_stock_grants: "0.00000000",
      shares_held_for_options_collateral: "0.00000000",
      shares_held_for_options_events: "0.00000000",
      shares_pending_from_options_events: "0.00000000",
      shares_available_for_closing_short_position: "0.00000000",
      updated_at: "2020-12-16T20:55:58.050472Z",
      created_at: "2020-05-19T15:56:49.813862Z",
    },
    {
      url:
        "https://api.robinhood.com/positions/925501777/8373dfad-6a18-481e-a6da-b6d754fa7937/",
      instrument:
        "https://api.robinhood.com/instruments/8373dfad-6a18-481e-a6da-b6d754fa7937/",
      account: "https://api.robinhood.com/accounts/925501777/",
      account_number: "925501777",
      average_buy_price: "276.1380",
      pending_average_buy_price: "276.1380",
      quantity: "2.00479500",
      intraday_average_buy_price: "0.0000",
      intraday_quantity: "0.00000000",
      shares_available_for_exercise: "2.00479500",
      shares_held_for_buys: "0.00000000",
      shares_held_for_sells: "0.00000000",
      shares_held_for_stock_grants: "0.00000000",
      shares_held_for_options_collateral: "0.00000000",
      shares_held_for_options_events: "0.00000000",
      shares_pending_from_options_events: "0.00000000",
      shares_available_for_closing_short_position: "0.00000000",
      updated_at: "2020-11-10T14:38:52.904803Z",
      created_at: "2020-04-30T17:18:23.970894Z",
    },
    {
      url:
        "https://api.robinhood.com/positions/925501777/a4ecd608-e7b4-4ff3-afa5-f77ae7632dfb/",
      instrument:
        "https://api.robinhood.com/instruments/a4ecd608-e7b4-4ff3-afa5-f77ae7632dfb/",
      account: "https://api.robinhood.com/accounts/925501777/",
      account_number: "925501777",
      average_buy_price: "512.5092",
      pending_average_buy_price: "512.5092",
      quantity: "1.19771500",
      intraday_average_buy_price: "0.0000",
      intraday_quantity: "0.00000000",
      shares_available_for_exercise: "1.19771500",
      shares_held_for_buys: "0.00000000",
      shares_held_for_sells: "0.00000000",
      shares_held_for_stock_grants: "0.00000000",
      shares_held_for_options_collateral: "0.00000000",
      shares_held_for_options_events: "0.00000000",
      shares_pending_from_options_events: "0.00000000",
      shares_available_for_closing_short_position: "0.00000000",
      updated_at: "2020-11-10T20:40:43.456943Z",
      created_at: "2020-08-27T17:07:48.807934Z",
    },
    {
      url:
        "https://api.robinhood.com/positions/925501777/943c5009-a0bb-4665-8cf4-a95dab5874e4/",
      instrument:
        "https://api.robinhood.com/instruments/943c5009-a0bb-4665-8cf4-a95dab5874e4/",
      account: "https://api.robinhood.com/accounts/925501777/",
      account_number: "925501777",
      average_buy_price: "1437.6755",
      pending_average_buy_price: "1437.6755",
      quantity: "0.36260500",
      intraday_average_buy_price: "0.0000",
      intraday_quantity: "0.00000000",
      shares_available_for_exercise: "0.36260500",
      shares_held_for_buys: "0.00000000",
      shares_held_for_sells: "0.00000000",
      shares_held_for_stock_grants: "0.00000000",
      shares_held_for_options_collateral: "0.00000000",
      shares_held_for_options_events: "0.00000000",
      shares_pending_from_options_events: "0.00000000",
      shares_available_for_closing_short_position: "0.00000000",
      updated_at: "2020-11-04T15:34:28.487447Z",
      created_at: "2020-06-03T15:22:34.861748Z",
    },
    {
      url:
        "https://api.robinhood.com/positions/925501777/ebab2398-028d-4939-9f1d-13bf38f81c50/",
      instrument:
        "https://api.robinhood.com/instruments/ebab2398-028d-4939-9f1d-13bf38f81c50/",
      account: "https://api.robinhood.com/accounts/925501777/",
      account_number: "925501777",
      average_buy_price: "232.4388",
      pending_average_buy_price: "232.4388",
      quantity: "2.19543800",
      intraday_average_buy_price: "0.0000",
      intraday_quantity: "0.00000000",
      shares_available_for_exercise: "2.19543800",
      shares_held_for_buys: "0.00000000",
      shares_held_for_sells: "0.00000000",
      shares_held_for_stock_grants: "0.00000000",
      shares_held_for_options_collateral: "0.00000000",
      shares_held_for_options_events: "0.00000000",
      shares_pending_from_options_events: "0.00000000",
      shares_available_for_closing_short_position: "0.00000000",
      updated_at: "2020-11-20T15:36:00.575239Z",
      created_at: "2020-05-21T19:57:49.684407Z",
    },
    {
      url:
        "https://api.robinhood.com/positions/925501777/5332f19a-15f8-4257-b601-7d7545f556fb/",
      instrument:
        "https://api.robinhood.com/instruments/5332f19a-15f8-4257-b601-7d7545f556fb/",
      account: "https://api.robinhood.com/accounts/925501777/",
      account_number: "925501777",
      average_buy_price: "44.7385",
      pending_average_buy_price: "44.7385",
      quantity: "11.48049200",
      intraday_average_buy_price: "0.0000",
      intraday_quantity: "0.00000000",
      shares_available_for_exercise: "11.48049200",
      shares_held_for_buys: "0.00000000",
      shares_held_for_sells: "0.00000000",
      shares_held_for_stock_grants: "0.00000000",
      shares_held_for_options_collateral: "0.00000000",
      shares_held_for_options_events: "0.00000000",
      shares_pending_from_options_events: "0.00000000",
      shares_available_for_closing_short_position: "0.00000000",
      updated_at: "2020-12-17T20:23:20.494567Z",
      created_at: "2020-10-20T18:28:05.407455Z",
    },
    {
      url:
        "https://api.robinhood.com/positions/925501777/18006bfb-cbad-4326-8348-738c94ea47fa/",
      instrument:
        "https://api.robinhood.com/instruments/18006bfb-cbad-4326-8348-738c94ea47fa/",
      account: "https://api.robinhood.com/accounts/925501777/",
      account_number: "925501777",
      average_buy_price: "56.9066",
      pending_average_buy_price: "56.9066",
      quantity: "7.54611700",
      intraday_average_buy_price: "87.0500",
      intraday_quantity: "1.00000000",
      shares_available_for_exercise: "7.54611700",
      shares_held_for_buys: "0.00000000",
      shares_held_for_sells: "0.00000000",
      shares_held_for_stock_grants: "0.00000000",
      shares_held_for_options_collateral: "0.00000000",
      shares_held_for_options_events: "0.00000000",
      shares_pending_from_options_events: "0.00000000",
      shares_available_for_closing_short_position: "0.00000000",
      updated_at: "2020-12-18T19:49:06.779956Z",
      created_at: "2020-04-20T16:47:28.007506Z",
    },
    {
      url:
        "https://api.robinhood.com/positions/925501777/b9a6444e-ce3e-4186-be32-b82814d2b418/",
      instrument:
        "https://api.robinhood.com/instruments/b9a6444e-ce3e-4186-be32-b82814d2b418/",
      account: "https://api.robinhood.com/accounts/925501777/",
      account_number: "925501777",
      average_buy_price: "24.5611",
      pending_average_buy_price: "24.5611",
      quantity: "14.00000000",
      intraday_average_buy_price: "0.0000",
      intraday_quantity: "0.00000000",
      shares_available_for_exercise: "14.00000000",
      shares_held_for_buys: "0.00000000",
      shares_held_for_sells: "0.00000000",
      shares_held_for_stock_grants: "0.00000000",
      shares_held_for_options_collateral: "0.00000000",
      shares_held_for_options_events: "0.00000000",
      shares_pending_from_options_events: "0.00000000",
      shares_available_for_closing_short_position: "0.00000000",
      updated_at: "2020-12-16T15:48:39.331167Z",
      created_at: "2020-04-15T16:18:17.104434Z",
    },
    {
      url:
        "https://api.robinhood.com/positions/925501777/2b456f6a-3287-4757-abf9-327383d2c708/",
      instrument:
        "https://api.robinhood.com/instruments/2b456f6a-3287-4757-abf9-327383d2c708/",
      account: "https://api.robinhood.com/accounts/925501777/",
      account_number: "925501777",
      average_buy_price: "30.0443",
      pending_average_buy_price: "30.0443",
      quantity: "18.58917600",
      intraday_average_buy_price: "0.0000",
      intraday_quantity: "0.00000000",
      shares_available_for_exercise: "18.58917600",
      shares_held_for_buys: "0.00000000",
      shares_held_for_sells: "0.00000000",
      shares_held_for_stock_grants: "0.00000000",
      shares_held_for_options_collateral: "0.00000000",
      shares_held_for_options_events: "0.00000000",
      shares_pending_from_options_events: "0.00000000",
      shares_available_for_closing_short_position: "0.00000000",
      updated_at: "2020-11-11T15:17:04.579488Z",
      created_at: "2020-04-30T17:21:59.629679Z",
    },
    {
      url:
        "https://api.robinhood.com/positions/925501777/41eac3c6-f7f7-4c4a-b696-ab9d1b913981/",
      instrument:
        "https://api.robinhood.com/instruments/41eac3c6-f7f7-4c4a-b696-ab9d1b913981/",
      account: "https://api.robinhood.com/accounts/925501777/",
      account_number: "925501777",
      average_buy_price: "214.2266",
      pending_average_buy_price: "214.2266",
      quantity: "2.47359600",
      intraday_average_buy_price: "0.0000",
      intraday_quantity: "0.00000000",
      shares_available_for_exercise: "2.47359600",
      shares_held_for_buys: "0.00000000",
      shares_held_for_sells: "0.00000000",
      shares_held_for_stock_grants: "0.00000000",
      shares_held_for_options_collateral: "0.00000000",
      shares_held_for_options_events: "0.00000000",
      shares_pending_from_options_events: "0.00000000",
      shares_available_for_closing_short_position: "0.00000000",
      updated_at: "2020-12-02T16:01:04.513674Z",
      created_at: "2020-11-30T16:24:55.507986Z",
    },
    {
      url:
        "https://api.robinhood.com/positions/925501777/2ed64ef4-2c1a-44d6-832d-1be84741dc41/",
      instrument:
        "https://api.robinhood.com/instruments/2ed64ef4-2c1a-44d6-832d-1be84741dc41/",
      account: "https://api.robinhood.com/accounts/925501777/",
      account_number: "925501777",
      average_buy_price: "125.8000",
      pending_average_buy_price: "125.8000",
      quantity: "3.00000000",
      intraday_average_buy_price: "0.0000",
      intraday_quantity: "0.00000000",
      shares_available_for_exercise: "3.00000000",
      shares_held_for_buys: "0.00000000",
      shares_held_for_sells: "0.00000000",
      shares_held_for_stock_grants: "0.00000000",
      shares_held_for_options_collateral: "0.00000000",
      shares_held_for_options_events: "0.00000000",
      shares_pending_from_options_events: "0.00000000",
      shares_available_for_closing_short_position: "0.00000000",
      updated_at: "2020-11-09T21:40:06.320093Z",
      created_at: "2020-02-04T20:38:53.663063Z",
    },
    {
      url:
        "https://api.robinhood.com/positions/925501777/4b4d198e-fe71-487c-8e3b-584732a2bfaa/",
      instrument:
        "https://api.robinhood.com/instruments/4b4d198e-fe71-487c-8e3b-584732a2bfaa/",
      account: "https://api.robinhood.com/accounts/925501777/",
      account_number: "925501777",
      average_buy_price: "173.5730",
      pending_average_buy_price: "173.5730",
      quantity: "2.40797900",
      intraday_average_buy_price: "197.3305",
      intraday_quantity: "0.25338200",
      shares_available_for_exercise: "2.40797900",
      shares_held_for_buys: "0.00000000",
      shares_held_for_sells: "0.00000000",
      shares_held_for_stock_grants: "0.00000000",
      shares_held_for_options_collateral: "0.00000000",
      shares_held_for_options_events: "0.00000000",
      shares_pending_from_options_events: "0.00000000",
      shares_available_for_closing_short_position: "0.00000000",
      updated_at: "2020-12-18T16:24:35.871432Z",
      created_at: "2020-09-28T18:30:16.437562Z",
    },
    {
      url:
        "https://api.robinhood.com/positions/925501777/306245dd-b82d-4d8d-bcc5-7c58e87cdd15/",
      instrument:
        "https://api.robinhood.com/instruments/306245dd-b82d-4d8d-bcc5-7c58e87cdd15/",
      account: "https://api.robinhood.com/accounts/925501777/",
      account_number: "925501777",
      average_buy_price: "306.1727",
      pending_average_buy_price: "306.1727",
      quantity: "1.28881500",
      intraday_average_buy_price: "0.0000",
      intraday_quantity: "0.00000000",
      shares_available_for_exercise: "1.28881500",
      shares_held_for_buys: "0.00000000",
      shares_held_for_sells: "0.00000000",
      shares_held_for_stock_grants: "0.00000000",
      shares_held_for_options_collateral: "0.00000000",
      shares_held_for_options_events: "0.00000000",
      shares_pending_from_options_events: "0.00000000",
      shares_available_for_closing_short_position: "0.00000000",
      updated_at: "2020-10-06T19:52:42.265961Z",
      created_at: "2020-07-14T16:14:43.293130Z",
    },
    {
      url:
        "https://api.robinhood.com/positions/925501777/309344d3-af67-4190-9970-b10618959fe5/",
      instrument:
        "https://api.robinhood.com/instruments/309344d3-af67-4190-9970-b10618959fe5/",
      account: "https://api.robinhood.com/accounts/925501777/",
      account_number: "925501777",
      average_buy_price: "197.1650",
      pending_average_buy_price: "197.1650",
      quantity: "1.76529200",
      intraday_average_buy_price: "0.0000",
      intraday_quantity: "0.00000000",
      shares_available_for_exercise: "1.76529200",
      shares_held_for_buys: "0.00000000",
      shares_held_for_sells: "0.00000000",
      shares_held_for_stock_grants: "0.00000000",
      shares_held_for_options_collateral: "0.00000000",
      shares_held_for_options_events: "0.00000000",
      shares_pending_from_options_events: "0.00000000",
      shares_available_for_closing_short_position: "0.00000000",
      updated_at: "2020-11-25T15:39:40.433955Z",
      created_at: "2020-11-20T16:09:03.536547Z",
    },
    {
      url:
        "https://api.robinhood.com/positions/925501777/ec89803c-c5e5-4df1-889c-da4f8cb6f8cd/",
      instrument:
        "https://api.robinhood.com/instruments/ec89803c-c5e5-4df1-889c-da4f8cb6f8cd/",
      account: "https://api.robinhood.com/accounts/925501777/",
      account_number: "925501777",
      average_buy_price: "372.8838",
      pending_average_buy_price: "372.8838",
      quantity: "1.13552800",
      intraday_average_buy_price: "368.9275",
      intraday_quantity: "0.13552800",
      shares_available_for_exercise: "1.13552800",
      shares_held_for_buys: "0.00000000",
      shares_held_for_sells: "0.00000000",
      shares_held_for_stock_grants: "0.00000000",
      shares_held_for_options_collateral: "0.00000000",
      shares_held_for_options_events: "0.00000000",
      shares_pending_from_options_events: "0.00000000",
      shares_available_for_closing_short_position: "0.00000000",
      updated_at: "2020-12-18T16:28:21.388441Z",
      created_at: "2020-09-22T16:11:44.257283Z",
    },
    {
      url:
        "https://api.robinhood.com/positions/925501777/8b760bb0-106d-41ee-a1d5-618236320dd2/",
      instrument:
        "https://api.robinhood.com/instruments/8b760bb0-106d-41ee-a1d5-618236320dd2/",
      account: "https://api.robinhood.com/accounts/925501777/",
      account_number: "925501777",
      average_buy_price: "143.9321",
      pending_average_buy_price: "143.9321",
      quantity: "2.35381900",
      intraday_average_buy_price: "143.9321",
      intraday_quantity: "2.35381900",
      shares_available_for_exercise: "2.35381900",
      shares_held_for_buys: "0.00000000",
      shares_held_for_sells: "0.00000000",
      shares_held_for_stock_grants: "0.00000000",
      shares_held_for_options_collateral: "0.00000000",
      shares_held_for_options_events: "0.00000000",
      shares_pending_from_options_events: "0.00000000",
      shares_available_for_closing_short_position: "0.00000000",
      updated_at: "2020-12-18T20:19:49.627564Z",
      created_at: "2020-02-25T19:44:20.647388Z",
    },
    {
      url:
        "https://api.robinhood.com/positions/925501777/f90de184-4f73-4aad-9a5f-407858013eb1/",
      instrument:
        "https://api.robinhood.com/instruments/f90de184-4f73-4aad-9a5f-407858013eb1/",
      account: "https://api.robinhood.com/accounts/925501777/",
      account_number: "925501777",
      average_buy_price: "24.5409",
      pending_average_buy_price: "24.5409",
      quantity: "11.00000000",
      intraday_average_buy_price: "0.0000",
      intraday_quantity: "0.00000000",
      shares_available_for_exercise: "11.00000000",
      shares_held_for_buys: "0.00000000",
      shares_held_for_sells: "0.00000000",
      shares_held_for_stock_grants: "0.00000000",
      shares_held_for_options_collateral: "0.00000000",
      shares_held_for_options_events: "0.00000000",
      shares_pending_from_options_events: "0.00000000",
      shares_available_for_closing_short_position: "0.00000000",
      updated_at: "2020-12-16T21:40:01.681813Z",
      created_at: "2020-12-02T16:06:44.175983Z",
    },
    {
      url:
        "https://api.robinhood.com/positions/925501777/42f1f3ee-5ae0-45ae-b4a3-811821190664/",
      instrument:
        "https://api.robinhood.com/instruments/42f1f3ee-5ae0-45ae-b4a3-811821190664/",
      account: "https://api.robinhood.com/accounts/925501777/",
      account_number: "925501777",
      average_buy_price: "25.3688",
      pending_average_buy_price: "25.3688",
      quantity: "13.13783600",
      intraday_average_buy_price: "0.0000",
      intraday_quantity: "0.00000000",
      shares_available_for_exercise: "13.13783600",
      shares_held_for_buys: "0.00000000",
      shares_held_for_sells: "0.00000000",
      shares_held_for_stock_grants: "0.00000000",
      shares_held_for_options_collateral: "0.00000000",
      shares_held_for_options_events: "0.00000000",
      shares_pending_from_options_events: "0.00000000",
      shares_available_for_closing_short_position: "0.00000000",
      updated_at: "2020-12-17T15:52:23.995826Z",
      created_at: "2020-09-02T19:55:26.349648Z",
    },
    {
      url:
        "https://api.robinhood.com/positions/925501777/09bc1a2d-534d-49d4-add7-e0eb3be8e640/",
      instrument:
        "https://api.robinhood.com/instruments/09bc1a2d-534d-49d4-add7-e0eb3be8e640/",
      account: "https://api.robinhood.com/accounts/925501777/",
      account_number: "925501777",
      average_buy_price: "46.9420",
      pending_average_buy_price: "46.9420",
      quantity: "5.00000000",
      intraday_average_buy_price: "0.0000",
      intraday_quantity: "0.00000000",
      shares_available_for_exercise: "5.00000000",
      shares_held_for_buys: "0.00000000",
      shares_held_for_sells: "0.00000000",
      shares_held_for_stock_grants: "0.00000000",
      shares_held_for_options_collateral: "0.00000000",
      shares_held_for_options_events: "0.00000000",
      shares_pending_from_options_events: "0.00000000",
      shares_available_for_closing_short_position: "0.00000000",
      updated_at: "2020-12-16T15:56:14.095074Z",
      created_at: "2020-11-25T15:42:18.439677Z",
    },
    {
      url:
        "https://api.robinhood.com/positions/925501777/1790dd4f-a7ff-409e-90de-cad5efafde10/",
      instrument:
        "https://api.robinhood.com/instruments/1790dd4f-a7ff-409e-90de-cad5efafde10/",
      account: "https://api.robinhood.com/accounts/925501777/",
      account_number: "925501777",
      average_buy_price: "273.3864",
      pending_average_buy_price: "273.3864",
      quantity: "0.53115300",
      intraday_average_buy_price: "0.0000",
      intraday_quantity: "0.00000000",
      shares_available_for_exercise: "0.53115300",
      shares_held_for_buys: "0.00000000",
      shares_held_for_sells: "0.00000000",
      shares_held_for_stock_grants: "0.00000000",
      shares_held_for_options_collateral: "0.00000000",
      shares_held_for_options_events: "0.00000000",
      shares_pending_from_options_events: "0.00000000",
      shares_available_for_closing_short_position: "0.00000000",
      updated_at: "2020-11-02T14:39:44.684652Z",
      created_at: "2020-07-14T16:14:43.164832Z",
    },
  ],
};

export const SIMPLE_POSITIONS_RESPONSE: RHPositionsResponse = {
  next: null,
  previous: null,
  results: [
    {
      url:
        "https://api.robinhood.com/positions/925501777/450dfc6d-5510-4d40-abfb-f633b7d9be3e/",
      instrument:
        "https://api.robinhood.com/instruments/450dfc6d-5510-4d40-abfb-f633b7d9be3e/",
      account: "https://api.robinhood.com/accounts/925501777/",
      account_number: "925501777",
      average_buy_price: "91.3659",
      pending_average_buy_price: "91.3659",
      quantity: "14.05874700",
      intraday_average_buy_price: "0.0000",
      intraday_quantity: "0.00000000",
      shares_available_for_exercise: "14.05874700",
      shares_held_for_buys: "0.00000000",
      shares_held_for_sells: "0.00000000",
      shares_held_for_stock_grants: "0.00000000",
      shares_held_for_options_collateral: "0.00000000",
      shares_held_for_options_events: "0.00000000",
      shares_pending_from_options_events: "0.00000000",
      shares_available_for_closing_short_position: "0.00000000",
      updated_at: "2020-11-13T14:52:26.376189Z",
      created_at: "2020-04-30T17:32:59.643955Z",
    },
  ],
};

const { quantity, average_buy_price } = SIMPLE_POSITIONS_RESPONSE.results[0];

export const POSITION: Position = {
  [TableColumn.TICKER]: "AAPL",
  [TableColumn.QUANTITY]: quantity,
  [TableColumn.AVERAGE_COST]: average_buy_price,
  [TableColumn.DIVIDEND]: 115,
  [TableColumn.UNREALIZED_PROFIT]: 100,
  [TableColumn.REALIZED_PROFIT]: 100,
  [TableColumn.CURRENT_PRICE]: "$100",
  instrument:
    "https://api.robinhood.com/instruments/450dfc6d-5510-4d40-abfb-f633b7d9be3e/",
};