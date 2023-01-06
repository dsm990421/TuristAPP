const stripe = require('stripe')('sk_test_51MManHJfm5kP97nP5cwSVQIQfLQH2uYIhiQvqFDt60n2KFiRDHkRiKq6GfNZ20C91a0deqM5HiMFFBFFRdBSuV3Q00CEQoOQIK');

const createPayment = async(req, res) => {

    const customer = await stripe.customers.create({
        name: 'Cliente de prueba',
        address: {
            line1: 'Demo address',
            postal_code: '56660',
            city: 'Amecameca',
            state: 'Estado de México',
            country: 'MX'
        }
    });
    const ephemeralKey = await stripe.ephemeralKeys.create({ customer: customer.id }, { apiVersion: '2022-11-15' });

    const paymentIntent = await stripe.paymentIntents.create({
        amount: 15000,
        currency: 'mxn',
        description: 'Pago de servicio',
        customer: customer.id,
        automatic_payment_methods: {
            enabled: true,
        },
    });

    res.status(200).json({
        paymentIntent: paymentIntent.client_secret,
        ephemeralKey: ephemeralKey.secret,
        customer: customer.id,
        publishableKey: 'pk_test_51MManHJfm5kP97nPkk2byS3Uzsc5n0I3I8TWbJ41py6T8JvvoVTFbYg4DuRSgkPxWeEw53f2QayVbv940GRT01g600ytdkZLKS'
    });
}

module.exports = { createPayment };