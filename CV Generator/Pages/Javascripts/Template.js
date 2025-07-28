const formTemplates = {
    personalDetails: `
        <div id="personalDetails">
             <h5>Personal Details</h5>
            <form>
                <div class="mb-3">
                    <label for="fatherName" class="form-label">Father's Name</label>
                    <input type="text" id="fatherName" class="form-control" placeholder="Enter father's name" oninput="updatePreview()">
                </div>
                <div class="mb-3">
                    <label for="motherName" class="form-label">Mother's Name</label>
                    <input type="text" id="motherName" class="form-control" placeholder="Enter mother's name" oninput="updatePreview()">
                </div>
                <div class="mb-3">
                    <label for="dob" class="form-label">Date of Birth</label>
                    <input type="date" id="dob" class="form-control" oninput="updatePreview()">
                </div>
                <div class="mb-3">
                    <label for="gender" class="form-label">Gender</label>
                    <input type="text" id="gender" class="form-control" placeholder="Enter gender" oninput="updatePreview()">
                </div>
                <div class="mb-3">
                    <label for="maritalStatus" class="form-label">Marital Status</label>
                    <input type="text" id="maritalStatus" class="form-control" placeholder="Enter marital status" oninput="updatePreview()">
                </div>
                <div class="mb-3">
                    <label for="nationality" class="form-label">Nationality</label>
                    <input type="text" id="nationality" class="form-control" placeholder="Enter nationality" oninput="updatePreview()">
                </div>
                <div class="mb-3">
                    <label for="religion" class="form-label">Religion</label>
                    <input type="text" id="religion" class="form-control" placeholder="Enter religion" oninput="updatePreview()">
                </div>
                <div class="mb-3">
                    <label for="permanentAddress" class="form-label">Permanent Address</label>
                    <input type="text" id="permanentAddress" class="form-control" placeholder="Enter permanent address" oninput="updatePreview()">
                </div>
            </form>
        </div>
        `,
    careerSummary: `
        <div id="careerSummary">
            <h5>Bio:</h5>
            <div id="career-summary-container">
                <div class="mb-3">
                    <textarea class="form-control" id="careersummary" placeholder="Write your career summary here..." oninput="updatePreview()"></textarea>
                </div>
            </div>
        </div>
    `,
    education: `
        <div id="education">
            <h5>Education</h5>
            <div id="education-container">
                <div class="education-entry mb-3">
                    <input type="text" class="form-control" placeholder="Institution name" oninput="updatePreview()">
                    <input type="text" class="form-control mt-2" placeholder="Degree (e.g., BSc in Computer Science)" oninput="updatePreview()">
                </div>
            </div>
            <button type="button" class="btn btn-outline-success" onclick="addEducation()">+ Add More</button>
        </div>
            `,
    skills: `
        <div id="skills">
            <h5>Skills</h5>
            <div id="skills-container">
                <div class="mb-3">
                    <input type="text" class="form-control" placeholder="Skill" oninput="updatePreview()">
                </div>
            </div>
            <button type="button" class="btn btn-outline-success" onclick="addSkill()">+ Add More</button>
        </div>
    `,

    extraCurricularActivities: `
    <div id="extraCurricularActivities">
            <h5>Extra Curricular Activities</h5>
            <div id="activities-container">
                <div class="mb-3">
                    <input type="text" class="form-control" placeholder="Activity" oninput="updatePreview()">
                </div>
            </div>
            <button type="button" class="btn btn-outline-success" onclick="addActivity()">+ Add More</button>
        </div>
    `,

    workExperience:
        ` <div id="workExperience">
            <h5>Work Experience</h5>
            <div id="work-experience-container">
                <div class="work-experience-entry mb-3">
                    <input type="text" class="form-control mb-2" placeholder="Company Name" oninput="updatePreview()">
                    <input type="text" class="form-control mb-2" placeholder="Designation" oninput="updatePreview()">
                    <textarea class="form-control" placeholder="Add Description" oninput="updatePreview()"></textarea>
                </div>
            </div>
            <button type="button" class="btn btn-outline-success" onclick="addWorkExperience()">+ Add More</button>
        </div>
        `,

    certificates: `
        <div id="certificates">
            <h5>Certificates</h5>
            <div id="certificates-container">
                <div class="mb-3">
                    <input type="text" class="form-control" placeholder="Certificate Name" oninput="updatePreview()">
                </div>
            </div>
            <button type="button" class="btn btn-outline-success" onclick="addCertificate()">+ Add More</button>
        </div>
    `,
    languages: `
        <div id="languages">
            <h5>Languages</h5>
            <div id="languages-container">
                <div class="language-entry mb-3">
                    <input type="text" class="form-control" placeholder="Language" oninput="updatePreview()">
                    <input type="text" class="form-control mt-2" placeholder="Reading level (e.g., Low, Medium, High)" oninput="updatePreview()">
                    <input type="text" class="form-control mt-2" placeholder="Writing level (e.g., Low, Medium, High)" oninput="updatePreview()">
                    <input type="text" class="form-control mt-2" placeholder="Speaking level (e.g., Low, Medium, High)" oninput="updatePreview()">
                </div>
            </div>
            <button type="button" class="btn btn-outline-success" onclick="addLanguage()">+ Add More</button>
        </div>
    `,
    references: `
    <div id="references">
        <h5>References</h5>
        <div id="references-container">
            <div class="reference-entry mb-3">
                <input type="text" class="form-control" placeholder="Full Name" oninput="updatePreview()">
                <input type="text" class="form-control mt-2" placeholder="Designation" oninput="updatePreview()">
                <input type="text" class="form-control mt-2" placeholder="Institution" oninput="updatePreview()">
                <input type="text" class="form-control mt-2" placeholder="Phone Number" oninput="updatePreview()">
                <input type="email" class="form-control mt-2" placeholder="Email" oninput="updatePreview()">
            </div>
        </div>
        <button type="button" class="btn btn-outline-success" onclick="addReference()">+ Add More</button>
    </div>
`,

};
