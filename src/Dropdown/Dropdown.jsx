import React from 'react';
import { useState } from 'react';
import './Dropdown.scss';

function Dropdown({ options, onSelect })
{
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selected, setSelected] = useState('');

    const filteredOptions = options.filter(option =>
        option.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSelect = (option) =>
    {
        setSelected(option);
        setSearchTerm('');
        setIsOpen(false);
        if (onSelect)
        {
            onSelect(option);
        }
    };

    return (
        <div className="dropdown">
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm || selected}
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
}

export default Dropdown;