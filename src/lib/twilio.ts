import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

const client = accountSid && authToken ? twilio(accountSid, authToken) : null;

export interface CallResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

export async function makePhoneCall(to: string, message: string): Promise<CallResult> {
  if (!client || !twilioPhoneNumber) {
    return { success: false, error: 'Twilio not configured' };
  }

  try {
    const call = await client.calls.create({
      twiml: `<Response><Say>${message}</Say></Response>`,
      to,
      from: twilioPhoneNumber,
    });
    return { success: true, messageId: call.sid };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function sendSMS(to: string, message: string): Promise<CallResult> {
  if (!client || !twilioPhoneNumber) {
    return { success: false, error: 'Twilio not configured' };
  }

  try {
    const sms = await client.messages.create({
      body: message,
      to,
      from: twilioPhoneNumber,
    });
    return { success: true, messageId: sms.sid };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function getProjectStatus(phoneNumber: string): Promise<string> {
  return `Your SocialContent AI project is running. Current status: Active.`;
}
