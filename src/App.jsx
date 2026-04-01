import { useState, useEffect } from "react";

/* ─── Design System Tokens ───
   DM Sans is the primary typeface. Color palette uses
   blue/700 as primary dark and blue/100 as CTA.
*/
const BRAND = {
  green:     "#00A67E",
  greenLight:"#E6F5F0",
  greenDark: "#008A6A",
  dark:      "#0C2E7D",
  blue100:   "#366CED",
  blue700:   "#0C2E7D",
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
  purple:    "#6D4BD4",
  teal:      "#2A87A8",
  rose:      "#30167E",
  font:      "'DM Sans', sans-serif",
  radius:    { sm: 8, md: 12, lg: 16, xl: 20 },
};

/* ─── Comparison Data ───
   Content informed by:
   - HEI Positioning (Spring 2025)
   - Compliance Guidelines for Marketing Collateral
   - Monthly Cross-Functional Insights from Paid Social (Guru)
   - Product comparison page

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
    color: "#19A274",
    summaryLabel: "HOW A HELOC WORKS",
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
        feature: "Qualification approach",
        hei: { text: "Primarily based on your home's equity — no income or debt-to-income requirements", verdict: "win" },
        other: { text: "Credit score, income verification, and debt-to-income requirements", verdict: "neutral" },
      },
      {
        feature: "Impact on credit and DTI",
        hei: { text: "No impact on your credit score or debt-to-income ratio during the investment term", verdict: "win" },
        other: { text: "Counts as outstanding debt — increases your DTI and appears on your credit report", verdict: "lose" },
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
  heloan: {
    label: "Home Equity Loan",
    color: "#30167E",
    summaryLabel: "HOW A HOME EQUITY LOAN WORKS",
    summary: "A home equity loan gives you a fixed lump sum at a fixed interest rate, repaid in equal monthly installments — typically over 5 to 30 years. Your home is used as collateral.",
    rows: [
      {
        feature: "Monthly payments",
        hei: { text: "No monthly payments for up to 10 years — you settle on your timeline", verdict: "win" },
        other: { text: "Fixed monthly payments begin immediately and continue for the full loan term", verdict: "lose" },
      },
      {
        feature: "Your mortgage rate",
        hei: { text: "Stays exactly as-is — your existing mortgage doesn't change", verdict: "neutral" },
        other: { text: "Mortgage stays in place — the home equity loan is a second lien on top", verdict: "neutral" },
      },
      {
        feature: "Impact on monthly budget",
        hei: { text: "Zero — your cash flow stays the same", verdict: "win" },
        other: { text: "Adds a new fixed monthly bill on top of your existing mortgage", verdict: "lose" },
      },
      {
        feature: "Rate structure",
        hei: { text: "Cost is tied to a share of your home's future value — not a monthly interest rate", verdict: "neutral" },
        other: { text: "Fixed interest rate for the life of the loan — predictable but starts on day one", verdict: "neutral" },
      },
      {
        feature: "How you settle",
        hei: { text: "Sell, refinance, or pay from savings — anytime within 10 years", verdict: "win" },
        other: { text: "Monthly payments for 5–30 years — early payoff may include prepayment penalties", verdict: "lose" },
      },
      {
        feature: "Qualification approach",
        hei: { text: "Primarily based on your home's equity — no income or debt-to-income requirements", verdict: "win" },
        other: { text: "Credit score, income verification, and debt-to-income requirements", verdict: "neutral" },
      },
      {
        feature: "Impact on credit and DTI",
        hei: { text: "No impact on your credit score or debt-to-income ratio during the investment term", verdict: "win" },
        other: { text: "Counts as installment debt — increases your DTI and appears on your credit report", verdict: "lose" },
      },
      {
        feature: "Access to funds",
        hei: { text: "Lump sum — use however you choose", verdict: "neutral" },
        other: { text: "Lump sum — use however you choose", verdict: "neutral" },
      },
    ],
    bottomLine: {
      hook: "Considering a home equity loan?",
      text: "A home equity loan gives you predictable payments at a fixed rate — but those payments start immediately and last for years. An HEI gives you the same lump sum access with no monthly payments, no interest rate, and the flexibility to settle on your own timeline.",
    },
  },
  refi: {
    label: "Cash-out Refi",
    color: "#6D4BD4",
    summaryLabel: "HOW A CASH-OUT REFI WORKS",
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
        feature: "Impact on credit and DTI",
        hei: { text: "No impact on your credit score or debt-to-income ratio during the investment term", verdict: "win" },
        other: { text: "New, larger mortgage increases your DTI and resets your credit history for the account", verdict: "lose" },
      },
    ],
    bottomLine: {
      hook: "Locked in a great mortgage rate?",
      text: "Homeowners who secured rates between 2020–2022 feel trapped — they need cash but don't want to lose the rate they earned. An HEI lets you access equity without replacing your mortgage, so your rate and monthly payment stay exactly where they are.",
    },
  },
  reverse: {
    label: "Reverse Mortgage",
    color: "#249995",
    summaryLabel: "HOW A REVERSE MORTGAGE WORKS",
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
        feature: "Impact on credit and DTI",
        hei: { text: "No impact on your credit score or debt-to-income ratio during the investment term", verdict: "win" },
        other: { text: "Recorded as a lien on your property — may affect future borrowing", verdict: "neutral" },
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
  personal: {
    label: "Personal Loan",
    color: "#2A87A8",
    summaryLabel: "PERSONAL LOAN FOR LARGE EXPENSES",
    summary: "A personal loan gives you a fixed lump sum with a fixed interest rate and fixed monthly payments — typically over 2 to 7 years. It's unsecured, meaning your home isn't used as collateral.",
    rows: [
      {
        feature: "Monthly payments",
        hei: { text: "No monthly payments for up to 10 years — you settle on your timeline", verdict: "win" },
        other: { text: "Fixed monthly payments begin immediately and continue for the full loan term", verdict: "lose" },
      },
      {
        feature: "Your mortgage rate",
        hei: { text: "Stays exactly as-is — your existing mortgage doesn't change", verdict: "neutral" },
        other: { text: "Not affected — personal loans are separate from your mortgage", verdict: "neutral" },
      },
      {
        feature: "Impact on monthly budget",
        hei: { text: "Zero — your cash flow stays the same", verdict: "win" },
        other: { text: "Adds a new fixed monthly bill for the duration of the loan", verdict: "lose" },
      },
      {
        feature: "Cost of borrowing",
        hei: { text: "Cost is tied to a share of your home's future value — not a monthly interest rate", verdict: "neutral" },
        other: { text: "Fixed interest rate, typically 8–15% depending on credit — every payment includes interest", verdict: "lose" },
      },
      {
        feature: "Amount available",
        hei: { text: "Up to $600,000 based on your home's equity", verdict: "win" },
        other: { text: "Typically capped at $50,000–$100,000 — limited by credit profile, not equity", verdict: "lose" },
        highlighted: true,
      },
      {
        feature: "Qualification approach",
        hei: { text: "Primarily based on your home's equity — no income or debt-to-income requirements", verdict: "win" },
        other: { text: "Based on credit score, income, and existing debt load", verdict: "neutral" },
      },
      {
        feature: "Impact on credit and DTI",
        hei: { text: "No impact on your credit score or debt-to-income ratio during the investment term", verdict: "win" },
        other: { text: "Shows as installment debt — increases your DTI and appears on your credit report", verdict: "lose" },
      },
      {
        feature: "Collateral",
        hei: { text: "A lien is recorded on your home to secure the investment", verdict: "neutral" },
        other: { text: "Unsecured — your home is not used as collateral", verdict: "win" },
      },
    ],
    bottomLine: {
      hook: "Need more than a personal loan can offer?",
      text: "Personal loans are fast and simple, but they're limited by your credit profile — not your home's value. If you need $50K or more and want to avoid monthly payments, an HEI unlocks what your equity has built without adding a bill to your budget.",
    },
  },
  credit: {
    label: "Credit Card",
    color: "#0C2E7D",
    summaryLabel: "CREDIT CARDS FOR LARGE EXPENSES",
    summary: "Credit cards offer a revolving line of credit for everyday purchases and cash advances. Convenient for small amounts, but high interest rates make them expensive for large or long-term borrowing.",
    rows: [
      {
        feature: "Monthly payments",
        hei: { text: "No monthly payments for up to 10 years — you settle on your timeline", verdict: "win" },
        other: { text: "Minimum payments required every month — but paying only the minimum can take decades to pay off", verdict: "lose" },
      },
      {
        feature: "Your mortgage rate",
        hei: { text: "Stays exactly as-is — your existing mortgage doesn't change", verdict: "neutral" },
        other: { text: "Not affected — credit cards are separate from your mortgage", verdict: "neutral" },
      },
      {
        feature: "Cost of borrowing",
        hei: { text: "Cost is tied to a share of your home's future value — not a monthly interest rate", verdict: "win" },
        other: { text: "APR typically 20–28% — interest compounds monthly on any unpaid balance", verdict: "lose" },
        highlighted: true,
      },
      {
        feature: "Amount available",
        hei: { text: "Up to $600,000 based on your home's equity", verdict: "win" },
        other: { text: "Typically $5,000–$30,000 — limited by credit profile", verdict: "lose" },
      },
      {
        feature: "Total cost over time",
        hei: { text: "Based on your home's value at settlement — defined and predictable", verdict: "win" },
        other: { text: "Carrying a $25K balance at 24% APR costs over $6,000/year in interest alone", verdict: "lose" },
      },
      {
        feature: "Qualification approach",
        hei: { text: "Primarily based on your home's equity — no income or debt-to-income requirements", verdict: "win" },
        other: { text: "Based on credit score and existing credit history", verdict: "neutral" },
      },
      {
        feature: "Impact on credit and DTI",
        hei: { text: "No impact on your credit score or debt-to-income ratio during the investment term", verdict: "win" },
        other: { text: "High utilization damages your credit score — large balances significantly increase DTI", verdict: "lose" },
      },
      {
        feature: "Repayment structure",
        hei: { text: "Settle once — when you sell, refinance, or buy out within 10 years", verdict: "win" },
        other: { text: "Open-ended — no set payoff date, easy to carry a balance indefinitely", verdict: "lose" },
      },
    ],
    bottomLine: {
      hook: "Carrying credit card debt — or thinking about it?",
      text: "Credit cards are convenient for small purchases, but at 20%+ APR they're one of the most expensive ways to access cash. Many homeowners use an HEI to pay off high-interest debt entirely — eliminating monthly payments and freeing up cash flow.",
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
        fontSize: 13, fontWeight: 700, color: BRAND.dark, padding: "16px 0 10px",
        borderTop: index > 0 ? `1px solid ${BRAND.border}` : "none",
        fontFamily: BRAND.font,
      }}>
        {feature}
      </div>

      {/* Two-column comparison */}
      <div style={{ display: "flex", gap: 10, paddingBottom: 4 }}>
        <div style={{
          flex: 1, display: "flex", gap: 10, alignItems: "flex-start",
          borderRadius: BRAND.radius.md, padding: "10px 12px",
        }}>
          <VerdictIcon verdict={hei.verdict} />
          <div style={{
            fontSize: 13, color: BRAND.gray600, lineHeight: 1.5,
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
            fontSize: 13, color: BRAND.gray600, lineHeight: 1.5,
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  // Maze heatmap tracking
  useEffect(() => {
    try {
      let t = sessionStorage.getItem("maze-us");
      if (!t) {
        t = new Date().getTime();
        sessionStorage.setItem("maze-us", t);
      }
    } catch (err) {}
    const s = document.createElement("script");
    s.src = "https://snippet.maze.co/maze-universal-loader.js?apiKey=1b71ac3f-702c-4429-9277-e74c84d61aa7";
    s.async = true;
    document.head.appendChild(s);
    window.mazeUniversalSnippetApiKey = "1b71ac3f-702c-4429-9277-e74c84d61aa7";
    return () => { try { document.head.removeChild(s); } catch (e) {} };
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
    { key: "heloc", label: "HELOC", color: "#19A274" },
    { key: "heloan", label: "Home Equity Loan", color: "#30167E" },
    { key: "refi", label: "Cash-out Refi", color: "#6D4BD4" },
    { key: "reverse", label: "Reverse Mortgage", color: "#249995" },
    { key: "personal", label: "Personal Loan", color: "#2A87A8" },
    { key: "credit", label: "Credit Card", color: "#0C2E7D" },
  ];

  return (
    <div style={{ fontFamily: BRAND.font, background: BRAND.white, minHeight: "100vh" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{
        background: "#F4F7FF", padding: "40px 24px 32px",
        borderBottom: `1px solid ${BRAND.border}`,
      }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 24,
          }}>
            <div style={{
              width: 32, height: 32, borderRadius: 10,
              background: BRAND.blue700,
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
            fontSize: 32, fontWeight: 800, color: BRAND.blue700, lineHeight: 1.15, margin: "0 0 10px",
            opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(10px)",
            transition: "all 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
          }}>
            Find the right financing fit for you.
          </h1>
          <p style={{
            fontSize: 18, color: BRAND.gray600, margin: 0, lineHeight: 1.6, maxWidth: 520,
            opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(10px)",
            transition: "all 0.5s cubic-bezier(0.22, 1, 0.36, 1) 0.08s",
          }}>
            See how a Home Equity Investment stacks up against the most common alternatives — side by side, feature by feature.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 800, margin: "0 auto", padding: "28px 16px 48px" }}>

        {/* Toggle + Product summary — connected tab-panel */}
        <div style={{ marginBottom: 40 }}>

          {/* Desktop: label + pill row */}
          {!isMobile && (
            <div style={{ marginBottom: 0, position: "relative", zIndex: 1 }}>
              <div style={{
                fontSize: 14, fontWeight: 700, color: BRAND.blue700,
                fontFamily: BRAND.font, marginBottom: 20,
              }}>
                Home Equity Investment vs.
              </div>
              <div style={{
                display: "flex", gap: 6,
              }}>
              {toggleOptions.map((opt) => {
                const active = comparing === opt.key;
                return (
                  <div key={opt.key} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <button onClick={() => switchTo(opt.key)} style={{
                      padding: "9px 16px", borderRadius: active ? "20px 20px 4px 4px" : 20, border: "none",
                      background: active ? BRAND.blue700 : BRAND.gray100,
                      color: active ? BRAND.white : BRAND.gray500,
                      fontSize: 13, fontWeight: 600, fontFamily: BRAND.font,
                      cursor: "pointer", transition: "all 0.25s ease",
                      whiteSpace: "nowrap",
                    }}>
                      {opt.label}
                    </button>
                    {active && (
                      <div style={{
                        width: 0, height: 0,
                        borderLeft: "8px solid transparent",
                        borderRight: "8px solid transparent",
                        borderTop: `8px solid ${BRAND.blue700}`,
                        marginTop: -1,
                      }} />
                    )}
                  </div>
                );
              })}
            </div>
            </div>
          )}

          {/* Mobile: dropdown selector */}
          {isMobile && (
            <div style={{ marginBottom: 4, position: "relative" }}>
              <div style={{
                fontSize: 14, fontWeight: 700, color: BRAND.blue700,
                marginBottom: 8, fontFamily: BRAND.font,
              }}>
                Home Equity Investment vs.
              </div>
              <div style={{ position: "relative" }}>
                <select
                  value={comparing}
                  onChange={(e) => switchTo(e.target.value)}
                  style={{
                    width: "100%", padding: "14px 44px 14px 16px",
                    borderRadius: BRAND.radius.md,
                    border: `2px solid ${BRAND.blue700}`,
                    background: BRAND.white, color: BRAND.blue700,
                    fontSize: 15, fontWeight: 700, fontFamily: BRAND.font,
                    cursor: "pointer", appearance: "none",
                    WebkitAppearance: "none", MozAppearance: "none",
                  }}
                >
                  {toggleOptions.map((opt) => (
                    <option key={opt.key} value={opt.key}>{opt.label}</option>
                  ))}
                </select>
                {/* Chevron */}
                <div style={{
                  position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)",
                  pointerEvents: "none",
                }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={BRAND.blue700} strokeWidth="2.5" strokeLinecap="round">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
              </div>
            </div>
          )}

          {/* Description panel */}
          <div style={{
            padding: "16px 18px", borderRadius: BRAND.radius.md,
            background: BRAND.white,
            border: `1.5px solid ${BRAND.border}`,
            borderTop: `3px solid ${comp.color}`,
            opacity: visible ? 1 : 0,
            transition: "opacity 0.25s ease",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <div style={{ width: 8, height: 8, borderRadius: 2, background: comp.color }} />
              <span style={{ fontSize: 12, fontWeight: 700, color: comp.color, letterSpacing: "0.03em" }}>
                {comp.summaryLabel}
              </span>
            </div>
            <div style={{ fontSize: 13, color: BRAND.gray600, lineHeight: 1.55 }}>
              {comp.summary}
            </div>
          </div>
        </div>

        {/* Column headers */}
        <div style={{
          display: "flex", gap: 10, marginBottom: 4, padding: "0 0 12px",
          borderBottom: `2px solid ${BRAND.border}`,
        }}>
          <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 8, padding: "0 12px" }}>
            <div style={{ width: 12, height: 12, borderRadius: 3, background: BRAND.blue100 }} />
            <span style={{ fontSize: 14, fontWeight: 800, color: BRAND.dark }}>Home Equity Investment</span>
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
            />
          ))}
        </div>

        {/* Bottom line — contextual insight per product */}
        <div style={{
          background: BRAND.blue700, borderRadius: BRAND.radius.xl, padding: "28px 28px",
          marginTop: 24, marginBottom: 28, position: "relative", overflow: "hidden",
        }}>
          <div style={{ position: "absolute", top: -40, right: -40, width: 140, height: 140, borderRadius: "50%", background: "rgba(255,255,255,0.06)" }} />
          <div style={{ position: "absolute", bottom: -20, left: "20%", width: 80, height: 80, borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{
              fontSize: 11, fontWeight: 700, color: BRAND.white,
              letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 10,
            }}>
              {comp.bottomLine.hook}
            </div>
            <div style={{ fontSize: 15, color: "rgba(255,255,255,0.78)", lineHeight: 1.65 }}>
              {comp.bottomLine.text}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <button style={{
            width: 300, background: BRAND.blue100, color: BRAND.white, border: "none",
            borderRadius: BRAND.radius.md, padding: "16px 0", fontSize: 16,
            fontWeight: 700, fontFamily: BRAND.font, cursor: "pointer",
            boxShadow: `0 4px 16px ${BRAND.blue700}20`, transition: "all 0.2s",
          }}
            onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = `0 6px 20px ${BRAND.blue700}30`; }}
            onMouseLeave={e => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = `0 4px 16px ${BRAND.blue700}20`; }}
          >
            Get an Estimate
          </button>
          <div style={{ fontSize: 12, color: BRAND.gray500, marginTop: 10 }}>
            Takes about 2 minutes · No commitment · No credit impact
          </div>
          <a href="tel:8552233144" style={{
            width: 300, boxSizing: "border-box",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            marginTop: 16, padding: "14px 0", borderRadius: BRAND.radius.md,
            border: `1.5px solid ${BRAND.border}`, background: BRAND.white,
            color: BRAND.blue700, fontSize: 13, fontWeight: 600,
            fontFamily: BRAND.font, textDecoration: "none", cursor: "pointer",
            transition: "all 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = BRAND.blue700; e.currentTarget.style.background = `${BRAND.blue700}06`; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = BRAND.border; e.currentTarget.style.background = BRAND.white; }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={BRAND.blue700} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
            </svg>
            Talk to an Investment Manager
          </a>
        </div>

        {/* Disclaimer — required per compliance guidelines */}
        <div style={{
          marginTop: 32, padding: "16px 0", borderTop: `1px solid ${BRAND.border}`,
          fontSize: 11, color: BRAND.gray500, lineHeight: 1.65, textAlign: "center",
        }}>
          This comparison is for general educational purposes. A Home Equity Investment has a 10-year term. No monthly payments are required during the term, but the homeowner must settle the investment at or before the end of the term — by selling, refinancing, or using other funds. The amount owed at settlement is based on the home's value at that time. Product availability, terms, rates, and features vary by lender and individual circumstances. Consult a financial advisor for personalized guidance.
        </div>
      </div>
    </div>
  );
}
