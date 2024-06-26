import { NextApiRequest, NextApiResponse } from 'next';
import { env } from '@typebot.io/env';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ NODE_ENV: env.NODE_ENV });
}