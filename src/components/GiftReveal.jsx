// components/GiftReveal.jsx
import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const GiftReveal = () => {
  const [opened, setOpened] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef(null);
  const navigate = useNavigate();

  const handleVideoLoad = () => {
    setVideoLoaded(true);
  };

  const handlePlayVideo = () => {
    setShowVideo(true);
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <style jsx global>{`
        @keyframes sparkleFloat {
          0%, 100% { 
            transform: translateY(0px) scale(1) rotate(0deg);
            opacity: 0.7;
          }
          50% { 
            transform: translateY(-10px) scale(1.1) rotate(180deg);
            opacity: 1;
          }
        }
        
        @keyframes giftBounce {
          0%, 100% { 
            transform: translateY(0px) scale(1);
          }
          50% { 
            transform: translateY(-8px) scale(1.02);
          }
        }
        
        @keyframes heartFloat {
          0% { 
            transform: translateY(20px) scale(0);
            opacity: 0;
          }
          20% { 
            opacity: 1;
            transform: translateY(0px) scale(1);
          }
          80% { 
            opacity: 1;
            transform: translateY(-30px) scale(1.1);
          }
          100% { 
            transform: translateY(-60px) scale(0);
            opacity: 0;
          }
        }
        
        @keyframes confettiDrop {
          0% {
            transform: translateY(-100px) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        
        @keyframes dreamyGradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes glow {
          0%, 100% { 
            box-shadow: 0 0 20px rgba(255, 105, 180, 0.6);
          }
          50% { 
            box-shadow: 0 0 40px rgba(255, 105, 180, 0.9), 0 0 60px rgba(255, 182, 193, 0.6);
          }
        }
        
        .dreamy-bg {
          background: linear-gradient(-45deg, 
            #ffeef8, #fff0f8, #ffe6f2, #ffd1dc, 
            #ffb6c1, #ffc0cb, #e6e6fa, #f0e6ff
          );
          background-size: 400% 400%;
          animation: dreamyGradient 15s ease infinite;
        }
        
        .gift-container {
          position: relative;
          display: inline-block;
          animation: giftBounce 3s ease-in-out infinite;
        }
        
        .gift-box {
          width: 140px;
          height: 140px;
          background: linear-gradient(135deg, #ff6b9d 0%, #ff8e9e 50%, #ffb3d9 100%);
          border-radius: 12px;
          position: relative;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          box-shadow: 
            0 10px 30px rgba(255, 107, 157, 0.4),
            inset 0 2px 0 rgba(255, 255, 255, 0.3),
            inset 0 -2px 0 rgba(0, 0, 0, 0.1);
          animation: glow 2s ease-in-out infinite;
        }
        
        .gift-box:hover {
          transform: scale(1.1) rotate(2deg);
          box-shadow: 
            0 15px 40px rgba(255, 107, 157, 0.6),
            inset 0 2px 0 rgba(255, 255, 255, 0.4);
        }
        
        .gift-box:active {
          transform: scale(0.95);
        }
        
        .ribbon-v {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 24px;
          height: 100%;
          background: linear-gradient(90deg, #e91e63, #f06292, #f8bbd9);
          border-radius: 2px;
          box-shadow: 
            inset 2px 0 4px rgba(255, 255, 255, 0.3),
            inset -2px 0 4px rgba(0, 0, 0, 0.2);
        }
        
        .ribbon-h {
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
          width: 100%;
          height: 24px;
          background: linear-gradient(0deg, #e91e63, #f06292, #f8bbd9);
          border-radius: 2px;
          box-shadow: 
            inset 0 2px 4px rgba(255, 255, 255, 0.3),
            inset 0 -2px 4px rgba(0, 0, 0, 0.2);
        }
        
        .bow {
          position: absolute;
          top: -15px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 2rem;
          filter: drop-shadow(0 4px 8px rgba(233, 30, 99, 0.4));
        }
        
        .sparkle-float {
          animation: sparkleFloat 3s ease-in-out infinite;
        }
        
        .heart-float {
          animation: heartFloat 3s ease-in-out infinite;
        }
        
        .confetti-drop {
          animation: confettiDrop 3s linear infinite;
        }
        
        .glass-card {
          backdrop-filter: blur(15px);
          background: rgba(255, 255, 255, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }
        
        /* Mobile optimizations */
        @media (max-width: 768px) {
          .gift-box {
            width: 120px;
            height: 120px;
          }
          
          .ribbon-v {
            width: 20px;
          }
          
          .ribbon-h {
            height: 20px;
          }
          
          .bow {
            top: -12px;
            font-size: 1.5rem;
          }
        }
        
        @media (max-width: 480px) {
          .gift-box {
            width: 100px;
            height: 100px;
          }
          
          .ribbon-v {
            width: 18px;
          }
          
          .ribbon-h {
            height: 18px;
          }
          
          .bow {
            top: -10px;
            font-size: 1.2rem;
          }
        }
      `}</style>

      {/* Dreamy Background */}
      <div className="absolute inset-0 dreamy-bg" />

      {/* Floating Sparkles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={`sparkle-${i}`}
            className="absolute text-pink-300 text-lg md:text-xl sparkle-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          >
            ✨
          </div>
        ))}
      </div>

      <motion.div 
        className="min-h-screen flex flex-col items-center justify-center relative z-10 px-4 py-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <AnimatePresence mode="wait">
          {!opened ? (
            // Simple Gift Box Section
            <motion.div
              key="giftbox"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, y: -100 }}
              transition={{ type: "spring", damping: 15, stiffness: 100 }}
              className="text-center w-full max-w-md mx-auto"
            >
              <div className="relative flex justify-center mb-8">
                <motion.div
                  className="gift-container"
                  onClick={() => setOpened(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="gift-box">
                    <div className="ribbon-v"></div>
                    <div className="ribbon-h"></div>
                    <div className="bow">🎀</div>
                  </div>
                </motion.div>
                
                {/* Floating hearts around gift */}
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={`heart-${i}`}
                    className="absolute text-pink-400 text-xl md:text-2xl heart-float pointer-events-none"
                    style={{
                      left: `${Math.cos(i * 60 * Math.PI / 180) * 80 + 50}%`,
                      top: `${Math.sin(i * 60 * Math.PI / 180) * 80 + 50}%`,
                      animationDelay: `${i * 0.4}s`
                    }}
                  >
                    💖
                  </div>
                ))}
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="space-y-4"
              >
                <h2 className="text-2xl md:text-4xl font-bold text-pink-600 leading-tight">
                  🎁 Your Special Surprise! 🎁
                </h2>
                <p className="text-lg md:text-xl text-gray-700 font-medium leading-relaxed px-4">
                  Tap the beautiful gift box to discover something magical made just for you...
                </p>
                
                {/* Instruction with sparkle effect */}
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="mt-6"
                >
                  <p className="text-pink-500 font-semibold flex items-center justify-center gap-2 text-base md:text-lg">
                    <span>✨</span>
                    Tap the gift above
                    <span>✨</span>
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>
          ) : (
            // Revealed Content Section
            <motion.div
              key="revealed"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", damping: 20, stiffness: 100 }}
              className="text-center w-full max-w-4xl mx-auto"
            >
              {/* Confetti Effect */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {Array.from({ length: 15 }).map((_, i) => (
                  <div
                    key={`confetti-${i}`}
                    className="absolute confetti-drop text-lg md:text-xl"
                    style={{
                      left: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 3}s`,
                      color: ['#ff69b4', '#ff1493', '#ffc0cb', '#ffb6c1'][Math.floor(Math.random() * 4)]
                    }}
                  >
                    {['🎉', '🎊', '✨', '💖', '🌟'][Math.floor(Math.random() * 5)]}
                  </div>
                ))}
              </div>

              {/* Main Gift Content */}
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="glass-card rounded-2xl md:rounded-3xl p-4 md:p-8 mb-6 md:mb-8"
              >
                <h2 className="text-3xl md:text-6xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent leading-tight">
                  🎉 Surprise Revealed! 🎉
                </h2>
                
                <div className="space-y-6 md:space-y-8">
                  {/* Video Section */}
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="relative"
                  >
                    <div className="bg-white/30 rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg">
                      <h3 className="text-xl md:text-3xl font-bold text-pink-600 mb-3 md:mb-4">
                        💕 Messages from Your Loved Ones 💕
                      </h3>
                      
                      {!showVideo ? (
                        <div className="relative">
                          <div className="bg-gradient-to-r from-pink-400 to-purple-500 rounded-xl md:rounded-2xl p-6 md:p-8 cursor-pointer group"
                               onClick={handlePlayVideo}>
                            <motion.div
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className="text-center"
                            >
                              <div className="text-4xl md:text-6xl mb-3 md:mb-4 group-hover:scale-110 transition-transform">
                                ▶️
                              </div>
                              <h4 className="text-white text-lg md:text-xl font-bold mb-2">
                                Watch Your Special Video
                              </h4>
                              <p className="text-pink-100 text-sm md:text-base">
                                Your friends have something beautiful to say!
                              </p>
                            </motion.div>
                          </div>
                        </div>
                      ) : (
                        <motion.div
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="relative rounded-xl md:rounded-2xl overflow-hidden"
                        >
                          <video
                            ref={videoRef}
                            className="w-full max-w-2xl mx-auto rounded-xl md:rounded-2xl shadow-2xl"
                            controls
                            onLoadedData={handleVideoLoad}
                            poster="/images/video-thumbnail.jpg"
                          >
                            <source src="/videos/birthday-wishes.mp4" type="video/mp4" />
                            <source src="/videos/birthday-wishes.webm" type="video/webm" />
                            Your browser does not support the video tag.
                          </video>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>

                  {/* Navigation Button */}
                  <motion.button
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate("/")}
                    className="bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-3 md:py-4 px-6 md:px-8 rounded-full shadow-2xl hover:shadow-pink-300/50 transition-all duration-300 text-base md:text-lg"
                  >
                    <span className="flex items-center gap-2 md:gap-3">
                      💕 Back to Home 💕
                    </span>
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default GiftReveal;
