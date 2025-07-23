import axiosInstance from "@/api/axios";

export const getMerchantProfile = async () => {
    try {
        const response = await axiosInstance.get(
            '/v1/merchant/profile'
        );
        const { data, status } = response;
        if (response.status !== 200) {
            throw new Error('failed to fetch merchant profile')
        }
        console.log('Merchant Profile:', response)
        return data.data
    } catch (error) {
        console.error('Error fetching merchant', error);
        return [];
    }
}

export const updateMerchantAvatar = async (formData) => {
    try {
        const response = await axiosInstance.put(
            '/v1/merchant/profile-image',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        );

        if (response.status !== 200) {
            throw new Error("Failed to update profile image");
        }
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

export const updateMerchantAvailability = async (isAvailable) => {
    try {
        const response = await axiosInstance.put(
            '/v1/merchant/update/availability',
            { isAvailable }
        );
        console.log(response);
        if (response.status !== 200) {
            throw new Error("Failed to update availability");
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

export const updateMerchantBusinessDetails = async ({ servicesOffered, businessAddress, businessLocation }) => {
    try {
        const response = await axiosInstance.put(
            '/v1/merchant/update/business',
            { servicesOffered, businessAddress, businessLocation }
        );
        console.log(response);
        if (response.status !== 200) {
            throw new Error("Failed to update business details");
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

export const deleteMerchant = async ({ name }) => {
    try {
        const response = await axiosInstance.delete(
            '/v1/merchant/destroy',
            { name }
        );
        console.log(response);
        if (response.status !== 200) {
            throw new Error("Failed to delete merchant");
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