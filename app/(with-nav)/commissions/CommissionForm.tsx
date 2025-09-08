"use client";

import { useState } from "react";

export default function CommissionForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    description: "",
    additionalNotes: "",
    termsAccepted: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [showSuccess, setShowSuccess] = useState(false);

  // Check if all required fields are filled (excluding additionalNotes)
  const isFormValid = formData.name.trim() !== "" && 
                     formData.email.trim() !== "" && 
                     formData.phone.trim() !== "" && 
                     formData.description.trim() !== "" &&
                     formData.termsAccepted;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/commissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setShowSuccess(true);
        
        // Reset success state and clear form after 3 seconds
        setTimeout(() => {
          setShowSuccess(false);
          setFormData({ 
            name: "", 
            email: "", 
            phone: "", 
            description: "", 
            additionalNotes: "",
            termsAccepted: false
          });
        }, 3000);
        
        // Track commission request submission
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'commission_request', {
            event_category: 'engagement',
            event_label: 'commission_request'
          });
        }
      } else {
        setSubmitStatus("error");
        console.error('Commission form error:', result.error);
      }
    } catch (error) {
      console.error('Commission form submission failed:', error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? (target as HTMLInputElement).checked : target.value;
    setFormData(prev => ({
      ...prev,
      [target.name]: value
    }));
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-3xl font-semibold text-gray-900 mb-6">Request Your Commission</h2>
        <p className="text-lg text-purple-400 mb-6 rounded-lg p-4">
          Tell me your dream piece. I'll reply with a quote and timeline within 1-2 business days.
        </p>
      
      {submitStatus === "error" && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800">Something went wrong. Please try again.</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 transition-all duration-200 hover:border-purple-300 hover:shadow-md"
            placeholder="Your name"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 transition-all duration-200 hover:border-purple-300 hover:shadow-md"
            placeholder="your.email@example.com"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 transition-all duration-200 hover:border-purple-300 hover:shadow-md"
            placeholder="(555) 123-4567"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Project Description *
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={5}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none text-gray-900 transition-all duration-200 hover:border-purple-300 hover:shadow-md"
            placeholder="Describe your vision, size preferences, project type (pet memorial, pet portrait, custom gloomie, etc.), mood, and any specific details..."
          />
        </div>

        <div>
          <label htmlFor="additionalNotes" className="block text-sm font-medium text-gray-700 mb-2">
            Additional Notes
          </label>
          <textarea
            id="additionalNotes"
            name="additionalNotes"
            value={formData.additionalNotes}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none text-gray-900 transition-all duration-200 hover:border-purple-300 hover:shadow-md"
            placeholder="Any other details, requirements, or questions you have..."
          />
        </div>

        <div>
          <label className="flex items-start space-x-3 cursor-pointer">
            <input
              type="checkbox"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleChange}
              required
              className="mt-1 h-4 w-4 text-[#8A6D9B] border-gray-300 rounded focus:ring-[#8A6D9B] focus:ring-2"
            />
            <span className="text-sm text-gray-700">
              I understand that this is a request, not a final booking. I will receive a quote and timeline to approve.
            </span>
          </label>
        </div>

        <p className="text-xs text-gray-500 text-center">
          Your information is private and never shared.
        </p>

        <button
          type="submit"
          disabled={isSubmitting || (!isFormValid && !showSuccess)}
          className={`w-full rounded-lg px-4 py-3 border-1 border-white text-white font-medium transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed button-font ${
            showSuccess 
              ? "bg-green-600 cursor-default shadow-lg" 
              : "bg-[#8A6D9B] hover:bg-[#8A6D9B]/90"
          }`}
        >
          {showSuccess ? "Request Submitted!" : isSubmitting ? "Sending Request..." : "Submit Commission Request"}
        </button>
      </form>
    </div>
  );
}