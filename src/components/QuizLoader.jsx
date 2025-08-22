// components/QuizLoader.js
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const QuizLoader = ({ onComplete }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);

  // Funny romantic Hindi lines
  const slides = [
    {
      text: "Arre yaar... 😅",
      subtext: "Ese kese letter khol dogi?",
      emoji: "📝"
    },
    {
      text: "Pehle kuch sawal ke jawab to dedo! 😉",
      subtext: "Kitna jaanti ho mujhe?",
      emoji: "🤔"
    },
    {
      text: "Love test lena padega! 💕",
      subtext: "Are you ready baby?",
      emoji: "❤️"
    },
    {
      text: "Sab kuch sahi batana... 😏",
      subtext: "Warna letter nahi milega!",
      emoji: "😘"
    },
    {
      text: "Chalo start karte hain! 🎯",
      subtext: "All the best my jaan!",
      emoji: "🚀"
    }
  ];

  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => {
        if (prev < slides.length - 1) {
          return prev + 1;
        } else {
          clearInterval(slideTimer);
          setTimeout(() => {
            onComplete();
          }, 1000);
          return prev;
        }
      });
    }, 2000); // 2 seconds per slide

    return () => clearInterval(slideTimer);
  }, [onComplete, slides.length]);

  useEffect(() => {
    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + (100 / (slides.length * 20)); // 20 updates per slide
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, 100); // Update every 100ms

    return () => clearInterval(progressTimer);
  }, [slides.length]);

  // Inline styles
  const loaderStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)',
    overflow: 'hidden',
    fontFamily: "'Poppins', sans-serif"
  };

  const floatingHeartsStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none'
  };

  const heartStyle = {
    position: 'absolute',
    fontSize: '2rem',
    pointerEvents: 'none',
    color: 'rgba(255, 255, 255, 0.6)'
  };

  const contentStyle = {
    position: 'relative',
    zIndex: 10,
    textAlign: 'center',
    maxWidth: '400px',
    width: '100%',
    padding: '0 1.5rem'
  };

  const slideContainerStyle = {
    marginBottom: '2rem'
  };

  const emojiStyle = {
    fontSize: '4rem',
    marginBottom: '1rem',
    animation: 'bounce 1s infinite'
  };

  const textStyle = {
    fontSize: '1.75rem',
    fontWeight: 'bold',
    color: 'white',
    marginBottom: '0.5rem',
    fontFamily: "'Dancing Script', cursive",
    textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
  };

  const subtextStyle = {
    fontSize: '1.125rem',
    color: 'rgba(255, 255, 255, 0.9)',
    fontFamily: "'Poppins', sans-serif"
  };

  const progressContainerStyle = {
    marginBottom: '1.5rem'
  };

  const progressBarStyle = {
    width: '100%',
    height: '8px',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: '9999px',
    overflow: 'hidden',
    marginBottom: '0.5rem'
  };

  const progressFillStyle = {
    height: '100%',
    background: 'linear-gradient(90deg, #ff758c, #ff7eb3)',
    borderRadius: '9999px',
    boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
    transition: 'width 0.3s ease'
  };

  const progressTextStyle = {
    fontSize: '0.875rem',
    color: 'white',
    opacity: 0.8,
    fontWeight: '500'
  };

  const indicatorsStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '0.5rem',
    marginBottom: '1.5rem'
  };

  const indicatorStyle = (isActive) => ({
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: isActive ? 'white' : 'rgba(255, 255, 255, 0.4)',
    transition: 'all 0.3s ease',
    transform: isActive ? 'scale(1.25)' : 'scale(1)'
  });

  const spinnerStyle = {
    display: 'flex',
    justifyContent: 'center'
  };

  const heartSpinnerStyle = {
    fontSize: '1.5rem',
    animation: 'spin 2s linear infinite'
  };

  return (
    <motion.div
      style={loaderStyle}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Add keyframe animations */}
      <style>
        {`
          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {
              transform: translateY(0);
            }
            40% {
              transform: translateY(-10px);
            }
            60% {
              transform: translateY(-5px);
            }
          }
          
          @keyframes spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
          
          @keyframes floatUp {
            0% {
              transform: translateY(100vh) rotate(0deg);
              opacity: 0;
            }
            10% {
              opacity: 0.6;
            }
            90% {
              opacity: 0.6;
            }
            100% {
              transform: translateY(-100px) rotate(360deg);
              opacity: 0;
            }
          }
        `}
      </style>

      {/* Background with floating hearts */}
      <div style={floatingHeartsStyle}>
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              ...heartStyle,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [100, -100],
              opacity: [0, 0.6, 0],
              rotate: [0, 360]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "linear"
            }}
          >
            💖
          </motion.div>
        ))}
      </div>

      {/* Content Container */}
      <div style={contentStyle}>
        {/* Main Slide */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            style={slideContainerStyle}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <div style={emojiStyle}>{slides[currentSlide].emoji}</div>
            <h2 style={textStyle}>{slides[currentSlide].text}</h2>
            <p style={subtextStyle}>{slides[currentSlide].subtext}</p>
          </motion.div>
        </AnimatePresence>

        {/* Progress Bar */}
        <div style={progressContainerStyle}>
          <div style={progressBarStyle}>
            <motion.div
              style={{
                ...progressFillStyle,
                width: `${progress}%`
              }}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "easeOut" }}
            />
          </div>
          <div style={progressTextStyle}>
            {Math.round(progress)}% Loading...
          </div>
        </div>

        {/* Slide Indicators */}
        <div style={indicatorsStyle}>
          {slides.map((_, index) => (
            <div
              key={index}
              style={indicatorStyle(index <= currentSlide)}
            />
          ))}
        </div>

        {/* Loading Animation */}
        <div style={spinnerStyle}>
          <div style={heartSpinnerStyle}>💝</div>
        </div>
      </div>
    </motion.div>
  );
};

export default QuizLoader;
