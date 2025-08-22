// components/Quiz.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";

const Quiz = ({ onSuccess, onFailure, isOverlay = false }) => {
  const navigate = useNavigate();
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showBonusQuestion, setShowBonusQuestion] = useState(false);
  const [bonusAnswered, setBonusAnswered] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showFailureMessage, setShowFailureMessage] = useState(false);

  // All questions with correct answers
  const allQuestions = [
    {
      id: 1,
      text: "Wo din yaad hai jab do aankhen pehli baar mili thi? 👀💕",
      options: [
        "Mandir ke bahar",
        "Cafe ke kone mein",
        "Sadak par chalte hue",
        "Online chat box",
      ],
      correct: "Mandir ke bahar",
    },
    {
      id: 2,
      text: "Meri subah tabhi perfect hoti hai jab tumhare saath ek crispy aur golden surprise ho… kya hai wo? 🌅❤️🍽️",
      options: ["Pav Bhaji", "Dosa", "Waffle", "Chole Bhature"],
      correct: "Dosa",
    },

    {
      id: 3,
      text: "Woh gana jo mere dil ki awaaz hai, aur tum meri wajah ho... 🎶❤️",
      options: [
        "Tujhme Rab Dikhta Hai",
        "Kon Tujhe",
        "Tum Hi Ho",
        "Mere Hath Mein",
      ],
      correct: "Tum Hi Ho",
    },
    {
      id: 4,
      text: "Agar waqt ruk jaaye aur sirf ek pal ko hamesha jeena ho, toh wo kya hoga? ⏳❤️",
      options: [
        "Tumhari muskaan dekhna",
        "Tumhari baaton mein kho jaana",
        "Tumhari aankhon ko takna",
        "Tumhe gale lagana",
      ],
      correct: "Tumhari muskaan dekhna",
    },
    {
      id: 5,
      text: "Mere pyaar ka sabse bada sach kya hai? 💖",
      options: [
        "Tumhari muskaan",
        "Tumhari rooh",
        "Tumhara dil",
        "Sab kuch tum",
      ],
      correct: "Sab kuch tum",
    },
    {
      id: 6,
      text: "Agar dil se diya gaya tohfa chahiye ho toh wo kya hoga? 💌",
      options: [
        "Apni kahani likhna",
        "Shopping, Gifts",
        "Waqt dena",
        "Trip pe jana",
      ],
      correct: "Apni kahani likhna",
    },
    {
      id: 7,
      text: "Konsa mausam sirf tumhare saath adhoora nahi lagta? ❄️☀️🌧️🌸",
      options: [
        "Barfili sardiyan",
        "Tapti garmi",
        "Barsaat ki boonden",
        "Phoolon ka mausam",
      ],
      correct: "Barfili sardiyan",
    },
    {
      id: 8,
      text: "Har pyaar ka ek raaz hota hai, mera tumse juda hua ek shabd hai... kaunsa? 💕",
      options: ["Meri rooh", "Meri jaan", "Meri duniya", "Meri pari"],
      correct: "Meri jaan",
    },
    {
      id: 9,
      text: "Safar ki shuruaat mein humari pehli manzil kahan hogi? ✈️🏔️",
      options: ["Barsana", "Ujjain", "Manali", "Varanasi"],
      correct: "Varanasi",
    },
    {
      id: 10,
      text: "Dil ke khwab ka sabse bada sach kya hai? 💭💍",
      options: ["Zindagi bhar tum", "Bada ghar", "Shohrat", "Naye safar"],
      correct: "Zindagi bhar tum",
    },
  ];

  // Bonus question
