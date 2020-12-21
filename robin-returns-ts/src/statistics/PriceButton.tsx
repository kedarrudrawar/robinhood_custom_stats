import { Action } from "material-table";
import { Position } from "../Position";
import { TableColumn } from "./DataTable";

interface PriceButtonProps {
  action: Action<Position>;
  data: Position;
}

export function PriceButton(props: PriceButtonProps) {
  return (
    <button
      //   target="_blank"
      className="text stock-redir-btn"
      type="button"
      onClick={(e) =>
        window.open(
          "http://robinhood.com/stocks/" + props.data[TableColumn.TICKER]
        )
      }
    >
      {props.data[TableColumn.CURRENT_PRICE]}
      {/* <ArrowIcon className="arrow" /> */}
      {/* <img alt={"Arrow"} className="arrow" src={require(logo512.png")}></img> */}
    </button>
  );
}
