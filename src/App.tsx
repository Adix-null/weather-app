import React, { useEffect, useState } from "react";
import "./styles.scss";
import Dropdown from "./Dropdown/Dropdown";
import Entry from "./Entry/Entry";
import CitySuggestions from "./CitySuggestions/CitySuggestions";
import { getWeatherData } from "./APIfetch";
import { formatDate, WeatherData } from "./common";
import { loadCities } from "./parseCSV";

const App: React.FC = () => {
	const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		getWeatherData()
			.then((data) => setWeatherData(data))
			.catch((err) => {
				setError("Failed to fetch weather data.");
				console.error(err);
			});
	}, []);

	const [cities, setCities] = useState<string[]>([]);
	useEffect(() => {
		const fetchData = async () => {
			const responser = await fetch("/cities.csv");
			//const cityData = await loadCities("cities.csv");
			//setCities(cityData);
		};

		fetchData().catch(console.error);
	}, []);

	const handleSelection = (selected: String) => {
		console.log("Selected city:", selected);
	};

	if (!weatherData) {
		return <div>Loading...</div>;
	}

	return (
		<div className="container">
			<h1>Search for a city</h1>
			<Dropdown options={cities} onSelect={handleSelection} />
			{/* <CitySuggestions data={cities} /> */}
			<Entry data={["Date", "Temperature °C", "Humidity %", "Wind speed m/s"]} />

			{weatherData.hourly.time.map((entry, i) => (
				<Entry
					data={[
						formatDate(entry.toISOString(), weatherData.timezone, weatherData.timezoneAbbreviation),
						weatherData.hourly.windSpeed10m[i],
						weatherData.hourly.relativeHumidity2m[i],
						weatherData.hourly.temperature2m[i],
					]}
					key={i}
				/>
			))}
			<img src="/test.jpg"></img>
		</div>
	);
};

export default App;
