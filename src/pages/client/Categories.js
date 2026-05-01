import React from 'react';
import { Link as ReactLink } from 'react-router-dom';
import { ChevronRight, TrendingUp, Zap, Flame, Star, ShieldCheck } from 'lucide-react';
import ClientLayout from '../../layouts/ClientLayout';
import { Container } from '../../components/Ui/Layout';
import { SectionTitle } from '../../components/Ui/Typography';
import { Card } from '../../components/Ui/Card';

const CategoriesPage = () => {
  const categories = [
    { 
      name: 'Construction Materials', 
      url: '/category/construction', 
      icon: <TrendingUp className="text-primary" />,
      description: 'Cement, bricks, steel bars, and more'
    },
    { 
      name: 'Plumbing Materials', 
      url: '/category/plumbing', 
      icon: <Zap className="text-orange-500" />,
      description: 'Pipes, fittings, valves, and bathroom fixtures'
    },
    { 
      name: 'Electrical Materials', 
      url: '/category/electrical', 
      icon: <Flame className="text-accent" />,
      description: 'Wiring, switches, lighting, and solar panels'
    },
    { 
      name: 'Interior Design', 
      url: '/category/interior', 
      icon: <Star className="text-yellow-500" />,
      description: 'Tiles, gypsum, and decorative elements'
    },
    { 
      name: 'Painting & Deco', 
      url: '/category/painting', 
      icon: <ShieldCheck className="text-emerald-500" />,
      description: 'Premium paints, brushes, and wall finishes'
    },
  ];

  return (
    <ClientLayout>
      <div className="bg-slate-50 py-16">
        <Container>
          <SectionTitle 
            title="Browse All Categories" 
            subtitle="Find everything you need for your construction and renovation projects."
            className="mb-12"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <ReactLink key={cat.name} to={cat.url}>
                <Card className="p-8 h-full hover:border-primary transition-all group">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-slate-100 rounded-2xl group-hover:bg-primary/10 transition-colors">
                      {React.cloneElement(cat.icon, { size: 32 })}
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-black text-secondary group-hover:text-primary transition-colors">
                          {cat.name}
                        </h3>
                        <ChevronRight className="text-slate-300 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                      </div>
                      <p className="text-slate-500 text-sm">
                        {cat.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </ReactLink>
            ))}
          </div>
        </Container>
      </div>
    </ClientLayout>
  );
};

export default CategoriesPage;
