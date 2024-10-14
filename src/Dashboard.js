import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className='contain'>
      <h1>COVID-19 Dashboard</h1>
      <div className="cont">
        <p>
          The COVID-19 pandemic has had a profound impact on the entire world, affecting every aspect of daily life and global systems.
          In 2020, COVID-19 emerged as one of the most significant global events in modern history, resulting in over 75 million cases and 1.6 million deaths worldwide. 
          The virus has disrupted work, education, and everyday activities, causing unprecedented changes in societies.
          Explore further to understand the full extent of COVID-19's impact globally and view detailed statistics and historical data.
        </p>
        <div className="smi">
          <button onClick={() => navigate('/login')}>Get Details</button>
        </div>
      </div>
      <hr />
      <div className="sm">
        <p>If you have any Queries Please <button onClick={() => navigate('/contact_us')}>contact</button></p>
      </div>
    </div>
  );
};

export default Dashboard;
