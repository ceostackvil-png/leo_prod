import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';
import StorefrontContainer from '../components/StorefrontContainer';

const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white py-8 sm:py-12">
      <StorefrontContainer>
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#666875] block mb-1">
            CUSTOMER SUPPORT
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold uppercase text-[#1A1E31]">
            Contact Us
          </h1>
          <p className="text-xs sm:text-sm text-[#666875] mt-1">
            Have questions about sizing, delivery, or returns? Our support team is here to assist you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
          
          {/* Info cards */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-5 bg-[#F7F8FA] rounded-xl border border-gray-200 space-y-3">
              <h3 className="text-sm font-bold uppercase text-[#1A1E31] border-b border-gray-200 pb-2">
                Help Desk & Care
              </h3>

              <div className="flex items-start gap-3 text-xs">
                <Mail className="w-4 h-4 text-[#242F66] mt-0.5 shrink-0" />
                <div>
                  <p className="font-bold text-[#1A1E31]">Email Support</p>
                  <p className="text-[#666875]">support@leo.com</p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs">
                <Phone className="w-4 h-4 text-[#242F66] mt-0.5 shrink-0" />
                <div>
                  <p className="font-bold text-[#1A1E31]">Customer Helpline</p>
                  <p className="text-[#666875]">+91 (800) 536-2772</p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs">
                <Clock className="w-4 h-4 text-[#242F66] mt-0.5 shrink-0" />
                <div>
                  <p className="font-bold text-[#1A1E31]">Working Hours</p>
                  <p className="text-[#666875]">Monday – Saturday: 9:00 AM – 8:00 PM IST</p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs">
                <MapPin className="w-4 h-4 text-[#242F66] mt-0.5 shrink-0" />
                <div>
                  <p className="font-bold text-[#1A1E31]">Headquarters</p>
                  <p className="text-[#666875]">LEO Apparel Pvt Ltd, Indiranagar, Bengaluru, Karnataka 560038</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7 bg-[#F7F8FA] p-6 rounded-xl border border-gray-200">
            {submitted ? (
              <div className="text-center py-10 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="text-lg font-bold text-[#1A1E31]">Message Sent Successfully</h3>
                <p className="text-xs text-[#666875] max-w-sm mx-auto">
                  Thank you for reaching out. A customer support specialist will respond within 2-4 business hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="bg-[#242F66] text-white text-xs font-bold px-5 py-2 rounded-md uppercase"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-sm font-bold uppercase text-[#1A1E31] mb-2">
                  Send a Message
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase text-[#1A1E31] mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-xs font-medium focus:outline-none focus:border-[#242F66]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-[#1A1E31] mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-xs font-medium focus:outline-none focus:border-[#242F66]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-[#1A1E31] mb-1">Subject</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Order Inquiry / Size Exchange"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-xs font-medium focus:outline-none focus:border-[#242F66]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-[#1A1E31] mb-1">Message</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe how we can help you..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-xs font-medium focus:outline-none focus:border-[#242F66]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#242F66] hover:bg-[#1A1E31] text-white py-3 rounded-md text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Send className="w-3.5 h-3.5" /> Submit Request
                </button>
              </form>
            )}
          </div>

        </div>
      </StorefrontContainer>
    </div>
  );
};

export default ContactPage;
