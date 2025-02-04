// Function to start progress bar animation
function startProgressAnimation(progressBar) {
    let width = 0;
    const progressInterval = setInterval(() => {
        if (width < 100) {
            width += 3; // Increment to ensure smooth progress over time
            progressBar.style.width = `${width}%`;
        }
    }, 100); // Set interval for smoother animation over 3s
    return progressInterval;
}

// Handle login form submission
document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent form submission

    // Get input values and trim whitespace
    const usernameOrEmail = document.getElementById('emailOrUsername').value.trim();
    const password = document.getElementById('password').value.trim();
    const notification = document.getElementById("notification");
    const progressBar = document.getElementById("progress-bar-validation");
    const overlay = document.getElementById("loading-overlay"); // Get overlay element

    // Validate the inputs
    if (!usernameOrEmail) {
        showError(usernameOrEmail, "Please enter a valid email/Username.");
        return;
    }

    if (!password) {
        showError(password, "Please enter Your Password.");
        return;
    }

    // Create login request payload
    const loginData = {
        username: usernameOrEmail,  // Match backend expected field names (lowercase)
        password: password
    };

    // Start progress bar animation
    const progressInterval = startProgressAnimation(progressBar);
    progressBar.style.display = "block"; // Show the progress bar
    overlay.style.display = "block"; // start blur

    try {
        const response = await fetch('/cv/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loginData),
        });

        // Wait for animation to complete before proceeding
        setTimeout(async () => {
            clearInterval(progressInterval);
            progressBar.style.width = "100%"; // Ensure progress bar completes
            overlay.style.display = "none";

            if (!response.ok) {
                let errorMessage = "Login failed. Please try again.";
                try {
                    const errorData = await response.json();
                    errorMessage = errorData.error || errorData.message || errorMessage;
                } catch (err) {
                    console.error("Error parsing error response:", err);
                }
                notification.classList.add("error");
                notification.classList.remove("success"); // Remove any success class
                notification.textContent = errorMessage;
                notification.style.display = "block";
                // Do not hide the notification automatically
                progressBar.style.display = "none"; // Hide the progress bar on failure
                return;
            }

            // Successful login
            const data = await response.json();
            localStorage.setItem("loggedInUser", data.username);
            notification.classList.add("success");
            notification.classList.remove("error"); // Remove any error class
            notification.textContent = "Login successful!";
            notification.style.display = "block";
            setTimeout(() => {
                notification.style.display = "none";
                window.location.href = "/cv/UserHome";  // Redirect after login
            }, 3000); // Hide success message after 3 seconds

        }, 1000); // Delay for the progress bar animation

    } catch (error) {
        console.error("An error occurred during login:", error);
        notification.classList.add("error");
        notification.classList.remove("success"); // Remove any success class
        notification.textContent = "An unexpected error occurred. Please try again later.";
        notification.style.display = "block";
        // Do not hide the notification automatically
        progressBar.style.display = "none"; // Hide the progress bar on error
        overlay.style.display = "block";
    }
});
