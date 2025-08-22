import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const AnimatedEmoji = ({ emoji, delay }) => {
  return (
    <span
      style={{
        display: 'inline-block',
        animation: `bounce 2s ease-in-out ${delay}s infinite`
      }}
    >
      {emoji}
    </span>
  );
};


const PhotoGallery = () => {
  const [scratchedCards, setScratchedCards] = useState({});
  const [floatingHearts, setFloatingHearts] = useState([]);
  const canvasRefs = useRef({});
  const navigate = useNavigate();
    const handleEnterClick = () => {
       navigate("/timeline")
    };

  const photos = [
    {
      src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=400&auto=format&fit=crop",
      story: "Mountain sunrise that took my breath away"
    },
    {
      src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=400&auto=format&fit=crop",
      story: "Lost in the forest, found myself"
    },
    {
      src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
      story: "Beach waves washing worries away"
    },
    {
      src: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=400&auto=format&fit=crop",
      story: "City lights painting the night sky"
    },
    {
      src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=400&auto=format&fit=crop",
      story: "Coffee shop conversations that lasted hours"
    },
    {
      src: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=400&auto=format&fit=crop",
      story: "Road trip adventure with best friends"
    },
    {
      src: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=400&auto=format&fit=crop",
      story: "Sunset picnic in golden fields"
    },
    {
      src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=400&auto=format&fit=crop",
      story: "Stargazing until dawn broke"
    },
    {
      src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=400&auto=format&fit=crop",
      story: "Rainy day that turned into magic"
    },
    {
      src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=400&auto=format&fit=crop",
      story: "Laughter echoing through empty halls"
    }
  ];

  // Create floating hearts effect
  useEffect(() => {
    const interval = setInterval(() => {
      const newHeart = {
        id: Date.now(),
        left: Math.random() * 100,
        emoji: ['💕', '💖', '💝', '💗', '💓'][Math.floor(Math.random() * 5)]
      };
      setFloatingHearts(prev => [...prev.slice(-5), newHeart]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const initializeScratchCard = (cardId) => {
    const canvas = canvasRefs.current[cardId];
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    
    // Set canvas size
    canvas.width = rect.width * 2;
    canvas.height = rect.height * 2;
    ctx.scale(2, 2);

    // Create scratch surface with pink gradient
    const gradient = ctx.createLinearGradient(0, 0, rect.width, rect.height);
    gradient.addColorStop(0, '#ec4899');
    gradient.addColorStop(0.5, '#f472b6');
    gradient.addColorStop(1, '#ec4899');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, rect.width, rect.height);

    // Add scratch-off text
    ctx.fillStyle = '#fff';
    ctx.font = 'bold .6rem Arial';
    ctx.textAlign = 'center';
    ctx.fillText('💖 SCRATCH TO REVEAL', rect.width / 2, rect.height / 2 - 10);
    ctx.font = '.58rem Arial';
    ctx.fillText('OUR MEMORY', rect.width / 2, rect.height / 2 + 10);

    // Add some sparkle texture
    ctx.fillStyle = 'rgba(255,255,255,0.3)';
    for (let i = 0; i < 30; i++) {
      const x = Math.random() * rect.width;
      const y = Math.random() * rect.height;
      ctx.beginPath();
      ctx.arc(x, y, 1, 0, 2 * Math.PI);
      ctx.fill();
    }
  };

  const handleScratch = (e, cardId) => {
    const canvas = canvasRefs.current[cardId];
    if (!canvas || scratchedCards[cardId]) return;

    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    
    let x, y;
    if (e.type === 'mousemove' || e.type === 'mousedown') {
      x = (e.clientX - rect.left) * 2;
      y = (e.clientY - rect.top) * 2;
    } else if (e.type === 'touchmove' || e.type === 'touchstart') {
      e.preventDefault();
      x = (e.touches[0].clientX - rect.left) * 2;
      y = (e.touches[0].clientY - rect.top) * 2;
    }

    // Scratch effect
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, 2 * Math.PI);
    ctx.fill();

    // Check if enough is scratched
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparent = 0;
    
    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) transparent++;
    }
    
    const scratchedPercent = (transparent / (pixels.length / 4)) * 100;
    
    if (scratchedPercent > 40) {
      setScratchedCards(prev => ({ ...prev, [cardId]: true }));
    }
  };

  const handleMouseDown = (e, cardId) => {
    if (scratchedCards[cardId]) return;
    
    const canvas = canvasRefs.current[cardId];
    let isScratching = true;

    const scratch = (event) => {
      if (isScratching) {
        handleScratch(event, cardId);
      }
    };

    const stopScratching = () => {
      isScratching = false;
      document.removeEventListener('mousemove', scratch);
      document.removeEventListener('mouseup', stopScratching);
    };

    handleScratch(e, cardId);
    document.addEventListener('mousemove', scratch);
    document.addEventListener('mouseup', stopScratching);
  };

  const handleTouchStart = (e, cardId) => {
    if (scratchedCards[cardId]) return;
    
    let isScratching = true;

    const scratch = (event) => {
      if (isScratching) {
        handleScratch(event, cardId);
      }
    };

    const stopScratching = () => {
      isScratching = false;
      document.removeEventListener('touchmove', scratch);
      document.removeEventListener('touchend', stopScratching);
    };

    handleScratch(e, cardId);
    document.addEventListener('touchmove', scratch);
    document.addEventListener('touchend', stopScratching);
  };

  useEffect(() => {
    photos.forEach((_, index) => {
      setTimeout(() => {
        initializeScratchCard(index);
      }, index * 100);
    });
  }, []);

  return (
    <>
      <style jsx>{`
        @keyframes float {
          0% { 
            transform: translateY(100vh) translateX(0px) rotate(0deg);
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
          0%, 100% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.2) rotate(5deg); }
        }
        @keyframes gradient {
          0% { background: linear-gradient(45deg, #fce4ec, #f8bbd9, #e1bee7); }
          33% { background: linear-gradient(45deg, #f8bbd9, #e1bee7, #fce4ec); }
          66% { background: linear-gradient(45deg, #e1bee7, #fce4ec, #f8bbd9); }
          100% { background: linear-gradient(45deg, #fce4ec, #f8bbd9, #e1bee7); }
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
            transform: scale(0) translateY(0px);
          }
          20% { opacity: 1; transform: scale(1) translateY(-10px); }
          80% { opacity: 1; transform: scale(1) translateY(-40px); }
          100% { 
            opacity: 0;
            transform: scale(0) translateY(-100px);
          }
        }
        @keyframes sparkle {
          0% { opacity: 0; transform: scale(0) rotate(0deg); }
          50% { opacity: 1; transform: scale(1) rotate(180deg); }
          100% { opacity: 0; transform: scale(0) rotate(360deg); }
        }
        .gradient-bg {
          animation: gradient 8s linear infinite;
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
          animation: buttonScale 0.6s ease-out 2.5s forwards;
          opacity: 0;
        }
        .button-hover:hover {
          transform: scale(1.1) translateY(-5px);
          box-shadow: 0 20px 40px rgba(236, 72, 153, 0.3);
        }
        .button-hover:active {
          transform: scale(0.95);
        }
        .floating-hearts {
          animation: floatingHearts 4s ease-in-out infinite;
        }
        .sparkle-effect {
          animation: sparkle 3s ease-in-out infinite;
        }
        .card-hover:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(236, 72, 153, 0.2);
        }
      `}</style>
      
      {/* Floating Hearts Background */}
      <div className="fixed inset-0 pointer-events-none z-10">
        {floatingHearts.map((heart) => (
          <div
            key={heart.id}
            className="absolute text-2xl floating-hearts"
            style={{
              left: `${heart.left}%`,
              bottom: '0px',
              animationDelay: `${Math.random() * 2}s`
            }}
          >
            {heart.emoji}
          </div>
        ))}
      </div>

      <div className="min-h-screen gradient-bg p-4 sm:p-6 md:p-8 relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-20">
          <div className="text-center mb-8 sm:mb-12 fade-in-up">
            <h1 className="text-3xl sm:text-3xl md:text-5xl font-bold text-white mb-4 sm:mb-6 drop-shadow-lg px-2">
              💖 Memory Gallery 💖
            </h1>
            <p className="text-white/90 text-base sm:text-base md:text-xl drop-shadow-md scale-in px-4">
              Scratch the cards to reveal your precious memories
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 fade-in-up-delayed">
            {photos.map((photo, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="relative group card-hover transition-all duration-300"
              >
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border-2 border-white/50">
                  {/* Photo and description (hidden until scratched) */}
                  <div className="aspect-square relative">
                    <img
                      src={photo.src}
                      alt={`Memory ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-pink-600/80 to-transparent p-2 sm:p-3">
                      <p className="text-white text-xs sm:text-sm font-medium drop-shadow-md leading-tight">
                        {photo.story}
                      </p>
                    </div>
                  </div>

                  {/* Scratch layer */}
                  <AnimatePresence>
                    {!scratchedCards[index] && (
                      <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0"
                      >
                        <canvas
                          ref={(el) => (canvasRefs.current[index] = el)}
                          className="w-full h-full cursor-pointer"
                          onMouseDown={(e) => handleMouseDown(e, index)}
                          onTouchStart={(e) => handleTouchStart(e, index)}
                          style={{ touchAction: 'none' }}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Revealed indicator */}
                  {scratchedCards[index] && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center text-xs sm:text-sm font-bold shadow-lg sparkle-effect"
                    >
                      💖
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Progress indicator */}
          <div className="mt-8 sm:mt-12 text-center button-scale px-4">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 sm:p-6 inline-block shadow-xl border-2 border-white/50 max-w-full">
              <p className="text-gray-700 font-bold text-base sm:text-lg mb-2 sm:mb-3">
                💕 {Object.keys(scratchedCards).length} of {photos.length} memories revealed 💕
              </p>
              <div className="w-64 sm:w-80 max-w-full bg-pink-100 rounded-full h-2 sm:h-3 overflow-hidden mx-auto">
                <motion.div
                  className="bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 h-2 sm:h-3 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ 
                    width: `${(Object.keys(scratchedCards).length / photos.length) * 100}%` 
                  }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          </div>

          {/* Completion message */}
          <AnimatePresence>
            {Object.keys(scratchedCards).length === photos.length && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-white rounded-2xl p-8 inline-block shadow-2xl border-4 border-white/50 button-hover"
                >
                  <h2 className="text-3xl font-bold mb-3">🎉 All Memories Revealed! 🎉</h2>
                  <p className="text-pink-100 text-lg">
                    You've uncovered all your precious moments 💖
                  </p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

           <button
          onClick={handleEnterClick}
          className="relative group overflow-hidden button-scale button-hover transition-all duration-300"
        >
         
          <div className="relative bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-white px-12 py-4 rounded-2xl font-semibold text-base shadow-lg transform transition duration-200 mt-2">
            <span className="flex items-center gap-3">
              <AnimatedEmoji emoji="🎀" delay={3.5} />
             Aaja Chal Agle Mod Pe
              <AnimatedEmoji emoji="💝" delay={4} />
            </span>
          </div>
        </button>
        </div>
      </div>
    </>
  );
};

export default PhotoGallery;