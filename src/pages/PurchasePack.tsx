import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Card, Divider, Typography, Radio, Tag } from "antd";
import { PaymentHandler } from "./PaymenHandler";
import { packagePurchase } from "./Payment";
import {
  buyPlanOnline,
  createHdfcPlanPayment,
  createPaytmPlanPayment,
  createPlanPayment,
} from "../Service";
import "../Styles/purchasepack.css";

const { Text, Title } = Typography;

const PackagePurchase: React.FC = () => {
  const location = useLocation();
  const [paymentCharges, setPaymentCharges] = useState<any>();
  const [paymentLinkDetails, setPaymentLinkDetails] = useState<any>();
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  // ── Billing period selection ────────────────────────────────
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">(
    "monthly",
  );

  const isUserLoggedIn = localStorage.getItem("isUserLoggedIn") === "true";
  const user = isUserLoggedIn
    ? JSON.parse(localStorage.getItem("user") || "{}")
    : null;

  const params = new URLSearchParams(location.search);
  const userID = localStorage.getItem("userID") || params.get("userID");
  const plan = JSON.parse(localStorage.getItem("plan") || "{}");
  const service = JSON.parse(localStorage.getItem("service") || "{}");
  const isService = Boolean(service?.service);

  // ── Price logic ─────────────────────────────────────────────
  const monthlyPriceINR = service?.pricing || plan?.price || 100;
  const yearlyPriceINR = Math.round(monthlyPriceINR * 12);

  const selectedPriceINR =
    billingPeriod === "yearly" ? yearlyPriceINR : monthlyPriceINR;
  const selectedPeriodText = isService
    ? billingPeriod === "yearly"
      ? "12 per-year"
      : "per-service"
    : billingPeriod === "yearly"
      ? "yearly"
      : "monthly";

  const handleOfflinePayment = async () => {
    // Your offline logic here (unchanged)
  };

  const handlePaymentOptionClick = async ({ Method }: { Method: any }) => {
    setSelectedMethod(Method.key);

    if (
      Method.key === "ICICI_CCAvenue" ||
      Method?.key === "Paytm" ||
      Method?.key === "HDFC"
    ) {
      try {
        const payload = {
          planId: "AKCSPD44",
          planName: "ANVAYYA GOLD",
          paymentStatus: "NotApproved",
          price: selectedPriceINR.toString(),
          GSTDetails: { CGST: 9, SGST: 9, IGST: 0 },
          planAliasName: "Gold Plan",
          packageNature: "Plan",
          purchaseType: "New",
          packageCreatedDate: "2026-02-28",
          packageExpiryDate: "2026-02-06",
          planActualAmount: (selectedPriceINR * 0.9).toFixed(2),
          deviceCount: "0",
          CurrencyType: "INR",
          transactionType: "Credit",
          dollarValue: (selectedPriceINR / 1.14).toFixed(2),
          paymentMode: Method.key,
          paymentType: "Online",
          note: "test",
          paymentGatewayChargesPercentage: "20",
          paymentGatewayTransactionCharges: "30",
          paymentGatewayTransactionChargesINR: "10",
          revenueType: "Differed",
          totalPrice: selectedPriceINR.toString(),
          totalPriceINR: selectedPriceINR.toString(),
          international: "false",
          serviceAreaName: "Hyderabad",
          serviceAreaID: "HYD",
          userID: userID,
          userName: user.name,
        };

        const res: any = await buyPlanOnline(payload);
        if (res?.status === 200) {
          let linkdetails: any;
          const basePayload = {
            TotalPrice: selectedPriceINR,
            PaymentID: "ASDFGHJKL1234567890",
          };

          if (Method?.key === "HDFC") {
            const hdfcPayload = {
              Name: user.name,
              EmailID: user.emailID,
              MobileNumber: user.mobileNumber,
              PackageName: "ANVAYYA GOLD",
              TotalPrice: basePayload.TotalPrice,
              PaymentID: basePayload.PaymentID,
              userID: user.userId,
            };
            linkdetails = await createHdfcPlanPayment(hdfcPayload);
          } else if (Method?.key === "Paytm") {
            const paytmPayload = {
              Name: user.name,
              EmailID: user.emailID,
              MobileNumber: user.mobileNumber,
              PackageName: "ANVAYYA GOLD",
              TotalPrice: basePayload.TotalPrice,
              PaymentID: basePayload.PaymentID,
              userID: user.userId,
              Channel: "WEB",
            };
            linkdetails = await createPaytmPlanPayment(paytmPayload);
          } else {
            linkdetails = await createPlanPayment(basePayload);
          }

          if (linkdetails?.status === 200) {
            setPaymentLinkDetails(linkdetails?.data?.data);
          }
        }
      } catch (error: any) {
        console.error("Payment initiation failed:", error);
      }
    }
  };

  const redirectToPayment = () => {
    if (!paymentLinkDetails?.hdfcpaymenturl) return;

    const form = document.createElement("form");
    form.method = "POST";
    form.action = paymentLinkDetails.hdfcpaymenturl;

    Object.entries(paymentLinkDetails).forEach(([key, value]) => {
      if (key !== "hdfcpaymenturl") {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = String(value);
        form.appendChild(input);
      }
    });

    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
  };

  // Chip colors for different service details
  const chipColors: Record<string, string> = {
    category: "blue",
    occurrence: "green",
    serviceCode: "purple",
    service: "orange",
    plan: "magenta",
  };

  return (
    <div className="purchase-page custom-scrollbar">
      <div className="purchase-layout">
        <Card className="plan-summary-card">
          <div className="summary-header">
            <h2 className="plan-name-title">
              {service?.service
                ? service.service
                : `${plan?.title || "Plan"} ${
                    plan?.badge ? `- ${plan.badge}` : ""
                  }`}
            </h2>
          </div>

          <div className="plan-info-block">
            {plan?.description && (
              <Text className="plan-desc">{plan.description}</Text>
            )}

            {/* Plan Highlights as Chips */}
            {Array.isArray(plan?.highlights) && plan.highlights.length > 0 && (
              <div className="chips-container">
                {plan.highlights.map(
                  (item: { icon: string; text: string }, idx: number) => (
                    <Tag
                      key={idx}
                      className="service-chip highlight-chip"
                      icon={<span className="chip-icon">{item.icon}</span>}
                    >
                      {item.text}
                    </Tag>
                  ),
                )}
              </div>
            )}
          </div>

          {service?.service && (
            <div className="service-info-block">
              <h3 className="block-title">Included Service</h3>

              <div className="service-name">{service.service}</div>
              <div className="service-desc">{service.description}</div>

              {/* Service Details as Chips */}
              <div className="chips-container">
                {service.category && (
                  <Tag className="service-chip" color={chipColors.category}>
                    <span className="chip-label">Category:</span>
                    <span className="chip-value">{service.category}</span>
                  </Tag>
                )}
                {service.occurance && (
                  <Tag className="service-chip" color={chipColors.occurrence}>
                    <span className="chip-label">Occurrence:</span>
                    <span className="chip-value">{service.occurance}</span>
                  </Tag>
                )}
                {service.serviceCode && (
                  <Tag className="service-chip" color={chipColors.serviceCode}>
                    <span className="chip-label">Service Code:</span>
                    <span className="chip-value">{service.serviceCode}</span>
                  </Tag>
                )}
                {service.service && (
                  <Tag className="service-chip" color={chipColors.service}>
                    <span className="chip-label">Type:</span>
                    <span className="chip-value">Service</span>
                  </Tag>
                )}
              </div>
            </div>
          )}

          {/* Plan Details as Chips (if no service) */}
          {!service?.service && plan && (
            <div className="service-info-block">
              <h3 className="block-title">Plan Details</h3>
              <div className="chips-container">
                {plan.category && (
                  <Tag className="service-chip" color={chipColors.category}>
                    <span className="chip-label">Category:</span>
                    <span className="chip-value">{plan.category}</span>
                  </Tag>
                )}
                {plan.occurance && (
                  <Tag className="service-chip" color={chipColors.occurrence}>
                    <span className="chip-label">Occurrence:</span>
                    <span className="chip-value">{plan.occurance}</span>
                  </Tag>
                )}
                {plan.planCode && (
                  <Tag className="service-chip" color={chipColors.serviceCode}>
                    <span className="chip-label">Plan Code:</span>
                    <span className="chip-value">{plan.planCode}</span>
                  </Tag>
                )}
                <Tag className="service-chip" color={chipColors.plan}>
                  <span className="chip-label">Type:</span>
                  <span className="chip-value">Plan</span>
                </Tag>
              </div>
            </div>
          )}

          <div className="order-summary-compact">
            <Title level={5} className="mini-title">
              Order Summary
            </Title>

            {/* Billing period selector */}
            <div className="billing-period-selector">
              <Radio.Group
                value={billingPeriod}
                onChange={(e) => setBillingPeriod(e.target.value)}
                buttonStyle="solid"
                className="billing-radio-group"
              >
                <Radio.Button value="monthly">Monthly</Radio.Button>
                <Radio.Button value="yearly">Yearly</Radio.Button>
              </Radio.Group>
            </div>

            <div className="price-display">
              {(plan?.currencyType === "USD" ||
                service?.currencyType === "USD") && (
                <div className="price-box">
                  <span className="currency">USD</span>
                  <span className="amount">
                    ${plan?.price || plan?.price || "0"}
                  </span>
                  <span className="period">
                    /{plan?.occurance || service?.occurance || "year"}
                  </span>
                </div>
              )}

              <div className="price-box">
                <span className="currency">INR</span>
                <span
                  className="amount"
                  style={{
                    fontSize: "2.2rem",
                    fontWeight: "bold",
                    color: "#1890ff",
                  }}
                >
                  {selectedPriceINR}
                </span>
                <span className="period">/{selectedPeriodText}</span>
              </div>
            </div>

            <div className="policy-note small-text">
              The above Price is inclusive of All Taxes.
            </div>

            <div className="note-box small-text">
              <strong>Note:</strong> While using international credit/debit
              cards your issuing bank may charge you conversion fee
              additionally.
            </div>

            <div className="refund-policy small-text">
              <strong>Chargeback & Refund Policy:</strong>
              <br />
              Chargeback is not acceptable once a transaction is processed as
              the service starts immediately upon payment. Any refund requests
              will be processed by Anvayaa Kin Care Private Limited as per the
              Company's Refund policy mentioned in the{" "}
              <a
                href="https://anvayaa.com/terms-and-conditions"
                target="_blank"
                rel="noopener noreferrer"
              >
                Terms & Conditions
              </a>
              .
            </div>
          </div>
        </Card>

        <div className="payment-section">
          <PaymentHandler
            paymentModes={packagePurchase}
            onOnlinePay={redirectToPayment}
            onOnlineOptionClick={handlePaymentOptionClick}
            paymentLinkDetails={paymentLinkDetails}
            paymentCharges={paymentCharges}
            packageDetails={{
              currencyType:
                service?.currencyType || plan?.currencyType || "INR",
              actualPrice: selectedPriceINR.toString(),
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PackagePurchase;
