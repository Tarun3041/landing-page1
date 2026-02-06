import React, { useState } from "react";
import { useLocation } from "react-router"; // removed useNavigate since not used
import { Card, Divider, Typography } from "antd";
import { PaymentHandler } from "./PaymenHandler";
import { packagePurchase } from "./Payment";
import {
  buyPlanOnline,
  createHdfcPlanPayment,
  createPaytmPlanPayment,
  createPlanPayment,
} from "../Service";

const { Text, Title } = Typography;

const PackagePurchase: React.FC = () => {
  const location = useLocation();
  const [paymentCharges, setPaymentCharges] = useState<any>();
  const [paymentLinkDetails, setPaymentLinkDetails] = useState<any>();
  const [selectedMethod, setSelectedMethod] = useState<string | null>("");

  const isUserLoggedIn = localStorage.getItem("isUserLoggedIn") === "true";
  const user = isUserLoggedIn
    ? JSON.parse(localStorage.getItem("user") || "{}")
    : null;

  const params = new URLSearchParams(location.search);
  const userID: any = localStorage.getItem("userID") || params.get("userID");
  const plan = JSON.parse(localStorage.getItem("plan") || "{}");
  const service = JSON.parse(localStorage.getItem("service") || "{}");

  const handleOfflinePayment = async () => {};

  const handlePaymentOptionClick = async ({ Method }: { Method: any }) => {
    setSelectedMethod(Method.key);
    if (
      Method.key === "ICICI_CCAvenue" ||
      Method?.key === "Paytm" ||
      Method?.key === "HDFC"
    ) {
      try {
        const planData = {
          userID: user.userId,
          paymentType: "Online",
          paymentMode: Method.key,
          price: "100",
          CurrencyType: "INR",
        };
        const charges = "200";
        const payload = {
          planId: "AKCSPD44",
          planName: "ANVAYYA GOLD",
          paymentStatus: "NotApproved",
          price: "100",
          GSTDetails: { CGST: 9, SGST: 9, IGST: 0 },
          planAliasName: "Gold Plan",
          packageNature: "Plan",
          purchaseType: "New",
          packageCreatedDate: "2026-02-28",
          packageExpiryDate: "2026-02-06",
          planActualAmount: "90",
          deviceCount: "0",
          CurrencyType: "INR",
          transactionType: "Credit",
          dollarValue: "87.54",
          paymentMode: Method.key,
          paymentType: "Online",
          note: "test",
          paymentGatewayChargesPercentage: "20",
          paymentGatewayTransactionCharges: "30",
          paymentGatewayTransactionChargesINR: "10",
          revenueType: "Differed",
          totalPrice: "100",
          totalPriceINR: "100",
          international: "false",
          serviceAreaName: "Hyderabad",
          serviceAreaID: "HYD",
          userID: userID,
          userName: user.name,
        };

        const res: any = await buyPlanOnline(payload);
        if (res?.status === 200) {
          const details = res?.data?.data;
          let linkdetails: any;
          const basePayload = {
            TotalPrice: 100,
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
            const payload = {
              Name: user.name,
              EmailID: user.emailID,
              MobileNumber: user.mobileNumber,
              PackageName: "ANVAYYA GOLD",
              TotalPrice: basePayload.TotalPrice,
              PaymentID: basePayload.PaymentID,
              userID: user.userId,
              Channel: "WEB",
            };
            linkdetails = await createPaytmPlanPayment(payload);
          } else {
            linkdetails = await createPlanPayment(basePayload);
          }

          if (linkdetails?.status === 200) {
            setPaymentLinkDetails(linkdetails?.data?.data);
          }
        }
      } catch (error: any) {}
    }
  };

  const redirectToPayment = () => {
    const form = document.createElement("form");
    form.method = "POST";
    form.action = paymentLinkDetails?.hdfcpaymenturl;
    Object.entries(paymentLinkDetails).forEach(([key, value]) => {
      if (key !== "hdfcpaymenturl") {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = value as string;
        form.appendChild(input);
      }
    });
    document.body.appendChild(form);
    form.submit();
  };

  return (
    <div className="purchase-page custom-scrollbar">
      <div className="purchase-layout">
        {/* Left column - Plan & Order Summary */}
        <div className="plan-summary-card">
          {/* Header */}
          <div className="summary-header">
            <h2 className="plan-name-title">
              {service?.service
                ? service.service
                : `${plan?.title} - ${plan?.badge || ""}`}
            </h2>
          </div>

          {/* Plan / Service Info */}
          <div className="plan-info-block">
            {plan && (
              <>
                <Text className="plan-desc">{plan?.description}</Text>

                {Array.isArray(plan?.highlights) && (
                  <ul className="highlight-list compact">
                    {plan.highlights.map(
                      (item: { icon: string; text: string }, index: number) => (
                        <li key={index}>
                          <span className="highlight-icon">{item.icon}</span>
                          {item.text}
                        </li>
                      ),
                    )}
                  </ul>
                )}
              </>
            )}

            {service && (
              <div className="service-info-block">
                <h3 className="block-title">Included Service</h3>
                <div className="service-name">{service?.service}</div>
                <div className="service-desc">{service?.description}</div>

                <ul className="service-meta compact">
                  <li>✔ Category: {service?.category}</li>
                  <li>✔ Occurrence: {service?.occurance}</li>
                  <li>✔ Service Code: {service?.serviceCode}</li>
                </ul>
              </div>
            )}
          </div>

          {/* Order Summary + Price */}
          <div className="order-summary-compact">
            <Title level={5} className="mini-title">
              Order Summary
            </Title>
            <Divider className="thin-divider" />

            <div className="price-display">
              {plan?.currencyType === "USD" && (
                <div className="price-box">
                  <span className="currency">USD</span>
                  <span className="amount">
                    ${service?.price || plan?.price}
                  </span>
                  <span className="period">
                    /{plan?.occurance || service?.occurance || "year"}
                  </span>
                </div>
              )}

              {(plan?.currencyType === "INR" || service) && (
                <div className="price-box">
                  <span className="currency">INR</span>
                  <span className="amount">
                    ₹ {service?.pricing || plan?.price}
                  </span>
                  <span className="period">
                    /{service?.occurance || plan?.occurance || "year"}
                  </span>
                </div>
              )}
            </div>

            <div className="policy-note small-text">
              <p>The above Price is inclusive of All Taxes.</p>
              <p className="small-text">
                <b>Note:</b> While using international credit/debit cards your
                issuing bank may charge you conversion fee additionally.
              </p>
            </div>

            <div className="refund-policy small-text">
              <strong>Chargeback & Refund Policy:</strong>
              <p>
                Chargeback is not acceptable once a transaction is processed as
                the service starts immediately upon payment. Any refund requests
                will be processed by Anvayaa Kin Care Private Limited as per the
                Company's Refund policy mentioned in the{" "}
                <a
                  target="_blank"
                  href="https://anvayaa.com/terms-and-conditions"
                  rel="noopener noreferrer"
                >
                  Terms & Conditions
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Right column - Payment Handler */}
        <div className="payment-section">
          <PaymentHandler
            paymentModes={packagePurchase}
            onOnlinePay={redirectToPayment}
            onOnlineOptionClick={handlePaymentOptionClick}
            paymentLinkDetails={paymentLinkDetails}
            paymentCharges={paymentCharges}
            packageDetails={{
              currencyType: service ? service.currencyType : plan.currencyType,
              actualPrice: service ? service.pricing : plan.price,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PackagePurchase;
