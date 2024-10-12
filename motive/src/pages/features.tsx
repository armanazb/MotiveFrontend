import { useState } from 'react'
import { MapPin, MessageCircle, Search, Users, Zap, Shield } from 'lucide-react'
import Navbar from '../components/navbar'

export default function FeaturesPage() {
  const [activeTab, setActiveTab] = useState('all')

  const features = [
    {
      icon: <MapPin className="w-12 h-12 text-primary" />,
      title: "Location-Based Recommendations",
      description: "Get personalized activity suggestions based on your current location.",
      category: "recommendations"
    },
    {
      icon: <MessageCircle className="w-12 h-12 text-primary" />,
      title: "AI-Powered Chatbot",
      description: "Interact with our intelligent chatbot to find the perfect activities for you.",
      category: "ai"
    },
    {
      icon: <Search className="w-12 h-12 text-primary" />,
      title: "Advanced Search Filters",
      description: "Easily find activities that match your preferences with our powerful search tools.",
      category: "search"
    },
    {
      icon: <Users className="w-12 h-12 text-primary" />,
      title: "Group Planning",
      description: "Plan activities for groups of any size with our collaborative tools.",
      category: "planning"
    },
    {
      icon: <Zap className="w-12 h-12 text-primary" />,
      title: "Real-Time Updates",
      description: "Stay informed with live updates on activity availability and conditions.",
      category: "updates"
    },
    {
      icon: <Shield className="w-12 h-12 text-primary" />,
      title: "Secure Bookings",
      description: "Book activities with confidence using our secure payment system.",
      category: "bookings"
    }
  ]

  const filteredFeatures = activeTab === 'all' 
    ? features 
    : features.filter(feature => feature.category === activeTab)

  return (
    <div className="min-h-screen bg-base-200">
      {/* Navigation */}
  < Navbar />

      <div className="container mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold text-center mb-8 mt-6">Our Features</h1>
        
     

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
          {filteredFeatures.map((feature, index) => (
            <div key={index} className="card bg-base-100 shadow-xl">
              <div className="card-body items-center text-center">
                {feature.icon}
                <h2 className="card-title mt-4">{feature.title}</h2>
                <p>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to get started?</h2>
          <p className="mb-8">Join thousands of users who are already enjoying our features!</p>
          
        </div>
      </div>
    </div>
  )
}