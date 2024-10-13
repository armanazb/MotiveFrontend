import { useState, useEffect, useRef } from "react";
import { Search, Send, X } from "lucide-react";
import Navbar from "../components/navbar";
import { Loader } from "@googlemaps/js-api-loader";
import OpenAPIService from "../services/openAPI";
import ai2 from "../assets/ai2.png";
import axiosInstance from "../libs/interceptor";

export default function ChatbotSearch() {
  const [searchQuery, setSearchQuery] = useState(""); // State for location search
  const [isNearMe, setIsNearMe] = useState(false); // Checkbox state for "near me"
  const [searchResults, setSearchResults] = useState([]);
  const [messages, setMessages] = useState([
    { role: "bot", content: "Hello! How can I assist you today?" },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [currentLocation, setCurrentLocation] = useState(null); // To store the user's current location
  const [budget, setBudget] = useState(500); // Budget state with default value
  const mapRef = useRef(null); // Ref for the map div
  const mapInstance = useRef(null); // Ref to hold the map instance
  const geocoder = useRef(null); // Ref for the Geocoder instance

  const placesService = useRef(null); // Ref for PlacesService
  const [distances, setDistances] = useState([]); // State to store distances
  const [groupType, setGroupType] = useState(1); // State to store the group type
  const [loading, setLoading] = useState(false);
  const googleMapsApiKey = "AIzaSyAAAG-NRSBgZJeJPa6mPlzIrsAO0_5lN30";

  useEffect(() => {
    const loader = new Loader({
      apiKey: googleMapsApiKey,
      version: "weekly",
      libraries: ["places", "geometry"], // Load geometry library
    });

    loader.load().then(() => {
      // Set up the map centered in New York City (default)
      mapInstance.current = new google.maps.Map(mapRef.current, {
        center: { lat: 40.73061, lng: -73.935242 },
        zoom: 12,
      });

      // Initialize PlacesService
      placesService.current = new google.maps.places.PlacesService(
        mapInstance.current
      );

      // Get user's current location when app loads
      getCurrentLocation();
    });
  }, []);

  // Function to get the user's current location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const location = { lat: latitude, lng: longitude };
          setCurrentLocation(location);

          // Add a marker for the user's current location
          new google.maps.Marker({
            position: location,
            map: mapInstance.current,
            title: "You are here",
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              scale: 8,
              fillColor: "#4285F4",
              fillOpacity: 1,
              strokeWeight: 1,
              strokeColor: "#ffffff",
            },
          });
        },
        (error) => {
          console.error("Error getting location", error);
          alert(
            "Unable to retrieve your location. Please enable location services."
          );
        }
      );
    }
  };

  // Function to handle searching based on the query or "near me"
  const handleSearch = (activity = null) => {
    const keyword = activity || searchQuery;
    if (isNearMe && currentLocation) {
      // If "near me" is checked, search near the user's location
      handleNearbySearch(currentLocation, keyword || "restaurants");
    } else if (searchQuery.trim()) {
      // Perform a custom search based on the query
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address: searchQuery }, (results, status) => {
        if (status === "OK" && results[0]) {
          const location = results[0].geometry.location;

          // Center the map on the searched location
          mapInstance.current.setCenter(location);
          mapInstance.current.setZoom(14);

          // Perform a nearby search around the searched location
          handleNearbySearch(location, keyword);
        } else {
          alert("Location not found. Please try again.");
        }
      });
    } else {
      alert('Please enter a search query or enable "near me".');
    }
  };

  // Function to handle nearby search
  const handleNearbySearch = async (location, keyword) => {
    const request = {
      location,
      radius: 5000, // 5km radius
      keyword: keyword || "restaurants", // Default to 'restaurants'
    };

    placesService.current.nearbySearch(request, async (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        try {
          console.log("Search results:", results);
          setLoading(true);
          // Loop through results and extract necessary data
          const refinedResults = results.map((place) => ({
            name: place.name,
            types: place.types || [], // First two types or an empty array if not available
            price_level: place.price_level || 0, // Default to 0 if price_level is missing
            group_size: groupType,
            budget: budget,
          }));

          // Perform async API call to post refined search results
          const response = await axiosInstance.post(
            "/api/activities",
            JSON.stringify({ results: refinedResults }), // Send refined data
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          console.log(response.data.places);

          const res = response.data.places;
          console.log("Refined search results:", res);

          setSearchResults(res);
          setLoading(false);

          // Clear existing markers
          mapInstance.current.clearOverlays?.();

          // Add markers for each result
          const distancesArray = [];
          results.forEach((place) => {
            new google.maps.Marker({
              position: place.geometry.location,
              map: mapInstance.current,
              title: place.name,
            });

            // Calculate distance if current location is available
            if (currentLocation) {
              const distance =
                google.maps.geometry.spherical.computeDistanceBetween(
                  new google.maps.LatLng(currentLocation),
                  place.geometry.location
                );
              distancesArray.push((distance / 1000).toFixed(2)); // Distance in kilometers
            }
          });
          setDistances(distancesArray);

          // Fit the map to show all results
          const bounds = new google.maps.LatLngBounds();
          results.forEach((place) => bounds.extend(place.geometry.location));
          mapInstance.current.fitBounds(bounds);
        } catch (error) {
          console.error("Error posting activities:", error);
          alert("An error occurred while posting activities.");
        }
      } else {
        alert("No places found. Please try again.");
      }
    });
  };

  // Function to handle sending a message to the chatbot
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

  // Function to clear the search input
  const clearSearch = () => {
    setSearchQuery("");
  };

  const getPriceLevel = (priceLevel) => {
    switch (priceLevel) {
      case 0:
        return "Unknown"; // Free places with no cost
      case 1:
        return "$ (Inexpensive)"; // Inexpensive places
      case 2:
        return "$ (Moderate)"; // Moderate pricing
      case 3:
        return "$ (Expensive)"; // Expensive places
      case 4:
        return "$ (Very Expensive)"; // Very expensive places
      default:
        return "Unknown"; // Handle cases where price level is not available
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex-1 flex bg-base-200 overflow-hidden">
        {/* Google Maps Section */}
        <div className="flex-1" ref={mapRef} style={{ height: "100%" }}>
          {/* Map will render here */}
        </div>

        {/* Search Filters Section */}
        <div className="w-96 bg-base-100 shadow-xl rounded-lg flex flex-col ml-2 overflow-hidden">
          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto p-4">
            {/* Filters Section */}
            <h2 className="text-lg font-semibold mb-4">Search Filters</h2>

            {/* Group Type Dropdown */}
            <div className="mb-4">
              <h3 className="text-sm font-medium mb-2">Group Type</h3>
              <select
                className="select select-bordered w-full"
                value={groupType === 5 ? "4+ people" : `${groupType} people`} // Map the state to the correct option value
                onChange={(e) => {
                  const selectedValue = e.target.value;

                  // Convert the selected value to an integer or keep "4+" as a string
                  if (selectedValue === "1 people") {
                    setGroupType(1);
                  } else if (selectedValue === "2 people") {
                    setGroupType(2);
                  } else if (selectedValue === "3 people") {
                    setGroupType(3);
                  } else if (selectedValue === "4 people") {
                    setGroupType(4);
                  } else {
                    setGroupType(5); // For "4+ people" option
                  }
                }}
              >
                <option value="1 people">1 Person</option>
                <option value="2 people">2 People</option>
                <option value="3 people">3 People</option>
                <option value="4 people">4 People</option>
                <option value="4+ people">4+ People</option>
              </select>
            </div>

            {/* Preset Activity Buttons */}
            <div className="mb-4">
              <h3 className="text-sm font-medium mb-2">Select an Activity</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "Indoor",
                  "Outdoor",
                  "Food",
                  "Drink",
                  "Shopping",
                  "Sports",
                  "Accommodations",
                ].map((activity) => (
                  <button
                    key={activity}
                    className="btn btn-sm btn-outline"
                    onClick={() => handleSearch(activity.toLowerCase())}
                  >
                    {activity}
                  </button>
                ))}
              </div>
            </div>

            {/* Budget Slider */}
            <div className="mb-4">
              <h3 className="text-sm font-medium mb-2">Budget: ${budget}</h3>
              <input
                type="range"
                className="range"
                min="0"
                max="1000"
                step="50"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              />
              <div className="flex justify-between text-xs px-2">
                <span>$0</span>
                <span>$1000</span>
              </div>
            </div>

            {/* Search Input */}
            <div className="mb-4 relative">
              <h3 className="text-sm font-medium mb-2">
                {isNearMe ? "Search near me" : "Search for a city"}
              </h3>
              <div className="relative">
                <input
                  type="text"
                  className="input input-bordered w-full mb-2 pr-10" // Add padding for the "X" button
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={
                    isNearMe ? "Search near me" : "Search for a city"
                  }
                />
                {/* Show the "X" button when there's text in the input */}
                {searchQuery && (
                  <button
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    onClick={clearSearch}
                  >
                    <X className="h-5 w-5 text-gray-500" />
                  </button>
                )}
              </div>

              {/* "Near Me" Checkbox */}
              <div className="flex items-center mb-4 mt-4">
                <input
                  type="checkbox"
                  checked={isNearMe}
                  onChange={(e) => setIsNearMe(e.target.checked)}
                  className="checkbox mr-2"
                />
                <label className="label-text">Show near me</label>
              </div>

              <button
                onClick={() => handleSearch()}
                className="btn btn-primary w-full mb-4"
              >
                <Search className="h-5 w-5 mr-2" />
                Search
              </button>
            </div>

            {/* Scrollable Section: Search Results + Chatbot */}
            <div className="flex-1 overflow-y-auto max-h-80">
              {/* Search Results */}
              <h3 className="text-sm font-medium mb-2">Search Results</h3>
              {loading ? (
                // Show loading indicator when loading is true
                <div className="flex items-center justify-center">
                  <span className="loading loading-spinner text-primary"></span>
                </div>
              ) : Array.isArray(searchResults) && searchResults.length > 0 ? (
                searchResults.map((result, index) => (
                  <div key={index} className="card bg-base-200 shadow-sm mb-2">
                    <div className="card-body p-4 flex justify-between">
                      <div>
                        <h4 className="card-title text-sm">{result.name}</h4>
                        <p className="text-xs">
                          Price Level: {getPriceLevel(result.price_level)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No search results found.</p>
              )}

              {/* Chatbot Section */}
              <div className="bg-base-100 shadow-lg rounded-lg p-4 mt-4">
                <h2 className="text-lg font-semibold mb-4">
                  Let Chatbot Plan Your Day!
                </h2>
                <div className="h-40 overflow-y-auto mb-4">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`chat ${
                        message.role === "user" ? "chat-end" : "chat-start"
                      }`}
                    >
                      {message.role !== "user" && (
                        <div className="chat-image avatar">
                          <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center">
                            <img
                              src={ai2}
                              alt="AI Avatar"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                      )}
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
                    className="btn btn-primary"
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
    </div>
  );
}
