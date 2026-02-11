// import React, { useState, useRef, useEffect } from "react";
// import "../Styles/otpinput.css"; // We'll create this CSS file

// interface OtpInputProps {
//   length?: number;
//   onChangeOtp: (otp: string) => void;
//   onClose?: () => void;
// }

// export default function OtpInput({
//   length = 6,
//   onChangeOtp,
//   onClose,
// }: OtpInputProps) {
//   const [otp, setOtp] = useState<string[]>(new Array(length).fill(""));
//   const [activeInput, setActiveInput] = useState<number>(0);
//   const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

//   // Focus the first input on mount
//   useEffect(() => {
//     if (inputRefs.current[0]) {
//       inputRefs.current[0]?.focus();
//     }
//   }, []);

//   // Handle OTP change
//   useEffect(() => {
//     const otpString = otp.join("");
//     onChangeOtp(otpString);

//     // Auto-submit when OTP is complete
//     if (
//       otpString.length === length &&
//       otpString.split("").every((digit) => digit !== "")
//     ) {
//       // You can trigger auto-verification here if needed
//     }
//   }, [otp, onChangeOtp, length]);

//   const handleChange = (index: number, value: string) => {
//     // Allow only digits
//     if (!/^\d*$/.test(value)) return;

//     const newOtp = [...otp];

//     // If pasted value has multiple digits
//     if (value.length > 1) {
//       const digits = value.split("").slice(0, length);
//       digits.forEach((digit, idx) => {
//         if (idx < length) {
//           newOtp[idx] = digit;
//         }
//       });
//       setOtp(newOtp);

//       // Focus the last filled input or last input
//       const lastFilledIndex = Math.min(digits.length - 1, length - 1);
//       setActiveInput(lastFilledIndex);
//       inputRefs.current[lastFilledIndex]?.focus();
//       return;
//     }

//     // Single digit input
//     newOtp[index] = value;
//     setOtp(newOtp);

//     // Move to next input if value is entered
//     if (value && index < length - 1) {
//       setActiveInput(index + 1);
//       inputRefs.current[index + 1]?.focus();
//     }
//   };

//   const handleKeyDown = (
//     index: number,
//     e: React.KeyboardEvent<HTMLInputElement>,
//   ) => {
//     // Handle backspace
//     if (e.key === "Backspace") {
//       e.preventDefault();

//       const newOtp = [...otp];

//       if (otp[index]) {
//         // If current input has value, clear it
//         newOtp[index] = "";
//       } else if (index > 0) {
//         // If current input is empty, move to previous and clear it
//         newOtp[index - 1] = "";
//         setActiveInput(index - 1);
//         inputRefs.current[index - 1]?.focus();
//       }

//       setOtp(newOtp);
//     }

//     // Handle arrow keys
//     else if (e.key === "ArrowLeft" && index > 0) {
//       setActiveInput(index - 1);
//       inputRefs.current[index - 1]?.focus();
//     } else if (e.key === "ArrowRight" && index < length - 1) {
//       setActiveInput(index + 1);
//       inputRefs.current[index + 1]?.focus();
//     }

//     // Handle paste
//     else if (e.key === "v" && (e.ctrlKey || e.metaKey)) {
//       // Handle paste in the handlePaste function
//     }
//   };

//   const handlePaste = (e: React.ClipboardEvent) => {
//     e.preventDefault();
//     const pastedData = e.clipboardData.getData("text/plain").trim();

//     if (/^\d+$/.test(pastedData)) {
//       const digits = pastedData.split("").slice(0, length);
//       const newOtp = [...otp];

//       digits.forEach((digit, idx) => {
//         if (idx < length) {
//           newOtp[idx] = digit;
//         }
//       });

//       setOtp(newOtp);

//       // Focus the last filled input
//       const lastFilledIndex = Math.min(digits.length - 1, length - 1);
//       setActiveInput(lastFilledIndex);
//       inputRefs.current[lastFilledIndex]?.focus();
//     }
//   };

//   const handleFocus = (index: number) => {
//     setActiveInput(index);
//     // Select the text in the input
//     inputRefs.current[index]?.select();
//   };

//   const handleClear = () => {
//     setOtp(new Array(length).fill(""));
//     setActiveInput(0);
//     inputRefs.current[0]?.focus();
//   };

//   const handleClose = () => {
//     if (onClose) {
//       onClose();
//     }
//   };

//   return (
//     <div className="otp-modal-overlay">
//       <div className="otp-modal">
//         {/* Close Button */}
//         <button className="otp-close-btn" onClick={handleClose}>
//           &times;
//         </button>

//         {/* Modal Header */}
//         <div className="otp-header">
//           <h2 className="otp-title">Email Verification</h2>
//           <p className="otp-subtitle">
//             Enter the 6-digit OTP sent to your email address
//           </p>
//         </div>

//         {/* OTP Inputs */}
//         <div className="otp-inputs-container">
//           {otp.map((digit, index) => (
//             <input
//               key={index}
//               ref={(el) => {
//                 if (el) inputRefs.current[index] = el;
//               }}
//               type="text"
//               inputMode="numeric"
//               pattern="\d*"
//               maxLength={1}
//               value={digit}
//               onChange={(e) => handleChange(index, e.target.value)}
//               onKeyDown={(e) => handleKeyDown(index, e)}
//               onFocus={() => handleFocus(index)}
//               onPaste={handlePaste}
//               className={`otp-input ${activeInput === index ? "active" : ""}`}
//               autoComplete="one-time-code"
//             />
//           ))}
//         </div>

