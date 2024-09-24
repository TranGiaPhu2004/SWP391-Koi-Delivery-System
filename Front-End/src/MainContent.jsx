import React from 'react';
import './MainContent.css';
import Service1 from '../src/assets/image/Service1.png'
import Service2 from '../src/assets/image/Service2.png'
import Service3 from '../src/assets/image/Service3.png'

function MainContent() {
  return (
    <main>
      <section className="koi-delivery">
        <h1>KOI DELIVERY ORDERING SYSTEM</h1>
        <div className="cherry-blossom">🌸🌸🌸</div>
        
      </section>

      <section className="services">
        <div className="service-box">
          <img src={Service1} alt="Service 1" />
          <p>Receiving requests from foreign customers
support international payments make 
purchases from Japan handle cross-border 
      shipping and last-mile delivery</p>
        </div>
        <div className="service-box">
          <img src={Service2} alt="Service 2" />
          <p>Providing international air and sea freight services from Vietnam. 
We have various modes of operation and service options available
              to ensure fast, safe delivery at the lowest cost.</p>
        </div>
        <div className="service-box">
          <img src={Service3} alt="Service 3" />
          <p>Receiving requests from foreign customers
support international payments make 
purchases from Japan handle cross-border 
      shipping and last-mile deliver</p>
        </div>
      </section>
    </main>
  );
}

export default MainContent;
