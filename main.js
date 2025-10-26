// Login logic
document.addEventListener("DOMContentLoaded", function() {
    // Login simulation
    if (document.getElementById("loginForm")) {
        document.getElementById("loginForm").onsubmit = function(e) {
            e.preventDefault();
            // Simulate authentication
            window.location.href = "dashboard.html";
        }
    }

    // Signup simulation
    if (document.getElementById("signupForm")) {
        document.getElementById("signupForm").onsubmit = function(e) {
            e.preventDefault();
            // Simulate account creation
            window.location.href = "dashboard.html";
        }
    }

    // Profile Update simulation
    if (document.getElementById("profileForm")) {
        document.getElementById("profileForm").onsubmit = function(e) {
            e.preventDefault();
            alert("Profile updated!");
        }
    }

    // Settings saving simulation
    if (document.getElementById("settingsForm")) {
        document.getElementById("settingsForm").onsubmit = function(e) {
            e.preventDefault();
            alert("Settings saved!");
        }
    }

    // Theme customization
    if (document.getElementById("applyThemeBtn")) {
        document.getElementById("applyThemeBtn").onclick = function() {
            document.querySelector('.site-header').style.background = document.getElementById("themeHeaderColor").value;
            document.body.style.background = document.getElementById("themeBgColor").value;
            document.body.style.fontFamily = document.getElementById("themeFont").value + ", Arial, sans-serif";
            alert("Theme applied!");
        };
    }

    // Create Form logic
    const questionsContainer = document.getElementById("questionsContainer");
    const addQuestionBtn = document.querySelector(".add-question-btn");
    if (addQuestionBtn && questionsContainer) {
        addQuestionBtn.onclick = function () {
            const qDiv = document.createElement("div");
            qDiv.className = "form-question-box";
            qDiv.innerHTML = `
                <input type="text" class="question-input" placeholder="Untitled Question" />
                <select class="question-type-selector">
                    <option value="multiple">Multiple choice</option>
                    <option value="checkbox">Checkboxes</option>
                    <option value="short">Short answer</option>
                    <option value="paragraph">Paragraph</option>
                    <option value="dropdown">Dropdown</option>
                </select>
                <div class="question-options"></div>
                <div class="question-toolbar">
                    <button type="button" class="add-option-btn">Add Option</button>
                    <button type="button" class="delete-question-btn">Delete</button>
                </div>
            `;
            questionsContainer.appendChild(qDiv);

            let optionCount = 1;
            const optionsDiv = qDiv.querySelector('.question-options');
            const typeSelector = qDiv.querySelector('.question-type-selector');

            function renderOptions() {
                optionsDiv.innerHTML = "";
                if (typeSelector.value === "multiple" || typeSelector.value === "checkbox" || typeSelector.value === "dropdown") {
                    for (let i = 0; i < optionCount; i++) {
                        const wrapper = document.createElement('div');
                        if (typeSelector.value === "multiple") {
                            wrapper.innerHTML = `<input type="radio" disabled name="opt${Date.now()}"><input type="text" class="question-option-input" placeholder="Option ${i+1}">`;
                        } else if (typeSelector.value === "checkbox") {
                            wrapper.innerHTML = `<input type="checkbox" disabled><input type="text" class="question-option-input" placeholder="Option ${i+1}">`;
                        } else {
                            wrapper.innerHTML = `<input type="text" class="question-option-input" placeholder="Option ${i+1}">`;
                        }
                        optionsDiv.appendChild(wrapper);
                    }
                } else {
                    optionsDiv.innerHTML = `<em style="color:#bbb; font-size:0.99em;">This question type doesn't require options.</em>`;
                }
            }
            renderOptions();

            qDiv.querySelector('.add-option-btn').onclick = function() {
                optionCount++;
                renderOptions();
            };
            qDiv.querySelector('.delete-question-btn').onclick = () => qDiv.remove();
            typeSelector.onchange = function() {
                renderOptions();
            };
        };
    }

    // Save Form logic (localStorage)
    const saveBtn = document.querySelector('.save-btn');
    if (saveBtn) {
        saveBtn.onclick = function() {
            const title = document.getElementById('formTitle').value;
            const desc = document.getElementById('formDesc').value;
            const questionNodes = document.querySelectorAll('.form-question-box');
            const questions = [];

            questionNodes.forEach(function(qDiv) {
                const qText = qDiv.querySelector('.question-input').value;
                const qType = qDiv.querySelector('.question-type-selector').value;
                const optionInputs = qDiv.querySelectorAll('.question-option-input');
                const options = [];
                optionInputs.forEach(function(opt) {
                    options.push(opt.value);
                });
                questions.push({
                    text: qText,
                    type: qType,
                    options: options
                });
            });

            // Save to localStorage (simulate saving forms list)
            const formData = {
                title: title,
                description: desc,
                questions: questions
            };
            localStorage.setItem('currentForm', JSON.stringify(formData));

            alert('Form saved successfully!');
        };
    }

    // Preview logic: load and render saved form
    // Enhanced Preview logic: load and render saved form
if (document.getElementById("previewQuestions")) {
    const saved = localStorage.getItem('currentForm');
    if (saved) {
        const data = JSON.parse(saved);
        document.getElementById("preview-title").innerText = data.title || "Untitled Form";
        document.getElementById("preview-desc").innerText = data.description || "Form description";
        const container = document.getElementById("previewQuestions");
        container.innerHTML = "";
        data.questions.forEach(function(q, idx) {
            const div = document.createElement('div');
            div.className = 'preview-question';
            let questionHtml = `<label><strong>${idx + 1}. ${q.text}</strong></label>`;
            
            if (q.type === "multiple") {
                q.options.forEach((opt, optIdx) => {
                    questionHtml += `<div><input type="radio" name="radio${idx}" id="radio${idx}_${optIdx}"> <label for="radio${idx}_${optIdx}">${opt}</label></div>`;
                });
            } else if (q.type === "checkbox") {
                q.options.forEach((opt, optIdx) => {
                    questionHtml += `<div><input type="checkbox" id="check${idx}_${optIdx}"> <label for="check${idx}_${optIdx}">${opt}</label></div>`;
                });
            } else if (q.type === "dropdown") {
                questionHtml += `<select name="dropdown${idx}">`;
                questionHtml += `<option value="">Choose...</option>`;
                q.options.forEach(opt => {
                    questionHtml += `<option value="${opt}">${opt}</option>`;
                });
                questionHtml += `</select>`;
            } else if (q.type === "short") {
                questionHtml += `<input type="text" placeholder="Your answer">`;
            } else if (q.type === "paragraph") {
                questionHtml += `<textarea placeholder="Your answer"></textarea>`;
            }
            
            div.innerHTML = questionHtml;
            container.appendChild(div);
        });
    }
}


    // Responses view (simple table)
    if (document.getElementById("responsesContainer")) {
        document.getElementById("responsesContainer").innerHTML =
            `<table border="1" cellpadding="6" style="margin-top:18px; width:100%;">
                <tr><th>Name</th><th>Email</th><th>Submission</th></tr>
                <tr><td>John Doe</td><td>john@email.com</td><td>Great!</td></tr>
                <tr><td>Jane Smith</td><td>jane@email.com</td><td>Loved the form!</td></tr>
            </table>`;
    }
});
// Dashboard render logic
if (document.getElementById("dashboardFormsList")) {
    let savedForm = localStorage.getItem('currentForm');
    let html = "";
    if (savedForm) {
        const data = JSON.parse(savedForm);
        html += `
            <div class="form-card">
                <div class="form-card-title">${data.title}</div>
                <div class="form-card-actions">
                    <a href="create-form.html">Edit</a>
                    <a href="preview.html">Preview</a>
                    <a href="responses.html">Responses</a>
                </div>
            </div>
        `;
    } else {
        html = "<p>No forms yet. Click 'Create New Form' above!</p>";
    }
    document.getElementById("dashboardFormsList").innerHTML = html;
}
const questionsContainer = document.getElementById("questionsContainer");

