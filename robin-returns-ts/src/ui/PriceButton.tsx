import { Position } from "../statistics/Position";
import { TableColumn } from "../components/statistics/DataTable";
import { beautifyPrice } from "../util/beautifyForRender";
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
    </button>
  );
}
