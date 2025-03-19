import { useState } from "react";

const WeatherPage = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    if (!city) return;

    try {
      const res = await fetch(`/api/weather?city=${city}`);
      const data = await res.json();

      if (res.ok) {
        setWeather(data);
        setError(null);
      } else {
        setError(data.error);
        setWeather(null);
      }
    } catch (err) {
      setError("Something went wrong");
      setWeather(null);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-blue-800 p-6">
      <div className="bg-white shadow-xl rounded-lg p-6 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">🌤 Weather App</h1>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
        />
        <button
          onClick={fetchWeather}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300"
        >
          Get Weather
        </button>

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}

        {weather && (
          <div className="mt-6 p-6 bg-gray-100 rounded-lg shadow-md text-center">
            <h2 className="text-xl font-bold text-gray-800">{weather.city}</h2>
            <p className="text-5xl font-bold text-gray-700 my-2">{weather.temp}°C</p>
            <p className="text-lg text-gray-600 capitalize">{weather.description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherPage;
