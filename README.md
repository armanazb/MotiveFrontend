Motive - Full-Stack React App
Motive is a full-stack React application designed to simplify trip planning by allowing users to search for places based on budget, group size, and location. The app integrates Google Maps for location-based results and offers an optional AI chatbot to assist users with personalized suggestions.

Table of Contents
Features
Tech Stack
Installation
Google Cloud API Setup
Usage
Contributing
License
Features
Google Maps Integration: Powered by Google Cloud API, users can search for nearby places based on their location, budget, and group size.
AI Chatbot: Users can get personalized suggestions from the chatbot or directly input their preferences and search manually.
Custom Filters: Users can filter search results by activities, budget, and group size.
Authentication: Secure login and user authentication are in place to protect user data and activity.
User-Friendly UI: A clean and intuitive interface makes it easy to plan trips quickly and efficiently.
Tech Stack
Front-End:
React
TypeScript
CSS (or your preferred UI framework)
Back-End:
Flask
Python
APIs:
Google Maps API (via Google Cloud)
AI Chatbot Integration
Database:
Supabase
Deployment:
Google Cloud Platform
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/yourusername/motive-app.git
cd motive-app
Install dependencies:

bash
Copy code
npm install
Set up the back end (Flask):

Navigate to the backend folder.

Install required Python packages:

bash
Copy code
pip install -r requirements.txt
Set up environment variables:

Create a .env file in both the front end and back end with the necessary configuration keys:
Google Maps API Key
Supabase API credentials
Any other relevant keys for the chatbot integration or authentication.
Start the app:

For the front end:

bash
Copy code
npm start
For the back end:

bash
Copy code
python app.py
Google Cloud API Setup
Enable Google Maps API:

Go to the Google Cloud Console.
Create a project and enable the "Maps JavaScript API."
Copy the API key and add it to your .env file under the variable REACT_APP_GOOGLE_MAPS_API_KEY.
Set API Restrictions:

Limit your API key to work only with specific services (e.g., Maps).
Set up IP or domain restrictions for added security.
Usage
Search for Places:

Enter your budget, group size, and location to search for relevant places on the map.
View location details and distances on the interactive map.
Use the Chatbot:

The chatbot can help provide suggestions based on your preferences and location.
Authentication:

Users can log in securely and save their recent searches or favorite locations.
Contributing
Feel free to contribute to Motive by forking the repository and submitting a pull request. Ensure all contributions are thoroughly tested and documented.

