import HeaderOrderTracking from "../../Components/HeaderOrderTracking.jsx";
import React from "react";
import "../../Components/ThanksForPayments.css";
function ThanksForPayments() {
  return (
    <div>
      <HeaderOrderTracking></HeaderOrderTracking>
      <div className="TYFP-Container">
        <h1 className="TYPM">
          Thank You So Much For Your Purchase! Hope To See You Soon.
        </h1>
        <button className="btnReturn">Return</button>
      </div>
    </div>
  );
}

export default ThanksForPayments;
