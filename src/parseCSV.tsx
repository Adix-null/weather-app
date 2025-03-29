import Papa from "papaparse";

interface City {
	name: string;
	latitude: number;
	longitude: number;
	country: string;
	countryISO: string;
}

export const loadCities = async (csvPath: string): Promise<string[]> => {
	const response = await fetch(csvPath);
	const csvData = await response.text();

	return new Promise((resolve, reject) => {
		Papa.parse<City>(csvData, {
			header: true,
			skipEmptyLines: true,
			complete: (result) => {
				const cityNames = result.data.map(
					(city) => (city.name, city.latitude, city.longitude, city.country, city.countryISO)
				);
				resolve(cityNames);
			},
			error: (error: any) => reject(error),
		});
	});
};
