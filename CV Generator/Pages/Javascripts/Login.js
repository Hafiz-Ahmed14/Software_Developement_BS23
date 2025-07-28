// Function to start progress bar animation
function startProgressAnimation(progressBar) {
    let width = 0;
    const progressInterval = setInterval(() => {
        if (width < 100) {
            width += 3; // Increment for smooth progress
            progressBar.style.width = `${width}%`;
        }
    }, 100);
    return progressInterval;
}

// Handle login form submission
document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent form submission

    // Get input values
    const usernameOrEmail = document.getElementById('emailOrUsername').value.trim();
    const password = document.getElementById('password').value.trim();
    const notification = document.getElementById("notification");
    const progressBar = document.getElementById("progress-bar-validation");
    const overlay = document.getElementById("loading-overlay");

    // Validate the inputs
    if (!usernameOrEmail) {
        notification.textContent = "Please enter a valid email/username.";
        notification.style.display = "block";
        return;
    }

    if (!password) {
        notification.textContent = "Please enter your password.";
        notification.style.display = "block";
        return;
    }

    // Create login request payload
    const loginData = {
        username: usernameOrEmail,
        password: password
    };

    // Start progress animation
    const progressInterval = startProgressAnimation(progressBar);
    progressBar.style.display = "block";
    overlay.style.display = "block";

    try {
        const response = await fetch('/cv/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loginData),
        });

        // Wait for animation
        setTimeout(async () => {
            clearInterval(progressInterval);
            progressBar.style.width = "100%";
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
                progressBar.style.display = "none";
                return;
            }

            // Successful login
            const data = await response.json();
            console.log(data);
            localStorage.setItem('AccessToken', data.token);

            notification.classList.add("success");
            notification.classList.remove("error");
            notification.textContent = "Login successful!";
            notification.style.display = "block";

            setTimeout(() => {
                notification.style.display = "none";
                window.location.href = "/cv/UserHome";  // Redirect to user home
            }, 2000);

        }, 1000);

    } catch (error) {
        console.error("An error occurred:", error);
        notification.classList.add("error");
        notification.classList.remove("success");
        notification.textContent = "An unexpected error occurred. Please try again.";
        notification.style.display = "block";
        progressBar.style.display = "none";
        overlay.style.display = "none";
    }
});





