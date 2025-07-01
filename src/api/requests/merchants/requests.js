import axiosInstance from "@/api/axios";

export const getRequests = async () => {
    try {
        const response = await axiosInstance.get(
            '/v1/request/merchant'
        );
        console.log('API response:', response);
        const { data, status } = response;
        if (response.status !== 200) {
            throw new Error('failed to fetch requests')
        }
        return data.data
    } catch (error) {
        console.error('Error fetching requests', error);
        return [];
    }
}

export const getMerchantRequestById = async (requestId) => {
    try {
        const response = await axiosInstance.get(
            `/v1/request/merchant/${requestId}`
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