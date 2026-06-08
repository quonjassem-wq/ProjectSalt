"use client";
import React from "react";
import { motion } from "motion/react";
import Navbar from "../../components/Navbar";
import { MessageSquare, Wrench, ExternalLink } from "lucide-react";

export default function HelpPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg,#050505)",
        color: "white",
        fontFamily: "sans-serif",
        overflowX: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Navbar />

      {/* BG */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          overflow: "hidden",
          zIndex: 0,
        }}
      >
        <motion.div
          animate={{ scale: [1, 1.18, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute",
            width: 700,
            height: 700,
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            borderRadius: "50%",
            background:
              "radial-gradient(circle,var(--orb1,rgba(239,68,68,0.07)) 0%,transparent 70%)",
            filter: "blur(100px)",
          }}
        />
        <motion.div
          animate={{ scale: [1.15, 1, 1.15] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute",
            width: 500,
            height: 500,
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            borderRadius: "50%",
            background:
              "radial-gradient(circle,var(--orb2,rgba(127,29,29,0.07)) 0%,transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.012) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.012) 1px,transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* Centered content */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px 24px 60px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.93 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, type: "spring", damping: 14 }}
          style={{
            maxWidth: 480,
            width: "100%",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 28,
          }}
        >
          {/* Icon */}
          <motion.div
            animate={{ y: [0, -12, 0], rotate: [0, 8, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "relative",
              width: 112,
              height: 112,
              borderRadius: 28,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "var(--accent-glow,rgba(239,68,68,0.1))",
              border: "1px solid var(--accent-glow,rgba(239,68,68,0.25))",
              boxShadow: "0 0 60px var(--accent-glow,rgba(239,68,68,0.15))",
            }}
          >
            <Wrench size={50} style={{ color: "var(--accent,#ef4444)" }} />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: 28,
                border: "1px solid var(--accent,#ef4444)",
                borderTopColor: "transparent",
                borderLeftColor: "transparent",
              }}
            />
          </motion.div>

          {/* Text */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div
              style={{
                fontSize: 11,
                fontWeight: 900,
                letterSpacing: "0.4em",
                color: "var(--accent,#ef4444)",
              }}
            >
              HELP CENTER
            </div>
            <h1
              style={{
                fontSize: "clamp(48px,10vw,80px)",
                fontWeight: 900,
                color: "white",
                letterSpacing: "-0.03em",
                margin: 0,
                lineHeight: 0.9,
              }}
            >
              COMING
              <br />
              SOON
            </h1>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5 }}
              style={{
                height: 1,
                width: 140,
                background:
                  "linear-gradient(90deg,transparent,var(--accent,#ef4444),transparent)",
              }}
            />
            <p
              style={{
                fontSize: 15,
                color: "var(--muted,#6b7280)",
                lineHeight: 1.65,
                maxWidth: 380,
                margin: 0,
              }}
            >
              Our official help center is under construction. For now, find all
              the support you need in our Discord — we're always active.
            </p>
          </div>

          {/* Discord button */}
          <motion.a
            href="https://discord.gg/yZyHEugsPF"
            target="_blank"
            rel="noreferrer"
            whileHover={{
              scale: 1.06,
              boxShadow: "0 12px 40px var(--accent-glow,rgba(239,68,68,0.45))",
            }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              padding: "16px 36px",
              borderRadius: 18,
              fontWeight: 900,
              fontSize: 15,
              color: "white",
              background:
                "var(--gradient,linear-gradient(135deg,#ef4444,#dc2626))",
              boxShadow: "0 8px 28px var(--accent-glow,rgba(239,68,68,0.35))",
              textDecoration: "none",
            }}
          >
            <MessageSquare size={20} />
            GET HELP IN DISCORD
            <ExternalLink size={15} />
          </motion.a>

          {/* Under construction badge */}
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 20px",
              borderRadius: 999,
              fontSize: 13,
              fontWeight: 700,
              background: "rgba(234,179,8,0.08)",
              border: "1px solid rgba(234,179,8,0.22)",
              color: "#eab308",
            }}
          >
            <motion.span
              animate={{ opacity: [1, 0.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#eab308",
                display: "inline-block",
              }}
            />
            Under construction
          </motion.div>
        </motion.div>
      </div>

      <style
        jsx
        global
      >{`html{scroll-behavior:smooth}body{margin:0}*{box-sizing:border-box}`}</style>
    </div>
  );
}
