import axiosInstance from "../axios";

export const createCV = async (formData) => {
    try {
        const response = await axiosInstance.post(
            'v1/cv',
            formData
        );
        console.log(response)
        return response.data
    } catch (error) {
        if (error.response) {
            console.error("Error response:", error.response.data);
            throw error.response.data;
        } else if (error.request) {
            console.error("No response received:", error.request);
            throw new Error('No response received from the server');
        } else {
            console.error("Error:", error.message);
            throw new Error(error.message);
        }
    }
}

export const getAllCvs = async () => {
    try {
        const response = await axiosInstance.get(
            'v1/cv'
        );
        console.log(response);
        return response.data
    } catch (error) {
        if (error.response) {
            console.error("Error response:", error.response.data);
            throw error.response.data;
        } else if (error.request) {
            console.error("No response received:", error.request);
            throw new Error('No response received from the server');
        } else {
            console.error("Error:", error.message);
            throw new Error(error.message);
        }
    }
}

export const getCvById = async ({cvId}) => { 
    try {
        const response = await axiosInstance.get(
            `v1/cv/single/${cvId}`
        );
        return response.data
    } catch (error) {
        if (error.response) {
            console.error("Error response:", error.response.data);
            throw error.response.data;
        } else if (error.request) {
            console.error("No response received:", error.request);
            throw new Error('No response received from the server');
        } else {
            console.error("Error:", error.message);
            throw new Error(error.message);
        }
    }

}