import { NextRequest, NextResponse } from 'next/server';
import { createCheckoutSession, createCustomer, PLANS } from '@/lib/stripe';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, plan } = body;

    if (!email || !plan || !PLANS[plan as keyof typeof PLANS]) {
      return NextResponse.json(
        { error: 'Invalid request' },
        { status: 400 }
      );
    }

    const planConfig = PLANS[plan as keyof typeof PLANS];

    let customer;
    try {
      customer = await createCustomer(email);
    } catch {
      return NextResponse.json(
        { error: 'Failed to create customer' },
        { status: 500 }
      );
    }

    const origin = request.headers.get('origin') || 'http://localhost:3000';
    const session = await createCheckoutSession(
      customer.id,
      planConfig.priceId,
      `${origin}/dashboard?success=true`,
      `${origin}/dashboard?cancelled=true`
    );

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
