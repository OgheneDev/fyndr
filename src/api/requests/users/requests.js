import axiosInstance from "@/api/axios";

export const getRequests = async () => {
    try {
        const response = await axiosInstance.get(
            '/v1/request/user'
        );
        console.log('API response:', response);
        const { data, status } = response;
        if (response.status !== 200) {
            throw new Error(`Failed to fetch requests: status ${response.status}`)
        }
        return data.data
    } catch (error) {
        if (error.response) {
            console.error("Error response:", error.response.data);
            return [];
        } else if (error.request) {
            console.error("No response received:", error.request);
            return [];
        } else {
            console.error("Error:", error.message);
            return [];
        }
    }
}

export const getUserRequestById = async (requestId) => {
    try {
        const response = await axiosInstance.get(
            `/v1/request/user/${requestId}`
        );
        console.log('API response:', response);
        const { data, status } = response;
        if (response.status !== 200) {
            throw new Error(`Failed to fetch requests: status ${response.status}`)
        }
        return data.data
    } catch (error) {
        console.error("Error fetching request");
        throw error
    }
}

export const realEstateRequest = async (formData) => {
    try {
        const response = await axiosInstance.post(
            '/v1/request/real-estate',
            formData
        );
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

export const carHireRequest = async (formData) => {
    try {
        const response = await axiosInstance.post(
            '/v1/request/car-hire',
            formData
        );
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

export const cleaningRequest = async (formData) => {
    try {
        const response = await axiosInstance.post(
            '/v1/request/cleaning',
            formData
        );
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

export const carPartsRequest = async (formData) => {
    try {
        const response = await axiosInstance.post(
            '/v1/request/car-part',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        );
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

export const automobileRequest = async (formData) => {
    try {
        const response = await axiosInstance.post(
            '/v1/request/automobile',
            formData
        );
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

export const acceptMerchantInterest = async (requestId, interestId) => {
    try {
        const response = await axiosInstance.put(
            `/v1/request/user/${requestId}/interest`,
            { interestId }
        );
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

export const cancelUserRequest = async (requestId) => {
    try {
        const response = await axiosInstance.put(
            `/v1/request/user/${requestId}/cancel`
        );
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

export const closeUserRequest = async (requestId) => {
    try {
        const response = await axiosInstance.put(
            `/v1/request/user/${requestId}/close`
        );
        console.log(response);
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

export const chooseMerchantForRequest = async (requestId, merchantId) => {
    try {
        const response = await axiosInstance.put(
            `/v1/request/user/${requestId}/choose`,
            { merchantId }
        );
        console.log(response);
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
