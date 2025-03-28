import React, { useState, useRef, useEffect } from 'react';
import './Dropdown.scss';

// Define types for props
interface DropdownProps {
    options: string[];
    onSelect?: (option: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ options, onSelect }) =>
{
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selected, setSelected] = useState<string>('');

    const filteredOptions = options.filter(option =>
        option.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSelect = (option: string): void =>
    {
        setSelected(option);
        setSearchTerm('');
        setIsOpen(false);
        if (onSelect)
        {
            onSelect(option);
        }
    };

     // Close the dropdown if a click outside is detected
    useEffect(() => {
        let handler = () => {
            setIsOpen(false);
        }
        document.addEventListener('mousedown', handler);
    });

    return (
        <div className="dropdown">
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsOpen(true)}
            />

            {isOpen && filteredOptions.length > 0 && (
                <ul>
                    {filteredOptions.map(option => (
                        <li
                            key={option}
                            onClick={() => handleSelect(option)}
                        >
                            {option}
                        </li>
                    ))}
                </ul>
            )}

            {isOpen && filteredOptions.length === 0 && (
                <div className="no-results">No results found</div>
            )}
        </div>
    );
};

export default Dropdown;