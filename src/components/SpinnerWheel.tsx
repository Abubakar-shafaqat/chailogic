"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// 🎡 Wheel UI segments (sab visible rahenge)
const wheelPrizes = [
  { label: "3% OFF 😊", value: 3, color: "#D4AF37" },
  { label: "5% OFF 😊", value: 5, color: "#4B2E2E" },
  { label: "10% OFF 🎉", value: 10, color: "#D4AF37" },
  { label: "Try Again 😔", value: -1, color: "#4B2E2E" },
  { label: "30% OFF 🤩", value: 30, color: "#D4AF37" },
  { label: "No Discount 😔", value: 0, color: "#4B2E2E" },
  { label: "50% OFF 🤩", value: 50, color: "#D4AF37" },
  { label: "75% OFF 🔥", value: 75, color: "#4B2E2E" },
];

// 🎯 Controlled probability (sirf ye 5 prizes aayenge, baqi NEVER)
const controlledPrizes = [
  { label: "3% OFF 😊", value: 3, weight: 50 },
  { label: "5% OFF 😊", value: 5, weight: 30 },
  { label: "No Discount 😔", value: 0, weight: 10 },
  { label: "Try Again 😔", value: -1, weight: 8 },
  { label: "10% OFF 🎉", value: 10, weight: 2 },
];

function getControlledPrize(): typeof controlledPrizes[0] {
  const random = Math.random() * 100;
  let cumulative = 0;

  for (const prize of controlledPrizes) {
    cumulative += prize.weight;
    if (random <= cumulative) {
      return prize;
    }
  }

  return controlledPrizes[0];
}

type ModalStep = "code" | "wheel" | "result";

