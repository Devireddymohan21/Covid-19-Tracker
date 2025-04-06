import React from 'react';
import Navbar from './Navbar';
import './Home.css';
const Home = () => {
  return (
    <>
    <Navbar/>
    <div className="ski">
        <h3>Welcome to the COVID-19 Dashboard. </h3>
        <p>
By 31 December 2020, this figure stood at 1,813,188. Yet preliminary estimates suggest the total number of global deaths attributable to the COVID-19 pandemic in 2020 is at least 3 million, representing 1.2 million more deaths than officially reported.

With the latest COVID-19 deaths reported to WHO now exceeding 3.4 million, based on the excess mortality estimates produced for 2020, we are likely facing a significant undercount of total deaths directly and indirectly attributed to COVID-19.

COVID-19 deaths are a key indicator to track the evolution of the pandemic. However, many countries still lack functioning civil registration and vital statistics systems with the capacity to provide accurate, complete and timely data on births, deaths and causes of death.
</p>

        <div className="content">
            <p><strong>Symptoms, Precautions & Physical Health tips </strong></p>
        <a href='https://wexnermedical.osu.edu/infectious-diseases/covid-19/symptoms-and-prevention' target='_blank'><img src='https://wexnermedical.osu.edu/-/media/images/wexnermedical/pages/features/coronavirus/patient-care/symptoms/symptoms_web.png' alt="Symptoms of COVID-19"/></a>
        <a href='https://ocalafamilydoctor.com/covid-19-general-prevention/' target='_blank'><img src='https://ocalafamilydoctor.com/wp-content/uploads/2020/03/covid19_general_8-1536x1335.jpg' alt="Precautions need to be taken"/></a>
        <a href='https://www.who.int/southeastasia/health-topics/physical-activity' target='_blank'><img src='https://www.who.int/images/default-source/searo---images/health-topics/physical-activity/be-active-at-home-during-the-covid-19-outbreak.jpg?sfvrsn=12b58d80_2' alt="Physical Health tips"/></a>       
        </div>
        </div>
        <div className="navbar-nav">
        
      
    </div>
    </>
  )
}

export default Home;