// Add Question (already implemented above)
// ...

// Add Section
const addSectionBtn = document.querySelector(".add-section-btn");
if (addSectionBtn && questionsContainer) {
    addSectionBtn.onclick = function () {
        const sectionDiv = document.createElement("div");
        sectionDiv.className = "form-question-box";
        sectionDiv.innerHTML = `
            <input type="text" class="section-title-input" placeholder="Section Title">
            <textarea class="section-desc-input" placeholder="Section Description"></textarea>
            <hr style="margin: 16px 0;">
        `;
        questionsContainer.appendChild(sectionDiv);
    };
}

// Add Image
const addImageBtn = document.querySelector(".add-image-btn");
if (addImageBtn && questionsContainer) {
    addImageBtn.onclick = function () {
        const imgDiv = document.createElement("div");
        imgDiv.className = "form-question-box";
        imgDiv.innerHTML = `
            <input type="text" class="image-url-input" placeholder="Paste image URL here">
            <button type="button" class="add-image-view-btn">Preview Image</button>
            <div class="image-box" style="margin:10px 0;"></div>
        `;
        questionsContainer.appendChild(imgDiv);

        // Preview image logic
        imgDiv.querySelector('.add-image-view-btn').onclick = function() {
            const url = imgDiv.querySelector('.image-url-input').value;
            if(url){
                imgDiv.querySelector('.image-box').innerHTML = `<img src="${url}" alt="Image" style="max-width:300px;border-radius:8px;">`;
            }
        }
    };
}

