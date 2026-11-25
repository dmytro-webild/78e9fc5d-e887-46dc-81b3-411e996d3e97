import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, X, Send, CheckCircle2 } from "lucide-react";

const WHATSAPP_NUMBER = "917356743300";

type FormData = {
  customerName: string;
  businessName: string;
  phone: string;
  email: string;
  websiteType: string;
  estimatedBudget: string;
  projectDescription: string;
};

const initialFormData: FormData = {
  customerName: "",
  businessName: "",
  phone: "",
  email: "",
  websiteType: "Local Business Website",
  estimatedBudget: "$500 - $1,000",
  projectDescription: "",
};

export default function WhatsAppEnquiryWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Format professional WhatsApp message
    const message = [
      `*NEW WEBSITE ENQUIRY - Mackcode* 🚀`,
      ``,
      `👤 *Customer Name:* ${formData.customerName.trim()}`,
      `🏢 *Business Name:* ${formData.businessName.trim()}`,
      `📞 *Phone Number:* ${formData.phone.trim()}`,
      `✉️ *Email:* ${formData.email.trim()}`,
      `🌐 *Website Type:* ${formData.websiteType}`,
      `💰 *Estimated Budget:* ${formData.estimatedBudget}`,
      ``,
      `📝 *Project Description:*`,
      `${formData.projectDescription.trim()}`,
      ``,
      `---`,
      `Sent via Mackcode WhatsApp Enquiry System`,
    ].join("\n");

    const encodedMessage = encodeURIComponent(message);
    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    setIsSubmitted(true);

    // Open WhatsApp link in new tab / redirect
    setTimeout(() => {
      window.open(waUrl, "_blank", "noopener,noreferrer");
      setIsSubmitted(false);
      setIsOpen(false);
      setFormData(initialFormData);
    }, 600);
  };

  return (
    <>
      {/* Floating WhatsApp Trigger Button Container */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        {/* Hover "Chat With Us" Label */}
        <motion.div
          initial={{ opacity: 0, x: 10, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          className="group relative flex items-center"
        >
          <div className="hidden sm:flex items-center gap-2 rounded-full bg-card/95 border border-border px-3.5 py-1.5 shadow-xl backdrop-blur-md transition-all duration-300 group-hover:border-[#25D366]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#25D366]"></span>
            </span>
            <span className="font-mono text-xs uppercase tracking-wider text-foreground font-medium">
              Chat With Us
            </span>
          </div>

          {/* Trigger Button with Hover & Pulse Animations */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Open WhatsApp Enquiry Form"
            className="group relative flex items-center justify-center size-14 rounded-full bg-[#25D366] text-[#0d1a16] shadow-lg shadow-[#25D366]/25 transition-transform duration-300 hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 focus:ring-offset-background"
          >
            {/* Pulse Animation Rings */}
            <span
              className="absolute -inset-1.5 rounded-full bg-[#25D366]/40 animate-ping opacity-60 pointer-events-none"
              aria-hidden="true"
            />
            <span
              className="absolute -inset-1 rounded-full bg-[#25D366]/30 animate-pulse pointer-events-none"
              aria-hidden="true"
            />

            {/* Mobile Tooltip Label (on Hover) */}
            <span className="sm:hidden absolute right-full mr-3 whitespace-nowrap rounded-md bg-card border border-border px-2.5 py-1 text-xs font-mono font-medium text-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-md">
              Chat With Us
            </span>

            {/* Icon (WhatsApp / Message) */}
            {isOpen ? (
              <X className="size-6 text-[#0d1a16] relative z-10 transition-transform duration-200 rotate-0 hover:rotate-90" />
            ) : (
              <svg
                viewBox="0 0 24 24"
                className="size-7 fill-current relative z-10 transition-transform duration-300 group-hover:scale-105"
                aria-hidden="true"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.572-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.461c-1.84 0-3.647-.495-5.228-1.433l-.375-.223-3.886 1.02 1.037-3.789-.246-.391C2.396 15.429 1.8 13.526 1.8 11.534 1.8 6.167 6.167 1.8 11.534 1.8c2.599 0 5.043 1.013 6.88 2.852 1.838 1.838 2.851 4.281 2.851 6.882 0 5.367-4.367 9.734-9.734 9.734m0-17.734C6.056 4.109 1.6 8.565 1.6 14.043c0 2.113.551 4.177 1.597 5.99L1.4 23.6l3.687-.967c1.742.95 3.71 1.451 5.717 1.451 7.94 0 14.4-6.46 14.4-14.4 0-3.847-1.498-7.465-4.22-10.187C18.26 2.775 14.642 1.277 10.795 1.277z" />
              </svg>
            )}
          </button>
        </motion.div>
      </div>

      {/* Enquiry Form Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm"
              aria-hidden="true"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: [0.19, 1, 0.22, 1] }}
              className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-xl bg-card border border-border shadow-2xl p-6 sm:p-8 text-foreground z-10"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4 border-b border-border pb-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-full bg-[#25D366]/15 text-[#25D366]">
                    <MessageSquare className="size-5" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold tracking-tight text-foreground">
                      WhatsApp Project Enquiry
                    </h3>
                    <p className="font-mono text-xs uppercase text-muted-foreground tracking-wider mt-0.5">
                      Mackcode Web Studio
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                  aria-label="Close modal"
                >
                  <X className="size-5" />
                </button>
              </div>

              {isSubmitted ? (
                <div className="py-12 text-center flex flex-col items-center justify-center">
                  <CheckCircle2 className="size-16 text-[#25D366] mb-4 animate-bounce" />
                  <h4 className="font-heading text-2xl font-bold text-foreground">
                    Redirecting to WhatsApp...
                  </h4>
                  <p className="text-muted-foreground text-sm max-w-md mt-2">
                    Your enquiry details have been formatted. Opening WhatsApp so you can send your message directly to +91 7356743300.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {/* Customer Name */}
                    <div className="space-y-1.5">
                      <label htmlFor="customerName" className="font-mono text-xs uppercase tracking-wider text-muted-foreground font-medium block">
                        Customer Name <span className="text-destructive">*</span>
                      </label>
                      <input
                        type="text"
                        id="customerName"
                        name="customerName"
                        required
                        value={formData.customerName}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full bg-background border border-border rounded-lg px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-[#25D366] focus:ring-1 focus:ring-[#25D366] transition-colors"
                      />
                    </div>

                    {/* Business Name */}
                    <div className="space-y-1.5">
                      <label htmlFor="businessName" className="font-mono text-xs uppercase tracking-wider text-muted-foreground font-medium block">
                        Business Name <span className="text-destructive">*</span>
                      </label>
                      <input
                        type="text"
                        id="businessName"
                        name="businessName"
                        required
                        value={formData.businessName}
                        onChange={handleChange}
                        placeholder="Acme Co / Local Bakery"
                        className="w-full bg-background border border-border rounded-lg px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-[#25D366] focus:ring-1 focus:ring-[#25D366] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {/* Phone Number */}
                    <div className="space-y-1.5">
                      <label htmlFor="phone" className="font-mono text-xs uppercase tracking-wider text-muted-foreground font-medium block">
                        Phone Number <span className="text-destructive">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        className="w-full bg-background border border-border rounded-lg px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-[#25D366] focus:ring-1 focus:ring-[#25D366] transition-colors"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label htmlFor="email" className="font-mono text-xs uppercase tracking-wider text-muted-foreground font-medium block">
                        Email Address <span className="text-destructive">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="w-full bg-background border border-border rounded-lg px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-[#25D366] focus:ring-1 focus:ring-[#25D366] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {/* Website Type */}
                    <div className="space-y-1.5">
                      <label htmlFor="websiteType" className="font-mono text-xs uppercase tracking-wider text-muted-foreground font-medium block">
                        Website Type <span className="text-destructive">*</span>
                      </label>
                      <select
                        id="websiteType"
                        name="websiteType"
                        required
                        value={formData.websiteType}
                        onChange={handleChange}
                        className="w-full bg-background border border-border rounded-lg px-3.5 py-2.5 text-sm text-foreground focus:outline-none focus:border-[#25D366] focus:ring-1 focus:ring-[#25D366] transition-colors"
                      >
                        <option value="Local Business Website">Local Business Website</option>
                        <option value="E-Commerce Store">E-Commerce Store</option>
                        <option value="Portfolio / Landing Page">Portfolio / Landing Page</option>
                        <option value="Custom Web Application">Custom Web Application</option>
                        <option value="Website Redesign / Maintenance">Website Redesign / Maintenance</option>
                        <option value="Other / Custom Project">Other / Custom Project</option>
                      </select>
                    </div>

                    {/* Estimated Budget */}
                    <div className="space-y-1.5">
                      <label htmlFor="estimatedBudget" className="font-mono text-xs uppercase tracking-wider text-muted-foreground font-medium block">
                        Estimated Budget <span className="text-destructive">*</span>
                      </label>
                      <select
                        id="estimatedBudget"
                        name="estimatedBudget"
                        required
                        value={formData.estimatedBudget}
                        onChange={handleChange}
                        className="w-full bg-background border border-border rounded-lg px-3.5 py-2.5 text-sm text-foreground focus:outline-none focus:border-[#25D366] focus:ring-1 focus:ring-[#25D366] transition-colors"
                      >
                        <option value="Under $500">Under $500</option>
                        <option value="$500 - $1,000">$500 - $1,000</option>
                        <option value="$1,000 - $2,500">$1,000 - $2,500</option>
                        <option value="$2,500 - $5,000">$2,500 - $5,000</option>
                        <option value="$5,000+">$5,000+</option>
                        <option value="Flexible / To be discussed">Flexible / To be discussed</option>
                      </select>
                    </div>
                  </div>

                  {/* Project Description */}
                  <div className="space-y-1.5">
                    <label htmlFor="projectDescription" className="font-mono text-xs uppercase tracking-wider text-muted-foreground font-medium block">
                      Project Description <span className="text-destructive">*</span>
                    </label>
                    <textarea
                      id="projectDescription"
                      name="projectDescription"
                      required
                      rows={3}
                      value={formData.projectDescription}
                      onChange={handleChange}
                      placeholder="Tell us about your goals, features you need, reference sites, or timeline..."
                      className="w-full bg-background border border-border rounded-lg px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 resize-none focus:outline-none focus:border-[#25D366] focus:ring-1 focus:ring-[#25D366] transition-colors"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 rounded-lg bg-[#25D366] px-6 py-3.5 font-heading text-base font-bold text-[#0d1a16] shadow-lg shadow-[#25D366]/20 hover:bg-[#20ba5a] transition-all hover:shadow-[#25D366]/35 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-[#25D366]"
                    >
                      <Send className="size-5" />
                      <span>Send Enquiry via WhatsApp</span>
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
