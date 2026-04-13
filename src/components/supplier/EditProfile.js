import React, {
    useState
} from 'react';
import PropTypes from 'prop-types';
import {
    useDispatch,
    useSelector
} from 'react-redux';
import {
    Save,
    Upload,
    Loader2,
    Image as ImageIcon,
    Check,
    AlertCircle
} from 'lucide-react';
import {
    updateMyProfile
} from '../../redux/actions';
import Button from '../Ui/Button';
import Input from '../Ui/Input';

const {
    REACT_APP_CLOUDINARY_NAME,
    REACT_APP_CLOUDINARY_UPLOAD_PRESET,
} = process.env;

const EditProfile = ({
    user: initialUser,
    onCancel
}) => {
    const [user, setUser] = useState({
        ...initialUser
    });
    const [submitted, setSubmitted] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [imageUrl, setImageUrl] = useState(null);

    const registering = useSelector(state => state.auth.signupData);
    const registerFailure = useSelector(state => state.auth.signupFailure);
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

    const uploadFile = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setIsUploading(true);
        let data = new FormData();
        data.append('file', file);
        data.append('upload_preset', REACT_APP_CLOUDINARY_UPLOAD_PRESET);

        try {
            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${REACT_APP_CLOUDINARY_NAME}/image/upload`, {
                    method: 'POST',
                    body: data
                }
            );
            const resData = await response.json();
            setImageUrl(resData.secure_url);
        } catch (err) {
            console.error('Upload failed', err);
        } finally {
            setIsUploading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);

        if (user.names && user.description) {
            const data = {
                ...user,
                // Since original code relied on localStorage.imageUrl, we use imageUrl state or keep current
            };
            if (imageUrl) data.imageUrl = imageUrl;
            dispatch(updateMyProfile(data));
        }
    };

    return ( <
        form onSubmit = {
            handleSubmit
        }
        className = "space-y-10 animate-in fade-in duration-500" >
        <
        div className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" > {
            /* Profile Media Section */ } <
        div className = "lg:col-span-1 space-y-4" >
        <
        label className = "text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1" > Profile Photo < /label> <
        div className = {
            `relative border-2 border-dashed rounded-[2.5rem] h-[280px] flex flex-col items-center justify-center transition-all bg-slate-50/50 ${
            imageUrl ? 'border-primary/20 bg-primary/5' : 'border-slate-100 hover:border-primary/40'
          }`
        } > {
            isUploading ? ( <
                div className = "flex flex-col items-center gap-3" >
                <
                Loader2 className = "text-primary animate-spin"
                size = {
                    32
                }
                /> <
                p className = "text-[10px] font-black text-slate-400 uppercase tracking-widest" > Processing... < /p> <
                /div>
            ) : imageUrl ? ( <
                div className = "w-full h-full p-4 group" >
                <
                img src = {
                    imageUrl
                }
                alt = "Preview"
                className = "w-full h-full object-cover rounded-[2rem] shadow-lg transition-transform group-hover:scale-[1.02]" / >
                <
                div className = "absolute inset-0 bg-secondary/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center rounded-[2.5rem] m-4" >
                <
                div className = "flex flex-col items-center gap-2 text-white" >
                <
                Upload size = {
                    24
                }
                /> <
                span className = "text-[10px] font-black uppercase tracking-widest" > Change Photo < /span> <
                /div> <
                /div> <
                input type = "file"
                accept = "image/*"
                className = "absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange = {
                    uploadFile
                }
                /> <
                /div>
            ) : ( <
                div className = "flex flex-col items-center gap-4 p-8 text-center" >
                <
                div className = "w-16 h-16 bg-white rounded-3xl shadow-sm flex items-center justify-center text-slate-200" >
                <
                ImageIcon size = {
                    32
                }
                /> <
                /div> <
                div className = "space-y-1" >
                <
                p className = "text-xs font-black text-secondary" > Upload Image < /p> <
                p className = "text-[10px] font-bold text-slate-400 uppercase leading-tight" > Brand or Personal logo < /p> <
                /div> <
                input type = "file"
                accept = "image/*"
                className = "absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange = {
                    uploadFile
                }
                /> <
                /div>
            )
        } <
        /div> {
            submitted && !imageUrl && !initialUser.imageUrl && ( <
                p className = "text-[10px] font-bold text-rose-500 uppercase tracking-widest flex items-center gap-2 pl-4" >
                <
                AlertCircle size = {
                    12
                }
                /> Image is required <
                /p>
            )
        } <
        /div>

        {
            /* Basic Info */ } <
        div className = "lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6" >
        <
        Input label = "Full Name"
        name = "names"
        value = {
            user.names
        }
        onChange = {
            handleChange
        }
        error = {
            submitted && !user.names ? "Required" : null
        }
        /> <
        Input label = "Organization"
        name = "organization"
        value = {
            user.organization
        }
        onChange = {
            handleChange
        }
        /> <
        Input label = "Email Address"
        name = "email"
        value = {
            user.email
        }
        onChange = {
            handleChange
        }
        /> <
        Input label = "Phone Number"
        name = "phoneNumber"
        value = {
            user.phoneNumber
        }
        onChange = {
            handleChange
        }
        /> <
        Input label = "National ID"
        name = "nationalId"
        value = {
            user.nationalId
        }
        onChange = {
            handleChange
        }
        />

        <
        div className = "space-y-2" >
        <
        label className = "text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1" > Supplier Type < /label> <
        select name = "supplierType"
        value = {
            user.supplierType
        }
        onChange = {
            handleChange
        }
        className = "w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 text-sm font-bold text-secondary focus:ring-4 focus:ring-primary/10 transition-all outline-none" >
        <
        option value = "hotel" > Hotel < /option> <
        option value = "car" > Transport Car < /option> <
        option value = "tour" > Tour Package < /option> <
        option value = "hardware" > Hardware Store < /option> <
        /select> <
        /div> <
        /div> <
        /div>

        <
        div className = "grid grid-cols-1 md:grid-cols-3 gap-6" >
        <
        Input label = "Country"
        name = "country"
        value = {
            user.country
        }
        onChange = {
            handleChange
        }
        /> <
        Input label = "State/Province"
        name = "state"
        value = {
            user.state
        }
        onChange = {
            handleChange
        }
        /> <
        Input label = "General Location"
        name = "location"
        value = {
            user.location
        }
        onChange = {
            handleChange
        }
        /> <
        /div>

        <
        Input label = "Exact Street Address"
        name = "address"
        value = {
            user.address
        }
        onChange = {
            handleChange
        }
        variant = "textarea"
        rows = "2" /
        >

        <
        Input label = "Organization/Personal Description"
        name = "description"
        value = {
            user.description
        }
        onChange = {
            handleChange
        }
        variant = "textarea"
        rows = "4"
        error = {
            submitted && !user.description ? "Please provide a description" : null
        }
        />

        {
            registerFailure && ( <
                div className = "p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-center gap-3 text-rose-600 animate-in slide-in-from-top-2" >
                <
                AlertCircle size = {
                    20
                }
                /> <
                p className = "text-xs font-bold" > {
                    registerFailure
                } < /p> <
                /div>
            )
        }

        <
        div className = "flex items-center justify-end gap-3 pt-8 border-t border-slate-50" >
        <
        Button type = "button"
        variant = "ghost"
        className = "rounded-2xl px-10"
        onClick = {
            onCancel
        } >
        Discard <
        /Button> <
        Button type = "submit"
        className = "rounded-2xl px-16 font-black shadow-premium"
        loading = {
            registering || isUploading
        }
        icon = {
            Save
        } >
        Save Changes <
        /Button> <
        /div> <
        /form>
    );
};

export default EditProfile;

EditProfile.propTypes = {
    updateItem: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
};