# data-python

🌎 Vue.js & Flask Data Table with Filtering, Sorting, Pagination & Modal

📌 Overview
This project is a Full-Stack Web Application built with Vue.js (frontend) and Flask (backend).
It features a dynamic data table with:

Filtering by country
Sorting by different columns
Pagination for large datasets
Row click to open a detailed modal

🖼️ Screenshot
!(https://github.com/mdMehediBillah/data-python/blob/main/Screenshot.png?raw=true)

🚀 Features
✅ Flask API – Serves data from the backend
✅ Vue.js Dynamic Data Table – Displays structured data
✅ Filtering – Filter data by country
✅ Sorting – Sort by multiple fields (Flow Name, Process Name, etc.)
✅ Pagination – Easily navigate large datasets
✅ Row Click to Open Modal – Displays row details in a popup
✅ Tailwind CSS – Responsive & modern styling

📦 Tech Stack
Frontend (Vue.js)
Vue 3
Vuex (State Management)
Tailwind CSS
Axios (API calls)
Backend (Flask)
Flask (Lightweight Python web framework)
Flask-CORS (Cross-Origin Resource Sharing)
Flask-RESTful (API development)

📂 Project Structure

📦 project/
┣ 📂 server/ # Flask Backend
┃ ┣ 📜 app.py # Main Flask app
┃ ┣ 📜 database.py # Database models & setup
┃ ┣ 📜 routes.py # API Routes
┃ ┣ 📜 requirements.txt # Python dependencies
┃ ┗ 📂 data/ # Sample dataset
┣ 📂 client/ # Vue.js Frontend
┃ ┣ 📂 src/
┃ ┃ ┣ 📂 components/
┃ ┃ ┃ ┣ 📜 AllData.vue # Main data table
┃ ┃ ┃ ┣ 📜 FilteredData.vue # Filtered table with pagination
┃ ┃ ┃ ┣ 📜 DetailModal.vue # Reusable modal for row details
┃ ┃ ┃ ┣ 📜 store.js # Vuex store for state management
┃ ┣ 📜 App.vue # Root component
┃ ┣ 📜 main.js # Vue entry file
┣ 📜 package.json # Frontend dependencies
┣ 📜 README.md # Documentation
┗ 📜 .gitignore

📝 TODO & Future Enhancements
✅ Add CSV/Excel Export functionality
✅ Improve mobile responsiveness
✅ Optimize API performance
⏳ Implement Authentication (JWT, OAuth)
⏳ Deploy to a cloud server (Heroku, AWS, etc.)

👨‍💻 Author
Md Mehedi Billah
