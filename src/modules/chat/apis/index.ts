import axiosInstance from '../../../commons/apis/axiosInstance.api';
import { API_ENDPOINTS } from '../../../constants/endPoint.constants';
import { ApiErrorHandler } from '../../../commons/apis/error.api';

export interface ChatMessage {
  id: string;
  content: string;
  senderId: string;
  senderName: string;
  timestamp: string;
}

export interface ChatRoom {
  id: string;
  name: string;
  participants: string[];
  lastMessage?: ChatMessage;
  unreadCount: number;
}

export interface SendMessageRequest {
  roomId: string;
  content: string;
}

export const chatApi = {
  getChatList: async (): Promise<ChatRoom[]> => {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.CHAT.LIST);
      return response.data;
    } catch (error) {
      throw ApiErrorHandler.handle(error);
    }
  },

  getChatRoom: async (roomId: string): Promise<{ room: ChatRoom; messages: ChatMessage[] }> => {
    try {
      const response = await axiosInstance.get(`${API_ENDPOINTS.CHAT.ROOM}/${roomId}`);
      return response.data;
    } catch (error) {
      throw ApiErrorHandler.handle(error);
    }
  },

  sendMessage: async (data: SendMessageRequest): Promise<ChatMessage> => {
    try {
      const response = await axiosInstance.post(API_ENDPOINTS.CHAT.SEND_MESSAGE, data);
      return response.data;
    } catch (error) {
      throw ApiErrorHandler.handle(error);
    }
  },
}; 