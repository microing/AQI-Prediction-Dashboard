type Props = {
  capitals: any[];
};

function Stats({ capitals }: Props) {
  if (!capitals.length) return null;

  const avgAQI =
    capitals.reduce((sum, c) => sum + c.aqi, 0) /
    capitals.length;

  const worst = [...capitals].sort(
    (a, b) => b.aqi - a.aqi
  )[0];

  const best = [...capitals].sort(
    (a, b) => a.aqi - b.aqi
  )[0];

  return (
    <div className="stats-grid">
      <div className="stat-card">
        <h2>{capitals.length}</h2>
        <p>Capitals</p>
      </div>

      <div className="stat-card">
        <h2>{avgAQI.toFixed(1)}</h2>
        <p>Average AQI</p>
      </div>

      <div className="stat-card">
        <h2>{best.city}</h2>
        <p>Best AQI</p>
      </div>

      <div className="stat-card">
        <h2>{worst.city}</h2>
        <p>Worst AQI</p>
      </div>
    </div>
  );
}

export default Stats;