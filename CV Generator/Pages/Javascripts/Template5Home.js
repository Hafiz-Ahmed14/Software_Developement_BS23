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
    softskills: `
        <div id="softskills">
            <h5>Soft Skills</h5>
            <div id="softskills-container">
                <div class="softskills-entry mb-3">
                    <input type="text" class="form-control" placeholder="Skill" oninput="updatePreview()">
                </div>
            </div>
            <button type="button" class="btn btn-outline-success" onclick="addSoftSkill()">+ Add More</button>
        </div>
    `,

    techskills: `
        <div id="techskills">
            <h5>Technical Skills</h5>
            <div id="techskills-container">
                <div class="techskills-entry mb-3">
                    <input type="text" class="form-control" placeholder="Skill" oninput="updatePreview()">
                </div>
            </div>
            <button type="button" class="btn btn-outline-success" onclick="addTechSkill()">+ Add More</button>
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
    Projects: `
        <div id="Projects">
            <h5>PROJECTS</h5>
            <div id="Projects-container">
                <div class="Projects-entry mb-3 mt-3">
                    <input type="text" class="form-control mb-2" placeholder="Company Name" oninput="updatePreview()">
                    <textarea class="form-control" placeholder="Description" oninput="updatePreview()"></textarea>
                    <input type="text" class="form-control mb-2" placeholder="Technology Used" oninput="updatePreview()">
                </div>
            </div>
            <button type="button" class="btn btn-outline-success" onclick="addProjects()">+ Add More</button>
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

