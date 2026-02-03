import { useState, useEffect, useCallback } from "react";
import "../Styles/homeCarousel.css";

interface CarouselSlide {
  id: number;
  title: string;
  content: string;
  image: string;
  color: string;
  icon: string;
}

export default function HomeCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slides: CarouselSlide[] = [
    {
      id: 1,
      title: "OUR MISSION",
      content:
        "Building a Senior-Friendly India. While younger people easily handle daily chores, shopping, digital apps, social connections, bills, and paperwork—these very same tasks can feel overwhelming, or even out of reach, for our elders in their golden years. That's why our mission is simple: to make India a truly senior-friendly country. A country where every senior can live with dignity, respect, and independence.",
      image:
        "https://images.unsplash.com/photo-1581579431539-a7aa7c7a0c5e?auto=format&fit=crop&w=1600&q=80",
      color: "#3B82F6",
      icon: "🎯",
    },
    {
      id: 2,
      title: "OUR VALUES",
      content:
        "We value DEPTH: Dignity, Empathy, Patience, Transparency, and Honesty. Dignity, because every senior should be respected and valued, regardless of age or condition. Empathy, because truly understanding a senior's feelings and needs leads to personal and compassionate care. Patience, because seniors may move more slowly, forget things, or need more time (and that's perfectly okay). Transparency, because open communication with families and clear updates builds trust. Honesty because trust begins with truth, whether it's health concerns or care plans. DEPTH is what turns our service into a promise.",
      image:
        "https://images.unsplash.com/photo-1517486808906-6ca8b3f8f4be?auto=format&fit=crop&w=1600&q=80",
      color: "#10B981",
      icon: "❤️",
    },
    {
      id: 3,
      title: "CARE STORY",
      content:
        "Staying far away from your parents for work or study is not easy. You realize that your parents are getting old and they need someone by their side to manage with everyday mundane tasks. You may often wish that there was someone you can trust to fill in your shoes and personally take care of your parents' needs. Now Anvayaa provides senior home services operational in more than 25+ cities",
      image:
        "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1600&q=80",
      color: "#8B5CF6",
      icon: "🏠",
    },
    {
      id: 4,
      title: "WHY SENIOR CARE?",
      content:
        "Every child wants to be there for their parents at their old age amidst their hectic schedule. It becomes very difficult to handle this as some of them stay far away from their parents. The reason why senior home care services are recommended is that the care given is personalized and the caretakers, nurses, caregivers are certified and trained in the service to caregiving. With technology entering every space of life, the process of elderly home care services has become even more convenient with real-time updates and easy communications.",
      image:
        "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1600&q=80",
      color: "#F59E0B",
      icon: "👵",
    },
    {
      id: 5,
      title: "HEALTH CARE SERVICES",
      content:
        "Everyone has a unique need, and we understand that. From being there for your parents for a casual conversation or for helping in a crisis, we do everything a family member could do for them.",
      image:
        "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=1600&q=80",
      color: "#EC4899",
      icon: "🩺",
    },
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((p) => (p === slides.length - 1 ? 0 : p + 1));
  }, [slides.length]);

  const prevSlide = () => {
    setCurrentSlide((p) => (p === 0 ? slides.length - 1 : p - 1));
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const id = setInterval(nextSlide, 5000);
    return () => clearInterval(id);
  }, [isAutoPlaying, nextSlide]);

  return (
    <div
      className="carousel-container1"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className="carousel-wrapper1">
        <div className="carousel-progress1">
          {slides.map((_, i) => (
            <div key={i} className="progress-bar1">
              <div
                className="progress-fill1"
                style={{
                  width: currentSlide === i ? "100%" : "0%",
                  transition: currentSlide === i ? "width 5s linear" : "none",
                }}
              />
            </div>
          ))}
        </div>

        <div
          className="slides-container"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide) => (
            <div key={slide.id} className="slide">
              <div className="slide-content">
                <div className="content-wrapper">
                  <div className="slide-header">
                    <span className="slide-icon">{slide.icon}</span>
                    <h2 className="slide-title" style={{ color: slide.color }}>
                      {slide.title}
                    </h2>
                  </div>
                  <p className="slide-text">{slide.content}</p>

                  <div className="slide-stats">
                    <div className="stat-item">
                      <span className="stat-number">25+</span>
                      <span className="stat-label">Cities</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-number">1000+</span>
                      <span className="stat-label">Families</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-number">24/7</span>
                      <span className="stat-label">Support</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="slide-image">
                <img src={slide.image} alt={slide.title} />
              </div>
            </div>
          ))}
        </div>

        <button
          className="nav-btn1 prev-btn1"
          onClick={prevSlide}
          aria-label="Previous"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <button
          className="nav-btn1 next-btn1"
          onClick={nextSlide}
          aria-label="Next"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>

       

        <div className="dots-container">
          {slides.map((s, i) => (
            <button
              key={s.id}
              className={`dot ${currentSlide === i ? "active" : ""}`}
              onClick={() => setCurrentSlide(i)}
              style={{
                backgroundColor:
                  currentSlide === i ? slides[i].color : "#CBD5E1",
              }}
            />
          ))}
        </div>

        <div className="slide-indicator">
          {String(currentSlide + 1).padStart(2, "0")} /{" "}
          {String(slides.length).padStart(2, "0")}
        </div>
      </div>
    </div>
  );
}
