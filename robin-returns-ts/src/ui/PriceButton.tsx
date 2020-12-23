import { Position } from "../statistics/Position";
import { TableColumn } from "../components/DataTable";
import { beautifyPrice } from "../components/beautifyPositions";

interface PriceButtonProps {
  position: Position;
}

export function PriceButton(props: PriceButtonProps) {
  return (
    <button
      //   target="_blank"
      className="text stock-redir-btn"
      type="button"
      onClick={(e) =>
        window.open(
          "http://robinhood.com/stocks/" + props.position[TableColumn.TICKER]
        )
      }
    >
      {beautifyPrice(props.position[TableColumn.CURRENT_PRICE])}
      {/* <ArrowIcon className="arrow" /> */}
      {/* <img alt={"Arrow"} className="arrow" src={require(logo512.png")}></img> */}
    </button>
  );
}
