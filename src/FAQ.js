import React from 'react';
import './help.css';
const FAQ = () => {
  const faqs = [
    { question: 'How do I use the dashboard?', answer: 'You can use the dashboard to track COVID-19 statistics and Historical data.' },
    { question: 'Where does the data come from?', answer: 'The data is sourced from official health organizations like World Health Organization (WHO).' },
    { question: 'How is the data on the dashboard updated?', answer: 'Data is usually updated daily or in real-time, depending on the source. The dashboards pull data from various health departments, hospitals, and other official sources'},
    { question: 'What information can I find on a COVID-19 dashboard?', answer: 'COVID-19 dashboards typically provide data on confirmed cases, deaths, recoveries, testing rates, and vaccination rates. They often include filters to view data by country, state, or county'},
    
    { question: 'Where can I find historical data on COVID-19 cases and deaths?', answer:'Historical data is usually available on the dashboard, allowing users to track trends over time. This data can often be downloaded for further analysis'},
  ];
  
  
  return (
    <div className='leap'>
      <h3><u>Frequently Asked Questions (FAQ) </u></h3>
      {faqs.map((faq, index) => (
        <div key={index}>
          <h3><strong>{faq.question}</strong></h3>
          <p>{faq.answer}</p>
        </div>
      ))}
    </div>
  );
};

export default FAQ;
