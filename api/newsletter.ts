import { Brevo } from '@getbrevo/brevo';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, name } = req.body;

  if (!email || !name) {
    return res.status(400).json({ error: 'Email and name are required' });
  }

  const brevoListId = process.env.BREVO_LIST_ID;
  if (!brevoListId) {
    return res.status(500).json({ error: 'Brevo list ID is not configured' });
  }

  try {
    const brevo = new Brevo();
    brevo.setApiKey(process.env.BREVO_API_KEY);

    await brevo.contactsApi.createContact({
      email,
      attributes: {
        FIRSTNAME: name,
      },
      listIds: [Number(brevoListId)],
      updateEnabled: true,
    });

    return res.status(200).json({ success: true, message: 'Successfully subscribed to newsletter' });
  } catch (error) {
    console.error('Brevo API error:', error);
    return res.status(500).json({ error: 'Failed to subscribe to newsletter' });
  }
}