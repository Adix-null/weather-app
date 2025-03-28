import React from 'react';
import { useState } from 'react';
import './CitySuggestions.scss';

interface EntryProps {
    data: (string)[];
}

const CitySuggestions: React.FC<EntryProps> = ({data}) =>
{
    return (
        <div className="suggestion">
            {data.map((date, key) => (
                <button key={key}>
                    {date.toString()}
                </button>            
            ))}
        </div>
    )
}

export default CitySuggestions;