import { PayPalButton } from "react-paypal-button-v2";

const Paypal = () => {
    return (
        <PayPalButton
            amount="10"
            onSuccess={(details, data) => {
                alert("Transaction completed by " + details.payer.name.given_name);

                console.log(details, data)
            }}
            options={{
                clientId: "AZsT0VHSwD1aXkN7Ifq1BMMDesjF21x3dztJP7O_4MQoVJx69APf7DkfMl8I_LcDCSQLG780Xi0OI2hT"
            }}
        />
      );
};

export default Paypal;
