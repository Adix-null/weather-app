import React, { useState, useEffect } from "react";
import "./Dropdown.scss";
import { City } from "../common";

// Define types for props
interface DropdownProps {
	options: City[];
	onSelect: (option: City) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ options, onSelect }) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [selected, setSelected] = useState<City>();

	const filteredOptions = options.filter((option) => option.city.toLowerCase().includes(searchTerm.toLowerCase()));

	const top5Options = filteredOptions.slice(0, 5);

	const handleSelect = (option: City): void => {
		setSelected(option);
		setSearchTerm("");
		setIsOpen(false);
		onSelect(option);
	};

	const dropdownRef = React.useRef<HTMLDivElement | null>(null);
	//Close the dropdown if a click outside is detected
	useEffect(() => {
		const handler = (event: MouseEvent) => {
			// Close dropdown only if the click is outside the dropdown
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handler);
	});

	return (
		<div className="dropdown" ref={dropdownRef}>
			<input
				type="text"
				placeholder="Search..."
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				onFocus={() => setIsOpen(true)}
			/>

			{isOpen && top5Options.length > 0 && (
				<ul>
					{top5Options.map((option) => (
						<li key={option.id} onClick={() => handleSelect(option)}>
							{option.city}
						</li>
					))}
				</ul>
			)}

			{isOpen && top5Options.length === 0 && <div className="no-results">No results found</div>}
		</div>
	);
};

export default Dropdown;
