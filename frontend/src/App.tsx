import { useState, useEffect } from "react";
import {
  getAQI,
  getHistory,
  getAllCapitals,
} from "./services/api";

import AQICard from "./components/AQICard";
import History from "./components/History";
import CapitalCards from "./components/CapitalCards";
import TopPolluted from "./components/TopPolluted";

function App() {
  const [city, setCity] = useState("");
  const [aqiData, setAqiData] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [capitals, setCapitals] = useState<any[]>([]);
  const [darkMode, setDarkMode] = useState(false);

  const [loading, setLoading] = useState(false);
  const [capitalsLoading, setCapitalsLoading] =
    useState(true);

  const fetchHistory = async () => {
    try {
      const data = await getHistory();
      setHistory(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCapitals = async () => {
    try {
      setCapitalsLoading(true);

      const data = await getAllCapitals();

      setCapitals(data);
    } catch (error) {
      console.error(error);
    } finally {
      setCapitalsLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
    fetchCapitals();
  }, []);

  const handleSearch = async () => {
    if (!city.trim()) {
      alert("Please enter a city");
      return;
    }

    try {
      setLoading(true);

      const data = await getAQI(city);

      setAqiData(data);

      await fetchHistory();

      setCity("");
    } catch (error) {
      alert("City not found");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`container ${darkMode ? "dark" : ""}`}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h1
          className="title"
          style={{
            margin: 0,
          }}
        >
          🇮🇳 India Air Quality Dashboard
        </h1>

        <button
          onClick={() => setDarkMode(!darkMode)}
          style={{
            padding: "10px 18px",
            border: "none",
            borderRadius: "50px",
            cursor: "pointer",
            background: darkMode
              ? "linear-gradient(135deg,#f59e0b,#f97316)"
              : "linear-gradient(135deg,#1e293b,#334155)",
            color: "white",
            fontWeight: "bold",
            fontSize: "16px",
            boxShadow:
              "0 4px 12px rgba(0,0,0,0.15)",
            transition: "all 0.3s ease",
          }}
        >
          {darkMode ? "☀️" : "🌙"}
        </button>
      </div>

      <div className="search-box">
        <input
          type="text"
          placeholder="Enter city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <button onClick={handleSearch}>
          Search
        </button>
      </div>

      {loading && (
        <div className="card">
          <p>Loading AQI data...</p>
        </div>
      )}

      {aqiData && !loading && (
        <AQICard
          city={aqiData.city}
          aqi={aqiData.aqi}
          pm25={aqiData.pm25}
          pm10={aqiData.pm10}
        />
      )}

      <h2 className="section-title">
        Recent Searches
      </h2>

      <History records={history} />

      <h2 className="section-title">
        Pollution Insights
      </h2>

      {capitals.length > 0 && (
        <TopPolluted capitals={capitals} />
      )}

      <h2 className="section-title">
        India Capitals AQI Dashboard
      </h2>

      {capitalsLoading ? (
        <div className="card">
          <p>Loading capitals dashboard...</p>
        </div>
      ) : (
        <>
          <p>
            <strong>Total Capitals:</strong>{" "}
            {capitals.length}
          </p>

          <CapitalCards capitals={capitals} />
        </>
      )}
    </div>
  );
}

export default App;