function addTechSkill() {
    const container = document.getElementById("techskills-container");
    const entry = document.createElement("div");
    entry.className = "techskills-entry mb-3";
    entry.innerHTML = `
        <input type="text" class="form-control" placeholder="Skill" oninput="updatePreview()">
    `;
    container.appendChild(entry);
}
function addSoftSkill() {
    const container = document.getElementById("softskills-container");
    const entry = document.createElement("div");
    entry.className = "softskills-entry mb-3";
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

function addProjects() {
    const container = document.getElementById("Projects-container");
    const entry = document.createElement("div");
    entry.className = "Projects-entry mb-3";
    entry.innerHTML = `
        <input type="text" class="form-control mb-2" placeholder="Company Name" oninput="updatePreview()">
        <textarea class="form-control" placeholder="Description" oninput="updatePreview()"></textarea>
        <input type="text" class="form-control mb-2" placeholder="Technology Used" oninput="updatePreview()">

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
            <div class="left-side" style="width: 37%; padding-right: 20px; background-color:rgb(243, 242, 239); padding: 20px;">
                <!-- Profile Image (Round Border) -->
                <div class="d-flex justify-content-center align-items-center flex-column text-center" style="margin-bottom: 3rem;">
                    <img 
                        src="${profileImage}" 
                        alt="Profile Image" 
                        class="rounded-rectange img-fluid border border-light shadow" 
                        style="width: 130px; height: 130px; object-fit: cover; margin-top: 0.6rem;" 
                    />
                </div>

                <!-- Contact Information -->
                ${phoneNumber || address || email || Linkedin ? `
                    
                    <div>
                        <!-- Contact Section with full-width underline on 'Contact' -->
                        <h5 class = "text-info" style="margin-top: 2rem;border-bottom: 1px solid var(--bs-info); padding-bottom: 10px;">Contact</h5>
                        ${phoneNumber ? `<p class="text-info mb-1">    <i class="fas fa-phone-alt"></i> Phone </p>       <p class="mb-1" style="font-size: 0.85rem;"> +${phoneNumber}</p>` : ''}
                        ${email ? `<p class="text-info mb-1">          <i class="fas fa-envelope"></i> Email Address</p>          <p class="mb-1" style="font-size: 0.85rem;"> ${email}</p>` : ''}
                        ${address ? `<p class="text-info mb-1">        <i class="fas fa-home"></i> Address</p>            <p class="mb-1" style="font-size: 0.85rem;"> ${address}</p>` : ''}
                        ${Linkedin ? `<p class="text-info mb-1">       <i class="fab fa-linkedin"></i> Linkedin</p>       <p class="mb-1" style="font-size: 0.85rem;"> ${Linkedin}</p>` : ''}
                    </div>

                ` : ''}
                
                

                <!-- Soft Skill -->
                ${visited_sections.includes("softskills") ? `
                    <div>
                        <h5 class="text-info" style="margin-top: 2rem;border-bottom: 1px solid var(--bs-info); padding-bottom: 10px;">SOFT SKILL</h5>
                        <ul style="font-size: 0.85rem; list-style-type: disc; padding-left: 20px;">
                            ${Array.from(document.querySelectorAll("#softskills-container .softskills-entry input"))
                .map((skill) => {
                    return skill.value ? `<li>${skill.value}</li>` : '';
                })
                .join('')}
                        </ul>
                    </div>
                ` : ''}

                <!-- Tech Skills Skill -->
                ${visited_sections.includes("techskills") ? `
                    <div>
                        <h5 class="text-info" style="margin-top: 2rem;border-bottom: 1px solid var(--bs-info); padding-bottom: 10px;">TECHNICAL SKILL</h5>
                        <ul style="font-size: 0.85rem; list-style-type: disc; padding-left: 20px;">
                            ${Array.from(document.querySelectorAll("#techskills-container .techskills-entry input"))
                .map((skill) => {
                    return skill.value ? `<li>${skill.value}</li>` : '';
                })
                .join('')}
                        </ul>
                    </div>
                ` : ''}
                


                <!-- Languages -->
                ${visited_sections.includes("languages") ? `
                    <div>
                        <h5 class="text-info" style="border-bottom: 1px solid var(--bs-info); padding-bottom: 10px;">Languages</h5>
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



            <div class="right-side" style="width: 63%; display: flex; flex-direction: column; padding: 0; margin: 0;">


                <!-- First Section -->
                <div class="first-section bg-info" style="width: 100%; height: 160px; padding-left: 0; margin-top: 0;">
                    <div class="text-left text-white">
                            <h2 class="mb-0 mt-5 ms-5">${fullName.toUpperCase()}</h2>
                            <h5 class="mb-3 mt-2 ms-5">${desig.toUpperCase()}</h5>
                    </div>
                </div>

                <!-- Second Section -->
                <div class="second-section" style="width: 100%; padding-left: 20px; margin-top: 10px;">
                     <!-- Profile Summary -->
                ${visited_sections.includes("profile") && document.getElementById("careerSummary").value ? `
                    <div style="margin-top: 24px;">
                        <h5 class = "text-info" style="border-bottom: 1px solid var(--bs-info); padding-bottom: 10px; margin-bottom: 5px;">Profile Summary</h5>
                        <p style="font-size: 0.85rem; text-align: justify; margin: 0;">
                            ${document.getElementById("careerSummary").value.trim()}
                        </p>
                    </div>
                ` : ''}

                <!-- Education -->
                ${visited_sections.includes("education") ? `
                    <div>
                        <h5 class = "text-info" style="margin-top: 1rem; border-bottom: 1px solid var(--bs-info); padding-bottom: 10px;">Education</h5>
                        <ul style="font-size: 0.85rem; list-style-type: disc; padding-left: 20px;">
                            ${Array.from(document.querySelectorAll("#education-container .education-entry"))
                .map((entry) => {
                    const institution = entry.children[0].value;
                    const degree = entry.children[1].value;
                    return institution || degree
                        ? `<li>
                                            ${institution ? `<p class="text-info mb-1"><strong>${institution} </strong></p>` : ''}
                                            ${degree ? `<p class = "mb-3">${degree} </p>` : ''}
                                        </li>`
                        : '';
                })
                .join('')}
                        </ul>
                    </div>
                ` : ''}

                <!-- Work Experience -->
                ${visited_sections.includes("Projects") ? `
                    <div>
                        <!-- Section Title -->
                        <h5 class = "text-info mt-3" style="border-bottom: 1px solid var(--bs-info); padding-bottom: 10px; margin-bottom: 5px; margin-top: 3px;">
                            PROJECTS
                        </h5>
                        <!-- Projects List -->
                        <ul style="font-size: 0.85rem; list-style-type: disc; padding-left: 20px; margin: 0;">
                            ${Array.from(document.querySelectorAll("#Projects-container .Projects-entry"))
                .map((entry) => {
                    const company = entry.children[0].value.trim();
                    const description = entry.children[1].value.trim();
                    const technologyused = entry.children[2].value.trim();

                    // Ensure only non-empty values are added
                    return (company || technologyused || description)
                        ? `<li style="margin-bottom: 10px;">
                                            ${company ? `<p class="text-info mb-1"><strong>${company}</strong></p>` : ''}
                                            ${description ? `<p class="mb-1">${description}</p>` : ''}
                                            ${technologyused ? `<p><span class="text-info"><strong>Technology Used: </strong></span>${technologyused}</p>` : ''}
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
                        <h5 class = "text-info" style="border-bottom: 1px solid var(--bs-info); padding-bottom: 10px; margin-bottom: 5px; margin-top: 3px;">
                            ACHIEVEMENT & HACKATHON
                        </h5>
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



