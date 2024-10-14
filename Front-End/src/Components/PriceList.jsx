import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import pickoi1 from '../assets/image/pickoi1.png'
import pickoi2 from '../assets/image/pickoi2.png'
import pickoi3 from '../assets/image/pickoi3.png'
import packaging from '../assets/image/packaging.png'
import deliveryInsurance from '../assets/image/deliveryInsurance.png'
import health from '../assets/image/health.png'

import './PriceList.css'
function PriceList() {

    

    const [boxes, setBoxes] = useState([
        { boxid: 'S01', quantity: 0, price: 400000 },
        { boxid: 'S02', quantity: 0, price: 700000 },
        { boxid: 'S03', quantity: 0, price: 1200000 }
    ]);
    // const [boxes, setBoxes] = useState([]); // Chuyển về mảng để có thể sử dụng reduce
    const [boxid, setBoxid] = useState('');
    const [quantity, setQuantity] = useState(0); // Thay đổi thành số để dễ tính toán
    const [selectedServices, setSelectedServices] = useState({
        packaging: { id: 1, isSelected: false, price: 200000 },
        health: { id: 2, isSelected: false, price: 150000 },
        deliveryInsurance: { id: 3, isSelected: false, price: 500000 }
    });
    // const [deliveries, setDeliveries] = useState([]);
    const [serviceID, setServiceID] = useState('');
    const [deliveryID, setDeliveryID] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [price, setPrice] = useState('');
    const [loading, setLoading] = useState(true); // Kiểm soát trạng thái loading

    const [deliveries, setDeliveries] = useState([
        { deliveryid: 'S1', price: 300000, isSelectedd: false },
        { deliveryid: 'S2', price: 850000, isSelectedd: false },
    ]);


    // Hàm xử lý khi chọn "PHƯƠNG THỨC GIAO HÀNG"
    const handleDeliveryChange = (deliveryid) => {
        setDeliveries(prevDeliveries =>
            prevDeliveries.map(delivery =>
                delivery.deliveryid === deliveryid
                    ? { ...delivery, isSelectedd: true }
                    : { ...delivery, isSelectedd: false }
            )
        );
        
    };


    // Lấy tổng giá của phương thức giao hàng được chọn
    const selectedDelivery = deliveries.find(delivery => delivery.isSelectedd);
    const totalDeliveryPrice = selectedDelivery ? selectedDelivery.price : 0;

    // Hàm để tăng số lượng
    const incrementQuantity = (boxid) => {
        setBoxes(prevBoxes =>
            prevBoxes.map(box =>
                box.boxid === boxid ? { ...box, quantity: box.quantity + 1 } : box
            )
        );
    };

    
    const [totalPrice, setTotalPrice] = useState(0);
    const [orderID, setOrderID] = useState(0); // Giả sử bạn có `orderID` từ trước

    const handleSubmit = async () => {
        const requestData = {
            orderID: orderID,
            boxes: [
                {
                    boxid: 1, // Thay thế với ID box thực tế
                    quantity: quantity
                },
                
            ],
            serviceID: 1, // Thay thế với ID service thực tế nếu có
            deliveryID: 1, // Thay thế với ID delivery thực tế nếu có
            totalPrice: 1000
        };

        try {
            const response = await fetch('http://localhost:8080/orders/create', {
                method: 'POST', // Hoặc 'PUT' tùy theo API của bạn
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Cập nhật thành công:', result);
            } else {
                console.error('Lỗi khi cập nhật:', response.statusText);
            }
        } catch (error) {
            console.error('Lỗi khi gửi yêu cầu:', error);
        }
    };


    // Hàm để giảm số lượng theo boxID
    const decrementQuantity = (boxid) => {
        setBoxes(prevBoxes =>
            prevBoxes.map(box =>
                box.boxid === boxid && box.quantity > 0 ? { ...box, quantity: box.quantity - 1 } : box
            )
        );
    };

    // hàm xử lý checkbox được chọn
    const handleOptionChange = (e) => {
        const { name, checked } = e.target;

        // Cập nhật trạng thái của dịch vụ khi checkbox được chọn hoặc bỏ chọn
        setSelectedServices(prevState => ({
            ...prevState,
            [name]: {
                ...prevState[name],
                isSelected: checked
            }
        }));
    };

    // TÍNH TỔNG DỊCH VỤ ĐÃ CHỌN
    const totalServicePrice = Object.values(selectedServices).reduce((total, service) => {
        return service.isSelected ? total + service.price : total;
    }, 0);

    // TÍNH TỔNG GIÁ BOXES ĐÃ CHỌN
    const totalBoxesPrice = Object.values(boxes).reduce((total, box) => {
        return box.quantity > 0 ? total + (box.price * box.quantity) : total;
    }, 0);


    const DeleteBox = (boxId) => {
        setBoxes(boxes => boxes.map(box =>
            box.boxid === boxId ? { ...box, quantity: 0 } : box
        ));
    };


    const handlePriceList = (e) => {
       
        const priceListData = {
            boxes: boxes.map((box) => ({
                boxid: box.boxid,
                quantity: box.quantity,
            })),
            serviceID: selectedServices.map(service => service.serviceID),
            deliveryID: deliveryID,
            totalPrice: totalPrice,
        };

        console.log('Price List Data:', priceListData);
        console.log('Total Price:', totalPrice);
    };


    const boxS01 = boxes.find((box) => box.boxid === 'S01');

    const boxS02 = boxes.find((box) => box.boxid === 'S02');

    const boxS03 = boxes.find((box) => box.boxid === 'S03');



    return (
        <>
        
            <div className="PriceList-main-priceList">
                <p>🚚Koi Delivery Service Price List🎏</p>

            </div>
            <div className="PriceList-BoxChoosing">
                <div className="PriceList-paymentmethods">
                    Box Choosing
                </div>
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
                            <p>Large Box (S03)</p>
                            <div className="PriceList-info-box">
                                <p>contains <br /> <span>10-20</span> Koi Fish totality</p>

                            </div>
                            <div className="PriceList-amount1">
                                {boxS03 && (
                                    <div key={boxS03.boxid}>
                                        {/* Nút giảm số lượng */}
                                        <button
                                            className='decrement-button1'
                                            onClick={() => decrementQuantity(boxS03.boxid)}
                                        >
                                            -
                                        </button>

                                        {/* Hiển thị số lượng của box */}
                                        <button className='PriceList-count1'>
                                            {boxS03.quantity} {/* Đảm bảo rằng giá trị này được hiển thị */}
                                        </button>

                                        {/* Nút tăng số lượng */}
                                        <button
                                            className='increment-button1'
                                            onClick={() => incrementQuantity(boxS03.boxid)}
                                        >
                                            +
                                        </button>
                                        <br /><br />
                                        <button
                                            className='PriceList-button'
                                            onClick={() => DeleteBox('S03')}
                                        >Delete</button>

                                    </div>
                                )}
                            </div>
                        </div>

                    </div>


                    <div className="PriceList-pic-koi2">
                        <div className="PriceList-price">
                            <img src={pickoi2} alt="PIC KOI 1" />
                            <p>700.000 vnđ</p>
                        </div>
                        <div className="PriceList-pic2">
                            <p>Medium Box (S02)</p>
                            <div className="PriceList-info-box">
                                <p>contains at least <br /> <span>5-10</span> Koi Fish</p>

                            </div>
                            {/* <div className="PriceList-amount2"> */}
                            {/* <button className={`decrement-button2 ${count2 > 0 ? 'active' : 'blurred'}`}
                                    onClick={decrement2}>
                                    -
                                </button>
                                <button className='PriceList-count2'>
                                    {count2}
                                </button>
                                <button onClick={increment2} className='increment-button2'>
                                    +
                                </button> */}
                            {/* </div> */}

                            <div className="PriceList-amount2">
                                {boxS02 && (
                                    <div key={boxS02.boxid} className='PriceList-amount2-button'>
                                        {/* Nút giảm số lượng */}
                                        <button
                                            className='decrement-button2'
                                            onClick={() => decrementQuantity(boxS02.boxid)}
                                        >
                                            -
                                        </button>

                                        {/* Hiển thị số lượng của box */}
                                        <button className='PriceList-count2'>
                                            {boxS02.quantity} {/* Đảm bảo rằng giá trị này được hiển thị */}
                                        </button>

                                        {/* Nút tăng số lượng */}
                                        <button
                                            className='increment-button2'
                                            onClick={() => incrementQuantity(boxS02.boxid)}
                                        >
                                            +
                                        </button>

                                        <br /><br />
                                        <button
                                            className='PriceList-button'
                                            onClick={() => DeleteBox('S02')}
                                        >Delete</button>

                                        <div className="PriceList-total">
                                            <h3>Total Boxes Price <br /> {totalBoxesPrice.toLocaleString()} vnđ</h3>
                                        </div>
                                    </div>

                                )}
                            </div>
                        </div>

                    </div>
                    <div className="PriceList-pic-koi3">
                        <div className="PriceList-price">
                            <img src={pickoi3} alt="PIC KOI 1" />
                            <p>400.000 vnđ</p>
                        </div>
                        <div className="PriceList-pic3">
                            <p>Small Box (S01)</p>
                            <div className="PriceList-info-box">
                                <p>contains at least <span>3-5</span> Koi Fish maximum</p>

                            </div>

                            <div className="PriceList-amount3">
                                {boxS01 && (
                                    <div key={boxS01.boxid}>
                                        {/* Nút giảm số lượng */}
                                        <button
                                            className='decrement-button3'
                                            onClick={() => decrementQuantity(boxS01.boxid)}
                                        >
                                            -
                                        </button>

                                        {/* Hiển thị số lượng của box */}
                                        <button className='PriceList-count3'>
                                            {boxS01.quantity} {/* Đảm bảo rằng giá trị này được hiển thị */}
                                        </button>

                                        {/* Nút tăng số lượng */}
                                        <button
                                            className='increment-button3'
                                            onClick={() => incrementQuantity(boxS01.boxid)}>
                                            +
                                        </button>
                                        <br />
                                        <br />
                                        <button
                                            className='PriceList-button'
                                            onClick={() => DeleteBox('S01')}
                                        >Delete</button>
                                    </div>
                                )}
                            </div>


                        </div>

                    </div>
                </div>
            </div>

            <div className="PriceList-BoxChoosing">
                <div className="PriceList-paymentmethods">
                    Services
                </div>
                <div className="PriceList-message">
                    ❤️Taking care is our responsibilities❤️ <br />
                    😍You could also choose services that makes yourself comfort😍
                </div>

                <div className="PriceList-Services">
                    {/* Professional Packaging */}
                    <div className='PriceList-package'>
                        <label>
                            <input
                                type="checkbox"
                                name='packaging'
                                value='packaging'
                                onChange={handleOptionChange}
                            />
                            <img src={packaging} alt="Professional Packing" />
                            <h4>Profession Packaging</h4>
                            <p>200.000 vnđ</p>
                        </label>
                    </div>

                    {/* Health Checking */}
                    <div className='PriceList-health'>
                        <label>
                            <input
                                type="checkbox"
                                name='health'
                                value='health'
                                onChange={handleOptionChange}
                            />
                            <img src={health} alt="Health Checking" />
                            <h4>Health Checking</h4>
                            <p>150.000 vnđ</p>
                            <br />
                            <br />
                            <div className="PriceList-total">
                                <h3>Total Services Price: {totalServicePrice.toLocaleString()} vnđ</h3>
                            </div>
                        </label>
                    </div>

                    {/* Delivery Insurance */}
                    <div className='PriceList-insurance'>
                        <label>
                            <input
                                type="checkbox"
                                name='deliveryInsurance'
                                value='deliveryInsurance'
                                onChange={handleOptionChange}
                            />
                            <img src={deliveryInsurance} alt="Delivery Insurance" />
                            <h4>Delivery Insurance</h4>
                            <p>500.000 vnđ</p>
                        </label>
                    </div>



                </div>

                <div className="PriceList-BoxChoosing">
                    <div className="PriceList-paymentmethods">
                        Delivery Categories
                    </div>


                    <div className="PriceList-message">
                        🚚Customer is our Core Priority🚚 <br></br>
                        We could not step in operation process smoothly without you❤️
                    </div>


                    <div className="PriceList-Delivery">
                        {/* Lặp qua các phương thức giao hàng để hiển thị radio */}

                        {deliveries.map(delivery => (
                            <div key={delivery.deliveryid} className='PriceList-Delivery-map'>
                                <label>
                                    <input
                                        type="radio"
                                        name="Delivery"
                                        value={delivery.deliveryid}
                                        checked={delivery.isSelectedd}
                                        onChange={() => handleDeliveryChange(delivery.deliveryid)}
                                    />
                                    <h4>{delivery.deliveryid === 'S1' ? 'Standard Delivery' : 'Express Delivery'}</h4>

                                    <p>{delivery.price.toLocaleString()} vnđ</p>
                                </label>
                            </div>
                        ))}

                        {/* Hiển thị tổng giá cho phương thức giao hàng đã chọn */}
                        {totalDeliveryPrice > 0 && (
                            <div className="PriceList-total">
                                <h3>Total Delivery Price: {totalDeliveryPrice.toLocaleString()} vnđ</h3>
                            </div>
                        )}
                    </div>


                    <Link to='/Payment'>
                        <div className="PriceList-buttonn">
                        <div>
            {/* Giao diện lựa chọn quantity và tính toán totalPrice */}
            <button onClick={handleSubmit}>Complete Order</button>
        </div>
                        </div>
                    </Link>


                </div>

            </div>

        </>

    );
}

export default PriceList