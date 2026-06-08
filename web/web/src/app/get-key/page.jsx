"use client";
import React, { useState } from "react";
import { motion } from "motion/react";
import Navbar from "../../components/Navbar";
import {
  ExternalLink,
  Shield,
  MousePointer2,
  AlertCircle,
  Key,
} from "lucide-react";

export default function GetKeyPage() {
  const [loading, setLoading] = useState(null);

  const startCheckpoint = (provider) => {
    setLoading(provider);
    setTimeout(() => {
      alert("COMING SOON — Join our Discord to be notified on launch!");
      window.open("https://discord.gg/yZyHEugsPF", "_blank");
      setLoading(null);
    }, 900);
  };

  const card = {
    background: "var(--surface,rgba(14,14,14,0.85))",
    border: "1px solid var(--border,rgba(255,255,255,0.07))",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    borderRadius: 20,
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg,#050505)",
        color: "white",
        fontFamily: "sans-serif",
        overflowX: "hidden",
      }}
    >
      <Navbar />

      {/* Background */}
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
          animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute",
            width: 600,
            height: 600,
            top: -100,
            left: -100,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, var(--orb1,rgba(239,68,68,0.1)) 0%, transparent 70%)",
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

      <main
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 900,
          margin: "0 auto",
          padding: "144px 24px 80px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: "center", marginBottom: 56 }}
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            style={{
              width: 72,
              height: 72,
              borderRadius: 20,
              background: "var(--accent-glow,rgba(239,68,68,0.12))",
              border: "1px solid var(--accent-glow,rgba(239,68,68,0.25))",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 24,
              boxShadow: "0 0 40px var(--accent-glow,rgba(239,68,68,0.15))",
            }}
          >
            <Key size={36} style={{ color: "var(--accent,#ef4444)" }} />
          </motion.div>
          <div
            style={{
              fontSize: 11,
              fontWeight: 900,
              letterSpacing: "0.35em",
              color: "var(--accent,#ef4444)",
              marginBottom: 10,
            }}
          >
            KEY SYSTEM
          </div>
          <h1
            style={{
              fontSize: "clamp(36px,6vw,56px)",
              fontWeight: 900,
              color: "white",
              letterSpacing: "-0.02em",
              margin: "0 0 12px",
            }}
          >
            Get Your Key
          </h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4 }}
            style={{
              height: 1,
              maxWidth: 160,
              margin: "0 auto 16px",
              background:
                "linear-gradient(90deg,transparent,var(--accent,#ef4444),transparent)",
            }}
          />
          <p
            style={{
              color: "var(--muted,#6b7280)",
              maxWidth: 420,
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            Complete a quick checkpoint to receive your 24-hour access key. Keys
            are locked to 1 HWID.
          </p>
        </motion.div>

        {/* Checkpoint cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
            gap: 20,
            width: "100%",
            marginBottom: 32,
          }}
        >
          {[
            {
              id: "Linkvertise",
              title: "Linkvertise",
              desc: "Fast loading, secure checkpoint. Preferred option.",
              icon: <ExternalLink size={24} />,
              accentColor: "#f97316",
            },
            {
              id: "Lootlabs",
              title: "Lootlabs",
              desc: "Alternative checkpoint. High reliability and quick offers.",
              icon: <MousePointer2 size={24} />,
              accentColor: "#3b82f6",
            },
          ].map((opt) => (
            <motion.button
              key={opt.id}
              onClick={() => startCheckpoint(opt.id)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{
                y: -6,
                boxShadow: `0 20px 50px ${opt.accentColor}22`,
              }}
              whileTap={{ scale: 0.97 }}
              disabled={!!loading}
              style={{
                ...card,
                padding: 36,
                textAlign: "left",
                border: `1px solid var(--border,rgba(255,255,255,0.07))`,
                cursor: loading ? "not-allowed" : "pointer",
                position: "relative",
                overflow: "hidden",
                opacity: loading && loading !== opt.id ? 0.5 : 1,
                transition: "transform 0.3s, box-shadow 0.3s",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 1,
                  background: `linear-gradient(90deg,transparent,${opt.accentColor},transparent)`,
                }}
              />
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 14,
                  background: `${opt.accentColor}18`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 20,
                  color: opt.accentColor,
                }}
              >
                {opt.icon}
              </div>
              <h3
                style={{
                  fontSize: 22,
                  fontWeight: 900,
                  color: "white",
                  margin: "0 0 8px",
                }}
              >
                {opt.title}
              </h3>
              <p
                style={{
                  fontSize: 14,
                  color: "var(--muted,#6b7280)",
                  margin: "0 0 24px",
                  lineHeight: 1.5,
                }}
              >
                {opt.desc}
              </p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: 12,
                  fontWeight: 900,
                  letterSpacing: "0.12em",
                  color: opt.accentColor,
                }}
              >
                {loading === opt.id ? "LOADING..." : "START CHECKPOINT"}{" "}
                <ExternalLink size={12} />
              </div>
            </motion.button>
          ))}
        </div>

        {/* Warning */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "16px 20px",
            borderRadius: 14,
            background: "rgba(234,179,8,0.06)",
            border: "1px solid rgba(234,179,8,0.18)",
            color: "#eab308",
            fontSize: 13,
            maxWidth: 600,
            width: "100%",
          }}
        >
          <AlertCircle size={16} style={{ flexShrink: 0 }} />
          <span>
            Keys are HWID-locked and last 24 hours. Make sure you are on the
            device you plan to use Salt on.
          </span>
        </motion.div>

        {/* Pricing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            ...card,
            width: "100%",
            maxWidth: 600,
            marginTop: 32,
            padding: "32px 36px",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 1,
              background:
                "linear-gradient(90deg,transparent,var(--accent,#ef4444),transparent)",
            }}
          />
          <div
            style={{
              fontSize: 11,
              fontWeight: 900,
              letterSpacing: "0.3em",
              color: "var(--accent,#ef4444)",
              marginBottom: 16,
            }}
          >
            PRICING
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { label: "1 Day", price: "Free (Ads)" },
              { label: "1 Week", price: "$2.99" },
              { label: "30 Days", price: "$9.99" },
              { label: "Permanent", price: "$14.99" },
            ].map((tier) => (
              <div
                key={tier.label}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "12px 0",
                  borderBottom:
                    "1px solid var(--border,rgba(255,255,255,0.07))",
                }}
              >
                <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 14 }}>
                  {tier.label}
                </span>
                <span
                  style={{
                    fontWeight: 900,
                    color:
                      tier.price === "Free (Ads)"
                        ? "#22c55e"
                        : "var(--accent,#ef4444)",
                    fontSize: 14,
                  }}
                >
                  {tier.price}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
