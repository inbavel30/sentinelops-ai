import { apiClient } from './client';
import type { ChatMessage, Conversation } from '../types';

export const chatApi = {
  getConversations: async (): Promise<Conversation[]> => {
    const { data } = await apiClient.get<Conversation[]>('/chat/conversations');
    return data;
  },

  getConversation: async (id: string): Promise<Conversation> => {
    const { data } = await apiClient.get<Conversation>(`/chat/conversations/${id}`);
    return data;
  },

  createConversation: async (title?: string): Promise<Conversation> => {
    const { data } = await apiClient.post<Conversation>('/chat/conversations', { title });
    return data;
  },

  sendMessage: async (conversationId: string, content: string): Promise<ChatMessage> => {
    const { data } = await apiClient.post<ChatMessage>(`/chat/conversations/${conversationId}/messages`, { content });
    return data;
  },

  streamMessage: async (conversationId: string, content: string, onChunk: (chunk: string) => void): Promise<void> => {
    const response = await fetch(`${apiClient.defaults.baseURL}/chat/conversations/${conversationId}/stream`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
      },
      body: JSON.stringify({ content }),
    });

    const reader = response.body?.getReader();
    if (!reader) return;

    const decoder = new TextDecoder();
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      onChunk(decoder.decode(value));
    }
  },

  deleteConversation: async (id: string): Promise<void> => {
    await apiClient.delete(`/chat/conversations/${id}`);
  },

  pinConversation: async (id: string, pinned: boolean): Promise<Conversation> => {
    const { data } = await apiClient.patch<Conversation>(`/chat/conversations/${id}`, { pinned });
    return data;
  },

  getSuggestedPrompts: async (): Promise<string[]> => {
    const { data } = await apiClient.get<string[]>('/chat/suggested-prompts');
    return data;
  },
};
