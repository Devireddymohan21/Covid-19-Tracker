import React from 'react';
import FAQ from './FAQ';
import Guides from './Guides';
import ProductDocumentation from './ProductDocumentation';
import './help.css';
const HelpPage = () => {
  return (
    <>
    <a className="buts" href="/home">Back</a>
    <h1>Help and Support</h1>
      <h4>Here you will find detailed information about the COVID-19 dashboard...</h4>
    <div className='sleep'>
    <ProductDocumentation />
    <div className='slept'>

      <FAQ />
      <Guides />

    </div>
    </div>
    </>
  );
};

export default HelpPage;
