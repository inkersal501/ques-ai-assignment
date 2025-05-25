import React, { useState } from 'react';
import { toast } from "react-toastify";
import auth from '../js/auth';
import { login } from '../store/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from './Button';

function LoginForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isSignup, setIsSignup] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password)
            toast.error("Email and password are required"); 

        if (isSignup) {
            if (!username) 
                toast.error("Please enter a username");            
            if (password !== confirmPassword) 
                toast.error("Passwords do not match");             
        }
       
        let userData;
        if (isSignup){ 
            await auth.signup(username, email, password); 
            setUsername("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
        }
        else {
            userData = await auth.login(email, password); 
        }       

        if (!isSignup && userData) {
            setEmail("");
            setPassword("");
            dispatch(login({ ...userData }));
            navigate("/home");
        }         
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-4">

                    {isSignup && (
                        <input
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            type="text"
                            className='p-2 rounded-lg border border-[#999] w-full'
                            placeholder='Username'
                            required
                        />
                    )}

                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        className='p-2 rounded-lg border border-[#999] w-full'
                        placeholder='Email Address'
                        required
                    />

                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        className='p-2 rounded-lg border border-[#999] w-full'
                        placeholder='Password'
                        required
                    />

                    {isSignup && (
                        <input
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            type="password"
                            className='p-2 rounded-lg border border-[#999] w-full'
                            placeholder='Confirm Password'
                            required
                        />
                    )}

                    {!isSignup && (
                        <div className='flex justify-between'>
                            <label>
                                <input type="checkbox" /> Remember me
                            </label>
                            <a href="#" className='text-[#782ba7] font-bold'>Forgot Password?</a>
                        </div>
                    )}

                    <Button
                        type="submit"
                        style="w-full bg-[#782ba7] text-[#fff]"
                    >
                        {isSignup ? "Sign Up" : "Login"}
                    </Button>

                    <div className='text-center'>
                        {isSignup ? "Already have an account?" : "Don't have an account?"}
                        <Button
                            type="button"
                            onClick={() => setIsSignup(!isSignup)}
                            style='ms-1 text-[#782ba7] font-bold'
                        >
                            {isSignup ? "Login" : "Create Account"}
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default LoginForm;