// Add Video
const addVideoBtn = document.querySelector(".add-video-btn");
if (addVideoBtn && questionsContainer) {
    addVideoBtn.onclick = function () {
        const vidDiv = document.createElement("div");
        vidDiv.className = "form-question-box";
        vidDiv.innerHTML = `
            <input type="text" class="video-url-input" placeholder="Paste video URL (YouTube embed)">
            <button type="button" class="add-video-view-btn">Preview Video</button>
            <div class="video-box" style="margin:10px 0;"></div>
        `;
        questionsContainer.appendChild(vidDiv);

        // Preview video iframe
        vidDiv.querySelector('.add-video-view-btn').onclick = function() {
            const url = vidDiv.querySelector('.video-url-input').value;
            if(url){
                vidDiv.querySelector('.video-box').innerHTML = `<iframe src="${url}" width="300" height="180" style="border:none;border-radius:8px;" allowfullscreen></iframe>`;
            }
        }
    };
}

// Import Question (Simulated for demo - you could fetch from localStorage, a template, etc.)
const importQuestionBtn = document.querySelector(".import-question-btn");
if (importQuestionBtn && questionsContainer) {
    importQuestionBtn.onclick = function () {
        // Example: import a predefined question
        const qDiv = document.createElement("div");
        qDiv.className = "form-question-box";
        qDiv.innerHTML = `
            <input type="text" class="question-input" value="Imported Question Example" />
            <select class="question-type-selector">
                <option value="multiple">Multiple choice</option>
            </select>
            <div class="question-options">
                <div><input type="radio" disabled><input type="text" class="question-option-input" value="Option A"></div>
                <div><input type="radio" disabled><input type="text" class="question-option-input" value="Option B"></div>
            </div>
            <div class="question-toolbar">
                <button type="button" class="add-option-btn">Add Option</button>
                <button type="button" class="delete-question-btn">Delete</button>
            </div>
        `;
        questionsContainer.appendChild(qDiv);

        // Regular option logic as before
        let optionCount = 2;
        const optionsDiv = qDiv.querySelector('.question-options');
        function addOption() {
            const wrapper = document.createElement('div');
            wrapper.innerHTML = `<input type="radio" disabled><input type="text" class="question-option-input" placeholder="Option ${++optionCount}">`;
            optionsDiv.appendChild(wrapper);
        }
        qDiv.querySelector('.add-option-btn').onclick = addOption;
        qDiv.querySelector('.delete-question-btn').onclick = () => qDiv.remove();
    };
}

// Enable drag and drop for questions
questionsContainer.addEventListener('dragstart', function (e) {
    if (e.target.classList.contains('form-question-box')) {
        e.target.classList.add('dragging');
        e.dataTransfer.setData('text/plain', '');
    }
});
questionsContainer.addEventListener('dragend', function (e) {
    if (e.target.classList.contains('form-question-box')) {
        e.target.classList.remove('dragging');
    }
});
questionsContainer.addEventListener('dragover', function (e) {
    e.preventDefault();
    const dragging = questionsContainer.querySelector('.dragging');
    const boxes = [...questionsContainer.querySelectorAll('.form-question-box:not(.dragging)')];
    const afterElement = boxes.find(box => {
        const rect = box.getBoundingClientRect();
        return e.clientY < rect.top + box.offsetHeight / 2;
    });
    if (afterElement) {
        questionsContainer.insertBefore(dragging, afterElement);
    } else {
        questionsContainer.appendChild(dragging);
    }
});

