import React, { useState, useEffect } from "react";
import "./App.css";
import logo from "/bgr.png"; // ✅ using image from public folder

function App() {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    restaurant: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false); // for animation

  useEffect(() => {
    // show logo for 2 seconds before form appears
    const timer = setTimeout(() => setShowForm(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "mobile") {
      const numericValue = value.replace(/\D/g, "");
      if (numericValue.length <= 10) {
        setFormData((prev) => ({ ...prev, [name]: numericValue }));
      }
      return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.mobile.length !== 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    setError("");

    const scriptURL =
      "https://script.google.com/macros/s/AKfycbwzRZ-onvyso-aMwez99Wr9u3tNaf1i1laM8zDqJw0Plqv2T34iJhkVlZd6p-6T5svLZw/exec";

    try {
      await fetch(scriptURL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      setSubmitted(true);
      console.log("Data sent to Google Sheets:", formData);
    } catch (error) {
      console.error("Error submitting form!", error);
      alert("There was an issue submitting your demo request.");
    }
  };

  if (!showForm) {
    return (
      <div className="loading-screen">
        <img src={logo} alt="Smart Dine 360° Logo" className="loading-logo" />
      </div>
    );
  }

  return (
    <div className="container">
      <div className="form-box fade-in">
        <img src={logo} alt="Smart Dine 360° Logo" className="logo" />
        <h1 className="title">🍽️ Smart Dine 360°</h1>
        <h2 className="subtitle">Book Your Free Demo Today!</h2>

        {!submitted ? (
          <form className="demo-form" onSubmit={handleSubmit}>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
            />

            <label>Mobile Number</label>
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              required
              placeholder="Enter your 10-digit mobile number"
              maxLength="10"
            />
            {error && <p className="error">{error}</p>}

            <label>Restaurant Name</label>
            <input
              type="text"
              name="restaurant"
              value={formData.restaurant}
              onChange={handleChange}
              required
              placeholder="Enter restaurant name"
            />

            <button type="submit" className="submit-btn">
              🚀 Book Demo for Free
            </button>
          </form>
        ) : (
          <div className="thank-you">
            <h3>✅ Thank you for booking a demo!</h3>
            <p>Our team will contact you within 24 hours.</p>
          </div>
        )}

        <div className="contact-info">
          <p className="whatsapp-links">
            📞{" "}
            <a
              href="https://wa.me/919182059570"
              target="_blank"
              rel="noreferrer"
            >
              +91 9182059570
            </a>{" "}
            |{" "}
            <a
              href="https://wa.me/918497976017"
              target="_blank"
              rel="noreferrer"
            >
              +91 8497976017
            </a>{" "}
            |{" "}
            <a
              href="https://wa.me/918985700781"
              target="_blank"
              rel="noreferrer"
            >
              +91 8985700781
            </a>
          </p>
          <p>
            📧{" "}
            <a
              href="mailto:contact@pandjtechnologies.com"
              target="_blank"
              rel="noreferrer"
            >
              contact@pandjtechnologies.com
            </a>
          </p>
              <p>
            🌐{" "}
            <a 
  href="https://www.pandjtechnologies.com" 
  target="_blank" 
  rel="noreferrer"
>
  www.pandjtechnologies.com
</a>

          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
