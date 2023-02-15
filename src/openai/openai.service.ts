import { Injectable } from '@nestjs/common';
import { CreateOpenaiDto } from './dto/create-openai.dto';
import { UpdateOpenaiDto } from './dto/update-openai.dto';
import { getOpenAiReply } from './config';
import { Configuration, OpenAIApi } from 'openai';
@Injectable()
export class OpenaiService {
  async response(prompt) {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: prompt,
      temperature: 0.8, // 每次返回的答案的相似度0-1（0：每次都一样，1：每次都不一样）
      max_tokens: 4000,
    });
    return response.data.choices[0].text;
  }
  async queryOpenai(post: CreateOpenaiDto) {
    return await this.response(post.text);
  }
  create(createOpenaiDto: CreateOpenaiDto) {
    return 'This action adds a new openai';
  }

  findAll() {
    return `This action returns all openai`;
  }

  findOne(id: number) {
    return `This action returns a #${id} openai`;
  }

  update(id: number, updateOpenaiDto: UpdateOpenaiDto) {
    return `This action updates a #${id} openai`;
  }

  remove(id: number) {
    return `This action removes a #${id} openai`;
  }
}
