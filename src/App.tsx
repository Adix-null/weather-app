import React from 'react';
import './styles.scss';
import Dropdown from './Dropdown/Dropdown';
import Entry from './Entry/Entry';

const App: React.FC = () =>
{
    const cities = ['Vilnius', 'Shanghai', 'Seattle'];
    const weatherData = [
        ['Vilnius', 14, 13, 12],
        ['Shanghai', 24, 73, 9],
        ['Seattle', 8, 53, 19]
    ];

    const handleSelection = (selected: String) =>
    {
        console.log('Selected city:', selected);
    };

    return (
        <div className="container">
            <h1>Search for a city</h1>
            <Dropdown options={cities} onSelect={handleSelection} />
            {weatherData.map(entry => (
                <Entry data={entry} />
            ))}
        </div>
    );
}

export default App;
