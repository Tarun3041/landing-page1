import React, { useState, useEffect } from "react";
import "../Styles/homecarousel.css";

interface CarouselSlide {
  id: number;
  title: string;
  content: string;
  image: string;
}

const slides: CarouselSlide[] = [
  {
    id: 1,
    title: "OUR MISSION",
    content:
      "Our care companions bring more than just help, they bring heart. They listen like a curious child, share interesting stories over tea, accompany walks to the park, and even celebrate the birthdays of your elderly loved ones. Why? Because real care isn't just about doctor visits and medicine delivery. It's about providing companionship - just like a real family.",
    image:
      "https://images.unsplash.com/photo-1517486808906-6ca8b3f8f4be?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: 2,
    title: "OUR VALUES",
    content:
      "During a crisis, most elder care programs wait for a call before acting. But with our proactive, proudly patented solutions, like wearable watches and ratan pendant, help arrives even when you can't call for it. Here's how it works: our safety solutions monitor health vitals 24/7. If an anomaly is detected, an instant alert goes to our care team for immediate action.",
    image:
      "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: 3,
    title: "CARE STORY",
    content:
      "Many employees juggle their careers while worrying about the wellbeing of their elders. This constant concern diverts their focus from work. That's where our anvayaa Nishchint Solution comes in; it empowers employers to help their employees balance both work and family wellbeing. The result? Peace of mind, increased productivity, and better employee retention.",
    image:
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: 4,
    title: "CARE STORY",
    content:
      "Many employees juggle their careers while worrying about the wellbeing of their elders. This constant concern diverts their focus from work. That's where our anvayaa Nishchint Solution comes in; it empowers employers to help their employees balance both work and family wellbeing. The result? Peace of mind, increased productivity, and better employee retention.",
    image:
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: 5,
    title: "CARE STORY",
    content:
      "Many employees juggle their careers while worrying about the wellbeing of their elders. This constant concern diverts their focus from work. That's where our anvayaa Nishchint Solution comes in; it empowers employers to help their employees balance both work and family wellbeing. The result? Peace of mind, increased productivity, and better employee retention.",
    image:
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: 6,
    title: "CARE STORY",
    content:
      "Many employees juggle their careers while worrying about the wellbeing of their elders. This constant concern diverts their focus from work. That's where our anvayaa Nishchint Solution comes in; it empowers employers to help their employees balance both work and family wellbeing. The result? Peace of mind, increased productivity, and better employee retention.",
    image:
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=1600&q=80",
  },
];

const HomePage: React.FC = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="carousel">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`carousel-slide ${index === current ? "active" : ""}`}
          style={{ backgroundImage: `url(${slide.image})` }}
        >
          <div className="overlay" />

          <div className="content">
            <h1>{slide.title}</h1>
            <p>{slide.content}</p>
            <button>Explore More</button>
          </div>
        </div>
      ))}

      <div className="dots">
        {slides.map((_, i) => (
          <span
            key={i}
            className={i === current ? "dot active" : "dot"}
            onClick={() => setCurrent(i)}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
