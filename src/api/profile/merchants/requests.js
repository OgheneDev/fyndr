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
        console.log('API response:', response)
        return data.data
    } catch (error) {
        console.error('Error fetching merchant', error);
        return [];
    }
}

export const updateMerchantProfileImage = async ({avatar}) => {
    try {
        const response = await axiosInstance.put(
            '/v1/merchant/profile-image',
            {avatar}
        );

        if (response !== 200) {
            throw new Error("Failed to update profile image");
        }
    } catch (error) {
        console.error('Error updating profile image', error);
        throw error;
    }
}