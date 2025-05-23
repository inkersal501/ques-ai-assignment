import React, { useState } from 'react'
import { toast } from "react-toastify";
import auth from '../js/auth';
import { login } from '../store/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
 
function LoginForm() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail]= useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(email === ""){            
            toast.error("Please enter the email address"); 
        }else if(password === ""){            
            toast.error("Please enter the password"); 
        }else{
            const loginData = await auth.login(email, password);
            if(loginData) {
                dispatch(login({...loginData}));
                navigate("/home");
            } 
        }
    };

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4">
                <div>
                    <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" id="email" className='p-2 rounded-lg border border-[#999] w-full' placeholder='Email Address' required/>
                </div>
                <div>
                    <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" id="password" className='p-2 rounded-lg border border-[#999] w-full' placeholder='Password' required/>
                </div>
                <div className='flex justify-between'>                         
                    <div> 
                        <label htmlFor="remember"><input type="checkbox" name="" id="remember" /> Remember me</label>
                    </div>
                    <div> <a href="#" className='text-[#782ba7] font-bold'>Forgot Password?</a> </div>
                </div>
                <div>
                    <Button 
                        type="submit"
                        style="w-full bg-[#782ba7] text-[#fff]"
                    >
                        Login
                    </Button> 
                </div>
                <div>
                    Don't have an account? 
                    <a href="#" className='ms-2 text-[#782ba7] font-bold'>Create Account</a>
                </div>                        
            </div>
        </form>
    </div>
  )
}

export default LoginForm;