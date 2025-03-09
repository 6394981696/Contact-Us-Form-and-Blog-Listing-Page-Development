import React, { useState } from "react";
import "../styles/ContactUs.css";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        setSuccessMessage("✅ Your message has been sent successfully!");
        setFormData({ name: "", email: "", subject: "", message: "", phone: "" });
      } else {
        setErrorMessage("❌ Failed to send message. Please try again!");
      }
    } catch (error) {
      setErrorMessage("❌ Error: Unable to send message. Check your connection.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-form">
      <h2>Contact Us</h2>
      {successMessage && <p className="success">{successMessage}</p>}
      {errorMessage && <p className="error">{errorMessage}</p>}
      
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Your Email"
          required
        />
        <select name="subject" value={formData.subject} onChange={handleChange} required>
          <option value="">Select Subject</option>
          <option value="coach">Coach</option>
          <option value="institute">Institute/Organisation</option>
          <option value="trainee">Trainee/Coach</option>
        </select>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Your Message"
          required
        ></textarea>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone (Optional)"
        />

        <button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default ContactUs;
