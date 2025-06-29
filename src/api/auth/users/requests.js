import axiosInstance from "@/api/axios";

// Request OTP for users
export const requestUserOtp = async ({ number }) => {
    try {
        const response = await axiosInstance.post(
            '/v1/auth/otp/user',
            { number }
        );
        console.log(response);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// Register User
export const registerUser = async (userData) => {
    try {
        const response = await axiosInstance.post(
            '/v1/auth/register/user',
            userData
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