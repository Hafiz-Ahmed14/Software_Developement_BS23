
// Function to start progress bar animation
function startProgressAnimation(progressBar) {
    let width = 0;
    const progressInterval = setInterval(() => {
        if (width < 100) {
            width += 3; // Increment for smooth animation
            progressBar.style.width = `${width}%`;
        }
    }, 100);
    return progressInterval;
}

// Handle registration form submission
document.getElementById("signupForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const username = document.getElementById("username");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");
    const progressBar = document.getElementById("progress-bar-validation");
    const notification = document.getElementById("notification");
    const overlay = document.getElementById("loading-overlay");

    let isValid = true;

    // Clear previous errors
    document.querySelectorAll(".error-message").forEach((el) => el.remove());

    // Client-side validation
    if (username.value.trim().length < 3) {
        showError(username, "Username must be at least 3 characters long.");
        isValid = false;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email.value)) {
        showError(email, "Please enter a valid email address.");
        isValid = false;
    }

    if (password.value.length < 6) {
        showError(password, "Password must be at least 6 characters long.");
        isValid = false;
    }

    if (confirmPassword.value !== password.value) {
        showError(confirmPassword, "Passwords do not match.");
        isValid = false;
    }

    if (isValid) {
        const formData = {
            username: username.value,  // Match backend (lowercase, same as login)
            email: email.value,
            password: password.value
        };

        // Start progress animation
        const progressInterval = startProgressAnimation(progressBar);
        progressBar.style.display = "block";
        overlay.style.display = "block";

        try {
            const response = await fetch("/cv/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            // Wait for the animation to complete
            setTimeout(async () => {
                clearInterval(progressInterval);
                progressBar.style.width = "100%";
                overlay.style.display = "none";

                if (response.ok) {
                    notification.classList.add("success");
                    notification.classList.remove("error");
                    notification.textContent = "Registration successful!";
                    notification.style.display = "block";

                    setTimeout(() => {
                        notification.style.display = "none";
                        window.location.href = "/cv/login"; // Redirect to login page
                    }, 1000);
                } else {
                    const errorData = await response.json();
                    progressBar.style.display = "none"; // Hide progress bar if failed

                    if (typeof errorData === "object") {
                        Object.keys(errorData).forEach((key) => {
                            const input = document.getElementById(key);
                            if (input) showError(input, errorData[key][0]);
                        });
                    } else {
                        notification.classList.add("error");
                        notification.textContent = "Registration failed. Please try again.";
                        notification.style.display = "block";
                    }
                }
            }, 3000);
        } catch (error) {
            console.error("An error occurred:", error);
            progressBar.style.display = "none";
            overlay.style.display = "none";

            notification.classList.add("error");
            notification.textContent = "An unexpected error occurred. Please try again later.";
            notification.style.display = "block";

            setTimeout(() => {
                notification.style.display = "none";
            }, 3000);
        }
    }

    function showError(input, message) {
        const error = document.createElement("div");
        error.className = "error-message text-danger mt-1";
        error.textContent = message;
        input.parentElement.appendChild(error);
    }
});
