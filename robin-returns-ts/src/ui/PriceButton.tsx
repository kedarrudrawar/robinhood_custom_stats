import { Position } from "../statistics/Position";
import { TableColumn } from "../components/DataTable";
import { beautifyPrice } from "../components/beautifyPositions";
import "../ui/css/styles.css";
import { ReactComponent as ArrowIcon } from "../ui/images/arrow.svg";
interface PriceButtonProps {
  position: Position;
}

export function PriceButton(props: PriceButtonProps): JSX.Element {
  const currentPrice = props.position[TableColumn.CURRENT_PRICE];
  if (currentPrice == null) {
    return <div></div>;
  }

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
      {beautifyPrice(currentPrice)}
      {<ArrowIcon className="arrow" />}
      {/* {<img alt={"Arrow"} className="arrow" src={require("logo512.png")}></img>} */}
    </button>
  );
}
