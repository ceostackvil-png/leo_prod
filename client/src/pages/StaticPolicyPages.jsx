import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Truck, RotateCcw, HelpCircle, FileText, Lock } from 'lucide-react';
import StorefrontContainer from '../components/StorefrontContainer';

export const AboutUsPage = () => (
  <div className="min-h-screen bg-white py-8 sm:py-12">
    <StorefrontContainer>
      <div className="max-w-3xl mx-auto space-y-6 text-[#4A4D5E] text-xs sm:text-sm leading-relaxed">
        <div className="text-center pb-4 border-b border-gray-200">
          <span className="text-xs font-bold uppercase tracking-widest text-[#666875] block mb-1">OUR PHILOSOPHY</span>
          <h1 className="text-2xl sm:text-3xl font-bold uppercase text-[#212121]">About LEO Men's Wear</h1>
        </div>

        <p>
          Founded in 2024, <strong>LEO</strong> is built around a singular mission: engineering comfortable, durable, and style-forward Men's fashion staples that elevate everyday streetwear.
        </p>

        <h3 className="text-sm sm:text-base font-bold uppercase text-[#212121] pt-2">The 240 GSM Difference</h3>
        <p>
          While standard fast-fashion tees warp and lose shape after a single cycle in the wash, our flagship Oversized Tees are woven from premium 240 GSM combed cotton with high-density bio-washing. The result is a substantial, structured drape that maintains its clean boxy silhouette year-round.
        </p>

        <h3 className="text-sm sm:text-base font-bold uppercase text-[#212121] pt-2">Zero Fast-Fashion Compromises</h3>
        <p>
          From Air-Flex 4-way stretch cargo joggers to 380 GSM fleece hoodies, every garment is double-stitched, pre-shrunk, and engineered for the modern man on the move.
        </p>
      </div>
    </StorefrontContainer>
  </div>
);

export const ShippingPolicyPage = () => (
  <div className="min-h-screen bg-white py-8 sm:py-12">
    <StorefrontContainer>
      <div className="max-w-3xl mx-auto space-y-6 text-[#4A4D5E] text-xs sm:text-sm leading-relaxed">
        <div className="text-center pb-4 border-b border-gray-200">
          <Truck className="w-8 h-8 text-[#282C3F] mx-auto mb-2" />
          <h1 className="text-2xl sm:text-3xl font-bold uppercase text-[#212121]">Shipping & Delivery Policy</h1>
        </div>

        <div className="p-4 bg-[#F7F8FA] rounded-lg border border-gray-200">
          <p className="font-bold text-[#212121]">Key Highlights:</p>
          <ul className="list-disc pl-5 space-y-1 mt-1">
            <li><strong>FREE Express Shipping</strong> on all prepaid & COD orders above ₹799.</li>
            <li>Standard delivery fee of ₹99 applies to orders under ₹799.</li>
            <li>Orders are processed within 24-48 business hours from our Bengaluru warehouse.</li>
          </ul>
        </div>

        <h3 className="text-sm sm:text-base font-bold uppercase text-[#212121]">Delivery Timelines</h3>
        <p>
          • Metro Cities (Bengaluru, Mumbai, Delhi-NCR, Hyderabad, Chennai, Kolkata): <strong>2 - 4 Business Days</strong>.<br />
          • Rest of India: <strong>4 - 7 Business Days</strong>.
        </p>
      </div>
    </StorefrontContainer>
  </div>
);

export const ReturnsPolicyPage = () => (
  <div className="min-h-screen bg-white py-8 sm:py-12">
    <StorefrontContainer>
      <div className="max-w-3xl mx-auto space-y-6 text-[#4A4D5E] text-xs sm:text-sm leading-relaxed">
        <div className="text-center pb-4 border-b border-gray-200">
          <RotateCcw className="w-8 h-8 text-[#282C3F] mx-auto mb-2" />
          <h1 className="text-2xl sm:text-3xl font-bold uppercase text-[#212121]">7-Day Returns & Exchanges</h1>
        </div>

        <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200 text-emerald-900">
          <p className="font-bold">100% Refund Guarantee</p>
          <p className="text-xs mt-1">
            If you don't love the fit, fabric, or finish of your LEO garment, exchange it for another size or get a full refund within 7 days of delivery.
          </p>
        </div>

        <h3 className="text-sm sm:text-base font-bold uppercase text-[#212121]">Return Guidelines</h3>
        <p>
          1. Items must be unworn, unwashed, with all original tags attached.<br />
          2. Doorstep reverse pickup is arranged free of charge in over 19,000 pincodes across India.<br />
          3. Refunds are credited to the original payment method or bank account within 48 hours of inspection.
        </p>
      </div>
    </StorefrontContainer>
  </div>
);

export const FaqPage = () => {
  const faqs = [
    { q: "What is the fit of LEO Oversized T-Shirts?", a: "Our Oversized Tees feature an engineered drop-shoulder boxy fit. Order your standard true size for the intended relaxed streetwear drape." },
    { q: "How do I track my shipment?", a: "You can track your package live anytime on our Track Order page using your 8-character LEO Order ID." },
    { q: "Is Cash on Delivery (COD) available?", a: "Yes, COD is available for almost all serviceable pincodes across India without any hidden convenience surcharge." },
    { q: "What is your return/exchange window?", a: "We provide a 7-day doorstep return and size exchange policy on all Men's apparel." }
  ];

  return (
    <div className="min-h-screen bg-white py-8 sm:py-12">
      <StorefrontContainer>
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center pb-4 border-b border-gray-200">
            <HelpCircle className="w-8 h-8 text-[#282C3F] mx-auto mb-2" />
            <h1 className="text-2xl sm:text-3xl font-bold uppercase text-[#212121]">Frequently Asked Questions</h1>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="p-5 bg-[#F7F8FA] rounded-xl border border-gray-200">
                <h3 className="text-xs sm:text-sm font-bold text-[#212121] mb-1.5">{faq.q}</h3>
                <p className="text-xs text-[#4A4D5E] leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </StorefrontContainer>
    </div>
  );
};

export const PrivacyPolicyPage = () => (
  <div className="min-h-screen bg-white py-8 sm:py-12">
    <StorefrontContainer>
      <div className="max-w-3xl mx-auto space-y-6 text-[#4A4D5E] text-xs sm:text-sm leading-relaxed">
        <div className="text-center pb-4 border-b border-gray-200">
          <Lock className="w-8 h-8 text-[#282C3F] mx-auto mb-2" />
          <h1 className="text-2xl sm:text-3xl font-bold uppercase text-[#212121]">Privacy Policy</h1>
        </div>
        <p>
          LEO Apparel values your privacy. We collect personal details strictly to process orders, facilitate doorstep delivery, and provide personalized support. We never sell or share your data with unauthorized third parties.
        </p>
      </div>
    </StorefrontContainer>
  </div>
);

export const TermsOfServicePage = () => (
  <div className="min-h-screen bg-white py-8 sm:py-12">
    <StorefrontContainer>
      <div className="max-w-3xl mx-auto space-y-6 text-[#4A4D5E] text-xs sm:text-sm leading-relaxed">
        <div className="text-center pb-4 border-b border-gray-200">
          <FileText className="w-8 h-8 text-[#282C3F] mx-auto mb-2" />
          <h1 className="text-2xl sm:text-3xl font-bold uppercase text-[#212121]">Terms of Service</h1>
        </div>
        <p>
          By accessing and placing orders on LEO Men's Wear (leo.com / localhost:3000), you agree to our standard terms of purchase, billing, return timelines, and intellectual property conditions.
        </p>
      </div>
    </StorefrontContainer>
  </div>
);
