"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, User, Phone, Mail, MapPin, Download } from "lucide-react";
import Image from "next/image";
import { getCvById } from "@/api/cvs/requests";
import { Loader } from "../../ui/Loader";
import html2pdf from "html2pdf.js";

// Simple humanize helper
const humanize = (s) => (s ? String(s).replace(/-/g, " ").replace(/\b\w/g, ch => ch.toUpperCase()) : "");

// Progress bar component
const SkillBar = ({ skill, percentage }) => (
  <div className="mb-3">
    <div className="flex justify-between items-center mb-1">
      <span className="text-xs font-medium">{skill}</span>
      <span className="text-xs font-bold">{percentage}%</span>
    </div>
    <div className="w-full bg-gray-300 rounded-full h-2">
      <div 
        className="bg-gray-800 h-2 rounded-full transition-all duration-500"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  </div>
);

export default function CvDetailsScreen({ cvId }) {
  const router = useRouter();
  const [cv, setCv] = useState(null);
  const [loading, setLoading] = useState(Boolean(cvId));
  const [error, setError] = useState("");
  const [imgError, setImgError] = useState(false);

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

const handleExportPDF = async () => {
  const element = document.getElementById("cv-content");
  if (!element) return;

  // Create a temporary stylesheet to override oklch colors
  const style = document.createElement("style");
  style.innerHTML = `
    .bg-teal-700 { background-color: #00695c !important; }
    .text-teal-700 { color: #00695c !important; }
    .bg-teal-800 { background-color: #004d40 !important; }
    .text-teal-600 { color: #00796b !important; }
    .text-teal-100 { color: #b2dfdb !important; }
    .bg-gray-300 { background-color: #d1d5db !important; }
    .text-gray-300 { color: #d1d5db !important; }
    .bg-gray-800 { background-color: #374151 !important; }
    .text-gray-800 { color: #374151 !important; }
    .text-gray-600 { color: #4b5563 !important; }
    .text-gray-700 { color: #374151 !important; }
    .bg-gray-100 { background-color: #f3f4f6 !important; }
    .text-gray-900 { color: #1f2a44 !important; }
    .bg-white { background-color: #ffffff !important; }
    .text-white { color: #ffffff !important; }
    body { background: #ffffff !important; }
  `;
  document.head.appendChild(style);

  try {
    const opt = {
      margin: 0,
      filename: `${cv?.firstName || "cv"}-${cv?.lastName || "details"}.pdf`,
      image: { type: "png", quality: 1 },
      html2canvas: {
        scale: 3,
        useCORS: true,
        backgroundColor: "#ffffff",
      },
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait",
      },
      pagebreak: { mode: ["avoid-all", "css", "legacy"] },
    };

    await html2pdf().set(opt).from(element).save();
  } catch (error) {
    console.error("Error generating PDF:", error);
    alert("Failed to export PDF. Please try again.");
  } finally {
    document.head.removeChild(style);
  }
};

  if (loading) return <Loader />;

  if (error) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="flex items-center gap-4 mb-4">
          <button onClick={() => router.back()} className="flex items-center gap-2 text-sm text-gray-600">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
        </div>
        <div className="text-center text-red-500">{error}</div>
      </div>
    );
  }

  if (!cv) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="flex items-center gap-4 mb-4">
          <button onClick={() => router.back()} className="flex items-center gap-2 text-sm text-gray-600">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
        </div>
        <div className="text-center text-gray-500">No CV found</div>
      </div>
    );
  }

  const ed = cv.educationDetails || {};
  const workExperiences = Array.isArray(cv.workExperienceDetails) ? cv.workExperienceDetails : [];

  // Mock data for skills with percentages
  const skillsWithPercentages = [
    { name: "Design Process", percentage: 78 },
    { name: "Project Management", percentage: 81 },
    ...(cv.skills || []).slice(2).map((skill, index) => ({
      name: humanize(skill),
      percentage: 65 + (index * 5)
    }))
  ];

  return (
    <div className="max-w-6xl mx-auto py-4 md:py-8 px-2 md:px-4">
      <div className="flex items-center gap-4 mb-4 md:mb-6 px-2">
        <button onClick={() => router.back()} className="flex items-center gap-2 text-sm cursor-pointer text-gray-600">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <button
          onClick={handleExportPDF}
          className="flex items-center cursor-pointer gap-2 text-sm text-white bg-teal-700 px-4 py-2 rounded-lg hover:bg-teal-800 transition"
        >
          <Download className="w-4 h-4" /> Export PDF
        </button>
      </div>

      <div id="cv-content" className="bg-white overflow-hidden">
        <div className="flex flex-row lg:min-h-screen">
          {/* Left Sidebar - Dark Green */}
          <div className="w-[170px] lg:w-70 bg-teal-700 rounded-2xl md:rounded-3xl text-white p-4 md:p-8 flex flex-col">
            <div className="mb-6 md:mb-8 flex justify-center">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden bg-teal-800 flex items-center justify-center">
                {cv.profileImage && !imgError ? (
                  <Image
                    src={cv.profileImage}
                    alt={`${cv.firstName} ${cv.lastName} avatar`}
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <User size={48} className="text-teal-300 md:w-[60px] md:h-[60px]" />
                )}
              </div>
            </div>

            <div className="mb-6 md:mb-8">
              <h3 className="text-lg font-bold mb-3 md:mb-4">About Me</h3>
              <p className="text-[10px] md:text-sm leading-relaxed">
                {cv.bio || "A dedicated professional with extensive experience and a passion for excellence."}
              </p>
            </div>

            <div className="mb-6 md:mb-8">
              <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                <div className="w-6 h-6 md:w-8 md:h-8 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone size={12} className="text-teal-700 md:w-4 md:h-4" />
                </div>
                <span className="text-[10px] md:text-sm truncate">{cv.number || "+123-456-7890"}</span>
              </div>
              
              <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                <div className="w-6 h-6 md:w-8 md:h-8 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail size={12} className="text-teal-700 md:w-4 md:h-4" />
                </div>
                <span className="text-[10px] md:text-sm truncate" title={cv.email || "email@example.com"}>
                  {cv.email || "email@example.com"}
                </span>
              </div>
              
              <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
                <div className="w-6 h-6 md:w-8 md:h-8 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin size={12} className="text-teal-700 md:w-4 md:h-4" />
                </div>
                <span className="text-[10px] md:text-sm truncate">
                  {cv.area || "Any Area"}, {cv.lga || "Any LGA"}
                </span>
              </div>
            </div>

            <div className="mb-6 md:mb-8">
              <div className="bg-white text-teal-700 text-center py-2 mb-3 md:mb-4 rounded font-bold text-xs md:text-sm">
                LANGUAGE
              </div>
              <ul className="space-y-1 md:space-y-2">
                {cv.languages && cv.languages.length > 0 ? cv.languages.map((lang, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-white rounded-full flex-shrink-0"></div>
                    <span className="text-[10px] md:text-sm truncate">{lang}</span>
                  </li>
                )) : (
                  <>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-white rounded-full flex-shrink-0"></div>
                      <span className="text-[10px] md:text-sm">English</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-white rounded-full flex-shrink-0"></div>
                      <span className="text-[10px] md:text-sm">Local Language</span>
                    </li>
                  </>
                )}
              </ul>
            </div>

            <div>
              <div className="bg-white text-teal-700 text-center py-2 mb-3 md:mb-4 rounded font-bold text-xs md:text-sm">
                EXPERTISE
              </div>
              <ul className="space-y-1 md:space-y-2">
                {cv.skills && cv.skills.length > 0 ? cv.skills.slice(0, 6).map((skill, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-white rounded-full flex-shrink-0"></div>
                    <span className="text-[10px] md:text-sm truncate">{humanize(skill)}</span>
                  </li>
                )) : (
                  <>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-white rounded-full flex-shrink-0"></div>
                      <span className="text-[10px] md:text-sm">Management Skills</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-white rounded-full flex-shrink-0"></div>
                      <span className="text-[10px] md:text-sm">Creativity</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-white rounded-full flex-shrink-0"></div>
                      <span className="text-[10px] md:text-sm">Digital Marketing</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-white rounded-full flex-shrink-0"></div>
                      <span className="text-[10px] md:text-sm">Negotiation</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-white rounded-full flex-shrink-0"></div>
                      <span className="text-[10px] md:text-sm">Critical Thinking</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-white rounded-full flex-shrink-0"></div>
                      <span className="text-[10px] md:text-sm">Leadership</span>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>

          <div className="flex-1 p-4 md:p-12">
            <div className="mb-8 md:mb-12">
              <h1 className="text-2xl md:text-5xl font-bold text-teal-700 mb-2 tracking-wide">
                {(cv.firstName?.toUpperCase() || "FIRST")} {(cv.lastName?.toUpperCase() || "LAST")}
              </h1>
              <h2 className="text-xs md:text-xl text-teal-600 font-medium">
                {workExperiences[0]?.jobTitle || ed.educationMajor || "Professional"}
              </h2>
              <p className="text-[10px] md:text-base text-gray-600 mt-3 md:mt-4 leading-relaxed">
                {cv.bio || `${cv.hasWorkExperience ? 'An experienced' : 'A passionate'} professional with a strong background in ${workExperiences[0]?.jobTitle || ed.educationMajor || 'their field'} and a commitment to delivering excellence in every project.`}
              </p>
            </div>

            <div className="mb-8 md:mb-12">
              <div className="bg-teal-700 text-white text-center py-2 md:py-3 mb-4 md:mb-6 font-bold text-xs md:text-sm tracking-wider">
                EXPERIENCE
              </div>
              
              {cv.hasWorkExperience && workExperiences.length > 0 ? (
                workExperiences.map((we, index) => (
                  <div key={index} className="mb-6 md:mb-8">
                    <h3 className="text-xs md:text-lg font-bold text-gray-900 mb-1">
                      {we.company || "Previous Company"} - {cv.state || "Location"}
                    </h3>
                    <p className="text-xs md:text-sm text-gray-600 mb-2 md:mb-3">
                      {we.startYear || "2020"} - {we.endYear || "2024"}
                    </p>
                    <p className="text-[10px] md:text-base text-gray-700 leading-relaxed">
                      {we.jobDescription || `Served as ${we.jobTitle || "Professional"} with ${we.years || "multiple"} years of experience.`}
                    </p>
                  </div>
                ))
              ) : (
                <div className="mb-6 md:mb-8">
                  <h3 className="text-xs md:text-lg font-bold text-gray-900 mb-1">
                    Entry Level Professional - {cv.state || "Nigeria"}
                  </h3>
                  <p className="text-[10px] md:text-sm text-gray-600 mb-2 md:mb-3">
                    Recent Graduate
                  </p>
                  <p className="text-[10px] md:text-base text-gray-700 leading-relaxed">
                    Recent graduate with strong academic foundation and eager to apply theoretical knowledge in a practical professional setting.
                  </p>
                </div>
              )}
            </div>

            <div className="mb-8 md:mb-12">
              <div className="bg-teal-700 text-white text-center py-2 md:py-3 mb-4 md:mb-6 font-bold text-xs md:text-sm tracking-wider">
                EDUCATION
              </div>
              
              <div className="mb-4 md:mb-6">
                <h3 className="text-sm md:text-lg font-bold text-gray-900 mb-1">
                  {ed.schoolName || "University"}
                </h3>
                <p className="text-xs md:text-base text-gray-700 font-medium">
                  {ed.educationMajor ? `${ed.educationMajor}` : " in Business"}
                </p>
                <p className="text-xs md:text-sm text-gray-600">
                  {ed.startYear || "2018"}-{ed.endYear || "2022"}
                </p>
              </div>

              {cv.additionalCertificate && (
                <div className="mb-4 md:mb-6">
                  <h3 className="text-sm md:text-lg font-bold text-gray-900 mb-1">
                    Additional Certificate
                  </h3>
                  <p className="text-xs md:text-base text-gray-700 font-medium">
                    {cv.additionalCertificate}
                  </p>
                </div>
              )}
            </div>

            <div>
              <div className="bg-teal-700 text-white text-center py-2 md:py-3 mb-4 md:mb-6 font-bold text-xs md:text-sm tracking-wider">
                SKILLS SUMMARY
              </div>
              
              <div className="space-y-3 md:space-y-4">
                {skillsWithPercentages.length > 0 ? skillsWithPercentages.slice(0, 4).map((skill, i) => (
                  <SkillBar key={i} skill={skill.name} percentage={skill.percentage} />
                )) : (
                  <>
                    <SkillBar skill="Professional Skills" percentage={78} />
                    <SkillBar skill="Communication" percentage={85} />
                    <SkillBar skill="Problem Solving" percentage={72} />
                    <SkillBar skill="Teamwork" percentage={88} />
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="block lg:hidden h-4 bg-gray-100"></div>
        </div>
      </div>
    </div>
  );
}
