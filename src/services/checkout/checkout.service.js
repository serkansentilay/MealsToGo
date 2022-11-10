import createStripe from "stripe-client";
import { host } from "../../utils/env";
const stripe = createStripe(
    "pk_test_51M2CWyLWSuzOYaQJNSswlxWdXkqPOvtLRUcnelvWm3T7iNFkWGRkRIjYlVaukjqCDAu3ieVf8tu5UR5icAeKlu2X00cBdeIMIH"
);

export const cardTokenRequest = (card) => stripe.createToken({ card });

export const payRequest = (token, amount, name) => {
    return fetch(`${host}/pay`, {
        body: JSON.stringify({
            token,
            name,
            amount,
        }),
        method: "POST",
    }).then((res) => {
        if (res.status > 200) {
            return Promise.reject("Something went wrong processing your payment");
        }
        return res.json();
    })
}