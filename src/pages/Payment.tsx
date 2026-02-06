import React from "react";

/* ================= ICONS ================= */

export const CardIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
    <rect
      x="2"
      y="5"
      width="20"
      height="14"
      rx="2"
      stroke="currentColor"
      strokeWidth="2"
    />
    <rect x="2" y="9" width="20" height="3" fill="currentColor" />
  </svg>
);

export const BankIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
    <path
      d="M3 10h18M5 10v8m4-8v8m4-8v8m4-8v8M2 18h20M12 3l9 5H3l9-5z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* ================= TYPES ================= */

export interface PaymentOptions {
  icon: React.ReactNode;
  key: string;
  label: string;
  note?: string;
  charges?: string;
  option?: string;
  type: "Online";
}

export interface PaymentModes {
  Online: PaymentOptions[];
}

/* ================= PAYMENT DATA ================= */

export const packagePurchase: PaymentModes = {
  Online: [
    {
      key: "ICICI_CCAvenue",
      label: "Credit / Debit / Netbanking",
      icon: <CardIcon />,
      option: "ICICI_CCAvenue",
      type: "Online",
      note: "International Cards Accepted",
      charges: "~ 1.8% Transaction Charges",
    },
    {
      key: "HDFC",
      label: "PayU Biz",
      icon: <BankIcon />,
      option: "HDFC",
      type: "Online",
      note: "Currently Accepting MasterCards",
      charges: "2.9% Transaction Charges",
    },
  ],
};
