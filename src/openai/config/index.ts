import { Configuration, OpenAIApi } from 'openai';

export async function getOpenAiReply(prompt) {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  console.log(prompt);
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: prompt,
    temperature: 0.8, // 每次返回的答案的相似度0-1（0：每次都一样，1：每次都不一样）
    max_tokens: 4000,
  });
  console.log(response.data.choices[0]);
  return response.data.choices[0].text;
}
