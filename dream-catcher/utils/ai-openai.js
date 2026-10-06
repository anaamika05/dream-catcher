import OpenAI from 'openai';
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY ||'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'
  });

// Call OpenAI API for dream interpretation
export async function getDreamInterpretation(dreamText) {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('Server misconfigured: OPENAI_API_KEY is missing');
  }

  const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';

  try {
    const message = await openai.chat.completions.create({
      model,
      max_tokens: 512,
      messages: [
        {
          role: 'system',
          content: 'You are a thoughtful dream interpreter. Be insightful but gentle, and consider common dream symbolism. Keep your interpretation to 2-3 paragraphs.'
        },
        {
          role: 'user',
          content: `Dream: ${dreamText}`
        }
      ]
    });
    return message.choices[0].message.content.trim();
  } catch (error) {
    console.error('OpenAI API error:', error);
    throw new Error(`API error: ${error.message}`);
  }
}
