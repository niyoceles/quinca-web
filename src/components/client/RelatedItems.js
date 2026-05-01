import React from 'react';
import { Container } from '../Ui/Layout';
import { SectionTitle } from '../Ui/Typography';
import { ProductCard } from '../Ui/ProductCard';
import { ProductSkeleton } from '../Ui/SkeletonLoader';
import DialogQuantity from './DialogQuantity';

const RelatedItems = (props) => {
  return (
    <div className="bg-slate-50 py-10 border-t border-slate-100">
      <DialogQuantity
        open={props.setDialog}
        close={props.closeDialog}
        addcart={props.addItemCart}
        selected={props.selected}
      />
      
      <Container>
        <SectionTitle 
          title="Related Materials & Tools" 
          subtitle="Other customers also viewed these items for their construction projects."
          className="mb-8"
        />
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {props.items !== undefined ? (
            props.items && props.items.map(card => (
              <ProductCard 
                key={card.id} 
                {...card} 
                onAdd={() => props.openDialog(card)}
              />
            ))
          ) : (
            Array(5).fill(0).map((_, i) => <ProductSkeleton key={i} />)
          )}
        </div>
      </Container>
    </div>
  );
};

export default RelatedItems;
