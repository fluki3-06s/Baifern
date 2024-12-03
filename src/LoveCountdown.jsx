import React, { useState, useEffect } from 'react';
import { Heart, Gift, Cake, Calendar, Music, Ghost, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import ReactAudioPlayer from 'react-audio-player';
import Snowfall from 'react-snowfall';

const CountdownCard = ({ icon, label, value }) => (
  <motion.div
    className="flex items-center bg-pink-50 p-4 rounded-xl shadow-md"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
  >
    <div className="mr-4">{icon}</div>
    <div className="flex-grow">
      <p className="text-gray-600 text-sm">{label}</p>
      <p className="text-2xl font-bold text-pink-600">{value}</p>
    </div>
  </motion.div>
);

const LoveCountdown = () => {
  const [firstMeetDate] = useState(new Date('2024-11-06'));
  const [partnerBirthday] = useState(new Date('2006-07-27'));
  const [countdowns, setCountdowns] = useState({
    relationship: 0,
    birthday: 0,
    valentinesDay: 0,
    newYear: 0,
    loyKrathong: 0,
    halloween: 0,
    christmas: 0,
  });

  const [isAuthorized, setIsAuthorized] = useState(false); // ตรวจสอบการอนุญาต
  const [password, setPassword] = useState(''); // เก็บค่ารหัสผ่านที่ป้อน
  const [wrongPassword, setWrongPassword] = useState(false); // ตรวจสอบว่ารหัสผิดหรือไม่

  useEffect(() => {
    const calculateCountdowns = () => {
      const now = new Date();
      const relationshipDays = Math.floor((now - firstMeetDate) / (1000 * 60 * 60 * 24));

      const nextBirthday = new Date(now.getFullYear(), partnerBirthday.getMonth(), partnerBirthday.getDate());
      if (now > nextBirthday) {
        nextBirthday.setFullYear(now.getFullYear() + 1);
      }
      const birthdayDays = Math.ceil((nextBirthday - now) / (1000 * 60 * 60 * 24));

      const valentinesDay = new Date(now.getFullYear(), 1, 14);
      if (now > valentinesDay) {
        valentinesDay.setFullYear(now.getFullYear() + 1);
      }
      const valentinesDays = Math.ceil((valentinesDay - now) / (1000 * 60 * 60 * 24));

      const newYear = new Date(now.getFullYear() + 1, 0, 1);
      const newYearDays = Math.ceil((newYear - now) / (1000 * 60 * 60 * 24));

      const loyKrathong = new Date(now.getFullYear(), 10, 27);
      if (now > loyKrathong) {
        loyKrathong.setFullYear(now.getFullYear() + 1);
      }
      const loyKrathongDays = Math.ceil((loyKrathong - now) / (1000 * 60 * 60 * 24));

      const halloween = new Date(now.getFullYear(), 9, 31);
      if (now > halloween) {
        halloween.setFullYear(now.getFullYear() + 1);
      }
      const halloweenDays = Math.ceil((halloween - now) / (1000 * 60 * 60 * 24));

      const christmas = new Date(now.getFullYear(), 11, 25);
      if (now > christmas) {
        christmas.setFullYear(now.getFullYear() + 1);
      }
      const christmasDays = Math.ceil((christmas - now) / (1000 * 60 * 60 * 24));

      setCountdowns({
        relationship: relationshipDays,
        birthday: birthdayDays,
        valentinesDay: valentinesDays,
        newYear: newYearDays,
        loyKrathong: loyKrathongDays,
        halloween: halloweenDays,
        christmas: christmasDays,
      });
    };

    calculateCountdowns();
    const timer = setInterval(calculateCountdowns, 1000 * 60 * 60);
    return () => clearInterval(timer);
  }, [firstMeetDate, partnerBirthday]);

  const handlePlayMusic = () => {
    const normalizedPassword = password.toLowerCase();
    if (normalizedPassword === "fluke" && password.length === 5) {
      setIsAuthorized(true);
      setWrongPassword(false);
      const audio = new Audio("/audio/music.mp3");
      audio.loop = true;
      audio.play().catch((error) => {
        console.log("AutoPlay ถูกบล็อก: ", error);
      });
    } else {
      setWrongPassword(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100 flex flex-col items-center justify-center p-4 font-kanit">
      <Snowfall 
        snowflakeCount={200} // จำนวนหิมะตก (ค่าเริ่มต้น 150)
        color="white" // สีของหิมะ
        style={{
          position: 'absolute', 
          width: '100%', 
          height: '100%', 
          zIndex: 10
        }}
      />

      {!isAuthorized ? (
        <div className="bg-white shadow-lg rounded-2xl p-8 max-w-sm w-full text-center">
          {wrongPassword && (
            <motion.div
              className="mb-4 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src="/what.jpg"
                alt="Who Are You"
                className="w-32 h-32 mx-auto mb-4 rounded-full border-4 border-pink-500 shadow-lg"
              />
              <p className="text-red-600 font-semibold">คุณเป็นใคร? 🤔</p>
            </motion.div>
          )}

          <motion.h1
            className="text-2xl font-bold text-pink-600 mb-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            กรุณาใส่รหัสผ่าน
          </motion.h1>

          <motion.input
            type="password"
            className="border border-gray-300 rounded-lg p-3 w-full mb-6 text-center text-lg focus:ring-2 focus:ring-pink-300 focus:outline-none"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            whileFocus={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />

          <motion.button
            className="bg-pink-500 text-white px-5 py-2 rounded-lg font-semibold shadow-lg hover:bg-pink-600 focus:ring-2 focus:ring-pink-300 focus:outline-none"
            onClick={handlePlayMusic}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            ยืนยัน
          </motion.button>
        </div>
        
      ) : (
        <div className="bg-white shadow-2xl rounded-3xl p-8 max-w-md w-full text-center">
          <img
            src="baifern.jpeg"
            alt="Couple"
            className="w-48 h-48 object-cover rounded-full mx-auto mb-6 border-4 border-pink-300 shadow-lg"
          />
          <motion.h1
            className="text-3xl font-bold text-pink-600 mb-6"
            whileHover={{ scale: 1.05 }}
            animate={{
              y: [0, -5, 0, -5, 0],
            }}
            transition={{
              duration: 1,
              ease: 'easeInOut',
              repeat: Infinity,
              repeatDelay: 2,
            }}
          >
            Baifern 🦊
          </motion.h1>

          <div className="space-y-4">
            <CountdownCard
              icon={<Heart color="#FF69B4" />}
              label="Days We've Known Each Other"
              value={countdowns.relationship}
            />
            <CountdownCard
              icon={<Cake color="#FF1493" />}
              label="Days to Birthday"
              value={countdowns.birthday}
            />
            <CountdownCard
              icon={<Calendar color="#9400D3" />}
              label="Days to Valentine's"
              value={countdowns.valentinesDay}
            />
            <CountdownCard
              icon={<Gift color="#FF6347" />}
              label="Days to New Year"
              value={countdowns.newYear}
            />
            <CountdownCard
              icon={<Music color="#FFD700" />}
              label="Days to Loy Krathong"
              value={countdowns.loyKrathong}
            />
            <CountdownCard
              icon={<Ghost color="#9400D3" />}
              label="Days to Halloween"
              value={countdowns.halloween}
            />
            <CountdownCard
              icon={<Star color="#FFDF00" />}
              label="Days to Christmas"
              value={countdowns.christmas}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default LoveCountdown;
