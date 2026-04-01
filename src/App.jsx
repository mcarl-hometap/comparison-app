import { useState, useEffect } from "react";

const G = "#00A67E";
const DARK = "#0B2B26";
const CREAM = "#F7F5F0";
const WHITE = "#FFFFFF";
const MUTED = "#6B7280";
const BORDER = "#E8E5DE";
const BLUE = "#4A7CCC";
const ORANGE = "#D4764E";
const RED = "#D94444";

const COMPARISONS = {
  heloc: {
    label: "HELOC",
    color: BLUE,
    rows: [
      {
        feature: "Monthly payments",
        hei: { text: "None — ever", verdict: "win" },
        other: { text: "Interest payments start immediately", verdict: "lose" },
      },
      {
        feature: "Interest rate",
        hei: { text: "No interest rate — it's not a loan", verdict: "win" },
        other: { text: "Variable rate, typically 8–9%+", verdict: "lose" },
      },
      {
        feature: "How you pay it back",
        hei: { text: "Settle when you sell, refi, or buy out — within 10 years", verdict: "neutral" },
        other: { text: "Monthly payments during draw period, then principal + interest", verdict: "lose" },
      },
      {
        feature: "What it costs you",
        hei: { text: "A share of your home's future appreciation", verdict: "neutral" },
        other: { text: "Interest on every dollar borrowed, every month", verdict: "lose" },
      },
      {
        feature: "Impact on monthly budget",
        hei: { text: "Zero — your budget doesn't change", verdict: "win" },
        other: { text: "Adds a new recurring bill", verdict: "lose" },
      },
      {
        feature: "Qualification",
        hei: { text: "Based primarily on home equity", verdict: "win" },
        other: { text: "Credit score, income, and debt-to-income ratio", verdict: "neutral" },
      },
      {
        feature: "Risk if home values drop",
        hei: { text: "Hometap shares the downside too", verdict: "win" },
        other: { text: "You owe the full balance regardless", verdict: "lose" },
      },
      {
        feature: "Flexibility",
        hei: { text: "Lump sum, use however you want", verdict: "neutral" },
        other: { text: "Draw as needed during draw period", verdict: "win" },
      },
    ],
  },
  refi: {
    label: "Cash-out Refi",
    color: ORANGE,
    rows: [
      {
        feature: "Monthly payments",
        hei: { text: "None — ever", verdict: "win" },
        other: { text: "New, higher mortgage payment for 30 years", verdict: "lose" },
      },
      {
        feature: "Interest rate",
        hei: { text: "No interest rate — it's not a loan", verdict: "win" },
        other: { text: "Fixed rate, but replaces your existing (possibly lower) rate", verdict: "lose" },
      },
      {
        feature: "How you pay it back",
        hei: { text: "Settle when you sell, refi, or buy out — within 10 years", verdict: "neutral" },
        other: { text: "30 years of mortgage payments", verdict: "lose" },
      },
      {
        feature: "Closing costs",
        hei: { text: "Typically lower", verdict: "win" },
        other: { text: "2–5% of the total new loan amount", verdict: "lose" },
      },
      {
        feature: "Impact on monthly budget",
        hei: { text: "Zero — your budget doesn't change", verdict: "win" },
        other: { text: "Higher monthly mortgage payment", verdict: "lose" },
      },
      {
        feature: "Your existing mortgage",
        hei: { text: "Stays exactly as-is", verdict: "win" },
        other: { text: "Replaced entirely — you lose your current rate", verdict: "lose" },
      },
      {
        feature: "Qualification",
        hei: { text: "Based primarily on home equity", verdict: "win" },
        other: { text: "Full mortgage underwriting — credit, income, DTI", verdict: "neutral" },
      },
      {
        feature: "Time to close",
        hei: { text: "Weeks, not months", verdict: "win" },
        other: { text: "Full mortgage process — typically 30–60 days", verdict: "lose" },
      },
    ],
  },
};

function VerdictIcon({ verdict, size = 18 }) {
  if (verdict === "win") {
    return (
      <div style={{
        width: size + 4, height: size + 4, borderRadius: "50%", background: `${G}15`,
        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
      }}>
        <svg width={size - 2} height={size - 2} viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
    );
  }
  if (verdict === "lose") {
    return (
      <div style={{
        width: size + 4, height: size + 4, borderRadius: "50%", background: `${RED}10`,
        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
      }}>
        <svg width={size - 4} height={size - 4} viewBox="0 0 24 24" fill="none" stroke={RED} strokeWidth="3" strokeLinecap="round">
          <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </div>
    );
  }
  return (
    <div style={{
      width: size + 4, height: size + 4, borderRadius: "50%", background: `${MUTED}10`,
      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
    }}>
      <div style={{ width: size - 6, height: 3, borderRadius: 2, background: `${MUTED}50` }} />
    </div>
  );
}

