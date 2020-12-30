export interface TimestampProps {
  updatedAt: string | null;
}

function Timestamp(props: TimestampProps): JSX.Element {
  if (props.updatedAt != null) {
    return (
      <div className="history-header updated-stats">
        Updated at {props.updatedAt.toLocaleString()}
      </div>
    );
  }
  return <div></div>;
}

export default Timestamp;
