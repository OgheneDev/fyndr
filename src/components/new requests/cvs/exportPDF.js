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
              margin: 0;
              padding: 0;
              display: flex; 
              min-height: 100vh;
              max-width: 896px;
              margin: 30px auto;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
              color-adjust: exact;
            }
            
            .container { 
              display: flex; 
              width: 100%; 
              min-height: 100vh;
            }
            
            .sidebar { 
              width: 320px; 
              background-color: #0f766e !important; 
              color: white; 
              padding: 32px; 
              border-radius: 24px;
              display: flex;
              flex-direction: column;
              max-height: 85vh;
              overflow: hidden;
            }
            
            .profile-img { 
              width: 128px; 
              height: 128px; 
              border-radius: 50%; 
              background-color: #134e4a !important; 
              margin: 0 auto 32px; 
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
              font-size: 60px; 
              color: #5eead4; 
            }
            
            .sidebar h3 { 
              font-size: 20px; 
              font-weight: bold; 
              margin-bottom: 16px;
              color: white;
            }
            
            .sidebar p, .sidebar span { 
              font-size: 14px; 
              line-height: 1.6; 
              color: #a7f3d0;
            }
            
            .about-text {
              color: #a7f3d0;
              margin-bottom: 32px;
            }
            
            .contact-item { 
              display: flex; 
              align-items: center; 
              gap: 12px; 
              margin-bottom: 16px; 
            }
            
            .contact-icon { 
              width: 32px; 
              height: 32px; 
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
              font-size: 16px;
              line-height: 1;
            }
            
            .contact-icon.mail-icon::after {
              content: '✉';
              font-size: 16px;
              line-height: 1;
              color: #0f766e;
            }
            
            .contact-icon.location-icon::after {
              content: '📍';
              font-size: 16px;
              line-height: 1;
            }
            
            .list-header { 
              background-color: white !important; 
              color: #0f766e !important; 
              text-align: center; 
              padding: 8px; 
              border-radius: 4px; 
              font-weight: bold; 
              font-size: 12px; 
              margin: 32px 0 16px 0;
              letter-spacing: 0.5px;
            }
            
            .list-item { 
              display: flex; 
              align-items: center; 
              gap: 8px; 
              margin-bottom: 8px; 
            }
            
            .list-dot { 
              width: 8px; 
              height: 8px; 
              background-color: white !important; 
              border-radius: 50%;
              flex-shrink: 0;
            }
            
            .list-item span {
              font-size: 14px;
              color: white;
            }
            
            .main-content { 
              flex: 1; 
              padding: 48px; 
              background-color: white;
            }
            
            .main-content h1 { 
              font-size: 48px; 
              font-weight: bold; 
              color: #0f766e; 
              margin-bottom: 8px;
              letter-spacing: 0.05em;
              line-height: 1.1;
            }
            
            .main-content h2 { 
              font-size: 20px; 
              color: #0d9488; 
              font-weight: 500;
              margin-bottom: 16px;
            }
            
            .main-content > p { 
              font-size: 16px; 
              color: #4b5563; 
              line-height: 1.6; 
              margin-bottom: 48px;
              max-width: 600px;
            }
            
            .section-header { 
              background-color: #0f766e !important; 
              color: white !important; 
              text-align: center; 
              padding: 12px; 
              font-weight: bold; 
              font-size: 14px; 
              margin-bottom: 24px;
              letter-spacing: 0.1em;
            }
            
            .experience-item, .education-item { 
              margin-bottom: 32px; 
            }
            
            .experience-item h3, .education-item h3 { 
              font-size: 18px; 
              font-weight: bold; 
              color: #111827;
              margin-bottom: 4px;
            }
            
            .experience-item .date, .education-item .date { 
              font-size: 14px;
              color: #6b7280;
              margin-bottom: 12px;
            }
            
            .experience-item p:not(.date), .education-item p:not(.date) { 
              font-size: 16px;
              color: #374151;
              line-height: 1.6;
            }
            
            .skill-bar { 
              margin-bottom: 16px; 
            }
            
            .skill-bar .label { 
              display: flex; 
              justify-content: space-between; 
              align-items: center;
              font-size: 14px; 
              margin-bottom: 8px;
              font-weight: 500;
            }
            
            .skill-bar .bar { 
              width: 100%; 
              background-color: #d1d5db !important; 
              height: 8px; 
              border-radius: 9999px; 
            }
            
            .skill-bar .fill { 
              background-color: #374151 !important; 
              height: 8px; 
              border-radius: 9999px; 
              transition: width 0.5s ease;
            }

            @media print {
              body { 
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
                color-adjust: exact !important;
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
              margin: 0;
              size: A4;
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
              <p class="about-text">${cv.bio || "A dedicated professional with extensive experience and a passion for excellence. Committed to delivering high-quality work and contributing meaningfully to organizational success."}</p>
              
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
              
              <div class="list-header">LANGUAGE</div>
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
                ${(cv.skills && cv.skills.length > 0 ? cv.skills.slice(0, 6) : ['Management Skills', 'Creativity', 'Digital Marketing', 'Negotiation', 'Critical Thinking', 'Leadership']).map(skill => `
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
              <p>${cv.bio || `${cv.hasWorkExperience ? 'An experienced' : 'A passionate'} professional with a strong background in ${workExperiences[0]?.jobTitle || ed.educationMajor || 'their field'} and a commitment to delivering excellence in every project.`}</p>
              
              <div class="section-header">EXPERIENCE</div>
              ${cv.hasWorkExperience && workExperiences.length > 0 ? workExperiences.map(we => `
                <div class="experience-item">
                  <h3>${we.company || "Previous Company"} - ${cv.state || "Location"}</h3>
                  <p class="date">${we.startYear || "2020"} - ${we.endYear || "2024"}</p>
                  <p>${we.description || `Served as ${we.jobTitle || "Professional"} with ${we.years || "multiple"} years of experience. Demonstrated expertise in ${cv.skills?.[0] ? humanize(cv.skills[0]) : "core competencies"} and contributed significantly to organizational goals through dedicated service and professional excellence.`}</p>
                </div>
              `).join('') : `
                <div class="experience-item">
                  <h3>Entry Level Professional - ${cv.state || "Nigeria"}</h3>
                  <p class="date">Recent Graduate</p>
                  <p>Recent graduate with strong academic foundation and eager to apply theoretical knowledge in a practical professional setting. Demonstrates excellent learning ability and commitment to professional growth.</p>
                </div>
              `}
              
              <div class="section-header">EDUCATION</div>
              <div class="education-item">
                <h3>${ed.schoolName || "University"}</h3>
                <p>${humanize(ed.educationLevel) || "Bachelor's Degree"}${ed.educationMajor ? ` of ${ed.educationMajor}` : " in Business"}</p>
                <p class="date">${ed.startYear || "2018"}-${ed.endYear || "2022"}</p>
              </div>
              ${cv.additionalCertificate ? `
                <div class="education-item">
                  <h3>Additional Certification</h3>
                  <p>${cv.additionalCertificate}</p>
                  <p class="date">Professional Development</p>
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