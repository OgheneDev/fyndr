import axiosInstance from "@/api/axios";

export const getChats = async () => {
    try {
        const response = await axiosInstance.get(
            '/v1/chat'
        );
        const { data, status } = response;
        if (response.status !== 200) {
            throw new Error('failed to fetch chats')
        }
        console.log('API response:', response)
        return data.data
    } catch (error) {
        console.error('Error fetching chats', error);
        return [];
    }
}

export const getChatById = async (chatId) => {
    try {
        const response = await axiosInstance.get(
            `/v1/chat/${chatId}`
        );
        const { data, status } = response;
        if (response.status !== 200) {
            throw new Error('Failed to fetch chat')
        }
        console.log('API response:', response)
        return data.data
    } catch (error) {
        console.error('Error fetching chats', error);
        return [];
    }
}

export const sendMessage = async ({ chatId, senderType, content }) => {
    try {
        const response = await axiosInstance.post(
            '/v1/message',
            { chatId, senderType, content }
        );
        return response.data;
    } catch (error) {
        // Log detailed error info
        if (error.response) {
            // Server responded with a status other than 2xx
            console.error("Error response:", error.response.data);
            throw error.response.data; // or return error.response.data;
        } else if (error.request) {
            // Request was made but no response received
            console.error("No response received:", error.request);
            throw error.request;
        } else {
            // Something else happened
            console.error("Error:", error.message);
            throw error.message;
        }
    }
}

export const startNewChat = async ({ requestId }) => {
    try {
        const response = await axiosInstance.post(
            '/v1/chat',
            { requestId }
        );
        return response.data
    } catch (error) {
        // Log detailed error info
        if (error.response) {
            // Server responded with a status other than 2xx
            console.error("Error response:", error.response.data);
            throw error.response.data; // or return error.response.data;
        } else if (error.request) {
            // Request was made but no response received
            console.error("No response received:", error.request);
            throw error.request;
        } else {
            // Something else happened
            console.error("Error:", error.message);
            throw error.message;
        }
    }
}