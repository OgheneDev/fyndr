"use client";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, User, Phone, Mail, MapPin, Download } from "lucide-react";
import Image from "next/image";
import { getCvById } from "@/api/cvs/requests";
import html2pdf from "html2pdf.js";

// Simple humanize helper
const humanize = (s) => (s ? String(s).replace(/-/g, " ").replace(/\b\w/g, ch => ch.toUpperCase()) : "");

export default function CvDetailsScreen({ cvId }) {
  const router = useRouter();
  const [cv, setCv] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [imgError, setImgError] = useState(false);
  const cvRef = useRef();

  useEffect(() => {
    if (!cvId) {
      setError("No CV specified");
      setLoading(false);
      return;
    }
    let mounted = true;
    async function fetchCv() {
      setLoading(true);
      setError("");
      try {
        const res = await getCvById({ cvId });
        const cvObj = res?.data || res;
        if (mounted) setCv(cvObj);
      } catch (err) {
        console.error("Error fetching CV:", err);
        if (mounted) setError("Failed to load CV");
      } finally {
        if (mounted) setLoading(false);
      }
    }
    fetchCv();
    return () => { mounted = false; };
  }, [cvId]);

  const handleDownload = () => {
    // Create temporary stylesheet to override OKLCH/OKLab and other colors
    const style = document.createElement('style');
    style.textContent = `
      /* Reset all possible color properties to safe hex values */
      * {
        color: inherit !important;
        background-color: transparent !important;
        border-color: transparent !important;
        box-shadow: none !important;
      }
      .pdf-override {
        --primary-color: #6BB344 !important;
        --primary-light: #85CE5C !important;
        --primary-opacity: rgba(107, 179, 68, 0.1) !important;
        --primary-border: rgba(107, 179, 68, 0.2) !important;
      }
      .bg-gradient-to-r {
        background: linear-gradient(to right, #85CE5C, #6BB344) !important;
      }
      .text-[#85CE5C] {
        color: #85CE5C !important;
      }
      .bg-[#85CE5C] {
        background-color: #85CE5C !important;
      }
      .hover\\:bg-[#6BB344]:hover {
        background-color: #6BB344 !important;
      }
      .border-[#85CE5C] {
        border-color: #85CE5C !important;
      }
      .border-[#85CE5C]\\/30 {
        border-color: rgba(107, 179, 68, 0.3) !important;
      }
      .bg-[#85CE5C]\\/10 {
        background-color: rgba(107, 179, 68, 0.1) !important;
      }
      .border-[#85CE5C]\\/20 {
        border-color: rgba(107, 179, 68, 0.2) !important;
      }
      .text-white {
        color: #FFFFFF !important;
      }
      .text-white\\/80 {
        color: rgba(255, 255, 255, 0.8) !important;
      }
      .text-white\\/90 {
        color: rgba(255, 255, 255, 0.9) !important;
      }
      .bg-white {
        background-color: #FFFFFF !important;
      }
      .bg-white\\/20 {
        background-color: rgba(255, 255, 255, 0.2) !important;
      }
      .border-white\\/30 {
        border-color: rgba(255, 255, 255, 0.3) !important;
      }
      .bg-gray-50 {
        background-color: #F9FAFB !important;
      }
      .text-gray-600 {
        color: #4B5563 !important;
      }
      .text-gray-700 {
        color: #374151 !important;
      }
      .text-gray-800 {
        color: #1F2937 !important;
      }
      .text-gray-900 {
        color: #111827 !important;
      }
      .text-red-500 {
        color: #EF4444 !important;
      }
      .bg-red-50 {
        background-color: #FEF2F2 !important;
      }
      /* Fallback for any remaining OKLCH/OKLab colors */
      [style*="oklch"], [style*="oklab"] {
        color: #000000 !important;
        background-color: #FFFFFF !important;
        border-color: #000000 !important;
      }
    `;
    document.head.appendChild(style);

    const element = cvRef.current;
    const opt = {
      margin: 0.5,
      filename: `${cv?.firstName || "John"}_${cv?.lastName || "Doe"}_CV.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2,
        useCORS: true, // Enable CORS for images
        logging: false // Disable logging for cleaner console
      },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().from(element).set(opt).save().then(() => {
      // Remove temporary stylesheet after PDF generation
      document.head.removeChild(style);
    }).catch((err) => {
      console.error("PDF generation error:", err);
      // Remove stylesheet even if there's an error
      document.head.removeChild(style);
      alert("Failed to generate PDF. Please try again.");
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#85CE5C]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="flex items-center gap-4 mb-4">
          <button onClick={() => router?.back()} className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#85CE5C] transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
        </div>
        <div className="text-center text-red-500 bg-red-50 p-8 rounded-lg">{error}</div>
      </div>
    );
  }

  if (!cv) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="flex items-center gap-4 mb-4">
          <button onClick={() => router?.back()} className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#85CE5C] transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
        </div>
        <div className="text-center text-gray-500 bg-gray-50 p-8 rounded-lg">No CV found</div>
      </div>
    );
  }

  const ed = cv.educationDetails || {};
  const workExperiences = Array.isArray(cv.workExperienceDetails) ? cv.workExperienceDetails : [];
  const fullName = `${cv.firstName || "John"} ${cv.lastName || "Doe"}`;

  return (
    <div className="min-h-screen bg-gray-50 py-4 md:py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Back Button */}
        <div className="mb-6">
          <button 
            onClick={() => router?.back()} 
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#85CE5C] transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" /> Back to CVs
          </button>
        </div>

        {/* CV Container */}
        <div id="cv-content" ref={cvRef} className="bg-white rounded-xl shadow-lg overflow-hidden pdf-override">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-[#85CE5C] to-[#6BB344] text-white p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              {/* Profile Image */}
              <div className="flex-shrink-0">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden bg-white/20 flex items-center justify-center border-4 border-white/30">
                  {cv.profileImage && !imgError ? (
                    <Image
                      src={cv.profileImage}
                      alt={`${fullName} avatar`}
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                      onError={() => setImgError(true)}
                    />
                  ) : (
                    <User size={48} className="text-white/80 md:w-[60px] md:h-[60px]" />
                  )}
                </div>
              </div>

              {/* Name and Contact */}
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-2xl md:text-4xl font-bold mb-2 tracking-wide">
                  {fullName.toUpperCase()}
                </h1>
                <h2 className="text-lg md:text-xl text-white/90 font-medium mb-4">
                  {workExperiences[0]?.jobTitle || ed.educationMajor || "Professional"}
                </h2>
                
                {/* Contact Info */}
                <div className="flex flex-col md:flex-row gap-4 text-sm">
                  <div className="flex items-center justify-center md:justify-start gap-2">
                    <MapPin size={16} />
                    <span>{cv.area || "Any Area"}, {cv.state || "Nigeria"}</span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start gap-2">
                    <Phone size={16} />
                    <span>{cv.number || "+234 XXX XXX XXXX"}</span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start gap-2">
                    <Mail size={16} />
                    <span className="break-all">{cv.email || "email@example.com"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Sections */}
          <div className="p-6 md:p-8">
            {/* Professional Summary */}
            {cv.bio && (
              <section className="mb-8">
                <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                  {cv.bio}
                </p>
              </section>
            )}

            {/* Experience Section */}
            <section className="mb-8">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-[#85CE5C]">
                Experience
              </h2>
              
              {cv.hasWorkExperience && workExperiences.length > 0 ? (
                <div className="space-y-6">
                  {workExperiences.map((experience, index) => (
                    <div key={index} className="relative pl-4 border-l-2 border-[#85CE5C]/30">
                      <div className="absolute w-3 h-3 bg-[#85CE5C] rounded-full -left-2 top-1"></div>
                      
                      <div className="mb-2">
                        <h3 className="font-bold text-gray-900 text-base md:text-lg">
                          {experience.jobTitle || "Position"}
                        </h3>
                        <p className="text-gray-700">{experience.duration || "Duration"}</p>
                      </div>
                      
                      <div className="text-gray-700 text-sm md:text-base leading-relaxed">
                        {experience.jobDescription ? (
                          <div>
                            {experience.jobDescription
                              .split(".")
                              .filter(sentence => sentence.trim())
                              .map((sentence, idx) => (
                                <div key={idx} className="flex items-start gap-2 mb-2">
                                  <span className="text-[#85CE5C] font-bold text-lg leading-none mt-1">•</span>
                                  <span>{sentence.trim()}.</span>
                                </div>
                              ))}
                            {/* Add filler to make it longer */}
                            <p className="mt-2 text-gray-600">
                              Contributed to cross-functional team collaboration, applied problem-solving skills to
                              deliver measurable results, and consistently exceeded performance goals.
                            </p>
                            <p className="text-gray-600">
                              Developed processes that improved efficiency, mentored junior colleagues, and supported
                              organizational growth initiatives.
                            </p>
                          </div>
                        ) : (
                          <p>
                            Served as {experience.jobTitle || "Professional"} with {experience.years || "multiple"} years of
                            experience handling responsibilities in operations, communication, and client engagement.
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="relative pl-4 border-l-2 border-[#85CE5C]/30">
                  <div className="absolute w-3 h-3 bg-[#85CE5C] rounded-full -left-2 top-1"></div>
                  <div className="mb-2">
                    <h3 className="font-bold text-gray-900 text-base md:text-lg">Entry Level Professional</h3>
                    <p className="text-[#85CE5C] font-semibold text-sm md:text-base">Recent Graduate | {cv.state || "Nigeria"}</p>
                    <p className="text-gray-600 text-sm">Fresh Graduate</p>
                  </div>
                  <p className="text-gray-700 text-sm md:text-base">
                    Recent graduate with strong academic foundation and eager to apply theoretical knowledge in a practical professional setting.
                  </p>
                </div>
              )}
            </section>

            {/* Education & Skills Grid */}
            <div className="grid grid-cols-1 gap-8">
              {/* Education Section */}
              <section>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-[#85CE5C]">
                  Education
                </h2>
                
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-bold text-gray-900 text-base md:text-lg mb-1">
                      {ed.schoolName || "University"}
                    </h3>
                    <p className="text-[#85CE5C] font-semibold text-sm md:text-base">
                      {ed.educationMajor ? `${ed.educationMajor}` : "Degree Program"}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {ed.startYear || "2018"} - {ed.endYear || "2022"}
                    </p>
                  </div>

                  {cv.additionalCertificate && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-bold text-gray-900 text-base md:text-lg mb-1">
                        Additional Certification
                      </h3>
                      <p className="text-[#85CE5C] font-semibold text-sm md:text-base">
                        {cv.additionalCertificate}
                      </p>
                    </div>
                  )}
                </div>
              </section>

              {/* Skills & Languages Section */}
              <section>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-[#85CE5C]">
                  Skills
                </h2>
                
                {/* Skills */}
                {cv.skills && cv.skills.length > 0 && (
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-800 mb-3">Technical Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {cv.skills.map((skill, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1 bg-[#85CE5C]/10 text-[#85CE5C] rounded-full text-sm font-medium border border-[#85CE5C]/20"
                        >
                          {humanize(skill)}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Languages */}
                {cv.languages && cv.languages.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-3">Languages</h3>
                    <div className="flex flex-wrap gap-2">
                      {cv.languages.map((language, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                        >
                          {language}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </section>
            </div>
          </div>
        </div>

        {/* Download Button */}
        <div className="mt-6 text-center">
          <button
            onClick={handleDownload}
            className="inline-flex cursor-pointer items-center gap-2 bg-[#85CE5C] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#6BB344] transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            <Download size={20} />
            Download CV
          </button>
        </div>
      </div>
    </div>
  );
}
