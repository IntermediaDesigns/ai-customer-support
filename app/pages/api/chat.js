// pages/api/chat.js
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { initializeApp, getApps } from 'firebase-admin/app';
import { aiService } from '../../lib/aiService';

if (!getApps().length) {
  initializeApp({
    // Your Firebase admin SDK config
  });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { message, idToken } = req.body;

  try {
    // Verify the user's ID token
    const decodedToken = await getAuth().verifyIdToken(idToken);
    const uid = decodedToken.uid;

    // Get AI response
    const aiResponse = await aiService.getResponse(message);

    // Store the conversation in Firestore
    const db = getFirestore();
    await db.collection('conversations').add({
      userId: uid,
      message: message,
      response: aiResponse,
      timestamp: new Date()
    });

    res.status(200).json({ response: aiResponse });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
}