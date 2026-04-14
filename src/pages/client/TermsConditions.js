import React from 'react';
import { Shield, Gavel, Handshake, Info, ArrowRight, Scale } from 'lucide-react';
import { Container, Divider } from '../../components/Ui/Layout';
import { Typography } from '../../components/Ui/Typography';
import { Card } from '../../components/Ui/Card';
import ClientLayout from '../../layouts/ClientLayout';
import Button from '../../components/Ui/Button';

const CheckCircle2 = ({ size, className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="m9 11 3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
  </svg>
);

const terms = [
  {
    id: 1,
    title: 'Account Security',
    content: 'To use Hadiwa, you will be required to provide us with personal information of which you have to always keep confidential for your information’s security sake. In case you get worried about your information’s security, kindly alert us right away.',
    icon: Shield
  },
  {
    id: 2,
    title: 'Product Integrity',
    content: 'Nature, quality and quantity of products are clearly described in the product list to ensure customer satisfaction.',
    icon: Scale
  },
  {
    id: 3,
    title: 'Delivery Reports',
    content: 'If a product is delivered to you in conditions contrary to those described in the product list, report to us immediately.',
    icon: ArrowRight
  },
  {
    id: 4,
    title: 'Transparent Pricing',
    content: 'The price of a product is as stated in the relevant product listing. The price listed will locally include the taxes and will be complying with the laws currently in force.',
    icon: Info
  },
  {
    id: 5,
    title: 'Auxiliary Costs',
    content: 'Other auxiliary costs and charges such as delivery charges, packaging charges, handling charges, administrative charges, and insurance costs will only be paid by the buyer only if they are mentioned in the product listing.',
    icon: Handshake
  },
  {
    id: 6,
    title: 'Secure Payments',
    content: 'Payments are made via cards or mobile money transfer on our platform, any transaction made outside our system is not considered in our transactions.',
    icon: Shield
  },
  {
    id: 7,
    title: 'Currency',
    content: 'The payment will be made in the currency of Rwandan Francs or dollars.',
    icon: Info
  },
  {
    id: 8,
    title: 'Returns & Refunds',
    content: 'Returns and refunds will only be made on damaged goods, less or excess goods, and poor quality goods. Returns and refunds will be done in respect of the product price, and this will be communicated to us immediately after the arrival of goods.',
    icon: Gavel
  },
  {
    id: 9,
    title: 'Content Authenticity',
    content: 'Your content, this is to mean all materials including videos, audios, audio-visuals, graphics, text, images, scripts and software which you submit to us to communication and other business-related purposes, must be complete, accurate, and authentic.',
    icon: Info
  },
  {
    id: 10,
    title: 'Etiquette',
    content: 'The content must abide with generally accepted standards of etiquette and behavior on the internet.',
    icon: Handshake
  },
  {
    id: 11,
    title: 'Safety Standards',
    content: 'The content must not be a subject to any kind of offense, racial segregation, sexual assault, hatred, violence and menace.',
    icon: Shield
  },
  {
    id: 12,
    title: 'Intellectual Property',
    content: 'The content must be fully yours, thus raising no concerns about counterfeit and piracy. If you decide to use others’ content, you must always give credits to whom they are due.',
    icon: Gavel
  },
  {
    id: 13,
    title: 'Business Rights',
    content: 'By submitting your content to us, you grant us full rights to use it for business-related purposes with no further payments.',
    icon: CheckCircle2
  },
  {
    id: 14,
    title: 'Media Distribution',
    content: 'By submitting your content to us, you grant us full rights to use, reproduce, store, adapt, publish, translate and distribute your content across our marketing channels and any existing or future media.',
    icon: ArrowRight
  },
];


export default function TermsConditions() {
  return (
    <ClientLayout>
      <main className="bg-slate-50 min-h-screen pb-24">
        {/* Hero Section */}
        <div className="bg-secondary py-24 relative overflow-hidden text-center">
          <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <Container className="relative z-10 space-y-4">
            <Typography variant="h1" className="text-white">
              Terms & <span className="text-primary italic">Conditions</span>
            </Typography>
            <p className="text-slate-400 font-medium max-w-2xl mx-auto">
              Please read these terms carefully before using Hadiwa. By using our platform as either a buyer or a seller, you agree to these guiding principles.
            </p>
          </Container>
        </div>

        <Container className="-mt-12">
          <Card className="p-10 md:p-16 border-none shadow-premium bg-white rounded-[2.5rem] relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row gap-8 items-start mb-16 pb-8 border-b border-slate-50">
                <div className="w-16 h-16 bg-primary/10 rounded-3xl flex items-center justify-center text-primary flex-shrink-0 animate-pulse">
                  <Handshake size={32} />
                </div>
                <div className="space-y-4">
                  <Typography variant="h3" className="text-secondary leading-tight">Platform Master Agreement</Typography>
                  <p className="text-slate-500 font-medium leading-relaxed italic">
                    "All transactions and services on this platform are served and managed by PARADI-BOUNTY Co. LTD, the legal owner of Hadiwa."
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
                {terms.map((term) => (
                  <div key={term.id} className="group space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-secondary group-hover:text-white transition-all duration-300">
                        <term.icon size={18} />
                      </div>
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Clause {term.id.toString().padStart(2, '0')}</p>
                    </div>
                    <div className="space-y-2 pl-2 border-l-2 border-slate-50 group-hover:border-primary transition-colors">
                      <Typography variant="h4" className="text-secondary tracking-tight group-hover:text-primary transition-colors">
                        {term.title}
                      </Typography>
                      <p className="text-sm text-slate-500 font-medium leading-relaxed">
                        {term.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <Divider className="my-16 border-slate-50" />
              
              <div className="bg-slate-900 rounded-[2rem] p-8 md:p-12 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
                <div className="flex flex-col md:flex-row items-center gap-8 justify-between relative z-10 text-center md:text-left">
                  <div className="space-y-2">
                    <Typography variant="h3" className="text-white">Questions about these terms?</Typography>
                    <p className="text-slate-400 text-sm font-medium">Our legal and support team is available to clarify any points of this agreement.</p>
                  </div>
                  <Button variant="primary" className="rounded-2xl h-14 px-10 font-bold shadow-2xl" onClick={() => window.location.href='/contact-us'}>
                    Contact Legal Support
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </Container>
      </main>
    </ClientLayout>
  );
}
