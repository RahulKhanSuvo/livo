export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ProductResult {
  id: string;
  name: string;
  price: number;
  salePrice: number;
  imageUrl: string | null;
  slug: string;
}

export interface AiChatResponse {
  text: string;
  products?: ProductResult[];
}
