import OpenAI from 'openai';

export async function generateEmail(apiKey: string, wordCount: number, topic: string, conditions: string): Promise<string> {
  if (!apiKey) {
    throw new Error('Please add your OpenAI API key in the settings');
  }

  const openai = new OpenAI({
    apiKey,
    dangerouslyAllowBrowser: true
  });

  try {
    const prompt = `You are an Email marketing Expert. Write a ${wordCount} word email about ${topic}. Write as if you are talking to a friend and include tips and advice they could implement right away. The conditions for this email are ${conditions}.`;
    
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
      max_tokens: 1000,
      temperature: 0.7,
    });

    if (!completion.choices[0]?.message?.content) {
      throw new Error('No content generated');
    }

    return completion.choices[0].message.content;
  } catch (error: any) {
    if (error?.error?.type === 'insufficient_quota') {
      throw new Error('OpenAI API quota exceeded. Please check your billing details or try again later.');
    }
    throw new Error(error?.message || 'Failed to generate email content. Please try again.');
  }
}