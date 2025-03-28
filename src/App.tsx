import React from 'react';
import './styles.scss';
import Dropdown from './Dropdown/Dropdown';
import Entry from './Entry/Entry';
import CitySuggestions from './CitySuggestions/CitySuggestions';

const App: React.FC = () =>
{
    const cities = ['Vilnius', 'Shanghai', 'Seattle'];
    const weatherData = [
        ['March 28th', 14, 13, 12],
        ['March 29th', 24, 73, 9],
        ['March 30th', 8, 53, 19],
        ['March 31st', 8, 53, 18],
        ['April 1st', 0, 0, 0],
        ['April 2nd', 0, 10, 10],
        ['April 3rd', 23, 13, 10],
    ];

    const handleSelection = (selected: String) =>
    {
        console.log('Selected city:', selected);
    };

    return (
        <div className="container">
            <h1>Search for a city</h1>
            <Dropdown options={cities} onSelect={handleSelection} />
            <CitySuggestions data={cities} />
            <Entry data={["Date", "Temperature", "Humidity", "Wind speed"]}/>
            {weatherData.map((entry, i) => (
                <Entry data={entry} key={i} />
            ))}
        </div>
    );
}

export default App;
