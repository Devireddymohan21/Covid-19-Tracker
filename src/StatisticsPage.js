import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./Dashboard.css";
import Navbar from './Navbar';

const StatisticsPage = () => {
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [statistics, setStatistics] = useState(null);
    const [loading, setLoading] = useState(false);
    const [token,setToken]=useState('');
    const navigate=useNavigate();

    const handleNullValue = (value) => {
        return value !== null && value !== undefined ? value : 0 ;
    };

    const fetchCountries = async () => {
        try {
            const response = await axios.get(`http://localhost:8891/countries`);
            return response.data.response;
        } catch (error) {
            console.error("Error fetching countries:", error);
            throw error;
        }
    };

    const fetchStatistics = async (country) => {
        try {
            const response = await axios.get(`http://localhost:8891/statistics?country=${country}`,
                {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer '+token,
                        'Content-Type': 'application/json'
                    }
                    });
                if (response.data.status==='success'){
                    return response.data.data;
                }     
                else{
                    return response.data.message;
                }
            

        } catch (error) {
            console.error("Error fetching statistics:", error);
            alert("Your Session Time has been Expired please login again ");
            navigate('/login');
            throw error;
        }
    };

    useEffect(() => {
        setToken(localStorage.getItem("token"));
        const getCountries = async () => {
            try {
                const countriesData = await fetchCountries();
                setCountries(countriesData);
            } catch (error) {
                console.error("Error fetching countries:", error);
            }
        };

        getCountries();
    }, []);

    const handleFetchStatistics = async () => {
        
        if (selectedCountry) {
            setLoading(true);
            try {
                const statisticsData = await fetchStatistics(selectedCountry);
                setStatistics(statisticsData);

            } catch (error) {
                console.error("Error fetching statistics:", error);
            } finally {
                setLoading(false);
            }
        }
    };
    console.log(token);
    return (
        <>
            <Navbar/>
        <div className='lafda'>
           
        <div className="conta">
            <h1>COVID-19 Statistics</h1>
            
            <div className="form-group">
            <label htmlFor="country">Select Country</label>
                <select
                    id="country"
                    className="form-control"
                    value={selectedCountry}
                    onChange={e => setSelectedCountry(e.target.value)}
                >
                    <option value="">Select a country</option>
                    {countries.map(country => (
                        <option key={country} value={country}>{country}</option>
                    ))}
                </select>

            <button className="btn btn-primary" onClick={handleFetchStatistics} disabled={loading}>
                {loading ? 'Loading...' : 'Fetch Statistics'}
            </button>
            {loading && <div className="loading-message">Loading data, please wait...</div>}
            {statistics && !loading && (
                <div className="statistics-card">
                    <h2>Statistics for {statistics.country}</h2>
                    <p><strong>Continent:</strong> {statistics.continent}</p>
                    <p><strong>Population:</strong> {handleNullValue(statistics.population)}</p>
                    <p><strong>Total Cases:</strong> {handleNullValue(statistics.cases.total)}</p>
                    <p><strong>Active Cases:</strong> {handleNullValue(statistics.cases.active)}</p>
                    <p><strong>New Cases:</strong> {handleNullValue(statistics.cases.new)}</p>
                    <p><strong>Total Recovered:</strong> {handleNullValue(statistics.cases.recovered)}</p>
                    <p><strong>Total Deaths:</strong> {handleNullValue(statistics.deaths.total)}</p>
                    <p><strong>Total Tests:</strong> {handleNullValue(statistics.tests.total)}</p>
                    <p><strong>Till Date & Time:</strong> {statistics.time}</p>
                </div>
            )}
        </div>
        </div>
        </div>
        </>
    );
};

export default StatisticsPage;
