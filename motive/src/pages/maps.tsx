import { useState, useEffect, useRef } from "react";
import { Search, Send } from "lucide-react";
import Navbar from "../components/navbar";
import { Loader } from "@googlemaps/js-api-loader";
import OpenAPIService from "../services/openAPI";
export default function ChatbotSearch() {
  const [messages, setMessages] = useState([
    {
      role: "bot",
      content:
        "Hello! I can help you find activities based on your group and interests. What would you like to do?",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [budget, setBudget] = useState(50); // State to manage the budget slider
  const [searchQuery, setSearchQuery] = useState(""); // State for location search
  const mapRef = useRef(null); // Ref for the map div
  const mapInstance = useRef(null); // Ref to hold the map instance
  const geocoder = useRef(null); // Ref for the Geocoder instance

  const googleMapsApiKey = "";

  useEffect(() => {
    const loader = new Loader({
      apiKey: googleMapsApiKey,
      version: "weekly",
    });

    loader.load().then(() => {
      // set default coordinates for New York City
      mapInstance.current = new google.maps.Map(mapRef.current, {
        center: { lat: 40.73061, lng: -73.935242 },
        zoom: 12,
      });

      // Initialize Geocoder
      geocoder.current = new google.maps.Geocoder();

      new google.maps.Marker({
        position: { lat: 40.73061, lng: -73.935242 },
        map: mapInstance.current,
        title: "New York City",
      });
    });
  }, []);

  const groups = ["Family", "Friends", "Solo", "Couple"];
  const activities = [
    "Outdoor",
    "Indoor",
    "Sports",
    "Cultural",
    "Relaxation",
    "Adventure",
  ];

  // Function to handle area search using Google Maps Geocoding API
  const handleAreaSearch = () => {
    if (geocoder.current && searchQuery.trim()) {
      geocoder.current.geocode({ address: searchQuery }, (results, status) => {
        if (status === "OK" && results[0]) {
          const location = results[0].geometry.location;
          // Center the map on the searched location
          mapInstance.current.setCenter(location);
          mapInstance.current.setZoom(14);

          // Add a marker to the searched location
          new google.maps.Marker({
            position: location,
            map: mapInstance.current,
            title: results[0].formatted_address,
          });
        } else {
          alert("Location not found. Please try again.");
        }
      });
    }
  };

  const handleSendMessage = () => {
    if (inputMessage) {
      OpenAPIService.sendDataToOpenAPI(inputMessage).then((response) => {
        const botMessage = response.message;

        setMessages((prev) => [
          ...prev,
          { role: "user", content: inputMessage },
          { role: "bot", content: botMessage },
        ]);
        setInputMessage("");
      });
    }
  };

  const handleActivityToggle = (activity) => {
    setSelectedActivities((prev) =>
      prev.includes(activity)
        ? prev.filter((a) => a !== activity)
        : [...prev, activity]
    );
  };

  const handleSearch = () => {
    setSearchResults([
      { title: "City Park Tour", type: "Outdoor", group: "Family" },
      { title: "Museum Visit", type: "Cultural", group: "Friends" },
      { title: "Local Cuisine Tasting", type: "Indoor", group: "Couple" },
    ]);

    // Example: Add a marker for search results
    searchResults.forEach((result) => {
      new google.maps.Marker({
        position: { lat: 40.73061, lng: -73.935242 }, // Replace with real location data
        map: mapInstance.current,
        title: result.title,
      });
    });
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex-1 flex bg-base-200 overflow-hidden">
        {/* Google Maps Section */}
        <div className="flex-1" ref={mapRef} style={{ height: "100%" }}>
          {/* Map will render here */}
        </div>

        {/* Filters on Top and Chatbot on the Bottom */}
        <div className="w-96 bg-base-100 shadow-xl rounded-lg flex flex-col ml-2 overflow-hidden">
          {/* Scrollable content (filters + chatbot) */}
          <div className="flex-1 overflow-y-auto">
            {/* Filters Section */}
            <div className="p-4 border-b border-base-300">
              <h2 className="text-lg font-semibold mb-4">Search Filters</h2>

              {/* Area Search Input */}
              <div className="mb-4">
                <h3 className="text-sm font-medium mb-2">Search for an Area</h3>
                <input
                  type="text"
                  className="input input-bordered w-full mb-2"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Enter a city or address..."
                />
                <button
                  onClick={handleAreaSearch}
                  className="btn btn-primary w-full mb-4"
                >
                  Search Area
                </button>
              </div>

              {/* Budget Slider */}
              <div className="mb-4">
                <h3 className="text-sm font-medium mb-2">Budget: ${budget}</h3>
                <input
                  type="range"
                  className="range"
                  min="0"
                  max="500"
                  step="10"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                />
                <div className="flex justify-between text-xs px-2">
                  <span>$0</span>
                  <span>$500</span>
                </div>
              </div>

              <select
                className="select select-bordered w-full mb-4"
                value={selectedGroup}
                onChange={(e) => setSelectedGroup(e.target.value)}
              >
                <option disabled value="">
                  Select group
                </option>
                {groups.map((group) => (
                  <option key={group} value={group}>
                    {group}
                  </option>
                ))}
              </select>

              <div className="mb-4">
                <h3 className="text-sm font-medium mb-2">Activities</h3>
                <div className="flex flex-wrap gap-2">
                  {activities.map((activity) => (
                    <button
                      key={activity}
                      className={`btn btn-sm ${
                        selectedActivities.includes(activity)
                          ? "btn-active"
                          : "btn-outline"
                      }`}
                      onClick={() => handleActivityToggle(activity)}
                    >
                      {activity}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleSearch}
                className="btn btn-primary w-full mb-4"
              >
                <Search className="h-5 w-5 mr-2" />
                Search Activities
              </button>

              {/* Search Results */}
              <div className="max-h-48 overflow-y-auto">
                <h3 className="text-sm font-medium mb-2">Search Results</h3>
                {searchResults.map((result, index) => (
                  <div key={index} className="card bg-base-200 shadow-sm mb-2">
                    <div className="card-body p-4">
                      <h4 className="card-title text-sm">{result.title}</h4>
                      <p className="text-xs">
                        <span className="badge badge-outline mr-2">
                          {result.type}
                        </span>
                        <span className="badge badge-outline">
                          {result.group}
                        </span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col p-4">
              <div className="flex-1 overflow-y-auto mb-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`chat ${
                      message.role === "user" ? "chat-end" : "chat-start"
                    }`}
                  >
                    <div className="chat-image avatar">
                      <div className="w-10 rounded-full">
                        <img
                          src={
                            message.role === "user"
                              ? "/placeholder.svg"
                              : "/placeholder.svg"
                          }
                          alt={message.role}
                        />
                      </div>
                    </div>
                    <div
                      className={`chat-bubble ${
                        message.role === "user"
                          ? "chat-bubble-primary"
                          : "chat-bubble-secondary"
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="input input-bordered flex-1 mr-2"
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                />
                <button
                  className="btn btn-circle btn-primary"
                  onClick={handleSendMessage}
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
