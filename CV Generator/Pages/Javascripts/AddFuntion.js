function addSkill() {
    const container = document.getElementById('skills-container');
    const input = `<div class="mb-3">
        <input type="text" class="form-control" placeholder="Skill" oninput="updatePreview()">
    </div>`;
    container.insertAdjacentHTML('beforeend', input);
}


function addCertificate() {
    const container = document.getElementById('certificates-container');
    const input = `<div class="mb-3">
        <input type="text" class="form-control" placeholder="Certificate Name" oninput="updatePreview()">
    </div>`;
    container.insertAdjacentHTML('beforeend', input);
}

function addLanguage() {
    const container = document.getElementById('languages-container');

    // Define the new HTML structure for the language entry
    const input = `
        <div class="language-entry mb-3">
            <input type="text" class="form-control" placeholder="Language" oninput="updatePreview()">
            <input type="text" class="form-control mt-2" placeholder="Reading level (e.g., Low, Medium, High)" oninput="updatePreview()">
            <input type="text" class="form-control mt-2" placeholder="Writing level (e.g., Low, Medium, High)" oninput="updatePreview()">
            <input type="text" class="form-control mt-2" placeholder="Speaking level (e.g., Low, Medium, High)" oninput="updatePreview()">
        </div>
    `;

    // Insert the new language input fields at the end of the container
    container.insertAdjacentHTML('beforeend', input);
}


function addEducation() {
    const container = document.getElementById('education-container');

    // Define the new HTML structure for the education entry
    const input = `
        <div class="education-entry mb-3">
            <input type="text" class="form-control" placeholder="Institution name" oninput="updatePreview()">
            <input type="text" class="form-control mt-2" placeholder="Degree (e.g., BSc in Computer Science)" oninput="updatePreview()">
        </div>
    `;

    // Insert the new education input fields at the end of the container
    container.insertAdjacentHTML('beforeend', input);
}


function addActivity() {
    const container = document.getElementById('activities-container');
    const input = `
        <div class="mb-3">
            <input type="text" class="form-control" placeholder="Activity" oninput="updatePreview()">
        </div>
    `;
    container.insertAdjacentHTML('beforeend', input);
}


function addWorkExperience() {
    const container = document.getElementById('work-experience-container');
    const input = `
        <div class="work-experience-entry mb-3">
            <input type="text" class="form-control mb-2" placeholder="Company Name" oninput="updatePreview()">
            <input type="text" class="form-control mb-2" placeholder="Designation" oninput="updatePreview()">
            <textarea class="form-control" placeholder="Add Description" oninput="updatePreview()"></textarea>
        </div>
    `;
    container.insertAdjacentHTML('beforeend', input);
}



function addReference() {
    const container = document.getElementById('references-container');
    const input = `
        <div class="reference-entry mb-3">
            <input type="text" class="form-control" placeholder="Full Name" oninput="updatePreview()">
            <input type="text" class="form-control mt-2" placeholder="Designation" oninput="updatePreview()">
            <input type="text" class="form-control mt-2" placeholder="Institution" oninput="updatePreview()">
            <input type="text" class="form-control mt-2" placeholder="Phone Number" oninput="updatePreview()">
            <input type="email" class="form-control mt-2" placeholder="Email" oninput="updatePreview()">
        </div>
    `;
    container.insertAdjacentHTML('beforeend', input);
}

