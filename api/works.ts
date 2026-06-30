import { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase } from './supabase';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    res.status(200).json({ message: 'Works API test', method: req.method });
  } catch (error) {
    console.error('API error:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}
