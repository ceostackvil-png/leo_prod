import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Youtube, Twitter } from 'lucide-react';
import StorefrontContainer from './StorefrontContainer';

const Footer = () => {
  return (
    <footer className="bg-[#282C3F] text-white select-none pb-16 lg:pb-0">
      {/* Main Footer Grid */}
      <div className="py-10 lg:py-16">
        <StorefrontContainer>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
            
            {/* Col 1: Brand & App */}
            <div className="col-span-2 lg:col-span-2 space-y-4">
              <Link to="/" className="inline-block bg-white/90 px-3 py-1.5 rounded-lg shadow-sm">
                <img
                  src="/images/logo (1).png"
                  alt="LEO"
                  className="h-9 w-auto object-contain"
                />
              </Link>
              <p className="text-xs text-gray-300 max-w-sm leading-relaxed">
                LEO is India's premium Men's everyday fashion brand built for effortless style and all-day comfort. Specializing in 240 GSM heavyweight tees, air-flex travel joggers, and premium co-ord sets.
              </p>

              {/* Social Links */}
              <div className="flex items-center space-x-3 pt-2">
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors" aria-label="Instagram">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors" aria-label="Facebook">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors" aria-label="YouTube">
                  <Youtube className="w-4 h-4" />
                </a>
                <a href="https://x.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors" aria-label="Twitter">
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Col 2: Categories (100% Men's Wear) */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3.5">
                Men's Wear
              </h4>
              <ul className="space-y-2 text-xs text-gray-300">
                <li><Link to="/men" className="hover:text-white transition-colors">All Men's Clothing</Link></li>
                <li><Link to="/new-arrivals" className="hover:text-white transition-colors">New Arrivals</Link></li>
                <li><Link to="/oversized-tees" className="hover:text-white transition-colors">Oversized Tees</Link></li>
                <li><Link to="/t-shirts" className="hover:text-white transition-colors">T-Shirts</Link></li>
                <li><Link to="/polos" className="hover:text-white transition-colors">Polos</Link></li>
                <li><Link to="/shirts" className="hover:text-white transition-colors">Shirts</Link></li>
                <li><Link to="/hoodies" className="hover:text-white transition-colors">Hoodies</Link></li>
                <li><Link to="/joggers" className="hover:text-white transition-colors">Joggers & Pants</Link></li>
                <li><Link to="/shorts" className="hover:text-white transition-colors">Shorts</Link></li>
                <li><Link to="/jackets" className="hover:text-white transition-colors">Jackets</Link></li>
                <li><Link to="/co-ords" className="hover:text-white transition-colors">Co-Ords</Link></li>
                <li><Link to="/travel" className="hover:text-white transition-colors">Travel Essentials</Link></li>
                <li><Link to="/sale" className="hover:text-amber-300 text-amber-400 font-semibold transition-colors">Sale</Link></li>
              </ul>
            </div>

            {/* Col 3: Customer Care */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3.5">
                Customer Care
              </h4>
              <ul className="space-y-2 text-xs text-gray-300">
                <li><Link to="/track-order" className="hover:text-white transition-colors">Track Order</Link></li>
                <li><Link to="/returns" className="hover:text-white transition-colors">Return / Exchange</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link to="/reviews" className="hover:text-white transition-colors">Customer Reviews</Link></li>
                <li><Link to="/faq" className="hover:text-white transition-colors">FAQs</Link></li>
                <li><Link to="/admin" className="text-amber-300 hover:text-amber-200 font-semibold block pt-1">Admin Portal</Link></li>
              </ul>
            </div>

            {/* Col 4: Policies & Info */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3.5">
                Policies & Info
              </h4>
              <ul className="space-y-2 text-xs text-gray-300">
                <li><Link to="/about-us" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/shipping" className="hover:text-white transition-colors">Shipping Policy</Link></li>
                <li><Link to="/returns" className="hover:text-white transition-colors">Return Policy</Link></li>
                <li><Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link></li>
              </ul>
            </div>

          </div>
        </StorefrontContainer>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-5 text-center text-xs text-gray-300">
        <StorefrontContainer>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p>© {new Date().getFullYear()} LEO Men's Wear. All Rights Reserved.</p>
            <div className="flex items-center gap-2 text-[11px] text-gray-300">
              <span className="bg-white/10 px-2 py-0.5 rounded">UPI</span>
              <span className="bg-white/10 px-2 py-0.5 rounded">VISA</span>
              <span className="bg-white/10 px-2 py-0.5 rounded">MASTERCARD</span>
              <span className="bg-white/10 px-2 py-0.5 rounded">NET BANKING</span>
              <span className="bg-white/10 px-2 py-0.5 rounded">COD</span>
            </div>
          </div>
        </StorefrontContainer>
      </div>
    </footer>
  );
};

export default Footer;
