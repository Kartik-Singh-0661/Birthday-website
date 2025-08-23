// components/BirthdayLetter.js
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Quiz from "./Quiz";
import QuizLoader from "./QuizLoader";

const BirthdayLetter = () => {
  const navigate = useNavigate();
  const contentRef = useRef(null);
  const [displayedText, setDisplayedText] = useState("");
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [showButton, setShowButton] = useState(false);
  const [showEnvelope, setShowEnvelope] = useState(true);
  const [showLetter, setShowLetter] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [showQuizLoader, setShowQuizLoader] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizPassed, setQuizPassed] = useState(false);

  // Responsive dimensions
  const letterDimensions = {
    width: "90vw",
    maxWidth: "700px",
    height: "85vh",
    minHeight: "400px",
  };

  const fullLetter = [
    "Retika,\n" +
      "Happy Birthday🎂 jaan.\n" +
      "Sach kahun toh tujhe dekh ke lagta hai zindagi ne mujhe kisi khaas wajah se tumse milaya hai.\n" +
      "Tera smile... especially jab woh dimple dikhte hain — bas sab kuch theek lagne lagta hai.\n" +
      "Main har din grateful hoon ki tu meri life mein hai.\n" +
      "Tu sirf pyaar nahi hai, tu mera comfort hai, mera safest space.\n" +
      "Tere saath har chhoti baat bhi special lagti hai.\n" +
      "Main promise karta hoon, chahe time jaise bhi badle,\n" +
      "main tujhe waise hi pyaar karunga — bina kisi shart ke.\n" +
      "Tu meri best feeling hai, sunshine.\n" +
      "or haan ma'am maine apna b'day per letter dene wala promise bhi pura kardia tho ab noo fighting.\n" +
      "Enjoy your Trip safe journey.\n" +
      "Hamesha tere saath, bhut sara lub zuuu....😘\n" +
      "Kartik 💖",
  ];

  // Handle envelope click - now shows quiz loader first
  const handleEnvelopeClick = () => {
    if (!quizPassed) {
      // Show quiz loader with romantic lines
      setShowQuizLoader(true);
    } else {
      // Quiz already passed, open letter directly
      openLetter();
    }
  };

  // Handle quiz loader completion
  const handleLoaderComplete = () => {
    setShowQuizLoader(false);
    setShowQuiz(true);
  };

  // Open letter with animation
  const openLetter = () => {
    setIsOpening(true);
    setTimeout(() => {
      setShowEnvelope(false);
      setShowLetter(true);
    }, 1000);
  };

  // Handle quiz success
  const handleQuizSuccess = () => {
    setQuizPassed(true);
    setShowQuiz(false);
    openLetter();
  };

  // Handle quiz failure
  const handleQuizFailure = () => {
    setShowQuiz(false);
    // Navigate back to home after quiz failure
    navigate("/");
  };

  // Typewriter effect - only runs after quiz is passed
  useEffect(() => {
    if (!showLetter || !quizPassed) return;

    if (currentLine < fullLetter.length) {
      const currentLineText = fullLetter[currentLine];

      if (currentChar < currentLineText.length) {
        const timeout = setTimeout(
          () => {
            setDisplayedText((prev) => prev + currentLineText[currentChar]);
            setCurrentChar((prev) => prev + 1);

            // Auto-scroll to bottom when typing
            if (contentRef.current) {
              contentRef.current.scrollTop = contentRef.current.scrollHeight;
            }
          },
          currentLine === 0 ? 120 : 50 + Math.random() * 30
        );

        return () => clearTimeout(timeout);
      } else {
        setTimeout(
          () => {
            setCurrentLine((prev) => prev + 1);
            setCurrentChar(0);
          },
          currentLine === fullLetter.length - 2 ? 1000 : 300
        );
      }
    } else {
      setTimeout(() => {
        setShowButton(true);
      }, 1500);
    }
  }, [currentLine, currentChar, showLetter, quizPassed]);

  // Show quiz loader with romantic messages
  if (showQuizLoader) {
    return <QuizLoader onComplete={handleLoaderComplete} />;
  }

  // Show quiz overlay
  if (showQuiz) {
    return (
      <Quiz 
        onSuccess={handleQuizSuccess}
        onFailure={handleQuizFailure}
        isOverlay={true}
      />
    );
  }

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center p-2 bg-gradient-to-br from-rose-50 to-amber-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Add Google Fonts link for handwriting style */}
      <link
        href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&family=Kalam:wght@300;400;700&display=swap"
        rel="stylesheet"
      />
      
      {/* Envelope animation */}
      <AnimatePresence>
        {showEnvelope && (
          <motion.div
            className="relative cursor-pointer"
            onClick={handleEnvelopeClick}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Envelope back */}
            <div className="relative w-64 h-40">
              {/* Envelope base */}
              <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-br from-pink-400 to-rose-500 rounded-lg shadow-lg z-2"></div>

              {/* Envelope flap */}
              <motion.div
                className={`absolute top-0 left-0 w-full h-20 bg-gradient-to-br from-pink-300 to-rose-400 origin-top rounded-t-lg ${
                  isOpening && `hidden`
                }`}
                initial={{ rotateX: 0, zIndex: 2 }}
                animate={
                  isOpening
                    ? {
                        rotateX: 180,
                        y: -10,
                        transition: { duration: 0.5 },
                      }
                    : { rotateX: 0 }
                }
              />

              {/* Letter inside envelope */}
              <motion.div
                className={`absolute top-4 left-4 right-4 bg-[#f9f3e6] rounded-sm shadow-sm z-1 `}
                initial={{ height: "28px", y: 0 }}
                animate={
                  isOpening
                    ? {
                        height: "120px",
                        y: -60,
                        transition: {
                          delay: 0.3,
                          duration: 0.7,
                          ease: "easeOut",
                        },
                      }
                    : {}
                }
                style={{ width: "calc(100% - 32px)" }}
              >
                {/* Small peek of letter content before opening */}
                {isOpening && (
                  <div
                    className="p-2 text-xs text-gray-500 truncate "
                    style={{
                      fontFamily: "'Dancing Script', cursive, 'Kalam', cursive",
                    }}
                  >
                    My Dearest Retika...
                  </div>
                )}
              </motion.div>

              {/* Heart seal */}
              <motion.div
                className="absolute top-4 left-1/2 transform -translate-x-1/2 text-white text-2xl z-10"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
              >
                {!isOpening && "❤️"}
              </motion.div>
            </div>

            {/* "Click me" text - only shows before opening and if quiz not passed */}
            {!isOpening && !quizPassed && (
              <motion.div
                className="absolute -bottom-10 left-0 right-0 text-center mt-4 text-rose-600 font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                Click to open your letter
              </motion.div>
            )}

            {/* Special message if quiz already passed */}
            {!isOpening && quizPassed && (
              <motion.div
                className="absolute -bottom-10 left-0 right-0 text-center mt-4 text-green-600 font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                You passed! Click to read your letter 💕
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Letter container - appears after envelope and quiz success */}
      {showLetter && quizPassed && (
        <motion.div
          className="relative bg-[#f9f3e6] rounded-lg"
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.7, type: "spring" }}
          style={{
            ...letterDimensions,
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            border: "1px solid rgba(0,0,0,0.1)",
          }}
        >
          {/* Scrollable content area - scrollbar hidden */}
          <div
            ref={contentRef}
            className="h-[calc(100%-70px)] overflow-y-auto p-4 md:p-8"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {/* Hide scrollbar for Chrome/Safari */}
            <style jsx>{`
              div::-webkit-scrollbar {
                display: none;
              }
            `}</style>

            {/* Letter content */}
            <motion.div
              className="whitespace-pre-wrap font-serif text-gray-800"
              style={{
                fontFamily: "'Dancing Script', cursive, 'Kalam', cursive",
                fontSize: "clamp(1rem, 4vw, 1.25rem)",
                padding: "clamp(1rem, 3vw, 2rem)",
                lineHeight: "1.8",
                overflowWrap: "break-word",
                wordWrap: "break-word",
                hyphens: "auto",
                minHeight: "100%",
                marginBottom: "2rem",
                fontWeight: 400,
              }}
            >
              {displayedText}
              {/* Cursor */}
              {currentLine < fullLetter.length && (
                <motion.span
                  className="inline-block align-middle"
                  style={{
                    width: "1px",
                    height: "1.2rem",
                    backgroundColor: "#f43f5e",
                    marginLeft: "2px",
                  }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                  }}
                />
              )}
            </motion.div>
          </div>

          {/* Continue button */}
          {showButton && (
            <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-4">
              <motion.button
                className="bg-gradient-to-r from-rose-400 to-pink-500 text-white px-6 py-3 rounded-full shadow-lg text-sm md:text-base mx-auto"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/")}
                style={{
                  marginTop: "1rem",
                }}
              >
                Thankyou ❣️
              </motion.button>
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

export default BirthdayLetter;
