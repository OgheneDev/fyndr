"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, User, Phone, Mail, MapPin } from "lucide-react";
import Image from "next/image";
import { getCvById } from "@/api/cvs/requests";
import { Loader } from "../../ui/Loader";

// Simple humanize helper
const humanize = (s) => (s ? String(s).replace(/-/g, " ").replace(/\b\w/g, ch => ch.toUpperCase()) : "");

// Progress bar component
const SkillBar = ({ skill, percentage }) => (
  <div className="mb-3">
    <div className="flex justify-between items-center mb-1">
      <span className="text-sm font-medium">{skill}</span>
      <span className="text-sm font-bold">{percentage}%</span>
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

  if (loading) return <Loader />;

  if (error) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <button onClick={() => router.back()} className="flex items-center gap-2 text-sm text-gray-600 mb-4">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <div className="text-center text-red-500">{error}</div>
      </div>
    );
  }

  if (!cv) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <button onClick={() => router.back()} className="flex items-center gap-2 text-sm text-gray-600 mb-4">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <div className="text-center text-gray-500">No CV found</div>
      </div>
    );
  }

  const ed = cv.educationDetails || {};
  const we = cv.workExperienceDetails || {};

  // Mock data for skills with percentages (you can map actual skills here)
  const skillsWithPercentages = [
    { name: "Design Process", percentage: 78 },
    { name: "Project Management", percentage: 81 },
    ...(cv.skills || []).slice(2).map((skill, index) => ({
      name: humanize(skill),
      percentage: 65 + (index * 5) // Mock percentages
    }))
  ];

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <button onClick={() => router.back()} className="flex items-center gap-2 text-sm cursor-pointer text-gray-600 mb-6">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
        <div className="flex min-h-screen">
          {/* Left Sidebar - Dark Green */}
          <div className="w-80 bg-teal-700 text-white p-8 flex flex-col">
            {/* Profile Image */}
            <div className="mb-8 flex justify-center">
              <div className="w-32 h-32 rounded-full overflow-hidden bg-teal-800 flex items-center justify-center">
                {cv.user?.avatar && !imgError ? (
                  <Image
                    src={cv.user.avatar}
                    alt={`${cv.firstName} ${cv.lastName} avatar`}
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <User size={60} className="text-teal-300" />
                )}
              </div>
            </div>

            {/* About Me Section */}
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4">About Me</h3>
              <p className="text-sm leading-relaxed text-teal-100">
                {cv.bio || "A dedicated professional with extensive experience and a passion for excellence. Committed to delivering high-quality work and contributing meaningfully to organizational success."}
              </p>
            </div>

            {/* Contact Info */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <Phone size={16} className="text-teal-700" />
                </div>
                <span className="text-sm">{cv.number || "+123-456-7890"}</span>
              </div>
              
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <Mail size={16} className="text-teal-700" />
                </div>
                <span className="text-sm">{cv.email || "email@example.com"}</span>
              </div>
              
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <MapPin size={16} className="text-teal-700" />
                </div>
                <span className="text-sm">
                  {cv.area || "Any Area"}, {cv.lga || "Any LGA"}
                </span>
              </div>
            </div>

            {/* Languages */}
            <div className="mb-8">
              <div className="bg-white text-teal-700 text-center py-2 mb-4 rounded font-bold text-sm">
                LANGUAGE
              </div>
              <ul className="space-y-2">
                {cv.languages && cv.languages.length > 0 ? cv.languages.map((lang, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span className="text-sm">{lang}</span>
                  </li>
                )) : (
                  <>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <span className="text-sm">English</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <span className="text-sm">Local Language</span>
                    </li>
                  </>
                )}
              </ul>
            </div>

            {/* Expertise */}
            <div>
              <div className="bg-white text-teal-700 text-center py-2 mb-4 rounded font-bold text-sm">
                EXPERTISE
              </div>
              <ul className="space-y-2">
                {cv.skills && cv.skills.length > 0 ? cv.skills.slice(0, 6).map((skill, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span className="text-sm">{humanize(skill)}</span>
                  </li>
                )) : (
                  <>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <span className="text-sm">Management Skills</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <span className="text-sm">Creativity</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <span className="text-sm">Digital Marketing</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <span className="text-sm">Negotiation</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <span className="text-sm">Critical Thinking</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <span className="text-sm">Leadership</span>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>

          {/* Right Content Area */}
          <div className="flex-1 p-12">
            {/* Header */}
            <div className="mb-12">
              <h1 className="text-5xl font-bold text-teal-700 mb-2 tracking-wide">
                {(cv.firstName?.toUpperCase() || "FIRST")} {(cv.lastName?.toUpperCase() || "LAST")}
              </h1>
              <h2 className="text-xl text-teal-600 font-medium">
                {we.jobTitle || ed.educationMajor || "Professional"}
              </h2>
              <p className="text-gray-600 mt-4 leading-relaxed max-w-2xl">
                {cv.bio || `A ${cv.hasWorkExperience ? 'experienced' : 'passionate'} professional with a strong background in ${we.jobTitle || ed.educationMajor || 'their field'} and a commitment to delivering excellence in every project.`}
              </p>
            </div>

            {/* Experience Section */}
            <div className="mb-12">
              <div className="bg-teal-700 text-white text-center py-3 mb-6 font-bold text-sm tracking-wider">
                EXPERIENCE
              </div>
              
              {cv.hasWorkExperience ? (
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {we.company || "Previous Company"} - {cv.state || "Location"}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {we.startYear || "2020"} - {we.endYear || "2024"}
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    {we.jobDescription || `Served as ${we.jobTitle || "Professional"} with ${we.years || "multiple"} years of experience. Demonstrated expertise in ${cv.skills?.[0] ? humanize(cv.skills[0]) : "core competencies"} and contributed significantly to organizational goals through dedicated service and professional excellence.`}
                  </p>
                </div>
              ) : (
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    Entry Level Professional - {cv.state || "Nigeria"}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Recent Graduate
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Recent graduate with strong academic foundation and eager to apply theoretical knowledge in a practical professional setting. Demonstrates excellent learning ability and commitment to professional growth.
                  </p>
                </div>
              )}
            </div>

            {/* Education Section */}
            <div className="mb-12">
              <div className="bg-teal-700 text-white text-center py-3 mb-6 font-bold text-sm tracking-wider">
                EDUCATION
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  {ed.schoolName || "University"}
                </h3>
                <p className="text-gray-700 font-medium">
                  {humanize(ed.educationLevel) || "Bachelor's Degree"}{ed.educationMajor ? ` of ${ed.educationMajor}` : " in Business"}
                </p>
                <p className="text-sm text-gray-600">
                  {ed.startYear || "2018"}-{ed.endYear || "2022"}
                </p>
              </div>

              {cv.additionalCertificate && (
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    Additional Certification
                  </h3>
                  <p className="text-gray-700 font-medium">
                    {cv.additionalCertificate}
                  </p>
                  <p className="text-sm text-gray-600">
                    Professional Development
                  </p>
                </div>
              )}
            </div>

            {/* Skills Summary */}
            <div>
              <div className="bg-teal-700 text-white text-center py-3 mb-6 font-bold text-sm tracking-wider">
                SKILLS SUMMARY
              </div>
              
              <div className="space-y-4">
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
        </div>
      </div>
    </div>
  );
}