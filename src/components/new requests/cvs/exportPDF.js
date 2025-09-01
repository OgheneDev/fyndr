import { humanize } from "@/utils/humanize";

export const exportPDF = (cv) => {
  const ed = cv.educationDetails || {};
  const workExperiences = Array.isArray(cv.workExperienceDetails) ? cv.workExperienceDetails : [];

  const printWindow = window.open('', '_blank');
  if (printWindow) {
    const htmlContent = `
      <html>
        <head>
          <title>${cv.firstName || 'First'} ${cv.lastName || 'Last'} CV</title>
          <style>
            @font-face {
              font-family: 'CustomFont';
              src: url('/fonts/Sora-SemiBold.ttf') format('truetype');
              font-weight: normal;
              font-style: normal;
            }
            
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            
            body { 
              font-family: 'CustomFont', Arial, sans-serif;
              margin: 0; /* Remove all margins */
              padding-top: 20px !important;
              padding: 0;
              display: flex; 
              width: 210mm; /* Explicit A4 width */
              height: 290mm; /* Explicit A4 height */
              max-width: 210mm;
              min-height: 297mm;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
              color-adjust: exact;
              font-size: 10px; /* Base font size reduced for compactness */
            }
            
            .container { 
              display: flex; 
              width: 100%; 
              height: 100%; /* Ensure container fits A4 height */
              page-break-inside: avoid; /* Prevent page breaks */
            }
            
            .sidebar { 
              width: 250px; /* Reduced width to save space */
              background-color: #0f766e !important; 
              color: white; 
              padding: 16px; /* Reduced padding */
              border-radius: 12px; /* Smaller radius */
              display: flex;
              flex-direction: column;
              max-height: 290mm; /* Cap at A4 height */
              overflow: hidden;
            }
            
            .profile-img { 
              width: 80px; /* Smaller profile image */
              height: 80px; 
              border-radius: 50%; 
              background-color: #134e4a !important; 
              margin: 0 auto 16px; /* Reduced margin */
              display: flex; 
              align-items: center; 
              justify-content: center; 
              overflow: hidden; 
            }
            
            .profile-img img { 
              width: 100%; 
              height: 100%; 
              object-fit: cover; 
            }
            
            .profile-img .placeholder { 
              font-size: 40px; /* Smaller placeholder icon */
              color: #5eead4; 
            }
            
            .sidebar h3 { 
              font-size: 16px; /* Smaller heading */
              font-weight: bold; 
              margin-bottom: 8px; /* Reduced margin */
              color: white;
            }
            
            .sidebar p, .sidebar span { 
              font-size: 11px; /* Smaller text */
              line-height: 1.4; /* Tighter line height */
              color: #a7f3d0;
            }
            
            .about-text {
              color: #a7f3d0;
              margin-bottom: 16px; /* Reduced margin */
            }
            
            .contact-item { 
              display: flex; 
              align-items: center; 
              gap: 8px; /* Smaller gap */
              margin-bottom: 8px; /* Reduced margin */
            }
            
            .contact-icon { 
              width: 24px; /* Smaller icon */
              height: 24px; 
              background-color: white !important; 
              border-radius: 50%; 
              display: flex; 
              align-items: center; 
              justify-content: center;
              flex-shrink: 0;
              position: relative;
            }
            
            .contact-icon::after {
              content: '📞';
              font-size: 12px; /* Smaller icon */
              line-height: 1;
            }
            
            .contact-icon.mail-icon::after {
              content: '✉';
              font-size: 12px;
              line-height: 1;
              color: #0f766e;
            }
            
            .contact-icon.location-icon::after {
              content: '📍';
              font-size: 12px;
              line-height: 1;
            }
            
            .list-header { 
              background-color: white !important; 
              color: #0f766e !important; 
              text-align: center; 
              padding: 6px; /* Reduced padding */
              border-radius: 4px; 
              font-weight: bold; 
              font-size: 10px; /* Smaller font */
              margin: 16px 0 8px 0; /* Reduced margins */
              letter-spacing: 0.5px;
            }
            
            .list-item { 
              display: flex; 
              align-items: center; 
              gap: 6px; /* Smaller gap */
              margin-bottom: 6px; /* Reduced margin */
            }
            
            .list-dot { 
              width: 6px; /* Smaller dot */
              height: 6px; 
              background-color: white !important; 
              border-radius: 50%;
              flex-shrink: 0;
            }
            
            .list-item span {
              font-size: 11px; /* Smaller text */
              color: white;
            }
            
            .main-content { 
              flex: 1; 
              padding: 24px; /* Reduced padding */
              background-color: white;
              page-break-inside: avoid; /* Prevent page breaks */
            }
            
            .main-content h1 { 
              font-size: 36px; /* Smaller heading */
              font-weight: bold; 
              color: #0f766e; 
              margin-bottom: 4px; /* Reduced margin */
              letter-spacing: 0.05em;
              line-height: 1.1;
            }
            
            .main-content h2 { 
              font-size: 16px; /* Smaller subheading */
              color: #0d9488; 
              font-weight: 500;
              margin-bottom: 8px; /* Reduced margin */
            }
            
            .main-content > p { 
              font-size: 12px; /* Smaller text */
              color: #4b5563; 
              line-height: 1.4; /* Tighter line height */
              margin-bottom: 24px; /* Reduced margin */
              max-width: 100%; /* Allow full width */
            }
            
            .section-header { 
              background-color: #0f766e !important; 
              color: white !important; 
              text-align: center; 
              padding: 8px; /* Reduced padding */
              font-weight: bold; 
              font-size: 11px; /* Smaller font */
              margin-bottom: 12px; /* Reduced margin */
              letter-spacing: 0.1em;
            }
            
            .experience-item, .education-item { 
              margin-bottom: 16px; /* Reduced margin */
              page-break-inside: avoid; /* Prevent page breaks */
            }
            
            .experience-item h3, .education-item h3 { 
              font-size: 14px; /* Smaller heading */
              font-weight: bold; 
              color: #111827;
              margin-bottom: 2px; /* Reduced margin */
            }
            
            .experience-item .date, .education-item .date { 
              font-size: 11px; /* Smaller text */
              color: #6b7280;
              margin-bottom: 6px; /* Reduced margin */
            }
            
            .experience-item p:not(.date), .education-item p:not(.date) { 
              font-size: 12px; /* Smaller text */
              color: #374151;
              line-height: 1.4; /* Tighter line height */
            }
            
            .skill-bar { 
              margin-bottom: 8px; /* Reduced margin */
            }
            
            .skill-bar .label { 
              display: flex; 
              justify-content: space-between; 
              align-items: center;
              font-size: 11px; /* Smaller font */
              margin-bottom: 4px; /* Reduced margin */
              font-weight: 500;
            }
            
            .skill-bar .bar { 
              width: 100%; 
              background-color: #d1d5db !important; 
              height: 6px; /* Thinner bar */
              border-radius: 9999px; 
            }
            
            .skill-bar .fill { 
              background-color: #374151 !important; 
              height: 6px; 
              border-radius: 9999px; 
              transition: width 0.5s ease;
            }

            @media print {
              body { 
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
                color-adjust: exact !important;
                width: 210mm;
                height: 297mm;
                margin: 0;
                transform: scale(0.95); /* Slightly scale down to fit */
                transform-origin: top left;
              }
              
              .sidebar { 
                background-color: #0f766e !important;
                background: #0f766e !important;
              }
              
              .section-header { 
                background-color: #0f766e !important; 
                color: white !important;
                background: #0f766e !important;
              }
              
              .list-header { 
                background-color: white !important; 
                color: #0f766e !important;
                background: white !important;
              }
              
              .profile-img { 
                background-color: #134e4a !important;
                background: #134e4a !important;
              }
              
              .contact-icon { 
                background-color: white !important;
                background: white !important;
              }
              
              .list-dot { 
                background-color: white !important;
                background: white !important;
              }
              
              .skill-bar .bar { 
                background-color: #d1d5db !important;
                background: #d1d5db !important;
              }
              
              .skill-bar .fill { 
                background-color: #374151 !important;
                background: #374151 !important;
              }
            }

            @page {
              margin: 0; /* No margins for A4 */
              size: A4; /* Enforce A4 size */
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="sidebar">
              <div class="profile-img">
                ${cv.profileImage ? `<img src="${cv.profileImage}" alt="Profile" />` : '<div class="placeholder">👤</div>'}
              </div>
              
              <h3>About Me</h3>
              <p class="about-text">${cv.bio || "A dedicated professional with extensive experience and a passion for excellence."}</p> <!-- Truncate bio -->
              
              <div class="contact-item">
                <div class="contact-icon phone-icon"></div>
                <span>${cv.number || "+123-456-7890"}</span>
              </div>
              <div class="contact-item">
                <div class="contact-icon mail-icon"></div>
                <span>${cv.email || "email@example.com"}</span>
              </div>
              <div class="contact-item">
                <div class="contact-icon location-icon"></div>
                <span>${cv.area || "Any Area"}, ${cv.lga || "Any LGA"}</span>
              </div>
              
              <div class="list-header">LANGUAGES</div>
              <ul>
                ${(cv.languages && cv.languages.length > 0 ? cv.languages : ['English', 'Local Language']).map(lang => `
                  <li class="list-item">
                    <div class="list-dot"></div>
                    <span>${lang}</span>
                  </li>
                `).join('')}
              </ul>
              
              <div class="list-header">EXPERTISE</div>
              <ul>
                ${(cv.skills && cv.skills.length > 0 ? cv.skills : ['Management Skills', 'Creativity', 'Digital Marketing', 'Leadership']).map(skill => `
                  <li class="list-item">
                    <div class="list-dot"></div>
                    <span>${humanize(skill)}</span>
                  </li>
                `).join('')}
              </ul>
            </div>
            
            <div class="main-content">
              <h1>${(cv.firstName?.toUpperCase() || "FIRST")} ${(cv.lastName?.toUpperCase() || "LAST")}</h1>
              <h2>${workExperiences[0]?.jobTitle || ed.educationMajor || "Professional"}</h2>
              <p>${cv.bio || `${cv.hasWorkExperience ? 'An experienced' : 'A passionate'} professional with a strong background in ${workExperiences[0]?.jobTitle || ed.educationMajor || 'their field'}.`}</p>
              
              <div class="section-header">EXPERIENCE</div>
              ${cv.hasWorkExperience && workExperiences.length > 0 ? workExperiences.map(we => `
                <div class="experience-item">
                  <h3>${we.company || "Previous Company"} - ${cv.state || "Location"}</h3>
                  <p class="date">${we.startYear || "2020"} - ${we.endYear || "2024"}</p>
                  <p>${we.description || `Served as ${we.jobTitle || "Professional"} with expertise in ${cv.skills?.[0] ? humanize(cv.skills[0]) : "core competencies"}.`}</p>
                </div>
              `).join('') : `
                <div class="experience-item">
                  <h3>Entry Level Professional - ${cv.state || "Nigeria"}</h3>
                  <p class="date">Recent Graduate</p>
                  <p>Recent graduate eager to apply theoretical knowledge in a professional setting.</p>
                </div>
              `}
              
              <div class="section-header">EDUCATION</div>
              <div class="education-item">
                <h3>${ed.schoolName || "University"}</h3>
                <p>${ed.educationMajor}</p>
                <p class="date">${ed.startYear || "2018"}-${ed.endYear || "2022"}</p>
              </div>
              ${cv.additionalCertificate ? `
                <div class="education-item">
                  <h3>Certification</h3>
                  <p>${cv.additionalCertificate}</p>
                </div>
              ` : ''}
            </div>
          </div>
        </body>
      </html>
    `;
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.print();
  }
};