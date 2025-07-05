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

export const updateUserAvatar = async (formData) => {
    try {
        const response = await axiosInstance.put(
            '/v1/user/profile-image',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        );
        if (response.status !== 200) {
            throw new Error('failed to update avatar');
        }
        return response.data;
    } catch (error) {
        console.error('Error updating avatar', error);
        throw error;
    }
}

export const deleteUser = async ({ name }) => {
    try {
        const response = await axiosInstance.delete(
            '/v1/user/destroy',
            { name }
        );
        console.log(response);
        if (response.status !== 200) {
            throw new Error("Failed to delete user");
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

