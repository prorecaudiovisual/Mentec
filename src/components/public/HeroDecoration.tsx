"use client";

import { motion } from "motion/react";

export default function HeroDecoration() {
  return (
    <div className="hidden lg:flex items-center justify-center">
      <div className="relative w-[340px] h-[340px]">

        {/* Outer ring — rotação lenta horária */}
        <motion.div
          className="absolute inset-0 rounded-full border border-white/5"
          animate={{ rotate: 360 }}
          transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
        />

        {/* Middle ring — rotação anti-horária */}
        <motion.div
          className="absolute inset-10 rounded-full border border-primary-container/15"
          animate={{ rotate: -360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />

        {/* Inner ring */}
        <div className="absolute inset-20 rounded-full border border-primary-container/25" />

        {/* Core — pulso de brilho */}
        <motion.div
          className="absolute inset-[88px] rounded-full bg-primary-container/10 border border-primary-container/30 flex items-center justify-center"
          animate={{
            boxShadow: [
              "0 0 0px rgba(200,98,30,0)",
              "0 0 36px rgba(200,98,30,0.28)",
              "0 0 0px rgba(200,98,30,0)",
            ],
          }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Ícone de raio — pulso de escala */}
          <motion.span
            className="material-symbols-outlined text-primary-container"
            style={{ fontSize: "64px", opacity: 0.9 }}
            animate={{ scale: [1, 1.14, 1], opacity: [0.9, 1, 0.9] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          >
            bolt
          </motion.span>
        </motion.div>

        {/* Tick marks — giram com o anel externo */}
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
        >
          {[0, 60, 120, 180, 240, 300].map((deg) => (
            <div
              key={deg}
              className="absolute w-2.5 h-px bg-primary-container/25"
              style={{
                top: "50%",
                left: "50%",
                transformOrigin: "0 0",
                transform: `rotate(${deg}deg) translateX(158px) translateY(-0.5px)`,
              }}
            />
          ))}
        </motion.div>

        {/* Dots — pulsam em opacidade */}
        {[0, 90, 180, 270].map((deg) => (
          <motion.div
            key={`dot-${deg}`}
            className="absolute w-1.5 h-1.5 rounded-full bg-primary-container/40"
            style={{
              top: "50%",
              left: "50%",
              transformOrigin: "0 0",
              transform: `rotate(${deg}deg) translateX(128px) translateY(-3px)`,
            }}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: deg / 360,
            }}
          />
        ))}
      </div>
    </div>
  );
}