export default function SpinnerWheel() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState<string | null>(null);
  const [promoCode, setPromoCode] = useState("");
  const [modalStep, setModalStep] = useState<ModalStep>("code");
  const [showModal, setShowModal] = useState(false);
  const [hasSpun, setHasSpun] = useState(false);
  const [codeError, setCodeError] = useState("");

  useEffect(() => {
    setHasSpun(false);
  }, []);

  const VALID_PROMO_CODE = "Chailogic998";

  const validatePromoCode = () => {
    if (!promoCode.trim()) {
      setCodeError("Please enter a promo code");
      return false;
    }
    if (promoCode.trim().toLowerCase() !== VALID_PROMO_CODE.toLowerCase()) {
      setCodeError("Invalid promo code. Please enter a valid code.");
      return false;
    }
    setCodeError("");
    return true;
  };

  const handleContinueToSpin = () => {
    if (validatePromoCode()) {
      setModalStep("wheel");
    }
  };

  const spinWheel = useCallback(() => {
    if (isSpinning) return;

    setIsSpinning(true);
    setResult(null);

    // Controlled random prize select karo (sirf 5 allowed prizes)
    const selectedPrize = getControlledPrize();

    // Wheel mein us prize ka index dhundo
    const prizeIndex = wheelPrizes.findIndex(
      (p) => p.label === selectedPrize.label
    );

    const segmentAngle = 360 / wheelPrizes.length;
    const extraSpins = 5 * 360;
    const targetAngle = 360 - (prizeIndex * segmentAngle) - segmentAngle / 2;
    const newRotation = rotation + extraSpins + targetAngle;

    setRotation(newRotation);

    setTimeout(() => {
      setIsSpinning(false);
      setHasSpun(true);

      if (selectedPrize.value === -1) {
        setResult("Oops! Try Again 😔 Better luck next time!");
      } else if (selectedPrize.value === 0) {
        setResult("Sorry! No Discount this time 😔");
      } else if (selectedPrize.value <= 5) {
        setResult(`Yay! You got ${selectedPrize.label} 🎊`);
      } else if (selectedPrize.value <= 10) {
        setResult(`Awesome! You got ${selectedPrize.label} 🎉`);
      } else {
        setResult(`JACKPOT! You won ${selectedPrize.label} 🤩🔥`);
      }

      setModalStep("result");
    }, 4000);
  }, [isSpinning, rotation]);

  const handleCloseModal = () => {
    setShowModal(false);
    setPromoCode("");
    setCodeError("");
    if (!hasSpun) {
      setModalStep("code");
    }
  };

  return (
    <>
      {/* Spin & Win Section */}
      <section
        id="offers"
        className="py-16 md:py-24 bg-gradient-to-b from-cream to-brown/10"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-brown mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            🎁 Spin & Win
          </motion.h2>
          <motion.p
            className="text-brown/70 mb-8 text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Enter your promo code and spin to win discounts up to 75% OFF! 🎉
          </motion.p>

          {hasSpun ? (
            <motion.div
              className="bg-white rounded-2xl p-6 shadow-lg max-w-md mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-brown font-semibold text-lg">
                🎰 You've already used your spin!
              </p>
              <p className="text-brown/60 mt-2">
                Each customer can only spin once. Visit us again for new offers!
              </p>
            </motion.div>
          ) : (
            <motion.button
              onClick={() => setShowModal(true)}
              className="bg-gold hover:bg-gold-light text-brown font-bold py-4 px-8 md:py-5 md:px-12 rounded-full text-lg md:text-xl transition-all duration-300 transform hover:scale-105 shadow-lg pulse-gold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              🎁 Spin & Win Discount
            </motion.button>
          )}
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseModal}
          >
            <motion.div
              className="bg-cream rounded-3xl p-6 md:p-8 max-w-md w-full relative shadow-2xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 text-brown hover:text-gold transition-colors text-2xl"
              >
                ✕
              </button>

              {/* Step 1: Enter Promo Code */}
              {modalStep === "code" && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <h3 className="text-2xl md:text-3xl font-bold text-brown text-center mb-2">
                    Enter Promo Code
                  </h3>
                  <p className="text-brown/60 text-center mb-6">
                    Enter your exclusive promo code to spin the wheel
                  </p>

                  <div className="mb-4">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => {
                        setPromoCode(e.target.value);
                        setCodeError("");
                      }}
                      onKeyDown={(e) => e.key === "Enter" && handleContinueToSpin()}
                      placeholder="Enter promo code..."
                      className="w-full px-4 py-3 rounded-xl border-2 border-brown/20 focus:border-gold outline-none text-brown bg-white text-lg transition-colors"
                    />
                    {codeError && (
                      <p className="mt-2 text-red-500 text-sm">{codeError}</p>
                    )}
                  </div>

                  <button
                    onClick={handleContinueToSpin}
                    className="w-full py-3 rounded-full font-bold text-lg bg-gold hover:bg-gold-light text-brown transition-all duration-300 transform hover:scale-105"
                  >
                    Continue to Spin →
                  </button>
                </motion.div>
              )}

              {/* Step 2: Spin Wheel */}
              {modalStep === "wheel" && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <h3 className="text-2xl md:text-3xl font-bold text-brown text-center mb-6">
                    Spin the Wheel!
                  </h3>

                  {/* Promo Code Display */}
                  <div className="mb-4 p-2 bg-white rounded-lg text-center">
                    <span className="text-brown/60 text-sm">Code: </span>
                    <span className="text-brown font-semibold">{promoCode}</span>
                  </div>

                  {/* Wheel Container */}
                  <div className="relative flex justify-center mb-6">
                    {/* Pointer */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 z-10">
                      <div className="w-0 h-0 border-l-[12px] border-r-[12px] border-t-[20px] border-l-transparent border-r-transparent border-t-gold" />
                    </div>

                    {/* Wheel */}
                    <div className="relative w-64 h-64 md:w-80 md:h-80">
                      <svg
                        viewBox="0 0 100 100"
                        className="w-full h-full"
                        style={{
                          transform: `rotate(${rotation}deg)`,
                          transition: isSpinning
                            ? "transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)"
                            : "none",
                        }}
                      >
                        {wheelPrizes.map((prize, index) => {
                          const angle = (360 / wheelPrizes.length) * index;
                          const nextAngle = (360 / wheelPrizes.length) * (index + 1);
                          const startRad = (angle - 90) * (Math.PI / 180);
                          const endRad = (nextAngle - 90) * (Math.PI / 180);
                          const largeArc = 360 / wheelPrizes.length > 180 ? 1 : 0;

                          const x1 = 50 + 45 * Math.cos(startRad);
                          const y1 = 50 + 45 * Math.sin(startRad);
                          const x2 = 50 + 45 * Math.cos(endRad);
                          const y2 = 50 + 45 * Math.sin(endRad);

                          const midAngle =
                            ((angle + nextAngle) / 2 - 90) * (Math.PI / 180);
                          const textX = 50 + 28 * Math.cos(midAngle);
                          const textY = 50 + 28 * Math.sin(midAngle);

                          return (
                            <g key={index}>
                              <path
                                d={`M 50 50 L ${x1} ${y1} A 45 45 0 ${largeArc} 1 ${x2} ${y2} Z`}
                                fill={prize.color}
                                stroke="#FFF3E0"
                                strokeWidth="1"
                              />
                              <text
                                x={textX}
                                y={textY}
                                fill="#FFF3E0"
                                fontSize="4.2"
                                fontWeight="bold"
                                textAnchor="middle"
                                dominantBaseline="middle"
                                transform={`rotate(${
                                  (angle + nextAngle) / 2 + 90
                                }, ${textX}, ${textY})`}
                              >
                                {prize.label}
                              </text>
                            </g>
                          );
                        })}
                      </svg>

                      {/* Center Circle */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 md:w-16 md:h-16 bg-gold rounded-full border-4 border-cream shadow-lg flex items-center justify-center">
                          <span className="text-2xl">☕</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Spin Button */}
                  <button
                    onClick={spinWheel}
                    disabled={isSpinning}
                    className={`w-full py-3 rounded-full font-bold text-lg transition-all duration-300 ${
                      isSpinning
                        ? "bg-gray-400 cursor-not-allowed text-gray-600"
                        : "bg-gold hover:bg-gold-light text-brown transform hover:scale-105"
                    }`}
                  >
                    {isSpinning ? "Spinning..." : "SPIN NOW"}
                  </button>

                  <p className="text-brown/50 text-xs text-center mt-3">
                    ⚠️ Only 1 spin allowed per session!
                  </p>
                </motion.div>
              )}

              {/* Step 3: Result */}
              {modalStep === "result" && result && (
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="text-7xl mb-4 animate-bounce">
                    {result.includes("JACKPOT") ? "🤩" : result.includes("Awesome") ? "🎉" : result.includes("Yay") ? "🎊" : "😔"}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-brown mb-4">
                    {result.includes("JACKPOT") ? "🔥 JACKPOT! 🔥" : result.includes("Awesome") ? "🎉 Congratulations!" : result.includes("Yay") ? "🎊 Nice!" : "😔 Better Luck Next Time!"}
                  </h3>
                  <div className="p-6 bg-white rounded-xl shadow-inner mb-6">
                    <p className="text-brown font-bold text-xl">{result}</p>
                  </div>
                  <button
                    onClick={handleCloseModal}
                    className="w-full py-3 bg-gold hover:bg-gold-light text-brown rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105"
                  >
                    Close ✨
                  </button>
                  <p className="text-brown/50 text-xs mt-3">
                    Thank you for playing! Visit us again for more exciting offers 🎁
                  </p>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
