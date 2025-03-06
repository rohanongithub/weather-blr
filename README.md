# Weather App - BLR2DAY

## Overview
This is a simple weather application that displays the current temperature of **Bengaluru** along with icons representing different times of the day. The data is fetched using the **WeatherAPI**.

## Issue with Hosting
Due to CORS restrictions and API key security concerns, the application **cannot be hosted on Netlify** or other public hosting services. The API requires a valid key, and exposing it publicly may lead to **unauthorized access** or rate limitations. Therefore, this project must be **run locally** to function correctly.

---

## 🚀 Setup Instructions (Run Locally)

### **1. Clone the Repository**
Open your terminal and run:
```bash
 git clone https://github.com/your-username/weather-app.git
 cd weather-app
```

### **2. Get an API Key**
Sign up at **[WeatherAPI](https://www.weatherapi.com/)** and get a free API key.

### **3. Configure the API Key**
Create a new file named `.env` in the root folder and add:
```env
WEATHER_API_KEY=your_api_key_here
```

### **4. Run a Local Server**
To avoid CORS issues, run a simple **local server**:

#### **Option 1: Using Python (Recommended)**
If you have Python installed, run:
```bash
python -m http.server 5500
```
Then, open `http://localhost:5500` in your browser.

#### **Option 2: Using Node.js**
If you have Node.js installed, install `http-server`:
```bash
npm install -g http-server
http-server -p 5500
```
Then, open `http://localhost:5500` in your browser.

### **5. Open in Browser**
Once the server is running, open your browser and visit:
```
http://localhost:5500
```

---

## 📌 Features
- Fetches real-time weather data for Bengaluru.
- Displays appropriate icons based on the time of day.
- Uses JavaScript's `fetch()` method to call the API asynchronously.

## 🛠️ Technologies Used
- **HTML, CSS, JavaScript** for the frontend.
- **WeatherAPI** for fetching weather data.

## 📜 License
This project is licensed under the MIT License.

---

If you encounter any issues, feel free to open an **issue** in the repository!

🔗 GitHub: [Your Repository Link]

