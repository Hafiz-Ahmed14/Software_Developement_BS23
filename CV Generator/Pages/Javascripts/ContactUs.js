function showNotification(message, type) {
    const notification = document.getElementById('notification');

    // Display the notification
    notification.style.display = "block";
    notification.innerText = message;

    // Apply the appropriate color based on the type
    if (type === 'success') {
        notification.classList.add("success");
        notification.classList.remove("error");
    } else {
        notification.classList.add("error");
        notification.classList.remove("success");
    }

    // Hide the notification after 3 seconds
    setTimeout(() => {
        notification.style.opacity = "0";
        setTimeout(() => {
            notification.style.display = "none"; // Hide after fading out
            notification.style.opacity = "1"; // Reset opacity
        }, 500);
    }, 3000);
}



document.getElementById('contactForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const question = document.getElementById('question').value;
    const progressBar = document.getElementById("progress-bar-validation");
    const overlay = document.getElementById("loading-overlay");

    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += 3;
        progressBar.style.width = progress + "%";
    }, 100);

    overlay.style.display = "block";
    progressBar.style.display = "block";

    try {
        const response = await fetch('/cv/sendemail', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, subject, question }),
        });

        setTimeout(() => {
            clearInterval(progressInterval);
            progressBar.style.width = "100%";
            overlay.style.display = "none";

            if (response.ok) {
                showNotification("Your message has been sent successfully!", "success");
                setTimeout(() => window.location.href = "/cv/contactus", 2000);
            } else {
                showNotification("Failed to send your message. Please try again.", "error");
            }
        }, 3000);
    } catch (error) {
        showNotification("An error occurred: " + error.message, "error");
    }
});