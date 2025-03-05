
async function getWeatherData() {
  try {
    const apiKey = "8de8f3cad6c44ab5978101630250503"; // Replace with a valid API key
    const location = "Bengaluru";
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("API Response:", data); // Debugging

    // Update only the temperature text
    document.querySelector(
      ".temp-value"
    ).textContent = `${data.current.temp_c}°C`;

    // Extract Bengaluru's local hour
    const localTime = data.location.localtime; // Example: "2025-03-05 18:30"
    const currentHour = parseInt(
      localTime.split(" ")[1].split(":")[0],
      10
    ); // Extract hour

    // Select all SVG icons inside .temperature
    const icons = document.querySelectorAll(".temperature svg");

    // Hide all icons initially
    icons.forEach((icon) => (icon.style.display = "none"));

    // Select the appropriate SVG based on the time
    let selectedIcon;
    if (currentHour >= 4 && currentHour < 7) {
      selectedIcon = document.querySelector(".bi-sunset-fill"); // Sunrise
    } else if (currentHour >= 7 && currentHour < 17) {
      selectedIcon = document.querySelector(".bi-brightness-high-fill"); // Daytime Sun
    } else if (currentHour >= 17 && currentHour < 19) {
      selectedIcon = document.querySelector(
        ".bi-brightness-alt-high-fill"
      ); // Sunset
    } else {
      selectedIcon = document.querySelector(".bi-moon-fill"); // Night
    }

    // Display the selected icon
    if (selectedIcon) {
      selectedIcon.style.display = "inline";
    } else {
      console.error("No matching SVG found for current time.");
    }
  } catch (error) {
    console.error("Error fetching weather data:", error.message);
  }
}
//browser tod function - infinite recursion
//   function updateDate(){
//     const d = new Date();
//     document.querySelector(".realTime").textContent = d;
//     updateDate();
//   }

//better time function
function updateDate() {
const d = new Date();
document.querySelector(".realTime").textContent = d.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit', 
    month: 'short', 
    day: 'numeric' 
});; // Format time
}




// Call function after DOM loads
document.addEventListener("DOMContentLoaded", getWeatherData);
// Update every second
setInterval(getWeatherData, 60000);
setInterval(updateDate, 1000);


// Initial call
getWeatherData();
updateDate();

