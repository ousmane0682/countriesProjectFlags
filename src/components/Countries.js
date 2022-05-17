import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Card from './Card';

const Countries = () => {
    const [data, setData] = useState([]);
    const [rangeValue, setRangeValue] = useState(36);
    const [selectedRadio, setSelectedRadio] = useState("");
    const radios = ['Africa', 'Europe', 'America', 'Asia', 'Oceania'];
    {/*the useEffect is buse when the component is up */ }
    useEffect(() => {
        axios.get("https://restcountries.com/v3.1/all").then((res) => setData(res.data));
    }, [])

    return (
        <div className='countries'>
            <ul className='radio-container'>
                <input type="range" min="1" max="250" defaultValue={rangeValue}
                    onChange={(e) => setRangeValue(e.target.value)} />
                {radios.map((continent) => (
                    <li>
                        <input type="radio" id={continent} name='continentRadios' checked={continent == selectedRadio}
                            onChange={(e) => setSelectedRadio(e.target.id)} />
                        <label htmlFor={continent}>{continent}</label>
                    </li>
                ))}

            </ul>
            {selectedRadio && <button onClick={() => setSelectedRadio("")}>Cancel Research</button>}
            <ul>
                {data
                    .filter((country) => country.continents[0].includes(selectedRadio))
                    .sort((a, b) => b.population - a.population)
                    .slice(0, rangeValue)
                    .map((country, index) => (
                        <Card key={index} country={country} />
                    ))}
            </ul>
        </div>
    );
};

export default Countries;