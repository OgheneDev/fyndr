import axiosInstance from "@/api/axios";

// Request OTP for merchant
export const requestMerchantOtp = async ({ number }) => {
    try {
        const response = await axiosInstance.post(
            '/v1/auth/otp/merchant',
            { number }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Verify OTP (general route)
export const verifyOtp = async ({ usertype, number, otp }) => {
    try {
        const response = await axiosInstance.post(
            '/v1/auth/otp/verify',
            { usertype, number, otp }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Register merchant
export const registerMerchant = async (merchantData) => {
    try {
        const response = await axiosInstance.post(
            '/v1/auth/register/merchant',
            merchantData
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};