"use client";
import { useState, useEffect } from "react";

/* ──────────────── DATA ──────────────── */
const stats = [
  { label: "تذاكر مباعة", value: "12,480", change: "+18%", icon: "🎫" },
  { label: "إيرادات إعادة البيع", value: "$48,200", change: "+34%", icon: "💰" },
  { label: "حاملو التوكن", value: "3,240", change: "+12%", icon: "🪙" },
  { label: "محاولات تزوير", value: "0", change: "صفر", icon: "🛡️" },
];

const events = [
  { name: "الدوري — الجولة 22", date: "15 مارس", sold: 95, total: 42000, status: "نشط" },
  { name: "كأس المنطقة — ربع النهائي", date: "22 مارس", sold: 61, total: 18000, status: "مفتوح" },
  { name: "مباراة ودية — الاتحاد", date: "5 أبريل", sold: 28, total: 12000, status: "مفتوح" },
  { name: "سباق الفورمولا E", date: "18 أبريل", sold: 74, total: 25000, status: "نشط" },
];

const txns = [
  { fan: "أحمد م.", event: "الجولة 22", type: "شراء", amount: "$45", time: "منذ 2 دقيقة" },
  { fan: "سارة ك.", event: "الجولة 22", type: "إعادة بيع", amount: "$90", time: "منذ 8 دقائق" },
  { fan: "محمد ع.", event: "كأس المنطقة", type: "شراء", amount: "$35", time: "منذ 15 دقيقة" },
  { fan: "نورة ف.", event: "الجولة 22", type: "شراء", amount: "$45", time: "منذ 22 دقيقة" },
  { fan: "خالد ر.", event: "الفورمولا E", type: "شراء", amount: "$120", time: "منذ 30 دقيقة" },
];

const fanSteps = [
  { icon: "🎟️", title: "اختر المقعد", desc: "خريطة تفاعلية للملعب — اختر مقعدك بالضبط", done: true },
  { icon: "💳", title: "ادفع", desc: "بطاقة ائتمان أو محفظة رقمية في ثوانٍ", done: true },
  { icon: "📲", title: "استلم NFT", desc: "التذكرة وصلت لمحفظتك فوراً على البلوكتشين", done: false },
  { icon: "🏟️", title: "ادخل الملعب", desc: "امسح الـ QR عند البوابة — تحقق خلال 800ms", done: false },
];

const flowNodes = [
  { id: 1, label: "النادي", sub: "تسجيل عبر API", color: "#3b82f6", icon: "🏟️" },
  { id: 2, label: "إنشاء الحدث", sub: "تحديد التذاكر والأسعار", color: "#8b5cf6", icon: "📋" },
  { id: 3, label: "سك NFTs", sub: "ERC721 على Polygon", color: "#e31b1b", icon: "⛓️" },
  { id: 4, label: "بيع للمشجع", sub: "بطاقة أو كريبتو", color: "#f59e0b", icon: "💳" },
  { id: 5, label: "دخول الملعب", sub: "QR scan → تحقق", color: "#22c55e", icon: "✅" },
  { id: 6, label: "توزيع الإيرادات", sub: "عقد ذكي تلقائي", color: "#ec4899", icon: "💰" },
  { id: 7, label: "إعادة البيع", sub: "رويالتي تلقائياً", color: "#06b6d4", icon: "🔄" },
  { id: 8, label: "تحليلات", sub: "داشبورد مباشر", color: "#84cc16", icon: "📊" },
];

const tickets = [
  { id: 1, match: "الهلال vs النصر", date: "2026-04-15", venue: "استاد الملك فهد", price: "0.05 ETH", category: "VIP", emoji: "⚽", available: 150 },
  { id: 2, match: "الأهلي vs الاتحاد", date: "2026-04-22", venue: "استاد مدينة الملك عبدالله", price: "0.03 ETH", category: "عادي", emoji: "🏟️", available: 500 },
  { id: 3, match: "سباق الفورمولا E", date: "2026-05-01", venue: "حلبة الدرعية", price: "0.08 ETH", category: "Premium", emoji: "🏎️", available: 80 },
  { id: 4, match: "كأس السعودية للخيول", date: "2026-05-10", venue: "ميدان الملك عبدالعزيز", price: "0.1 ETH", category: "Platinum", emoji: "🐎", available: 50 },
];

const investorStats = [
  { label: "حجم السوق المستهدف", value: "$2.5B", icon: "📊" },
  { label: "معدل النمو السنوي", value: "35%", icon: "📈" },
  { label: "المستخدمين المتوقعين", value: "500K+", icon: "👥" },
  { label: "الأندية الشريكة", value: "12", icon: "🤝" },
];

const roadmap = [
  { phase: "Q2 2026", title: "إطلاق MVP", status: "current", items: ["منصة التذاكر", "ربط المحافظ", "العقود الذكية"] },
  { phase: "Q3 2026", title: "توسع السوق", status: "upcoming", items: ["Fan Tokens", "شراكات أندية", "تطبيق موبايل"] },
  { phase: "Q4 2026", title: "نمو وتوسع", status: "upcoming", items: ["ترميز الخيول", "سوق ثانوي", "AI Analytics"] },
  { phase: "Q1 2027", title: "ريادة إقليمية", status: "upcoming", items: ["توسع خليجي", "حوكمة DAO", "Metaverse"] },
];

const TABS = [
  { key: "home", label: "الرئيسية", icon: "🏠" },
  { key: "dashboard", label: "لوحة النادي", icon: "📊" },
  { key: "tickets", label: "التذاكر", icon: "🎫" },
  { key: "fan", label: "تجربة المشجع", icon: "📱" },
  { key: "flow", label: "مسار النظام", icon: "🔄" },
  { key: "investors", label: "المستثمرين", icon: "💼" },
  { key: "wallet", label: "المحفظة", icon: "🔗" },
];

