import axiosInstance from "../axios";

export const createJob = async (formData) => {
  try {
    const fd = new FormData();
    fd.append('company', formData.company);
    fd.append('firstName', formData.firstName);
    fd.append('lastName', formData.lastName);
    fd.append('number', formData.number);
    fd.append('email', formData.email);
    fd.append('howYouHeardAboutUs', formData.howYouHeardAboutUs);
    fd.append('jobTitle', formData.jobTitle);
    fd.append('jobLocation', formData.jobLocation);
    fd.append('type', formData.type);
    fd.append('startDate', formData.startDate);
    fd.append('salary', formData.salary);
    fd.append('salaryCurrency', formData.salaryCurrency);
    // Send benefits as individual entries or a single JSON string, depending on backend expectation
    formData.benefits.forEach((benefit) => fd.append('benefits[]', benefit)); // Use array notation
    fd.append('availableVacancy', formData.availableVacancy);
    fd.append('description', formData.description);
    if (formData.company_image) {
      fd.append('company_image', formData.company_image);
    }

    const response = await axiosInstance.post('v1/job', fd, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('createJob API response:', response);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Error response:', error.response.data);
      throw new Error(`Error Creating Job Listing: ${error.response.data.message || error.response.data}`);
    } else if (error.request) {
      console.error('No response received:', error.request);
      throw new Error('No response received from the server');
    } else {
      console.error('Error:', error.message);
      throw new Error(error.message);
    }
  }
};

export const getJobListingsByUser = async () => {
    try {
        const response = await axiosInstance.get(
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
        const response = await axiosInstance.get(
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
        const response = await axiosInstance.delete(
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

export const submitJobApplication = async ({ jobId, cvId, proposal }) => {
  try {
    // Send cvId + proposal to the job application endpoint
    const response = await axiosInstance.post(`v1/job/single/${jobId}`, {
      cvId,
      proposal,
    });
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
};

export const updateJobStatus = async ({jobId, status}) => {
    try {
        const response = await axiosInstance.put(
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
        const response = await axiosInstance.get(
            'v1/job'
        );
        console.log(response);
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
        const response = await axiosInstance.get(
            `v1/job/single/${jobId}`
        );
        console.log(response);
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
        const response = await axiosInstance.get(
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