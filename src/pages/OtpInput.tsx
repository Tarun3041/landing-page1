import { useState, useRef } from "react";

interface OtpInputProps {
  length?: number;
  onChangeOtp: (otp: string) => void;
}

export default function OtpInput({ length = 6, onChangeOtp }: OtpInputProps) {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""));
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    onChangeOtp(newOtp.join(""));

    if (value && index < length - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: any, index: number) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        inputs.current[index - 1]?.focus();
      }
    }
  };

  return (
    <div className="flex gap-2 mt-2">
      {otp.map((digit, i) => (
        <input
          key={i}
          ref={(el) => {
            inputs.current[i] = el;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e: any) => handleChange(e.target.value, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          className="w-10 h-10 text-center border border-[#ccc] rounded-md font-['Lexend_Deca'] focus:outline-none focus:ring-1 focus:ring-[#01627d] focus:border-[#01627d]"
        />
      ))}
    </div>
  );
}
