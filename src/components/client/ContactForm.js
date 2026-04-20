import React, {
    useState
} from 'react';
import {
    useDispatch,
    useSelector
} from 'react-redux';
import {
    Send,
    User,
    Mail,
    MessageSquare,
    Tag,
    AlertCircle
} from 'lucide-react';
import {
    sendContactEmail
} from '../../redux/actions';
import Button from '../Ui/Button';
import Input from '../Ui/Input';
import {
    Typography
} from '../Ui/Typography';

const ContactForm = () => {
    const [validated, setValidated] = useState(false);
    const [user, setUser] = useState({
        names: '',
        email: '',
        subject: '',
        message: '',
    });

    const loading = useSelector(state => state.contact.contactData);
    const contactFailed = useSelector(state => state.contact.contactFailure);
    const dispatch = useDispatch();

    const handleChange = e => {
        const {
            name,
            value
        } = e.target;
        setUser(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = e => {
        e.preventDefault();
        setValidated(true);
        if (user.email && user.message) {
            dispatch(sendContactEmail(user));
        }

        if (!loading && contactFailed === null) {
            setTimeout(function() {
                setUser({
                    names: '',
                    email: '',
                    subject: '',
                    message: '',
                });
                setValidated(false);
            }, 1500);
        }
    };

    return ( <
        div className = "p-8 md:p-12 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700" >
        <
        div className = "space-y-2" >
        <
        Typography variant = "h3" > Send us a < span className = "text-primary italic" > Message < /span></Typography >
        <
        p className = "text-sm text-slate-400 font-medium" > We typically respond within 24 business hours. < /p> <
        /div>

        <
        form onSubmit = {
            handleSubmit
        }
        className = "space-y-6" >
        <
        div className = "grid grid-cols-1 md:grid-cols-2 gap-6" >
        <
        Input label = "Your Full Name"
        name = "names"
        id = "names"
        value = {
            user.names
        }
        required onChange = {
            handleChange
        }
        icon = {
            User
        }
        placeholder = "John Doe"
        error = {
            validated && !user.names ? 'Name is required' : null
        }
        /> <
        Input label = "Email Address"
        name = "email"
        id = "email"
        type = "email"
        value = {
            user.email
        }
        required onChange = {
            handleChange
        }
        icon = {
            Mail
        }
        placeholder = "john@example.com"
        error = {
            validated && !user.email ? 'Valid email is required' : null
        }
        /> <
        /div>

        <
        Input label = "Subject"
        name = "subject"
        id = "subject"
        value = {
            user.subject
        }
        required onChange = {
            handleChange
        }
        icon = {
            Tag
        }
        placeholder = "How can we help?"
        error = {
            validated && !user.subject ? 'Subject is required' : null
        }
        />

        <
        div className = "space-y-2" >
        <
        label className = "text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-1.5" >
        <
        MessageSquare size = {
            12
        }
        className = "text-primary" / > Detailed Message <
        /label> <
        textarea name = "message"
        id = "message"
        rows = {
            5
        }
        required value = {
            user.message
        }
        onChange = {
            handleChange
        }
        className = {
            `w-full bg-slate-50 border ${validated && !user.message ? 'border-red-200 focus:border-red-500' : 'border-slate-100 focus:border-primary'} rounded-2xl px-5 py-4 text-sm font-bold text-secondary outline-none focus:ring-4 focus:ring-primary/5 transition-all resize-none placeholder:text-slate-300`
        }
        placeholder = "Write your message here..." /
        > {
            validated && !user.message && ( <
                p className = "text-[10px] font-bold text-red-500 ml-2 animate-in fade-in" > Message cannot be empty < /p>
            )
        } <
        /div>

        <
        div className = "pt-4" >
        <
        Button type = "submit"
        fullWidth size = "lg"
        variant = "primary"
        className = "rounded-2xl py-6 shadow-premium font-black text-lg h-16"
        icon = {
            Send
        }
        disabled = {
            loading
        } >
        {
            loading ? 'Sending...' : 'Send Message'
        } <
        /Button> <
        /div>

        {
            contactFailed && ( <
                div className = "p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 animate-in shake duration-500" >
                <
                AlertCircle size = {
                    20
                }
                /> <
                p className = "text-xs font-bold" > {
                    contactFailed
                } < /p> <
                /div>
            )
        } <
        /form> <
        /div>
    );
};

export default ContactForm;