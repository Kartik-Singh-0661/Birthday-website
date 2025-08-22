import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const FloatingElement = ({ emoji, delay, duration, xOffset }) => {
  return (
    <div
      className="absolute text-3xl pointer-events-none z-10"
      style={{
        left: `${Math.random() * 80 + 10}%`,
        animation: `float ${duration}s ease-out ${delay}s forwards`,
        transform: `translateX(${xOffset}px)`
      }}
    >
      {emoji}
    </div>
  );
};

const AnimatedEmoji = ({ emoji, delay, size = "normal" }) => {
  const emojiSize = size === "large" ? "text-4xl" : "text-2xl";
  return (
    <span
      className={`inline-block ${emojiSize}`}
      style={{
        animation: `bounce 2s ease-in-out ${delay}s infinite, sparkle 4s ease-in-out ${delay}s infinite`
      }}
    >
      {emoji}
    </span>
  );
};

const HeroSection = () => {
  const [showFloatingElements, setShowFloatingElements] = useState(true);
  const navigate = useNavigate();
  
  const handleEnterClick = () => {
    // Add ripple effect before navigation
    const button = document.querySelector(".enter-button");
    if (button) {
      button.classList.add("button-pressed");
      setTimeout(() => {
        button.classList.remove("button-pressed");
        navigate("/timeline");
      }, 500);
    }
  };

  const romanticElements = [
    "💖", "🌹", "💕", "🎂", "🎀", "✨", "💝", "🎈", "🥰", "😘",
    "💓", "💗", "💞", "💟", "🧡", "💛", "💚", "💙", "💜", "🤍"
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFloatingElements(false);
    }, 20000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <style jsx global>{`
        @keyframes float {
          0% { 
            transform: translateY(100vh) translateX(0) rotate(0deg);
            opacity: 0;
          }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { 
            transform: translateY(-20vh) translateX(30px) rotate(360deg);
            opacity: 0;
          }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(50px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          0% { opacity: 0; transform: scale(0.8); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes buttonScale {
          0% { opacity: 0; transform: scale(0); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes floatingHearts {
          0% { 
            opacity: 0;
            transform: scale(0) translateY(0);
          }
          20% { opacity: 1; transform: scale(1) translateY(-10px); }
          80% { opacity: 1; transform: scale(1) translateY(-40px); }
          100% { 
            opacity: 0;
            transform: scale(0) translateY(-100px);
          }
        }
        @keyframes sparkle {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; text-shadow: 0 0 10px rgba(255,255,255,0.8); }
        }
        @keyframes ripple {
          0% { transform: scale(0); opacity: 1; }
          100% { transform: scale(3); opacity: 0; }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .gradient-bg {
          background: linear-gradient(-45deg, #ff9a9e, #fad0c4, #fbc2eb, #a6c1ee);
          background-size: 400% 400%;
          animation: gradient 12s ease infinite;
        }
        .fade-in-up {
          animation: fadeInUp 1s ease-out 0.5s forwards;
          opacity: 0;
        }
        .scale-in {
          animation: scaleIn 0.8s ease-out 1s forwards;
          opacity: 0;
        }
        .fade-in-up-delayed {
          animation: fadeInUp 0.8s ease-out 1.5s forwards;
          opacity: 0;
        }
        .button-scale {
          animation: buttonScale 0.6s ease-out 2s forwards;
          opacity: 0;
        }
        .enter-button {
          transition: all 0.3s ease;
        }
        .enter-button:hover {
          transform: scale(1.05) translateY(-3px);
          box-shadow: 0 15px 30px rgba(236, 72, 153, 0.4);
        }
        .enter-button:active {
          transform: scale(0.98);
        }
        .button-pressed {
          animation: pulse 0.5s ease;
        }
        .ripple {
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.6);
          transform: scale(0);
          animation: ripple 0.6s linear;
          pointer-events: none;
        }
        .floating-hearts {
          animation: floatingHearts 4s ease-in-out infinite;
        }
        .sparkle-effect {
          animation: sparkle 3s ease-in-out infinite;
        }
        .romantic-text {
          text-shadow: 1px 1px 3px rgba(0,0,0,0.2);
        }
        .header-glow {
          text-shadow: 0 0 10px rgba(255,192,203,0.7);
        }
      `}</style>

      {/* Animated Gradient Background */}
      <div className="absolute inset-0 gradient-bg opacity-90" />

      {/* Floating Romantic Elements */}
      {showFloatingElements && (
        <>
          {Array.from({ length: 5 }).map((_, i) => (
            <FloatingElement
              key={i}
              emoji={romanticElements[i % romanticElements.length]}
              delay={i * 0.5}
              duration={10 + Math.random() * 5}
              xOffset={Math.random() * 100 - 50}
            />
          ))}
        </>
      )}

      {/* Main Content */}
      <div className="relative z-20 min-h-screen flex flex-col items-center justify-center text-center px-4 py-12">
        {/* Romantic Header with Glow Effect */}
        <div className="mb-8 scale-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-pink-500 romantic-text header-glow">
            <AnimatedEmoji emoji="🎂" delay={0} size="sma" />
            <span className="mx-3">Happy Birthday</span>
            <AnimatedEmoji emoji="💌" delay={0.3} size="large" />
          </h1>
          <h2 className="text-3xl md:text-5xl font-semibold text-white mb-4 romantic-text">
            My sunshine{" "}
            <span className="text-pink-700">
              Retika💫
              <AnimatedEmoji emoji="🌹" delay={0.6} />
            </span>
          </h2>
        </div>

        {/* Romantic Messages with Fade-in */}
        <div className="max-w-2xl mb-8 fade-in-up-delayed">
          <p className="text-xl md:text-2xl text-white font-medium mb-4 leading-relaxed romantic-text">
            Every day with you is a gift I cherish deeply
            <AnimatedEmoji emoji="🎁" delay={1.2} />
          </p>
         
          <p className="text-md md:text-lg text-pink-500 italic">
            "Your smile is great, but those dimples? That’s what really gets me."
            <AnimatedEmoji emoji="💫" delay={1.8} />
          </p>
        </div>

        {/* Enhanced Button with Ripple Effect */}
        <button
          onClick={handleEnterClick}
          className="relative overflow-hidden enter-button button-scale px-12 py-4 rounded-full font-semibold text-xl shadow-xl transform transition-all duration-300"
          style={{
            background: "linear-gradient(45deg, #ff6b9d, #ff8e9e)",
            color: "white",
            border: "none",
            outline: "none"
          }}
        >
          <span className="relative z-10 flex items-center gap-3">
            <AnimatedEmoji emoji="🎀" delay={2.1} />
           Moments With You
            <AnimatedEmoji emoji="💞" delay={2.4} />
          </span>
        </button>

        {/* Floating Hearts Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={`heart-${i}`}
              className="absolute text-3xl text-pink-300 floating-hearts opacity-70"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`,
                fontSize: `${Math.random() * 20 + 20}px`
              }}
            >
              {["💖", "💓", "💘"][Math.floor(Math.random() * 3)]}
            </div>
          ))}
        </div>

        {/* Sparkle Effects */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={`sparkle-${i}`}
              className="absolute text-yellow-200 text-xl sparkle-effect"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            >
              ✨
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;