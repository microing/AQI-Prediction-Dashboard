type Props = {
  city: string;
  aqi: number;
  pm25: number;
  pm10: number;
};

function AQICard({ city, aqi, pm25, pm10 }: Props) {
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

  const getAQIColor = (aqi: number) => {
    switch (aqi) {
      case 1:
        return "green";
      case 2:
        return "#d4af37";
      case 3:
        return "orange";
      case 4:
        return "red";
      case 5:
        return "purple";
      default:
        return "gray";
    }
  };

  const getRecommendation = (aqi: number) => {
    switch (aqi) {
      case 1:
        return "Air quality is good. Enjoy outdoor activities.";
      case 2:
        return "Air quality is acceptable for most people.";
      case 3:
        return "Sensitive individuals should reduce prolonged outdoor activities.";
      case 4:
        return "Avoid prolonged outdoor exposure and wear a mask if needed.";
      case 5:
        return "Stay indoors as much as possible and avoid strenuous outdoor activity.";
      default:
        return "No recommendation available.";
    }
  };

  return (
    <div className="card">
      <h2>{city}</h2>

      <h3 style={{ color: getAQIColor(aqi) }}>
        AQI: {aqi}
      </h3>

      <p>
        <strong>Status:</strong>{" "}
        <span style={{ color: getAQIColor(aqi) }}>
          {getAQIStatus(aqi)}
        </span>
      </p>

      <p>
        <strong>PM2.5:</strong> {pm25}
      </p>

      <p>
        <strong>PM10:</strong> {pm10}
      </p>

      <hr />

      <h4>Health Recommendation</h4>

      <p>{getRecommendation(aqi)}</p>
    </div>
  );
}

export default AQICard;