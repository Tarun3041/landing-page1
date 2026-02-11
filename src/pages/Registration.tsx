import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEventHandler,
} from "react";
import "../styles/registration.css";
import parsePhoneNumberFromString from "libphonenumber-js";
import {
  encryptPassword,
  registerUserApi,
  registerUserInAnvayaaApi,
  verifyUserByEmailApi,
} from "../Service";
import OtpInput from "./OtpInput";
import { toast } from "react-toastify";
import Loader from "./Loader";

interface FormData {
  firstName: string;
  lastName: string;
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
    firstName: "",
    lastName: "",
    email: "",
    countryCode: "+91",
    phone: "",
    password: "",
    confirmPassword: "",
    selectedPlan,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const [otpModal, setOtpModal] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    text: "Very weak",
    color: "#ff4757",
  });
  const [otp, setOtp] = useState("");
  const isVerifyingRef = useRef(false);

  useEffect(() => {
    if (otp.length === 6) {
      let verifyEmailData = {
        email: formData.email,
        otp: otp,
      };
      verifyUserByEmailApi(verifyEmailData).then((response: any) => {
        if (response.status === 200) {
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            countryCode: "+91",
            phone: "",
            password: "",
            confirmPassword: "",
            selectedPlan,
          });
          // toast.success(response.data.message);
          let anvayyaUserPayload = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            countryCode: formData.countryCode,
            mobileNumber: formData.phone,
            emailID: formData.email,
            password: formData.password,
            userType: "user",
          };
          registerUserInAnvayaaApi(anvayyaUserPayload).then((res: any) => {
            if (res.status != 200) {
              toast.error(res.response.data.message);
            } else {
              toast.success("Registered Succesfully");
              if (onSwitchToLogin) {
                onSwitchToLogin();
              }
            }
          });
        } else {
          toast.error(response.response.data.message);
        }
      });
    }
  }, [otp]);

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
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
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
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First Name is required";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last Name is required";
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
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        "Password must be at least 8 characters and contain one uppercase, one lowercase, one number, and one special character";
    } else if (passwordStrength?.score < 3) {
      newErrors.password = "Password is too weak";
    }
    // Confirm password validation
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
    if (!validateForm()) return;
    try {
      setIsSubmitting(true);
      let encryptedPassword = encryptPassword(formData.password);
      let registrationData = {
        name: `${formData.firstName} ${formData.lastName}`,
        mobileNumber: `${formData.countryCode}${formData.phone}`,
        email: formData.email,
        password: encryptedPassword,
      };
      const response = (await registerUserApi(registrationData)) as {
        status: number;
        data: { message: string };
        response?: { data?: { message?: string } };
      };
      if (response.status === 200) {
        setShowOtpModal(true);
        toast.success(response.data.message);
      } else {
        toast.error(response.response?.data?.message || "Registration failed");
      }
    } catch (error) {
      setIsSubmitting(false);
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
    <>
      <Loader
        show={isSubmitting}
        type="pulse"
        timeout={5000} // Auto-close after 5 seconds
        // onClose={() => setLoading(false)}
      />

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
              <div className="form-group">
                <label className="form-label">
                  First Name <span style={{ color: "#d32f2f" }}>*</span>
                </label>
                <input
                  type="text"
                  name="firstName" // ✅ FIXED
                  value={formData.firstName}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter first name"
                />
                {errors.firstName && (
                  <div className="error-message">{errors.firstName}</div>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">
                  Last Name <span style={{ color: "#d32f2f" }}>*</span>
                </label>
                <input
                  type="text"
                  name="lastName" // ✅ FIXED
                  value={formData.lastName}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter last name"
                />
                {errors.lastName && (
                  <div className="error-message">{errors.lastName}</div>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">
                  Email <span style={{ color: "#d32f2f" }}>*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <div className="error-message">{errors.email}</div>
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
                  Password <span style={{ color: "#d32f2f" }}>*</span>
                </label>
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
                  <div className="error-message">{errors.password}</div>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">
                  Confirm Password <span style={{ color: "#d32f2f" }}>*</span>
                </label>
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
                  <div className="error-message">{errors.confirmPassword}</div>
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
                    <>Register</>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
        {showOtpModal && (
          <OtpInput
            length={6}
            onChangeOtp={(val) => {
              setOtp(val);
            }}
            onClose={() => setShowOtpModal(false)}
          />
        )}
      </div>
    </>
  );
}
