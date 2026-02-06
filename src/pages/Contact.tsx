import { useState, type ChangeEvent, type FormEventHandler } from "react";
import "../styles/contact.css";
import { toast } from "react-toastify";
import { requestDemoApi } from "../Service";
import parsePhoneNumberFromString from "libphonenumber-js";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  countryCode: string;
  phone: string;
  message: string;
}
interface Country {
  code: string;
  flag: string;
  name: string;
  dialCode: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    countryCode: "+91",
    email: "",
    phone: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const countries: Country[] = [
    { code: "IND", flag: "IND", name: "India", dialCode: "+91" },
    { code: "USA", flag: "USA", name: "United States", dialCode: "+1" },
    // { code: "GB", flag: "🇬🇧", name: "United Kingdom", dialCode: "+44" },
    // { code: "CA", flag: "🇨🇦", name: "Canada", dialCode: "+1" },
    // { code: "AU", flag: "🇦🇺", name: "Australia", dialCode: "+61" },
    // { code: "DE", flag: "🇩🇪", name: "Germany", dialCode: "+49" },
    // { code: "FR", flag: "🇫🇷", name: "France", dialCode: "+33" },
    // { code: "JP", flag: "🇯🇵", name: "Japan", dialCode: "+81" },
  ];

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    if (name === "phone") {
      if (!/^\d*$/.test(value)) return;
    }
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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

    if (!formData.phone) {
         newErrors.phone = "Phone number is required";
       } else {
         const phoneNumber = parsePhoneNumberFromString(
           `${formData.countryCode}${formData.phone}`,
         );
         if (!phoneNumber || !phoneNumber.isValid()) {
           newErrors.phone = "Invalid phone number for selected country";
         }
        }

    if (!formData.message.trim()) {
      newErrors.message = "Last name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    let requestDemoData = {
      name: `${formData.firstName}${formData.lastName}`,
      email: formData.email,
      mobileNumber: formData.phone,
      message: formData.message,
    };
    try {
      requestDemoApi(requestDemoData).then((response: any) => {
        if (response.status === 200) {
          // toast.success(message);
          setIsSubmitted(true);
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            countryCode: "+91",
            phone: "",
            message: "",
          });
        } else {
          toast.error(response.response.data.message);
        }
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <div className="contact-page">
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
        style={{ height: "calc(100vh - 73px)", overflowY: "auto" }}
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
            {/* <div className="feature-item">
              <div className="feature-icon">💬</div>
              <div className="feature-content">
                <h3>Q&A Session</h3>
                <p>
                  Ask questions and get immediate answers from our care experts.
                </p>
              </div>
            </div> */}
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
          {/* ✅ ONLY CHANGE IS noValidate */}
          <form className="demo-form" onSubmit={handleSubmit} noValidate>
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
              <label className="form-label">
                Mobile Number <span style={{ color: "#d32f2f" }}>*</span>
              </label>

              <div className="phone-input-group">
                <select
                  name="countryCode"
                  value={formData.countryCode}
                  onChange={handleChange}
                  className="country-dropdown"
                >
                  {countries.map((c) => (
                    <option key={c.code} value={c.dialCode}>
                      {c.flag} {c.dialCode}
                    </option>
                  ))}
                </select>

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="form-input phone-input"
                  placeholder="Enter phone number"
                />
              </div>

              {errors.phone && (
                <div className="error-message">{errors.phone}</div>
              )}
            </div>
            <div className="form-group">
              <label className="form-label">
                Message <span className="required">*</span>
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="form-textarea"
                placeholder="Tell us about your specific needs or questions..."
              />
              {errors.message && (
                <span className="error-text">{errors.message}</span>
              )}
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
