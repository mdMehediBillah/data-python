# data-python

🌎 Vue.js & Flask Data Table with Filtering, Sorting, Pagination & Modal

## 📌 Overview
This project is a Full-Stack Web Application built with Vue.js (frontend) and Flask (backend). It features a dynamic data table with:

- Filtering by country
- Sorting by different columns
- Pagination for large datasets
- Row click to open a detailed modal

## 🛂 Screenshot
![Screenshot](https://github.com/mdMehediBillah/data-python/blob/main/Screenshot.png?raw=true)

## 🚀 Features
✅ Flask API – Serves data from the backend  
✅ Vue.js Dynamic Data Table – Displays structured data  
✅ Filtering – Filter data by country  
✅ Sorting – Sort by multiple fields (Flow Name, Process Name, etc.)  
✅ Pagination – Easily navigate large datasets  
✅ Row Click to Open Modal – Displays row details in a popup  
✅ Tailwind CSS – Responsive & modern styling  
✅ GSAP – Smooth and dynamic animation  

## 💪 Tech Stack

### Frontend (Vue.js)
- Vue 3
- Vuex (State Management)
- Tailwind CSS
- GSAP
- Axios (API calls)

### Backend (Flask)
- Flask (Lightweight Python web framework)
- Flask-CORS (Cross-Origin Resource Sharing)
- Flask-RESTful (API development)

## 📂 Project Structure

```
📎 project/
┣ 📚 server/ # Flask Backend
┃ ┣ 📝 app.py # Main Flask app
┃ ┣ 📝 routes.py # API Routes
┃ ┣ 📝 controller.py # Controller
┃ ┣ 📝 requirements.txt # Python dependencies
┃ ┣ 📝 Dockerfile # Docker configuration for backend
┃ ┗ 📚 uploads/ # Sample dataset

┣ 📚 client/ # Vue.js Frontend
┃ ┣ 📚 src/
┃ ┃ ┣ 📚 assets/
┃ ┃ ┃ ┣ 📝 logo.svg
┃ ┃ ┣ 📚 components/
┃ ┃ ┃ ┣ 📝 AllData.vue # Main data table
┃ ┃ ┃ ┣ 📝 FilteredData.vue # Filtered table with pagination
┃ ┃ ┃ ┣ 📝 DetailModal.vue # Reusable modal for row details
┃ ┃ ┣ 📚 router/
┃ ┃ ┃ ┣ 📝 index.js # Create routes
┃ ┃ ┃ ┣ 📝 routes.js # Define route paths and components
┃ ┃ ┣ 📝 store.js # Vuex store for state management
┃ ┣ 📝 App.vue # Root component
┃ ┣ 📝 main.js # Vue entry file
┃ ┣ 📝 Dockerfile # Docker configuration for frontend
┣ 📝 package.json # Frontend dependencies
┣ 📝 docker-compose.yml # Docker Compose configuration
┣ 📚 tests/ # Unit and integration tests
┣ 📝 README.md # Documentation
┗ 📝 .gitignore
```

## 📝 Deployment

- **Backend** (Flask): [https://data-python.onrender.com](https://data-python.onrender.com)
- **Frontend** (Vue.js): [https://carbondata.netlify.app/](https://carbondata.netlify.app/)

## 📆 TODO & Future Enhancements
✅ Expand data visualization capabilities  
✅ Improve mobile responsiveness  
✅ Implement filtering function for charts  
✅ Optimize API performance  
⏳ Implement Authentication (JWT, OAuth)  

## 📆 Installation Process
```bash
# Frontend (client)
npm install

# Backend (server)
pip install -r requirements.txt
```

## 📆 Testing
```bash
# Run frontend tests
npm test

# Run backend tests
pytest
```

## 📆 Docker Setup
```bash
# Build and start containers
docker-compose up -d --build

# Stop containers
docker-compose down
```

## 👨‍💻 Author
Md Mehedi Billah

