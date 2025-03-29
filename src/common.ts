export interface WeatherData {
	hourly: {
		time: Date[];
		windSpeed10m: Float32Array;
		relativeHumidity2m: Float32Array;
		temperature2m: Float32Array;
	};
	timezone: string;
	timezoneAbbreviation: string;
}

export const formatDate = (isoString: string, timezone: string, abbreviation: string): string => {
	const date = new Date(isoString);

	return date
		.toLocaleString("en-US", {
			month: "long",
			day: "numeric",
			hour: "numeric",
			hour12: true, // Ensures 'am' or 'pm' is shown
			timeZone: timezone, // Ensures consistent timezone handling
		})
		.replace(/GMT[\d\-\+]+/, abbreviation)
		.replace(" at", "");
};
