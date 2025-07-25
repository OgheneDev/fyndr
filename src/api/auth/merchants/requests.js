import axiosInstance from "@/api/axios";

// Request OTP for merchant
export const requestMerchantOtp = async ({ number, email }) => {
    try {
        const response = await axiosInstance.post(
            '/v1/auth/otp/merchant',
            { number, email }
        );
        console.log('Merchant OTP:', response);
        return response.data;
    } catch (error) { 
        throw error;
    }
};

// Resend OTP for Merchants
export const resendMerchantOtp = async ({ number, email }) => {
    try {
        const response = await axiosInstance.post(
            '/v1/auth/otp/merchant/resend',
            { number, email }
        );
        console.log('Resend Merchant OTP:', response)
    } catch (error) {
        throw error;
    }
}

// Verify OTP (general route)
export const verifyOtp = async ({ number, otp, userType, email }) => {
    try {
        const response = await axiosInstance.post(
            '/v1/auth/otp/verify',
            { userType, number, otp, email }
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
        window.location.href = "/";
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