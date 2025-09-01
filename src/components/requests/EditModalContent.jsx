import { X, Trash2, Plus, Briefcase, Award, Globe, Star } from "lucide-react";
import Select from 'react-select'

const skills = [
  { display: 'Customer service', value: 'customer-service' },
  { display: 'Organizational skills', value: 'organizational-skills' },
  { display: 'Microsoft office', value: 'microsoft-office' },
  { display: 'Maintenance', value: 'maintenance' },
  { display: 'Communication', value: 'communication' },
  { display: 'Leadership', value: 'leadership' },
  { display: 'Accounting', value: 'accounting' },
  { display: 'Cash handling', value: 'cash-handling' },
];

export const ModalContent = ({
  addWorkExperience,
  handleFormSubmit,
  removeWorkExperience,
  removeLanguage,
  addLanguage,
  updateLanguage,
  updateWorkExperience,
  isUpdating,
  formData,
  setShowEditModal,
  setFormData
}) => (
  <div
    className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[9999] p-0 sm:p-4 transition-all endYear-300 h-full w-full"
    aria-modal="true"
    role="dialog"
    tabIndex={-1}
    onClick={() => setShowEditModal(false)}
  >
    <div
      className="bg-white rounded-none sm:rounded-2xl max-w-3xl w-full max-h-full sm:max-h-[90vh] overflow-hidden relative shadow-2xl transform transition-all endYear-300 scale-100 h-full sm:h-auto"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-100 bg-gradient-to-r from-[#85CE5C] to-[#6FB848] text-white sticky top-0 z-10">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="p-1.5 sm:p-2 bg-white/20 rounded-lg">
            <Star className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <h2 className="text-lg sm:text-xl font-semibold">Edit Your CV</h2>
        </div>
        <button
          onClick={() => setShowEditModal(false)}
          className="p-1.5 sm:p-2 cursor-pointer hover:bg-white/20 transition-colors rounded-full group touch-target"
        >
          <X size={18} className="sm:w-5 sm:h-5 group-hover:rotate-90 transition-transform endYear-200" />
        </button>
      </div>

      <div className="overflow-y-auto max-h-[calc(100vh-120px)] sm:max-h-[calc(90vh-140px)]">
        <div className="p-4 sm:p-6 space-y-6 sm:space-y-8">
          {/* Work Experience Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 sm:gap-3 mb-4">
              <div className="p-1.5 sm:p-2 bg-[#85CE5C]/10 rounded-lg">
                <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 text-[#85CE5C]" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-800">Work Experience</h3>
            </div>
            
            <div className="space-y-4">
              {formData.workExperienceDetails.map((exp, index) => (
                <div key={index} className="group border border-gray-200 rounded-lg sm:rounded-xl p-4 sm:p-5 hover:border-[#85CE5C]/30 hover:shadow-md transition-all endYear-200 bg-gray-50/50">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="space-y-1">
                      <label className="block text-sm font-medium text-gray-700">
                        Company
                      </label>
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => updateWorkExperience(index, 'company', e.target.value)}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#85CE5C] focus:border-transparent transition-all endYear-200 bg-white text-sm sm:text-base"
                        placeholder="Company name"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-sm font-medium text-gray-700">
                        Job Title
                      </label>
                      <input
                        type="text"
                        value={exp.jobTitle}
                        onChange={(e) => updateWorkExperience(index, 'jobTitle', e.target.value)}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#85CE5C] focus:border-transparent transition-all endYear-200 bg-white text-sm sm:text-base"
                        placeholder="Position title"
                      />
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="mt-3 sm:mt-4 space-y-1 flex-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Start Year
                    </label>
                    <input
                      type="text"
                      value={exp.startYear}
                      onChange={(e) => updateWorkExperience(index, 'startYear', e.target.value)}
                      placeholder="e.g. 2020"
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#85CE5C] focus:border-transparent transition-all endYear-200 bg-white text-sm sm:text-base"
                    />
                  </div>
                  <div className="mt-3 sm:mt-4 space-y-1 flex-1">
                    <label className="block text-sm font-medium text-gray-700">
                      End Year
                    </label>
                    <input
                      type="text"
                      value={exp.endYear}
                      onChange={(e) => updateWorkExperience(index, 'endYear', e.target.value)}
                      placeholder="e.g. 2021"
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#85CE5C] focus:border-transparent transition-all endYear-200 bg-white text-sm sm:text-base"
                    />
                  </div>
                  </div>
                  <div className="mt-3 sm:mt-4 space-y-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Job Description
                    </label>
                     <div>
            <textarea
              value={exp.description || ''}
              onChange={(e) => updateWorkExperience(index, 'description', e.target.value)}
              placeholder="Enter job description"
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#85CE5C] focus:border-transparent transition-all endYear-200 bg-white text-sm sm:text-base min-h-[150px]"
            />
          </div>
                  </div>
                  {formData.workExperienceDetails.length > 1 && (
                    <div className="flex justify-end mt-3 sm:mt-4">
                      <button
                        type="button"
                        onClick={() => removeWorkExperience(index)}
                        className="flex items-center cursor-pointer gap-2 px-3 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all endYear-200 text-sm font-medium touch-target"
                      >
                        <Trash2 size={16} />
                        <span className="hidden sm:inline">Remove</span>
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <button
              type="button"
              onClick={addWorkExperience}
              className="flex items-center gap-2 cursor-pointer text-[#85CE5C] hover:text-[#6FB848] hover:bg-[#85CE5C]/5 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg transition-all endYear-200 font-medium text-sm sm:text-base"
            >
              <Plus size={16} className="sm:w-[18px] sm:h-[18px]" />
              Add Work Experience
            </button>
          </div>

          {/* Skills Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 sm:gap-3 mb-4">
              <div className="p-1.5 sm:p-2 bg-[#85CE5C]/10 rounded-lg">
                <Star className="w-4 h-4 sm:w-5 sm:h-5 text-[#85CE5C]" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-800">Skills</h3>
            </div>

            <div className="grid grid-cols-1 gap-3">
              <Select
                isMulti
                options={skills}
                getOptionLabel={(option) => option.display}
                getOptionValue={(option) => option.value}
                value={skills.filter((option) => formData.skills.includes(option.value))}
                onChange={(selectedOptions) => {
                  const selectedValues = selectedOptions
                    ? selectedOptions.map((option) => option.value)
                    : [];
                  setFormData((prev) => ({
                    ...prev,
                    skills: selectedValues,
                  }));
                }}
                placeholder="Select skills..."
                className="text-sm sm:text-base"
                classNamePrefix="react-select"
                styles={{
                  control: (base) => ({
                    ...base,
                    borderColor: '#d1d5db',
                    '&:hover': { borderColor: '#85CE5C' },
                    boxShadow: 'none',
                    '&:focus-within': {
                      borderColor: '#85CE5C',
                      boxShadow: '0 0 0 2px rgba(133, 206, 92, 0.5)',
                    },
                    padding: '2px',
                    backgroundColor: '#fff',
                  }),
                  multiValue: (base) => ({
                    ...base,
                    backgroundColor: '#85CE5C',
                    color: '#fff',
                  }),
                  multiValueLabel: (base) => ({
                    ...base,
                    color: '#fff',
                  }),
                  multiValueRemove: (base) => ({
                    ...base,
                    color: '#fff',
                    '&:hover': {
                      backgroundColor: '#6FB848',
                      color: '#fff',
                    },
                  }),
                  placeholder: (base) => ({
                    ...base,
                    color: '#6b7280',
                  }),
                }}
              />
            </div>
            </div>

          {/* Additional Certificate Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 sm:gap-3 mb-4">
              <div className="p-1.5 sm:p-2 bg-[#85CE5C]/10 rounded-lg">
                <Award className="w-4 h-4 sm:w-5 sm:h-5 text-[#85CE5C]" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-800">Additional Certificates</h3>
            </div>
            
            <div className="space-y-1">
              <textarea
                value={formData.additionalCertificate}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    additionalCertificate: e.target.value,
                  }))
                }
                placeholder="List your certifications, achievements, or additional qualifications..."
                rows={4}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#85CE5C] focus:border-transparent transition-all endYear-200 bg-white resize-none text-sm sm:text-base"
              />
            </div>
          </div>

          {/* Languages Section */}
          <div className="space-y-4 pb-15">
            <div className="flex items-center gap-2 sm:gap-3 mb-4">
              <div className="p-1.5 sm:p-2 bg-[#85CE5C]/10 rounded-lg">
                <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-[#85CE5C]" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-800">Languages</h3>
            </div>
            
            <div className="grid grid-cols-1 gap-3">
              {formData.languages.map((language, index) => (
                <div key={index} className="flex gap-2 group">
                  <input
                    type="text"
                    value={language}
                    onChange={(e) => updateLanguage(index, e.target.value)}
                    placeholder="e.g. English (Native), Spanish (Fluent)"
                    className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#85CE5C] focus:border-transparent transition-all endYear-200 bg-white text-sm sm:text-base"
                  />
                  {formData.languages.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeLanguage(index)}
                      className="px-3 py-2.5 sm:py-3 cursor-pointer text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all endYear-200 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 touch-target"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>
            
            <button
              type="button"
              onClick={addLanguage}
              className="flex items-center cursor-pointer gap-2 text-[#85CE5C] hover:text-[#6FB848] hover:bg-[#85CE5C]/5 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg transition-all endYear-200 font-medium text-sm sm:text-base"
            >
              <Plus size={16} className="sm:w-[18px] sm:h-[18px]" />
              Add Language
            </button>
          </div>
        </div>
      </div>

      {/* Improved Footer Actions */}
      <div className="border-t border-gray-100 bg-white sticky bottom-0 z-10">
        <div className="flex flex-col sm:flex-row gap-3 p-4 sm:p-6">
          <button
            type="button"
            onClick={() => setShowEditModal(false)}
            className="order-2 sm:order-1 cursor-pointer sm:ml-auto px-4 sm:px-6 py-3 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all endYear-200 font-medium text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isUpdating}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isUpdating}
            onClick={handleFormSubmit}
            className="order-1 sm:order-2 px-6 cursor-pointer sm:px-8 py-3 bg-gradient-to-r from-[#85CE5C] to-[#6FB848] text-white rounded-lg hover:from-[#6FB848] hover:to-[#5FA63B] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-medium shadow-lg hover:shadow-xl transition-all endYear-200 transform hover:scale-[1.02] active:scale-[0.98] text-sm sm:text-base min-h-[48px] touch-target"
          >
            {isUpdating && (
              <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
            )}
            {isUpdating ? 'Updating CV...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  </div>
);