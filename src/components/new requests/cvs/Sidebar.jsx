import React from "react";
import Image from "next/image";
import { User, Phone, Mail, MapPin } from "lucide-react";
import { humanize } from "@/utils/humanize";

export default function Sidebar({ cv, imgError, setImgError }) {
  return (
    <div className="w-[160px] md:w-80 bg-teal-700 rounded-[12px] text-white p-[12px] md:p-8 flex flex-col">
      {/* Profile Image */}
      <div className="mb-[12px] md:mb-8 flex justify-center">
        <div className="w-[60px] h-[60px] md:w-32 md:h-32 rounded-full overflow-hidden bg-teal-800 flex items-center justify-center">
          {cv.profileImage && !imgError ? (
            <Image
              src={cv.profileImage}
              alt={`${cv.firstName} ${cv.lastName} avatar`}
              width={60}
              height={60}
              className="w-full h-full object-cover"
              onError={() => setImgError(true)}
            />
          ) : (
            <User size={30} className="text-teal-300 md:size-60" />
          )}
        </div>
      </div>

      {/* About Me Section */}
      <div className="mb-[12px] md:mb-8">
        <h3 className="text-[16px] md:text-xl font-bold mb-[8px] md:mb-4 text-white">About Me</h3>
        <p className="text-[11px] leading-[1.4] text-teal-100 md:text-sm">
          {cv.bio || "A dedicated professional with extensive experience and a passion for excellence."}
        </p>
      </div>

      {/* Contact Info */}
      <div className="mb-[12px] md:mb-8">
        <div className="flex items-center gap-[8px] mb-[8px] md:mb-4">
          <div className="w-[24px] h-[24px] md:w-8 md:h-8 bg-white rounded-full flex items-center justify-center">
            <Phone size={12} className="text-teal-700 md:size-16" />
          </div>
          <span className="text-[11px] md:text-sm truncate max-w-[120px] md:max-w-[180px]">{cv.number || "+123-456-7890"}</span>
        </div>
        
        <div className="flex items-center gap-[8px] mb-[8px] md:mb-4">
          <div className="w-[24px] h-[24px] md:w-8 md:h-8 bg-white rounded-full flex items-center justify-center">
            <Mail size={12} className="text-teal-700 md:size-16" />
          </div>
          <span className="text-[11px] md:text-sm truncate max-w-[120px] md:max-w-[180px]">{cv.email || "email@example.com"}</span>
        </div>
        
        <div className="flex items-center gap-[8px] mb-[8px] md:mb-6">
          <div className="w-[24px] h-[24px] md:w-8 md:h-8 bg-white rounded-full flex items-center justify-center">
            <MapPin size={12} className="text-teal-700 md:size-16" />
          </div>
          <span className="text-[11px] md:text-sm truncate max-w-[120px] md:max-w-[180px]">
            {cv.area || "Any Area"}, {cv.lga || "Any LGA"}
          </span>
        </div>
      </div>

      {/* Languages */}
      <div className="mb-[12px] md:mb-8">
        <div className="bg-white text-teal-700 text-center py-[6px] mb-[8px] md:mb-4 rounded font-bold text-[10px] md:text-sm tracking-[0.5px]">
          LANGUAGES
        </div>
        <ul className="space-y-[6px] md:space-y-2">
          {cv.languages && cv.languages.length > 0 ? cv.languages.map((lang, i) => (
            <li key={i} className="flex items-center gap-[6px] md:gap-2">
              <div className="w-[6px] h-[6px] md:w-2 md:h-2 bg-white rounded-full"></div>
              <span className="text-[11px] md:text-sm truncate max-w-[140px] md:max-w-[180px]">{lang}</span>
            </li>
          )) : ( 
            <>
              <li className="flex items-center gap-[6px] md:gap-2">
                <div className="w-[6px] h-[6px] md:w-2 md:h-2 bg-white rounded-full"></div>
                <span className="text-[11px] md:text-sm">English</span>
              </li>
              <li className="flex items-center gap-[6px] md:gap-2">
                <div className="w-[6px] h-[6px] md:w-2 md:h-2 bg-white rounded-full"></div>
                <span className="text-[11px] md:text-sm">Local Language</span>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Expertise */}
      <div>
        <div className="bg-white text-teal-700 text-center py-[6px] mb-[8px] md:mb-4 rounded font-bold text-[10px] md:text-sm tracking-[0.5px]">
          EXPERTISE
        </div>
        <ul className="space-y-[6px] md:space-y-2">
          {cv.skills && cv.skills.length > 0 ? cv.skills.slice(0, 6).map((skill, i) => (
            <li key={i} className="flex items-center gap-[6px] md:gap-2">
              <div className="w-[6px] h-[6px] md:w-2 md:h-2 bg-white rounded-full"></div>
              <span className="text-[11px] md:text-sm truncate max-w-[140px] md:max-w-[180px]">{humanize(skill)}</span>
            </li>
          )) : (
            <>
              <li className="flex items-center gap-[6px] md:gap-2">
                <div className="w-[6px] h-[6px] md:w-2 md:h-2 bg-white rounded-full"></div>
                <span className="text-[11px] md:text-sm">Management Skills</span>
              </li>
              <li className="flex items-center gap-[6px] md:gap-2">
                <div className="w-[6px] h-[6px] md:w-2 md:h-2 bg-white rounded-full"></div>
                <span className="text-[11px] md:text-sm">Creativity</span>
              </li>
              <li className="flex items-center gap-[6px] md:gap-2">
                <div className="w-[6px] h-[6px] md:w-2 md:h-2 bg-white rounded-full"></div>
                <span className="text-[11px] md:text-sm">Digital Marketing</span>
              </li>
              <li className="flex items-center gap-[6px] md:gap-2">
                <div className="w-[6px] h-[6px] md:w-2 md:h-2 bg-white rounded-full"></div>
                <span className="text-[11px] md:text-sm">Negotiation</span>
              </li>
              <li className="flex items-center gap-[6px] md:gap-2">
                <div className="w-[6px] h-[6px] md:w-2 md:h-2 bg-white rounded-full"></div>
                <span className="text-[11px] md:text-sm">Critical Thinking</span>
              </li>
              <li className="flex items-center gap-[6px] md:gap-2">
                <div className="w-[6px] h-[6px] md:w-2 md:h-2 bg-white rounded-full"></div>
                <span className="text-[11px] md:text-sm">Leadership</span>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}