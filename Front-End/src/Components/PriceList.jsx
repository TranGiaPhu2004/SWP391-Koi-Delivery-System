import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import pickoi1 from '../assets/image/pickoi1.png'
import pickoi2 from '../assets/image/pickoi2.png'
import pickoi3 from '../assets/image/pickoi3.png'
import packaging from '../assets/image/packaging.png'
import deliveryInsurance from '../assets/image/deliveryInsurance.png'
import health from '../assets/image/health.png'

import standardDelivery from '../assets/image/standardDelivery.png'
import fastDelivery from '../assets/image/fastDelivery.png'
import './PriceList.css'
function PriceList() {

    // const [count1, setCount1] = useState(0);
    // const [count2, setCount2] = useState(0);
    // const [count3, setCount3] = useState(0);


    // const increment1 = () => {
    //     setCount1((c) => c + 1);
    // }
    // const increment2 = () => {
    //     setCount2((c) => c + 1);
    // }
    // const increment3 = () => {
    //     setCount3((c) => c + 1);
    // }
    // const decrement1 = () => {
    //     if (count1 > 0) {
    //         setCount1((c) => c - 1);
    //     } else {
    //         alert('Sorry, you could not decrement when amount of boxes begin from Zero ...')
    //     }
    // }
    // const decrement2 = () => {
    //     if (count2 > 0) {
    //         setCount2((c) => c - 1);
    //     } else {
    //         alert('Sorry, you could not decrement when amount of boxes begin from Zero ...')
    //     }
    // }
    // const decrement3 = () => {
    //     if (count3 > 0) {
    //         setCount3((c) => c - 1);
    //     } else {
    //         alert('Sorry, you could not decrement when amount of boxes begin from Zero ...')
    //     }
    // }




    // const handlePriceList = async (e) => {
    //     e.preventDefault();

    //     // Tính tổng giá của các hộp theo từng boxid
    //     const totalBoxPrice = boxes.reduce((total, box) => {
    //         return total + (box.price * box.quantity); // Tổng giá cho từng hộp
    //     }, 0);

    //     // Tính tổng giá của các dịch vụ đã chọn
    //     const totalServicePrice = selectedServices.reduce((total, service) => {
    //         return total + service.price; // Tổng giá dịch vụ = giá mỗi dịch vụ
    //     }, 0);

    //     // Lấy giá của phương thức giao hàng dựa trên deliveryID
    //     const selectedDelivery = deliveries.find(delivery => delivery.id === deliveryID);

    //     const totalDeliveryPrice = selectedDelivery ? selectedDelivery.price : 0; // Giá vận chuyển

    //     // Tính tổng giá đơn hàng
    //     const totalPrice = totalBoxPrice + totalServicePrice + totalDeliveryPrice; // Tổng giá


    //     // Tạo đối tượng dữ liệu để gửi lên API
    //     const priceListData = {
    //         boxes: [
    //             {
    //                 boxid: boxid,
    //                 price: price,
    //                 quantity: quantity,
    //             }

    //         ],
    //         serviceID: serviceID,
    //         deliveryID: deliveryID,
    //         totalPrice: totalPrice,
    //     };

    //     try {
    //         // Gửi yêu cầu POST đến API
    //         const response = await fetch("http://localhost:8080/orders/create", {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify(priceListData),
    //         });

    //         // Kiểm tra phản hồi từ API
    //         if (response.ok) {
    //             const data = await response.json();
    //             // Lưu token vào localStorage hoặc sessionStorage
    //             localStorage.setItem("token", data.token);
    //         }

    //     } catch (error) {
    //         setErrorMessage("Error logging in");
    //     }

    // };

    // Hàm lấy dữ liệu từ database khi component được render

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             // Lấy danh sách các hộp từ database
    //             const boxesResponse = await fetch('/api/boxes');
    //             const boxesData = await boxesResponse.json();
    //             setBoxes(boxesData); // Lưu danh sách hộp vào state

    //             // Lấy danh sách dịch vụ đã chọn
    //             const servicesResponse = await fetch('/api/services');
    //             const servicesData = await servicesResponse.json();
    //             setSelectedServices(servicesData); // Lưu danh sách dịch vụ vào state

    //             // Lấy danh sách phương thức giao hàng
    //             const deliveriesResponse = await fetch('/api/deliveries');
    //             const deliveriesData = await deliveriesResponse.json();
    //             setDeliveries(deliveriesData); // Lưu danh sách phương thức giao hàng vào state

    //             // Cập nhật phương thức giao hàng mặc định (ví dụ chọn cái đầu tiên)
    //             if (deliveriesData.length > 0) {
    //                 setDeliveryID(deliveriesData[0].id); // Chọn phương thức giao hàng đầu tiên
    //             }

    //             setLoading(false); // Hoàn tất việc tải dữ liệu
    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //             setLoading(false); // Nếu có lỗi vẫn phải dừng loading
    //         }
    //     };

    //     fetchData(); // Gọi hàm fetchData để tải dữ liệu
    // }, []); // Mảng rỗng [] đảm bảo useEffect chỉ chạy một lần khi component được mount


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
        // e.preventDefault();

        // // Tính tổng giá của các hộp theo từng boxid
        // const totalBoxPrice = boxes.reduce((total, box) => {
        //     return total + (box.price * box.quantity); // Tổng giá cho từng hộp
        // }, 0);

        // // Tính tổng giá của các dịch vụ đã chọn
        // const totalServicePrice = selectedServices.reduce((total, service) => {
        //     return total + service.price; // Tổng giá dịch vụ = giá mỗi dịch vụ
        // }, 0);

        // // Lấy giá của phương thức giao hàng dựa trên deliveryID
        // const selectedDelivery = deliveries.find(delivery => delivery.id === deliveryID);
        // const totalDeliveryPrice = selectedDelivery ? selectedDelivery.price : 0; // Giá vận chuyển

        // // Tính tổng giá đơn hàng
        // const totalPrice = totalBoxPrice + totalServicePrice + totalDeliveryPrice; // Tổng giá

        // Tạo đối tượng dữ liệu để gửi lên API
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

    // const [orderID, setOrderID] = useState('');
    // const CreateOrder = () => {
    //     const [response, setResponse] = useState(null);

    //     const createOrder = async () => {
    //         const orderData = {
    //             orderID: orderID,
    //             boxes: [
    //                 {
    //                     boxid: 1,
    //                     quantity: 3
    //                 },
    //                 {
    //                     boxid: 3,
    //                     quantity: 5
    //                 }
    //             ],
    //             serviceID: 1,
    //             deliveryID: 2,
    //             totalPrice: 10000
    //         };

    //         try {
    //             const res = await fetch('http://localhost:8080/orders/create', {
    //                 method: 'POST',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     'Authorization': 'Bearer YOUR_AUTH_TOKEN', // Nếu cần token cho xác thực
    //                 },
    //                 body: JSON.stringify(orderData),
    //             });

    //             const data = await res.json();
    //             setResponse(data);
    //         } catch (error) {
    //             console.error('Error:', error);
    //         }
    //     };
    // }


    

    // if (loading) {
    //     return <div>Loading data...</div>; // Hiển thị khi dữ liệu đang được tải
    // }

    const boxS01 = boxes.find((box) => box.boxid === 'S01');

    const boxS02 = boxes.find((box) => box.boxid === 'S02');

    const boxS03 = boxes.find((box) => box.boxid === 'S03');



    return (
        <>
        <form></form>
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
                            <button type='submit'>Order Completion</button>
                        </div>
                    </Link>


                </div>

            </div>

        </>

    );
}

export default PriceList