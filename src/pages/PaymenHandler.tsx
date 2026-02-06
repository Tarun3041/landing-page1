// import React, { useState } from "react";
// import { Card, Button, Checkbox, Divider, Radio, Typography } from "antd";

// const { Text } = Typography;

// interface PaymentMethod {
//   icon: any;
//   key: string;
//   label: string;
//   note?: string;
//   charges?: string;
//   option?: string;
//   type: "Online" | "Offline";
// }

// interface OnlineOptionPayload {
//   PaymentOption: any;
//   TotalPrice: any;
//   CurrencyType: any;
//   Method: any;
// }
// interface PaymentModes {
//   Online?: PaymentMethod[];
//   Offline?: PaymentMethod[];
// }
// interface PaymentHandlerProps {
//   onOnlinePay: () => void;
//   paymentModes: PaymentModes;
//   initialType?: keyof PaymentModes;
//   onOfflinePay: (mode?: any) => void;
//   onOnlineOptionClick: (payload: OnlineOptionPayload) => void;
//   packageDetails?: {
//     currencyType?: "USD" | "INR";
//     actualPrice?: number;
//     actualPriceINR?: number;
//   };

//   paymentCharges?: {
//     amount: number;
//     discountPriceINR: number;
//     transactionCharges: number;
//     transactionChargesPercentage: number;
//     totalAmount: number;
//     amountINR: number;
//     transactionChargesINR: number;
//     totalAmountINR: number;
//   } | null;
//   paymentLinkDetails?: any;
// }

// export const PaymentHandler: React.FC<PaymentHandlerProps> = ({
//   paymentModes,
//   initialType = "Online",
//   onOfflinePay,
//   onOnlinePay,
//   packageDetails,
//   paymentCharges,
//   paymentLinkDetails,
//   onOnlineOptionClick,
// }) => {
//   const [paymentType, setPaymentType] = useState(initialType);
//   const [termsCondition, setTermsConditions] = useState(false);
//   const [paymentMode, setPaymentMode] = useState<string | null>(null);

//   const handlePaymentOptionClick = (payment: OnlineOptionPayload) => {
//     setPaymentMode(payment?.Method?.key);
//     onOnlineOptionClick(payment);
//   };

//   React.useEffect(() => {
//     if (paymentLinkDetails && paymentMode && paymentType === "Online") {
//       const formId = paymentMode === "HDFC" ? "hdfcForm" : "paytmForm";
//       const form = document.getElementById(formId) as HTMLFormElement;
//       if (form) form.submit();
//     }
//   }, [paymentLinkDetails, paymentMode, paymentType]);

//   const handlePayNow = () => {
//     if (paymentType === "Offline") {
//       onOfflinePay({ paymentType: paymentType, paymentMode: paymentMode });
//     } else {
//       onOnlinePay();
//     }
//   };

//   const handlePaymentTypeChange = (e: any) => {
//     setPaymentType(e.target.value);
//     setPaymentMode(null);
//   };

//   return (
//     <Card
//       className="payment-card"
//       title={
//         <div>
//           <h3>Select Payment Method</h3>
//           <h4>All transactions are secure and encrypted.</h4>
//         </div>
//       }
//     >
//       <Radio.Group
//         className="heading"
//         onChange={handlePaymentTypeChange}
//         value={paymentType}
//       >
//         {Object.keys(paymentModes)?.map((key) => (
//           <Radio key={key} value={key}>
//             {key.charAt(0)?.toUpperCase() + key?.slice(1)} Payment
//           </Radio>
//         ))}
//       </Radio.Group>

