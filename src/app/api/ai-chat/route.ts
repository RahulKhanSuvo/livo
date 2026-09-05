import { GoogleGenAI, Type } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';
import { searchProductsTool } from '@/lib/ai/searchProducts';
import type { ChatMessage, ProductResult } from '@/types/ai-assistant';

const SYSTEM_INSTRUCTION = `You are Livo's helpful interior design and furniture shopping assistant. 
Your job is to help customers find the perfect furniture and home decor from Livo's catalogue.

When a user asks about products, ALWAYS use the searchProducts tool to find real products from our database.
Be warm, knowledgeable about interior design, and concise in your responses.
If you find products, briefly describe them and let the product cards speak for themselves.
If no products are found, suggest alternative search terms or broader categories.

Livo sells: sofas, chairs, tables, beds, wardrobes, storage, lighting, and home accessories.`;

const searchProductsDeclaration = {
  name: 'searchProducts',
  description:
    'Search the Livo product catalogue for furniture and home decor items based on user criteria',
  parameters: {
    type: Type.OBJECT,
    properties: {
      query: {
        type: Type.STRING,
        description: 'Search keywords (e.g. "gray sofa", "wooden dining table", "modern chair")',
      },
      category: {
        type: Type.STRING,
        description:
          'Product category (e.g. "living room", "bedroom", "dining", "office", "outdoor")',
      },
      minPrice: {
        type: Type.NUMBER,
        description: 'Minimum price in USD ($)',
      },
      maxPrice: {
        type: Type.NUMBER,
        description: 'Maximum price in USD ($)',
      },
      limit: {
        type: Type.NUMBER,
        description: 'Number of products to return (default 6, max 12)',
      },
    },
  },
};

export async function POST(req: NextRequest) {
  try {
    const { messages }: { messages: ChatMessage[] } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: 'GEMINI_API_KEY not configured' }, { status: 500 });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const history = messages.slice(0, -1).map((m) => ({
      role: m.role === 'user' ? ('user' as const) : ('model' as const),
      parts: [{ text: m.content }],
    }));

    const lastMessage = messages[messages.length - 1];

    const chat = ai.chats.create({
      model: 'gemini-3.6-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        tools: [{ functionDeclarations: [searchProductsDeclaration] }],
      },
      history,
    });

    let response = await chat.sendMessage({ message: lastMessage.content });

    let products: ProductResult[] = [];

    // Handle tool call loop
    while (response.functionCalls && response.functionCalls.length > 0) {
      const toolCall = response.functionCalls[0];

      if (toolCall.name === 'searchProducts') {
        products = await searchProductsTool(
          toolCall.args as {
            query?: string;
            category?: string;
            minPrice?: number;
            maxPrice?: number;
            limit?: number;
          }
        );

        response = await chat.sendMessage({
          message: [
            {
              functionResponse: {
                name: 'searchProducts',
                response: {
                  products: products.map((p) => ({
                    id: p.id,
                    name: p.name,
                    price: `$${p.price.toLocaleString()}`,
                    salePrice: p.salePrice > 0 ? `$${p.salePrice.toLocaleString()}` : null,
                  })),
                  count: products.length,
                },
              },
            },
          ],
        });
      } else {
        break;
      }
    }

    const text = response.text ?? '';

    return NextResponse.json({ text, products });
  } catch (error) {
    console.error('[AI Chat Error]', error);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