function CompRow({ feature, hei, other, otherColor, index, visible }) {
  const delay = 0.04 * index;
  return (
    <div style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(10px)",
      transition: `all 0.35s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`,
    }}>
      {/* Feature label */}
      <div style={{
        fontSize: 13, fontWeight: 700, color: DARK, padding: "16px 0 10px",
        borderTop: index > 0 ? `1px solid ${BORDER}` : "none",
        fontFamily: "'DM Sans', sans-serif",
      }}>
        {feature}
      </div>

      {/* Two-column comparison */}
      <div style={{ display: "flex", gap: 10, paddingBottom: 4 }}>
        {/* HEI side */}
        <div style={{
          flex: 1, display: "flex", gap: 10, alignItems: "flex-start",
          background: hei.verdict === "win" ? `${G}06` : "transparent",
          borderRadius: 10, padding: "10px 12px",
          border: hei.verdict === "win" ? `1px solid ${G}15` : "1px solid transparent",
        }}>
          <VerdictIcon verdict={hei.verdict} />
          <div style={{ fontSize: 13, color: hei.verdict === "win" ? DARK : MUTED, lineHeight: 1.5, fontWeight: hei.verdict === "win" ? 600 : 400 }}>
            {hei.text}
          </div>
        </div>

        {/* Other side */}
        <div style={{
          flex: 1, display: "flex", gap: 10, alignItems: "flex-start",
          background: other.verdict === "win" ? `${otherColor}06` : "transparent",
          borderRadius: 10, padding: "10px 12px",
          border: other.verdict === "win" ? `1px solid ${otherColor}15` : "1px solid transparent",
        }}>
          <VerdictIcon verdict={other.verdict} />
          <div style={{ fontSize: 13, color: other.verdict === "win" ? DARK : MUTED, lineHeight: 1.5, fontWeight: other.verdict === "win" ? 600 : 400 }}>
            {other.text}
          </div>
        </div>
      </div>
    </div>
  );
}

function Tally({ rows, otherLabel, otherColor }) {
  const heiWins = rows.filter(r => r.hei.verdict === "win").length;
  const otherWins = rows.filter(r => r.other.verdict === "win").length;
  const ties = rows.length - heiWins - otherWins;
  return (
    <div style={{
      display: "flex", gap: 8, padding: "14px 0 4px",
      borderTop: `1px solid ${BORDER}`, marginTop: 4,
    }}>
      <div style={{
        flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
        background: `${G}08`, borderRadius: 10, padding: "10px 12px",
        border: `1px solid ${G}15`,
      }}>
        <span style={{ fontSize: 22, fontWeight: 800, color: G }}>{heiWins}</span>
        <span style={{ fontSize: 12, color: MUTED, fontWeight: 500 }}>HEI advantages</span>
      </div>
      <div style={{
        flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
        background: `${otherColor}06`, borderRadius: 10, padding: "10px 12px",
        border: `1px solid ${otherColor}12`,
      }}>
        <span style={{ fontSize: 22, fontWeight: 800, color: otherColor }}>{otherWins}</span>
        <span style={{ fontSize: 12, color: MUTED, fontWeight: 500 }}>{otherLabel} advantages</span>
      </div>
    </div>
  );
}

