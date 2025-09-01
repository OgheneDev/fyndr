import React from "react";
import { humanize } from "@/utils/humanize";

export default function MainContent({ cv }) {
  const ed = cv.educationDetails || {};
  const workExperiences = Array.isArray(cv.workExperienceDetails) ? cv.workExperienceDetails : [];

  return (
    <div className="flex-1">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-xl md:text-5xl font-bold text-teal-700 mb-2 tracking-wide">
          {(cv.firstName?.toUpperCase() || "FIRST")} {(cv.lastName?.toUpperCase() || "LAST")}
        </h1>
        <h2 className="md:text-xl text-sm text-teal-600 font-medium">
          {workExperiences[0]?.jobTitle || ed.educationMajor || "Professional"}
        </h2>
        <p className="text-gray-600 text-[10px] md:text-sm mt-4 leading-relaxed max-w-2xl">
          {cv.bio || `${cv.hasWorkExperience ? 'An experienced' : 'A passionate'} professional with a strong background in ${workExperiences[0]?.jobTitle || ed.educationMajor || 'their field'} and a commitment to delivering excellence in every project.`}
        </p>
      </div>

      {/* Experience Section */}
      <div className="mb-12">
        <div className="bg-teal-700 text-white text-center py-3 mb-6 font-bold md:text-sm text-[10px] tracking-wider">
          EXPERIENCE
        </div>
        
        {cv.hasWorkExperience && workExperiences.length > 0 ? (
          workExperiences.map((we, index) => (
            <div key={index} className="mb-8">
              <h3 className="text-sm md:text-lg font-bold text-gray-900 mb-1">
                {we.company || "Previous Company"} - {cv.state || "Location"}
              </h3>
              <p className="text-[10px] md:text-sm text-gray-600 mb-3">
                {we.startYear || "2020"} - {we.endYear || "2024"}
              </p>
              <p className="text-gray-700 text-[10px] md:text-sm leading-relaxed">
                {we.description || `Served as ${we.jobTitle || "Professional"} with ${we.years || "multiple"} years of experience. Demonstrated expertise in ${cv.skills?.[0] ? humanize(cv.skills[0]) : "core competencies"} and contributed significantly to organizational goals through dedicated service and professional excellence.`}
              </p>
            </div>
          ))
        ) : (
          <div className="mb-8">
            <h3 className="text-sm md:text-lg font-bold text-gray-900 mb-1">
              Entry Level Professional - {cv.state || "Nigeria"}
            </h3>
            <p className="text-[10px] md:text-sm text-gray-600 mb-3">
              Recent Graduate
            </p>
            <p className="text-gray-700 text-[10px] md:text-sm leading-relaxed">
              Recent graduate with strong academic foundation and eager to apply theoretical knowledge in a practical professional setting. Demonstrates excellent learning ability and commitment to professional growth.
            </p>
          </div>
        )}
      </div>

      {/* Education Section */}
      <div className="mb-12">
        <div className="bg-teal-700 text-white text-center py-3 mb-6 font-bold md:text-sm text-[10px] tracking-wider">
          EDUCATION
        </div>
        
        <div className="mb-6">
          <h3 className="text-sm md:text-lg font-bold text-gray-900 mb-1">
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
          <div className="mb-6">
            <h3 className="text-sm md:text-lg font-bold text-gray-900 mb-1">
              Additional Certification
            </h3>
            <p className="text-gray-700 font-medium text-[10px] md:text-sm">
              {cv.additionalCertificate}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}