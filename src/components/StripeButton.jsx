// stripe.button.component.jsx
import React from 'react';
import { useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { updateBooking } from '../data/ApiController.js';

const StripeCheckoutButton = ({ price,bookingId }) => {
    const [bookingSuccess,setBookingSuccess] = useState(false);
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51KqLOTI2Ss65cmsQZS2e0qzqOsh7hkFURrKhzqdqPfhojK1NvrxU3o4VSk6kkLDt8HBI2xvAETATjFq1IJ3mkbdG00OblukcvM';

    const onToken = async (token) => {
        console.log(token);
        await setBookingSuccess(true);
        const response = await updateBooking(bookingId,{paymentStatus:"Paid"});
        console.log(response)
        alert('Payment Succesful!');
    };

    return (
        (!bookingSuccess && <StripeCheckout
            label='Pay Now'
            name='Readicharge LLc'
            billingAddress
            shippingAddress
            image={`${process.env.PUBLIC_URL}/logo-rc.png`}
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
          />)
    )
}

export default StripeCheckoutButton;