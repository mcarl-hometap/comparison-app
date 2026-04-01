import { useState, useEffect } from "react";

/* ─── Hometap Design System Tokens ───
   Sourced from hometap.com production site + brand guidelines.
   DM Sans is the primary typeface. Color palette anchored on
   the signature green (#00A67E) and dark teal (#0B2B26).
*/
const BRAND = {
  green:     "#00A67E",
  greenLight:"#E6F5F0",
  greenDark: "#008A6A",
  dark:      "#0B2B26",
  cream:     "#F7F5F0",
  white:     "#FFFFFF",
  gray100:   "#F9FAFB",
  gray200:   "#F3F4F6",
  gray300:   "#E5E7EB",
  gray400:   "#D1D5DB",
  gray500:   "#9CA3AF",
  gray600:   "#6B7280",
  gray800:   "#1F2937",
  border:    "#E8E5DE",
  red:       "#DC4545",
  blue:      "#4A7CCC",
  orange:    "#D4764E",
  purple:    "#7C5CBA",
  font:      "'DM Sans', sans-serif",
  radius:    { sm: 8, md: 12, lg: 16, xl: 20 },
};

/* ─── Comparison Data ───
   Content informed by:
   - Hometap HEI Positioning (Spring 2025)
   - Compliance Guidelines for Marketing Collateral
   - Monthly Cross-Functional Insights from Paid Social (Guru)
   - hometap.com/home-equity-investment-vs-traditional-loans

   Key Guru insight applied: Mortgage rate protection is a
   "persistent anxiety trigger that unlocks intent." Homeowners
   who locked in 2020-2022 rates view refinancing as giving up
   an asset they earned. This row is prominent in every comparison.

   Language note: Per compliance, we avoid "not a loan," "no debt,"
   "no interest," and "flexible qualification criteria." We use
   "no monthly payments" with settlement context.
*/
const COMPARISONS = {
  heloc: {
    label: "HELOC",
    color: BRAND.blue,
    summary: "A HELOC gives you a revolving credit line against your home. You draw what you need and pay interest on what you borrow — every month, from day one.",
    rows: [
      {
        feature: "Monthly payments",
        hei: { text: "No monthly payments for up to 10 years — you settle on your timeline", verdict: "win" },
        other: { text: "Interest payments begin immediately and continue monthly", verdict: "lose" },
      },
      {
        feature: "Your mortgage rate",
        hei: { text: "Stays exactly as-is — your existing mortgage doesn't change", verdict: "win" },
        other: { text: "Mortgage stays in place, but HELOC adds a second payment on top", verdict: "neutral" },
        highlighted: true,
      },
      {
        feature: "Impact on monthly budget",
        hei: { text: "Zero — your cash flow stays the same", verdict: "win" },
        other: { text: "Adds a new recurring bill to your monthly expenses", verdict: "lose" },
      },
      {
        feature: "How you settle",
        hei: { text: "Sell, refinance, or pay from savings — anytime within 10 years", verdict: "neutral" },
        other: { text: "Monthly payments during draw period, then principal + interest kicks in", verdict: "lose" },
      },
      {
        feature: "Rate risk",
        hei: { text: "Cost is tied to a share of your home's future value — not a monthly interest rate", verdict: "win" },
        other: { text: "Variable rate that can rise with the market, increasing your payment", verdict: "lose" },
      },
      {
        feature: "If home values drop",
        hei: { text: "Your settlement amount is based on your home's value at the time — if it drops, you may owe less", verdict: "win" },
        other: { text: "You owe the full balance regardless of what your home is worth", verdict: "lose" },
      },
      {
        feature: "Qualification approach",
        hei: { text: "Primarily based on your home's equity — no income or debt-to-income requirements", verdict: "win" },
        other: { text: "Credit score, income verification, and debt-to-income requirements", verdict: "neutral" },
      },
      {
        feature: "Access to funds",
        hei: { text: "Lump sum — use however you choose", verdict: "neutral" },
        other: { text: "Draw as needed during the draw period", verdict: "win" },
      },
    ],
    bottomLine: {
      hook: "Already researching HELOCs?",
      text: "Many homeowners default to a HELOC because it's familiar. But if monthly payments matter to you — or you've locked in a low mortgage rate and don't want to add financial strain — an HEI gives you cash without touching your budget.",
    },
  },
  refi: {
    label: "Cash-out Refi",
    color: BRAND.orange,
    summary: "A cash-out refinance replaces your entire mortgage with a new, larger one. You receive the difference as cash — but take on a new rate and 30 years of payments.",
    rows: [
      {
        feature: "Monthly payments",
        hei: { text: "No monthly payments for up to 10 years — you settle on your timeline", verdict: "win" },
        other: { text: "New, higher mortgage payment every month for 30 years", verdict: "lose" },
      },
      {
        feature: "Your mortgage rate",
        hei: { text: "Stays exactly as-is — you keep the rate you have", verdict: "win" },
        other: { text: "Replaced entirely — if you locked in a low rate, it's gone", verdict: "lose" },
        highlighted: true,
      },
      {
        feature: "Impact on monthly budget",
        hei: { text: "Zero — your cash flow stays the same", verdict: "win" },
        other: { text: "Higher monthly mortgage payment, often significantly", verdict: "lose" },
      },
      {
        feature: "Income and DTI requirements",
        hei: { text: "No income or debt-to-income requirements", verdict: "win" },
        other: { text: "Requires income verification and DTI within lender guidelines", verdict: "lose" },
      },
      {
        feature: "How you settle",
        hei: { text: "Sell, refinance, or pay from savings — anytime within 10 years", verdict: "neutral" },
        other: { text: "30 years of mortgage payments starting immediately", verdict: "lose" },
      },
      {
        feature: "Time to close",
        hei: { text: "Weeks, not months", verdict: "win" },
        other: { text: "Full mortgage underwriting process — typically 30–60 days", verdict: "lose" },
      },
      {
        feature: "Qualification approach",
        hei: { text: "Primarily based on your home's equity — no income or debt-to-income requirements", verdict: "win" },
        other: { text: "Full mortgage underwriting — credit, income, and DTI", verdict: "neutral" },
      },
      {
        feature: "If home values drop",
        hei: { text: "Your settlement amount is based on your home's value at the time — if it drops, you may owe less", verdict: "win" },
        other: { text: "You owe the full mortgage balance regardless", verdict: "lose" },
      },
    ],
    bottomLine: {
      hook: "Locked in a great mortgage rate?",
      text: "Homeowners who secured rates between 2020–2022 feel trapped — they need cash but don't want to lose the rate they earned. An HEI lets you access equity without replacing your mortgage, so your rate and monthly payment stay exactly where they are.",
    },
  },
  reverse: {
    label: "Reverse Mortgage",
    color: BRAND.purple,
    summary: "A reverse mortgage converts home equity into cash for homeowners 62+. No monthly payments, but the loan balance grows over time and is repaid when you sell or pass away.",
    rows: [
      {
        feature: "Age eligibility",
        hei: { text: "Available to homeowners 18+", verdict: "win" },
        other: { text: "Must be 62 or older to qualify", verdict: "lose" },
      },
      {
        feature: "Your mortgage rate",
        hei: { text: "Stays exactly as-is — your existing mortgage doesn't change", verdict: "win" },
        other: { text: "Existing mortgage must be paid off as part of the reverse mortgage", verdict: "lose" },
        highlighted: true,
      },
      {
        feature: "Monthly payments",
        hei: { text: "No monthly payments — and a defined 10-year window to settle", verdict: "neutral" },
        other: { text: "No monthly payments — but the loan balance grows with interest every month", verdict: "neutral" },
      },
      {
        feature: "What you owe over time",
        hei: { text: "Based on your home's value at settlement — could be more or less", verdict: "neutral" },
        other: { text: "Loan balance grows every year as interest compounds — can consume most of your equity", verdict: "lose" },
      },
      {
        feature: "Complexity",
        hei: { text: "Straightforward application, typically closes in weeks", verdict: "win" },
        other: { text: "Requires HUD counseling, extensive paperwork, and longer closing", verdict: "lose" },
      },
      {
        feature: "Impact on heirs",
        hei: { text: "Settled within 10 years — your heirs inherit remaining equity", verdict: "win" },
        other: { text: "Loan balance may consume most equity, leaving less for heirs", verdict: "lose" },
      },
      {
        feature: "Ongoing requirements",
        hei: { text: "Keep your home maintained and insured", verdict: "neutral" },
        other: { text: "Must remain in home as primary residence, maintain property, pay taxes and insurance — or risk default", verdict: "lose" },
      },
      {
        feature: "Flexibility to move",
        hei: { text: "Settle when you sell and keep any remaining equity", verdict: "win" },
        other: { text: "Loan becomes due if you move out for 12+ months", verdict: "lose" },
      },
    ],
    bottomLine: {
      hook: "Exploring options for retirement?",
      text: "Reverse mortgages work for some homeowners 62+, but the growing loan balance can quietly consume most of your equity over time. An HEI gives you cash now without a balance that compounds — and it's available at any age.",
    },
  },
};

