import { useEffect, useState } from "react";

const API_KEY = "1e4f70407ce7cbc4154e30a8420943b8"; // replace with your key

export default function App() {
  const [city, setCity] = useState("Manila");
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWeather(city);
  }, [city]);

  async function fetchWeather(cityName) {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`
      );
      if (!res.ok) throw new Error("City not found");
      const data = await res.json();
      setWeather(data); 
    } catch (err) {
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (query.trim()) {
      setCity(query.trim());
      setQuery("");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center p-4">
      <div className="bg-white/90 backdrop-blur rounded-2xl shadow-xl w-full max-w-md p-6">
        <h1 className="text-2xl font-bold text-center mb-4">🌤️ Weather Dashboard</h1>

        <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter city"
            className="flex-1 px-4 py-3 rounded-xl border 
             focus:ring-2 focus:ring-blue-400 
             transition"
          />
          <button className="px-5 py-3 rounded-xl bg-blue-500 
             hover:bg-blue-600 active:scale-95 
             transition text-white font-semibold">
            Search
          </button>
        </form>

        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {weather && (
          <div className="text-center space-y-2">
            <h2 className="text-xl font-semibold">
              {weather.name}, {weather.sys.country}
            </h2>
            <img
              className="mx-auto"
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="icon"
            />
            <p className="text-4xl font-bold">{Math.round(weather.main.temp)}°C</p>
            <p className="capitalize">{weather.weather[0].description}</p>

            <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
              <div className="bg-gray-100 rounded-lg p-2">
                💨 Wind
                <div className="font-semibold">{weather.main.humidity}%</div>
              </div>
              <div className="bg-gray-100 rounded-lg p-2">
                💨 Wind
                <div className="font-semibold">{weather.wind.speed} m/s</div>
              
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 