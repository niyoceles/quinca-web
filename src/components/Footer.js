import React from 'react';
import { SocialIcon } from 'react-social-icons';
import { 
  ShieldCheck, 
  CreditCard, 
  Headphones, 
  Truck,
  ExternalLink,
  Globe
} from 'lucide-react';
import { Container, Grid, Divider, Box } from './Ui/Layout';
import { Typography } from './Ui/Typography';

import secureImage from '../assets/images/secure.svg';
import paymentImage from '../assets/images/payment.svg';
import helpImage from '../assets/images/help.svg';
import deliverImage from '../assets/images/delivery.svg';
import momoImage from '../assets/images/mtnmomo.png';
import masterCard from '../assets/images/mastercard.svg';
import visaImage from '../assets/images/visa.svg';
import Hadiwa_logo from '../assets/images/hadiwa-logo.png';

const FooterFeature = ({ icon: Icon, title, description, image }) => (
  <div className="flex flex-col items-center text-center p-3 group">
    <div className="mb-3 p-2.5 bg-slate-700/30 rounded-full group-hover:bg-primary/20 transition-colors duration-300">
      {image ? (
        <img src={image} alt={title} className="w-10 h-10 object-contain" />
      ) : (
        <Icon className="w-7 h-7 text-primary" />
      )}
    </div>
    <h3 className="text-white font-bold text-sm mb-1">{title}</h3>
    <p className="text-slate-400 text-[11px] leading-snug">{description}</p>
  </div>
);

const FooterLink = ({ href, children }) => (
  <a 
    href={href} 
    className="block text-slate-300 hover:text-primary transition-colors duration-200 text-xs mb-1.5"
  >
    {children}
  </a>
);

const Footer = () => {
  const categories = [
    { name: 'All Categories', url: '/categories' },
    { name: 'Construction materials', url: '/category/construction' },
    { name: 'Plumbing materials', url: '/category/plumbing' },
    { name: 'Electrical materials', url: '/category/electrical' },
  ];

  const social = [
    { name: 'Facebook', url: 'https://www.facebook.com/Quinca-paradi-100217132135489' },
    { name: 'Instagram', url: 'https://www.instagram.com/quincaparadi/' },
    { name: 'Twitter', url: 'https://twitter.com/QuincaParadi' },
  ];

  return (
    <footer className="bg-secondary pt-10 pb-6 mt-8 overflow-hidden border-t border-slate-700">
      <Container>
        {/* Features Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          <FooterFeature 
            image={secureImage}
            title="100% Secure Payments"
            description="Pay with the world's most popular and secure payment methods"
          />
          <FooterFeature 
            image={paymentImage}
            title="Trust Pay"
            description="100% Payment Protection. Easy Return Policy"
          />
          <FooterFeature 
            image={helpImage}
            title="Help 24/7"
            description="Got a question? We're here to help around the clock"
          />
          <FooterFeature 
            image={deliverImage}
            title="Delivery"
            description="Fast and secure delivery service to your doorstep"
          />
        </div>

        <Divider className="border-slate-700 my-0" />

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-8">
          {/* About Section */}
          <div className="space-y-4">
            <img src={Hadiwa_logo} alt="Hadiwa" className="h-24 w-auto" />
            <p className="text-slate-400 text-xs leading-relaxed">
              Hadiwa is a premium e-commerce platform by PARADI-BOUNTY Co. LTD. 
              We specialize in high-quality construction materials and tools distribution.
              <span className="block mt-2 font-medium text-slate-300">CC/TIN/VAT 111707849</span>
            </p>
          </div>

          {/* Categories Section */}
          <div>
            <h4 className="text-white font-bold text-base mb-4 flex items-center gap-2">
              Browse Categories
            </h4>
            <div className="flex flex-col">
              {categories.map((cat) => (
                <FooterLink key={cat.name} href={cat.url}>{cat.name}</FooterLink>
              ))}
            </div>
          </div>

          {/* Company Section */}
          <div>
            <h4 className="text-white font-bold text-base mb-4">Company</h4>
            <div className="flex flex-col">
              <FooterLink href="/contact-us">Contact Us</FooterLink>
              <FooterLink href="/about-us">About Us</FooterLink>
              <FooterLink href="/terms-and-conditions">Terms & Conditions</FooterLink>
              <FooterLink href="/privacy-policy">Privacy Policy</FooterLink>
            </div>
          </div>

          {/* Connected & Payment Section */}
          <div>
            <h4 className="text-white font-bold text-base mb-4">Stay Connected</h4>
            <div className="flex gap-3 mb-6">
              {social.map((s) => (
                <SocialIcon 
                  key={s.name} 
                  url={s.url} 
                  target="_blank"
                  fgColor="#ffffff"
                  bgColor="transparent"
                  className="hover:scale-110 transition-transform bg-slate-700/50 rounded-full"
                  style={{ height: 32, width: 32 }}
                />
              ))}
            </div>

            <h4 className="text-white font-bold text-sm mb-3">Payment Methods</h4>
            <div className="flex flex-wrap gap-3 items-center">
              <img src={momoImage} alt="MTN MoMo" className="h-6 w-auto grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all" />
              <img src={visaImage} alt="Visa" className="h-4 w-auto grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all" />
              <img src={masterCard} alt="MasterCard" className="h-6 w-auto grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all" />
            </div>
          </div>
        </div>

        <Divider className="border-slate-700 mt-0" />

        {/* Bottom Bar */}
        <div className="py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-[11px] font-medium">
          <p>© {new Date().getFullYear()} Hadiwa. All Rights Reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary transition-colors">Cookies</a>
            <a href="#" className="hover:text-primary transition-colors">Accessibility</a>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
