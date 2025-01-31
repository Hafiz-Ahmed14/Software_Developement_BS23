
let visited_sections = new Set();

function showForm(section) {
    const dynamicFormContainer =
        document.getElementById('dynamic-form');

    if (!visited_sections.has(section)) {
        dynamicFormContainer.insertAdjacentHTML(
            'beforeend',
            formTemplates[section]
        );
    }
    Object.keys(formTemplates).forEach((item) => {
        const element = document.querySelector(`#${item}`);
        if (element) {
            element.style.display = 'none';
        }
    });

    const element = document.querySelector(`#${section}`);
    element.style.display = 'block';

    visited_sections.add(section);
}

function previewImage(event) {
    const reader = new FileReader();
    const imagePreview = document.getElementById("profileImagePreview");

    reader.onload = function () {
        imagePreview.src = reader.result;
        //imagePreview.style.display = "block"; // Show the image preview
    };

    if (event.target.files[0]) {
        reader.readAsDataURL(event.target.files[0]);
    }
}



function getData() {
    // Personal Details
    const fatherName = document.getElementById('fatherName')
        ? document.getElementById('fatherName').value
        : '';
    const motherName = document.getElementById('motherName')
        ? document.getElementById('motherName').value
        : '';
    const dob = document.getElementById('dob')
        ? document.getElementById('dob').value
        : '';
    const gender = document.getElementById('gender')
        ? document.getElementById('gender').value
        : '';
    const maritalStatus = document.getElementById('maritalStatus')
        ? document.getElementById('maritalStatus').value
        : '';
    const nationality = document.getElementById('nationality')
        ? document.getElementById('nationality').value
        : '';
    const religion = document.getElementById('religion')
        ? document.getElementById('religion').value
        : '';
    const permanentAddress = document.getElementById(
        'permanentAddress'
    )
        ? document.getElementById('permanentAddress').value
        : '';

    // Carrer Summary
    const careersummary = document.getElementById('careersummary')
        ? document.getElementById('careersummary').value
        : '';
    // Education
    const degree = document.getElementById('degree')
        ? document.getElementById('degree').value
        : '';
    const institution = document.getElementById('institution')
        ? document.getElementById('institution').value
        : '';

    // Skills
    const skillName = document.getElementById('skillName')
        ? document.getElementById('skillName').value
        : '';

    // Certificates
    const certificateName = document.getElementById(
        'certificateName'
    )
        ? document.getElementById('certificateName').value
        : '';

    // Languages
    const languageName = document.getElementById('languageName')
        ? document.getElementById('languageName').value
        : '';
    const languageReading = document.getElementById(
        'languageReading'
    )
        ? document.getElementById('languageReading').value
        : '';
    const languageWriting = document.getElementById(
        'languageWriting'
    )
        ? document.getElementById('languageWriting').value
        : '';
    const languageSpeaking = document.getElementById(
        'languageSpeaking'
    )
        ? document.getElementById('languageSpeaking').value
        : '';

    return {
        fatherName,
        motherName,
        dob,
        gender,
        maritalStatus,
        nationality,
        religion,
        permanentAddress,
        careersummary,
        degree,
        institution,
        skillName,
        certificateName,
        languageName,
        languageReading,
        languageWriting,
        languageSpeaking,
    };
}


