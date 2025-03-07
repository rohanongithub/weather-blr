// Configuration
const CONFIG = {
  API_KEY: "8de8f3cad6c44ab5978101630250503",
  LOCATION: "Bengaluru",
  UPDATE_INTERVAL: 300000, // 5 minutes in milliseconds
};

// UI Elements
const UI = {
  tempValue: document.querySelector(".temp-value"),
  loadingSpinner: document.querySelector(".loading-spinner"),
  errorMessage: document.querySelector(".error-message"),
  weatherIcons: document.querySelectorAll(".temperature svg"),
  timeElement: document.querySelector(".realTime")
};

function showLoading() {
  if (UI.loadingSpinner) UI.loadingSpinner.style.display = "inline";
  if (UI.errorMessage) UI.errorMessage.style.display = "none";
}

function showError() {
  if (UI.loadingSpinner) UI.loadingSpinner.style.display = "none";
  if (UI.errorMessage) UI.errorMessage.style.display = "inline";
}

async function getWeatherData() {
  showLoading();
  try {
    const url = `https://api.weatherapi.com/v1/current.json?key=${CONFIG.API_KEY}&q=${CONFIG.LOCATION}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    
    // Update temperature with error handling
    if (UI.tempValue) {
      UI.tempValue.textContent = `${data.current.temp_c}°C`;
    }

    // Extract Bengaluru's local hour
    const localTime = data.location.localtime;
    const currentHour = parseInt(localTime.split(" ")[1].split(":")[0], 10);

    // Update weather icon
    updateWeatherIcon(currentHour);
    
    // Hide loading spinner on success
    if (UI.loadingSpinner) UI.loadingSpinner.style.display = "none";
  } catch (error) {
    console.error("Error fetching weather data:", error.message);
    showError();
  }
}

function updateWeatherIcon(currentHour) {
  try {
    if (!UI.weatherIcons.length) {
      console.warn("No weather icons found in the DOM");
      return;
    }

    // Hide all icons initially
    UI.weatherIcons.forEach((icon) => (icon.style.display = "none"));

    // Select the appropriate SVG based on the time
    let selectedIcon;
    if (currentHour >= 4 && currentHour < 7) {
      selectedIcon = document.querySelector(".bi-sunset-fill");
    } else if (currentHour >= 7 && currentHour < 17) {
      selectedIcon = document.querySelector(".bi-brightness-high-fill");
    } else if (currentHour >= 17 && currentHour < 19) {
      selectedIcon = document.querySelector(".bi-brightness-alt-high-fill");
    } else {
      selectedIcon = document.querySelector(".bi-moon-fill");
    }

    // Display the selected icon
    if (selectedIcon) {
      selectedIcon.style.display = "inline";
    } else {
      console.warn("No matching SVG found for current time.");
    }
  } catch (error) {
    console.error("Error updating weather icon:", error.message);
  }
}

function updateDate() {
  try {
    const d = new Date();
    if (UI.timeElement) {
      UI.timeElement.textContent = d.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        month: 'short',
        day: 'numeric',
        hour12: true
      });
    }
  } catch (error) {
    console.error("Error updating date:", error.message);
  }
}

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
  // Initial calls
  getWeatherData();
  updateDate();

  // Set up intervals
  setInterval(getWeatherData, CONFIG.UPDATE_INTERVAL);
  setInterval(updateDate, 1000);
});

