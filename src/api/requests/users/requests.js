import axiosInstance from "@/api/axios";

export const getRequests = async () => {
    try {
        const response = await axiosInstance.get(
            '/v1/request/user'
        );
        console.log('User Requests:', response);
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
        console.log('User Request:', response);
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

export const beautyRequest = async (formData) => {
    try {
        const response = await axiosInstance.post(
            'v1/request/beauty',
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

export const cateringRequest = async (formData) => {
    try {
        const response = await axiosInstance.post(
            'v1/request/catering',
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

export const carpenterRequest = async (formData) => {
    try {
        const response = await axiosInstance.post(
            'v1/request/carpenter',
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

export const electricianRequest = async (formData) => {
    try {
        const response = await axiosInstance.post(
            'v1/request/electrician',
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

export const itRequest = async (formData) => {
    try {
        const response = await axiosInstance.post(
            'v1/request/it',
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

export const mechanicRequest = async (formData) => {
    try {
        const response = await axiosInstance.post(
            'v1/request/mechanic',
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

export const mediaRequest = async (formData) => {
    try {
        const response = await axiosInstance.post(
            'v1/request/media',
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

export const plumberRequest = async (formData) => {
    try {
        const response = await axiosInstance.post(
            'v1/request/plumber',
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

export const hospitalityRequest = async (formData) => {
    try {
        const response = await axiosInstance.post(
            'v1/request/hospitality',
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

export const eventManagementRequest = async (formData) => {
    try {
        const response = await axiosInstance.post(
            'v1/request/event-management',
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
export const employmentRequest = async (formData) => {
    try {
        const response = await axiosInstance.post(
            'v1/request/employment',
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
    if (!requestId || !merchantId) {
        throw new Error('RequestId and merchantId are required');
    }

    try {
        console.log('Choosing merchant with details:', {
            requestId,
            merchantId,
        });
        
        const response = await axiosInstance.put(
            `/v1/request/user/${requestId}/chose`,
            { merchantId }
        );
        
        console.log('Choose merchant response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Choose merchant error details:', {
            requestId,
            merchantId,
            error: error.response?.data || error.message,
            status: error.response?.status
        });
        
        throw error.response?.data || error;
    }
}
