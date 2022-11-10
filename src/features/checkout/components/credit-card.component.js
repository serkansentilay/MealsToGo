import React, { useState } from "react";
import { CardField, useStripe } from '@stripe/stripe-react-native';
import { cardTokenRequest } from "../../../services/checkout/checkout.service";

export const CreditCardInput = ({ name, onSuccess, onError }) => {
    const [allCardDetails, setAllCardDetails] = useState([]);
    const [isInComplete, setIsInComplete] = useState(false);
    if (!isInComplete) {
        try {
            onSuccess({ allCardDetails });
        } catch (e) {
            onError();
        }
    }
    return (
        <CardField
            postalCodeEnabled={true}
            placeholders={{
                number: '4242 4242 4242 4242',
            }}
            cardStyle={{
                backgroundColor: '#FFFFFF',
                textColor: '#000000',
            }}
            style={{
                width: '100%',
                height: 50,
                marginVertical: 30,
            }}
            onCardChange={(cardDetails) => {
                console.log('cardDetails', cardDetails);
                setAllCardDetails(cardDetails);
                setIsInComplete(cardDetails.complete);
            }}
            onFocus={(focusedField) => {
                console.log('focusField', focusedField);
            }}
        />
    );
}