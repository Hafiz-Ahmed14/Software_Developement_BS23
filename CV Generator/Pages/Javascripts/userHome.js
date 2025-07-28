let username;
document.addEventListener("DOMContentLoaded", function () {
    const token = localStorage.getItem('AccessToken');
    console.log("Token is: ", token);
    if (!token) {
        window.location.href = "/cv/login";
    }
    fetch("/cv/auth/protected", {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                window.location.href = "/cv/login"; // Redirect to login if unauthorized
            } else {
                console.log(data);
                const usernameElement = document.getElementById("username");
                usernameElement.innerText = `Welcome, ${data.username}`;
                username = data.username;
                loadFavorites();
                setTimeout(() => {
                    usernameElement.innerText = data.username;
                }, 60000); // 5000ms = 5 seconds
            }
        })
        .catch(() => {
            window.location.href = "/cv/login"; // Redirect on error
        });
});

async function saveToFavorites(templateId) {
    const icon = document.querySelector(`[onclick="saveToFavorites('${templateId}')"]`);
    const isFavorite = icon.classList.contains("bi-star-fill"); // Check if already favorite

    try {
        if (isFavorite) {
            await fetch(`/cv/favorites/${username}/${templateId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            icon.classList.remove("bi-star-fill");
            icon.classList.add("bi-star");
            icon.style.color = "rgb(130, 133, 133)";
        } else {
            await fetch(`/cv/favorites/${username}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ templateId })
            });
            icon.classList.remove("bi-star");
            icon.classList.add("bi-star-fill");
            icon.style.color = "gold";
        }
    } catch (error) {
        console.error("Error updating favorites:", error);
    }
}

async function loadFavorites() {
    try {
        const response = await fetch(`/cv/favorites/${username}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const favoriteTemplates = await response.json();
        console.log("Favourite templates are: ", favoriteTemplates);

        favoriteTemplates.forEach(templateId => {
            const icon = document.querySelector(`[onclick="saveToFavorites('${templateId}')"]`);
            if (icon) {
                icon.classList.remove("bi-star");
                icon.classList.add("bi-star-fill");
                icon.style.color = "gold";
            }
        });
    } catch (error) {
        console.error("Error fetching favorites:", error);
    }
}

document.getElementById("logout-btn").addEventListener("click", logout);
function logout() {
    localStorage.removeItem('AccessToken');
    window.location.href = "/cv/login";
}