//       {/* Payment Options */}
//       {paymentType && (
//         <div className="payment-options">
//           {paymentModes[paymentType as keyof PaymentModes]?.map((method) => (
//             <div
//               key={method.key}
//               className={`payment-option ${
//                 paymentMode === method.key ? "selected" : ""
//               }`}
//               onClick={() =>
//                 handlePaymentOptionClick({
//                   PaymentOption: method?.option,
//                   TotalPrice:
//                     packageDetails?.currencyType === "USD"
//                       ? packageDetails?.actualPrice
//                       : packageDetails?.actualPriceINR,
//                   CurrencyType: packageDetails?.currencyType,
//                   Method: method,
//                 })
//               }
//             >
//               <div className="payment-content">
//                 <span className="payment-name">
//                   <Radio
//                     checked={paymentMode === method.key}
//                     onClick={(e: any) => e.stopPropagation()}
//                     className="selected-icon"
//                     style={{ marginRight: "10px" }}
//                   />
//                   {method.label} {method?.charges && `(${method?.charges})`}
//                 </span>
//                 <img
//                   src={method.icon}
//                   alt={method.label}
//                   className="payment-icon"
//                 />
//               </div>
//               {method?.note && (
//                 <Text
//                   type="secondary"
//                   style={{ marginLeft: "1rem", color: "#f79123" }}
//                 >
//                   Note: {method?.note}
//                 </Text>
//               )}
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Order Summary */}
//       {paymentCharges !== null && (
//         <Card className="checkout-price-card">
//           <div className="summary-row">
//             <span className="summary-text">Amount</span>
//             <span className="summary-amount">
//               Rs {paymentCharges?.amountINR || packageDetails?.actualPriceINR}
//             </span>
//           </div>
//           {paymentCharges?.discountPriceINR && (
//             <div className="summary-row">
//               <span className="summary-text">Discount Amount</span>
//               <span className="summary-amount">
//                 Rs {paymentCharges?.discountPriceINR}
//               </span>
//             </div>
//           )}

//           <div className="summary-row">
//             <span className="summary-text">Tax Charges</span>
//             <span className="summary-amount">
//               Rs {paymentCharges?.transactionChargesINR || 0}
//             </span>
//           </div>

//           <div className="summary-row">
//             <span className="summary-text">Total Amount</span>
//             <span className="summary-amount">
//               Rs{" "}
//               {paymentCharges?.totalAmountINR || packageDetails?.actualPriceINR}
//             </span>
//           </div>

//           <Divider className="summary-divider" />

//           <div className="summary-row total">
//             <span className="summary-text">Total Payable</span>
//             <span className="summary-total-amount">
//               Rs{" "}
//               {paymentCharges?.totalAmountINR || packageDetails?.actualPriceINR}
//             </span>
//           </div>
//         </Card>
//       )}

//       {/* Terms and Conditions */}
//       <h4 style={{ padding: "0.5rem" }}>
//         <Checkbox
//           style={{ marginRight: "0.3rem" }}
//           onChange={(e: any) => setTermsConditions(e.target.checked)}
//         />
//         I agree and accept the above Chargeback and Refund policy mentioned
//         herewith.{" "}
//         <a target="_blank" href="https://www.anvayaa.com/">
//           (www.anvayaa.com)
//         </a>
//       </h4>

//       {/* Pay Button */}
//       {paymentType === "Offline" && (
//         <Button
//           type="primary"
//           size="large"
//           className="continue-btn"
//           onClick={handlePayNow}
//           disabled={!paymentMode || !termsCondition}
//         >
//           Make Offline Payment | ₹{" "}
//           {paymentCharges?.totalAmountINR || paymentCharges?.amountINR}
//         </Button>
//       )}

//       {paymentMode === "PMS" && (
//         <Button
//           type="primary"
//           size="large"
//           className="continue-btn"
//           onClick={() =>
//             onOfflinePay({ paymentType: paymentType, paymentMode: paymentMode })
//           }
//           disabled={!paymentMode || !termsCondition}
//         >
//           Pay Now | ₹{" "}
//           {paymentCharges?.totalAmountINR || paymentCharges?.amountINR}
//         </Button>
//       )}

