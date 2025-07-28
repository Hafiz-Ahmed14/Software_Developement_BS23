//Screen Loading
function simulateLoading() {
    let progress = 0;
    const progressbar = document.getElementById('progress-bar');
    const overlay = document.getElementById("loading-overlay");

    const interval = setInterval(() => {
        overlay.style.display = "block";
        progress += Math.random() * 10; // Random increase
        if (progress > 100) {
            progress = 100;
            clearInterval(interval);
            overlay.style.display = "none";
            setTimeout(() => progressbar.style.display = 'none', 500); // Hide after full load
        }
        progressbar.style.width = progress + '%';
    }, 100);

}

// Start progress when DOM is loading
document.addEventListener("DOMContentLoaded", simulateLoading);