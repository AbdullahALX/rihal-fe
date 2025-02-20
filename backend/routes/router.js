import express from 'express';
import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const token = process.env.OPEN_AI;
const endpoint = 'https://models.inference.ai.azure.com';
const modelName = 'gpt-4o-mini';

router.get('/ask', async (req, res) => {
  try {
    const hardcodedPrompt = 'What is the capital of France?'; // Hardcoded question

    const client = new OpenAI({ baseURL: endpoint, apiKey: token });

    const response = await client.chat.completions.create({
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: hardcodedPrompt },
      ],
      temperature: 1.0,
      max_tokens: 1000,
      model: modelName,
    });

    res.json({ response: response.choices[0].message.content });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/test', async (req, res) => {
  res.send('test');
});

export default router;