//       {paymentLinkDetails &&
//         paymentMode?.toUpperCase() === "HDFC" &&
//         paymentType === "Online" && (
//           <form action="https://secure.payu.in/_payment" method="post">
//             <input
//               type="hidden"
//               name="firstname"
//               value={paymentLinkDetails?.firstname || ""}
//             />
//             <input
//               type="hidden"
//               name="surl"
//               value={paymentLinkDetails?.surl || ""}
//             />
//             <input
//               type="hidden"
//               name="phone"
//               value={paymentLinkDetails?.phone || ""}
//             />
//             <input
//               type="hidden"
//               name="key"
//               value={paymentLinkDetails?.key || ""}
//             />
//             <input
//               type="hidden"
//               name="hash"
//               value={paymentLinkDetails?.hash || ""}
//             />
//             <input
//               type="hidden"
//               name="curl"
//               value={paymentLinkDetails?.curl || ""}
//             />
//             <input
//               type="hidden"
//               name="furl"
//               value={paymentLinkDetails?.furl || ""}
//             />
//             <input
//               type="hidden"
//               name="txnid"
//               value={paymentLinkDetails?.txnid || ""}
//             />
//             <input
//               type="hidden"
//               name="productinfo"
//               value={paymentLinkDetails?.productinfo || ""}
//             />
//             <input
//               type="hidden"
//               name="amount"
//               value={paymentLinkDetails?.amount || ""}
//             />
//             <input
//               type="hidden"
//               name="email"
//               value={paymentLinkDetails?.email || ""}
//             />
//             <input
//               type="hidden"
//               name="udf1"
//               value={paymentLinkDetails?.udf1 || ""}
//             />
//             <Button
//               htmlType="submit"
//               type="primary"
//               size="large"
//               disabled={!termsCondition}
//               style={{ marginTop: "12px", width: "100%" }}
//             >
//               Pay Now | ₹
//               {paymentCharges?.totalAmountINR || packageDetails?.actualPriceINR}
//             </Button>
//           </form>
//         )}
//       {paymentLinkDetails &&
//         paymentMode?.toUpperCase() === "PAYTM" &&
//         paymentType === "Online" && (
//           <form
//             action="https://secure.paytm.in/oltp-web/processTransaction"
//             method="post"
//           >
//             <input
//               type="hidden"
//               name="Name"
//               value={paymentLinkDetails?.Name || ""}
//             />
//             <input
//               type="hidden"
//               name="MID"
//               value={paymentLinkDetails?.MID || ""}
//             />
//             <input
//               type="hidden"
//               name="CHANNEL_ID"
//               value={paymentLinkDetails?.CHANNEL_ID || ""}
//             />
//             <input
//               type="hidden"
//               name="CHECKSUMHASH"
//               value={paymentLinkDetails?.CHECKSUMHASH || ""}
//             />
//             <input
//               type="hidden"
//               name="CUST_ID"
//               value={paymentLinkDetails?.CUST_ID || ""}
//             />
//             <input
//               type="hidden"
//               name="EMAIL"
//               value={paymentLinkDetails?.EMAIL || ""}
//             />
//             <input
//               type="hidden"
//               name="INDUSTRY_TYPE_ID"
//               value={paymentLinkDetails?.INDUSTRY_TYPE_ID || ""}
//             />
//             <input
//               type="hidden"
//               name="CALLBACK_URL"
//               value={paymentLinkDetails?.CALLBACK_URL || ""}
//             />
//             <input
//               type="hidden"
//               name="MOBILE_NO"
//               value={paymentLinkDetails?.MOBILE_NO || ""}
//             />
//             <input
//               type="hidden"
//               name="ORDER_DETAILS"
//               value={paymentLinkDetails?.ORDER_DETAILS || ""}
//             />
//             <input
//               type="hidden"
//               name="ORDER_ID"
//               value={paymentLinkDetails?.ORDER_ID || ""}
//             />
//             <input
//               type="hidden"
//               name="REQUEST_TYPE"
//               value={paymentLinkDetails?.REQUEST_TYPE || ""}
//             />
//             <input
//               type="hidden"
//               name="TXN_AMOUNT"
//               value={paymentLinkDetails?.TXN_AMOUNT || ""}
//             />
//             <input
//               type="hidden"
//               name="WEBSITE"
//               value={paymentLinkDetails?.WEBSITE || ""}
//             />
//             <Button
//               htmlType="submit"
//               type="primary"
//               size="large"
//               disabled={!termsCondition}
//               style={{ marginTop: "12px", width: "100%" }}
//             >
//               Pay Now | ₹
//               {paymentCharges?.totalAmountINR || packageDetails?.actualPriceINR}
//             </Button>
//           </form>
//         )}

