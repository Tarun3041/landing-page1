import React, { useState, useEffect } from 'react';
import '../Styles/homecarousel.css';

interface CarouselSlide {
  id: number;
  title: string;
  content: string;
  image: string;
  color: string;
  icon: string;
}

const slides: CarouselSlide[] = [
  {
    id: 1,
    title: "OUR MISSION",
    content:
      "Building a Senior-Friendly India. While younger people easily handle daily chores, shopping, digital apps, social connections, bills, and paperwork—these very same tasks can feel overwhelming, or even out of reach, for our elders in their golden years. That's why our mission is simple: to make India a truly senior-friendly country. A country where every senior can live with dignity, respect, and independence.",
    image:
      "https://images.unsplash.com/photo-1581579431539-a7aa7c7a0c5e?auto=format&fit=crop&w=1600&q=80",
    color: "#29251f",
    icon: "🎯",
  },
  {
    id: 2,
    title: "OUR VALUES",
    content:
      "We value DEPTH: Dignity, Empathy, Patience, Transparency, and Honesty. Dignity, because every senior should be respected and valued, regardless of age or condition. Empathy, because truly understanding a senior's feelings and needs leads to personal and compassionate care. Patience, because seniors may move more slowly, forget things, or need more time (and that's perfectly okay). Transparency, because open communication with families and clear updates builds trust. Honesty because trust begins with truth, whether it's health concerns or care plans. DEPTH is what turns our service into a promise.",
    image:
      "https://images.unsplash.com/photo-1517486808906-6ca8b3f8f4be?auto=format&fit=crop&w=1600&q=80",
    color: "#29251f",
    icon: "❤️",
  },
  {
    id: 3,
    title: "CARE STORY",
    content:
      "Staying far away from your parents for work or study is not easy. You realize that your parents are getting old and they need someone by their side to manage with everyday mundane tasks. You may often wish that there was someone you can trust to fill in your shoes and personally take care of your parents' needs. Now Anvayaa provides senior home services operational in more than 25+ cities",
    image:
      "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1600&q=80",
    color: "#29251f",
    icon: "🏠",
  },
  {
    id: 4,
    title: "WHY SENIOR CARE?",
    content:
      "Every child wants to be there for their parents at their old age amidst their hectic schedule. It becomes very difficult to handle this as some of them stay far away from their parents. The reason why senior home care services are recommended is that the care given is personalized and the caretakers, nurses, caregivers are certified and trained in the service to caregiving. With technology entering every space of life, the process of elderly home care services has become even more convenient with real-time updates and easy communications.",
    image:
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1600&q=80",
    color: "#29251f",
    icon: "👵",
  },
  {
    id: 5,
    title: "HEALTH CARE SERVICES",
    content:
      "Everyone has a unique need, and we understand that. From being there for your parents for a casual conversation or for helping in a crisis, we do everything a family member could do for them.",
    image:
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=1600&q=80",
    color: "#29251f",
    icon: "🩺",
  },
];

const HomePage: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTransitioning) {
        setIsTransitioning(true);
        setCurrentIndex((prev) => (prev + 1) % slides.length);
      }
    }, 8000); // Slower auto-advance: every 8 seconds

    return () => clearInterval(interval);
  }, [isTransitioning]);

  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => setIsTransitioning(false), 2500); // Slow transition duration
      return () => clearTimeout(timer);
    }
  }, [isTransitioning, currentIndex]);

  const goToSlide = (index: number) => {
    if (!isTransitioning && index !== currentIndex) {
      setIsTransitioning(true);
      setCurrentIndex(index);
    }
  };

  const nextSlide = () => goToSlide((currentIndex + 1) % slides.length);
  const prevSlide = () => goToSlide((currentIndex - 1 + slides.length) % slides.length);

  return (
    <div className="homepage-wrapper">
      <div className="hero-slider">
        <div className="slides-container">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`slide ${index === currentIndex ? 'active' : ''} ${isTransitioning ? 'transitioning' : ''}`}
              style={{
                backgroundImage: `url(${slide.image})`,
                '--slide-color': slide.color,
              } as React.CSSProperties}
            >
              <div className="slide-overlay" />
              <div className="slide-content">
                <div className="icon-wrapper">
                  <span className="icon">{slide.icon}</span>
                </div>
                <h1 className="slide-title">{slide.title}</h1>
                <p className="slide-text">{slide.content}</p>
                {/* <div className="slide-actions">
                  <button className="cta-button" style={{ '--btn-color': slide.color } as React.CSSProperties}>
                    Learn More
                  </button>
                </div> */}
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button className="nav-arrow prev" onClick={prevSlide}>
          ‹
        </button>
        <button className="nav-arrow next" onClick={nextSlide}>
          ›
        </button>

        {/* Dots */}
        <div className="slider-dots">
          {slides.map((_, idx) => (
            <button
              key={idx}
              className={`dot ${idx === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(idx)}
              style={{ '--dot-color': slides[idx].color } as React.CSSProperties}
            />
          ))}
        </div>

        {/* Progress Bar */}
        <div className="progress-container">
          <div
            className="progress-bar"
            style={{
              width: `${((8000 - (Date.now() % 8000)) / 8000) * 100}%`,
              backgroundColor: slides[currentIndex].color,
            }}
          />
        </div>
      </div>

      {/* Footer Teaser */}
      <footer className="homepage-footer">
        <p>&copy; 2024 Anvayaa Senior Care. Building Dignified Futures.</p>
      </footer>
    </div>
  );
};

export default HomePage;