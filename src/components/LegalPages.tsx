import React, { useState } from "react";
import { Mail, ShieldCheck, FileText, Scale, Heart, Compass, Send, CheckCircle } from "lucide-react";

interface SubPageProps {
  type: "privacy" | "terms" | "disclaimer" | "about" | "contact" | "cookie";
}

export const LegalPages: React.FC<SubPageProps> = ({ type }) => {
  // Contact Us state model
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [website, setWebsite] = useState(""); // Honeypot spam trap
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.subject || !form.message) {
      setErrorMsg("All core input fields are required before sending.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setErrorMsg("Please enter a valid personal or academic email address.");
      return;
    }

    setErrorMsg("");
    setIsSending(true);

    try {
      const response = await fetch("https://formspree.io/f/xwvjygwv", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
          website: website,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMsg(data.error || "An error occurred while sending your message. Please try again.");
      } else {
        setSubmitted(true);
        setForm({ name: "", email: "", subject: "", message: "" });
        setWebsite("");
      }
    } catch (err) {
      console.error("Failed to send contact ticket:", err);
      setErrorMsg("Network error trying to contact the server. Please check your connection and try again.");
    } finally {
      setIsSending(false);
    }
  };

  if (type === "about") {
    return (
      <div className="w-full max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="font-display font-bold text-3xl md:text-4xl text-slate-900 tracking-tight flex items-center justify-center gap-3">
            <Heart className="w-8 h-8 text-blue-600" />
            <span>About StudyCalc</span>
          </h1>
          <p className="text-slate-600 mt-2 max-w-xl mx-auto text-sm md:text-base animate-pulse">
            Providing high-fidelity, credit-compliant calculation suites for engineering scholars and Indian college students.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-100 p-6 md:p-8 shadow-sm space-y-6">
          <div className="space-y-4 text-slate-600 text-sm md:text-base leading-relaxed">
            <h2 className="font-display font-semibold text-slate-800 text-lg">Our Mission</h2>
            <p>
              StudyCalc is designed with a student-first philosophy, delivering premium math tools, CGPA sheets, and attendance estimators that run completely client-side in the browser. High traffic ready and fully optimized for zero delay, our system guides college scholars in making precise academic projections.
            </p>
            <h2 className="font-display font-semibold text-slate-800 text-lg">Our Purpose</h2>
            <p>
              Our calculators are tailored explicitly for universities like <strong>JNTU (Hyderabad, Kakinada, Anantapur)</strong> and allied technical colleges. By addressing the mandatory 75% attendance rule and complex relative credit mappings, we empower students to audit their scores accurately.
            </p>
            <h2 className="font-display font-semibold text-slate-800 text-lg">A Safe and Free Experience</h2>
            <p>
              This suite requires no tedious mobile authentications, locks no premium algorithms behind subscription gates, and collects no personal dossiers. Everything is compiled directly inside your terminal browser context, ensuring extreme security and 100% compliance with digital layout specifications.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (type === "contact") {
    return (
      <div className="w-full max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="font-display font-bold text-3xl text-slate-900 tracking-tight flex items-center justify-center gap-3">
            <Mail className="w-8 h-8 text-blue-600" />
            <span>Contact Us</span>
          </h1>
          <p className="text-slate-600 mt-2 max-w-xl mx-auto text-sm md:text-base">
            Got dynamic questions, feature ideas, or feedback? Send us a ticket and our platform developers will reach back!
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-100 p-6 md:p-8 shadow-sm">
          {submitted ? (
            <div className="p-6 bg-emerald-50 border border-emerald-150 rounded-2xl text-center space-y-3">
              <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto animate-bounce" />
              <h2 className="font-display font-bold text-slate-800 text-base">Message Sent Successfully!</h2>
              <p className="text-xs text-slate-500">
                Thank you for contacting StudyCalc. Our student feedback desk will evaluate your request and respond to your email shortly.
              </p>
              <button
                id="btn-back-contact"
                onClick={() => setSubmitted(false)}
                className="text-xs text-blue-600 hover:underline font-semibold"
              >
                Send another ticket
              </button>
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} className="space-y-4">
              {errorMsg && (
                <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl font-medium border border-red-100">
                  {errorMsg}
                </div>
              )}

              {/* Honeypot Spam Protection Field - hidden from users, filled by bots */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="contact-website" className="sr-only">Do not fill this field if you are human</label>
                <input
                  id="contact-website"
                  type="text"
                  name="website"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div>
                <label htmlFor="contact-name" className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1.5 font-sans">Full Name</label>
                <input
                  id="contact-name"
                  type="text"
                  value={form.name}
                  disabled={isSending}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 font-sans text-sm disabled:opacity-60"
                  placeholder="e.g., Harish Kumar"
                />
              </div>

              <div>
                <label htmlFor="contact-email" className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1.5 font-sans">Email Address</label>
                <input
                  id="contact-email"
                  type="email"
                  value={form.email}
                  disabled={isSending}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 font-sans text-sm disabled:opacity-60"
                  placeholder="e.g., harish@college.edu"
                />
              </div>

              <div>
                <label htmlFor="contact-subject" className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1.5 font-sans">Subject Topic</label>
                <input
                  id="contact-subject"
                  type="text"
                  value={form.subject}
                  disabled={isSending}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 font-sans text-sm disabled:opacity-60"
                  placeholder="e.g., JNTUH R22 SGPA scaling issue"
                />
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1.5 font-sans">Detailed Message / Inquiry</label>
                <textarea
                  id="contact-message"
                  rows={4}
                  value={form.message}
                  disabled={isSending}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 font-sans text-sm disabled:opacity-60"
                  placeholder="How can we assist you with academic tools?..."
                ></textarea>
              </div>

              <div className="pt-2">
                <button
                  id="btn-submit-contact"
                  type="submit"
                  disabled={isSending}
                  className={`w-full py-3 px-4 text-white font-semibold text-sm rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm ${
                    isSending ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {isSending ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  <span>{isSending ? "Sending Ticket..." : "Send Ticket"}</span>
                </button>
              </div>

            
            </form>
          )}
        </div>
      </div>
    );
  }

  // Legal standard blocks - High precision for Google AdSense compliance
  const getPolicyContent = () => {
    switch (type) {
      case "privacy":
        return {
          title: "Privacy Policy",
          icon: <ShieldCheck className="w-8 h-8 text-blue-600" />,
          body: (
            <div className="space-y-4 text-xs md:text-sm text-slate-600 leading-relaxed">
              <p>
                At StudyCalc, accessible from our standard hosted portals, candidate privacy represents an absolute core priority. This comprehensive Privacy Policy document details types of data that are collected or stored by StudyCalc and how we handle it.
              </p>
              <h3 className="font-display font-semibold text-slate-800 text-sm mt-4">1. Local State Storage only</h3>
              <p>
                StudyCalc operates exclusively as a client-side calculator utility. Any marks, grades, classes, credits or parameters you log into our active worksheets are committed to your local browser storage context (via standard key-value HTML5 `localStorage`). This data is never sent behind servers, synced with third-party tracking portals, or processed externally.
              </p>
              <h3 className="font-display font-semibold text-slate-800 text-sm mt-4">2. Logging Files and Analytics</h3>
              <p>
                Like any standard browser system, our static hosting CDNs can analyze basic security access logs (including client IP addresses, standard browser agents, referring pages, and timestamp listings). These are used purely to safeguard cloud resources against DDOS occurrences and manage rate limits.
              </p>
              <h3 className="font-display font-semibold text-slate-800 text-sm mt-4">3. Google AdSense and third-party scripts</h3>
              <p>
                Third-party ad networks (like Google AdSense) may execute specialized tracking scripts or DART cookies to display target promotions based on past visits. You can disable cookies inside individual browsers.
              </p>
              <h3 className="font-display font-semibold text-slate-800 text-sm mt-4">4. Compliance</h3>
              <p>
                This framework complies with India IT protection acts and international specifications, ensuring children under 13 have zero risk of personal metadata compromise because no database logs exist on our cloud run backend container servers.
              </p>
            </div>
          ),
        };
      case "terms":
        return {
          title: "Terms and Conditions",
          icon: <FileText className="w-8 h-8 text-blue-600" />,
          body: (
            <div className="space-y-4 text-xs md:text-sm text-slate-600 leading-relaxed">
              <p>
                Welcome to StudyCalc! These general Terms and Conditions govern candidate use of StudyCalc located within our hosted deployment endpoints.
              </p>
              <h3 className="font-display font-semibold text-slate-800 text-sm mt-4">1. Permitted Use</h3>
              <p>
                You are free to leverage this academic calculator for non-commercial student evaluations, transcript validation, and laboratory planning. You must not automate massive API queries or execution scrapes that would otherwise degrade our static CDN hosting speeds.
              </p>
              <h3 className="font-display font-semibold text-slate-800 text-sm mt-4">2. Accuracy of Scores</h3>
              <p>
                Our credit grading engines correspond to published equations. However, formal transcrip evaluations rest with JNTU and allied technical boards registrars. StudyCalc holds zero liability for marks differences during actual university score distributions.
              </p>
            </div>
          ),
        };
      case "disclaimer":
        return {
          title: "Disclaimer",
          icon: <Scale className="w-8 h-8 text-blue-600" />,
          body: (
            <div className="space-y-4 text-xs md:text-sm text-slate-600 leading-relaxed">
              <p>
                If you require any more information or have any questions about our site's disclaimer, please feel free to contact us by email at support@studycalc.in.
              </p>
              <h3 className="font-display font-semibold text-slate-800 text-sm mt-4">1. Information Accuracy</h3>
              <p>
                All the academic metrics and guides on this website are published in good faith and for general educational guidance purposes only. StudyCalc does not make any absolute statements about completeness or precision. Any action you take based on the parameters yielded by this site is strictly at your own academic risk.
              </p>
              <h3 className="font-display font-semibold text-slate-800 text-sm mt-4">2. Non-Affiliation Statement</h3>
              <p>
                StudyCalc is a completely independent student utility hub. We are <strong>not affiliated with, authorized, endorsed, or officially connected</strong> to Jawaharlal Nehru Technological University (JNTUH, JNTUK, JNTUA), the AICTE Council, or any statutory Indian engineering board. Names like "JNTU" are referenced strictly for educational grading alignment references.
              </p>
            </div>
          ),
        };
      case "cookie":
      default:
        return {
          title: "Cookie Policy",
          icon: <Compass className="w-8 h-8 text-blue-600" />,
          body: (
            <div className="space-y-4 text-xs md:text-sm text-slate-600 leading-relaxed">
              <p>
                StudyCalc complies with modern cookie rules. Because our main calculation worksheets preserve progress using browser-stored variables rather than tracking cookies, standard visits invoke extremely zero tracking elements.
              </p>
              <h3 className="font-display font-semibold text-slate-800 text-sm mt-4">1. Cookies used</h3>
              <p>
                We may deploy minimal local cookies of our own strictly to preserve screen display parameters, like checking whether dark mode is toggled, or logging which active utility was visited first.
              </p>
              <h3 className="font-display font-semibold text-slate-800 text-sm mt-4">2. AdSense cookies</h3>
              <p>
                External networks like Google AdSense might utilize cookies to match student ads efficiently. Refer to Google's public policy pages to opt-out of DART cookies.
              </p>
            </div>
          ),
        };
    }
  };

  const currentPolicy = getPolicyContent();

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="font-display font-bold text-3xl text-slate-900 tracking-tight flex items-center justify-center gap-3">
          {currentPolicy.icon}
          <span>{currentPolicy.title}</span>
        </h1>
        <p className="text-slate-550 mt-1.5 text-xs font-mono">
          Last Updated: June 2026. Compliant with standard publisher guidelines.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 p-6 md:p-8 shadow-sm">
        {currentPolicy.body}
      </div>
    </div>
  );
};
export default LegalPages;
