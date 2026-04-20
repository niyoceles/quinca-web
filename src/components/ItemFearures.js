import React from 'react';
import { Card } from './Ui/Card';
import { Typography } from './Ui/Typography';
import Button from './Ui/Button';
import { Share2, ExternalLink, Box } from 'lucide-react';
import DummyImage from '../images/image.PNG';

export default function ItemFeatures() {
  const dummyItems = [
    {
      id: 1,
      title: 'Structural Steel',
      description: 'High-grade reinforced structural steel for major construction projects and frameworks.',
      image: DummyImage
    },
    {
      id: 2,
      title: 'Premium Concrete',
      description: 'Quick-dry, high-strength concrete mix suitable for foundations and heavy-duty pavements.',
      image: DummyImage
    },
    {
      id: 3,
      title: 'Insulation Panels',
      description: 'Thermal-efficient insulation panels designed for sustainable building and climate control.',
      image: DummyImage
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {dummyItems.map((item) => (
        <Card key={item.id} className="border-none shadow-premium rounded-[2.5rem] bg-white overflow-hidden group">
          <div className="relative h-48 overflow-hidden">
            <img 
              src={item.image} 
              alt={item.title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
            />
            <div className="absolute top-4 left-4">
              <div className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-secondary shadow-sm">
                Featured Material
              </div>
            </div>
          </div>
          
          <div className="p-8 space-y-4">
            <div className="space-y-2">
              <Typography variant="h4" className="text-secondary group-hover:text-primary transition-colors">
                {item.title}
              </Typography>
              <p className="text-xs font-medium text-slate-400 leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="pt-4 flex items-center justify-between border-t border-slate-50">
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="sm" className="rounded-xl w-10 h-10 p-0 text-slate-400 hover:text-primary">
                  <Share2 size={16} />
                </Button>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="rounded-xl font-black border-slate-100/50 hover:border-primary/20 text-slate-400 hover:text-primary"
                icon={ExternalLink}
              >
                Learn More
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
