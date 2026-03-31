import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');

export const PLANS = {
  starter: {
    name: 'Starter',
    price: 900,
    priceId: process.env.STRIPE_STARTER_PRICE_ID || '',
    features: ['30 posts/month', '1 social account', 'X integration', 'Basic analytics'],
  },
  pro: {
    name: 'Pro',
    price: 2900,
    priceId: process.env.STRIPE_PRO_PRICE_ID || '',
    features: ['90 posts/month', '3 social accounts', 'X + LinkedIn', 'Advanced analytics', 'Priority support'],
  },
  enterprise: {
    name: 'Enterprise',
    price: 9900,
    priceId: process.env.STRIPE_ENTERPRISE_PRICE_ID || '',
    features: ['Unlimited posts', 'Unlimited accounts', 'All platforms', 'White-label', 'API access', 'Dedicated support'],
  },
};

export async function createCheckoutSession(
  customerId: string,
  priceId: string,
  successUrl: string,
  cancelUrl: string
) {
  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    payment_method_types: ['card'],
    line_items: [{ price: priceId, quantity: 1 }],
    mode: 'subscription',
    success_url: successUrl,
    cancel_url: cancelUrl,
  });
  return session;
}

export async function createCustomer(email: string) {
  const customer = await stripe.customers.create({ email });
  return customer;
}

export async function getSubscription(subscriptionId: string) {
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  return subscription;
}

export async function cancelSubscription(subscriptionId: string) {
  const subscription = await stripe.subscriptions.cancel(subscriptionId);
  return subscription;
}
