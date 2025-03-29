import React from "react";
import "./CitySuggestions.scss";
import { City } from "../common";

interface EntryProps {
	data: City[];
	onSelect: (option: City) => void;
}

const CitySuggestions: React.FC<EntryProps> = ({ data, onSelect }) => {
	function handleSelect(option: City): void {
		onSelect(option);
	}

	return (
		<div className="suggestion">
			{data.map((option, key) => (
				<button key={key} onClick={() => handleSelect(option)}>
					{option.city}
				</button>
			))}
		</div>
	);
};

export default CitySuggestions;
