import axiosInstance from "../axios";

export const createJob = async (formData) => {
    try {
        const response = axiosInstance.post(
            'v1/job',
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

export const getJobListingsByUser = async () => {
    try {
        const response = axiosInstance.get(
            'v1/job/personal/posted'
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

export const getAppliedJobsByUser = async () => {
    try {
        const response = axiosInstance.get(
            'v1/job/personal/applied'
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

export const deleteJobListing = async ({jobId}) => {
    try {
        const response = axiosInstance.delete(
            `v1/job/single/${jobId}`
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

export const submitJobApplication = async ({jobId}) => {
    try {
        const response = axiosInstance.post(
            `v1/job/single/${jobId}`
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

export const updateJobStatus = async ({jobId, status}) => {
    try {
        const response = axiosInstance.put(
            `v1/job/single/${jobId}/status`,
            status
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

export const getAllJobs = async () => {
    try {
        const response = axiosInstance.get(
            'v1/job'
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

export const getJobById = async ({jobId}) => {
    try {
        const response = axiosInstance.get(
            `v1/job/single/${jobId}`
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

export const getJobApplications = async ({jobId}) => {
    try {
        const response = axiosInstance.get(
            `/v1/job/single/${jobId}/applications`
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