import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class SummaryService {
  async summarize(text: string): Promise<string> {
    const data = JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: `Traduce el siguiente texto al inglés y devuélvelo en formato JSON tal que así: {"summary": "aquí va el resumen"}. El texto es: ${text}`,
        },
      ],
      max_tokens: 50,
    });

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      data,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      },
    );

    return JSON.parse(response.data['choices'][0]['message']['content'])[
      'summary'
    ];
  }
}
