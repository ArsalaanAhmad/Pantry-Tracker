import Groq from 'groq-sdk';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export default async function handler(req, res) {
  const { items } = req.body;

  try {
    const response = await groq.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: `Generate a summarized recipe using the following items and make the ingredients appear as a list: ${items.join(', ')}`
        },
      ],
      model: 'llama3-8b-8192',
    });

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data from AI' });
  }
}