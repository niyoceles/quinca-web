import React from 'react';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import { CreditCard } from 'lucide-react';
import Button from '../Ui/Button';

const {
    REACT_APP_FLUTTERWAVE_PUBLIC_KEY
} = process.env;

const MakePayment = (props) => {
    const config = {
        public_key: `${REACT_APP_FLUTTERWAVE_PUBLIC_KEY}`,
        tx_ref: Date.now(),
        amount: props.totalPrice,
        currency: 'RWF',
        payment_options: 'card,mobilemoney',
        customer: {
            email: 'user@gmail.com',
            phonenumber: '07064586146',
            name: 'User',
        },
        customizations: {
            title: 'Make your payment at Hadiwa',
            description: 'Payment for items in cart',
            logo: 'https://res.cloudinary.com/dfsai53mw1/image/upload/v1613415905/QUINCAPARADI/mstile-150x150_whtq6d.png',
        },
    };

    const handleFlutterPayment = useFlutterwave(config);

    return (
        <div className="w-full">
            <Button
                variant="primary"
                className="w-full rounded-[1.5rem] py-5 font-black shadow-premium active:scale-[0.98] transition-all"
                icon={CreditCard}
                onClick={() => {
                    handleFlutterPayment({
                        callback: response => {
                            closePaymentModal();
                        },
                        onClose: () => { },
                    });
                }}
            >
                Confirm & Pay Now
            </Button>
        </div>
    );
};

export default MakePayment;