import React from 'react'
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const Login = () => {

    const {setShowLogin, axios, setToken, navigate} = useAppContext()

    const [state, setState] = React.useState("login");
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [otp, setOtp] = React.useState("");
    const [verificationToken, setVerificationToken] = React.useState("");
    const [showOtpInput, setShowOtpInput] = React.useState(false);
    const [otpSent, setOtpSent] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [canResend, setCanResend] = React.useState(false);
    const [resendTimer, setResendTimer] = React.useState(0);

    // Timer effect for resend functionality
    React.useEffect(() => {
        let interval;
        if (resendTimer > 0) {
            interval = setInterval(() => {
                setResendTimer(prev => {
                    if (prev <= 1) {
                        setCanResend(true);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [resendTimer]);

    // Send OTP for email verification
    const handleSendOTP = async (e) => {
        e.preventDefault();
        if (!email) {
            toast.error('Please enter your email');
            return;
        }

        setLoading(true);
        try {
            const { data } = await axios.post('/api/otp/send-otp', { email });

            if (data.success) {
                toast.success(data.message);
                setShowOtpInput(true);
                setOtpSent(true);
                setCanResend(false);
                setResendTimer(30); // 30 seconds before resend
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error('Failed to send OTP. Please try again.');
        }
        setLoading(false);
    };

    // Verify OTP
    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        if (!otp || otp.length !== 6) {
            toast.error('Please enter a valid 6-digit OTP');
            return;
        }

        setLoading(true);
        try {
            const { data } = await axios.post('/api/otp/verify-otp', { email, otp });

            if (data.success) {
                toast.success(data.message);
                setVerificationToken(data.verificationToken);
                setShowOtpInput(false);
                // Now show the name/password form for final registration
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error('OTP verification failed. Please try again.');
        }
        setLoading(false);
    };

    // Resend OTP
    const handleResendOTP = async () => {
        setLoading(true);
        try {
            const { data } = await axios.post('/api/otp/resend-otp', { email });

            if (data.success) {
                toast.success(data.message);
                setCanResend(false);
                setResendTimer(30);
                setOtp(''); // Clear current OTP
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error('Failed to resend OTP. Please try again.');
        }
        setLoading(false);
    };

    // Final registration after OTP verification
    const handleFinalRegistration = async (e) => {
        e.preventDefault();
        if (!name || !password || password.length < 8) {
            toast.error('Please fill all fields. Password must be at least 8 characters.');
            return;
        }

        setLoading(true);
        try {
            const { data } = await axios.post('/api/user/register', {
                name,
                email,
                password,
                verificationToken
            });

            if (data.success) {
                toast.success(data.message);
                navigate('/');
                setToken(data.token);
                localStorage.setItem('token', data.token);
                setShowLogin(false);
                resetForm();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error('Registration failed. Please try again.');
        }
        setLoading(false);
    };

    // Login handler
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await axios.post('/api/user/login', { email, password });

            if (data.success) {
                navigate('/');
                setToken(data.token);
                localStorage.setItem('token', data.token);
                setShowLogin(false);
                resetForm();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error('Login failed. Please try again.');
        }
        setLoading(false);
    };

    // Reset form
    const resetForm = () => {
        setName('');
        setEmail('');
        setPassword('');
        setOtp('');
        setVerificationToken('');
        setShowOtpInput(false);
        setOtpSent(false);
        setCanResend(false);
        setResendTimer(0);
    };

    // Handle state change (login/register)
    const handleStateChange = (newState) => {
        setState(newState);
        resetForm();
    };

  return (
    <div onClick={()=> setShowLogin(false)} className='fixed top-0 bottom-0 left-0 right-0 z-100 flex items-center text-sm text-gray-600 bg-black/50'>

      <form onSubmit={onSubmitHandler} onClick={(e)=>e.stopPropagation()} className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white">
            <p className="text-2xl font-medium m-auto">
                <span className="text-primary">User</span> {state === "login" ? "Login" : "Sign Up"}
            </p>
            {state === "register" && (
                <div className="w-full">
                    <p>Name</p>
                    <input onChange={(e) => setName(e.target.value)} value={name} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary" type="text" required />
                </div>
            )}
            <div className="w-full ">
                <p>Email</p>
                <input onChange={(e) => setEmail(e.target.value)} value={email} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary" type="email" required />
            </div>
            <div className="w-full ">
                <p>Password</p>
                <input onChange={(e) => setPassword(e.target.value)} value={password} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary" type="password" required />
            </div>
            {state === "register" ? (
                <p>
                    Already have account? <span onClick={() => setState("login")} className="text-primary cursor-pointer">click here</span>
                </p>
            ) : (
                <p>
                    Create an account? <span onClick={() => setState("register")} className="text-primary cursor-pointer">click here</span>
                </p>
            )}
            <button className="bg-primary hover:bg-blue-800 transition-all text-white w-full py-2 rounded-md cursor-pointer">
                {state === "register" ? "Create Account" : "Login"}
            </button>
        </form>
    </div>
  )
}

export default Login
