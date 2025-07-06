import axiosInstance from "@/api/axios";

// Request OTP for merchant
export const requestMerchantOtp = async ({ number }) => {
    try {
        const response = await axiosInstance.post(
            '/v1/auth/otp/merchant',
            { number }
        );
        console.log(response);
        return response.data;
    } catch (error) { 
        throw error;
    }
};

// Verify OTP (general route)
export const verifyOtp = async ({ number, otp, userType }) => {
    try {
        const response = await axiosInstance.post(
            '/v1/auth/otp/verify',
            { userType, number, otp }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Logout
export const logout = () => {
    try {
        localStorage.removeItem("authToken");
        sessionStorage.removeItem("authToken");
        window.location.href = "/login";
        return true;
    } catch (error) {
        console.error("Logout error:", error);
        return false;
    }
};

// Register merchant
export const registerMerchant = async (merchantData) => {
    try {
        const response = await axiosInstance.post(
            '/v1/auth/register/merchant',
            merchantData
        );
        console.log(response)
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
};