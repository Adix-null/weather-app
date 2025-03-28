import React from 'react';
import { useState } from 'react';
import './Entry.scss';

//const [city] = useState('');
//const [temperature, wind, humidity] = useState(0);
interface EntryProps {
    data: (string | Number)[];
}

const Entry: React.FC<EntryProps> = ({data}) =>
{
    return (
        <div className="entry">
            {data.map((date, key) => (
                <span key={key}>
                    {date.toString()}
                </span>            
            ))}
        </div>

    );
}

export default Entry;