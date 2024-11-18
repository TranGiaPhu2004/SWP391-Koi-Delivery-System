import React from 'react';
import './MainContent.css';
import Service1 from '../assets/image/services1.jpg'
import Service2 from '../assets/image/services2.jpg'
import Service3 from '../assets/image/packaging1.jpg'
import Service4 from '../assets/image/services4.jpg'
import Service5 from '../assets/image/services5.jpg'
import newkoi from '../assets/image/newKoi.jpg'

import boxkoi1 from "../assets/image/boxkoi1.jpg";
import boxkoi2 from "../assets/image/boxkoi2.jpg";
import boxkoi3 from "../assets/image/boxkoi3.jpg";
import packaging1 from "../assets/image/packaging1.jpg";
import insurance from "../assets/image/insurance.jpg";
// import healthcheck from "../assets/image/healthcheck1.jpg";
import standard1 from '../assets/image/standard1.jpg'
import standard2 from '../assets/image/standard2.jpg'

function MainContent() {
  return (
    <main>
      <section className="koi-delivery1">
        <img src={newkoi} alt="pic-koi" />
      </section>
      <section className="koi-delivery">
        <h1>KOI DELIVERY ORDERING SYSTEM</h1>

      </section>


      <section className="koi-delivery2">
        <h1>Box Choosing</h1>
        <p>The Koi Fish Box is a curated selection of premium koi fish, carefully chosen for their vibrant colors and unique patterns.
          Ideal for collectors and enthusiasts looking for top-quality koi to enhance their ponds.</p>
      </section>


      <div className="Koi-main-order">
        <div className="Koi-main-pic">
          <div className="Koi-pic-koi1">
            <div className="Koi-price">
              <img src={boxkoi1} alt="PIC KOII" />
            </div>
            <div className="Koi-pic1">
              <p>Large Box (S01)</p>
              <div className="Koi-info-box">
                <p>
                  Contains at least <br /> <span>10-12</span> Koi Fish totality,
                  fish size can exceed 78cm and weight can exceed 12 kg
                </p>
              </div>

            </div>
          </div>
          <br />
          <div className="Koi-pic-koi2">

            <div className="Koi-pic2">
              <p>Medium Box (S02)</p>
              <div className="Koi-info-box">
                <p>
                  Contains at least <br /> <span>5-10</span> Koi Fish, fish size
                  not exceed 78cm and weight not exceed 12 kg
                </p>
              </div>

            </div>
            <div className="Koi-price1">
              <img src={boxkoi2} alt="PIC KOI 2" />
            </div>
          </div>

          <br /><br />

          <div className="Koi-pic-koi3">
            <div className="Koi-price2">
              <img src={boxkoi3} alt="PIC KOI 3" />
            </div>
            <div className="Koi-pic3">
              <p>Small Box (S03)</p>
              <div className="Koi-info-box">
                <p>
                  Contains at least <br /> <span>1-5</span> Koi Fish maximum,
                  fish size not exeed 78cm and weight not exceed 12 kg
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>

      <br /><br /><br /><br />


      <section className="koi-delivery2">
        <h1>Services</h1>
        <p>The Koi Fish Box offers specialized services, including professional packaging1, secure delivery, and expert care guidance. Perfect for ensuring your koi arrive healthy and vibrant, ready to thrive in their new home.</p>
      </section>

      <div className="Koi-Services">
        <div className="Koi-package">
          <label>

            <img src={packaging1} alt="Professional Packing" />
            <h4>Professional Packaging</h4>
            <p>We provide high-quality, professional packaging to ensure the safety and well-being of your Koi fish during transit.
              </p><br/><p> Our packaging materials are designed to maintain optimal water conditions and minimize stress for the fish throughout the journey.</p>
          </label>
        </div>

        <div className="Koi-health">
          <label>

            <img src={boxkoi1} alt="Health Checking" />
            <h4>Health Checking</h4>
            <p>Before delivery, our team conducts a thorough health check on each Koi fish to guarantee they are in excellent condition. 
              </p><br/><p>We examine for any signs of illness, stress, or injury to ensure the Koi arrive healthy and ready for their new environment.</p>
          </label>
        </div>

        <div className="Koi-insurance">
          <label>

            <img src={insurance} alt="Delivery Insurance" />
            <h4>Delivery Insurance</h4>
            <p>Our delivery insurance offers peace of mind by covering any unexpected issues during transportation</p>.
            <br/> <p>In case of any damage or loss, you are fully protected, ensuring the safe arrival of your valuable Koi fish.</p>
          </label>
        </div>
      </div>


      <section className="koi-delivery2">
        <h1>Delivery Categories</h1>
        <p>Delivery Categories offer tailored shipping options, from standard delivery to express and specialized handling, ensuring your koi fish arrive safely and on time, no matter the distance.</p>
      </section>

      <div className="Koi-Delivery">
        <div className="Koi-Delivery-map">
          <label>
            <img src={standard1} alt="" />
            <h4>Standard Delivery</h4>
           
          </label>
        </div>
        <div className="Koi-Delivery-map">
          <label>
            <img src={standard2} alt="" />
            <h4>Express Delivery</h4>
          
          </label>
        </div>
      </div>

      <section className="koi-delivery3">
        <h1>Commitment</h1>
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

      <section className="services1">
        <div className="service-box">
          <img src={Service5} alt="Service 5" />
          <p>Your pleasure is our happiness <br />
            You will never walk alone ...
          </p>
        </div>
        <div className="service-box">
          <img src={Service4} alt="Service 4" />
          <p>We will never be paid attention to someone else ‘s voice
            Cuz of belivering, we staring at me with a smile proud <br />
            You are deserved with somethings that you made it.</p>
        </div>
      </section>



    </main>
  );
}

export default MainContent;
