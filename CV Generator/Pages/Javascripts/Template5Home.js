const formTemplates = {
    profile: `
        <div id="profile">
            <h5>Bio:</h5>
            <div id="career-summary-container">
                <div class="mb-3">
                    <textarea class="form-control" id="careerSummary" placeholder="Write your career summary here..." oninput="updatePreview()"></textarea>
                </div>
            </div>
        </div>
    `,
    education: `
        <div id="education">
            <h5>Education</h5>
            <div id="education-container">
                <div class="education-entry mb-3">
                    <input type="text" class="form-control mb-2" placeholder="Institution name" oninput="updatePreview()">
                    <input type="text" class="form-control mb-2" placeholder="Degree (e.g., BSc in Computer Science)" oninput="updatePreview()">
                </div>
            </div>
            <button type="button" class="btn btn-outline-success" onclick="addEducation()">+ Add More</button>
        </div>
    `,
    skills: `
        <div id="skills">
            <h5>Skills</h5>
            <div id="skills-container">
                <div class="skill-entry mb-3">
                    <input type="text" class="form-control" placeholder="Skill" oninput="updatePreview()">
                </div>
            </div>
            <button type="button" class="btn btn-outline-success" onclick="addSkill()">+ Add More</button>
        </div>
    `,
    languages: `
        <div id="languages">
            <h5>Languages</h5>
            <div id="languages-container">
                <div class="language-entry mb-3">
                    <input type="text" class="form-control mb-2" placeholder="..eg English(Fluent)" oninput="updatePreview()">
                </div>
            </div>
            <button type="button" class="btn btn-outline-success" onclick="addLanguage()">+ Add More</button>
        </div>
    `,
    workExperience: `
        <div id="workExperience">
            <h5>Work Experience</h5>
            <div id="work-experience-container">
                <div class="work-experience-entry mb-3 mt-3">
                    <input type="text" class="form-control mb-2" placeholder="Company Name" oninput="updatePreview()">
                    <input type="text" class="form-control mb-2" placeholder="Designation" oninput="updatePreview()">
                    <textarea class="form-control" placeholder="Description" oninput="updatePreview()"></textarea>
                </div>
            </div>
            <button type="button" class="btn btn-outline-success" onclick="addWorkExperience()">+ Add More</button>
        </div>
    `,

    achievementsHackathons: `
    <div id="achievementsHackathons">
        <h5>Bio:</h5>
        <div id="achievementsHackathons-container">
            <div class="achievementsHackathons-container-entry mb-3">
                <textarea class="form-control" id="careerSummary" placeholder="Write your career summary here..." oninput="updatePreview()"></textarea>
            </div>
        </div>
        <button type="button" class="btn btn-outline-success mt-3" onclick="addAchievement()">+ Add More</button>
    </div>
`,

};

function addEducation() {
    const container = document.getElementById("education-container");
    const entry = document.createElement("div");
    entry.className = "education-entry mb-3";
    entry.innerHTML = `
        <input type="text" class="form-control mb-2" placeholder="Institution name" oninput="updatePreview()">
        <input type="text" class="form-control mb-2" placeholder="Degree (e.g., BSc in Computer Science)" oninput="updatePreview()">
    `;
    container.appendChild(entry);
}

function addAchievement() {
    const container = document.getElementById("achievementsHackathons-container");
    entry = document.createElement("div");
    entry.className = "achievementsHackathons-container-entry mb-3"
    entry.innerHTML = `
    <textarea class="form-control" placeholder="Write your Achievement here..." oninput="updatePreview()"></textarea>
    `;
    container.appendChild(entry);
}

function addSkill() {
    const container = document.getElementById("skills-container");
    const entry = document.createElement("div");
    entry.className = "skill-entry mb-3";
    entry.innerHTML = `
        <input type="text" class="form-control" placeholder="Skill" oninput="updatePreview()">
    `;
    container.appendChild(entry);
}

function addLanguage() {
    const container = document.getElementById("languages-container");
    const entry = document.createElement("div");
    entry.className = "language-entry mb-3";
    entry.innerHTML = `
        <input type="text" class="form-control mb-2" placeholder="..eg English(Fluent)" oninput="updatePreview()">
    `;
    container.appendChild(entry);
}

