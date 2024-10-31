import { useState } from "react";
import { useNavigate } from "react-router-dom";
import pickoi1 from "../assets/image/pickoi1.png";
import pickoi2 from "../assets/image/pickoi2.png";
import pickoi3 from "../assets/image/pickoi3.png";
import packaging from "../assets/image/packaging.png";
import deliveryInsurance from "../assets/image/deliveryInsurance.png";
import health from "../assets/image/health.png";
import "./PriceList.css";

function PriceList() {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);

  const navigate = useNavigate();

  const increment1 = () => setCount1((c) => c + 1);
  const increment2 = () => setCount2((c) => c + 1);
  const increment3 = () => setCount3((c) => c + 1);

  const decrement1 = () => {
    if (count1 > 0) setCount1((c) => c - 1);
    else
      alert(
        "Sorry, you could not decrement when amount of boxes begins from Zero ..."
      );
  };

  const decrement2 = () => {
    if (count2 > 0) setCount2((c) => c - 1);
    else
      alert(
        "Sorry, you could not decrement when amount of boxes begins from Zero ..."
      );
  };

  const decrement3 = () => {
    if (count3 > 0) setCount3((c) => c - 1);
    else
      alert(
        "Sorry, you could not decrement when amount of boxes begins from Zero ..."
      );
  };

  const Delete1 = () => setCount1(0);
  const Delete2 = () => setCount2(0);
  const Delete3 = () => setCount3(0);

  const [startPlace, setStartPlace] = useState("");
  const [endPlace, setEndPlace] = useState("");
  const [selectedServices, setSelectedServices] = useState(null);

  const [deliveryType, setDeliveryType] = useState(null);

  const [orderID, setOrderID] = useState();

  const boxPrices = [1200000, 700000, 400000]; // Large Box, Medium Box, Small Box

 

  const calculateTotalPrice = () => {
    let total = 0;
    //TỔNG CÁC BOXES ĐÃ CHỌN
    total += count1 * boxPrices[0]; // Large Box
    total += count2 * boxPrices[1]; // Medium Box
    total += count3 * boxPrices[2]; // Small Box

    // GIÁ DỊCH VỤ ĐÃ CHỌN
    if (selectedServices === 1) {
      total += 200000;
    } else if (selectedServices === 2) {
      total += 150000;
    } else if (selectedServices === 3) {
      total += 500000;
    }

    // LOẠI HÌNH VẬN CHUYỂN theo ID

    if (deliveryType === 1) {
      total += 300000;
    } else if (deliveryType === 2) {
      total += 850000;
    }

    return total;
  };

  // XỬ LÝ KHI CHỌN DỊCH VỤ (SERVICES)
  const handleServiceChange = (e) => {
    const valuee = e.target.value;
    // if (valuee === 'packaging') {
    //     setSelectedServices(1);
    // } else if (valuee === 'health') {
    //     setSelectedServices(2);
    // } else if(valuee === 'insurance') {
    //     setSelectedServices(3);
    // }
    switch (valuee) {
      case "packaging":
        setSelectedServices(1);
        break;
      case "health":
        setSelectedServices(2);
        break;
      case "insurance":
        setSelectedServices(3);
        break;
      default:
        return;
    }
  };

  // XỬ LÝ KHI CHỌN LOẠI HÌNH VẬN CHUYỂN (DELIVERY)
  const handleDeliveryChange = (e) => {
    const value = e.target.value;
    if (value === "standard") {
      setDeliveryType(1); // Assuming 1 for standard
    } else if (value === "express") {
      setDeliveryType(2); // Assuming 2 for express
    }
  };

  //TẠO ĐỐI TƯỢNG DỮ LIỆU ĐỂ GỬI YÊU CẦU LÊN API
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!startPlace || !endPlace) {
      alert("Please fill out all fields and select delivery type.");
      return;
    }

    const data = {
      orderID: orderID,
      startPlace: startPlace,
      endPlace: endPlace,
      boxes: [
        { boxid: 1, quantity: count1 }, // Large Box
        { boxid: 2, quantity: count2 }, // Medium Box
        { boxid: 3, quantity: count3 }, // Small Box
      ],
      serviceID: selectedServices ? selectedServices : 0,
      deliveryID: deliveryType ? deliveryType : 0, // Ensure it sends a valid ID
      totalPrice: calculateTotalPrice(), // Tính tổng giá
    };

    try {
      const response = await fetch("http://localhost:8080/orders/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Lỗi phản hồi từ API: " + response.status);
      }

      const responseData = await response.json();
      localStorage.setItem("orderID", responseData.orderId);
      console.log("Phản hồi từ API:", responseData);
      // ĐIỀU HƯỚNG TỚI TRANG ORDER CREATED SUCCESSFULLY
      navigate("/OrderInformation", { state: { data } });
    } catch (error) {
      console.error("Đã xảy ra lỗi khi gửi yêu cầu POST:", error);
    }
  };

  return (
    <>
      <div className="PriceList-main-priceList">
        <p>🚚 Koi Delivery Service Price List 🎏</p>
      </div>

      <div className="PriceList-BoxChoosing">
        <div className="PriceList-paymentmethods">Box Choosing</div>
        <div className="PriceList-message">
          📦📦Please choose boxes suited for you📦📦
        </div>
      </div>

      <div className="PriceList-main-order">
        <div className="PriceList-main-pic">
          <div className="PriceList-pic-koi1">
            <div className="PriceList-price">
              <img src={pickoi1} alt="PIC KOI 1" />
              <p>1.200.000 vnđ</p>
            </div>
            <div className="PriceList-pic1">
              <p>Large Box (S01)</p>
              <div className="PriceList-info-box">
                <p>
                  Contains at least <br /> <span>10-20</span> Koi Fish totality
                </p>
              </div>
              <div className="PriceList-amount1">
                <button className="decrement-button1" onClick={decrement1}>
                  -
                </button>
                <button className="PriceList-count1">{count1}</button>
                <button
                  className="PriceList-increment-button1"
                  onClick={increment1}
                >
                  +
                </button>
              </div>
              <div className="PriceList-amount1-button">
                <button className="PriceList-button" onClick={Delete1}>
                  Delete
                </button>
              </div>
            </div>
          </div>

          <div className="PriceList-pic-koi2">
            <div className="PriceList-price">
              <img src={pickoi2} alt="PIC KOI 2" />
              <p>700.000 vnđ</p>
            </div>
            <div className="PriceList-pic2">
              <p>Medium Box (S02)</p>
              <div className="PriceList-info-box">
                <p>
                  Contains at least <br /> <span>5-10</span> Koi Fish
                </p>
              </div>
              <div className="PriceList-amount2">
                <button className="decrement-button2" onClick={decrement2}>
                  -
                </button>
                <button className="PriceList-count2">{count2}</button>
                <button
                  className="PriceList-increment-button2"
                  onClick={increment2}
                >
                  +
                </button>
              </div>
              <div className="PriceList-amount2-button">
                <button className="PriceList-button" onClick={Delete2}>
                  Delete
                </button>
              </div>
            </div>
          </div>

          <div className="PriceList-pic-koi3">
            <div className="PriceList-price">
              <img src={pickoi3} alt="PIC KOI 3" />
              <p>400.000 vnđ</p>
            </div>
            <div className="PriceList-pic3">
              <p>Small Box (S03)</p>
              <div className="PriceList-info-box">
                <p>
                  Contains at least <br /> <span>3-5</span> Koi Fish maximum
                </p>
              </div>
              <div className="PriceList-amount3">
                <button className="decrement-button3" onClick={decrement3}>
                  -
                </button>
                <button className="PriceList-count3">{count3}</button>
                <button
                  className="PriceList-increment-button3"
                  onClick={increment3}
                >
                  +
                </button>
              </div>
              <div className="PriceList-amount3-button">
                <button className="PriceList-button" onClick={Delete3}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="PriceList-Servicess">
        <div className="PriceList-paymentmethods">Services</div>
        <div className="PriceList-message">
          ❤️ Taking care is our responsibility ❤️ <br />
          😍 You could also choose services that make you comfortable 😍
        </div>
        <div className="PriceList-Services">
          <div className="PriceList-package">
            <label>
              <input
                type="radio"
                name="Services"
                value="packaging"
                onChange={handleServiceChange}
                checked={selectedServices === 1}
              />
              <img src={packaging} alt="Professional Packing" />
              <h4>Professional Packaging</h4>
              <p>200.000 vnđ</p>
            </label>
          </div>

          <div className="PriceList-health">
            <label>
              <input
                type="radio"
                name="Services"
                value="health"
                onChange={handleServiceChange}
                checked={selectedServices === 2}
              />
              <img src={health} alt="Health Checking" />
              <h4>Health Checking</h4>
              <p>150.000 vnđ</p>
            </label>
          </div>

          <div className="PriceList-insurance">
            <label>
              <input
                type="radio"
                name="Services"
                value="insurance"
                onChange={handleServiceChange}
                checked={selectedServices === 3}
              />
              <img src={deliveryInsurance} alt="Delivery Insurance" />
              <h4>Delivery Insurance</h4>
              <p>500.000 vnđ</p>
            </label>
          </div>
        </div>

        <div className="PriceList-Informationnn">
          <div className="PriceList-DeliveryAddress">
            <div className="PriceList-form">
              <h3>Delivery Information Form</h3>
              <div className="PriceList-input">
                <label htmlFor="pickupPoint">Pick-up</label>
                <textarea
                  id="pickupPoint"
                  name="pickupPoint"
                  placeholder="From"
                  value={startPlace}
                  onChange={(e) => setStartPlace(e.target.value)}
                ></textarea>
              </div>
              <div className="PriceList-input">
                <label htmlFor="deliveryPoint">Destination</label>
                <textarea
                  id="deliveryPoint"
                  name="deliveryPoint"
                  placeholder="To"
                  value={endPlace}
                  onChange={(e) => setEndPlace(e.target.value)}
                ></textarea>
              </div>
            </div>
          </div>

          <div className="PriceList-DeliveryTypes">
            <div className="PriceList-paymentmethodss">Delivery Categories</div>
            <div className="PriceList-line"></div>
            <div className="PriceList-message">
              🚚 Customer is our Core Priority 🚚 <br />
              We could not step in operation smoothly without you ❤️
            </div>

            <div className="PriceList-Delivery">
              <div className="PriceList-Delivery-map">
                <label>
                  <input
                    type="radio"
                    name="Delivery"
                    value="standard"
                    onChange={handleDeliveryChange}
                    checked={deliveryType === 1}
                  />
                  <h4>Standard Delivery</h4>
                  <p>300.000 vnđ</p>
                </label>
              </div>
              <div className="PriceList-Delivery-map">
                <label>
                  <input
                    type="radio"
                    name="Delivery"
                    value="express"
                    onChange={handleDeliveryChange}
                    checked={deliveryType === 2}
                  />
                  <h4>Express Delivery</h4>
                  <p>850.000 vnđ</p>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="PriceList-buttonn">
        <button type="submit" onClick={handleSubmit}>
          Order Completion
        </button>
      </div>
    </>
  );
}

export default PriceList;
