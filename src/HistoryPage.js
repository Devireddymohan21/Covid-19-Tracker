import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import "./Dashboard.css";
import Navbar from "./Navbar";

const HistoryPage = () => {
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [historyData, setHistoryData] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [token,setToken]=useState('');
    const [temp, setTemp]=useState('');

    const fetchCountries = async () => {
        try {
            const response = await axios.get(`http://localhost:8891/countries`);
            return response.data.response;
        } catch (error) {
            console.error("Error fetching countries:", error);
            throw error;
        }
    };

    const fetchHistory = async (country, day) => {
        try {
            const response = await axios.get(`http://localhost:8891/history?country=${country}&day=${day}`
            ,{
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer '+ token,
                    'Content-Type': 'application/json'
                }
         
                });
            setTemp(response.data.message);
            console.log(temp);
            if (response.data.status === 'success'){
                return response.data.content.response;
            }
        } catch (error) {
            console.error("Error fetching history:", error);
            alert("Your Session Time has been Expired please login again ");
            navigate('/login');
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

    const handleFetchHistory = async () => {
        if (selectedCountry && selectedDate) {
            setLoading(true);
            try {
                const data = await fetchHistory(selectedCountry, selectedDate);
                setHistoryData(data);
            } catch (error) {
                console.error("Error fetching history:", error);
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
            <h1>COVID-19 History Data</h1>

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
            </div>

            <div className="form-group">
                <label htmlFor="date">Select Date</label>
                <input
                    type="date"
                    id="date"
                    className="form-control"
                    value={selectedDate}
                    onChange={e => setSelectedDate(e.target.value)}
                />
            
            </div>
            
            <button className="btn btn-primary" onClick={handleFetchHistory} disabled={loading}>
                {loading ? 'Loading...' : 'Fetch History'}
            </button>

            {loading && <div className="loading-message ">Loading data, please wait...</div>}

            {historyData && !loading && (
                <span className="history-card">
                    <h2>History Data for {selectedCountry} on {selectedDate}</h2>
                    {historyData.length > 0 ? (
                        <ul>
                            {historyData.map((entry, index) => (
                                <li key={index} className='hist'>
                                    <p><strong>Continent:</strong> {entry.continent}</p>
                                    <p><strong>Population:</strong> {entry.population}</p>
                                    <p><strong>Total Cases:</strong> {entry.cases.total}</p>
                                    <p><strong>New Cases:</strong> {entry.cases.new}</p>
                                    <p><strong>Active Cases:</strong> {entry.cases.active}</p>
                                    <p><strong>Total Deaths:</strong> {entry.deaths.total}</p>
                                    <p><strong>Total Recovered:</strong> {entry.cases.recovered}</p>
                                    <p><strong>Total Tests:</strong> {entry.tests.total}</p>
                                    <p><strong>Till Date & Time:</strong> {entry.time}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className='hist'>No data available for the selected date.</p>
                    )}
                </span>
                
            )}
        </div>
        </div>
        </>
    );
};

export default HistoryPage;
