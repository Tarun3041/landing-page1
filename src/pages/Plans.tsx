import { useState, useEffect } from "react";
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
    price: "₹3,200",
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
          { label: "24×7 SOS Helpline", value: "Unlimited", featured: true },
          { label: "Ambulance Coordination", value: "Pay & Use" },
          { label: "Hospital Ground Support", value: "40+ cities" },
        ],
      },
      {
        title: "Medical Consultations",
        rows: [
          {
            label: "GP Teleconsult (Audio/Video)",
            value: "12 / year",
            featured: true,
          },
          {
            label: "Geriatric / Specialist Consult",
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
          { label: "Cognitive Health Screening", value: "1 / year" },
          { label: "Pain & Joint Screening", value: "1 / year" },
        ],
      },
      {
        title: "Wellness & Engagement",
        features: [
          "30 online engagement sessions per month",
          "Unlimited Health Bytes & educational content",
          "App-based brain games & cognitive activities",
          "Periodic offline community events (where available)",
        ],
      },
      {
        title: "Concierge Services",
        features: [
          "Unlimited requests – doctor booking, lab tests, medicine delivery",
          "Assistance with bills, groceries, Uber/cab booking",
          "Medicine reminder & compliance tracking",
        ],
      },
      {
        title: "Smart Watch & App",
        features: [
          "24×7 SOS button & emergency alerts",
          "Basic fall detection & location sharing",
          "Vitals tracking (heart rate, steps)",
          "Family dashboard for real-time updates",
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
      "Designed for seniors with increasing dependency — includes more frequent medical support, companion visits, and discounts on intensive home care.",
    price: "₹7,200",
    billing: "(Billed annually · Covers family of 2 elders)",
    highlights: [
      {
        icon: "⚡",
        text: "Unlimited Doctor Consultations (GP + Specialist + Nutritionist)",
      },
      {
        icon: "🤝",
        text: "24 Companion Visits per year (hospital + social/errands)",
      },
      {
        icon: "🏠",
        text: "15% Discount on all Home Health Services (nurse, physio, etc.)",
      },
      {
        icon: "🩺",
        text: "Fortnightly Wellness Check-in Calls by Care Manager",
      },
      {
        icon: "⌚",
        text: "Advanced Smart Watch – continuous monitoring + fall detection",
      },
    ],
    detailedSections: [
      {
        title: "Who is this for?",
        type: "list",
        items: [
          { icon: "🧑‍🦯", text: "Seniors with limited mobility or home-bound" },
          { icon: "🏥", text: "Rising or chronic health conditions" },
          {
            icon: "🤝",
            text: "Requires regular help outside home (hospital visits, errands)",
          },
          {
            icon: "🩺",
            text: "Needs proactive monitoring & frequent medical input",
          },
        ],
      },
      {
        title: "Medical & Specialist Support",
        rows: [
          { label: "GP Teleconsultations", value: "Unlimited", featured: true },
          {
            label: "Geriatric Specialist Consults",
            value: "6 / year",
            featured: true,
          },
          { label: "Nutritionist / Diet Consults", value: "2–4 / year" },
        ],
      },
      {
        title: "Preventive & Diagnostics",
        rows: [
          {
            label: "Vitals Monitoring at Home (BP, Sugar, ECG, etc.)",
            value: "6 / year",
          },
          { label: "Annual Health Check (50+ parameters)", value: "1 / year" },
          { label: "Pain Screening (multiple joints)", value: "2 / year" },
          { label: "Cognitive & Audiology Screening", value: "1 / year each" },
        ],
      },
      {
        title: "Companion & Personal Assistance",
        rows: [
          {
            label: "Hospital / Doctor Visit Accompaniment",
            value: "6 / year",
            featured: true,
          },
          {
            label: "Errands & Social Outing Support",
            value: "12 / year",
            featured: true,
          },
          { label: "Total Companion Visits", value: "18–24 / year" },
        ],
      },
      {
        title: "Home Health Advantage",
        features: [
          "15% discount on nurse visits, physiotherapy, attendant care",
          "Priority booking for home doctor visits",
          "Discounted lab sample collection at home",
        ],
      },
      {
        title: "Wellbeing Monitoring",
        features: [
          "Fortnightly personalized wellness calls (24 calls/year)",
          "Dedicated Wellness Manager for coordination",
          "Proactive health trend reporting to family",
        ],
      },
      {
        title: "Smart Watch & Digital Platform",
        features: [
          "Continuous vitals + advanced fall detection",
          "Real-time family alerts & dashboard",
          "Medicine & appointment reminders",
          "Secure medical records storage",
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