export default function ComparisonTool() {
  const [comparing, setComparing] = useState("heloc");
  const [visible, setVisible] = useState(true);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  const switchTo = (product) => {
    if (product === comparing) return;
    setVisible(false);
    setTimeout(() => {
      setComparing(product);
      setVisible(true);
    }, 250);
  };

  const comp = COMPARISONS[comparing];

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: CREAM, minHeight: "100vh" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{
        background: `linear-gradient(135deg, ${DARK} 0%, #0f3d34 100%)`,
        padding: "32px 24px 28px", position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: -60, right: -60, width: 200, height: 200, borderRadius: "50%", background: `${G}08` }} />
        <div style={{ position: "absolute", bottom: -30, left: "30%", width: 120, height: 120, borderRadius: "50%", background: `${G}06` }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 640, margin: "0 auto" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6, background: `${G}20`, borderRadius: 20,
            padding: "5px 12px", marginBottom: 14,
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="2.5" strokeLinecap="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            <span style={{ fontSize: 11, fontWeight: 600, color: G, letterSpacing: "0.06em", textTransform: "uppercase" }}>
              Compare Options
            </span>
          </div>
          <h1 style={{
            fontSize: 24, fontWeight: 800, color: WHITE, lineHeight: 1.2, margin: "0 0 6px",
            opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(10px)",
            transition: "all 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
          }}>
            How Does an HEI Stack Up?
          </h1>
          <p style={{
            fontSize: 14, color: "rgba(255,255,255,0.6)", margin: 0, lineHeight: 1.5,
            opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(10px)",
            transition: "all 0.5s cubic-bezier(0.22, 1, 0.36, 1) 0.08s",
          }}>
            A side-by-side look at the things that actually matter.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 640, margin: "0 auto", padding: "24px 16px 48px" }}>

        {/* Toggle */}
        <div style={{
          display: "flex", background: WHITE, borderRadius: 14, padding: 4,
          border: `1px solid ${BORDER}`, marginBottom: 24,
          boxShadow: "0 1px 4px rgba(0,0,0,0.03)",
        }}>
          {[
            { key: "heloc", label: "HEI vs. HELOC", color: BLUE },
            { key: "refi", label: "HEI vs. Cash-out Refi", color: ORANGE },
          ].map((opt) => {
            const active = comparing === opt.key;
            return (
              <button key={opt.key} onClick={() => switchTo(opt.key)} style={{
                flex: 1, padding: "12px 8px", borderRadius: 11, border: "none",
                background: active ? DARK : "transparent",
                color: active ? WHITE : MUTED,
                fontSize: 13, fontWeight: 700, fontFamily: "'DM Sans', sans-serif",
                cursor: "pointer", transition: "all 0.25s ease",
                position: "relative",
              }}>
                {opt.label}
              </button>
            );
          })}
        </div>

        {/* Column headers */}
        <div style={{
          display: "flex", gap: 10, marginBottom: 4, padding: "0 0 12px",
          borderBottom: `2px solid ${BORDER}`,
        }}>
          <div style={{
            flex: 1, display: "flex", alignItems: "center", gap: 8,
            padding: "0 12px",
          }}>
            <div style={{ width: 12, height: 12, borderRadius: 3, background: G }} />
            <span style={{ fontSize: 14, fontWeight: 800, color: DARK }}>Hometap HEI</span>
          </div>
          <div style={{
            flex: 1, display: "flex", alignItems: "center", gap: 8,
            padding: "0 12px",
          }}>
            <div style={{ width: 12, height: 12, borderRadius: 3, background: comp.color }} />
            <span style={{ fontSize: 14, fontWeight: 800, color: DARK }}>{comp.label}</span>
          </div>
        </div>

        {/* Comparison rows */}
        <div style={{ marginBottom: 8 }}>
          {comp.rows.map((row, i) => (
            <CompRow
              key={`${comparing}-${i}`}
              feature={row.feature}
              hei={row.hei}
              other={row.other}
              otherColor={comp.color}
              index={i}
              visible={visible}
            />
          ))}
        </div>

        {/* Tally */}
        <div style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 0.3s ease 0.3s",
        }}>
          <Tally rows={comp.rows} otherLabel={comp.label} otherColor={comp.color} />
        </div>

        {/* Bottom insight */}
        <div style={{
          background: `linear-gradient(135deg, ${DARK}, #0d3830)`, borderRadius: 16, padding: "22px 22px",
          marginTop: 24, marginBottom: 24, position: "relative", overflow: "hidden",
        }}>
          <div style={{ position: "absolute", top: -30, right: -30, width: 100, height: 100, borderRadius: "50%", background: `${G}10` }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: `${G}bb`, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 8 }}>
              The bottom line
            </div>
            {comparing === "heloc" ? (
              <div style={{ fontSize: 14, color: "rgba(255,255,255,0.75)", lineHeight: 1.6 }}>
                A HELOC gives you flexible access to funds, but it comes with monthly interest payments from day one — and rates can rise. An HEI gives you cash upfront with <span style={{ color: WHITE, fontWeight: 700 }}>no monthly payments, no interest, and no rate risk</span>. You settle on your terms.
              </div>
            ) : (
              <div style={{ fontSize: 14, color: "rgba(255,255,255,0.75)", lineHeight: 1.6 }}>
                A cash-out refi replaces your entire mortgage — including the rate you already have. That means higher monthly payments for 30 years, plus closing costs. An HEI lets you <span style={{ color: WHITE, fontWeight: 700 }}>keep your current mortgage, avoid monthly payments, and settle within 10 years</span>.
              </div>
            )}
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: "center" }}>
          <button style={{
            background: G, color: "#fff", border: "none", borderRadius: 12,
            padding: "16px 40px", fontSize: 16, fontWeight: 700, fontFamily: "'DM Sans', sans-serif",
            cursor: "pointer", boxShadow: `0 4px 16px ${G}40`, transition: "all 0.2s",
          }}
            onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = `0 6px 20px ${G}50`; }}
            onMouseLeave={e => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = `0 4px 16px ${G}40`; }}
          >
            See What You Qualify For
          </button>
          <div style={{ fontSize: 12, color: MUTED, marginTop: 10 }}>
            Takes about 2 minutes · No commitment · No credit impact
          </div>
        </div>

        {/* Disclaimer */}
        <div style={{
          marginTop: 28, padding: "14px 0", borderTop: `1px solid ${BORDER}`,
          fontSize: 11, color: "#9CA3AF", lineHeight: 1.6, textAlign: "center",
        }}>
          This comparison is for general educational purposes. Product availability, terms, rates, and features vary by lender and individual circumstances. Consult a financial advisor for personalized guidance.
        </div>
      </div>
    </div>
  );
}
