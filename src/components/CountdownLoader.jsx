import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CountdownLoader = ({ onComplete }) => {
  const [stage, setStage] = useState(0);
  const [showLoader, setShowLoader] = useState(true);
  
  const stages = [
    "preparing",
    "plate",
    "cake",
    "cream",
    "candles",
    "flames",
    "message",
    "complete",
  ];

  const romanticMessages = [
    "Creating something magical for you... ✨",
    "Setting the perfect stage... 🌟",
    "Baking with love and joy... 💝",
    "Adding sweetness to your day... 🍰",
    "Lighting up your special moment... 🕯️",
    "Making wishes come true... 🌠",
    "Happy Birthday to someone amazing... 🎂",
    "Get ready for your celebration... 🎉",
  ];

  useEffect(() => {
    const timings = [1200, 1400, 1600, 1800, 1600, 1400, 2200, 1200];
    if (stage < stages.length) {
      const timer = setTimeout(() => setStage(stage + 1), timings[stage]);
      return () => clearTimeout(timer);
    } else {
      const exitTimer = setTimeout(() => {
        setShowLoader(false);
        onComplete();
      }, 1000);
      return () => clearTimeout(exitTimer);
    }
  }, [stage, onComplete]);

  if (!showLoader) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden px-4"
        style={{
          background: "radial-gradient(ellipse at center, #1a0b2e 0%, #16213e 50%, #0f3460 100%)",
        }}
        exit={{
          opacity: 0,
          scale: 1.1,
          transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
        }}
      >
        {/* Reduced animated background particles for mobile */}
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `hsl(${280 + Math.random() * 80}, 70%, 80%)`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.5, 1],
              y: [0, -15, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Reduced floating celebration elements */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-xl sm:text-2xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: 'drop-shadow(0 0 6px rgba(255,255,255,0.3))',
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, Math.random() * 15 - 7, 0],
              rotate: [0, 360],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 6 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut",
            }}
          >
            {["🎂", "🎉", "🎈", "✨", "🌟", "💖", "🎁"][Math.floor(Math.random() * 7)]}
          </motion.div>
        ))}

        {/* Main cake assembly - responsive sizing */}
        <div className="relative w-60 sm:w-72 md:w-80 h-64 sm:h-80 md:h-96 flex items-end justify-center mb-8 sm:mb-12">
          
          {/* Responsive cake plate */}
          {stage >= 1 && (
            <motion.div
              className="absolute bottom-0 z-10"
              initial={{ scale: 0.5, opacity: 0, y: 100 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 20,
                duration: 0.8 
              }}
            >
              <div className="relative">
                <div className="w-44 sm:w-52 md:w-60 h-4 sm:h-5 bg-gradient-to-r from-gray-200 via-white to-gray-200 rounded-full shadow-2xl" />
                <div className="absolute inset-0 w-44 sm:w-52 md:w-60 h-4 sm:h-5 bg-gradient-to-r from-transparent via-white to-transparent rounded-full opacity-60 blur-sm" />
                <motion.div
                  className="absolute -inset-1 sm:-inset-2 bg-blue-200 rounded-full opacity-20 blur-md"
                  animate={{ opacity: [0.1, 0.3, 0.1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </div>
            </motion.div>
          )}

          {/* Responsive cake base */}
          {stage >= 2 && (
            <motion.div
              className="absolute bottom-4 sm:bottom-5 w-40 sm:w-44 md:w-52 h-24 sm:h-28 md:h-32 z-20"
              initial={{ y: -500, rotate: -10, scale: 0.8 }}
              animate={{ y: 0, rotate: 0, scale: 1 }}
              transition={{
                type: "spring",
                damping: 12,
                stiffness: 150,
                duration: 1.2,
              }}
            >
              <div className="relative h-full">
                <div className="absolute inset-0 bg-gradient-to-b from-yellow-300 via-amber-300 to-amber-400 rounded-xl shadow-2xl" />
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-amber-200 to-transparent opacity-50 rounded-xl" />
                
                {/* Responsive heart decoration */}
                <motion.div
                  className="absolute top-1 sm:top-2 left-1/2 transform -translate-x-1/2"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0] 
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    ease: "easeInOut" 
                  }}
                >
                  <div className="relative">
                    <div className="w-6 sm:w-7 md:w-8 h-6 sm:h-7 md:h-8 bg-pink-500 rotate-45 shadow-lg" />
                    <div className="absolute top-0 left-0 w-6 sm:w-7 md:w-8 h-6 sm:h-7 md:h-8 bg-pink-500 rounded-full shadow-lg" />
                    <div className="absolute -top-1 -right-1 w-6 sm:w-7 md:w-8 h-6 sm:h-7 md:h-8 bg-pink-400 rounded-full shadow-lg" />
                  </div>
                </motion.div>

                {/* Responsive frosting details */}
                <motion.div
                  className="absolute bottom-1 sm:bottom-2 left-1 sm:left-2 w-3 sm:w-4 h-3 sm:h-4 bg-pink-300 rounded-full opacity-80"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                />
                <motion.div
                  className="absolute bottom-1 sm:bottom-2 right-1 sm:right-2 w-2 sm:w-3 h-2 sm:h-3 bg-purple-300 rounded-full opacity-80"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                />
              </div>
            </motion.div>
          )}

          {/* Responsive cream layer */}
          {stage >= 3 && (
            <motion.div
              className="absolute bottom-28 sm:bottom-33 md:bottom-37 w-42 sm:w-48 md:w-56 h-10 sm:h-12 md:h-14 z-30"
              initial={{ y: -200, opacity: 0, scaleY: 0 }}
              animate={{ y: 0, opacity: 1, scaleY: 1 }}
              transition={{
                type: "spring",
                damping: 15,
                delay: 0.3,
                duration: 1,
              }}
            >
              <div className="relative h-full bg-gradient-to-b from-pink-50 via-pink-100 to-pink-200 rounded-t-2xl overflow-hidden border-t-2 sm:border-t-4 border-pink-300 shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-40" />
                
                <motion.div
                  className="absolute -top-1 sm:-top-2 left-0 w-full h-2 sm:h-4 bg-pink-200 rounded-full"
                  animate={{ 
                    scaleX: [0.8, 1.2, 0.8],
                    opacity: [0.6, 1, 0.6]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity,
                    ease: "easeInOut" 
                  }}
                />

                <motion.div
                  className="absolute top-1 sm:top-2 left-2 sm:left-4 w-4 sm:w-6 h-4 sm:h-6 border-2 border-pink-400 rounded-full opacity-60"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute top-2 sm:top-3 right-3 sm:right-6 w-3 sm:w-4 h-3 sm:h-4 border-2 border-purple-400 rounded-full opacity-60"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                />
              </div>
            </motion.div>
          )}

          {/* Responsive candles */}
          {stage >= 4 && (
            <div className="absolute bottom-38 sm:bottom-45 md:bottom-51 flex space-x-2 sm:space-x-3 z-40">
              {[1, 2, 3, 4, 5].map((candle, index) => (
                <motion.div
                  key={candle}
                  className="relative"
                  initial={{ y: -300, opacity: 0, rotate: -45 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  transition={{
                    type: "spring",
                    damping: 8,
                    delay: index * 0.2,
                    duration: 1,
                  }}
                >
                  <div 
                    className="w-2 sm:w-3 h-16 sm:h-20 md:h-24 rounded-t-lg shadow-lg relative"
                    style={{
                      background: `linear-gradient(to bottom, hsl(${240 + index * 30}, 60%, 80%), hsl(${240 + index * 30}, 60%, 60%))`
                    }}
                  >
                    <div className="absolute top-0 left-0 w-1 h-full bg-white opacity-30 rounded-l-lg" />
                    
                    <motion.div
                      className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 sm:h-2 bg-current opacity-60 rounded-full"
                      animate={{ 
                        height: [4, 8, 4],
                        opacity: [0.4, 0.8, 0.4] 
                      }}
                      transition={{ 
                        duration: 3, 
                        repeat: Infinity, 
                        delay: index * 0.5 
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Responsive flame effects */}
          {stage >= 5 && (
            <div className="absolute bottom-54 sm:bottom-65 md:bottom-75 flex space-x-2 sm:space-x-3 z-50">
              {[1, 2, 3, 4, 5].map((flame, index) => (
                <motion.div
                  key={flame}
                  className="relative"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: [1, 1.3, 1.1, 1],
                    opacity: 1,
                    y: [0, -3, -1, 0],
                  }}
                  transition={{
                    scale: {
                      duration: 1.5,
                      repeat: Infinity,
                      repeatType: "reverse",
                      delay: index * 0.15,
                    },
                    y: {
                      duration: 1,
                      repeat: Infinity,
                      repeatType: "reverse",
                      delay: index * 0.1,
                    },
                    opacity: { duration: 0.5 },
                  }}
                >
                  <div className="relative">
                    <div className="w-3 sm:w-4 h-4 sm:h-5 bg-gradient-to-t from-red-500 via-yellow-400 to-yellow-200 rounded-full blur-[0.5px]" 
                         style={{ clipPath: 'ellipse(50% 65% at 50% 85%)' }} />
                    
                    <div className="absolute inset-0 top-1 w-1 sm:w-2 h-2 sm:h-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-t from-orange-400 to-yellow-100 rounded-full" />
                    
                    <motion.div
                      className="absolute -inset-2 sm:-inset-3 bg-yellow-300 rounded-full blur-md opacity-40"
                      animate={{ 
                        opacity: [0.2, 0.6, 0.2],
                        scale: [0.8, 1.2, 0.8]
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        delay: index * 0.3
                      }}
                    />
                    
                    <motion.div
                      className="absolute -top-1 sm:-top-2 left-1/2 transform -translate-x-1/2 w-1 h-4 sm:h-8 bg-gradient-to-t from-transparent via-yellow-100 to-transparent opacity-20"
                      animate={{ 
                        scaleX: [1, 0.5, 1],
                        opacity: [0.1, 0.3, 0.1]
                      }}
                      transition={{ 
                        duration: 0.8, 
                        repeat: Infinity,
                        delay: index * 0.2
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Responsive birthday message */}
          {stage >= 6 && (
            <motion.div
              className="absolute -top-27 sm:-top-20 md:-top-24 text-center z-50 w-full px-2 "
              initial={{ scale: 0.5, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ 
                type: "spring", 
                stiffness: 100,
                duration: 1.2 
              }}
            >
              <motion.h2
                className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3 relative"
                style={{
                  background: "linear-gradient(45deg, #ff6b6b, #ff8e8e, #ffb3b3, #ffd93d)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  filter: "drop-shadow(0 0 8px rgba(255,107,107,0.5))",
                }}
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                Happy Birthday, Retika! 🎂
                
                <motion.div
                  className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2 text-yellow-300 text-sm sm:text-base md:text-lg"
                  animate={{ 
                    rotate: 360,
                    scale: [1, 1.5, 1]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity 
                  }}
                >
                  ✨
                </motion.div>
                <motion.div
                  className="absolute -bottom-1 -left-1 sm:-left-2 text-pink-300 text-sm sm:text-base md:text-lg"
                  animate={{ 
                    rotate: -360,
                    scale: [1, 1.3, 1]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity,
                    delay: 1
                  }}
                >
                  💖
                </motion.div>
              </motion.h2>

              <motion.div
                className="text-base sm:text-lg md:text-xl text-pink-100 font-medium italic px-2"
                animate={{
                  y: [0, -3, 0],
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                "Every moment with you is a celebration" 💕
              </motion.div>
            </motion.div>
          )}
        </div>

        {/* Responsive progress bar */}
        <motion.div
          className="w-60 sm:w-64 md:w-72 bg-gray-800 bg-opacity-40 rounded-full h-1.5 sm:h-2 mt-6 sm:mt-8 overflow-hidden backdrop-blur-sm border border-gray-600"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 relative"
            initial={{ width: "0%" }}
            animate={{ width: `${(stage / stages.length) * 100}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>

        {/* Responsive status message */}
        <motion.div
          className="mt-4 sm:mt-6 md:mt-8 text-center px-4"
          key={stage}
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="text-lg sm:text-xl text-pink-100 font-medium max-w-xs sm:max-w-md leading-relaxed">
            {romanticMessages[stage]}
          </p>
          
          {/* Responsive completion confetti */}
          {stage >= 7 && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1.5 sm:w-2 h-1.5 sm:h-2 bg-gradient-to-br from-yellow-400 to-pink-500 rounded-full"
                  style={{
                    left: `${20 + Math.random() * 60}%`,
                    top: `${20 + Math.random() * 60}%`,
                  }}
                  animate={{
                    y: [0, -80, 200],
                    x: [0, Math.random() * 150 - 75],
                    rotate: [0, 360],
                    opacity: [1, 0.8, 0],
                  }}
                  transition={{
                    duration: 2.5,
                    delay: Math.random() * 1.5,
                    ease: "easeOut",
                  }}
                />
              ))}
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CountdownLoader;