function addWorkExperience() {
    const container = document.getElementById("work-experience-container");
    const entry = document.createElement("div");
    entry.className = "work-experience-entry mb-3";
    entry.innerHTML = `
        <input type="text" class="form-control mb-2" placeholder="Company Name" oninput="updatePreview()">
        <input type="text" class="form-control mb-2" placeholder="Designation" oninput="updatePreview()">
        <textarea class="form-control" placeholder="Description" oninput="updatePreview()"></textarea>
    `;
    container.appendChild(entry);
}

function addReference() {
    const container = document.getElementById("references-container");
    const entry = document.createElement("div");
    entry.className = "reference-entry mb-3";
    entry.innerHTML = `
        <input type="text" class="form-control mb-2" placeholder="Full Name" oninput="updatePreview()">
        <input type="text" class="form-control mb-2" placeholder="Designation" oninput="updatePreview()">
        <input type="text" class="form-control mb-2" placeholder="Institution" oninput="updatePreview()">
        <input type="text" class="form-control mb-2" placeholder="Phone Number" oninput="updatePreview()">
        <input type="email" class="form-control mb-2" placeholder="Email" oninput="updatePreview()">
    `;
    container.appendChild(entry);
}

let visited_sections = [];

function showForm(section) {
    const dynamicFormContainer = document.getElementById("dynamic-form");

    if (!visited_sections.includes(section)) {
        dynamicFormContainer.insertAdjacentHTML("beforeend", formTemplates[section]);
    }

    Object.keys(formTemplates).forEach((item) => {
        const element = document.querySelector(`#${item}`);
        if (element) {
            element.style.display = "none";
        }
    });

    const element = document.querySelector(`#${section}`);
    element.style.display = "block";

    visited_sections.push(section);
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



function updatePreview() {
    const fullName = document.getElementById('fullName').value;
    const desig = document.getElementById('desig').value;
    const profileImage = document.getElementById('profileImagePreview').src; // Get the profile image source
    const address = document.getElementById('address').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const email = document.getElementById('email').value;
    const Linkedin = document.getElementById('Linkedin').value;

    const livePreview = document.getElementById("live-preview");

    let previewHTML = `
        <div class="d-flex">
            <!-- Left Side: 35% (Blue Background, White Text, Image with Round Border) -->
            <div class="left-side" style="width: 37%; padding-right: 20px; background-color: #23486A; color: white; padding: 20px;">
                <!-- Profile Image (Round Border) -->
                <div class="d-flex justify-content-center align-items-center flex-column text-center" style="margin-bottom: 1rem;">
                    <img 
                        src="${profileImage}" 
                        alt="Profile Image" 
                        class="rounded-circle img-fluid border border-light shadow" 
                        style="width: 115px; height: 115px; object-fit: cover; margin-top: 0.6rem;" 
                    />
                </div>

                <!-- Contact Information -->
                ${phoneNumber || address || email || Linkedin ? `
                    
                    <div>
                        <!-- Contact Section with full-width underline on 'Contact' -->
                        <h5 style="margin-top: 2rem;border-bottom: 2px solid #fff; padding-bottom: 10px;">Contact</h5>
                        ${phoneNumber ? `<p class="mb-1" style="font-size: 0.85rem;"><i class="fas fa-phone-alt"></i> ${phoneNumber}</p>` : ''}
                        ${email ? `<p class="mb-1" style="font-size: 0.85rem;"><i class="fas fa-envelope"></i> ${email}</p>` : ''}
                        ${address ? `<p class="mb-1" style="font-size: 0.85rem;"><i class="fas fa-home"></i> ${address}</p>` : ''}
                        ${Linkedin ? `<p class="mb-1" style="font-size: 0.85rem;"><i class="fab fa-linkedin"></i> ${Linkedin}</p>` : ''}
                    </div>

                ` : ''}
                
                

                <!-- Skills -->
                ${visited_sections.includes("skills") ? `
                    <div>
                        <h5 style="border-bottom: 2px solid #fff; padding-bottom: 10px;">Skills</h5>
                        <ul style="font-size: 0.85rem; list-style-type: disc; padding-left: 20px;">
                            ${Array.from(document.querySelectorAll("#skills-container .skill-entry input"))
                .map((skill) => {
                    return skill.value
                        ? `<li>${skill.value}</li>`
                        : '';
                })
                .join('')}
                        </ul>
                    </div>
                ` : ''}

                <!-- Languages -->
                ${visited_sections.includes("languages") ? `
                    <div>
                        <h5 style="border-bottom: 2px solid #fff; padding-bottom: 10px;">Languages</h5>
                        <ul style="font-size: 0.85rem; list-style-type: disc; padding-left: 20px;">
                            ${Array.from(document.querySelectorAll("#languages-container .language-entry input"))
                .map((input) => {
                    const language = input.value;
                    return language
                        ? `<li>${language}</li>`
                        : '';
                })
                .join('')}
                        </ul>
                    </div>
                ` : ''}
            </div>

            <!-- Right Side: 65% -->
            <div class="right-side" style="width: 63%; padding-left: 20px;">
                <div class="text-left">
                    <h3 class="mb-0 mt-5 ml-5">${fullName.toUpperCase()}</h3>
                    <h5 class="mb-3 mt-2 ml-5" style="border-bottom: 5px solid #4C585B; display: inline-block; padding-bottom: 5px;">
                        ${desig.toUpperCase()}
                    </h5>
                </div>

                <!-- Profile Summary -->
                ${visited_sections.includes("profile") && document.getElementById("careerSummary").value ? `
                    <div style="margin-top: 37px;">
                        <h5 style="border-bottom: 2px solid black; padding-bottom: 10px; margin-bottom: 5px;">Profile Summary</h5>
                        <p style="font-size: 0.85rem; text-align: justify; margin: 0;">
                            ${document.getElementById("careerSummary").value.trim()}
                        </p>
                    </div>
                ` : ''}

                <!-- Education -->
                ${visited_sections.includes("education") ? `
                    <div>
                        <h5 style="margin-top: 1rem; border-bottom: 2px solid #fff; padding-bottom: 10px;">Education</h5>
                        <ul style="font-size: 0.85rem; list-style-type: disc; padding-left: 20px;">
                            ${Array.from(document.querySelectorAll("#education-container .education-entry"))
                .map((entry) => {
                    const institution = entry.children[0].value;
                    const degree = entry.children[1].value;
                    return institution || degree
                        ? `<li>
                                            ${institution ? `<strong>${institution}</strong>` : ''}
                                            ${degree ? `<br>${degree}` : ''}
                                        </li>`
                        : '';
                })
                .join('')}
                        </ul>
                    </div>
                ` : ''}

                <!-- Work Experience -->
                ${visited_sections.includes("workExperience") ? `
                    <div>
                        <!-- Section Title -->
                        <h5 style="border-bottom: 2px solid black; padding-bottom: 10px; margin-bottom: 5px; margin-top: 3px;">
                            Work Experience
                        </h5>
                        <!-- Work Experience List -->
                        <ul style="font-size: 0.85rem; list-style-type: disc; padding-left: 20px; margin: 0;">
                            ${Array.from(document.querySelectorAll("#work-experience-container .work-experience-entry"))
                .map((entry) => {
                    const company = entry.children[0].value.trim();
                    const designation = entry.children[1].value.trim();
                    const description = entry.children[2].value.trim();

                    // Ensure only non-empty values are added
                    return (company || designation || description)
                        ? `<li style="margin-bottom: 10px;">
                                            ${company ? `<strong>${company}</strong><br>` : ''}
                                            ${designation ? `${designation}<br>` : ''}
                                            ${description ? `${description}` : ''}
                                        </li>`
                        : '';
                })
                .join('')}
                        </ul>
                    </div>
                ` : ''}


                <!-- Achievement & Hackathon -->
                ${visited_sections.includes("achievementsHackathons") ? `
                    <div>
                        <h5 style="border-bottom: 2px solid #fff; padding-bottom: 10px;">ACHIEVEMENT & HACKATHON</h5>
                        <ul style="font-size: 0.85rem; list-style-type: disc; padding-left: 20px;">
                            ${Array.from(document.querySelectorAll("#achievementsHackathons-container textarea"))
                .map((skill) => {
                    return skill.value
                        ? `<li>${skill.value}</li>`
                        : '';
                })
                .join('')}
                        </ul>
                    </div>
                ` : ''}
                
                
            </div>
        </div>
    `;

    livePreview.innerHTML = previewHTML;
}



