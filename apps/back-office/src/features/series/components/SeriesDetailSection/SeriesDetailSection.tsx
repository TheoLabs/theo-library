import { useSeriesDetail } from "../../hooks";

export function SeriesDetailSection(props: { seriesId: number }) {
  // 1. destructure props
  const { seriesId } = props;

  // 2. lib hooks
  // 3. state hooks
  // 4. query hooks
  const { series, isLoading } = useSeriesDetail(seriesId);

  // 5. form hooks
  // 6. calculate values
  // 7. effect hooks
  // 8. handlers
  // 9. render
  return <div>hi</div>;
}
