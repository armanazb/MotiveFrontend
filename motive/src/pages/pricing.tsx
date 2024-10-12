import { useState } from "react";
import { Check, X, Menu, DollarSign, Zap, Rocket } from "lucide-react";
import { Link } from "react-router-dom";

export default function MotivePricingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAnnual, setIsAnnual] = useState(true);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const pricingPlans = [
    {
      name: "Basic",
      icon: <DollarSign className="w-8 h-8 mb-4 text-primary" />,
      monthlyPrice: 9.99,
      annualPrice: 99.99,
      features: [
        "AI-powered trip planning",
        "Budget optimization",
        "Basic itinerary creation",
        "Email support",
      ],
      notIncluded: [
        "Booking integration",
        "Advanced AI recommendations",
        "Priority support",
      ],
    },
    {
      name: "Pro",
      icon: <Zap className="w-8 h-8 mb-4 text-primary" />,
      monthlyPrice: 19.99,
      annualPrice: 199.99,
      features: [
        "All Basic features",
        "Booking integration",
        "Advanced AI recommendations",
        "Customizable itineraries",
        "Chat support",
      ],
      notIncluded: ["White-label solution", "API access"],
    },
    {
      name: "Enterprise",
      icon: <Rocket className="w-8 h-8 mb-4 text-primary" />,
      monthlyPrice: 49.99,
      annualPrice: 499.99,
      features: [
        "All Pro features",
        "White-label solution",
        "API access",
        "Dedicated account manager",
        "Custom integrations",
        "24/7 phone support",
      ],
      notIncluded: [],
    },
  ];

  return (
    <div className="min-h-screen bg-base-100">
      {/* Navigation */}
      <nav className="navbar bg-base-100 shadow-lg">
        <div className="container mx-auto">
          <div className="flex-1">
            <Link
              to="/home"
              className="btn btn-ghost normal-case text-xl text-white"
            >
              Motive
            </Link>
          </div>
          <div className="flex-none hidden md:block">
            <ul className="menu menu-horizontal px-1">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/features">Features</Link>
              </li>
              <li>
                <Link to="/pricing">Pricing</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div>
          <div className="flex-none md:hidden">
            <button className="btn btn-square btn-ghost" onClick={toggleMenu}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <ul className="menu bg-base-100 w-full p-2 rounded-box">
            <li>
              <a>Home</a>
            </li>
            <li>
              <a>Features</a>
            </li>
            <li>
              <a className="active">Pricing</a>
            </li>
            <li>
              <a>Contact</a>
            </li>
          </ul>
        </div>
      )}

      {/* Pricing Header */}
      <section className="py-20 bg-base-200">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Choose Your Motive Plan</h1>
          <p className="text-xl mb-8">
            Select the perfect plan for your travel planning needs
          </p>

          {/* Pricing Toggle */}
          <div className="flex justify-center items-center space-x-4 mb-12">
            <span
              className={`text-lg ${isAnnual ? "text-primary font-bold" : ""}`}
            >
              Annual
            </span>
            <input
              type="checkbox"
              className="toggle toggle-primary"
              checked={!isAnnual}
              onChange={() => setIsAnnual(!isAnnual)}
            />
            <span
              className={`text-lg ${!isAnnual ? "text-primary font-bold" : ""}`}
            >
              Monthly
            </span>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div key={index} className="card bg-base-100 shadow-xl">
                <div className="card-body items-center text-center">
                  {plan.icon}
                  <h2 className="card-title text-2xl mb-4">{plan.name}</h2>
                  <p className="text-4xl font-bold mb-6">
                    $
                    {isAnnual
                      ? plan.annualPrice.toFixed(2)
                      : plan.monthlyPrice.toFixed(2)}
                    <span className="text-sm font-normal">
                      /{isAnnual ? "year" : "month"}
                    </span>
                  </p>
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <Check className="w-5 h-5 text-success mr-2" />
                        <span>{feature}</span>
                      </li>
                    ))}
                    {plan.notIncluded.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center text-base-300"
                      >
                        <X className="w-5 h-5 mr-2" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="card-actions">
                    <button className="btn btn-primary btn-wide">
                      Choose Plan
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-base-200">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h3 className="card-title">Can I change my plan later?</h3>
                <p>
                  Yes, you can upgrade or downgrade your plan at any time.
                  Changes will be reflected in your next billing cycle.
                </p>
              </div>
            </div>
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h3 className="card-title">Is there a free trial?</h3>
                <p>
                  We offer a 14-day free trial for all plans. No credit card
                  required to start your trial.
                </p>
              </div>
            </div>
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h3 className="card-title">
                  What payment methods do you accept?
                </h3>
                <p>
                  We accept all major credit cards, PayPal, and bank transfers
                  for Enterprise plans.
                </p>
              </div>
            </div>
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h3 className="card-title">Do you offer refunds?</h3>
                <p>
                  We offer a 30-day money-back guarantee for all plans. If
                  you're not satisfied, contact our support team for a full
                  refund.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-content py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Your Journey with Motive?
          </h2>
          <p className="mb-8">
            Choose a plan that fits your needs and start planning your dream
            trips today.
          </p>
          <button className="btn btn-secondary btn-lg">Get Started Now</button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded">
        <div className="grid grid-flow-col gap-4">
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </div>
        <div>
          <div className="grid grid-flow-col gap-4">
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
              </svg>
            </a>
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
              </svg>
            </a>
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
              </svg>
            </a>
          </div>
        </div>
        <div>
          <p>Copyright © 2023 - All right reserved by Motive AI Ltd</p>
        </div>
      </footer>
    </div>
  );
}
