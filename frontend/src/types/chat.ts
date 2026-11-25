export interface ChatRequest {
  messages: string;
}
export interface ChatResponse {
  messages: string;
}



export interface ChatMessage {
    id: string;
    content: string;
    role: 'user' | 'assistant' | 'system';
    timestamp:Date
  
}

