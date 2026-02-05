import { useState, useEffect } from "react";
import "../styles/plans.css";
import AuthFlow from "./Authflow";
import { useNavigate } from "react-router-dom";

export default function Plans() {
  const [open, setOpen] = useState<string | null>(null);
  const [showRegistration, setShowRegistration] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string>("");
  let isUserLoggedIn = localStorage.getItem("isUserLoggedIn") === "true";

  const toggle = (id: string) => {
    setOpen(open === id ? null : id);
  };

  const handleGetStarted = (planType: string) => {
    setSelectedPlan(planType);
    if (isUserLoggedIn) {
      setShowRegistration(false);
    } else {
      setShowRegistration(true);
    }
    // Scroll to top when showing registration
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Hide body scroll when registration is shown
  useEffect(() => {
    if (showRegistration) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showRegistration]);

  if (showRegistration) {
    return (
      <div className="register-overlay">
        <div className="register-modal">
          {/* Top bar */}
          {/* <div className="registration-header">
          <button
            className="back-btn1"
            onClick={() => {
              setShowRegistration(false);
              setSelectedPlan("");
            }}
          >
            ← Back
          </button>

          <div className="selected-plan-label">
            Selected Plan: <strong>{selectedPlan}</strong>
          </div>
        </div> */}
          <AuthFlow />
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="plans-header">
        <h1 className="plans-title">Elder Care Plans</h1>
        {/* <p className="plans-subtitle">
          Choose the perfect care plan for your loved ones
        </p> */}
      </div>

      <div
        className="plans-grid custom-scrollbar"
        style={{ height: "calc(100vh - 112px)", overflowY: "auto" }}
      >
        {/* ================= BASIC CARE ================= */}
        <div className="plan-card plan-basic custom-scrollbar">
          <div className="plan-card-main">
            <div className="plan-header">
              <div className="flex items-center justify-between">
                <div className="plan-badge">Most Popular</div>
                <h2 className="plan-title">Basic Care</h2>
              </div>
              <p className="plan-desc">
                For independent elders who need safety, engagement and
                preventive healthcare.
              </p>

              <div className="plan-price-section">
                <div className="plan-price">
                  ₹3,200 <span>/ month</span>
                </div>
                <p className="plan-billing">
                  (Billed annually · Family of 2 elders)
                </p>
              </div>

              <div className="plan-highlights">
                <div className="highlight-item">
                  <span className="highlight-icon">🔒</span>
                  <div>
                    <div className="highlight-title">24x7 SOS Helpline</div>
                    <div className="highlight-desc">
                      Unlimited emergency calls
                    </div>
                  </div>
                </div>
                <div className="highlight-item">
                  <span className="highlight-icon">👨‍⚕️</span>
                  <div>
                    <div className="highlight-title">Doctor Consultations</div>
                    <div className="highlight-desc">
                      12 GP + 4 Specialist/year
                    </div>
                  </div>
                </div>
                <div className="highlight-item">
                  <span className="highlight-icon">📊</span>
                  <div>
                    <div className="highlight-title">Health Checkup</div>
                    <div className="highlight-desc">Annual 80+ parameters</div>
                  </div>
                </div>
              </div>

              <div className="plan-actions">
                <button
                  className="plan-btn"
                  onClick={() => handleGetStarted("Basic Care")}
                >
                  Get Started
                </button>
                <button
                  className="plan-toggle"
                  onClick={() => toggle("basic")}
                  aria-expanded={open === "basic"}
                >
                  {open === "basic" ? (
                    <>
                      Hide Details
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
                        <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
                        <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
                        <line x1="2" y1="2" x2="22" y2="22"></line>
                      </svg>
                    </>
                  ) : (
                    <>
                      Show Details
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* DETAILS PANEL */}
            <div
              className={`plan-details-panel ${open === "basic" ? "expanded" : ""}`}
            >
              <div className="details-container">
                <div className="details-header">
                  <h3>Complete Features Included</h3>
                  <div className="details-badge">All Inclusive</div>
                </div>

                <div className="details-grid">
                  <div className="details-column">
                    <Section title="Who is this for?">
                      <ul className="plan-list">
                        <li>
                          <span className="list-icon">👵</span> Mostly
                          independent elders
                        </li>
                        <li>
                          <span className="list-icon">❤️</span> Early-stage
                          health concerns
                        </li>
                        <li>
                          <span className="list-icon">👨‍👩‍👧‍👦</span> Connected with
                          friends & family
                        </li>
                        <li>
                          <span className="list-icon">🎯</span> Enjoys social
                          engagement
                        </li>
                      </ul>
                    </Section>

                    <Section title="Emergency Care & Accessibility">
                      <Row
                        label="24x7 SOS Helpline"
                        value="Unlimited"
                        featured
                      />
                      <Row label="Ambulance Coverage" value="Pay & Use" />
                      <Row
                        label="On-ground hospital support"
                        value="Across 40+ cities"
                      />
                    </Section>

                    <Section title="Doctor Consultations">
                      <Row
                        label="GP Teleconsultation (Audio & Video)"
                        value="12 / year"
                        featured
                      />
                      <Row label="Geriatric Specialist" value="4 / year" />
                    </Section>

                    <Section title="Preventive Health Care">
                      <Row
                        label="Annual Health Check (80+ parameters)"
                        value="1 / year"
                        featured
                      />
                      <Row
                        label="Pain Screening (Knee, Joint, Back, Shoulder)"
                        value="1 / year"
                      />
                      <Row
                        label="Cognitive Health Assessment"
                        value="1 / year"
                      />
                    </Section>
                  </div>

                  <div className="details-column">
                    <Section title="Information & Concierge">
                      <FeatureRow>
                        Uber booking, groceries, bill payments
                      </FeatureRow>
                      <FeatureRow>
                        Doctor appointments, lab tests – Unlimited
                      </FeatureRow>
                      <FeatureRow>Medicine reminders & tracking</FeatureRow>
                    </Section>

                    <Section title="Wellness, Engagement & Travel">
                      <Row
                        label="Online Engagement Sessions"
                        value="30/month"
                      />
                      <Row
                        label="Health Bytes (Reading Material)"
                        value="Unlimited"
                      />
                      <Row label="Offline Community Events" value="Regular" />
                      <Row label="Senior Friendly Travel" value="Pay & Use" />
                      <Row
                        label="App based Cognitive Activities"
                        value="Unlimited"
                      />
                    </Section>

                    <Section title="Senior Smart Watch">
                      <FeatureRow>24x7 vital monitoring, SOS button</FeatureRow>
                      <FeatureRow>
                        Fall detection, emergency helpline access
                      </FeatureRow>
                      <FeatureRow>
                        Activity tracking & location sharing
                      </FeatureRow>
                    </Section>

                    <Section title="Companion Care">
                      <Row
                        label="Accompanied visits (4 hours each)"
                        value="6 / year"
                      />
                    </Section>

                    <Section title="Anvayaa App">
                      <FeatureRow>
                        SOS, medicine reminders, medical records
                      </FeatureRow>
                      <FeatureRow>Service tracking & digital wallet</FeatureRow>
                      <FeatureRow>Family connection portal</FeatureRow>
                    </Section>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= ADVANCED CARE ================= */}
        <div className="plan-card plan-advanced custom-scrollbar">
          <div className="plan-card-main">
            <div className="plan-header">
              <div className="flex items-center justify-between">
                <div className="plan-badge">Premium</div>
                <h2 className="plan-title">Advanced Care</h2>
              </div>
              <p className="plan-desc">
                For elders who are home-bound, with rising medical & daily
                assistance needs.
              </p>

              <div className="plan-price-section">
                <div className="plan-price">
                  ₹7,200 <span>/ month</span>
                </div>
                <p className="plan-billing">
                  (Billed annually · Family of 2 elders)
                </p>
              </div>

              <div className="plan-highlights">
                <div className="highlight-item">
                  <span className="highlight-icon">⚡</span>
                  <div>
                    <div className="highlight-title">
                      Unlimited Consultations
                    </div>
                    <div className="highlight-desc">
                      GP + Specialist + Nutritionist
                    </div>
                  </div>
                </div>
                <div className="highlight-item">
                  <span className="highlight-icon">🤝</span>
                  <div>
                    <div className="highlight-title">24 Companion Visits</div>
                    <div className="highlight-desc">
                      Hospital & social visits
                    </div>
                  </div>
                </div>
                <div className="highlight-item">
                  <span className="highlight-icon">🏠</span>
                  <div>
                    <div className="highlight-title">Home Health Discount</div>
                    <div className="highlight-desc">15% off all services</div>
                  </div>
                </div>
              </div>

              <div className="plan-actions">
                <button
                  className="plan-btn"
                  onClick={() => handleGetStarted("Advanced Care")}
                >
                  Get Started
                </button>
                <button
                  className="plan-toggle"
                  onClick={() => toggle("advanced")}
                  aria-expanded={open === "advanced"}
                >
                  {open === "advanced" ? (
                    <>
                      Hide Details
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
                        <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
                        <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
                        <line x1="2" y1="2" x2="22" y2="22"></line>
                      </svg>
                    </>
                  ) : (
                    <>
                      Show Details
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* DETAILS PANEL */}
            <div
              className={`plan-details-panel ${open === "advanced" ? "expanded" : ""}`}
            >
              <div className="details-container">
                <div className="details-header">
                  <h3>Complete Features Included</h3>
                  <div className="details-badge">Premium Package</div>
                </div>

                <div className="details-grid">
                  <div className="details-column">
                    <Section title="Who is this for?">
                      <ul className="plan-list">
                        <li>
                          <span className="list-icon">🧑‍🦯</span> Limited mobility
                        </li>
                        <li>
                          <span className="list-icon">🏥</span> Health concerns
                          increasing
                        </li>
                        <li>
                          <span className="list-icon">🤝</span> Needs help
                          outside home
                        </li>
                      </ul>
                    </Section>

                    <Section title="Doctor & Nutrition Support">
                      <Row
                        label="GP Teleconsultations"
                        value="Unlimited"
                        featured
                      />
                      <Row
                        label="Geriatric Specialist"
                        value="6 / year"
                        featured
                      />
                      <Row label="Nutritionist Consultation" value="2 / year" />
                    </Section>

                    <Section title="Preventive & Diagnostics">
                      <Row
                        label="Annual Health Check (50+ parameters)"
                        value="1 / year"
                      />
                      <Row label="Pain Screening" value="2 / year" />
                      <Row
                        label="Vitals at Home (BP, Sugar, ECG, O2, Temp)"
                        value="6 / year"
                      />
                      <Row label="Audiology Screening" value="1 / year" />
                      <Row
                        label="Cognitive Health Assessment"
                        value="1 / year"
                      />
                    </Section>

                    <Section title="Wellbeing Monitoring">
                      <FeatureRow>
                        Fortnightly wellbeing calls by Wellness Manager
                      </FeatureRow>
                      <FeatureRow>
                        24 calls per year with personalized advice
                      </FeatureRow>
                    </Section>
                  </div>

                  <div className="details-column">
                    <Section title="Companion Care">
                      <Row
                        label="Hospital & Doctor Visits"
                        value="6 / year"
                        featured
                      />
                      <Row label="Errands & Social Visits" value="12 / year" />
                      <FeatureRow>
                        Total 18 companion visits per year
                      </FeatureRow>
                    </Section>

                    <Section title="Home Health Care (15% Discount)">
                      <FeatureRow>Nurse at home services</FeatureRow>
                      <FeatureRow>Physiotherapy at home sessions</FeatureRow>
                      <FeatureRow>24x12 hrs caretaker services</FeatureRow>
                      <FeatureRow>General Physician home visits</FeatureRow>
                    </Section>

                    <Section title="Smart Watch & App">
                      <FeatureRow>24x7 SOS & fall detection system</FeatureRow>
                      <FeatureRow>Continuous vitals monitoring</FeatureRow>
                      <FeatureRow>
                        Full digital medical platform access
                      </FeatureRow>
                      <FeatureRow>
                        Real-time alerts to family members
                      </FeatureRow>
                    </Section>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============ REUSABLE UI COMPONENTS ============ */

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="plan-section">
      <div className="plan-section-title">{title}</div>
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
