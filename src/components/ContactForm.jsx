import { useState } from "react";
import { colors, fonts, rgba } from "../theme/theme";

const SERVICES = [
  "Cinematic Video",
  "AI Personas",
  "Fashion & Editorial",
  "Social & Reels Content",
  "Something Else",
];

const TIMELINES = [
  "ASAP (within 1-2 weeks)",
  "This month",
  "Next month",
  "Just exploring for now",
];

const BUDGETS = [
  "Under $500",
  "$500 – $1,000",
  "$1,000 – $2,500",
  "$2,500 – $5,000",
  "$5,000+",
  "Not sure yet",
];

// Google Apps Script Web App URL — set this after deploying the script
const FORM_URL = "https://script.google.com/macros/s/AKfycbz59n1eCx8hRDDOlOBRCiCyqoZiE8FVJURt50AfDgIbOGDSvUv7soOtEkkD2CKYyVSFQw/exec";

const ContactForm = ({ isOpen, onClose, isMobile }) => {
  const [form, setForm] = useState({
    name: "", company: "", email: "", services: [], project: "", timeline: "", budget: "",
  });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  if (!isOpen) return null;

  const update = (field, value) => setForm(f => ({ ...f, [field]: value }));
  const toggleService = (s) => setForm(f => ({
    ...f,
    services: f.services.includes(s) ? f.services.filter(x => x !== s) : [...f.services, s],
  }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setStatus("sending");
    try {
      await fetch(FORM_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          services: form.services.join(", "),
          timestamp: new Date().toISOString(),
        }),
      });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const inputStyle = {
    width: "100%",
    background: "rgba(255,255,255,0.05)",
    border: `1px solid rgba(255,255,255,0.1)`,
    borderRadius: 8,
    padding: "12px 16px",
    color: colors.cream,
    fontFamily: fonts.body,
    fontSize: 14,
    outline: "none",
    transition: "border-color 0.2s",
  };

  const labelStyle = {
    fontFamily: fonts.body,
    fontSize: 11,
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    color: colors.gold,
    marginBottom: 8,
    display: "block",
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(0,0,0,0.85)", backdropFilter: "blur(12px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: isMobile ? 16 : 40,
        overflowY: "auto",
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: "#111", border: `1px solid ${rgba(colors.gold, 0.15)}`,
          borderRadius: 16, padding: isMobile ? 24 : 40,
          maxWidth: 560, width: "100%", position: "relative",
          maxHeight: "90vh", overflowY: "auto",
        }}
      >
        {/* Close */}
        <button onClick={onClose} style={{
          position: "absolute", top: 16, right: 16, background: "none",
          border: "none", color: "rgba(255,255,255,0.4)", fontSize: 24, cursor: "pointer",
        }}>×</button>

        {status === "success" ? (
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>✨</div>
            <h3 style={{ fontFamily: fonts.heading, fontSize: 28, fontWeight: 400, color: colors.cream, marginBottom: 12 }}>
              Thank you!
            </h3>
            <p style={{ fontFamily: fonts.body, fontSize: 15, color: "rgba(245,240,232,0.5)", lineHeight: 1.7 }}>
              We'll be in touch within 24 hours to discuss your vision.
            </p>
            <button onClick={onClose} style={{
              marginTop: 32, background: `linear-gradient(135deg, ${colors.gold}, ${colors.goldLight})`,
              color: colors.dark, border: "none", borderRadius: 8, padding: "14px 32px",
              fontFamily: fonts.body, fontSize: 13, fontWeight: 500, cursor: "pointer",
              letterSpacing: "0.1em", textTransform: "uppercase",
            }}>Close</button>
          </div>
        ) : (
          <form onSubmit={submit}>
            <h3 style={{
              fontFamily: fonts.heading, fontSize: isMobile ? 24 : 28, fontWeight: 400,
              color: colors.cream, marginBottom: 4,
            }}>
              Start a <em style={{ color: colors.gold, fontStyle: "italic" }}>Project</em>
            </h3>
            <p style={{
              fontFamily: fonts.body, fontSize: 13, color: "rgba(245,240,232,0.4)",
              marginBottom: 28, lineHeight: 1.5,
            }}>
              Tell us about your vision and we'll bring it to life.
            </p>

            {/* Name + Company */}
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 16, marginBottom: 16 }}>
              <div>
                <label style={labelStyle}>Your Name *</label>
                <input style={inputStyle} value={form.name} onChange={e => update("name", e.target.value)}
                  placeholder="Jane Smith" required
                  onFocus={e => e.target.style.borderColor = rgba(colors.gold, 0.4)}
                  onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"} />
              </div>
              <div>
                <label style={labelStyle}>Company / Brand</label>
                <input style={inputStyle} value={form.company} onChange={e => update("company", e.target.value)}
                  placeholder="Acme Inc."
                  onFocus={e => e.target.style.borderColor = rgba(colors.gold, 0.4)}
                  onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"} />
              </div>
            </div>

            {/* Email */}
            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>Email *</label>
              <input style={inputStyle} type="email" value={form.email} onChange={e => update("email", e.target.value)}
                placeholder="jane@example.com" required
                onFocus={e => e.target.style.borderColor = rgba(colors.gold, 0.4)}
                onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"} />
            </div>

            {/* Services checkboxes */}
            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>What are you looking for?</label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {SERVICES.map(s => {
                  const active = form.services.includes(s);
                  return (
                    <button key={s} type="button" onClick={() => toggleService(s)} style={{
                      padding: "8px 16px", borderRadius: 20, fontSize: 12, fontFamily: fonts.body,
                      cursor: "pointer", transition: "all 0.2s",
                      background: active ? rgba(colors.gold, 0.15) : "rgba(255,255,255,0.03)",
                      border: `1px solid ${active ? rgba(colors.gold, 0.4) : "rgba(255,255,255,0.08)"}`,
                      color: active ? colors.gold : "rgba(245,240,232,0.5)",
                    }}>{s}</button>
                  );
                })}
              </div>
            </div>

            {/* Project description */}
            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>Tell us about your project</label>
              <textarea style={{ ...inputStyle, height: 100, resize: "vertical" }}
                value={form.project} onChange={e => update("project", e.target.value)}
                placeholder="Give us the big picture — what's the vision, what's the occasion, what would make this a success?"
                onFocus={e => e.target.style.borderColor = rgba(colors.gold, 0.4)}
                onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"} />
            </div>

            {/* Timeline + Budget */}
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 16, marginBottom: 28 }}>
              <div>
                <label style={labelStyle}>Timeline</label>
                <select style={{ ...inputStyle, appearance: "none", cursor: "pointer" }}
                  value={form.timeline} onChange={e => update("timeline", e.target.value)}>
                  <option value="" style={{ background: "#111" }}>Select timeline...</option>
                  {TIMELINES.map(t => <option key={t} value={t} style={{ background: "#111" }}>{t}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Budget Range <span style={{ opacity: 0.5, textTransform: "none", letterSpacing: 0 }}>(optional)</span></label>
                <select style={{ ...inputStyle, appearance: "none", cursor: "pointer" }}
                  value={form.budget} onChange={e => update("budget", e.target.value)}>
                  <option value="" style={{ background: "#111" }}>Select budget...</option>
                  {BUDGETS.map(b => <option key={b} value={b} style={{ background: "#111" }}>{b}</option>)}
                </select>
              </div>
            </div>

            {/* Submit */}
            <button type="submit" disabled={status === "sending"} style={{
              width: "100%",
              background: status === "sending" ? rgba(colors.gold, 0.5) : `linear-gradient(135deg, ${colors.gold}, ${colors.goldLight})`,
              color: colors.dark, border: "none", borderRadius: 8,
              padding: "16px 32px", fontFamily: fonts.body, fontSize: 14,
              fontWeight: 600, cursor: status === "sending" ? "wait" : "pointer",
              letterSpacing: "0.1em", textTransform: "uppercase",
              transition: "all 0.3s ease",
            }}>
              {status === "sending" ? "Sending..." : "Let's Create"}
            </button>

            {status === "error" && (
              <p style={{ color: "#e74c3c", fontSize: 13, textAlign: "center", marginTop: 12 }}>
                Something went wrong. Please try again or email us directly.
              </p>
            )}
          </form>
        )}
      </div>
    </div>
  );
};

export default ContactForm;
