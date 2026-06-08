"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Navbar from "../../components/Navbar";
import { useTheme } from "../../components/ThemeProvider";
import {
  Search,
  ShieldCheck,
  ShieldAlert,
  User,
  Settings as SettingsIcon,
  Check,
  Palette,
  Key,
  Clock,
  HardDrive,
} from "lucide-react";

const TABS = [
  { id: "check", icon: <Search size={18} />, label: "Check Key" },
  { id: "account", icon: <User size={18} />, label: "Account" },
  { id: "settings", icon: <SettingsIcon size={18} />, label: "Settings" },
];

const themePreviewColors = {
  "Onyx Dark": { bg: "#050505", accent: "#ef4444" },
  "Purple Void": { bg: "#06000f", accent: "#a855f7" },
  "Ocean Blue": { bg: "#00050f", accent: "#3b82f6" },
  "Neon Green": { bg: "#000f05", accent: "#22c55e" },
  "Crimson Blood": { bg: "#0f0000", accent: "#dc2626" },
};

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("check");
  const [keyValue, setKeyValue] = useState("");
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const { theme, setTheme, themeList } = useTheme() || {
    theme: "Onyx Dark",
    setTheme: () => {},
    themeList: Object.keys(themePreviewColors),
  };

  const checkKey = async () => {
    if (!keyValue.trim()) return;
    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch("/api/keys/status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keyValue: keyValue.trim() }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setStatus(data);
    } catch (err) {
      console.error(err);
      setStatus({ error: "Failed to check key. Try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen text-white font-sans overflow-x-hidden"
      style={{ background: "var(--bg,#050505)" }}
    >
      <Navbar />

      {/* Bg orbs */}
      <div
        className="fixed inset-0 pointer-events-none overflow-hidden"
        style={{ zIndex: 0 }}
      >
        <div
          className="absolute rounded-full"
          style={{
            width: 500,
            height: 500,
            top: 0,
            right: 0,
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
            bottom: 0,
            left: 0,
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
        className="relative pt-28 pb-20 px-4 md:px-6 max-w-5xl mx-auto"
        style={{ zIndex: 1 }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div
            className="text-xs font-black tracking-[0.4em] mb-1"
            style={{ color: "var(--accent,#ef4444)" }}
          >
            SALT DASHBOARD
          </div>
          <h1
            className="text-4xl font-black text-white"
            style={{ letterSpacing: "-0.02em" }}
          >
            Dashboard
          </h1>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-5">
          {/* Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="w-full md:w-56 flex-shrink-0"
          >
            <div
              className="p-2 rounded-2xl space-y-1"
              style={{
                background: "var(--surface,rgba(14,14,14,0.85))",
                border: "1px solid var(--border,rgba(255,255,255,0.07))",
                backdropFilter: "blur(20px)",
              }}
            >
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all text-left relative"
                  style={{
                    background:
                      activeTab === tab.id
                        ? "var(--accent-glow,rgba(239,68,68,0.12))"
                        : "transparent",
                    color:
                      activeTab === tab.id
                        ? "var(--accent,#ef4444)"
                        : "var(--muted,#6b7280)",
                    border:
                      activeTab === tab.id
                        ? "1px solid var(--accent-glow,rgba(239,68,68,0.2))"
                        : "1px solid transparent",
                  }}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>
          </motion.aside>

          {/* Main panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
            className="flex-1 rounded-2xl overflow-hidden"
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

            <AnimatePresence mode="wait">
              {/* CHECK KEY TAB */}
              {activeTab === "check" && (
                <motion.div
                  key="check"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.25 }}
                  className="p-8 space-y-8"
                >
                  <div>
                    <div
                      className="text-xs font-black tracking-widest mb-1"
                      style={{ color: "var(--accent,#ef4444)" }}
                    >
                      KEY STATUS
                    </div>
                    <h2 className="text-2xl font-black text-white">
                      Check Your Key
                    </h2>
                    <p
                      className="text-sm mt-1"
                      style={{ color: "var(--muted,#6b7280)" }}
                    >
                      Enter your key to verify status and expiration.
                    </p>
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      placeholder="SALT-XXXX-XXXX-XXXX"
                      value={keyValue}
                      onChange={(e) =>
                        setKeyValue(e.target.value.toUpperCase())
                      }
                      onKeyDown={(e) => e.key === "Enter" && checkKey()}
                      className="w-full px-5 py-4 rounded-xl text-white font-mono text-sm focus:outline-none transition-all pr-32"
                      style={{
                        background: "var(--surface2,rgba(22,22,22,0.6))",
                        border:
                          "1px solid var(--border,rgba(255,255,255,0.07))",
                      }}
                    />
                    <motion.button
                      onClick={checkKey}
                      disabled={loading || !keyValue.trim()}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.97 }}
                      className="absolute right-2 top-2 bottom-2 px-5 rounded-lg font-black text-sm text-white transition-opacity"
                      style={{
                        background:
                          "var(--gradient,linear-gradient(135deg,#ef4444,#dc2626))",
                        opacity: loading || !keyValue.trim() ? 0.5 : 1,
                      }}
                    >
                      {loading ? "..." : "VERIFY"}
                    </motion.button>
                  </div>

                  <AnimatePresence>
                    {status && (
                      <motion.div
                        initial={{ opacity: 0, y: 12, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="p-6 rounded-xl"
                        style={{
                          background: status.valid
                            ? "rgba(34,197,94,0.07)"
                            : "rgba(239,68,68,0.07)",
                          border: `1px solid ${status.valid ? "rgba(34,197,94,0.2)" : "rgba(239,68,68,0.2)"}`,
                        }}
                      >
                        <div className="flex items-start gap-4">
                          <div
                            className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                            style={{
                              background: status.valid
                                ? "rgba(34,197,94,0.15)"
                                : "rgba(239,68,68,0.15)",
                            }}
                          >
                            {status.valid ? (
                              <ShieldCheck size={20} color="#22c55e" />
                            ) : (
                              <ShieldAlert size={20} color="#ef4444" />
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="font-black text-base text-white mb-1">
                              {status.valid
                                ? "✅ Key Active"
                                : status.error || "❌ Key Invalid / Expired"}
                            </p>
                            <div className="space-y-1">
                              {status.expires_at && (
                                <div
                                  className="flex items-center gap-2 text-xs"
                                  style={{ color: "var(--muted,#6b7280)" }}
                                >
                                  <Clock size={12} />
                                  Expires:{" "}
                                  {new Date(status.expires_at).toLocaleString()}
                                </div>
                              )}
                              {status.hwid && (
                                <div
                                  className="flex items-center gap-2 text-xs"
                                  style={{ color: "var(--muted,#6b7280)" }}
                                >
                                  <HardDrive size={12} />
                                  HWID: {status.hwid.substring(0, 16)}...
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div
                    className="p-5 rounded-xl"
                    style={{
                      background: "var(--surface2,rgba(22,22,22,0.6))",
                      border: "1px solid var(--border,rgba(255,255,255,0.07))",
                    }}
                  >
                    <p
                      className="text-xs font-bold mb-1"
                      style={{ color: "var(--muted,#6b7280)" }}
                    >
                      Don't have a key?
                    </p>
                    <a
                      href="/get-key"
                      className="text-sm font-black"
                      style={{
                        color: "var(--accent,#ef4444)",
                        textDecoration: "none",
                      }}
                    >
                      Get your key here →
                    </a>
                  </div>
                </motion.div>
              )}

              {/* ACCOUNT TAB */}
              {activeTab === "account" && (
                <motion.div
                  key="account"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.25 }}
                  className="p-8 space-y-6"
                >
                  <div>
                    <div
                      className="text-xs font-black tracking-widest mb-1"
                      style={{ color: "var(--accent,#ef4444)" }}
                    >
                      ACCOUNT
                    </div>
                    <h2 className="text-2xl font-black text-white">
                      Account System
                    </h2>
                    <p
                      className="text-sm mt-1"
                      style={{ color: "var(--muted,#6b7280)" }}
                    >
                      Set your profile, username, and password through a
                      generated key.
                    </p>
                  </div>

                  <div
                    className="p-10 rounded-xl flex flex-col items-center text-center gap-4"
                    style={{
                      background: "var(--surface2,rgba(22,22,22,0.6))",
                      border: "1px solid var(--border,rgba(255,255,255,0.07))",
                    }}
                  >
                    <motion.div
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="w-16 h-16 rounded-2xl flex items-center justify-center"
                      style={{
                        background: "var(--accent-glow,rgba(239,68,68,0.1))",
                        border:
                          "1px solid var(--accent-glow,rgba(239,68,68,0.2))",
                      }}
                    >
                      <User
                        size={32}
                        style={{ color: "var(--accent,#ef4444)" }}
                      />
                    </motion.div>
                    <div>
                      <p className="font-black text-white mb-1">Coming Soon</p>
                      <p
                        className="text-sm"
                        style={{ color: "var(--muted,#6b7280)" }}
                      >
                        Account linking, profile customization, and key binding
                        are being built. Stay tuned in Discord.
                      </p>
                    </div>
                    <div
                      className="inline-flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-black"
                      style={{
                        background: "rgba(234,179,8,0.08)",
                        border: "1px solid rgba(234,179,8,0.2)",
                        color: "#eab308",
                      }}
                    >
                      <motion.span
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-2 h-2 rounded-full bg-yellow-400"
                      />
                      IN DEVELOPMENT
                    </div>
                  </div>
                </motion.div>
              )}

              {/* SETTINGS TAB */}
              {activeTab === "settings" && (
                <motion.div
                  key="settings"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.25 }}
                  className="p-8 space-y-8"
                >
                  <div>
                    <div
                      className="text-xs font-black tracking-widest mb-1"
                      style={{ color: "var(--accent,#ef4444)" }}
                    >
                      PERSONALIZATION
                    </div>
                    <h2 className="text-2xl font-black text-white">
                      Theme & Settings
                    </h2>
                    <p
                      className="text-sm mt-1"
                      style={{ color: "var(--muted,#6b7280)" }}
                    >
                      Choose a theme. Changes apply instantly across the entire
                      site.
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Palette
                        size={16}
                        style={{ color: "var(--accent,#ef4444)" }}
                      />
                      <span className="text-sm font-black text-white">
                        Color Theme
                      </span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {themeList.map((t) => {
                        const preview = themePreviewColors[t] || {
                          bg: "#050505",
                          accent: "#ef4444",
                        };
                        const isActive = theme === t;
                        return (
                          <motion.button
                            key={t}
                            onClick={() => setTheme(t)}
                            whileHover={{ scale: 1.04, y: -3 }}
                            whileTap={{ scale: 0.97 }}
                            className="relative p-4 rounded-xl text-left transition-all overflow-hidden"
                            style={{
                              background: isActive
                                ? "var(--accent-glow,rgba(239,68,68,0.1))"
                                : "var(--surface2,rgba(22,22,22,0.6))",
                              border: isActive
                                ? "1px solid var(--accent,#ef4444)"
                                : "1px solid var(--border,rgba(255,255,255,0.07))",
                              boxShadow: isActive
                                ? "0 0 20px var(--accent-glow,rgba(239,68,68,0.15))"
                                : "none",
                            }}
                          >
                            {/* Preview swatch */}
                            <div
                              className="w-full h-10 rounded-lg mb-3 relative overflow-hidden"
                              style={{ background: preview.bg }}
                            >
                              <div className="absolute inset-0 flex items-center justify-center gap-1">
                                <div
                                  className="w-3 h-3 rounded-full"
                                  style={{
                                    background: preview.accent,
                                    boxShadow: `0 0 8px ${preview.accent}80`,
                                  }}
                                />
                                <div
                                  className="w-6 h-2 rounded-full opacity-30"
                                  style={{ background: preview.accent }}
                                />
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <p className="text-xs font-black text-white truncate">
                                {t}
                              </p>
                              {isActive && (
                                <Check
                                  size={12}
                                  style={{
                                    color: "var(--accent,#ef4444)",
                                    flexShrink: 0,
                                  }}
                                />
                              )}
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Key
                        size={16}
                        style={{ color: "var(--accent,#ef4444)" }}
                      />
                      <span className="text-sm font-black text-white">
                        Key Information
                      </span>
                    </div>
                    <div
                      className="p-5 rounded-xl space-y-2 text-sm"
                      style={{
                        background: "var(--surface2,rgba(22,22,22,0.6))",
                        border:
                          "1px solid var(--border,rgba(255,255,255,0.07))",
                      }}
                    >
                      <div className="flex justify-between">
                        <span style={{ color: "var(--muted,#6b7280)" }}>
                          Free Key Duration
                        </span>
                        <span className="font-bold text-white">24 hours</span>
                      </div>
                      <div className="flex justify-between">
                        <span style={{ color: "var(--muted,#6b7280)" }}>
                          HWID Slots (free)
                        </span>
                        <span className="font-bold text-white">1 device</span>
                      </div>
                      <div className="flex justify-between">
                        <span style={{ color: "var(--muted,#6b7280)" }}>
                          Perm Key Price
                        </span>
                        <span
                          className="font-bold"
                          style={{ color: "var(--accent,#ef4444)" }}
                        >
                          $14.99
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </main>

      <style jsx global>{`html{scroll-behavior:smooth}`}</style>
    </div>
  );
}
