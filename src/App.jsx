import React from 'react';
import './styles.scss';
import Dropdown from './Dropdown/Dropdown';

function App()
{
    const cities = ['Vilnius', 'Shanghai', 'Seattle'];

    const handleSelection = (selected) =>
    {
        console.log('Selected city:', selected);
    };

    return (
        <div className="container">
            <h1>Search for a city</h1>
            <Dropdown options={cities} onSelect={handleSelection} />
        </div>
    );
}

export default App;
