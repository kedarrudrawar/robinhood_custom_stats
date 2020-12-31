function numberWithCommas(num: number | string): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function beautifyReturns(num: number | null): string {
  if (num == null) return "-";

  return num >= 0
    ? "+$" + numberWithCommas(num.toFixed(2))
    : "-$" + numberWithCommas(Math.abs(num).toFixed(2));
}

export function beautifyPrice(num: number | null): string {
  return num != null && num !== 0
    ? "$" + numberWithCommas(num.toFixed(2))
    : "-";
}

function beautifyPercent(percentage: number): string {
  let sign = percentage >= 0 ? "+" : "-";
  return `${sign}${percentage.toFixed(2)}%`;
}

export function beautifyQuantity(qty: number): string {
  return qty.toFixed(2);
}

export function pluralize(
  singular: string,
  plural: string,
  totalCount: number
): string {
  return totalCount === 1 ? plural : singular;
}
