// src/services/openAPIService.ts
import axiosInstance from "../libs/interceptor";

const OpenAPIService = {
  // Example function to send data using POST
  async sendDataToOpenAPI(userText: string) {
    try {
      const response = await axiosInstance.post(
        '/api/chat', // URL endpoint
        JSON.stringify({ content: userText }), // Data being sent (you might want to wrap it in an object if the server expects JSON)
        {
          headers: {
            'Content-Type': 'application/json', // Ensure the content-type is JSON
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error sending data to OpenAPI:', error);
      throw error;
    }
  },
}

export default OpenAPIService;
