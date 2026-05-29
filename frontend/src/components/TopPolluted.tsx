type Props = {
  capitals: any[];
};

function TopPolluted({ capitals }: Props) {
  const topCities = [...capitals]
    .sort((a, b) => b.aqi - a.aqi)
    .slice(0, 5);

  return (
    <div className="card">
      <h2>🏭 Top 5 Most Polluted Capitals</h2>

      {topCities.map((city, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "10px 0",
            borderBottom: "1px solid #eee",
          }}
        >
          <span>
            #{index + 1} {city.city}
          </span>

          <strong>AQI {city.aqi}</strong>
        </div>
      ))}
    </div>
  );
}

export default TopPolluted;