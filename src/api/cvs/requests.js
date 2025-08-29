import axiosInstance from "../axios";

export const createCV = async (formData) => {
  try {
    const fd = new FormData();
    fd.append('firstName', formData.firstName || '');
    fd.append('lastName', formData.lastName || '');
    fd.append('number', formData.number || '');
    fd.append('email', formData.email || '');
    fd.append('state', formData.state || '');
    fd.append('lga', formData.lga || '');
    fd.append('area', formData.area || '');
    fd.append('isGraduate', formData.isGraduate ? 'true' : 'false');
    fd.append('educationLevel', formData.educationLevel || '');
    fd.append('educationMajor', formData.educationMajor || '');
    fd.append('schoolName', formData.schoolName || '');
    fd.append('startYear', formData.startYear || '');
    fd.append('endYear', formData.endYear || '');
    fd.append('hasWorkExperience', formData.hasWorkExperience ? 'true' : 'false');

    if (formData.workExperienceDetails && formData.workExperienceDetails.length > 0) {
      fd.append('workExperienceDetails', JSON.stringify(formData.workExperienceDetails));
    }

    if (formData.skills && formData.skills.length > 0) {
      formData.skills.forEach((skill) => fd.append('skills', skill));
    }

    fd.append('additionalCertificate', formData.additionalCertificate || '');

    if (formData.languages && formData.languages.length > 0) {
      formData.languages.forEach((lang) => fd.append('languages', lang));
    }

    if (formData.cv_image) {
      fd.append('cv_image', formData.cv_image);
    }

    const response = await axiosInstance.post('v1/cv', fd, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('createCV API response:', response);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Error response:', error.response.data);
      throw new Error(`Error Creating CV: ${error.response.data.message || error.response.data}`);
    } else if (error.request) {
      console.error('No response received:', error.request);
      throw new Error('No response received from the server');
    } else {
      console.error('Error:', error.message);
      throw new Error(error.message);
    }
  }
};


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