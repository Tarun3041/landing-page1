import { useState, useEffect, lazy } from "react";
import "../styles/plans.css";
import AuthFlow from "./Authflow";
import { useNavigate } from "react-router-dom";

/* =========================
   PLANS JSON CONFIG - More complete & differentiated
========================= */
const plansData = [
  {
    id: "basic",
    badge: "Most Popular",
    title: "Basic Care",
    currencyType: "INR",
    occurance: "Monthly",
    description:
      "Ideal for mostly independent seniors who want safety, preventive health support, and meaningful engagement without daily assistance.",
    price: "3200",
    billing: "(Billed annually · Covers family of 2 elders)",
    highlights: [
      { icon: "🔒", text: "24×7 SOS Helpline – Unlimited emergency calls" },
      {
        icon: "👨‍⚕️",
        text: "Doctor Consultations – 12 GP + 4 Specialist per year",
      },
      {
        icon: "📊",
        text: "Annual Comprehensive Health Checkup (80+ parameters)",
      },
      { icon: "❤️", text: "30 Online Wellness & Engagement Sessions / month" },
      {
        icon: "⌚",
        text: "Senior Smart Watch with SOS & basic vitals tracking",
      },
    ],
    detailedSections: [
      {
        title: "Who is this for?",
        type: "list",
        items: [
          { icon: "👵", text: "Mostly independent elders" },
          { icon: "❤️", text: "Early-stage or mild health concerns" },
          { icon: "👨‍👩‍👧‍👦", text: "Well connected with family & friends" },
          { icon: "🎯", text: "Enjoys social activities & mental engagement" },
        ],
      },
      {
        title: "Emergency & Safety",
        rows: [
          {
            label:
              "24/7 dedicated helpline, Includes real-time support for emergency situations, coordination from home to hospitalization & in-app updates.",
            value: "Unlimited",
            featured: true,
          },
          {
            label:
              "Ambulance Coordination : Arrange for  home to hospital transport in case of emergency.",
            value: "Pay & Use",
          },
          {
            label:
              "On-ground care manager support for hospitalisation, admission, paper works etc in case of emergency-Accessible across 40 Cities Pan India - See excel attached",
            value: "40+ cities",
          },
        ],
      },
      {
        title: "Medical Consultations",
        rows: [
          {
            label:
              "24*7 Multilingual teleconsultations with a general physician for employees & family, available in both audio and video modes.",
            value: "12 / year",
            featured: true,
          },
          {
            label:
              "Multilingual teleconsultations with a geriatric medicine specialist for employees' parents, available in both audio and video modes.",
            value: "4 / year",
            featured: true,
          },
        ],
      },
      {
        title: "Preventive Health",
        rows: [
          {
            label: "Annual Full-Body Health Check (80+ params)",
            value: "1 / year",
            featured: true,
          },
          {
            label:
              "Professional screening to evaluate memory, cognitive function, and mental agility, aiding in early detection of cognitive decline or dementia.",
            value: "1 / year",
          },
          { label: "Pain & Joint Screening", value: "1 / year" },
        ],
      },
      {
        title: "Information Centre",
        rows: [
          {
            label:
              "Call for any help, booking uber, groceries, make bill payments, book dr appointments, book lab test etc",
            value: "unlimited",
            featured: true,
          },
        ],
      },
      {
        title: "Wellness & Engagement",
        rows: [
          {
            label:
              "To keep the elderly engaged and Sessions focused on -  Diet, Nutrition, Cognitive health, Fall Prevention, estate planning, Vastu, Yoga & more ",
            value: "30 / month",
            featured: true,
          },
          {
            label:
              "Access to exclusive elderly care preventive health reading material ",
            value: "unlimited  for all 12 months",
          },
          {
            label:
              " In-city and outstation group travel with link minded people with pre-booked medical support.",
            value: "Pay And Use",
          },
          {
            label: " Access to cognitive engagement activities via app ",
            value: "unlimited",
          },
        ],

        features: [
          "30 online engagement sessions per month",
          "Unlimited Health Bytes & educational content",
          "App-based brain games & cognitive activities",
          "Periodic offline community events (where available)",
        ],
      },
      {
        title: "Senior Smart Watch",
        rows: [
          {
            label:
              "Remote health vital monitoring 24X7 SOS button in-built in watch fall detection sensors 24X7 Access to anvayaa SOS helpline",
            value: "1 watch included",
          },
        ],
        // features: [
        //   "Unlimited requests – doctor booking, lab tests, medicine delivery",
        //   "Assistance with bills, groceries, Uber/cab booking",
        //   "Medicine reminder & compliance tracking",
        // ],
      },
      {
        title: "Anvaya App Access",
        rows: [
          {
            label:
              "App with SOS button Medien reminder  EMR - medical records documentions Servcie Request updates and Tracking Digital wallet for payments ",
            value: "Unlimited",
          },
        ],

        // features: [
        //   "24×7 SOS button & emergency alerts",
        //   "Basic fall detection & location sharing",
        //   "Vitals tracking (heart rate, steps)",
        //   "Family dashboard for real-time updates",
        // ],
      },
      {
        title: "Companion Care services",
        rows: [
          {
            label:
              "A dedicated companion care manager from Anvayaa will accompany elderly for health checks/follow up doctor visits to hospital/clinics/lab or any other healthcare facility as needed by the elderly",
            value: "6 per-year",
          },
          {
            label:
              "A dedicated companion care manager from Anvayaa will accompany elderly for banks/malls/worship places/shopping/family events/tech & smartphone usage assistance/paperwork & logistics etc.",
            value: "6 per-year",
          },
        ],
      },
    ],
  },
  {
    id: "advanced",
    badge: "Premium",
    title: "Advanced Care",
    currencyType: "INR",
    occurance: "Monthly",
    description:
      "Designed for seniors with limited mobility or increasing dependency — includes more frequent medical support, companion visits, wellness check-ins, and discounts on intensive home care.",
    price: "7200",
    billing: "(Billed annually · Covers family of 2 elders)",
    highlights: [
      { icon: "⚡", text: "Unlimited GP Teleconsultations" },
      { icon: "👨‍⚕️", text: "6 Geriatric Specialist Consults per year" },
      { icon: "🤝", text: "18 Companion Visits per year (hospital + errands)" },
      {
        icon: "🏠",
        text: "15% Discount on all Home Health Services (nurse, physio, attendant)",
      },
      {
        icon: "📞",
        text: "Fortnightly Wellness Check-in Calls by Wellness Manager",
      },
      {
        icon: "⌚",
        text: "Senior Smart Watch with SOS & fall detection",
      },
    ],
    detailedSections: [
      {
        title: "Who is this for?",
        type: "list",
        items: [
          {
            icon: "🧑‍🦯",
            text: "Seniors with limited mobility and largely home-bound",
          },
          { icon: "📈", text: "Health concerns exist and are on the rise" },
          {
            icon: "🏠",
            text: "Mostly independent in personal grooming, toileting, dressing, feeding",
          },
          {
            icon: "🛒",
            text: "Requires assistance for activities outside home (errands, hospital visits)",
          },
        ],
      },
      {
        title: "Emergency & Safety",
        rows: [
          {
            label:
              "24/7 dedicated helpline, Includes real-time support for emergency situations, coordination from home to hospitalization & in-app updates.",
            value: "Unlimited",
            featured: true,
          },
          {
            label:
              "Ambulance Coordination : Arrange for home to hospital transport in case of emergency.",
            value: "Pay & Use",
          },
          {
            label:
              "On-ground care manager support for hospitalisation, admission, paperwork etc in case of emergency - Accessible across 40 Cities Pan India",
            value: "40+ cities",
          },
        ],
      },
      {
        title: "Medical Consultations",
        rows: [
          {
            label:
              "24*7 Multilingual teleconsultations with a general physician, available in both audio and video modes.",
            value: "Unlimited",
            featured: true,
          },
          {
            label:
              "Multilingual teleconsultations with a geriatric medicine specialist, available in both audio and video modes.",
            value: "6 / year",
            featured: true,
          },
          {
            label:
              "Diet consultation for condition management & healthy ageing",
            value: "2 / year",
          },
        ],
      },
      {
        title: "Preventive Health & Monitoring",
        rows: [
          {
            label: "Annual Health Check (50+ parameters)",
            value: "1 / year",
            featured: true,
          },
          {
            label:
              "Knee, Back, Shoulder, Joint pains - online assessment with physiotherapist",
            value: "2 / year",
          },
          {
            label:
              "Professional screening to evaluate memory, cognitive function, and mental agility, aiding in early detection of cognitive decline or dementia.",
            value: "1 / year",
          },
          {
            label:
              "Vitals monitoring (Random blood sugar, BP, blood oxygen, ECG, Heart Rate, temperature) - measured and shared via app",
            value: "6 / year",
            featured: true,
          },
          {
            label:
              "Audiologist technician - home visit for hearing concerns & includes Speech Reception Threshold (SRT)",
            value: "1 / year",
          },
        ],
      },
      {
        title: "Wellbeing & Engagement",
        rows: [
          {
            label:
              "Fortnightly proactive wellbeing calls by our Wellness Manager, focusing on physical, emotional & social wellbeing of elderly",
            value: "24 / year",
            featured: true,
          },
          {
            label:
              "To keep the elderly engaged with sessions focused on Diet, Nutrition, Cognitive health, Fall Prevention, estate planning, Vastu, Yoga & more",
            value: "30 / month",
            featured: true,
          },
        ],
      },
      {
        title: "Companion Care Services",
        rows: [
          {
            label:
              "A dedicated companion care manager will accompany elderly for health checks/follow-up doctor visits to hospital/clinics/lab or any other healthcare facility",
            value: "6 / year",
            featured: true,
          },
          {
            label:
              "A dedicated companion care manager will accompany elderly for banks/malls/worship places/shopping/family events/tech assistance/paperwork & logistics etc.",
            value: "12 / year",
            featured: true,
          },
        ],
      },
      {
        title: "Home Health Care (Discounted)",
        rows: [
          {
            label:
              "Wound care, injections, IV administration, vitals monitoring, Catheter Care, Suction Care, Ryles Tube etc.",
            value: "Pay & Use (15% discount)",
          },
          {
            label: "To support with rehab motor functions of the elderly",
            value: "Pay & Use (15% discount)",
          },
          {
            label:
              "Assistance with activities of daily living such as bathing, grooming, diaper change, feeding, walking, and physical exercises",
            value: "Pay & Use (15% discount)",
          },
          {
            label:
              "Home visits for regular health check-up or to track recovery",
            value: "Pay & Use (15% discount)",
          },
        ],
      },
      {
        title: "Senior Smart Watch",
        rows: [
          {
            label:
              "Remote health vital monitoring 24×7, SOS button in-built, fall detection sensors, 24×7 Access to Anvayaa SOS helpline",
            value: "1 watch included",
          },
        ],
      },
      {
        title: "Anvaya App Access",
        rows: [
          {
            label:
              "App with SOS button, Medicine reminder, EMR - medical records documentation, Service Request updates and Tracking, Digital wallet for payments",
            value: "Unlimited",
          },
        ],
      },
    ],
  },
];

