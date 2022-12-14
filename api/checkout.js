// const stripeAPI = require('../stripe');

// async function createCheckoutSession(req, res) {
//     const domainUrl = process.env.WEB_APP_URL;
//     const { line_items, customer_email } = req.body;

//     // check if req body has line items and email 
//     // if there are no line items or customer email....
//     if (!line_items || !customer_email) {
//         return res.status(400).json({ error: 'missing required session parameters' });
//     }

//     let session;

//     try {
//         session = await stripeAPI.checkout.sessions.create({
//             payment_method_types: ['card'],
//             mode: 'payment',
//             line_items,
//             customer_email,
//             success_url: `${domainUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
//             cancel_url: `${domainUrl}/canceled`,
//             shipping_address_collection: { allowed_countries: ['GB', 'US'] }
//         });
//         // res.redirect(303, session.url);
//         res.status(200).json({ sessionId: session.id });
//     } catch (error) {
//         console.log(error);
//         res.status(400).json({ error: 'an error occured, unable to create session' });
//     }
// }

// module.exports = createCheckoutSession;
// This is your test secret API key.

const stripe = require('stripe')(process.env.SECRET_KEY);
const checkout = require('express').Router();
const domainUrl = 'https://my-stripe-app-1.herokuapp.com';

checkout.post('/create-checkout-session', async (req, res) => {
    console.log(req.body.line_items)
    const line_items =req.body.line_items

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items,
    mode: 'payment',
    success_url: `${domainUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${domainUrl}/canceled`,
    // automatic_tax: {enabled: true},
  });
  res.json({url:session.url, sessionId: session.id} );
});

module.exports =  checkout;