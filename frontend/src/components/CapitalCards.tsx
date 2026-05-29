type Props = {
  capitals: any[];
};

function CapitalCards({ capitals }: Props) {
  const getAQIColor = (aqi: number) => {
    switch (aqi) {
      case 1:
        return "#22c55e"; // Green
      case 2:
        return "#facc15"; // Yellow
      case 3:
        return "#fb923c"; // Orange
      case 4:
        return "#f87171"; // Red
      case 5:
        return "#c084fc"; // Purple
      default:
        return "#94a3b8";
    }
  };

  const getAQIStatus = (aqi: number) => {
    switch (aqi) {
      case 1:
        return "Good";
      case 2:
        return "Fair";
      case 3:
        return "Moderate";
      case 4:
        return "Poor";
      case 5:
        return "Very Poor";
      default:
        return "Unknown";
    }
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "20px",
        marginTop: "20px",
      }}
    >
      {capitals.map((capital, index) => (
        <div
          key={index}
          className="capital-card"
          style={{
            borderLeft: `8px solid ${getAQIColor(
              capital.aqi
            )}`,
          }}
        >
          <h3
            style={{
              marginTop: 0,
              marginBottom: "15px",
              fontSize: "22px",
            }}
          >
            {capital.city}
          </h3>

          <p>
            <strong>AQI:</strong>{" "}
            <span
              style={{
                color: getAQIColor(capital.aqi),
                fontWeight: "bold",
                fontSize: "18px",
              }}
            >
              {capital.aqi}
            </span>
          </p>

          <p>
            <strong>Status:</strong>{" "}
            <span
              style={{
                color: getAQIColor(capital.aqi),
                fontWeight: "bold",
              }}
            >
              {getAQIStatus(capital.aqi)}
            </span>
          </p>

          <p>
            <strong>PM2.5:</strong>{" "}
            {capital.pm25}
          </p>

          <p>
            <strong>PM10:</strong>{" "}
            {capital.pm10}
          </p>
        </div>
      ))}
    </div>
  );
}

export default CapitalCards;