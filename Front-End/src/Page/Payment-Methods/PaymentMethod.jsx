
import HeaderPaymentMethods from "../../Components/HeaderPaymentMethods";
import OrderPaymentMethods from "../../Components/OrderPaymentMethods";
import FooterOrderMethods from "../../Components/FooterOrderMethods";
function PaymentMethod() {
    return (
        <>
            <HeaderPaymentMethods />
            <OrderPaymentMethods
                totalOrder="100.000"
                deliveryCost="20.000"
                totalAmount="120.000"
                deliveryTo="Tuấn Anh"
            />
            <FooterOrderMethods />
        </>
    );
}

export default PaymentMethod