/* ============ REUSABLE UI COMPONENTS ============ */
function Section({
  title,
  badge,
  children,
}: {
  title: string;
  badge?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="plan-section">
      <div className="plan-section-header">
        <div className="plan-section-title">{title}</div>
        {badge && <span className="plan-section-badge">{badge}</span>}
      </div>
      <div className="section-content">{children}</div>
    </div>
  );
}

function Row({
  label,
  value,
  featured = false,
}: {
  label: string;
  value: string;
  featured?: boolean;
}) {
  return (
    <div className={`plan-row ${featured ? "featured" : ""}`}>
      <span className="row-label">{label}</span>
      <span className="row-value">{value}</span>
    </div>
  );
}

function FeatureRow({ children }: { children: React.ReactNode }) {
  return (
    <div className="feature-row">
      <span className="feature-icon1">→</span>
      <span>{children}</span>
    </div>
  );
}

function ListSection({ items }: { items: { icon: string; text: string }[] }) {
  return (
    <ul className="plan-list">
      {items.map((item, i) => (
        <li key={i}>
          <span className="list-icon">{item.icon}</span>
          {item.text}
        </li>
      ))}
    </ul>
  );
}

/* ============ MAIN COMPONENT ============ */
export default function Plans() {
  const [open, setOpen] = useState<string | null>(null);
  const [showRegistration, setShowRegistration] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const isUserLoggedIn = localStorage.getItem("isUserLoggedIn") === "true";
  const navigate = useNavigate();

  const toggle = (id: string) => {
    setOpen(open === id ? null : id);
  };

  const handleGetStarted = (plan: any) => {
    setSelectedPlan(plan);
    localStorage.removeItem("service");
    localStorage.setItem("plan", JSON.stringify(plan));
    if (isUserLoggedIn) {
      setShowRegistration(false);
      navigate("/payment");
    } else {
      setShowRegistration(true);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    document.body.style.overflow = showRegistration ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showRegistration]);

  if (showRegistration) {
    return (
      <div className="register-overlay">
        <div className="register-modal">
          <AuthFlow />
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="plans-header">
        <h1 className="plans-title">Elder Care Plans</h1>
      </div>

      <div
        className="plans-grid custom-scrollbar"
        style={{ height: "calc(100vh - 112px)", overflowY: "auto" }}
      >
        {plansData.map((plan) => (
          <div
            key={plan.id}
            className={`plan-card plan-${plan.id} custom-scrollbar1`}
          >
            <div className="plan-card-main">
              <div className="plan-header">
                <div className="flex items-center justify-between">
                  <div className="plan-badge">{plan.badge}</div>
                  <h2 className="plan-title">{plan.title}</h2>
                </div>
                <p className="plan-desc">{plan.description}</p>

                <div className="plan-price-section">
                  <div className="plan-price">
                    {plan.price} <span>/ month</span>
                  </div>
                  <p className="plan-billing">{plan.billing}</p>
                </div>

                <div className="plan-highlights">
                  {plan.highlights.map((h: any, i: number) => (
                    <div className="highlight-item" key={i}>
                      <span className="highlight-icon">{h.icon}</span>
                      <div className="highlight-title">{h.text}</div>
                    </div>
                  ))}
                </div>

                <div className="plan-actions">
                  <button
                    className="plan-btn"
                    onClick={() => handleGetStarted(plan)}
                  >
                    Get Started
                  </button>

                  <button
                    className="plan-toggle"
                    onClick={() => toggle(plan.id)}
                    aria-expanded={open === plan.id}
                  >
                    {open === plan.id ? "Hide Details" : "Show Details"}
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      {open === plan.id ? (
                        <>
                          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                          <circle cx="12" cy="12" r="3" />
                        </>
                      ) : (
                        <>
                          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                          <circle cx="12" cy="12" r="3" />
                        </>
                      )}
                    </svg>
                  </button>
                </div>
              </div>

              {/* DETAILS PANEL – Dynamic from data */}
              <div
                className={`plan-details-panel ${open === plan.id ? "expanded" : ""}`}
              >
                <div className="details-container">
                  <div className="details-header">
                    <h3>Complete Features Included</h3>
                    <div className="details-badge">All Inclusive</div>
                  </div>

                  <div className="details-grid">
                    {plan.detailedSections.map((section: any, idx: number) => (
                      <div className="details-column" key={idx}>
                        <Section title={section.title}>
                          {section.type === "list" ? (
                            <ListSection items={section.items} />
                          ) : section.rows ? (
                            section.rows.map((row: any, rIdx: number) => (
                              <Row
                                key={rIdx}
                                label={row.label}
                                value={row.value}
                                featured={row.featured}
                              />
                            ))
                          ) : section.features ? (
                            section.features.map(
                              (feat: string, fIdx: number) => (
                                <FeatureRow key={fIdx}>{feat}</FeatureRow>
                              ),
                            )
                          ) : null}
                        </Section>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
