import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";


// Import your photos from assets/photos/
import firstMeeting from '../assets/photos/OROG4136.JPG';
import gravityRestro from '../assets/photos/IMG_E2241.JPG';
import mandirPhoto from '../assets/photos/IMG_5475.JPG';
import rishikeshPhoto1 from '../assets/photos/IMG_2545.JPG';
import rishikeshPhoto2 from '../assets/photos/EJJQ5111.PNG';
import rishikeshPhoto3 from '../assets/photos/BDGF7120.JPG';
import togetherPhoto from '../assets/photos/DUMV7780.JPG';

const Timeline = () => {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const storySections = [
    {
      title: "Safar: Dosti Se Dua Tak",
      type: "header",
      content: "Our journey through the years",
      animation: {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0 },
      },
    },
    {
      year: "2015",
      title: "Pehli Nazar, Pehli Baat",
      emoji: "👋",
      content: `"Facebook pe ek random hi request thi, lekin vibe instant thi."
      
Jab pehli baar Facebook pe baat shuru hui, kisi ne nahi socha tha ki yeh silsila itna aage badhega. Har din online aane ka wait, har chhoti baat share karna – bas dosti dosti mein kuch zyada hi khas ho gaya.

Pehla milna — white top mein ek patli si ladki jo thoda shock ho gayi thi – "yeh yahaan kaise?"
Aur baad mein ignore kar dena jese kuch hua hi nahi ho.

Lekin mai sab yaad rakhta hoon – har chhoti baat, har baar jab tum mere liye wait karti rahiti thi baat karne ke lie school, tutions se ake – or jab jab tumhari dosto ne kuch aur kaha mere bare mai, or tumne sirf mera bharosa kiya.`,
      photos: [
        {
          src: firstMeeting,
          caption: "Pehli mulakat",
          rotate: -3
        }
      ],
      animation: {
        hidden: { opacity: 0, x: -100 },
        visible: { opacity: 1, x: 0 },
      },
    },
    {
      year: "2020",
      title: "Jab 'Haan' Kaha",
      emoji: "💍",
      content: `"15 February 2020 – Gravity Restro ke ek table par, dosti ne pyar ka haath thaama."

mere or tumhare beech kuch waqt thoda awkward tha. Dooriyan bhi thi.

Lekin us din tumne ne sab dar, sab past side rakh kar ek decision liya — "Let's give this love a chance."
mai jaanta hoon main kuch galtiyan ki thi, par tumne mere dil par bharosa kiya.

And that's when love officially began.`,
      photos: [
        {
          src: gravityRestro,
          caption: "Gravity Restro - 15 Feb 2020",
          rotate: 2
        }
      ],
      animation: {
        hidden: { opacity: 0, x: 100 },
        visible: { opacity: 1, x: 0 },
      },
    },
    {
      year: "2021-2023",
      title: "Judna, Samajhna",
      emoji: "🤝",
      content: `"Galtiyaan sabse hoti hain, par maafi sirf dilwale dete hain."

Is saal ne dikhaya ki pyar sirf achhe dinon ka naam nahi – samajhne, bardasht karne aur sath nibhaane ka naam hai.

Chhoti chhoti fights thi, calls ignore hoti thi, timing clash hota tha.
Lekin tum hamesha wapas aayi. maine ne chahe kitna bhi ignore kiya ho, tumne ne kabhi peeche nahi chhoda.`,
      animation: {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
      },
    },
    {
      year: "2023",
      title: "Maturity aur Mandir",
      emoji: "🛕",
      content: `"Jo club aur Goa ki baatein karta tha, aaj mandir mein shaanti dhoondhta hai."

Dosti aur pyar ke is safar ne mereko ko badal diya.

Woh jo carefree tha, ab faith mein sukoon dhoondhta hai.
Mandir jaana, tumhare ke sath blessings lena — merko aaj bhi soch kar goosebumps aa jate hai jab pandit ji ne dono ko aashirwad diya sir se sir mila kar.

Itna hi nahi, woh insaan jo bas chill scenes mein interested tha, aaj shaadi ke baare mein pray karta hai — "Bhagwan bas yeh ladki sath rahe."`,
      photos: [
        {
          src: mandirPhoto,
          caption: "Mandir mein blessings",
          rotate: -2
        }
      ],
      animation: {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1 },
      },
    },
    {
      year: "Dec 2024",
      title: "First Trip, Rishikesh",
      emoji: "🚗",
      content: `"Night drive, mandir ki ghantiyaan, aur wo silence jo sab keh jaata hai."

Tumhari or meri life ki pehli trip – long drive se lekar Rishikesh ki shaanti tak.

Wahan ki hawa bhi alag thi, jaise universe bhi keh raha ho — "Tum dono ek hi ho."
Waqt ruk gaya tha us trip mein. Memories, photos, smiles – sab eternal.`,
      photos: [
        {
          src: rishikeshPhoto1,
          caption: "Rishikesh ki raat",
          rotate: 3
        },
        {
          src: rishikeshPhoto2,
          caption: "Mandir ke samne",
          rotate: -1
        },
        {
          src: rishikeshPhoto3,
          caption: "Perfect moments",
          rotate: 2
        }
      ],
      animation: {
        hidden: { opacity: 0, rotateX: 90 },
        visible: { opacity: 1, rotateX: 0 },
      },
    },
    {
      year: "2025",
      title: "Still Growing, Still Smiling",
      emoji: "🌍",
      content: `"Long distance tha, hai... par dil ke paas rehne ke liye kabhi location nahi chahiye hoti."

Abhi bhi long distance hai, lekin pyar, respect, aur connection wahi hai.

Tumne mera saath us waqt bhi diya jab uske khud ke hausle toot rahe the.
Aur mai jaanta hoon, chahe duniya kuch bhi kahe — I love you... Sunshine.💖`,
      photos: [
        {
          src: togetherPhoto,
          caption: "Still together ❤️",
          rotate: -2
        }
      ],
      animation: {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      },
    },
    {
      type: "thanks",
      title: "With Special Thanks To",
      content: `"Sumya - Jo har mod par saath diya, chahe samjhane ki baat ho ya scooty dene ka pal.
      
Usne hamesha meri madad ki — chahe mujhe samjhane ki baat ho ya tumko samjhane ki,
chahe woh 15th ko apni scooty dene ka pal ho ya tumko shuru karne ka ek push dena ho.
Is relationship ke peeche uska contribution bhi utna hi hai jitna hamara."`,
      animation: {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
      },
    },
    {
      type: "mannkibaat",
      title: "💌 Mann Ki Baat",
      content: `"Tumne mujhe wahi banaya jo main ho sakta tha – ek behtar insaan.
Jo har waqt chill tha, usey tune samjhdaar bana diya.
Jo bhatak raha tha, uska direction ban gayi.

Shaayad is safar ka har page yaad nahi hoga,
par ek cheez hamesha yaad rahegi – tum ho... toh sab hai." 💫`,
      animation: {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      },
    },
  ];

  // Polaroid Photo Component
  const PolaroidPhoto = ({ photo, index }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
      whileInView={{ 
        opacity: 1, 
        scale: 1, 
        rotate: photo.rotate 
      }}
      viewport={{ once: true }}
      transition={{ 
        delay: index * 0.2,
        duration: 0.5,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ 
        scale: 1.05, 
        rotate: 0,
        zIndex: 10
      }}
      className="polaroid-photo relative bg-white p-3 shadow-lg cursor-pointer"
      style={{
        transform: `rotate(${photo.rotate}deg)`,
        filter: 'drop-shadow(3px 3px 10px rgba(0,0,0,0.2))',
      }}
    >
      <div className="photo-frame">
        <img
          src={photo.src}
          alt={photo.caption}
          className="w-full h-32 sm:h-40 object-cover"
          onError={(e) => {
            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2Y0ZjRmNCIvPjx0ZXh0IHg9IjUwIiB5PSI1MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIiBmaWxsPSIjOTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+UGhvdG88L3RleHQ+PC9zdmc+';
          }}
        />
      </div>
      <p className="text-xs text-center mt-2 text-gray-600 font-handwriting">
        {photo.caption}
      </p>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4 md:p-8">
      <style jsx>{`
        .polaroid-photo {
          max-width: 150px;
          border-radius: 2px;
        }
        .photo-frame {
          background: white;
          border-radius: 1px;
        }
        .font-handwriting {
          font-family: 'Kalam', cursive;
        }
        .photos-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          justify-content: center;
          margin-top: 1rem;
        }
        .photos-scatter {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          justify-content: space-around;
          align-items: flex-start;
          margin-top: 1rem;
        }
      `}</style>
      
      <div className="max-w-4xl mx-auto space-y-12">
        {storySections.map((section, index) => (
          <motion.div
            key={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            variants={section.animation}
          >
            {section.type === "header" ? (
              <div className="text-center mb-12">
                <motion.h1 className="text-3xl md:text-4xl font-bold text-purple-800 font-serif">
                  {section.title}
                </motion.h1>
                <motion.p className="text-purple-600 mt-2">
                  {section.content}
                </motion.p>
              </div>
            ) : section.type === "thanks" ? (
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-lg font-semibold text-purple-700 mb-3">
                  {section.title}
                </h3>
                <div className="text-gray-700 space-y-4">
                  {section.content.split("\n").map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </div>
            ) : section.type === "mannkibaat" ? (
              <div className="bg-gradient-to-r from-pink-100 to-purple-100 p-6 rounded-xl border border-pink-200 shadow-inner">
                <h3 className="text-2xl font-bold text-center text-pink-700 mb-4">
                  {section.title}
                </h3>
                <div className="text-gray-700 italic text-center space-y-4">
                  {section.content.split("\n").map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </div>
            ) : (
              <div
                className={`bg-gradient-to-r ${
                  index % 2 === 0
                    ? "from-blue-100 to-blue-50"
                    : "from-pink-100 to-pink-50"
                } p-6 rounded-xl shadow-lg`}
              >
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Content Section */}
                  <div className="flex-1">
                    <div className="flex items-start gap-4">
                      <div className="text-3xl">{section.emoji}</div>
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-baseline gap-2">
                          <h3 className="text-xl font-bold text-gray-800">
                            {section.year}
                          </h3>
                          <span className="text-sm font-medium text-gray-600">
                            {section.title}
                          </span>
                        </div>
                        <div className="mt-4 text-gray-700 space-y-4">
                          {section.content.split("\n\n").map((para, i) => (
                            <p key={i}>{para}</p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Photos Section */}
                  {section.photos && (
                    <div className={`${
                      section.photos.length > 2 ? 'photos-scatter' : 'photos-grid'
                    } lg:min-w-[200px]`}>
                      {section.photos.map((photo, photoIndex) => (
                        <PolaroidPhoto 
                          key={photoIndex} 
                          photo={photo} 
                          index={photoIndex} 
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: storySections.length * 0.1 }}
          className="flex justify-center pt-8"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all"
            onClick={() => navigate("/letter")}
          >
            Continue to Love Letter 💌
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Timeline;
