import { NextRequest, NextResponse } from 'next/server';
import { makePhoneCall, sendSMS, getProjectStatus } from '@/lib/twilio';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, phoneNumber, message } = body;

    if (!phoneNumber) {
      return NextResponse.json({ error: 'Phone number required' }, { status: 400 });
    }

    let result;

    switch (action) {
      case 'call':
        if (!message) {
          return NextResponse.json({ error: 'Message required for call' }, { status: 400 });
        }
        result = await makePhoneCall(phoneNumber, message);
        break;
      case 'sms':
        const smsMessage = message || await getProjectStatus(phoneNumber);
        result = await sendSMS(phoneNumber, smsMessage);
        break;
      case 'status':
        const statusMessage = await getProjectStatus(phoneNumber);
        result = await sendSMS(phoneNumber, statusMessage);
        break;
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    if (result.success) {
      return NextResponse.json({ success: true, messageId: result.messageId });
    } else {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal error' },
      { status: 500 }
    );
  }
}
