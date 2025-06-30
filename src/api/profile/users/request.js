import axiosInstance from "@/api/axios";

export const getUserProfile = async () => {
    try {
        const response = await axiosInstance.get(
            '/v1/user/profile'
        );
        const { data, status } = response;
        if (response.status !== 200) {
            throw new Error('failed to fetch user profile')
        }
        console.log('API response:', response)
        return data.data
    } catch (error) {
        console.error('Error fetching user profile', error);
        return [];
    }
}