function makeQuestionDraggable(qDiv) {
    qDiv.setAttribute('draggable', 'true');
}

// Then in your question/section creation:
makeQuestionDraggable(qDiv || sectionDiv || imgDiv || vidDiv);

if (document.getElementById("applyThemeBtn")) {
    document.getElementById("applyThemeBtn").onclick = function () {
        document.documentElement.style.setProperty('--header-bg', document.getElementById("themeHeaderColor").value);
        document.documentElement.style.setProperty('--background', document.getElementById("themeBgColor").value);
        document.documentElement.style.setProperty('--font-main', document.getElementById("themeFont").value + ", Arial, sans-serif");
        alert("Theme applied—refresh to persist!");
    };
}
if (document.getElementById("loginForm")) {
    document.getElementById("loginForm").onsubmit = function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value.trim();
        const password = this.querySelector('input[type="password"]').value.trim();
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

        if (!emailRegex.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }
        if (password.length < 6) {
            alert("Password should be at least 6 characters.");
            return;
        }

        // Simulate "registering" user for demo (would check a credentials DB in real app)
        let users = JSON.parse(localStorage.getItem('users') || '{}');
        if (!(email in users)) {
            alert("Email not registered. Please sign up first.");
            return;
        }
        if (users[email] !== password) {
            alert("Incorrect password.");
            return;
        }
        // Auth passes:
        window.location.href = "dashboard.html";
    }
}
if (document.getElementById("signupForm")) {
    document.getElementById("signupForm").onsubmit = function(e) {
        e.preventDefault();
        const name = this.querySelector('input[type="text"]').value.trim();
        const email = this.querySelector('input[type="email"]').value.trim();
        const pass1 = this.querySelectorAll('input[type="password"]')[0].value.trim();
        const pass2 = this.querySelectorAll('input[type="password"]')[1].value.trim();
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

        if (!emailRegex.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }
        if (pass1.length < 6 || pass2.length < 6) {
            alert("Password should be at least 6 characters.");
            return;
        }
        if (pass1 !== pass2) {
            alert("Passwords do not match.");
            return;
        }

        // Save user data in localStorage (simulate user DB)
        let users = JSON.parse(localStorage.getItem('users') || '{}');
        if (email in users) {
            alert("Email already registered. Please log in.");
            return;
        }
        users[email] = pass1;
        localStorage.setItem('users', JSON.stringify(users));
        alert("Account created! You can log in now.");
        window.location.href = "login.html";
    }
}
// OTP generator/verification on signup page
if (document.getElementById("sendOtpBtn")) {
    let generatedOtp = "";

    document.getElementById("sendOtpBtn").onclick = function () {
        const mobile = document.getElementById("mobileInput").value.trim();
        const mobileRegex = /^[6-9]\d{9}$/;
        if (!mobileRegex.test(mobile)) {
            alert("Enter a valid 10-digit mobile number.");
            return;
        }
        // Simulate OTP generation (random 6-digit code)
        generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
        alert("OTP sent: " + generatedOtp + " (Simulated – no SMS will be sent)");
        document.getElementById("otpInput").style.display = "block";
    };

    if (document.getElementById("signupForm")) {
        document.getElementById("signupForm").onsubmit = function(e) {
            e.preventDefault();
            const otp = document.getElementById("otpInput").value.trim();
            if (document.getElementById("otpInput").style.display === "block" && otp !== generatedOtp) {
                alert("Invalid OTP. Please try again.");
                return;
            }
            // Continue with email/password validation/registration (see earlier code)
            alert("Sign up successful! (OTP verified)");
            window.location.href = "login.html";
        }
    }
}

