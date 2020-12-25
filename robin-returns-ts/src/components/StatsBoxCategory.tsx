export interface StatsBoxCategoryProps {
  category: string;
}

export function StatsBoxCategory(props: StatsBoxCategoryProps): JSX.Element {
  return <div className="data-row-categ text">{props.category}</div>;
}
