import { useState } from "react";
import "../styles/services.css";

interface Service {
  service: string;
  description: string;
  pricing: string | number;
  category?: string;
}

export default function Services() {
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");
  const [expandedTableRow, setExpandedTableRow] = useState<number | null>(null);
  const [expandedCards, setExpandedCards] = useState<Record<number, boolean>>(
    {},
  );
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const services: Service[] = [
    {
      service: "Companion Visits of Care Manager - 4 hrs each",
      description:
        "Trained Geriatric professionals for: Accompanied medical appointment to clinics/hospitals, Accompanied Emergency hospitalization visit, Hospital admission, billing, insurance related paper work, claim related supports, discharge and digitalize medical records, Accompanied diagnostics visits, Accompanied planned hospitalization /surgery assistance, Home visits to organize pill box / any other medication as needed, CGHS retired employees dispensary support for medication procurement, Non medical visits to accompany for banks. airport, railway station , movie, shopping, dinner, temple etc.",
      pricing: "3500",
      category: "Care Management",
    },
    {
      service:
        "Pain Screening for Shoulder, Knee, Back and joints + Physical Therapy - Online Consultation",
      description:
        "Online screening & immediate report on chief pain area, followed by consultation with physiotherapist, customized fall risk prevention physiotherapy packages at 25% discounts",
      pricing: "1500",
      category: "Therapy",
    },
    {
      service:
        "Memory Screening - Neuro degenerative Condition Management Screening",
      description:
        "1 Initial Neuro Cognitive assessment(INCA) to screen the risk of cognitive decline and screening for conditions like Alzheimer's or Dementia",
      pricing: "1500",
      category: "Screening",
    },
    {
      service: "Geriatric Specialist Medicine Teleconsultation",
      description:
        "Providers can evaluate the patient's physical, cognitive, and emotional health using telemedicine tools, adapting assessments to focus on areas of primary concern for elderly patients, such as mobility, memory, and mood.",
      pricing: "600",
      category: "Teleconsultation",
    },
    {
      service: "General Physician Tele consultation",
      description: "Doctor consultation available both in Audio and Video mode",
      pricing: "300",
      category: "Teleconsultation",
    },
    {
      service: "Doctor Home Visit",
      description:
        "General Check-Up and Health Assessment: A physician can conduct routine exams, such as checking blood pressure, heart rate, and other vital signs. Medication Review: The doctor can review the patient's medications to ensure proper usage and to avoid any adverse interactions.",
      pricing: "3500",
      category: "Home Visit",
    },
    {
      service: "Physiotherapy Home Visit",
      description:
        "Trained physiotherapist home services to support with pain management, posture support and any other mobility needs",
      pricing: "1500",
      category: "Home Visit",
    },
    {
      service: "Nurse on Call Services - 2 hrs",
      description:
        "Health Vital Monitoring, IV, Injection support, Stroma bag, catheter change, and other nursing services",
      pricing: "1800",
      category: "Nursing",
    },
    {
      service: "Wound Dressing Services",
      description: "Wound Care for open wounds",
      pricing: "1800",
      category: "Nursing",
    },
    {
      service: "Trained Care Taker 24hrs - Per day",
      description:
        "Hygiene Support: Assisting with bathing, grooming, and toileting. Mobility Assistance: Helping clients move around the house safely, preventing falls and injuries. Feeding clients who need assistance. A caretaker provides companionship, which can help reduce loneliness and support mental health, especially for elderly clients or those with limited social interactions.",
      pricing: "1400",
      category: "Care Support",
    },
    {
      service: "Home Nursing Care - 12 hrs per day",
      description:
        "Nurses routinely check and record vital signs (e.g., blood pressure, temperature, pulse, respiratory rate) to monitor the patient's health status. Medication Administration and Management, Wound Care and Dressing Changes, Assistance with Mobility and basic exercises, Catheter and Colostomy Care, Tube Feeding and Nutritional Support.",
      pricing: "2400",
      category: "Nursing",
    },
    {
      service: "Home Nursing Care - 24 hrs per day",
      description:
        "Nurses routinely check and record vital signs (e.g., blood pressure, temperature, pulse, respiratory rate) to monitor the patient's health status. Medication Administration and Management, Wound Care and Dressing Changes, Assistance with Mobility and Physical Therapy, Catheter and Colostomy Care, Tube Feeding and Nutritional Support.",
      pricing: "3600",
      category: "Nursing",
    },
    {
      service: "Medical Equipment for Sale/Rental",
      description:
        "(Monthly Rentals - Manual Medical Bed, Oxygen concentrator, wheel chair) AIR BED (Sale) - Depending on equipment type",
      pricing: "Contact for quote",
      category: "Equipment",
    },
    {
      service: "Audiologist Home Consultation",
      description:
        "At-home audiometry test to evaluate hearing levels (low/medium/high), followed by an audiologist teleconsultation. Includes 25% discount on hearing aids if needed. MRP - INR 2000/consult",
      pricing: "2000",
      category: "Home Visit",
    },
    {
      service: "Dementia Caregiver App",
      description:
        "Anvayaa's Dementia Caregiver App is India's first comprehensive digital solution designed to support family members and professional caregivers of elders with dementia. The app integrates clinical guidance, cognitive therapy, emergency support, and care coordination tools—all in one intuitive platform.",
      pricing: "Free Benefit",
      category: "Digital",
    },
    {
      service:
        "Emergency Smart Watch + Remote Monitoring + 1 Year SOS services",
      description:
        "ASERS - Smart Watch with SOS Button & Fall Detection Sensors: SOS button available & connected to 24X7 call centre, 24X7 on call - Ambulance booking assistance, 24X7 Health Vital Monitoring by call centre for any anomalies, In app health vitals data sent to the family members, Fall Detection + Immediate Assistance - call connects to call centre, GSM sim card with one year calling and internet data included, GPS tracker to know incident location of SOS to dispatch help, Dedicated on ground support in-person support of Anvayaa's care manager from Home to Hospitalization including Billing, Insurance coordination, admissions/consents forms and other administrative paperwork.",
      pricing: "INR 27000",
      category: "Technology",
    },
  ];

  const categories = [
    "All",
    ...new Set(services.map((s) => s.category).filter(Boolean)),
  ] as string[];

  const filteredServices =
    activeFilter === "All"
      ? services
      : services.filter((service) => service.category === activeFilter);

  const toggleCardView = (index: number) => {
    setExpandedCards((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const toggleTableView = (index: number) => {
    setExpandedTableRow(expandedTableRow === index ? null : index);
  };

  const formatPricing = (price: string | number) => {
    if (typeof price === "string") {
      if (
        price.toLowerCase().includes("inr") ||
        price.toLowerCase().includes("free")
      ) {
        return price;
      }
      if (!isNaN(Number(price))) {
        return `₹${parseInt(price).toLocaleString()}`;
      }
      return price;
    }
    return `₹${price.toLocaleString()}`;
  };

  const getCategoryColor = (category: string = "") => {
    const colors: Record<string, string> = {
      "Care Management": "#3B82F6",
      Therapy: "#10B981",
      Screening: "#8B5CF6",
      Teleconsultation: "#EF4444",
      "Home Visit": "#F59E0B",
      Nursing: "#EC4899",
      "Care Support": "#6366F1",
      Equipment: "#14B8A6",
      Digital: "#06B6D4",
      Technology: "#F97316",
    };
    return colors[category] || "#6B7280";
  };

  const handleBookService = (serviceName: string, e: React.MouseEvent) => {
    e.stopPropagation();
    alert(`Booking service: ${serviceName}`);
  };

  const handleContactQuote = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(
      "mailto:contact@eldercare.com?subject=Service Inquiry",
      "_blank",
    );
  };

  return (
    <div className="services-container">
      <div className="services-header">
        <h1 className="services-title">Individual Services</h1>
        <div className="view-toggle-container">
          <div className="view-toggle">
            <button
              className={`view-btn ${viewMode === "cards" ? "active" : ""}`}
              onClick={() => setViewMode("cards")}
            >
              <span className="view-icon">🃏</span>
              Card View
            </button>
            <button
              className={`view-btn ${viewMode === "table" ? "active" : ""}`}
              onClick={() => setViewMode("table")}
            >
              <span className="view-icon">📋</span>
              Table View
            </button>
          </div>
        </div>
      </div>

      {/* View Toggle */}

      {/* Filter Buttons */}
      <div className="services-filter">
        {categories.map((category) => (
          <button
            key={category}
            className={`filter-btn ${activeFilter === category ? "active" : ""}`}
            onClick={() => setActiveFilter(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Cards View */}
      <div className={`services-grid ${viewMode === "cards" ? "active" : ""}`}>
        {filteredServices.map((service, index) => (
          <div
            key={index}
            className="service-card"
            onClick={() => toggleCardView(index)}
          >
            <div className="card-header">
              <div
                className="category-badge"
                style={{ backgroundColor: getCategoryColor(service.category) }}
              >
                {service.category}
              </div>
              <h3 className="service-name">{service.service}</h3>
              <div className="price-tag">
                <span className="price-amount">
                  {formatPricing(service.pricing)}
                </span>
                {typeof service.pricing === "string" &&
                service.pricing.toLowerCase().includes("inr") ? (
                  <span className="price-note">One-time payment</span>
                ) : service.pricing === "Free Benefit" ? (
                  <span className="price-note">Complimentary</span>
                ) : service.pricing === "Contact for quote" ? (
                  <span className="price-note">Custom pricing</span>
                ) : (
                  <span className="price-note">Per service</span>
                )}
              </div>
            </div>

            <div className="card-body">
              <div
                className={`description-content ${expandedCards[index] ? "expanded" : "collapsed"}`}
              >
                {service.description}
              </div>
              {service.description.length > 150 && (
                <button
                  className="read-more-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleCardView(index);
                  }}
                >
                  {expandedCards[index] ? "Read less" : "Read more"}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    style={{
                      transform: expandedCards[index]
                        ? "rotate(180deg)"
                        : "none",
                      transition: "transform 0.2s ease",
                    }}
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
              )}
            </div>

            <div className="card-footer">
              <div className="action-buttons">
                {service.pricing !== "Contact for quote" &&
                service.pricing !== "Free Benefit" ? (
                  <button
                    className="book-btn"
                    onClick={(e) => handleBookService(service.service, e)}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                    Book Now
                  </button>
                ) : (
                  <button
                    className="contact-btn-small"
                    onClick={handleContactQuote}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                    </svg>
                    Get Quote
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Table View */}
      <div
        className={`services-table-container ${viewMode === "table" ? "active" : ""}`}
      >
        <table className="services-table">
          <thead>
            <tr>
              <th className="column-service">Service</th>
              <th className="column-description">Description</th>
              <th className="column-pricing">Individual Pricing</th>
            </tr>
          </thead>
          <tbody>
            {filteredServices.map((service, index) => (
              <tr
                key={index}
                className={`service-row ${expandedTableRow === index ? "expanded" : ""}`}
                onClick={() => toggleTableView(index)}
              >
                <td className="service-cell">
                  <div className="service-content">
                    <div
                      className="service-category"
                      style={{
                        backgroundColor: getCategoryColor(service.category),
                      }}
                    >
                      {service.category}
                    </div>
                    <div className="service-name-table">{service.service}</div>
                    <div className="service-meta">
                      <span className="price-mobile">
                        {formatPricing(service.pricing)}
                      </span>
                      <svg
                        className={`expand-icon ${expandedTableRow === index ? "expanded" : ""}`}
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </div>
                  </div>
                </td>
                <td className="description-cell">
                  <div className="description-content-table">
                    {expandedTableRow === index ||
                    service.description.length < 100 ? (
                      service.description
                    ) : (
                      <>
                        {service.description.slice(0, 100)}...
                        <span className="read-more-table">Read more</span>
                      </>
                    )}
                  </div>
                </td>
                <td className="pricing-cell">
                  <div className="pricing-content-table">
                    <div className="price-amount-table">
                      {formatPricing(service.pricing)}
                    </div>
                    {typeof service.pricing === "string" &&
                    service.pricing.toLowerCase().includes("inr") ? (
                      <div className="price-note-table">One-time payment</div>
                    ) : service.pricing === "Free Benefit" ? (
                      <div className="price-note-table">Complimentary</div>
                    ) : service.pricing === "Contact for quote" ? (
                      <div className="price-note-table">Custom quote</div>
                    ) : (
                      <div className="price-note-table">Per service</div>
                    )}
                    {service.pricing !== "Contact for quote" &&
                    service.pricing !== "Free Benefit" ? (
                      <button
                        className="book-btn-table"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleBookService(service.service, e);
                        }}
                      >
                        Book Now
                      </button>
                    ) : (
                      <button
                        className="book-btn-table"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleContactQuote(e);
                        }}
                        style={{ background: "#3B82F6" }}
                      >
                        Get Quote
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="services-footer">
        <div className="footer-note">
          <span className="note-icon">ℹ️</span>
          <div>
            All prices are inclusive of taxes. Services can be booked
            individually or combined into customized packages for better value.
          </div>
        </div>
        <button
          className="contact-btn-main"
          onClick={() =>
            window.open(
              "mailto:contact@eldercare.com?subject=Custom Package Inquiry",
              "_blank",
            )
          }
        >
          Contact for Custom Package
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
