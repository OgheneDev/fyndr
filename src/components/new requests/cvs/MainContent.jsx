import React from "react";
import { humanize } from "@/utils/humanize";

export default function MainContent({ cv }) {
  const ed = cv.educationDetails || {};
  const workExperiences = Array.isArray(cv.workExperienceDetails) ? cv.workExperienceDetails : [];

  return (
    <div className="flex-1 p-[16px] md:p-8 bg-white">
      {/* Header */}
      <div className="mb-[16px] md:mb-12"> 
        <h1 className="text-[20px] md:text-5xl font-bold text-teal-700 mb-[4px] md:mb-2 tracking-[0.05em] leading-[1.1]">
          {(cv.firstName?.toUpperCase() || "FIRST")} {(cv.lastName?.toUpperCase() || "LAST")}
        </h1>
        <h2 className="text-[12px] md:text-xl text-teal-600 font-medium mb-[8px] md:mb-4">
          {workExperiences[0]?.jobTitle || ed.educationMajor || "Professional"}
        </h2>
        <p className="text-gray-600 text-[10px] leading-[1.4] md:text-sm">
          {cv.bio || `${cv.hasWorkExperience ? 'An experienced' : 'A passionate'} professional with a strong background in ${workExperiences[0]?.jobTitle || ed.educationMajor || 'their field'}.`}
        </p>
      </div>

      {/* Experience Section */}
      <div className="mb-[12px] md:mb-12">
        <div className="bg-teal-700 text-white text-center py-[8px] mb-[12px] md:mb-6 font-bold text-[11px] md:text-sm tracking-[0.1em]">
          EXPERIENCE
        </div>
        
        {cv.hasWorkExperience && workExperiences.length > 0 ? (
          workExperiences.map((we, index) => (
            <div key={index} className="mb-[12px] md:mb-8">
              <h3 className="text-[12px] md:text-lg font-bold text-gray-900 mb-[2px] md:mb-1">
                {we.company || "Previous Company"} - {cv.state || "Location"}
              </h3>
              <p className="text-[10px] md:text-sm text-gray-600 mb-[6px] md:mb-3">
                {we.startYear || "2020"} - {we.endYear || "2024"}
              </p>
              <p className="text-gray-700 text-[10px] md:text-sm leading-[1.4]">
                {we.description || `Served as ${we.jobTitle || "Professional"} with expertise in ${cv.skills?.[0] ? humanize(cv.skills[0]) : "core competencies"}.`}
              </p>
            </div>
          ))
        ) : (
          <div className="mb-[12px] md:mb-8">
            <h3 className="text-[14px] md:text-lg font-bold text-gray-900 mb-[2px] md:mb-1">
              Entry Level Professional - {cv.state || "Nigeria"}
            </h3>
            <p className="text-[11px] md:text-sm text-gray-600 mb-[6px] md:mb-3">
              Recent Graduate
            </p>
            <p className="text-gray-700 text-[12px] md:text-sm leading-[1.4]">
              Recent graduate eager to apply theoretical knowledge in a professional setting.
            </p>
          </div>
        )}
      </div>

      {/* Education Section */}
      <div className="mb-[12px] md:mb-12">
        <div className="bg-teal-700 text-white text-center py-[8px] mb-[12px] md:mb-6 font-bold text-[11px] md:text-sm tracking-[0.1em]">
          EDUCATION
        </div>
        
        <div className="mb-[12px] md:mb-6">
          <h3 className="text-[12px] md:text-lg font-bold text-gray-900 mb-[2px] md:mb-1">
            {ed.schoolName || "University"}
          </h3>
          <p className="text-gray-700 text-[10px] md:text-sm font-medium">
            {ed.educationMajor}
          </p>
          <p className="text-[10px] md:text-sm text-gray-600">
            {ed.startYear || "2018"}-{ed.endYear || "2022"}
          </p>
        </div>

        {cv.additionalCertificate && (
          <div className="mb-[12px] md:mb-6">
            <h3 className="text-[12px] md:text-lg font-bold text-gray-900 mb-[2px] md:mb-1">
              Certification
            </h3>
            <p className="text-gray-700 text-[10px] md:text-sm font-medium">
              {cv.additionalCertificate}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}