//         {/* OTP Actions */}
//         <div className="otp-actions">
//           <button type="button" className="otp-clear-btn" onClick={handleClear}>
//             Clear OTP
//           </button>

//           {/* <button
//             type="button"
//             className="otp-resend-btn"
//             onClick={() => {
//               // Add resend OTP functionality here
//               console.log("Resend OTP clicked");
//             }}
//           >
//             Resend OTP
//           </button> */}
//         </div>

//         {/* Instructions */}
//         <div className="otp-instructions">
//           <p>🔢 Enter the 6-digit verification code</p>
//           <p>⚡ Auto-verifies when all digits are entered</p>
//           <p>📋 You can paste the entire OTP</p>
//         </div>

//         {/* Verification Status */}
//         {otp.join("").length === length && (
//           <div className="otp-status">
//             <div className="otp-progress">
//               <div
//                 className="otp-progress-fill"
//                 style={{ width: `${(otp.join("").length / length) * 100}%` }}
//               />
//             </div>
//             <p className="otp-status-text">
//               {otp.every((digit) => digit !== "")
//                 ? "✓ Complete - Verifying..."
//                 : `${otp.filter((digit) => digit !== "").length}/${length} digits entered`}
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import React, { useState, useRef, useEffect } from "react";
import "../Styles/otpinput.css";

interface OtpInputProps {
  length?: number;
  onChangeOtp: (otp: string) => void;
  onClose?: () => void;
}

export default function OtpInput({
  length = 6,
  onChangeOtp,
  onClose,
}: OtpInputProps) {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(""));
  const [activeInput, setActiveInput] = useState<number>(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Focus the first input on mount
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0]?.focus();
    }
  }, []);

  // Handle OTP change
  useEffect(() => {
    const otpString = otp.join("");
    onChangeOtp(otpString);
  }, [otp, onChangeOtp, length]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];

    if (value.length > 1) {
      const digits = value.split("").slice(0, length);
      digits.forEach((digit, idx) => {
        if (idx < length) {
          newOtp[idx] = digit;
        }
      });
      setOtp(newOtp);

      const lastFilledIndex = Math.min(digits.length - 1, length - 1);
      setActiveInput(lastFilledIndex);
      inputRefs.current[lastFilledIndex]?.focus();
      return;
    }

    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < length - 1) {
      setActiveInput(index + 1);
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const newOtp = [...otp];

      if (otp[index]) {
        newOtp[index] = "";
      } else if (index > 0) {
        newOtp[index - 1] = "";
        setActiveInput(index - 1);
        inputRefs.current[index - 1]?.focus();
      }

      setOtp(newOtp);
    } else if (e.key === "ArrowLeft" && index > 0) {
      setActiveInput(index - 1);
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < length - 1) {
      setActiveInput(index + 1);
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").trim();

    if (/^\d+$/.test(pastedData)) {
      const digits = pastedData.split("").slice(0, length);
      const newOtp = [...otp];

      digits.forEach((digit, idx) => {
        if (idx < length) {
          newOtp[idx] = digit;
        }
      });

      setOtp(newOtp);
      const lastFilledIndex = Math.min(digits.length - 1, length - 1);
      setActiveInput(lastFilledIndex);
      inputRefs.current[lastFilledIndex]?.focus();
    }
  };

  const handleFocus = (index: number) => {
    setActiveInput(index);
    inputRefs.current[index]?.select();
  };

  const handleClear = () => {
    setOtp(new Array(length).fill(""));
    setActiveInput(0);
    inputRefs.current[0]?.focus();
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="otp-modal-overlay">
      <div className="otp-modal">
        {/* Close Button */}
        <button className="otp-close-btn" onClick={handleClose}>
          &times;
        </button>

        {/* Modal Header */}
        <div className="otp-header">
          <h2 className="otp-title">Email Verification</h2>
          <p className="otp-subtitle">
            Enter the 6-digit OTP sent to your email address
          </p>
        </div>

        {/* OTP Inputs */}
        <div className="otp-inputs-container">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                if (el) inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              pattern="\d*"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onFocus={() => handleFocus(index)}
              onPaste={handlePaste}
              className={`otp-input ${activeInput === index ? "active" : ""}`}
              autoComplete="one-time-code"
            />
          ))}
        </div>

        {/* OTP Actions */}
        <div className="otp-actions">
          <button type="button" className="otp-clear-btn" onClick={handleClear}>
            Clear OTP
          </button>
        </div>

        {/* Instructions */}
        <div className="otp-instructions">
          <p>🔢 Enter the 6-digit verification code</p>
          <p>⚡ Auto-verifies when all digits are entered</p>
          <p>📋 You can paste the entire OTP</p>
        </div>

        {/* Verification Status */}
        {otp.join("").length === length && (
          <div className="otp-status">
            <div className="otp-progress">
              <div
                className="otp-progress-fill"
                style={{ width: `${(otp.join("").length / length) * 100}%` }}
              />
            </div>
            <p className="otp-status-text">
              {otp.every((digit) => digit !== "")
                ? "✓ Complete - Verifying..."
                : `${otp.filter((digit) => digit !== "").length}/${length} digits entered`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}