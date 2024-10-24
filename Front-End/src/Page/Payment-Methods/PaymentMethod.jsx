
import HeaderPaymentMethods from "../../Components/HeaderPaymentMethods";
import OrderPaymentMethods from "../../Components/OrderPaymentMethods";
import FooterOrderMethods from "../../Components/FooterOrderMethods";
function PaymentMethod() {
    return (
        <>
            <HeaderPaymentMethods />
            <OrderPaymentMethods/>
            <FooterOrderMethods />
        </>
    );
}

export default PaymentMethod