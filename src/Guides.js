import React from 'react';
const Guides = () => {
  const guides = [
    { title: 'Getting Started', content: 'Here is how you get started with the dashboard...' },
    { title: 'Understanding the Data', content: 'This guide explains how to interpret the data...' },
  ];

  return (
    
      <div className='leap'>
        <h3><b>Setup Instructions</b></h3>
        <h3><u>Prerequisites</u></h3>
        – Node.js and npm installed<br/>
        – tornado framework should be installed and running<br/>
        <br/>
        <hr/>
        <br/>
        <h3><b>Usage Guidelines</b></h3>
        <br/>
        <h4><u>Accessing the Dashboard</u></h4>
        – Open your browser and navigate to http://localhost:3000 to access the dashboard.
        <h4><u>User Authentication</u></h4>
        – Sign Up: Create a new account using the sign-up form.<br/>
        – Login: Log in using your credentials to access personalized features and return a JWT.<br/>
        <h4><u>Viewing Data</u></h4>
        – Select Country: Use the dropdown menu to select a country.<br/>
        – Select Date: Use the date picker to select a specific date for historical data.<br/>
        – Fetch Data: Click the “Fetch History” and "Fetch Statistics" button to retrieve and display data.<br/>
      </div>
  );
};

export default Guides;
