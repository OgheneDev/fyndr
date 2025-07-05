import axiosInstance from "../axios";

export const rateMerchant = async ({ merchantId, rating, review }) => {
    try {
    const response = axiosInstance.post(
        '/v1/user/rate',
        { merchantId, rating, review }
    );
    console.log(response);
    if (response.status !== 200) {
            throw new Error("Failed to rate merchant");
        }
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