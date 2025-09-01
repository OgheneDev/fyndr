import React from "react";
import Image from "next/image";
import { User, Phone, Mail, MapPin } from "lucide-react";
import { humanize } from "@/utils/humanize";

export default function Sidebar({ cv, imgError, setImgError }) {
  return (
    <div className="w-[180px] md:w-80 bg-teal-700 rounded-3xl text-white p-5 md:p-8 flex flex-col">
      {/* Profile Image */}
      <div className="mb-8 flex justify-center">
        <div className="w-32 h-32 rounded-full overflow-hidden bg-teal-800 flex items-center justify-center">
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
            <User size={60} className="text-teal-300" />
          )}
        </div>
      </div>

      {/* About Me Section */}
      <div className="mb-8">
        <h3 className="text-lg md:text-xl font-bold mb-4">About Me</h3>
        <p className="text-[10px] md:text-sm leading-relaxed text-teal-100">
          {cv.bio || "A dedicated professional with extensive experience and a passion for excellence. Committed to delivering high-quality work and contributing meaningfully to organizational success."}
        </p>
      </div>

      {/* Contact Info */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <Phone size={16} className="text-teal-700" />
          </div>
          <span className="text-[10px] md:text-sm">{cv.number || "+123-456-7890"}</span>
        </div>
        
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <Mail size={16} className="text-teal-700" />
          </div>
          <span className="text-[10px] md:text-sm truncate max-w-[180px]">{cv.email || "email@example.com"}</span>
        </div>
        
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <MapPin size={16} className="text-teal-700" />
          </div>
          <span className="text-[10px] md:text-sm">
            {cv.area || "Any Area"}, {cv.lga || "Any LGA"}
          </span>
        </div>
      </div>

      {/* Languages */}
      <div className="mb-8">
        <div className="bg-white text-teal-700 text-center py-2 mb-4 rounded font-bold text-[10px] md:text-sm">
          LANGUAGE
        </div>
        <ul className="space-y-2">
          {cv.languages && cv.languages.length > 0 ? cv.languages.map((lang, i) => (
            <li key={i} className="flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span className="text-[10px] md:text-sm">{lang}</span>
            </li>
          )) : (
            <>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span className="text-[10px] md:text-sm">English</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span className="text-[10px] md:text-sm">Local Language</span>
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
              <span className="text-[10px] md:text-sm">{humanize(skill)}</span>
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
  );
}