const bonusQuestion = {
  text: "Hamari kahani mein woh kya hai jo har pal ko yaadgar banata hai? 💖✨",
  options: [
    "Hamari samajh aur baatein",
    "Hamari hasi, mazak aur khud ladai",
    "Hamari dosti aur vishwas",
    "Sab kuch jo hum share karte hain",
  ],
  correct: "Sab kuch jo hum share karte hain"
};

  // Select 5 random questions
  useEffect(() => {
    const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
    setSelectedQuestions(shuffled.slice(0, 5));
  }, []);

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const calculateScore = () => {
    let score = 0;
    userAnswers.forEach((answer, index) => {
      if (answer === selectedQuestions[index].correct) {
        score++;
      }
    });
    return score;
  };

  const handleNext = () => {
    // Store the answer
    const newAnswers = [...userAnswers, selectedAnswer];
    setUserAnswers(newAnswers);

    if (currentQuestionIndex < selectedQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
    } else {
      // Quiz completed, check score
      const score = calculateScore();

      if (score === 5) {
        // Perfect score - show success
        setQuizCompleted(true);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000);
      } else if (score === 4) {
        // Show bonus question
        setShowBonusQuestion(true);
        setSelectedAnswer(null);
      } else {
        // Score 1-3, show failure message
        setShowFailureMessage(true);
      }
    }
  };

  const handleBonusNext = () => {
    setBonusAnswered(true);

    // Check if bonus answer is correct
    if (selectedAnswer === bonusQuestion.correct) {
      setQuizCompleted(true);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    } else {
      setShowFailureMessage(true);
    }
  };

  const handleFinishQuiz = () => {
    if (isOverlay && onSuccess) {
      onSuccess();
    } else {
      navigate("/letter");
    }
  };

  const handleRetryQuiz = () => {
    // Reset all states
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setUserAnswers([]);
    setQuizCompleted(false);
    setShowBonusQuestion(false);
    setBonusAnswered(false);
    setShowFailureMessage(false);

    // Select new random questions
    const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
    setSelectedQuestions(shuffled.slice(0, 5));
  };

  const handleGoHome = () => {
    if (isOverlay && onFailure) {
      onFailure();
    } else {
      navigate("/");
    }
  };

  if (selectedQuestions.length === 0) {
    return (
      <div className={`romantic-quiz ${isOverlay ? "quiz-overlay" : ""}`}>
        <div className="question-card">
          <p>Loading your special questions... 💕</p>
        </div>
      </div>
    );
  }

  // Failure message screen
  if (showFailureMessage) {
    return (
      <div className={`romantic-quiz ${isOverlay ? "quiz-overlay" : ""}`}>
        <div className="failure-card">
          <h2>💕 We Don't Know Enough About Ourselves Yet 💕</h2>
          <p>
            It seems we need to spend more time getting to know each other
            better. Every relationship is a beautiful journey of discovery! 💖
          </p>
          <p>Let's create more memories together first... 🌸</p>
          <div className="failure-buttons">
            <button className="retry-btn" onClick={handleRetryQuiz}>
              Try Again 💪
            </button>
            <button className="home-btn" onClick={handleGoHome}>
              Go Home 🏠
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Bonus question screen
  if (showBonusQuestion && !bonusAnswered) {
    return (
      <div className={`romantic-quiz ${isOverlay ? "quiz-overlay" : ""}`}>
        {showConfetti && (
          <Confetti width={window.innerWidth} height={window.innerHeight} />
        )}

        <div className="question-card bonus-card">
          <div className="bonus-header">
            <h3>🎯 Bonus Question!</h3>
            <p>
              You scored 4/5! Answer this correctly to unlock your letter 💌
            </p>
          </div>

          <h2 className="question-title">{bonusQuestion.text}</h2>

          <div className="options">
            {bonusQuestion.options.map((option, index) => (
              <button
                key={index}
                className={`option-btn ${
                  selectedAnswer === option ? "selected" : ""
                }`}
                onClick={() => handleAnswerSelect(option)}
              >
                {option}
              </button>
            ))}
          </div>

          <button
            className="next-btn bonus-btn"
            onClick={handleBonusNext}
            disabled={!selectedAnswer}
          >
            Submit Final Answer 💖
          </button>
        </div>
      </div>
    );
  }

  // Success screen
  if (quizCompleted) {
    return (
      <div className={`romantic-quiz ${isOverlay ? "quiz-overlay" : ""}`}>
        {showConfetti && (
          <Confetti width={window.innerWidth} height={window.innerHeight} />
        )}

        <div className="completion-card">
          <h2>🎂 Perfect! You Know Me So Well 💕</h2>
          <p>
            Every answer shows how much you care and understand me. You've
            earned your special letter! 💖
          </p>
          <p className="heart">❤️❤️❤️</p>
          <button className="continue-btn" onClick={handleFinishQuiz}>
            {isOverlay ? "Open Letter 💌" : "Read Your Letter 💌"}
          </button>
        </div>
      </div>
    );
  }

  // Regular quiz questions
  const currentQuestion = selectedQuestions[currentQuestionIndex];

  return (
    <div className={`romantic-quiz ${isOverlay ? "quiz-overlay" : ""}`}>
      <div className="question-card" key={currentQuestionIndex}>
        <div className="question-progress">
          <span>
            {currentQuestionIndex + 1} / {selectedQuestions.length}
          </span>
        </div>

        <h2 className="question-title">{currentQuestion.text}</h2>

        <div className="options">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              className={`option-btn ${
                selectedAnswer === option ? "selected" : ""
              }`}
              onClick={() => handleAnswerSelect(option)}
            >
              {option}
            </button>
          ))}
        </div>

        <button
          className="next-btn"
          onClick={handleNext}
          disabled={!selectedAnswer}
        >
          {currentQuestionIndex === selectedQuestions.length - 1
            ? "Finish 💖"
            : "Next ➜"}
        </button>
      </div>
    </div>
  );
};

export default Quiz;
