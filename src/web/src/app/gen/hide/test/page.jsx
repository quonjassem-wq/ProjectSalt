"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ShieldCheck,
  Key,
  Copy,
  AlertCircle,
  Lock,
  LogOut,
  Hash,
  Clock,
  Zap,
  Activity,
  Check,
  RefreshCw,
} from "lucide-react";
import { toast, Toaster } from "sonner";

const ADMIN_PASS = "SALTY-WAS-HEREWITHSUGAR_ezez.meow.ez.kidd_keno";

const S = {
  card: {
    background: "rgba(14,14,14,0.9)",
    border: "1px solid rgba(255,255,255,0.07)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    borderRadius: 20,
  },
  input: {
    width: "100%",
    padding: "13px 18px",
    borderRadius: 14,
    fontSize: 14,
    color: "white",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    outline: "none",
    fontFamily: "monospace",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
  },
  label: {
    fontSize: 11,
    fontWeight: 900,
    letterSpacing: "0.18em",
    color: "rgba(255,255,255,0.35)",
    marginBottom: 8,
    display: "block",
    textTransform: "uppercase",
  },
  accentLine: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    background: "linear-gradient(90deg,transparent,#ef4444,transparent)",
  },
};

function StatCard({ icon, label, value, color = "#ef4444" }) {
  return (
    <div
      style={{
        ...S.card,
        padding: "20px 22px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={S.accentLine} />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 10,
        }}
      >
        <span
          style={{
            fontSize: 11,
            fontWeight: 900,
            letterSpacing: "0.14em",
            color: "rgba(255,255,255,0.35)",
            textTransform: "uppercase",
          }}
        >
          {label}
        </span>
        <div style={{ color, opacity: 0.7 }}>{icon}</div>
      </div>
      <div style={{ fontSize: 26, fontWeight: 900, color: "white" }}>
        {value}
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(false);
  const [duration, setDuration] = useState(1);
  const [amount, setAmount] = useState(1);
  const [generatedKeys, setGeneratedKeys] = useState([]);
  const [copiedKey, setCopiedKey] = useState(null);
  const [stats, setStats] = useState({
    active: "--",
    total: "--",
    hwids: "--",
  });

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASS) {
      setIsAuthorized(true);
      toast.success("Welcome back, Salt.", {
        style: {
          background: "#0a0a0a",
          border: "1px solid rgba(239,68,68,0.3)",
          color: "white",
        },
      });
    } else {
      toast.error("Invalid admin key.", {
        style: {
          background: "#0a0a0a",
          border: "1px solid rgba(239,68,68,0.3)",
          color: "white",
        },
      });
    }
  };

  const generateKeys = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const res = await fetch("/api/admin/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, duration, amount }),
      });
      const data = await res.json();
      if (data.keys) {
        setGeneratedKeys(data.keys);
        toast.success(
          `Generated ${amount} key${amount > 1 ? "s" : ""} successfully.`,
          {
            style: {
              background: "#0a0a0a",
              border: "1px solid rgba(34,197,94,0.3)",
              color: "white",
            },
          },
        );
      } else {
        toast.error(data.error || "Generation failed.", {
          style: {
            background: "#0a0a0a",
            border: "1px solid rgba(239,68,68,0.3)",
            color: "white",
          },
        });
      }
    } catch {
      toast.error("Server connection error.", {
        style: {
          background: "#0a0a0a",
          border: "1px solid rgba(239,68,68,0.3)",
          color: "white",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  const copyKey = (key) => {
    if (typeof navigator !== "undefined") navigator.clipboard.writeText(key);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1800);
    toast.success("Copied to clipboard!", {
      style: {
        background: "#0a0a0a",
        border: "1px solid rgba(34,197,94,0.3)",
        color: "white",
      },
    });
  };

  const copyAll = () => {
    if (typeof navigator !== "undefined")
      navigator.clipboard.writeText(
        generatedKeys.map((k) => k.key_value).join("\n"),
      );
    toast.success("All keys copied!", {
      style: {
        background: "#0a0a0a",
        border: "1px solid rgba(34,197,94,0.3)",
        color: "white",
      },
    });
  };

  // LOGIN SCREEN
  if (!isAuthorized) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#050505",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 24,
          fontFamily: "sans-serif",
        }}
      >
        <Toaster position="top-center" />

        {/* BG */}
        <div
          style={{
            position: "fixed",
            inset: 0,
            pointerEvents: "none",
            overflow: "hidden",
          }}
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "absolute",
              width: 600,
              height: 600,
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              borderRadius: "50%",
              background:
                "radial-gradient(circle,rgba(239,68,68,0.07) 0%,transparent 70%)",
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

        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring" }}
          style={{
            ...S.card,
            width: "100%",
            maxWidth: 420,
            padding: "52px 44px",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
            zIndex: 1,
          }}
        >
          <div style={S.accentLine} />

          {/* Icon */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            style={{
              width: 72,
              height: 72,
              borderRadius: 20,
              background: "rgba(239,68,68,0.1)",
              border: "1px solid rgba(239,68,68,0.2)",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 24,
              boxShadow: "0 0 40px rgba(239,68,68,0.1)",
            }}
          >
            <Lock size={32} style={{ color: "#ef4444" }} />
          </motion.div>

          <div
            style={{
              fontSize: 11,
              fontWeight: 900,
              letterSpacing: "0.35em",
              color: "#ef4444",
              marginBottom: 8,
            }}
          >
            RESTRICTED ACCESS
          </div>
          <h1
            style={{
              fontSize: 28,
              fontWeight: 900,
              color: "white",
              margin: "0 0 6px",
              letterSpacing: "-0.02em",
            }}
          >
            Admin Portal
          </h1>
          <p
            style={{
              fontSize: 13,
              color: "rgba(255,255,255,0.35)",
              margin: "0 0 36px",
            }}
          >
            Authorized personnel only.
          </p>

          <form
            onSubmit={handleLogin}
            style={{ display: "flex", flexDirection: "column", gap: 14 }}
          >
            <input
              type="password"
              placeholder="Enter admin secret key"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                ...S.input,
                textAlign: "center",
                letterSpacing: "0.08em",
              }}
              onFocus={(e) =>
                (e.target.style.borderColor = "rgba(239,68,68,0.5)")
              }
              onBlur={(e) =>
                (e.target.style.borderColor = "rgba(255,255,255,0.1)")
              }
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{
                padding: "15px",
                borderRadius: 14,
                fontWeight: 900,
                fontSize: 14,
                color: "white",
                border: "none",
                cursor: "pointer",
                background: "linear-gradient(135deg,#ef4444,#dc2626)",
                boxShadow: "0 8px 28px rgba(239,68,68,0.3)",
                letterSpacing: "0.06em",
              }}
            >
              ACCESS TERMINAL
            </motion.button>
          </form>
        </motion.div>

        <style jsx global>{`body{margin:0}*{box-sizing:border-box}`}</style>
      </div>
    );
  }

  // DASHBOARD
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#050505",
        color: "white",
        fontFamily: "sans-serif",
        overflowX: "hidden",
      }}
    >
      <Toaster position="top-right" />

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
          animate={{ x: [0, 60, 0], y: [0, -40, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute",
            width: 600,
            height: 600,
            top: -200,
            left: -200,
            borderRadius: "50%",
            background:
              "radial-gradient(circle,rgba(239,68,68,0.1) 0%,transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <motion.div
          animate={{ x: [0, -50, 0], y: [0, 60, 0] }}
          transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute",
            width: 500,
            height: 500,
            bottom: -100,
            right: -100,
            borderRadius: "50%",
            background:
              "radial-gradient(circle,rgba(127,29,29,0.08) 0%,transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.01) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.01) 1px,transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 1200,
          margin: "0 auto",
          padding: "32px 24px 80px",
        }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            ...S.card,
            padding: "24px 32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 28,
            position: "relative",
            overflow: "hidden",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <div style={S.accentLine} />
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            {/* Logo badge */}
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 14,
                background: "linear-gradient(135deg,#ef4444,#dc2626)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 24px rgba(239,68,68,0.4)",
                flexShrink: 0,
              }}
            >
              <ShieldCheck size={24} color="white" />
            </div>
            <div>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 900,
                  letterSpacing: "0.3em",
                  color: "#ef4444",
                  marginBottom: 2,
                }}
              >
                SALT EXECUTOR
              </div>
              <h1
                style={{
                  fontSize: 20,
                  fontWeight: 900,
                  color: "white",
                  margin: 0,
                  letterSpacing: "-0.01em",
                }}
              >
                Control Center
              </h1>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                padding: "6px 14px",
                borderRadius: 999,
                fontSize: 12,
                fontWeight: 700,
                background: "rgba(34,197,94,0.08)",
                border: "1px solid rgba(34,197,94,0.2)",
                color: "#22c55e",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <motion.span
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "#22c55e",
                  display: "inline-block",
                }}
              />
              ONLINE
            </div>
            <motion.button
              onClick={() => {
                setIsAuthorized(false);
                setGeneratedKeys([]);
              }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "8px 16px",
                borderRadius: 12,
                fontSize: 13,
                fontWeight: 700,
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "rgba(255,255,255,0.6)",
                cursor: "pointer",
              }}
            >
              <LogOut size={14} /> Sign Out
            </motion.button>
          </div>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
            gap: 14,
            marginBottom: 28,
          }}
        >
          <StatCard
            icon={<Activity size={16} />}
            label="Active Keys"
            value={stats.active}
          />
          <StatCard
            icon={<Hash size={16} />}
            label="Total HWIDs"
            value={stats.total}
          />
          <StatCard
            icon={<Zap size={16} />}
            label="Generated This Session"
            value={generatedKeys.length}
            color="#22c55e"
          />
          <StatCard
            icon={<Clock size={16} />}
            label="System Status"
            value="Online"
            color="#22c55e"
          />
        </motion.div>

        {/* Main grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
            gap: 20,
            alignItems: "start",
          }}
          className="admin-grid"
        >
          {/* LEFT — generator */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
          >
            <div
              style={{
                ...S.card,
                padding: "32px 28px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div style={S.accentLine} />

              {/* Gradient header strip */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 28,
                }}
              >
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 12,
                    background: "linear-gradient(135deg,#ef4444,#dc2626)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 4px 14px rgba(239,68,68,0.35)",
                  }}
                >
                  <Key size={18} color="white" />
                </div>
                <div>
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 900,
                      letterSpacing: "0.2em",
                      color: "#ef4444",
                    }}
                  >
                    KEY GENERATOR
                  </div>
                  <div
                    style={{ fontSize: 15, fontWeight: 900, color: "white" }}
                  >
                    Generate Keys
                  </div>
                </div>
              </div>

              {/* Duration */}
              <div style={{ marginBottom: 20 }}>
                <label style={S.label}>Duration (Days)</label>
                <div
                  style={{
                    display: "flex",
                    gap: 8,
                    flexWrap: "wrap",
                    marginBottom: 10,
                  }}
                >
                  {[1, 7, 30, 9999].map((d) => (
                    <motion.button
                      key={d}
                      onClick={() => setDuration(d)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      style={{
                        flex: "1 1 auto",
                        padding: "8px 10px",
                        borderRadius: 10,
                        fontSize: 12,
                        fontWeight: 900,
                        border: "1px solid",
                        cursor: "pointer",
                        transition: "all 0.2s",
                        background:
                          duration === d
                            ? "rgba(239,68,68,0.15)"
                            : "rgba(255,255,255,0.04)",
                        borderColor:
                          duration === d
                            ? "rgba(239,68,68,0.5)"
                            : "rgba(255,255,255,0.08)",
                        color:
                          duration === d ? "#ef4444" : "rgba(255,255,255,0.5)",
                      }}
                    >
                      {d === 9999 ? "Perm" : `${d}d`}
                    </motion.button>
                  ))}
                </div>
                <input
                  type="number"
                  value={duration}
                  min={1}
                  onChange={(e) =>
                    setDuration(Math.max(1, parseInt(e.target.value) || 1))
                  }
                  style={S.input}
                  onFocus={(e) =>
                    (e.target.style.borderColor = "rgba(239,68,68,0.5)")
                  }
                  onBlur={(e) =>
                    (e.target.style.borderColor = "rgba(255,255,255,0.1)")
                  }
                />
              </div>

              {/* Amount */}
              <div style={{ marginBottom: 28 }}>
                <label style={S.label}>Quantity</label>
                <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
                  {[1, 5, 10, 25].map((a) => (
                    <motion.button
                      key={a}
                      onClick={() => setAmount(a)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      style={{
                        flex: 1,
                        padding: "8px 0",
                        borderRadius: 10,
                        fontSize: 12,
                        fontWeight: 900,
                        border: "1px solid",
                        cursor: "pointer",
                        transition: "all 0.2s",
                        background:
                          amount === a
                            ? "rgba(239,68,68,0.15)"
                            : "rgba(255,255,255,0.04)",
                        borderColor:
                          amount === a
                            ? "rgba(239,68,68,0.5)"
                            : "rgba(255,255,255,0.08)",
                        color:
                          amount === a ? "#ef4444" : "rgba(255,255,255,0.5)",
                      }}
                    >
                      {a}
                    </motion.button>
                  ))}
                </div>
                <input
                  type="number"
                  value={amount}
                  min={1}
                  max={100}
                  onChange={(e) =>
                    setAmount(
                      Math.max(1, Math.min(100, parseInt(e.target.value) || 1)),
                    )
                  }
                  style={S.input}
                  onFocus={(e) =>
                    (e.target.style.borderColor = "rgba(239,68,68,0.5)")
                  }
                  onBlur={(e) =>
                    (e.target.style.borderColor = "rgba(255,255,255,0.1)")
                  }
                />
              </div>

              <motion.button
                onClick={generateKeys}
                disabled={loading}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  width: "100%",
                  padding: "16px",
                  borderRadius: 14,
                  fontWeight: 900,
                  fontSize: 14,
                  color: "white",
                  border: "none",
                  cursor: loading ? "not-allowed" : "pointer",
                  letterSpacing: "0.06em",
                  background: loading
                    ? "rgba(239,68,68,0.3)"
                    : "linear-gradient(135deg,#ef4444,#dc2626)",
                  boxShadow: loading
                    ? "none"
                    : "0 8px 28px rgba(239,68,68,0.3)",
                  transition: "all 0.2s",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                }}
              >
                {loading ? (
                  <>
                    <RefreshCw
                      size={16}
                      style={{ animation: "spin 1s linear infinite" }}
                    />{" "}
                    GENERATING...
                  </>
                ) : (
                  <>
                    <Key size={16} /> GENERATE KEYS
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>

          {/* RIGHT — keys output */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            style={{ ...S.card, position: "relative", overflow: "hidden" }}
          >
            <div style={S.accentLine} />

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "24px 28px",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 900,
                    letterSpacing: "0.2em",
                    color: "#ef4444",
                    marginBottom: 2,
                  }}
                >
                  OUTPUT
                </div>
                <h2
                  style={{
                    fontSize: 16,
                    fontWeight: 900,
                    color: "white",
                    margin: 0,
                  }}
                >
                  Generated Keys{" "}
                  {generatedKeys.length > 0 && (
                    <span style={{ color: "#ef4444" }}>
                      ({generatedKeys.length})
                    </span>
                  )}
                </h2>
              </div>
              {generatedKeys.length > 0 && (
                <motion.button
                  onClick={copyAll}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "8px 16px",
                    borderRadius: 10,
                    fontSize: 12,
                    fontWeight: 900,
                    background: "rgba(239,68,68,0.1)",
                    border: "1px solid rgba(239,68,68,0.25)",
                    color: "#ef4444",
                    cursor: "pointer",
                  }}
                >
                  <Copy size={13} /> COPY ALL
                </motion.button>
              )}
            </div>

            <div
              style={{ padding: 20, maxHeight: 480, overflowY: "auto" }}
              className="salt-scroll"
            >
              <AnimatePresence mode="popLayout">
                {generatedKeys.length === 0 ? (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{
                      height: 280,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 14,
                    }}
                  >
                    <div
                      style={{
                        width: 60,
                        height: 60,
                        borderRadius: 18,
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.06)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Key size={26} style={{ opacity: 0.2, color: "white" }} />
                    </div>
                    <p
                      style={{
                        color: "rgba(255,255,255,0.25)",
                        fontSize: 13,
                        margin: 0,
                        fontStyle: "italic",
                      }}
                    >
                      No keys generated yet. Configure and click Generate.
                    </p>
                  </motion.div>
                ) : (
                  <div
                    style={{ display: "flex", flexDirection: "column", gap: 8 }}
                  >
                    {generatedKeys.map((k, idx) => (
                      <motion.div
                        key={k.key_value}
                        initial={{ opacity: 0, x: 20, scale: 0.97 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        transition={{ delay: idx * 0.04 }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "14px 18px",
                          borderRadius: 14,
                          background: "rgba(255,255,255,0.03)",
                          border: "1px solid rgba(255,255,255,0.06)",
                          gap: 12,
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 12,
                            flex: 1,
                            minWidth: 0,
                          }}
                        >
                          <div
                            style={{
                              width: 32,
                              height: 32,
                              borderRadius: 10,
                              background: "rgba(239,68,68,0.1)",
                              border: "1px solid rgba(239,68,68,0.2)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexShrink: 0,
                            }}
                          >
                            <Key size={14} style={{ color: "#ef4444" }} />
                          </div>
                          <div style={{ minWidth: 0 }}>
                            <code
                              style={{
                                fontFamily: "monospace",
                                fontWeight: 700,
                                color: "white",
                                fontSize: 13,
                                display: "block",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {k.key_value}
                            </code>
                            <span
                              style={{
                                fontSize: 10,
                                fontWeight: 900,
                                letterSpacing: "0.12em",
                                textTransform: "uppercase",
                                color: "rgba(255,255,255,0.3)",
                              }}
                            >
                              {k.duration_days === 9999
                                ? "Permanent"
                                : `${k.duration_days} Day License`}
                            </span>
                          </div>
                        </div>
                        <motion.button
                          onClick={() => copyKey(k.key_value)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          style={{
                            width: 34,
                            height: 34,
                            borderRadius: 10,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background:
                              copiedKey === k.key_value
                                ? "rgba(34,197,94,0.15)"
                                : "rgba(255,255,255,0.05)",
                            border: `1px solid ${copiedKey === k.key_value ? "rgba(34,197,94,0.3)" : "rgba(255,255,255,0.08)"}`,
                            cursor: "pointer",
                            flexShrink: 0,
                            transition: "all 0.2s",
                          }}
                        >
                          {copiedKey === k.key_value ? (
                            <Check size={14} style={{ color: "#22c55e" }} />
                          ) : (
                            <Copy
                              size={14}
                              style={{ color: "rgba(255,255,255,0.5)" }}
                            />
                          )}
                        </motion.button>
                      </motion.div>
                    ))}
                  </div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx global>{`
        body { margin: 0; }
        * { box-sizing: border-box; }
        .salt-scroll::-webkit-scrollbar { width: 4px; }
        .salt-scroll::-webkit-scrollbar-track { background: rgba(255,255,255,0.02); border-radius: 10px; }
        .salt-scroll::-webkit-scrollbar-thumb { background: rgba(239,68,68,0.3); border-radius: 10px; }
        .salt-scroll::-webkit-scrollbar-thumb:hover { background: rgba(239,68,68,0.5); }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @media (min-width: 860px) { .admin-grid { grid-template-columns: 340px 1fr !important; } }
      `}</style>
    </div>
  );
}
