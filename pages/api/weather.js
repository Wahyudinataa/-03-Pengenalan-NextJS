export default async function handler(req, res) {
  const { city } = req.query;
  const apiKey = "f1679d67ae7634cebd9c6041bae991ad";
  
  const weatherRes = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
  );
  const weatherData = await weatherRes.json();

  if (weatherRes.ok) {
    res.status(200).json({
      temp: weatherData.main.temp,
      description: weatherData.weather[0].description,
    });
  } else {
    res.status(400).json({ error: "Failed to fetch weather data" });
  }
}