function updatePreview(section = '') {
    const fullName = document.getElementById('fullName').value;
    const profileImage = document.getElementById('profileImagePreview').src; // Get the profile image source
    const address = document.getElementById('address').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const email = document.getElementById('email').value;
    const livePreview = document.getElementById('live-preview');
    const {
        fatherName,
        motherName,
        dob,
        gender,
        maritalStatus,
        nationality,
        religion,
        permanentAddress,
        careersummary,
        degree,
        institution,
        skillName,
        certificateName,
        languageName,
        languageReading,
        languageWriting,
        languageSpeaking,
    } = getData();

    let previewHTML = `
    <div class="text-center">
        <h4 class="mb-0"> CURRICULUM VITAE OF</h4>
        <h4 class="mb-3" >${fullName.toUpperCase()}</h4>
    </div>
    <div class="d-flex align-items-center justify-content-between mb-4">
    <!-- Left Side: Text Information -->
    <div>
        <p class="mb-1" ><strong>Address&nbsp;:</strong> ${address}</p>
        <p class="mb-1" ><strong>Phone&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</strong> ${phoneNumber}</p>
        <p class="mb-4" ><strong>Email&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</strong> ${email}</p>
    </div>
    <!-- Right Side: Profile Image -->
    <div class="d-flex justify-content-center align-items-center flex-column text-center">
        <img 
            src="${profileImage}" 
            alt="Profile Image" 
            class="rounded img-fluid border border-light shadow" 
            style="width: 130px; height: 110px; object-fit: cover; margin-top: -2rem; margin-left: -2rem;" 
        />
    </div>

    </div>
    `;


    // Update based on section
    for (const item of visited_sections) {
        if (item === 'personalDetails') {
            previewHTML += `
                      ${fatherName ||
                    motherName ||
                    dob ||
                    gender ||
                    maritalStatus ||
                    nationality ||
                    religion ||
                    permanentAddress
                    ? `<h5 class="mb-3 p-1 bg-secondary text-dark rectangular"><strong>Personal Details</strong></h5>
                <table>
                ${fatherName
                        ? `<tr><td><strong>Father's Name</strong></td><td>: ${fatherName}</td></tr>`
                        : ''
                    }
                ${motherName
                        ? `<tr><td><strong>Mother's Name</strong></td><td>: ${motherName}</td></tr>`
                        : ''
                    }
                ${dob
                        ? `<tr><td><strong>Date of Birth</strong></td><td>: ${dob}</td></tr>`
                        : ''
                    }
                ${gender
                        ? `<tr><td><strong>Gender</strong></td><td>: ${gender}</td></tr>`
                        : ''
                    }
                ${maritalStatus
                        ? `<tr><td><strong>Marital Status</strong></td><td>: ${maritalStatus}</td></tr>`
                        : ''
                    }
                ${nationality
                        ? `<tr><td><strong>Nationality</strong></td><td>: ${nationality}</td></tr>`
                        : ''
                    }
                ${religion
                        ? `<tr><td><strong>Religion</strong></td><td>: ${religion}</td></tr>`
                        : ''
                    }
                ${permanentAddress
                        ? `<tr><td><strong>Permanent Address</strong></td><td>: ${permanentAddress}</td></tr>`
                        : ''
                    }
                </table>`
                    : ''
                }
                `;
        }

        if (item === 'careerSummary') {
            // Add the Career Summary section
            if (careersummary) {
                previewHTML += `
                    <h5 class="mb-3 p-1 bg-secondary text-dark rectangular"><strong>Bio: </strong></h5>
                    <p>${careersummary}</p>
                `;
            }
        }
        if (item === 'education') {
            const educationEntries = [...document.querySelectorAll('#education-container .education-entry')];
            previewHTML += `<h5 class="mb-2 p-1 mt-4 bg-secondary text-dark rectangular"><strong>EDUCATION</strong></h5>`
            educationEntries.forEach(entry => {
                const institution = entry.querySelector('input:nth-child(1)').value;
                const degree = entry.querySelector('input:nth-child(2)').value;

                if (institution || degree) {
                    previewHTML += `
                        ${institution || degree
                            ? `
                            <table>
                                ${institution
                                ? `<tr><td><strong>${institution}</strong></td></tr>`
                                : ''
                            }
                                ${degree
                                ? `<tr><td>${degree}</td></tr>`
                                : ''
                            }
                            </table><br/>`
                            : ''
                        }
                    `;
                }
            });

        }

        if (item === 'workExperience') {
            const workEntries = [...document.querySelectorAll('#work-experience-container .work-experience-entry')];
            let workExperienceHTML = ''; // Initialize a variable to accumulate all work experience entries

            workEntries.forEach(entry => {
                const companyName = entry.querySelector('input:nth-child(1)').value;
                const designation = entry.querySelector('input:nth-child(2)').value;
                const description = entry.querySelector('textarea').value;

                // Add work experience entry to preview
                if (companyName || designation || description) {
                    workExperienceHTML += `
                        <ul>
                            ${companyName ? `<li><strong>${companyName} </strong></li>` : ''}
                            ${designation ? `<p class="mb-0"><strong>${designation}</strong></p>` : ''}
                            ${description ? `<p>${description}</p>` : ''}
                        </ul>
                        
                    `;
                }
            });

            // Only add Work Experience heading once if there is any work experience
            if (workExperienceHTML) {
                previewHTML += `
                    <h5 class="mb-3 p-1 bg-secondary text-dark rectangular"><strong>Work Experience</strong></h5>
                    ${workExperienceHTML}
                `;
            }
        }


        if (item === 'skills') {
            let skills = [...document.querySelectorAll('#skills-container .form-control')]
                .map(input => input.value)
                .filter(Boolean);

            if (skills.length > 10) {
                alert("You can only add up to 10 skills!");
                return; // Stop execution
            }

            if (skills.length) {
                if (skills.length > 15) {
                    // This case will never trigger since we cap at 10, but kept for reference
                    previewHTML += `
                        <h5 class="mb-3 p-1 bg-secondary text-dark rectangular"><strong>Skills</strong></h5>
                        <ul>
                            ${skills.map(skill => `<li>${skill}</li>`).join('')}
                        </ul>
                    `;
                } else {
                    // Split the first 5 to left, rest to right
                    const leftSkills = skills.slice(0, 5);
                    const rightSkills = skills.slice(5);

                    previewHTML += `
                        <h5 class="mb-3 p-1 bg-secondary text-dark rectangular"><strong>Skills</strong></h5>
                        <div style="display: flex; justify-content: space-between;">
                            <ul style="width: 48%;">
                                ${leftSkills.map(skill => `<li>${skill}</li>`).join('')}
                            </ul>
                            <ul style="width: 48%;">
                                ${rightSkills.map(skill => `<li>${skill}</li>`).join('')}
                            </ul>
                        </div>
                    `;
                }
            }
        }



        if (item === 'extraCurricularActivities') {
            const activities = [...document.querySelectorAll('#activities-container .form-control')].map(input => input.value).filter(Boolean);

            if (activities.length) {
                previewHTML += `
                    <h5 class="mb-3 p-1 mt-3 bg-secondary text-dark rectangular"><strong>Extra Curricular Activities</strong></h5>
                    <ul>
                        ${activities.map(activity => `<li>${activity}</li>`).join('')}
                    </ul>
                `;
            }
        }

        if (item === 'certificates') {
            const certificates = [...document.querySelectorAll('#certificates-container .form-control')].map(input => input.value).filter(Boolean);

            if (certificates.length) {
                previewHTML += `
                    <h5 class="mb-3 p-1 bg-secondary text-dark rectangular"><strong>Certifications</strong></h5>
                    <ul>
                        ${certificates.map(cert => `<li>${cert}</li>`).join('')}
                    </ul>
                `;
            }
        }

        if (item === 'languages') {
            const languageEntries = [...document.querySelectorAll('#languages-container .language-entry')];

            // Check if there are any valid language entries
            const validEntries = languageEntries.map(entry => {
                const languageName = entry.querySelector('input:nth-child(1)').value;
                const languageReading = entry.querySelector('input:nth-child(2)').value;
                const languageWriting = entry.querySelector('input:nth-child(3)').value;
                const languageSpeaking = entry.querySelector('input:nth-child(4)').value;

                // Return entry if at least one value is filled out
                return (languageName || languageReading || languageWriting || languageSpeaking) ? {
                    languageName,
                    languageReading,
                    languageWriting,
                    languageSpeaking
                } : null;
            }).filter(Boolean); // Remove null entries

            // If there are valid language entries, generate the table
            if (validEntries.length) {
                previewHTML += `
                    <h5 class="mb-3 mt-2 p-1 bg-secondary text-dark rectangular"><strong>LANGUAGE PROFICIENCY</strong></h5>
                    <table class="table table-bordered">
                        <thead class="thead-light">
                            <tr>
                                <th>Language</th>
                                <th>Reading</th>
                                <th>Writing</th>
                                <th>Speaking</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${validEntries.map(entry => `
                                <tr>
                                    <td>${entry.languageName || 'N/A'}</td>
                                    <td>${entry.languageReading || 'N/A'}</td>
                                    <td>${entry.languageWriting || 'N/A'}</td>
                                    <td>${entry.languageSpeaking || 'N/A'}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table><br/>
                `;
            }
        }


        if (item === 'references') {
            const referenceEntries = [...document.querySelectorAll('#references-container .reference-entry')];
            let ref = "";
            referenceEntries.forEach(entry => {
                const fullName = entry.querySelector('input:nth-child(1)').value;
                const designation = entry.querySelector('input:nth-child(2)').value;
                const institution = entry.querySelector('input:nth-child(3)').value;
                const phoneNumber = entry.querySelector('input:nth-child(4)').value;
                const email = entry.querySelector('input:nth-child(5)').value;

                if (fullName || designation || institution || phoneNumber || email) {
                    ref += `
                        <div>
                            ${fullName ? `<p class ="ml-8 mb-0">${fullName}</p>` : ''}
                            ${designation ? `<p class ="ml-8 mb-0">${designation}</p>` : ''}
                            ${institution ? `<p class ="ml-8 mb-0"> ${institution}</p>` : ''}
                            ${phoneNumber ? `<p class ="ml-8 mb-0">Mobile Number: ${phoneNumber}</p>` : ''}
                            ${email ? `<p class ="ml-8 mb-0">Email Address: ${email}<p>` : ''}
                        </div>
                    `;
                }
            });
            if (ref) {
                previewHTML += `<h5 class="mb-3 p-1 bg-secondary text-dark rectangular"><strong>References</strong></h5> ${ref}`
            }
        }

    }
    // Update the live preview
    livePreview.innerHTML = previewHTML;
}