/* ─── Components ─── */

function VerdictIcon({ verdict, size = 18 }) {
  const G = BRAND.green;
  const R = BRAND.red;
  const M = BRAND.gray500;
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
        width: size + 4, height: size + 4, borderRadius: "50%", background: `${R}10`,
        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
      }}>
        <svg width={size - 4} height={size - 4} viewBox="0 0 24 24" fill="none" stroke={R} strokeWidth="3" strokeLinecap="round">
          <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </div>
    );
  }
  return (
    <div style={{
      width: size + 4, height: size + 4, borderRadius: "50%", background: `${M}12`,
      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
    }}>
      <div style={{ width: size - 6, height: 3, borderRadius: 2, background: `${M}60` }} />
    </div>
  );
}

function CompRow({ feature, hei, other, otherColor, index, visible, highlighted }) {
  const delay = 0.04 * index;
  return (
    <div style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(10px)",
      transition: `all 0.35s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`,
    }}>
      {/* Feature label */}
      <div style={{
        fontSize: 13, fontWeight: 700, color: BRAND.dark, padding: "16px 0 10px",
        borderTop: index > 0 ? `1px solid ${BRAND.border}` : "none",
        fontFamily: BRAND.font,
        display: "flex", alignItems: "center", gap: 8,
      }}>
        {highlighted && (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={BRAND.green} strokeWidth="2.5" strokeLinecap="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        )}
        {feature}
        {highlighted && (
          <span style={{
            fontSize: 9, fontWeight: 700, color: BRAND.green, background: `${BRAND.green}12`,
            padding: "2px 7px", borderRadius: 6, letterSpacing: "0.04em", textTransform: "uppercase",
          }}>Key difference</span>
        )}
      </div>

      {/* Two-column comparison */}
      <div style={{ display: "flex", gap: 10, paddingBottom: 4 }}>
        <div style={{
          flex: 1, display: "flex", gap: 10, alignItems: "flex-start",
          borderRadius: BRAND.radius.md, padding: "10px 12px",
        }}>
          <VerdictIcon verdict={hei.verdict} />
          <div style={{
            fontSize: 13, color: hei.verdict === "win" ? BRAND.dark : BRAND.gray600,
            lineHeight: 1.5, fontWeight: hei.verdict === "win" ? 600 : 400,
          }}>
            {hei.text}
          </div>
        </div>

        <div style={{
          flex: 1, display: "flex", gap: 10, alignItems: "flex-start",
          borderRadius: BRAND.radius.md, padding: "10px 12px",
        }}>
          <VerdictIcon verdict={other.verdict} />
          <div style={{
            fontSize: 13, color: other.verdict === "win" ? BRAND.dark : BRAND.gray600,
            lineHeight: 1.5, fontWeight: other.verdict === "win" ? 600 : 400,
          }}>
            {other.text}
          </div>
        </div>
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

  const toggleOptions = [
    { key: "heloc", label: "vs. HELOC", color: BRAND.blue },
    { key: "refi", label: "vs. Cash-out Refi", color: BRAND.orange },
    { key: "reverse", label: "vs. Reverse Mortgage", color: BRAND.purple },
  ];

  return (
    <div style={{ fontFamily: BRAND.font, background: BRAND.white, minHeight: "100vh" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

      {/* Header — aligned with hometap.com visual language */}
      <div style={{
        background: BRAND.white, padding: "40px 24px 32px",
        borderBottom: `1px solid ${BRAND.border}`,
      }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          {/* Hometap wordmark placeholder */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 24,
          }}>
            <div style={{
              width: 32, height: 32, borderRadius: 10,
              background: `linear-gradient(135deg, ${BRAND.green}, #4DBFA0)`,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={BRAND.white} strokeWidth="2.5" strokeLinecap="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </div>
            <span style={{ fontSize: 13, fontWeight: 700, color: BRAND.gray500, letterSpacing: "0.06em", textTransform: "uppercase" }}>
              Compare Options
            </span>
          </div>

          <h1 style={{
            fontSize: 32, fontWeight: 800, color: BRAND.dark, lineHeight: 1.15, margin: "0 0 10px",
            opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(10px)",
            transition: "all 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
          }}>
            Find the right financing fit for you.
          </h1>
          <p style={{
            fontSize: 16, color: BRAND.gray600, margin: 0, lineHeight: 1.6, maxWidth: 520,
            opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(10px)",
            transition: "all 0.5s cubic-bezier(0.22, 1, 0.36, 1) 0.08s",
          }}>
            You have options for accessing your equity. See how a Hometap Home Equity Investment compares — side by side, feature by feature.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 680, margin: "0 auto", padding: "28px 16px 48px" }}>

        {/* Toggle — 3 options */}
        <div style={{
          display: "flex", background: BRAND.gray100, borderRadius: BRAND.radius.lg, padding: 4,
          border: `1px solid ${BRAND.border}`, marginBottom: 8,
        }}>
          {toggleOptions.map((opt) => {
            const active = comparing === opt.key;
            return (
              <button key={opt.key} onClick={() => switchTo(opt.key)} style={{
                flex: 1, padding: "11px 6px", borderRadius: BRAND.radius.md, border: "none",
                background: active ? BRAND.white : "transparent",
                color: active ? BRAND.dark : BRAND.gray500,
                fontSize: 13, fontWeight: 700, fontFamily: BRAND.font,
                cursor: "pointer", transition: "all 0.25s ease",
                boxShadow: active ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
              }}>
                {opt.label}
              </button>
            );
          })}
        </div>

        {/* Product summary */}
        <div style={{
          padding: "14px 16px", marginBottom: 24, borderRadius: BRAND.radius.md,
          background: `${comp.color}06`, border: `1px solid ${comp.color}12`,
          opacity: visible ? 1 : 0,
          transition: "opacity 0.25s ease",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
            <div style={{ width: 8, height: 8, borderRadius: 2, background: comp.color }} />
            <span style={{ fontSize: 12, fontWeight: 700, color: comp.color, letterSpacing: "0.03em" }}>
              WHAT IS A {comp.label.toUpperCase()}?
            </span>
          </div>
          <div style={{ fontSize: 13, color: BRAND.gray600, lineHeight: 1.55 }}>
            {comp.summary}
          </div>
        </div>

        {/* Column headers */}
        <div style={{
          display: "flex", gap: 10, marginBottom: 4, padding: "0 0 12px",
          borderBottom: `2px solid ${BRAND.border}`,
        }}>
          <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 8, padding: "0 12px" }}>
            <div style={{ width: 12, height: 12, borderRadius: 3, background: BRAND.green }} />
            <span style={{ fontSize: 14, fontWeight: 800, color: BRAND.dark }}>Hometap HEI</span>
          </div>
          <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 8, padding: "0 12px" }}>
            <div style={{ width: 12, height: 12, borderRadius: 3, background: comp.color }} />
            <span style={{ fontSize: 14, fontWeight: 800, color: BRAND.dark }}>{comp.label}</span>
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
              highlighted={row.highlighted}
            />
          ))}
        </div>

        {/* Bottom line — contextual insight per product */}
        <div style={{
          background: BRAND.dark, borderRadius: BRAND.radius.xl, padding: "28px 28px",
          marginTop: 24, marginBottom: 28, position: "relative", overflow: "hidden",
        }}>
          <div style={{ position: "absolute", top: -40, right: -40, width: 140, height: 140, borderRadius: "50%", background: `${BRAND.green}10` }} />
          <div style={{ position: "absolute", bottom: -20, left: "20%", width: 80, height: 80, borderRadius: "50%", background: `${BRAND.green}06` }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{
              fontSize: 11, fontWeight: 700, color: `${BRAND.green}bb`,
              letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 10,
            }}>
              {comp.bottomLine.hook}
            </div>
            <div style={{ fontSize: 15, color: "rgba(255,255,255,0.78)", lineHeight: 1.65 }}>
              {comp.bottomLine.text}
            </div>
          </div>
        </div>

        {/* CTA — matches hometap.com button style */}
        <div style={{ textAlign: "center" }}>
          <button style={{
            background: BRAND.green, color: BRAND.white, border: "none",
            borderRadius: BRAND.radius.md, padding: "16px 44px", fontSize: 16,
            fontWeight: 700, fontFamily: BRAND.font, cursor: "pointer",
            boxShadow: `0 4px 16px ${BRAND.green}40`, transition: "all 0.2s",
          }}
            onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = `0 6px 20px ${BRAND.green}50`; }}
            onMouseLeave={e => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = `0 4px 16px ${BRAND.green}40`; }}
          >
            Get an Estimate
          </button>
          <div style={{ fontSize: 12, color: BRAND.gray500, marginTop: 10 }}>
            Takes about 2 minutes · No commitment · No credit impact
          </div>
        </div>

        {/* Disclaimer — required per compliance guidelines */}
        <div style={{
          marginTop: 32, padding: "16px 0", borderTop: `1px solid ${BRAND.border}`,
          fontSize: 11, color: BRAND.gray500, lineHeight: 1.65, textAlign: "center",
        }}>
          This comparison is for general educational purposes. A Hometap HEI has a 10-year term. No monthly payments are required during the term, but the homeowner must settle the investment at or before the end of the term — by selling, refinancing, or using other funds. The amount owed at settlement is based on the home's value at that time. Product availability, terms, rates, and features vary by lender and individual circumstances. Consult a financial advisor for personalized guidance.
        </div>
      </div>
    </div>
  );
}
