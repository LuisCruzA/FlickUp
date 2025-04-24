'use strict';
const secretsManager = require("@aws-sdk/client-secrets-manager")
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { ok, notFound } = require('db');

function badRequest(body) {
  return {
    statusCode: 400,
    body: JSON.stringify(body)
  };
}

exports.handler = async (event) => {
  const { httpMethod, resource, body } = event;

  if (httpMethod === 'POST' && resource === '/stripe') {
    try {
      const requestBody = JSON.parse(body || '{}');

      const {
              amount,
              currency = 'mxn',
              destination_account = process.env.STRIPE_DEFAULT_ACCOUNT,
              customer_id
            } = requestBody;
      
      console.log(requestBody);
      if (!amount) {
        return badRequest({ error: 'Missing required parameter: amount' });
      }

      // Crear o reutilizar cliente
      let customer;
      if (requestBody.customer_id) {
        customer = { id: requestBody.customer_id };
      } else {
        customer = await stripe.customers.create();
      }

      // Crear clave efímera
      const ephemeralKey = await stripe.ephemeralKeys.create(
        { customer: customer.id },
        { apiVersion: '2024-10-28.acacia' }
      );

      const amountInCents = Math.round(amount * 100);

      // Crear intento de pago
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amountInCents,
        currency,                   
        customer: customer.id,
        automatic_payment_methods: { enabled: true },
        transfer_data: { destination: destination_account },
        });

      console.log(ok({
        paymentIntent: paymentIntent.client_secret,
        ephemeralKey: ephemeralKey.secret,
        customer: customer.id,
        publishableKey: process.env.STRIPE_PUBLISHABLE_KEY
      }));

      return ok({
        paymentIntent: paymentIntent.client_secret,
        ephemeralKey: ephemeralKey.secret,
        customer: customer.id,
        publishableKey: process.env.STRIPE_PUBLISHABLE_KEY
      });

    } catch (error) {
      console.error('Stripe Error:', error);
      return badRequest({ 
        error: 'Payment processing failed',
        details: error.message 
      });
    }
  }

  if(httpMethod === 'GET' && resource === '/stripe'){
    try {
        const secret = await secretsManager.getSecretValue({
          SecretId: "stripe/secrets"
        });
        
        return {
          statusCode: 200,
          body: JSON.parse(secret.SecretString)
        };
        
      } catch (error) {
        return {
          statusCode: 500,
          body: "Error fetching secrets"
        };
      }
  }
  return notFound();
};