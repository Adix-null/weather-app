import React, { useEffect, useState } from "react";
import Dropdown from "./Dropdown/Dropdown";
import Entry from "./Entry/Entry";
import CitySuggestions from "./CitySuggestions/CitySuggestions";
import { getWeatherData } from "./APIfetch";
import { formatDate, WeatherData, City } from "./common";
import "./App.scss";
import Papa from "papaparse";

const App: React.FC = () => {
	const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [selectedCity, setSelectedCity] = useState<City | null>(null);
	const [recentCities, setRecentCities] = useState<City[]>([]);

	const defaultCity: City = {
		city: "Vilnius",
		lat: 54.6872,
		lng: 25.28,
		country: "Lithuania",
		iso3: "LTU",
		id: 1440887149,
	};

	useEffect(() => {
		const storedCities = JSON.parse(localStorage.getItem("recentCities") || "[]");
		setRecentCities(storedCities);

		getWeatherData(defaultCity.lat, defaultCity.lng)
			.then((data) => setWeatherData(data))
			.catch((err) => {
				setError("Failed to fetch weather data.");
				console.error(err);
			});
	}, []);

	const [cities, setCities] = useState<City[]>([]);

	useEffect(() => {
		fetch("/cities.csv")
			.then((response) => response.text())
			.then((csvData) => {
				Papa.parse(csvData, {
					header: true,
					delimiter: ";",
					skipEmptyLines: true,
					complete: (result) => {
						// Map parsed CSV to city data structure
						const citiesData = result.data.map((row: any) => ({
							city: row.city,
							lat: parseFloat(row.lat),
							lng: parseFloat(row.lng),
							country: row.country,
							iso3: row.iso3,
							id: row.id,
						}));
						setCities(citiesData);
					},
				});
			});
	}, []);

	const handleSelection = (city: City) => {
		setSelectedCity(city);
		console.log(`Selected city: ${city.city}`);

		const storedCities = JSON.parse(localStorage.getItem("recentCities") || "[]");

		const updatedCities = [
			city,
			...storedCities.filter((c: City) => c.id !== city.id), // Avoid duplicates
		].slice(0, 3); // Keep only the latest 3 cities

		localStorage.setItem("recentCities", JSON.stringify(updatedCities));
		setRecentCities(storedCities);

		try {
			getWeatherData(city.lat, city.lng)
				.then((data) => setWeatherData(data))
				.catch((err) => {
					setError("Failed to fetch weather data.");
					console.error(err);
				});
		} catch (error) {
			console.error("Failed to fetch weather data:", error);
		}
	};

	if (!weatherData) {
		return <div>Loading...</div>;
	} else {
		return (
			<div className="container">
				<h1>Search for a city</h1>
				<Dropdown options={cities} onSelect={handleSelection} />
				<CitySuggestions data={recentCities} onSelect={handleSelection} />

				<h1>{selectedCity ? selectedCity.city : defaultCity.city}</h1>
				<Entry data={["Date", "Temperature °C", "Humidity %", "Wind speed m/s"]} />

				{weatherData.hourly.time.map((entry, i) => (
					<Entry
						data={[
							formatDate(entry.toISOString(), weatherData.timezone, weatherData.timezoneAbbreviation),
							weatherData.hourly.windSpeed10m[i].toFixed(1),
							weatherData.hourly.relativeHumidity2m[i],
							weatherData.hourly.temperature2m[i].toFixed(1),
						]}
						key={i}
					/>
				))}
			</div>
		);
	}
};

export default App;
