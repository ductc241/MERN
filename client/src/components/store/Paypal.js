import axios from 'axios'
import { PayPalButton } from "react-paypal-button-v2";

const Paypal = ({ cart, token }) => {
    return (
        <PayPalButton
            amount="10"
            onSuccess={async (details, data) => {
                console.log("Transaction completed by " + details.payer.name.given_name);
                const shippingInfor = details.purchase_units[0].shipping

                await axios.post('http://localhost:5000/api/payment', {
                    cart,
                    address: `${shippingInfor.address.address_line_1} ${shippingInfor.address.admin_area_2}`
                }, {
                    withCredentials: true,
                    headers: { Authorization: token }
                })
            }}
            options={{
                clientId: "AZsT0VHSwD1aXkN7Ifq1BMMDesjF21x3dztJP7O_4MQoVJx69APf7DkfMl8I_LcDCSQLG780Xi0OI2hT"
            }}
        />
      );
};

export default Paypal;
