"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Navbar from "../../components/Navbar";
import { HelpCircle, ChevronDown, MessageSquare, Zap } from "lucide-react";

const faqs = [
  {
    q: "Is Salt Paid?",
    a: "Salt is gonna be forever free with ads. We believe in making powerful tools accessible to everyone — no paywall, no BS.",
  },
  {
    q: "Is Salt Keyless?",
    a: "No, Salt has a key system to ensure quality and sustainability. The daily free key is obtained through a quick ad (Linkvertise or Lootlabs) and lasts 24 hours.",
  },
  {
    q: "When will Salt Release?",
    a: "Salt has not released yet. We are working around the clock to make sure everything is perfect before launch. Stay tuned in our Discord for the latest updates.",
  },
  {
    q: "Salt Paid Keys Prices?",
    a: "1 Day = Free (Ads)\n1 Week = $2.99\n30 Days = $9.99\nPerm Key = $14.99\n\nPaid keys skip the ad system entirely and give you priority support.",
  },
  {
    q: "Does Salt support Multi Instance?",
    a: "Currently, it is working well since our last test. Multi-instance support has been confirmed and is performing smoothly across all test environments.",
  },
  {
    q: "Is Salt undetected?",
    a: "Salt Team are trying their best to bypass client modification bans. However, no executor is 100% safe during ban waves. We strongly recommend using an alt account just in case.",
  },
  {
    q: "More questions?",
    a: "Join our Discord server to get real-time answers from the Salt team and community. We're always active and happy to help.",
  },
];

function useTypewriter(text, active, speed = 18) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    if (!active) {
      setDisplayed("");
      return;
    }
    let i = 0;
    setDisplayed("");
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, active, speed]);

  return displayed;
}

function FAQItem({ faq, index, isOpen, onToggle }) {
  const typed = useTypewriter(faq.a, isOpen, 16);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07 }}
      className="rounded-2xl overflow-hidden"
      style={{
        background: "var(--surface,rgba(14,14,14,0.85))",
        border: isOpen
          ? "1px solid var(--accent,#ef4444)"
          : "1px solid var(--border,rgba(255,255,255,0.07))",
        boxShadow: isOpen
          ? "0 0 30px var(--accent-glow,rgba(239,68,68,0.1))"
          : "none",
        backdropFilter: "blur(20px)",
        transition: "border-color 0.3s, box-shadow 0.3s",
      }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-7 py-6 text-left group"
        style={{ background: "transparent", border: "none", cursor: "pointer" }}
      >
        <span
          className="text-base font-bold text-white pr-4"
          style={{ letterSpacing: "0.01em" }}
        >
          <span
            className="mr-3 font-mono text-sm"
            style={{ color: "var(--accent,#ef4444)" }}
          >
            {String(index + 1).padStart(2, "0")}.
          </span>
          {faq.q}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center"
          style={{
            background: isOpen
              ? "var(--accent-glow,rgba(239,68,68,0.15))"
              : "rgba(255,255,255,0.04)",
            color: isOpen ? "var(--accent,#ef4444)" : "rgba(255,255,255,0.4)",
            transition: "background 0.3s, color 0.3s",
          }}
        >
          <ChevronDown size={16} />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div
              className="px-7 pb-7"
              style={{
                borderTop: "1px solid var(--border,rgba(255,255,255,0.07))",
                paddingTop: "20px",
              }}
            >
              <p
                className="text-sm leading-relaxed whitespace-pre-line font-mono"
                style={{ color: "var(--muted,#6b7280)" }}
              >
                {typed}
                {typed.length < faq.a.length && (
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    style={{ color: "var(--accent,#ef4444)" }}
                  >
                    |
                  </motion.span>
                )}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div
      className="min-h-screen text-white font-sans"
      style={{ background: "var(--bg,#050505)" }}
    >
      <Navbar />

      {/* Background orbs */}
      <div
        className="fixed inset-0 pointer-events-none overflow-hidden"
        style={{ zIndex: 0 }}
      >
        <div
          className="absolute rounded-full"
          style={{
            width: 500,
            height: 500,
            top: "-100px",
            right: "-100px",
            background:
              "radial-gradient(circle, var(--orb1,rgba(239,68,68,0.08)) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 400,
            height: 400,
            bottom: "100px",
            left: "-100px",
            background:
              "radial-gradient(circle, var(--orb2,rgba(127,29,29,0.07)) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <main
        className="relative pt-36 pb-20 px-6 max-w-3xl mx-auto"
        style={{ zIndex: 1 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mx-auto mb-6"
            style={{
              background: "var(--accent-glow,rgba(239,68,68,0.12))",
              border: "1px solid var(--accent-glow,rgba(239,68,68,0.2))",
            }}
          >
            <HelpCircle size={32} style={{ color: "var(--accent,#ef4444)" }} />
          </motion.div>

          <div
            className="text-xs font-black tracking-[0.4em] mb-3"
            style={{ color: "var(--accent,#ef4444)" }}
          >
            KNOWLEDGE BASE
          </div>
          <h1
            className="text-5xl md:text-6xl font-black text-white mb-4"
            style={{ letterSpacing: "-0.02em" }}
          >
            FAQ
          </h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="h-px mx-auto mb-6"
            style={{
              maxWidth: 200,
              background:
                "linear-gradient(90deg,transparent,var(--accent,#ef4444),transparent)",
            }}
          />
          <p className="text-base" style={{ color: "var(--muted,#6b7280)" }}>
            Click any question to reveal the answer.
          </p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              faq={faq}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 p-8 rounded-2xl text-center relative overflow-hidden"
          style={{
            background: "var(--surface,rgba(14,14,14,0.85))",
            border: "1px solid var(--border,rgba(255,255,255,0.07))",
            backdropFilter: "blur(20px)",
          }}
        >
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{
              background:
                "linear-gradient(90deg,transparent,var(--accent,#ef4444),transparent)",
            }}
          />
          <div
            className="text-xs font-black tracking-widest mb-3"
            style={{ color: "var(--accent,#ef4444)" }}
          >
            STILL NEED HELP?
          </div>
          <h3 className="text-2xl font-black text-white mb-2">
            More in Discord
          </h3>
          <p className="text-sm mb-6" style={{ color: "var(--muted,#6b7280)" }}>
            Our team and community are always ready to help.
          </p>
          <motion.a
            href="https://discord.gg/yZyHEugsPF"
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-white"
            style={{
              background:
                "var(--gradient,linear-gradient(135deg,#ef4444,#dc2626))",
              boxShadow: "0 8px 28px var(--accent-glow,rgba(239,68,68,0.35))",
              textDecoration: "none",
            }}
          >
            <MessageSquare size={18} />
            JOIN DISCORD
          </motion.a>
        </motion.div>
      </main>

      <style jsx global>{`
        html { scroll-behavior: smooth; }
      `}</style>
    </div>
  );
}
