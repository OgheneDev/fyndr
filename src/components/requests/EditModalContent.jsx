import { X, Trash2, Plus, Briefcase, Award, Globe, Star } from "lucide-react";

export const ModalContent = ({
  addWorkExperience,
  handleFormSubmit,
  removeWorkExperience,
  removeLanguage,
  removeSkill,
  addLanguage,
  addSkill,
  updateLanguage,
  updateSkill,
  updateWorkExperience,
  isUpdating,
  formData,
  setShowEditModal,
  setFormData
}) => (
  <div
    className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[9999] p-4 transition-all duration-300"
    aria-modal="true"
    role="dialog"
    tabIndex={-1}
    onClick={() => setShowEditModal(false)}
  >
    <div
      className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden relative shadow-2xl transform transition-all duration-300 scale-100"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gradient-to-r from-[#85CE5C] to-[#6FB848] text-white sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-lg">
            <Star className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-semibold">Edit Your CV</h2>
        </div>
        <button
          onClick={() => setShowEditModal(false)}
          className="p-2 hover:bg-white/20 transition-colors rounded-full group"
        >
          <X size={20} className="group-hover:rotate-90 transition-transform duration-200" />
        </button>
      </div>

      <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
        <div className="p-6 space-y-8">
          {/* Work Experience Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-[#85CE5C]/10 rounded-lg">
                <Briefcase className="w-5 h-5 text-[#85CE5C]" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Work Experience</h3>
            </div>
            
            <div className="space-y-4">
              {formData.workExperienceDetails.map((exp, index) => (
                <div key={index} className="group border border-gray-200 rounded-xl p-5 hover:border-[#85CE5C]/30 hover:shadow-md transition-all duration-200 bg-gray-50/50">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-sm font-medium text-gray-700">
                        Company
                      </label>
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => updateWorkExperience(index, 'company', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#85CE5C] focus:border-transparent transition-all duration-200 bg-white"
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#85CE5C] focus:border-transparent transition-all duration-200 bg-white"
                        placeholder="Position title"
                      />
                    </div>
                  </div>
                  <div className="mt-4 space-y-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Duration
                    </label>
                    <input
                      type="text"
                      value={exp.duration}
                      onChange={(e) => updateWorkExperience(index, 'duration', e.target.value)}
                      placeholder="e.g. Jan 2020 - Present"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#85CE5C] focus:border-transparent transition-all duration-200 bg-white"
                    />
                  </div>
                  {formData.workExperienceDetails.length > 1 && (
                    <div className="flex justify-end mt-4">
                      <button
                        type="button"
                        onClick={() => removeWorkExperience(index)}
                        className="flex items-center gap-2 px-3 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200 text-sm font-medium"
                      >
                        <Trash2 size={16} />
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <button
              type="button"
              onClick={addWorkExperience}
              className="flex items-center gap-2 text-[#85CE5C] hover:text-[#6FB848] hover:bg-[#85CE5C]/5 px-4 py-3 rounded-lg transition-all duration-200 font-medium"
            >
              <Plus size={18} />
              Add Work Experience
            </button>
          </div>

          {/* Skills Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-[#85CE5C]/10 rounded-lg">
                <Star className="w-5 h-5 text-[#85CE5C]" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Skills</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {formData.skills.map((skill, index) => (
                <div key={index} className="flex gap-2 group">
                  <input
                    type="text"
                    value={skill}
                    onChange={(e) => updateSkill(index, e.target.value)}
                    placeholder="Enter skill"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#85CE5C] focus:border-transparent transition-all duration-200 bg-white"
                  />
                  {formData.skills.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSkill(index)}
                      className="px-3 py-3 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200 opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>
            
            <button
              type="button"
              onClick={addSkill}
              className="flex items-center gap-2 text-[#85CE5C] hover:text-[#6FB848] hover:bg-[#85CE5C]/5 px-4 py-3 rounded-lg transition-all duration-200 font-medium"
            >
              <Plus size={18} />
              Add Skill
            </button>
          </div>

          {/* Additional Certificate Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-[#85CE5C]/10 rounded-lg">
                <Award className="w-5 h-5 text-[#85CE5C]" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Additional Certificates</h3>
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#85CE5C] focus:border-transparent transition-all duration-200 bg-white resize-none"
              />
              <p className="text-xs text-gray-500 mt-1">Separate multiple certificates with line breaks</p>
            </div>
          </div>

          {/* Languages Section */}
          <div className="space-y-4 mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-[#85CE5C]/10 rounded-lg">
                <Globe className="w-5 h-5 text-[#85CE5C]" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Languages</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ">
              {formData.languages.map((language, index) => (
                <div key={index} className="flex gap-2 group">
                  <input
                    type="text"
                    value={language}
                    onChange={(e) => updateLanguage(index, e.target.value)}
                    placeholder="e.g. English (Native), Spanish (Fluent)"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#85CE5C] focus:border-transparent transition-all duration-200 bg-white"
                  />
                  {formData.languages.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeLanguage(index)}
                      className="px-3 py-3 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200 opacity-0 group-hover:opacity-100"
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
              className="flex items-center gap-2 text-[#85CE5C] hover:text-[#6FB848] hover:bg-[#85CE5C]/5 px-4 py-3 rounded-lg transition-all duration-200 font-medium"
            >
              <Plus size={18} />
              Add Language
            </button>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex justify-end gap-3 p-6 border-t border-gray-100 bg-gray-50/50 sticky bottom-0">
        <button
          type="button"
          onClick={() => setShowEditModal(false)}
          className="px-6 py-3 text-gray-600 border border-gray-300 cursor-pointer rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-medium"
          disabled={isUpdating}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isUpdating}
          onClick={handleFormSubmit}
          className="px-8 py-3 bg-gradient-to-r from-[#85CE5C] to-[#6FB848] cursor-pointer text-white rounded-lg hover:from-[#6FB848] hover:to-[#5FA63B] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-medium shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
        >
          {isUpdating && (
            <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
          )}
          {isUpdating ? 'Updating CV...' : 'Save Changes'}
        </button>
      </div>
    </div>
  </div>
);