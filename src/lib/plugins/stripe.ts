import Stripe from 'stripe';

const VITE_STRIPE_SECRET_KEY = import.meta.env.VITE_STRIPE_SECRET_KEY;
const stripe = new Stripe(VITE_STRIPE_SECRET_KEY);

export async function getStripeInstallments(amount: number, currency: string) {
	try {
		const paymentIntent = await stripe.paymentIntents.create({
			amount,
			currency,
			payment_method_types: ['card']
		});

		return paymentIntent;
	} catch (error) {
		console.error('Erro ao obter parcelas:', error);
		throw new Error('Erro ao calcular as parcelas');
	}
}