//       {paymentLinkDetails &&
//         paymentMode === "ICICI_CCAvenue" &&
//         paymentType === "Online" && (
//           <form
//             id="nonseamless"
//             method="post"
//             name="redirect"
//             action="https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction"
//           >
//             <input
//               type="hidden"
//               id="encRequest"
//               name="encRequest"
//               value={paymentLinkDetails?.encRequest || ""}
//             />
//             <input
//               type="hidden"
//               name="access_code"
//               id="access_code"
//               value={paymentLinkDetails?.accessCode || ""}
//             />
//             <Button
//               htmlType="submit"
//               type="primary"
//               size="large"
//               disabled={!termsCondition}
//               style={{ marginTop: "12px", width: "100%" }}
//             >
//               Pay Now | ₹
//               {paymentCharges?.totalAmountINR || packageDetails?.actualPriceINR}
//             </Button>
//           </form>
//         )}
//     </Card>
//   );
// };

import React, { useState } from "react";
import { Card, Button, Checkbox, Divider, Radio, Typography } from "antd";

const { Text } = Typography;

interface PaymentMethod {
  icon: React.ReactNode;
  key: string;
  label: string;
  note?: string;
  charges?: string;
  option?: string;
  type: "Online";
}

interface PaymentModes {
  Online: PaymentMethod[];
}

interface PaymentHandlerProps {
  paymentModes: PaymentModes;
  onOnlinePay: () => void;
  onOnlineOptionClick: (payload: any) => void;
  packageDetails?: any;
  paymentCharges?: any;
  paymentLinkDetails?: any;
}

export const PaymentHandler: React.FC<PaymentHandlerProps> = ({
  paymentModes,
  onOnlinePay,
  onOnlineOptionClick,
  packageDetails,
  paymentCharges,
  paymentLinkDetails,
}) => {
  const [paymentMode, setPaymentMode] = useState<string | null>(null);
  const [termsCondition, setTermsConditions] = useState(false);

  const handleOptionClick = (method: PaymentMethod) => {
    setPaymentMode(method.key);
    onOnlineOptionClick({
      Method: method,
      PaymentOption: method.option,
      TotalPrice: packageDetails?.actualPrice,
      CurrencyType: packageDetails?.currencyType,
    });
  };

  return (
    <Card title="Select Payment Method">
      <h4>Online Payment</h4>

      <div className="payment-options">
        {paymentModes.Online.map((method) => (
          <div
            key={method.key}
            className={`payment-option ${paymentMode === method.key ? "selected" : ""}`}
            onClick={() => handleOptionClick(method)}
          >
            <div className="payment-content">
              <div className="left">
                <Radio checked={paymentMode === method.key} />
                <div className="icon">{method.icon}</div>
                <div>
                  <div className="label">
                    {method.label} {method.charges && `(${method.charges})`}
                  </div>
                  {method.note && (
                    <Text type="secondary">Note: {method.note}</Text>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Divider />

      <Checkbox onChange={(e) => setTermsConditions(e.target.checked)}>
        I agree to the terms and conditions
      </Checkbox>

      <Button
        type="primary"
        size="large"
        block
        disabled={!paymentMode || !termsCondition}
        onClick={onOnlinePay}
        style={{ marginTop: 16 }}
      >
        Pay Now | ₹{" "}
        {packageDetails?.actualPrice}
      </Button>
    </Card>
  );
};