/* ──────────────── STYLES ──────────────── */
const redGrad = "linear-gradient(135deg, #e31b1b, #991b1b)";

const card: React.CSSProperties = {
  background: "#0f0f0f",
  border: "1px solid #1a1a1a",
  borderRadius: 16,
  padding: 24,
};

const badge = (color: string): React.CSSProperties => ({
  display: "inline-block",
  padding: "4px 12px",
  borderRadius: 20,
  background: `${color}18`,
  color,
  fontSize: 11,
  fontWeight: 700,
});

const sectionTitle: React.CSSProperties = {
  fontSize: 32,
  fontWeight: 800,
  marginBottom: 8,
  lineHeight: 1.2,
};

const sectionSub: React.CSSProperties = {
  color: "#555",
  fontSize: 14,
  marginBottom: 36,
};

const grid4: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 16,
};

const grid3: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: 20,
};

const grid2: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
  gap: 20,
};

/* ──────────────── MAIN COMPONENT ──────────────── */
export default function Home() {
  const [tab, setTab] = useState("home");
  const [wallet, setWallet] = useState("");
  const [visible, setVisible] = useState(false);
  const [fanStep, setFanStep] = useState(2);
  const [flowHover, setFlowHover] = useState<number | null>(null);

  useEffect(() => {
    setVisible(true);
  }, []);

  const connectWallet = async () => {
    if (typeof window !== "undefined" && (window as any).ethereum) {
      try {
        const accs = await (window as any).ethereum.request({
          method: "eth_requestAccounts",
        });
        setWallet(accs[0]);
      } catch {
        alert("فشل الاتصال بالمحفظة");
      }
    } else {
      alert("يرجى تثبيت MetaMask أولاً — metamask.io");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#060606",
        color: "#fff",
        fontFamily: "'Segoe UI', Tahoma, sans-serif",
        direction: "rtl",
      }}
    >
      {/* ═══════ NAVBAR ═══════ */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          width: "100%",
          zIndex: 1000,
          background: "rgba(6,6,6,0.92)",
          backdropFilter: "blur(24px)",
          borderBottom: "1px solid #1a1a1a",
          padding: "0 24px",
          height: 60,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 36,
              height: 36,
              background: redGrad,
              borderRadius: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 900,
              fontSize: 14,
              boxShadow: "0 4px 20px #e31b1b44",
            }}
          >
            SC
          </div>
          <span style={{ fontWeight: 800, fontSize: 17, letterSpacing: 0.5 }}>
            Sport<span style={{ color: "#e31b1b" }}>Chain</span>
          </span>
          <span style={{ ...badge("#e31b1b"), fontSize: 9, marginRight: 4 }}>
            PROTOTYPE
          </span>
        </div>

        <div
          style={{
            display: "flex",
            gap: 4,
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              style={{
                padding: "7px 16px",
                borderRadius: 8,
                border: "none",
                cursor: "pointer",
                fontSize: 12,
                fontWeight: 600,
                fontFamily: "inherit",
                transition: "all 0.25s",
                background: tab === t.key ? "#e31b1b" : "transparent",
                color: tab === t.key ? "#fff" : "#666",
              }}
            >
              <span style={{ marginLeft: 4 }}>{t.icon}</span> {t.label}
            </button>
          ))}
        </div>

        <button
          onClick={connectWallet}
          style={{
            padding: "8px 20px",
            borderRadius: 8,
            cursor: "pointer",
            fontSize: 12,
            fontWeight: 700,
            fontFamily: "inherit",
            transition: "all 0.25s",
            background: wallet ? "rgba(34,197,94,0.1)" : "transparent",
            border: wallet ? "1px solid #22c55e44" : "1px solid #e31b1b44",
            color: wallet ? "#22c55e" : "#e31b1b",
          }}
        >
          {wallet
            ? `${wallet.slice(0, 6)}…${wallet.slice(-4)}`
            : "🦊 ربط المحفظة"}
        </button>
      </nav>

      <div style={{ paddingTop: 60 }}>
        {/* ═══════════════ HOME ═══════════════ */}
        {tab === "home" && (
          <div>
            <section
              style={{
                minHeight: "92vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  width: 700,
                  height: 700,
                  background:
                    "radial-gradient(circle, rgba(227,27,27,0.08) 0%, transparent 70%)",
                  borderRadius: "50%",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%,-50%)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  opacity: 0.03,
                  backgroundImage:
                    "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                  backgroundSize: "60px 60px",
                }}
              />
              <div
                style={{
                  position: "relative",
                  zIndex: 1,
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(40px)",
                  transition: "all 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "8px 20px",
                    borderRadius: 50,
                    background: "rgba(227,27,27,0.08)",
                    border: "1px solid rgba(227,27,27,0.2)",
                    fontSize: 13,
                    color: "#e31b1b",
                    marginBottom: 32,
                  }}
                >
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: "#e31b1b",
                      boxShadow: "0 0 12px #e31b1b",
                    }}
                  />
                  مدعوم بتقنية البلوكتشين — رؤية 2030
                </div>

                <h1
                  style={{
                    fontSize: "clamp(36px, 5.5vw, 68px)",
                    fontWeight: 900,
                    lineHeight: 1.05,
                    marginBottom: 20,
                  }}
                >
                  مستقبل الرياضة
                  <br />
                  <span
                    style={{
                      background:
                        "linear-gradient(135deg, #e31b1b, #f87171, #e31b1b)",
                      backgroundSize: "200% auto",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    السعودية الرقمية
                  </span>
                </h1>

                <p
                  style={{
                    fontSize: 17,
                    color: "#666",
                    maxWidth: 520,
                    margin: "0 auto 36px",
                    lineHeight: 1.9,
                  }}
                >
                  منصة تذاكر NFT وترميز الأصول الرياضية الأولى في المملكة
                  العربية السعودية
                </p>

                <div
                  style={{
                    display: "flex",
                    gap: 12,
                    justifyContent: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <button
                    onClick={() => setTab("tickets")}
                    style={{
                      padding: "14px 36px",
                      borderRadius: 10,
                      border: "none",
                      background: redGrad,
                      color: "#fff",
                      fontSize: 15,
                      fontWeight: 700,
                      cursor: "pointer",
                      boxShadow: "0 8px 32px #e31b1b33",
                      fontFamily: "inherit",
                    }}
                  >
                    استكشف التذاكر
                  </button>
                  <button
                    onClick={() => setTab("dashboard")}
                    style={{
                      padding: "14px 36px",
                      borderRadius: 10,
                      border: "1px solid #222",
                      background: "transparent",
                      color: "#fff",
                      fontSize: 15,
                      fontWeight: 700,
                      cursor: "pointer",
                      fontFamily: "inherit",
                    }}
                  >
                    لوحة التحكم
                  </button>
                  <button
                    onClick={() => setTab("investors")}
                    style={{
                      padding: "14px 36px",
                      borderRadius: 10,
                      border: "1px solid #e31b1b44",
                      background: "transparent",
                      color: "#e31b1b",
                      fontSize: 15,
                      fontWeight: 700,
                      cursor: "pointer",
                      fontFamily: "inherit",
                    }}
                  >
                    للمستثمرين
                  </button>
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: 32,
                    justifyContent: "center",
                    marginTop: 56,
                    flexWrap: "wrap",
                  }}
                >
                  {[
                    { v: "800ms", l: "وقت التحقق" },
                    { v: "0%", l: "نسبة التزوير" },
                    { v: "$0.01", l: "تكلفة الإصدار" },
                    { v: "50K+", l: "مستخدم متوقع" },
                  ].map((s, i) => (
                    <div key={i} style={{ textAlign: "center" }}>
                      <div
                        style={{
                          fontSize: 24,
                          fontWeight: 900,
                          color: "#e31b1b",
                        }}
                      >
                        {s.v}
                      </div>
                      <div
                        style={{ fontSize: 11, color: "#555", marginTop: 4 }}
                      >
                        {s.l}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section
              style={{
                padding: "60px 28px",
                maxWidth: 1100,
                margin: "0 auto",
              }}
            >
              <div style={{ textAlign: "center", marginBottom: 48 }}>
                <h2 style={sectionTitle}>
                  لماذا <span style={{ color: "#e31b1b" }}>SportChain</span>؟
                </h2>
              </div>
              <div style={grid4}>
                {[
                  {
                    icon: "🎫",
                    title: "تذاكر NFT",
                    desc: "تذاكر رقمية غير قابلة للتزوير مع مزايا حصرية",
                  },
                  {
                    icon: "🏇",
                    title: "ترميز الأصول",
                    desc: "امتلك حصص في خيول السباق والأصول الرياضية",
                  },
                  {
                    icon: "🪙",
                    title: "Fan Tokens",
                    desc: "توكنات للتصويت والمشاركة في قرارات الأندية",
                  },
                  {
                    icon: "📜",
                    title: "عقود ذكية",
                    desc: "عقود شفافة وآمنة لجميع المعاملات",
                  },
                ].map((f, i) => (
                  <div
                    key={i}
                    style={{
                      ...card,
                      textAlign: "center",
                      transition: "all 0.3s",
                      cursor: "default",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "#e31b1b44";
                      e.currentTarget.style.transform = "translateY(-4px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "#1a1a1a";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    <div style={{ fontSize: 40, marginBottom: 14 }}>
                      {f.icon}
                    </div>
                    <h3
                      style={{
                        fontSize: 17,
                        fontWeight: 700,
                        marginBottom: 8,
                      }}
                    >
                      {f.title}
                    </h3>
                    <p
                      style={{
                        color: "#666",
                        fontSize: 13,
                        lineHeight: 1.7,
                        margin: 0,
                      }}
                    >
                      {f.desc}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section
              style={{
                padding: "60px 28px",
                maxWidth: 1100,
                margin: "0 auto",
              }}
            >
              <div style={{ textAlign: "center", marginBottom: 48 }}>
                <h2 style={sectionTitle}>
                  خارطة <span style={{ color: "#e31b1b" }}>الطريق</span>
                </h2>
              </div>
              <div style={grid4}>
                {roadmap.map((r, i) => (
                  <div
                    key={i}
                    style={{
                      ...card,
                      borderColor:
                        r.status === "current" ? "#e31b1b" : "#1a1a1a",
                      background:
                        r.status === "current" ? "#0f0a0a" : "#0f0f0f",
                    }}
                  >
                    <div
                      style={badge(
                        r.status === "current" ? "#e31b1b" : "#555"
                      )}
                    >
                      {r.phase}
                    </div>
                    <h3
                      style={{
                        fontSize: 18,
                        fontWeight: 700,
                        margin: "12px 0 14px",
                      }}
                    >
                      {r.title}
                    </h3>
                    {r.items.map((item, j) => (
                      <div
                        key={j}
                        style={{
                          padding: "7px 0",
                          color: "#888",
                          fontSize: 13,
                          borderBottom:
                            j < r.items.length - 1
                              ? "1px solid #151515"
                              : "none",
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                        }}
                      >
                        <span
                          style={{
                            width: 5,
                            height: 5,
                            borderRadius: "50%",
                            background:
                              r.status === "current" ? "#e31b1b" : "#333",
                            flexShrink: 0,
                          }}
                        />
                        {item}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* ═══════════════ CLUB DASHBOARD ═══════════════ */}
        {tab === "dashboard" && (
          <div
            style={{ padding: "28px", maxWidth: 1200, margin: "0 auto" }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 28,
              }}
            >
              <div>
                <h2 style={{ ...sectionTitle, marginBottom: 4 }}>
                  لوحة <span style={{ color: "#e31b1b" }}>النادي</span>
                </h2>
                <p style={{ color: "#555", fontSize: 13, margin: 0 }}>
                  نادي الرياض الرياضي — بيانات مباشرة
                </p>
              </div>
              <div style={badge("#22c55e")}>
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "#22c55e",
                    display: "inline-block",
                    marginLeft: 6,
                    boxShadow: "0 0 8px #22c55e",
                  }}
                />
                مباشر
              </div>
            </div>

            <div style={grid4}>
              {stats.map((s, i) => (
                <div key={i} style={card}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: 12,
                    }}
                  >
                    <div
                      style={{
                        color: "#555",
                        fontSize: 12,
                        letterSpacing: 0.5,
                      }}
                    >
                      {s.label}
                    </div>
                    <span style={{ fontSize: 22 }}>{s.icon}</span>
                  </div>
                  <div
                    style={{ fontSize: 28, fontWeight: 900, marginBottom: 6 }}
                  >
                    {s.value}
                  </div>
                  <div
                    style={{
                      color: "#22c55e",
                      fontSize: 12,
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    ↑ {s.change}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ ...grid2, marginTop: 20 }}>
              <div style={card}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 22,
                  }}
                >
                  <span style={{ fontWeight: 700, fontSize: 15 }}>
                    الأحداث القادمة
                  </span>
                  <button
                    style={{
                      background: redGrad,
                      border: "none",
                      color: "#fff",
                      padding: "7px 18px",
                      borderRadius: 8,
                      fontSize: 12,
                      cursor: "pointer",
                      fontFamily: "inherit",
                      fontWeight: 600,
                    }}
                  >
                    + حدث جديد
                  </button>
                </div>
                {events.map((e, i) => (
                  <div
                    key={i}
                    style={{
                      borderBottom:
                        i < events.length - 1
                          ? "1px solid #151515"
                          : "none",
                      paddingBottom: 18,
                      marginBottom: 18,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: 8,
                      }}
                    >
                      <span style={{ fontWeight: 600, fontSize: 13 }}>
                        {e.name}
                      </span>
                      <span
                        style={badge(
                          e.status === "نشط" ? "#22c55e" : "#f59e0b"
                        )}
                      >
                        {e.status}
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 8,
                      }}
                    >
                      <span style={{ color: "#555", fontSize: 12 }}>
                        📅 {e.date}
                      </span>
                      <span
                        style={{
                          color: "#888",
                          fontSize: 12,
                          fontWeight: 600,
                        }}
                      >
                        {e.sold}% مباعة
                      </span>
                    </div>
                    <div
                      style={{
                        background: "#151515",
                        borderRadius: 4,
                        height: 5,
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          background:
                            e.sold > 80
                              ? "#e31b1b"
                              : e.sold > 50
                              ? "#3b82f6"
                              : "#555",
                          width: `${e.sold}%`,
                          height: "100%",
                          borderRadius: 4,
                          transition:
                            "width 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div style={card}>
                <div
                  style={{
                    marginBottom: 20,
                    fontWeight: 700,
                    fontSize: 15,
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      background: "#22c55e",
                      borderRadius: "50%",
                      display: "inline-block",
                      boxShadow: "0 0 10px #22c55e",
                    }}
                  />
                  معاملات مباشرة
                </div>
                {txns.map((t, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "12px 0",
                      borderBottom:
                        i < txns.length - 1
                          ? "1px solid #151515"
                          : "none",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        gap: 10,
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          width: 36,
                          height: 36,
                          background: "#151515",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 13,
                          color: "#888",
                          fontWeight: 700,
                        }}
                      >
                        {t.fan.charAt(0)}
                      </div>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600 }}>
                          {t.fan}
                        </div>
                        <div style={{ fontSize: 11, color: "#444" }}>
                          {t.event}
                        </div>
                      </div>
                    </div>
                    <div style={{ textAlign: "left" }}>
                      <div
                        style={{
                          fontSize: 13,
                          fontWeight: 700,
                          color:
                            t.type === "إعادة بيع"
                              ? "#f59e0b"
                              : "#22c55e",
                        }}
                      >
                        {t.amount}
                      </div>
                      <div style={{ fontSize: 10, color: "#444" }}>
                        {t.time}
                      </div>
                    </div>
                  </div>
                ))}
                <div
                  style={{
                    marginTop: 18,
                    background: "#0a1a0f",
                    border: "1px solid #14532d44",
                    borderRadius: 10,
                    padding: "14px 18px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span style={{ color: "#86efac", fontSize: 13 }}>
                    إيرادات الموسم
                  </span>
                  <span
                    style={{
                      color: "#22c55e",
                      fontWeight: 900,
                      fontSize: 18,
                    }}
                  >
                    $284,500
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ═══════════════ TICKETS ═══════════════ */}
        {tab === "tickets" && (
          <div
            style={{ padding: "28px", maxWidth: 1200, margin: "0 auto" }}
          >
            <h2 style={sectionTitle}>
              تذاكر <span style={{ color: "#e31b1b" }}>NFT</span>
            </h2>
            <p style={sectionSub}>
              تذاكر رقمية آمنة على البلوكتشين — غير قابلة للتزوير
            </p>
            <div style={grid4}>
              {tickets.map((t) => (
                <div
                  key={t.id}
                  style={{
                    ...card,
                    padding: 0,
                    overflow: "hidden",
                    transition: "all 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#e31b1b44";
                    e.currentTarget.style.transform = "translateY(-4px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#1a1a1a";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <div
                    style={{
                      height: 140,
                      background:
                        "linear-gradient(135deg, #1a0000, #0f0f0f)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 56,
                    }}
                  >
                    {t.emoji}
                  </div>
                  <div style={{ padding: 20 }}>
                    <div style={badge("#e31b1b")}>{t.category}</div>
                    <h3
                      style={{
                        fontSize: 17,
                        fontWeight: 700,
                        margin: "10px 0 6px",
                      }}
                    >
                      {t.match}
                    </h3>
                    <p
                      style={{
                        color: "#555",
                        fontSize: 12,
                        margin: "4px 0",
                      }}
                    >
                      📅 {t.date}
                    </p>
                    <p
                      style={{
                        color: "#555",
                        fontSize: 12,
                        margin: "4px 0 16px",
                      }}
                    >
                      📍 {t.venue}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingTop: 14,
                        borderTop: "1px solid #151515",
                      }}
                    >
                      <div>
                        <div
                          style={{
                            fontSize: 20,
                            fontWeight: 900,
                            color: "#e31b1b",
                          }}
                        >
                          {t.price}
                        </div>
                        <div style={{ fontSize: 11, color: "#444" }}>
                          متبقي: {t.available}
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          if (!wallet) {
                            alert("يرجى ربط المحفظة أولاً");
                            return;
                          }
                          alert(`تم حجز تذكرة: ${t.match}`);
                        }}
                        style={{
                          padding: "10px 24px",
                          borderRadius: 8,
                          border: "none",
                          background: redGrad,
                          color: "#fff",
                          fontSize: 13,
                          fontWeight: 700,
                          cursor: "pointer",
                          fontFamily: "inherit",
                        }}
                      >
                        شراء NFT
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══════════════ FAN EXPERIENCE ═══════════════ */}
        {tab === "fan" && (
          <div
            style={{ padding: "28px", maxWidth: 1000, margin: "0 auto" }}
          >
            <div
              style={{
                display: "flex",
                gap: 32,
                alignItems: "flex-start",
                flexWrap: "wrap",
              }}
            >
              <div style={{ width: 280, flexShrink: 0 }}>
                <div
                  style={{
                    background: "#151515",
                    borderRadius: 36,
                    padding: 8,
                    border: "5px solid #222",
                    boxShadow: "0 40px 80px rgba(0,0,0,0.6)",
                  }}
                >
                  <div
                    style={{
                      background: "#0a0a0a",
                      borderRadius: 28,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        background: "#111",
                        padding: "10px 18px 6px",
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: 10,
                        color: "#555",
                      }}
                    >
                      <span>9:41</span>
                      <span>●●●●</span>
                    </div>
                    <div
                      style={{
                        background: "#111",
                        padding: "10px 18px 14px",
                        borderBottom: "1px solid #1a1a1a",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                          marginBottom: 8,
                        }}
                      >
                        <div
                          style={{
                            background: "#e31b1b",
                            width: 22,
                            height: 22,
                            borderRadius: 6,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 9,
                            fontWeight: 900,
                          }}
                        >
                          SC
                        </div>
                        <span
                          style={{
                            color: "#fff",
                            fontWeight: 700,
                            fontSize: 13,
                          }}
                        >
                          SportChain
                        </span>
                      </div>
                      <div style={{ color: "#666", fontSize: 11 }}>
                        مرحباً، أحمد 👋
                      </div>
                    </div>
                    <div style={{ padding: 12 }}>
                      <div
                        style={{
                          background:
                            "linear-gradient(135deg, #1a0000, #200000)",
                          border: "1px solid #e31b1b22",
                          borderRadius: 14,
                          padding: 14,
                          marginBottom: 10,
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: 10,
                          }}
                        >
                          <div>
                            <div
                              style={{
                                color: "#e31b1b",
                                fontSize: 9,
                                fontWeight: 700,
                                letterSpacing: 1,
                                marginBottom: 3,
                              }}
                            >
                              NFT TICKET
                            </div>
                            <div
                              style={{
                                color: "#fff",
                                fontWeight: 800,
                                fontSize: 12,
                              }}
                            >
                              الدوري — الجولة 22
                            </div>
                            <div
                              style={{
                                color: "#666",
                                fontSize: 10,
                                marginTop: 2,
                              }}
                            >
                              15 مارس • 8:00 م
                            </div>
                          </div>
                          <div
                            style={{
                              background: "#fff",
                              borderRadius: 5,
                              padding: 5,
                              width: 38,
                              height: 38,
                              display: "grid",
                              gridTemplateColumns: "repeat(5,1fr)",
                              gap: 1,
                            }}
                          >
                            {Array.from({ length: 25 }).map((_, i) => (
                              <div
                                key={i}
                                style={{
                                  width: 5,
                                  height: 5,
                                  background: [0,1,3,5,6,8,10,12,14,16,18,20,22,24].includes(i) ? "#000" : "#fff",
                                  borderRadius: 1,
                                }}
                              />
                            ))}
                          </div>
                        </div>
                        <div
                          style={{
                            borderTop: "1px dashed #e31b1b22",
                            paddingTop: 8,
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          {[
                            { l: "المقعد", v: "B-14" },
                            { l: "الصف", v: "12" },
                            { l: "الفئة", v: "VIP" },
                            {
                              l: "الحالة",
                              v: "مؤكدة ✓",
                              c: "#22c55e",
                            },
                          ].map((d, i) => (
                            <div key={i} style={{ textAlign: "center" }}>
                              <div
                                style={{
                                  color: d.c || "#444",
                                  fontSize: 8,
                                }}
                              >
                                {d.l}
                              </div>
                              <div
                                style={{
                                  color: d.c || "#fff",
                                  fontWeight: 700,
                                  fontSize: 11,
                                }}
                              >
                                {d.v}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div
                        style={{
                          ...card,
                          padding: 12,
                          borderRadius: 12,
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <div>
                            <div
                              style={{ color: "#666", fontSize: 10 }}
                            >
                              توكنات الفريق
                            </div>
                            <div
                              style={{
                                color: "#fff",
                                fontWeight: 700,
                                fontSize: 14,
                              }}
                            >
                              45.5 RIYADH
                            </div>
                          </div>
                          <div
                            style={{
                              background: "#e31b1b",
                              borderRadius: 7,
                              padding: "5px 12px",
                              fontSize: 10,
                              color: "#fff",
                              fontWeight: 600,
                            }}
                          >
                            صوّت الآن
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ flex: 1, minWidth: 300 }}>
                <div
                  style={{
                    color: "#e31b1b",
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: 2,
                    marginBottom: 8,
                  }}
                >
                  تجربة المشجع
                </div>
                <h2 style={{ ...sectionTitle, fontSize: 28 }}>
                  من الشراء إلى البوابة
                </h2>
                <p style={{ ...sectionSub, marginBottom: 28 }}>
                  رحلة المشجع كاملة على البلوكتشين — بسيطة، آمنة، فورية
                </p>

                {fanSteps.map((s, i) => (
                  <div
                    key={i}
                    onClick={() => setFanStep(i)}
                    style={{
                      display: "flex",
                      gap: 14,
                      marginBottom: 14,
                      cursor: "pointer",
                      alignItems: "flex-start",
                    }}
                  >
                    <div
                      style={{
                        width: 42,
                        height: 42,
                        borderRadius: 12,
                        flexShrink: 0,
                        background: s.done
                          ? "#0a1a0f"
                          : i === fanStep
                          ? "#e31b1b"
                          : "#111",
                        border: `1px solid ${
                          s.done
                            ? "#14532d"
                            : i === fanStep
                            ? "#e31b1b"
                            : "#1e1e1e"
                        }`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 18,
                        color: s.done ? "#22c55e" : "#fff",
                      }}
                    >
                      {s.done ? "✓" : s.icon}
                    </div>
                    <div
                      style={{
                        flex: 1,
                        borderRadius: 10,
                        padding:
                          i === fanStep ? "12px 14px" : "6px 4px",
                        background:
                          i === fanStep ? "#111" : "transparent",
                        border:
                          i === fanStep
                            ? "1px solid #1e1e1e"
                            : "1px solid transparent",
                        transition: "all 0.2s",
                      }}
                    >
                      <div
                        style={{
                          color: s.done
                            ? "#22c55e"
                            : i === fanStep
                            ? "#fff"
                            : "#555",
                          fontWeight: 700,
                          fontSize: 14,
                          marginBottom: i === fanStep ? 4 : 0,
                        }}
                      >
                        {i + 1}. {s.title}
                      </div>
                      {i === fanStep && (
                        <div
                          style={{
                            color: "#888",
                            fontSize: 13,
                            lineHeight: 1.6,
                          }}
                        >
                          {s.desc}
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                <div
                  style={{
                    ...card,
                    marginTop: 24,
                    display: "flex",
                    gap: 0,
                  }}
                >
                  {[
                    { v: "800ms", l: "وقت التحقق", c: "#e31b1b" },
                    { v: "0%", l: "نسبة التزوير", c: "#22c55e" },
                    {
                      v: "$0.01",
                      l: "تكلفة الإصدار",
                      c: "#f59e0b",
                    },
                  ].map((m, i) => (
                    <div
                      key={i}
                      style={{
                        textAlign: "center",
                        flex: 1,
                        borderLeft:
                          i > 0 ? "1px solid #1a1a1a" : "none",
                        padding: "4px 0",
                      }}
                    >
                      <div
                        style={{
                          color: m.c,
                          fontSize: 22,
                          fontWeight: 900,
                        }}
                      >
                        {m.v}
                      </div>
                      <div
                        style={{
                          color: "#444",
                          fontSize: 11,
                          marginTop: 4,
                        }}
                      >
                        {m.l}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ═══════════════ SYSTEM FLOW ═══════════════ */}
        {tab === "flow" && (
          <div
            style={{ padding: "28px", maxWidth: 1200, margin: "0 auto" }}
          >
            <div
              style={{
                color: "#e31b1b",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: 2,
                marginBottom: 8,
              }}
            >
              مسار النظام
            </div>
            <h2 style={sectionTitle}>
              كيف يتدفق <span style={{ color: "#e31b1b" }}>النظام</span>
            </h2>
            <p style={sectionSub}>
              من تسجيل النادي إلى توزيع الإيرادات — كل خطوة على البلوكتشين
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: 14,
                marginBottom: 14,
              }}
            >
              {flowNodes.slice(0, 4).map((n, i) => (
                <div
                  key={n.id}
                  onMouseEnter={() => setFlowHover(n.id)}
                  onMouseLeave={() => setFlowHover(null)}
                  style={{
                    ...card,
                    padding: "20px 16px",
                    cursor: "pointer",
                    transition: "all 0.25s",
                    borderColor:
                      flowHover === n.id ? n.color : "#1a1a1a",
                    transform:
                      flowHover === n.id
                        ? "scale(1.03)"
                        : "scale(1)",
                    boxShadow:
                      flowHover === n.id
                        ? `0 8px 28px ${n.color}22`
                        : "none",
                    position: "relative",
                  }}
                >
                  {i < 3 && (
                    <div
                      style={{
                        position: "absolute",
                        left: -10,
                        top: "50%",
                        color: "#333",
                        fontSize: 14,
                        transform: "translateY(-50%)",
                      }}
                    >
                      →
                    </div>
                  )}
                  <div style={{ fontSize: 28, marginBottom: 10 }}>
                    {n.icon}
                  </div>
                  <div
                    style={{
                      color:
                        flowHover === n.id ? n.color : "#fff",
                      fontWeight: 700,
                      fontSize: 14,
                      marginBottom: 4,
                    }}
                  >
                    {n.label}
                  </div>
                  <div style={{ color: "#444", fontSize: 11 }}>
                    {n.sub}
                  </div>
                </div>
              ))}
            </div>
            <div
              style={{
                textAlign: "center",
                color: "#333",
                fontSize: 18,
                margin: "4px 0",
              }}
            >
              ↓
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: 14,
                direction: "ltr",
              }}
            >
              {flowNodes.slice(4).map((n, i) => (
                <div
                  key={n.id}
                  onMouseEnter={() => setFlowHover(n.id)}
                  onMouseLeave={() => setFlowHover(null)}
                  style={{
                    ...card,
                    padding: "20px 16px",
                    cursor: "pointer",
                    transition: "all 0.25s",
                    borderColor:
                      flowHover === n.id ? n.color : "#1a1a1a",
                    transform:
                      flowHover === n.id
                        ? "scale(1.03)"
                        : "scale(1)",
                    boxShadow:
                      flowHover === n.id
                        ? `0 8px 28px ${n.color}22`
                        : "none",
                    position: "relative",
                    direction: "rtl",
                  }}
                >
                  {i < 3 && (
                    <div
                      style={{
                        position: "absolute",
                        right: -10,
                        top: "50%",
                        color: "#333",
                        fontSize: 14,
                        transform: "translateY(-50%)",
                      }}
                    >
                      ←
                    </div>
                  )}
                  <div style={{ fontSize: 28, marginBottom: 10 }}>
                    {n.icon}
                  </div>
                  <div
                    style={{
                      color:
                        flowHover === n.id ? n.color : "#fff",
                      fontWeight: 700,
                      fontSize: 14,
                      marginBottom: 4,
                    }}
                  >
                    {n.label}
                  </div>
                  <div style={{ color: "#444", fontSize: 11 }}>
                    {n.sub}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ ...grid4, marginTop: 32 }}>
              {[
                {
                  label: "النادي",
                  color: "#3b82f6",
                  desc: "تكامل عبر REST API خلال 30 دقيقة",
                },
                {
                  label: "البلوكتشين",
                  color: "#e31b1b",
                  desc: "Polygon — رسوم أقل من سنت واحد",
                },
                {
                  label: "المشجع",
                  color: "#f59e0b",
                  desc: "تجربة بسيطة — بدون معرفة Web3",
                },
                {
                  label: "الإيرادات",
                  color: "#22c55e",
                  desc: "توزيع تلقائي فوري بعد كل معاملة",
                },
              ].map((l, i) => (
                <div key={i} style={card}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      marginBottom: 6,
                    }}
                  >
                    <div
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: l.color,
                      }}
                    />
                    <span style={{ fontWeight: 700, fontSize: 13 }}>
                      {l.label}
                    </span>
                  </div>
                  <p
                    style={{ color: "#555", fontSize: 12, margin: 0 }}
                  >
                    {l.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══════════════ INVESTORS ═══════════════ */}
        {tab === "investors" && (
          <div
            style={{ padding: "28px", maxWidth: 1200, margin: "0 auto" }}
          >
            <h2 style={sectionTitle}>
              لوحة{" "}
              <span style={{ color: "#e31b1b" }}>المستثمرين</span>
            </h2>
            <p style={sectionSub}>
              أرقام وإحصائيات السوق الرياضي السعودي
            </p>

            <div style={grid4}>
              {investorStats.map((s, i) => (
                <div
                  key={i}
                  style={{ ...card, textAlign: "center" }}
                >
                  <div style={{ fontSize: 32, marginBottom: 10 }}>
                    {s.icon}
                  </div>
                  <div
                    style={{
                      fontSize: 32,
                      fontWeight: 900,
                      background:
                        "linear-gradient(135deg, #e31b1b, #f87171)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      marginBottom: 6,
                    }}
                  >
                    {s.value}
                  </div>
                  <div style={{ color: "#666", fontSize: 13 }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ ...card, marginTop: 20 }}>
              <h3
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  marginBottom: 20,
                }}
              >
                📊 فرصة السوق
              </h3>
              <div style={grid3}>
                {[
                  {
                    label: "سوق التذاكر الرقمية",
                    value: "$1.2B",
                    growth: "+42%",
                  },
                  {
                    label: "Fan Tokens عالمياً",
                    value: "$800M",
                    growth: "+28%",
                  },
                  {
                    label: "ترميز الأصول الرياضية",
                    value: "$500M",
                    growth: "+55%",
                  },
                ].map((m, i) => (
                  <div
                    key={i}
                    style={{
                      padding: 20,
                      borderRadius: 14,
                      background: "#0f0a0a",
                      border: "1px solid #e31b1b22",
                    }}
                  >
                    <div
                      style={{
                        color: "#666",
                        fontSize: 12,
                        marginBottom: 8,
                      }}
                    >
                      {m.label}
                    </div>
                    <div
                      style={{
                        fontSize: 28,
                        fontWeight: 900,
                        marginBottom: 4,
                      }}
                    >
                      {m.value}
                    </div>
                    <div
                      style={{
                        color: "#22c55e",
                        fontSize: 13,
                        fontWeight: 600,
                      }}
                    >
                      {m.growth} سنوياً
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ ...card, marginTop: 20 }}>
              <h3
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  marginBottom: 20,
                }}
              >
                💰 نموذج الإيرادات
              </h3>
              <div style={grid4}>
                {[
                  {
                    source: "رسوم التذاكر",
                    percent: "2.5%",
                    desc: "على كل عملية بيع",
                  },
                  {
                    source: "السوق الثانوي",
                    percent: "5%",
                    desc: "إعادة بيع التذاكر",
                  },
                  {
                    source: "ترميز الأصول",
                    percent: "3%",
                    desc: "رسوم الترميز",
                  },
                  {
                    source: "اشتراكات B2B",
                    percent: "SaaS",
                    desc: "للأندية والمنظمين",
                  },
                ].map((r, i) => (
                  <div
                    key={i}
                    style={{
                      padding: 18,
                      borderRadius: 12,
                      background: "#0d0d0d",
                      border: "1px solid #1a1a1a",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 24,
                        fontWeight: 900,
                        color: "#e31b1b",
                        marginBottom: 6,
                      }}
                    >
                      {r.percent}
                    </div>
                    <div
                      style={{
                        fontWeight: 700,
                        fontSize: 13,
                        marginBottom: 4,
                      }}
                    >
                      {r.source}
                    </div>
                    <div style={{ color: "#555", fontSize: 12 }}>
                      {r.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ═══════════════ WALLET ═══════════════ */}
        {tab === "wallet" && (
          <div
            style={{
              padding: "28px",
              maxWidth: 800,
              margin: "0 auto",
              textAlign: "center",
            }}
          >
            <h2 style={sectionTitle}>
              المحفظة{" "}
              <span style={{ color: "#e31b1b" }}>الرقمية</span>
            </h2>
            <p style={sectionSub}>
              اربط محفظتك للوصول لجميع خدمات SportChain
            </p>

            {!wallet ? (
              <div
                style={{
                  ...card,
                  padding: 56,
                  borderStyle: "dashed",
                  borderColor: "#e31b1b33",
                }}
              >
                <div style={{ fontSize: 56, marginBottom: 20 }}>
                  🦊
                </div>
                <h3
                  style={{
                    fontSize: 22,
                    fontWeight: 700,
                    marginBottom: 14,
                  }}
                >
                  اربط محفظة MetaMask
                </h3>
                <p
                  style={{
                    color: "#666",
                    marginBottom: 28,
                    lineHeight: 1.8,
                    fontSize: 14,
                  }}
                >
                  اربط محفظتك الرقمية لشراء تذاكر NFT وإدارة أصولك
                  الرياضية
                </p>
                <button
                  onClick={connectWallet}
                  style={{
                    padding: "14px 44px",
                    borderRadius: 10,
                    border: "none",
                    background: redGrad,
                    color: "#fff",
                    fontSize: 16,
                    fontWeight: 700,
                    cursor: "pointer",
                    boxShadow: "0 8px 32px #e31b1b33",
                    fontFamily: "inherit",
                  }}
                >
                  ربط المحفظة
                </button>
              </div>
            ) : (
              <div>
                <div
                  style={{
                    ...card,
                    borderColor: "#22c55e33",
                    marginBottom: 20,
                  }}
                >
                  <div style={{ fontSize: 44, marginBottom: 12 }}>
                    ✅
                  </div>
                  <h3
                    style={{
                      fontSize: 20,
                      fontWeight: 700,
                      marginBottom: 10,
                      color: "#22c55e",
                    }}
                  >
                    المحفظة متصلة
                  </h3>
                  <p
                    style={{
                      color: "#888",
                      fontSize: 13,
                      fontFamily: "monospace",
                      background: "#0d0d0d",
                      padding: "10px 20px",
                      borderRadius: 10,
                      display: "inline-block",
                    }}
                  >
                    {wallet}
                  </p>
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3,1fr)",
                    gap: 14,
                  }}
                >
                  {[
                    { l: "الرصيد", v: "0.00 ETH" },
                    { l: "تذاكر NFT", v: "0" },
                    { l: "Fan Tokens", v: "0" },
                  ].map((w, i) => (
                    <div key={i} style={card}>
                      <div
                        style={{
                          color: "#555",
                          fontSize: 12,
                          marginBottom: 8,
                        }}
                      >
                        {w.l}
                      </div>
                      <div
                        style={{ fontSize: 22, fontWeight: 900 }}
                      >
                        {w.v}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ═══════ FOOTER ═══════ */}
        <footer
          style={{
            padding: "36px 28px",
            marginTop: 60,
            borderTop: "1px solid #111",
            textAlign: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              marginBottom: 12,
            }}
          >
            <div
              style={{
                width: 28,
                height: 28,
                background: redGrad,
                borderRadius: 7,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 11,
                fontWeight: 900,
              }}
            >
              SC
            </div>
            <span style={{ fontWeight: 700, fontSize: 15 }}>
              Sport<span style={{ color: "#e31b1b" }}>Chain</span>
            </span>
          </div>
          <p style={{ color: "#444", fontSize: 12 }}>
            © 2026 SportChain Technologies — مدعوم برؤية 2030 🇸🇦
          </p>
        </footer>
      </div>
    </div>
  );
}
