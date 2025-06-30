import axiosInstance from "../axios";

export const initiatePayment = async ({requestId}) => {
    try {
        const response = await axiosInstance.post(
            '/v1/payment/initiate',
            {requestId}
        )
        console.log(response)
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error("Error response:", error.response.data);
            throw error.response.data;
        } else if (error.request) {
            console.error("No response received:", error.request);
            throw error.request;
        } else {
            console.error("Error:", error.message);
            throw error.message;
        }
    }
}

export const verifyPayment = async ({ requestId, reference }) => {
    try {
        const response = await axiosInstance.post(
            '/v1/payment/verify',
            { requestId, reference }
        );
        console.log(response)
        return response.data
    } catch (error) {
        if (error.response) {
            console.error("Error response:", error.response.data);
            throw error.response.data;
        } else if (error.request) {
            console.error("No response received:", error.request);
            throw error.request;
        } else {
            console.error("Error:", error.message);
            throw error.message;
        }
    }
}

