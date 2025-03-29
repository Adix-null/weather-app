import { fetchWeatherApi } from "openmeteo";
import { WeatherData } from "./common";

const url = "https://api.open-meteo.com/v1/forecast";

// Helper function to form time ranges
const range = (start: number, stop: number, step: number) =>
	Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

// Process first location. Add a for-loop for multiple locations or weather models
// const response = responses[0];

export const getWeatherData = async (lat: number, lng: number): Promise<WeatherData> => {
	const responses = await fetchWeatherApi(url, {
		latitude: lat,
		longitude: lng,
		hourly: ["wind_speed_10m", "relative_humidity_2m", "temperature_2m"],
		temporal_resolution: "hourly_6",
	});
	const response = responses[0];

	// Attributes for timezone and location
	const utcOffsetSeconds = response.utcOffsetSeconds();
	const timezone = response.timezone();
	const timezoneAbbreviation = response.timezoneAbbreviation();

	const hourly = response.hourly()!;

	return {
		hourly: {
			time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
				(t) => new Date((t + utcOffsetSeconds) * 1000)
			),
			windSpeed10m: hourly.variables(0)!.valuesArray()!,
			relativeHumidity2m: hourly.variables(1)!.valuesArray()!,
			temperature2m: hourly.variables(2)!.valuesArray()!,
		},
		timezone: timezone ?? "UTC",
		timezoneAbbreviation: timezoneAbbreviation ?? "UTC",
	};
};
