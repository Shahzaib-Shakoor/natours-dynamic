/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe(
  'pk_test_51Nx4ioD2LoVA5mrpXbThy4kAWl3AB7bYVg4vRG9dzZJftazdVzaSC55v6jKNZJiK92hXit3mz9AE0DcbaREAazMX00Uy49QnHR',
);

export const bookTour = async tourId => {
  try {
    // 1) Get checkout session from API
    const session = await axios(
      `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`,
    );
    console.log(session);

    // 2) Create checkout form + charge creadit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
