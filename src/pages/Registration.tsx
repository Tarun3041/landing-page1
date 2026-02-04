import { useState, type ChangeEvent, type FormEventHandler } from "react";
import "../styles/registration.css";

interface FormData {
  name: string;
  email: string;
  countryCode: string;
  phone: string;
  password: string;
  confirmPassword: string;
  selectedPlan?: string;
}

interface Country {
  code: string;
  flag: string;
  name: string;
  dialCode: string;
}

interface RegisterProps {
  onClose?: () => void;
  onComplete?: () => void;
  selectedPlan?: string;
  onSwitchToLogin?: () => void;
}

export default function Register({
  onClose,
  onComplete,
  selectedPlan = "",
  onSwitchToLogin,
}: RegisterProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    countryCode: "+1",
    phone: "",
    password: "",
    confirmPassword: "",
    selectedPlan,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    text: "Very weak",
    color: "#ff4757",
  });

  const countries: Country[] = [
    { code: "US", flag: "🇺🇸", name: "United States", dialCode: "+1" },
    { code: "IN", flag: "🇮🇳", name: "India", dialCode: "+91" },
    { code: "GB", flag: "🇬🇧", name: "United Kingdom", dialCode: "+44" },
    { code: "CA", flag: "🇨🇦", name: "Canada", dialCode: "+1" },
    { code: "AU", flag: "🇦🇺", name: "Australia", dialCode: "+61" },
    { code: "DE", flag: "🇩🇪", name: "Germany", dialCode: "+49" },
    { code: "FR", flag: "🇫🇷", name: "France", dialCode: "+33" },
    { code: "JP", flag: "🇯🇵", name: "Japan", dialCode: "+81" },
  ];

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
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

    // Password strength calculation
    if (name === "password") {
      calculatePasswordStrength(value);
    }
  };

  const calculatePasswordStrength = (password: string) => {
    let score = 0;

    // Length check
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;

    // Character variety checks
    if (/[a-z]/.test(password)) score += 1; // lowercase
    if (/[A-Z]/.test(password)) score += 1; // uppercase
    if (/[0-9]/.test(password)) score += 1; // numbers
    if (/[^A-Za-z0-9]/.test(password)) score += 1; // special chars

    let text = "Very weak";
    let color = "#ff4757";

    if (score >= 5) {
      text = "Strong";
      color = "#00b894";
    } else if (score >= 3) {
      text = "Moderate";
      color = "#fdcb6e";
    } else if (score >= 1) {
      text = "Weak";
      color = "#fd9644";
    }

    setPasswordStrength({ score, text, color });
  };

  const EyeOpen = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );

  const EyeOff = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-10-8-10-8a21.73 21.73 0 0 1 5.06-6.94" />
      <path d="M1 1l22 22" />
      <path d="M9.9 4.24A9.77 9.77 0 0 1 12 4c7 0 10 8 10 8a21.28 21.28 0 0 1-2.88 4.94" />
    </svg>
  );

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[\d\s\-\(\)]+$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (passwordStrength.score < 3) {
      newErrors.password = "Password is too weak";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
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

      console.log("Registration data:", {
        ...formData,
        phone: `${formData.countryCode}${formData.phone}`,
        selectedPlan: selectedPlan || "Not specified",
      });

      setIsRegistered(true);

      // Call onComplete callback if provided
      if (onComplete) {
        setTimeout(() => {
          onComplete();
        }, 2000);
      }

      // Reset form after successful registration
      setFormData({
        name: "",
        email: "",
        countryCode: "+1",
        phone: "",
        password: "",
        confirmPassword: "",
        selectedPlan,
      });
    } catch (error) {
      console.error("Registration error:", error);
      alert("There was an error during registration. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

 const handleLoginRedirect = () => {
   if (onSwitchToLogin) {
     onSwitchToLogin(); // Use callback if provided
   } else {
     window.location.href = "/login"; // Fallback
   }
 };

  return (
    <div className="register-page">
      <div className="register-container">
        {/* Close button for overlay */}
        {onClose && (
          <button
            className="close-overlay-btn"
            onClick={onClose}
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              background: "rgba(255, 255, 255, 0.1)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              color: "white",
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              zIndex: 100,
              fontSize: "1.2rem",
              backdropFilter: "blur(10px)",
            }}
          >
            ×
          </button>
        )}

        {/* Header Section */}
        <div className="register-header">
          <h1 className="register-title">WELCOME TO ANVAYAA PORTAL</h1>
          {/* <p className="register-subtitle">
            One stop parent care solution, for your peace of mind.
          </p> */}
          {selectedPlan && (
            <div className="selected-plan-badge">
              Selected Plan: <strong>{selectedPlan}</strong>
            </div>
          )}
        </div>

        {/* Form Section */}
        <div className="register-form-section">
          <div className="form-header">
            <h2>Register {selectedPlan && `for ${selectedPlan}`}</h2>
            {/* {selectedPlan && (
              <p className="plan-selection-note">
                You're registering for the <strong>{selectedPlan}</strong> plan
              </p>
            )} */}
          </div>

          <form className="register-form" onSubmit={handleSubmit}>
            <input type="hidden" name="selectedPlan" value={selectedPlan} />
            <div className="form-group1">
              <label className="form-label">
                Your Name <span style={{ color: "#d32f2f" }}>*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter your full name"
              />
              {errors.name && (
                <div className="error-message">⚠️ {errors.name}</div>
              )}
            </div>
            <div className="form-group">
              <label className="form-label">Email Id</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter your email"
              />
              {errors.email && (
                <div className="error-message">⚠️ {errors.email}</div>
              )}
            </div>

            <div className="form-group ">
              <label className="form-label">Mobile Number</label>

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
                  className="form-input"
                  placeholder="Enter phone number"
                />
              </div>

              {errors.phone && (
                <div className="error-message">⚠️ {errors.phone}</div>
              )}
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Create password"
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff /> : <EyeOpen />}
                </button>
              </div>
              {errors.password && (
                <div className="error-message">⚠️ {errors.password}</div>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Re-type Password</label>
              <div className="password-wrapper">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Confirm password"
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff /> : <EyeOpen />}
                </button>
              </div>
              {errors.confirmPassword && (
                <div className="error-message">⚠️ {errors.confirmPassword}</div>
              )}
            </div>

            <div className="form-group-full login-link">
              Already user?{" "}
              <button
                type="button"
                className="switch-to-login-btn"
                onClick={handleLoginRedirect}
              >
                Login
              </button>
            </div>

            {/* SUBMIT BUTTON (FULL WIDTH) */}
            <div className="form-group-full">
              <button
                className="submit-btn"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner"></span> Creating Account…
                  </>
                ) : (
                  <>Register for {selectedPlan}</>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
