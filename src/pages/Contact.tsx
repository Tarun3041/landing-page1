import { useState, type ChangeEvent, type FormEventHandler } from "react";
import "../styles/contact.css";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (formData.phone && !/^[\d\s\-\+\(\)]+$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // In a real application, you would send the data to your backend here
      console.log("Form submitted:", formData);

      setIsSubmitted(true);
      // Reset form after successful submission
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error submitting your request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <div className="contact-page" >
        <div className="success-message">
          <div className="success-icon">🎉</div>
          <h3>Thank You!</h3>
          <p>
            Your demo request has been received. Our team will contact you
            within 24 hours.
          </p>
          <button className="reset-btn" onClick={resetForm}>
            Request Another Demo
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="contact-page">
      <div
        className="contact-container custom-scrollbar"
        style={{ height: "calc(100vh - 63px)", overflowY: "auto" }}
      >
        {/* Left Side - Information */}
        <div className="contact-info">
          <div className="contact-header">
            <h1>Request a Demo</h1>
            <p>
              See how our elder care solutions can transform the lives of your
              loved ones. Schedule a personalized demo today.
            </p>
          </div>

          <div className="contact-features">
            <div className="feature-item">
              <div className="feature-icon">🎯</div>
              <div className="feature-content">
                <h3>Personalized Demo</h3>
                <p>
                  Tailored to your specific needs and concerns about elder care.
                </p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon">⏱️</div>
              <div className="feature-content">
                <h3>30-Minute Session</h3>
                <p>
                  Get a comprehensive overview without taking too much of your
                  time.
                </p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon">💬</div>
              <div className="feature-content">
                <h3>Q&A Session</h3>
                <p>
                  Ask questions and get immediate answers from our care experts.
                </p>
              </div>
            </div>
          </div>

          <div className="contact-details">
            <div className="detail-item">
              <div className="detail-icon">📧</div>
              <span>support@eldercare.com</span>
            </div>
            <div className="detail-item">
              <div className="detail-icon">📱</div>
              <span>+1 (800) 123-4567</span>
            </div>
            <div className="detail-item">
              <div className="detail-icon">⏰</div>
              <span>Mon-Fri, 9AM-6PM EST</span>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="contact-form-section">
          <div className="form-header">
            <h2>Get Started Today</h2>
            <p>Fill out the form below and we'll get back to you promptly.</p>
          </div>

          <form className="demo-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">
                First Name <span className="required">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter your first name"
                required
              />
              {errors.firstName && (
                <span className="error-text">{errors.firstName}</span>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">
                Last Name <span className="required">*</span>
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter your last name"
                required
              />
              {errors.lastName && (
                <span className="error-text">{errors.lastName}</span>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">
                Work Email <span className="required">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter your work email"
                required
              />
              {errors.email && (
                <span className="error-text">{errors.email}</span>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Phone Number (Optional)</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter your phone number"
              />
              {errors.phone && (
                <span className="error-text">{errors.phone}</span>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Message (Optional)</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="form-textarea"
                placeholder="Tell us about your specific needs or questions..."
              />
            </div>

            <button
              type="submit"
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner"></span>
                  Submitting...
                </>
              ) : (
                <>
                  Submit Request
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </>
              )}
            </button>
          </form>

          <div className="form-footer">
            <p className="privacy-note">
              By submitting this form, you agree to our Privacy Policy and
              consent to being contacted by our team.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
