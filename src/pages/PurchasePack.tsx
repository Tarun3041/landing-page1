import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";
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
          } else {
          }
        } else {
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
    <div className="package-purchase-container">
      <Card
        className="order-summary"
        title={
          <h4 className="summary-title" style={{ marginTop: "50px" }}>
            {service?.service
              ? service.service
              : `${plan?.title} - ${plan?.badge}`}
          </h4>
        }
      >
        {plan && (
          <div className="plan-section">
            {/* Plan description */}
            <Text className="plan-description">{plan?.description}</Text>

            {/* Plan highlights */}
            {Array.isArray(plan?.highlights) && (
              <ul className="plan-benefits">
                {plan.highlights.map(
                  (item: { icon: string; text: string }, index: number) => (
                    <li key={index}>
                      <span style={{ marginRight: "6px" }}>{item.icon}</span>
                      {item.text}
                    </li>
                  ),
                )}
              </ul>
            )}
          </div>
        )}
        {service && (
          <div className="plan-section">
            <h3 className="section-title">Included Service</h3>

            <Text className="plan-description">{service?.service}</Text>

            <Text
              type="secondary"
              style={{ marginTop: "6px", display: "block" }}
            >
              {service?.description}
            </Text>

            <ul className="plan-benefits">
              <li>✔ Category: {service?.category}</li>
              <li>✔ Occurrence: {service?.occurance}</li>
              <li>✔ Service Code: {service?.serviceCode}</li>
            </ul>
          </div>
        )}

        <Card className="summary-card" variant="borderless">
          <Title level={5} className="summary-title">
            Order Summary
          </Title>
          <Divider />
          {plan?.currencyType === "USD" && (
            <div className="price-card-section">
              <span className="price-card1">
                <h4>USD</h4>
                <h3>
                  $ {service?.price}/{plan?.occurance || "year"}
                </h3>
              </span>
              <span className="price-card2">
                <h4>INR</h4>
                <h3>
                  ₹ {service?.price}/{plan?.occurance || "year"}
                </h3>
              </span>
            </div>
          )}
          {plan?.currencyType === "INR" && (
            <div className="price-card-section">
              <span className="price-card2">
                <h4>INR</h4>
                <h3>
                  ₹ {service?.price}/{plan?.occurance || "year"}
                </h3>
              </span>
            </div>
          )}
          <Card className="coupon-section">
            <Title level={5}>The above Price is inclusive of All Taxes.</Title>
            <h5>
              <b>Note:</b> While using international credit/debit cards your
              issuing bank may charge you conversion fee additionally.
            </h5>
          </Card>
          <Card className="top-margin">
            <Title level={5}>Chargeback & Refund Policy:</Title>
            <h4>
              Chargeback is not acceptable once a transaction is processed as
              the service starts immediately upon payment. Any refund requests
              will be processed by Anvayaa Kin Care Private Limited as per the
              Company's Refund policy mentioned in the{" "}
              <a
                target="_blank"
                href="https://anvayaa.com/terms-and-conditions"
              >
                Terms & Conditions(anvayaa.com)
              </a>
            </h4>
          </Card>
        </Card>
      </Card>
      <PaymentHandler
        paymentModes={packagePurchase}
        onOnlinePay={redirectToPayment}
        onOnlineOptionClick={handlePaymentOptionClick}
        paymentLinkDetails={paymentLinkDetails}
        paymentCharges={paymentCharges}
        packageDetails={{
          currencyType: service ? service.currencyType : plan.currencyType,
          actualPrice: service ? service.pricing : plan.price,
          // actualPriceINR: service ? service.pricing : plan.price,
        }}
      />
    </div>
  );
};

export default PackagePurchase;
