export function numberWithCommas(num: number | string): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function beautifyReturns(num: string): string {
  if (parseFloat(num) === 0) return "-";

  if (num != null) {
    if (parseFloat(num) >= 0) {
      return "+$" + numberWithCommas(parseFloat(num).toFixed(2));
    } else {
      return "-$" + numberWithCommas(Math.abs(parseFloat(num)).toFixed(2));
    }
  }
  return "-";
}

export function beautifyPrice(num: string): string {
  if (num != null && parseFloat(num) !== 0) {
    return "$" + numberWithCommas(parseFloat(num).toFixed(2));
  }
  return "-";
}

export function beautifyPercent(perc: number): string {
  let sign = perc >= 0 ? "+" : "-";
  return `${sign}${perc.toFixed(2)}%`;
}

export function zeroesArray(length: number): Array<number> {
  return Array.apply(null, Array(length)).map(() => 0);
}

export const numDict = {
  1: "one",
  2: "two",
  3: "three",
  4: "four",
  5: "five",
  6: "six",
  7: "seven",
  8: "eight",
  9: "nine",
};