// Logout logic
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
    logoutBtn.onclick = function(e) {
        e.preventDefault();
        // Clear simulated authentication/session info if needed
        // Example: Clear current user (if you track it with localStorage)
        localStorage.removeItem("currentUser");
        // Optionally, clear other info (responses/forms) as needed

        // Redirect to login or home page
        window.location.href = "login.html";
    };
}if (document.getElementById("settingsForm")) {
    document.getElementById("settingsForm").onsubmit = function(e) {
        e.preventDefault();

        // Get color values
        const textColor = document.getElementById("settingTextColor").value;
        const bgColor = document.getElementById("settingBgColor").value;

        // Update CSS variables live
        document.documentElement.style.setProperty('--text-main', textColor);
        document.documentElement.style.setProperty('--background', bgColor);

        alert("Settings and theme saved!");
    }
}
addQuestionBtn.onclick = function () {
    const qDiv = document.createElement("div");
    qDiv.className = "form-question-box";
    qDiv.innerHTML = `
        <input type="text" class="question-input" placeholder="Untitled Question" />
        <select class="question-type-selector">
            <option value="multiple">Multiple choice</option>
            <option value="checkbox">Checkboxes</option>
            <option value="short">Short answer</option>
            <option value="paragraph">Paragraph</option>
            <option value="dropdown">Dropdown</option>
        </select>
        <div class="question-options"></div>
        <div class="question-toolbar">
            <button type="button" class="add-option-btn">Add Option</button>
            <button type="button" class="delete-question-btn">Delete</button>
        </div>
    `;
    questionsContainer.appendChild(qDiv);

    let optionCount = 1;
    const optionsDiv = qDiv.querySelector('.question-options');
    const typeSelector = qDiv.querySelector('.question-type-selector');

    // Interactive radio/checkbox
    function renderOptions() {
        optionsDiv.innerHTML = "";
        if (typeSelector.value === "multiple") {
            for (let i = 0; i < optionCount; i++) {
                const wrapper = document.createElement('div');
                // The radio button is clickable (lets user select during build)
                wrapper.innerHTML = `<input type="radio" name="previewRadio${qDiv.id}" class="question-radio-interactive">
                    <input type="text" class="question-option-input" placeholder="Option ${i+1}">`;
                optionsDiv.appendChild(wrapper);
            }
        } else if (typeSelector.value === "checkbox") {
            for (let i = 0; i < optionCount; i++) {
                const wrapper = document.createElement('div');
                wrapper.innerHTML = `<input type="checkbox" class="question-checkbox-interactive">
                    <input type="text" class="question-option-input" placeholder="Option ${i+1}">`;
                optionsDiv.appendChild(wrapper);
            }
        } else if (typeSelector.value === "dropdown") {
            for (let i = 0; i < optionCount; i++) {
                const wrapper = document.createElement('div');
                wrapper.innerHTML = `<input type="text" class="question-option-input" placeholder="Option ${i+1}">`;
                optionsDiv.appendChild(wrapper);
            }
        } else {
            optionsDiv.innerHTML = `<em style="color:#bbb; font-size:0.99em;">This question type doesn't require options.</em>`;
        }
    }
    renderOptions();

    qDiv.querySelector('.add-option-btn').onclick = function() {
        optionCount++;
        renderOptions();
    };
    qDiv.querySelector('.delete-question-btn').onclick = () => qDiv.remove();
    typeSelector.onchange = function() { renderOptions(); };
};
if (document.getElementById("formTitle") && document.getElementById("formDesc") && document.getElementById("questionsContainer")) {
    let savedForm = localStorage.getItem('currentForm');
    if (savedForm) {
        const data = JSON.parse(savedForm);
        document.getElementById("formTitle").value = data.title || "";
        document.getElementById("formDesc").value = data.description || "";
        const questionsContainer = document.getElementById("questionsContainer");
        questionsContainer.innerHTML = "";

        data.questions.forEach(function(q) {
            const qDiv = document.createElement("div");
            qDiv.className = "form-question-box";
            let html = `
                <input type="text" class="question-input" value="${q.text}" />
                <select class="question-type-selector">
                    <option value="multiple">Multiple choice</option>
                    <option value="checkbox">Checkboxes</option>
                    <option value="short">Short answer</option>
                    <option value="paragraph">Paragraph</option>
                    <option value="dropdown">Dropdown</option>
                </select>
                <div class="question-options"></div>
                <div class="question-toolbar">
                    <button type="button" class="add-option-btn">Add Option</button>
                    <button type="button" class="delete-question-btn">Delete</button>
                </div>
            `;
            qDiv.innerHTML = html;
            questionsContainer.appendChild(qDiv);

            let optionCount = q.options.length || 1;
            const optionsDiv = qDiv.querySelector('.question-options');
            const typeSelector = qDiv.querySelector('.question-type-selector');
            typeSelector.value = q.type;

            function renderOptions() {
                optionsDiv.innerHTML = "";
                if (q.type === "multiple") {
                    for (let i = 0; i < optionCount; i++) {
                        const wrapper = document.createElement('div');
                        wrapper.innerHTML = `<input type="radio" name="previewRadio${qDiv.id}" class="question-radio-interactive">
                            <input type="text" class="question-option-input" value="${q.options[i] || ""}" placeholder="Option ${i+1}">`;
                        optionsDiv.appendChild(wrapper);
                    }
                } else if (q.type === "checkbox") {
                    for (let i = 0; i < optionCount; i++) {
                        const wrapper = document.createElement('div');
                        wrapper.innerHTML = `<input type="checkbox" class="question-checkbox-interactive">
                            <input type="text" class="question-option-input" value="${q.options[i] || ""}" placeholder="Option ${i+1}">`;
                        optionsDiv.appendChild(wrapper);
                    }
                } else if (q.type === "dropdown") {
                    for (let i = 0; i < optionCount; i++) {
                        const wrapper = document.createElement('div');
                        wrapper.innerHTML = `<input type="text" class="question-option-input" value="${q.options[i] || ""}" placeholder="Option ${i+1}">`;
                        optionsDiv.appendChild(wrapper);
                    }
                } else {
                    optionsDiv.innerHTML = `<em style="color:#bbb; font-size:0.99em;">This question type doesn't require options.</em>`;
                }
            }
            renderOptions();

            qDiv.querySelector('.add-option-btn').onclick = function() {
                optionCount++;
                renderOptions();
            };
            qDiv.querySelector('.delete-question-btn').onclick = () => qDiv.remove();
            typeSelector.onchange = function() { renderOptions(); };
        });
    }
}if (document.getElementById("previewForm")) {
    document.getElementById("previewForm").onsubmit = function(e) {
        e.preventDefault();

        const formData = JSON.parse(localStorage.getItem('currentForm') || '{}');
        let userResponse = {};
        let questions = document.querySelectorAll('.preview-question');
        questions.forEach((qDiv, idx) => {
            const type = formData.questions[idx].type;
            if (type === "multiple") {
                const checked = qDiv.querySelector('input[type="radio"]:checked');
                userResponse[formData.questions[idx].text] = checked ? checked.nextSibling.textContent : "";
            } else if (type === "checkbox") {
                let selected = [];
                qDiv.querySelectorAll('input[type="checkbox"]').forEach((chk, i) => {
                    if (chk.checked) selected.push(chk.nextSibling.textContent);
                });
                userResponse[formData.questions[idx].text] = selected.join(", ");
            } else if (type === "dropdown") {
                const selected = qDiv.querySelector('select');
                userResponse[formData.questions[idx].text] = selected ? selected.value : "";
            } else if (type === "short") {
                const input = qDiv.querySelector('input[type="text"]');
                userResponse[formData.questions[idx].text] = input ? input.value : "";
            } else if (type === "paragraph") {
                const textarea = qDiv.querySelector('textarea');
                userResponse[formData.questions[idx].text] = textarea ? textarea.value : "";
            }
        });

        let allResponses = JSON.parse(localStorage.getItem('formResponses') || '[]');
        allResponses.push(userResponse);
        localStorage.setItem('formResponses', JSON.stringify(allResponses));
        alert('Response submitted!');
    }
}
if (document.getElementById("responsesContainer")) {
    let allResponses = JSON.parse(localStorage.getItem('formResponses') || '[]');
    if (allResponses.length > 0) {
        let html = "<table border='1' cellpadding='8' style='width:100%;'><tr>";
        // Dynamic header row
        Object.keys(allResponses[0]).forEach(key => {
            html += `<th>${key}</th>`;
        });
        html += "</tr>";

        allResponses.forEach((resp) => {
            html += "<tr>";
            Object.values(resp).forEach(val => {
                html += `<td>${val}</td>`;
            });
            html += "</tr>";
        });

        html += "</table>";
        document.getElementById("responsesContainer").innerHTML = html;
    } else {
        document.getElementById("responsesContainer").innerHTML = "<p>No responses yet. Fill out the form to see submissions here.</p>";
    }
}
