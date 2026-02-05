import { useState, type ChangeEvent, type FormEventHandler } from "react";
import Loader from "./Loader";
import "../styles/registration.css";
import { encryptPassword, loginUserApi } from "../Service";
import { toast } from "react-toastify";

interface LoginData {
  email: string;
  password: string;
}

interface LoginProps {
  onClose?: () => void;
  onSuccess?: () => void;
  onSwitchToRegister?: () => void;
}

export default function Login({
  onClose,
  onSuccess,
  onSwitchToRegister,
}: LoginProps) {
  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<LoginData>>({});
  const [rememberMe, setRememberMe] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof LoginData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
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
    const newErrors: Partial<LoginData> = {};

    if (!loginData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!loginData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
  //   e.preventDefault();
  //   if (!validateForm()) {
  //     return;
  //   }
  //   setIsSubmitting(true);
  //   try {
  //     let loginDataPayload = {
  //       email: loginData.email,
  //       password: loginData.password,
  //     };
  //     loginUserApi(loginDataPayload).then((response: any) => {
  //       if (response.status === 200) {
  //         const { user, message } = response.data;
  //         toast.success(message);
  //         localStorage.setItem("isUserLoggedIn", "true");
  //         localStorage.setItem("user", JSON.stringify(user));
  //         if (onSuccess) {
  //           onSuccess();
  //         }
  //       } else {
  //         toast.error(response.response.data.message);
  //       }
  //     });
  //   } catch (error) {
  //     console.error("Login error:", error);
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setIsSubmitting(true);
    try {
      let encryptedPassword = encryptPassword(loginData.password);
      let loginDataPayload = {
        email: loginData.email,
        password: encryptedPassword,
      };
      // Type the response properly
      const response: any = await loginUserApi(loginDataPayload);

      if (response.status === 200) {
        const { user, message } = response.data;
        toast.success(message);
        localStorage.setItem("isUserLoggedIn", "true");
        localStorage.setItem("user", JSON.stringify(user));

        if (onSuccess) {
          onSuccess();
        }

        // Redirect using window.location
        window.location.href = "/";
      } else {
        // Handle non-200 responses
        toast.error(
          response.response?.data?.message ||
            response.message ||
            "Login failed",
        );
      }
    } catch (error: any) {
      console.error("Login error:", error);
      // Handle different error formats
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        error.data?.message ||
        "An error occurred during login";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgotPassword = () => {
    alert("Password reset link will be sent to your email.");
    // Implement forgot password logic here
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
          <h1 className="register-title">WELCOME BACK TO ANVAYAA</h1>
          <p className="register-subtitle">
            Your parent's care journey continues here.
          </p>
        </div>

        {/* Form Section */}
        <div className="register-form-section">
          <div className="form-header">
            <h2>Login to Your Account</h2>
            {/* <p className="login-subtitle">
              Enter your credentials to access your account
            </p> */}
          </div>

          <form className="register-form1" onSubmit={handleSubmit}>
            <div
              className="form-group"
              style={{ width: "50%", margin: "auto" }}
            >
              <label className="form-label">
                Email <span style={{ color: "#d32f2f" }}>*</span>
              </label>
              <input
                type="email"
                name="email"
                value={loginData.email}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter your email"
                autoComplete="email"
              />
              {errors.email && (
                <div className="error-message">{errors.email}</div>
              )}
            </div>
            <div
              className="form-group"
              style={{ width: "50%", margin: "auto", marginTop: "10px" }}
            >
              <label className="form-label">
                Password <span style={{ color: "#d32f2f" }}>*</span>
              </label>
              <div className="password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={loginData.password}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter your password"
                  autoComplete="current-password"
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
            {/* Remember Me & Forgot Password */}
            <div className="login-options">
              {/* <div className="remember-me">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label htmlFor="rememberMe">Remember me</label>
              </div> */}
              {/* <button
                type="button"
                className="forgot-password-btn"
                onClick={handleForgotPassword}
              >
                Forgot Password?
              </button> */}
            </div>
            {/* REGISTER LINK (FULL WIDTH) */}
            <div className="form-group-full register-link">
              New user?{" "}
              <button
                type="button"
                className="switch-to-register-btn"
                onClick={onSwitchToRegister}
              >
                Create an account
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
                    <span className="spinner"></span> Signing in...
                  </>
                ) : (
                  "Login to Account"
                )}
              </button>
            </div>

            {/* Social Login Options (Optional) */}
            {/* <div className="social-login-section">
              <div className="divider">
                <span>Or continue with</span>
              </div>
              <div className="social-buttons">
                <button type="button" className="social-btn google-btn">
                  <svg width="20" height="20" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Google
                </button>
              </div>
            </div> */}
          </form>
        </div>
      </div>
    </div>
  );
}
