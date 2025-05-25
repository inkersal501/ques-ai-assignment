import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Breadcrum from '../components/Breadcrum'; 
import { toast } from 'react-toastify';
import { logout } from '../store/authSlice';
import { FiBell, FiLogOut } from "react-icons/fi"; 
import { FaAnglesLeft, FaAnglesRight, FaArrowLeft } from "react-icons/fa6"; 
import { FaUserCircle } from "react-icons/fa";   
import Button from '../components/Button';

function Profile() {

    const user = useSelector((state) => state.auth.user);
    const activeProject = useSelector((state) => state.project.activeProject);
    const [hideSidebar, setHideSidebar] = useState(false);
    const [username, setUsername] = useState(user.username);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = ()=>{
        dispatch(logout());
        navigate("/");
        toast.success("Logout successfully.");
    }
    
    return ( 
        <div className='flex gap-0 space-0'>
            <div className='relative h-screen'>
                {!hideSidebar && <Sidebar />}
                <span onClick={()=>setHideSidebar(!hideSidebar)} className="absolute bottom-[15%] left-[95%] bg-[#782ba7] p-2 rounded-full cursor-pointer z-[10]">
                    {!hideSidebar ? 
                    <FaAnglesLeft size={24} color="#fff"/>
                    :
                    <FaAnglesRight size={24} color="#fff"/> }
                </span>
            </div>
            <div className="p-[20px] md:p-[40px] w-[-webkit-fill-available]">
                <div className="flex items-center justify-between">
                    <Breadcrum level1="Home Page" level1to={"/home"} level2="" level3={"Profile"} />
                    <div className="flex space-x-3">
                        <span className='rounded-full border border-[#ccc] p-2 cursor-pointer'>
                            <FiBell size="20"/>
                        </span>                        
                        <span className='rounded-full border border-[#ccc] p-2 cursor-pointer'>
                            <FiLogOut size="20" color="red" onClick={()=>handleLogout()}/>
                        </span>
                    </div>
                </div>
                <div className="mt-5">                    
                    <h1 className='text-2xl font-bold flex gap-2 items-center'>
                        <FaArrowLeft className='cursor-pointer' onClick={()=>navigate(`/home/${activeProject}`)}/> 
                        Account Settings
                    </h1> 
                    <div className="my-10">
                        <div className="flex gap-10 items-center">
                                <div className="">
                                    <div className="bg-[#782ba7] p-4 rounded-lg">
                                        <FaUserCircle size={48} color="#fff" />
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="username">Username</label>
                                    <input type="text" id="username" onChange={(e)=>setUsername(e.target.value)} value={username} className='p-2 rounded-lg border border-[#999] w-xs'/>
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="email">Email</label>
                                    <input type="text" id="email" value={user.email} readOnly className='p-2 rounded-lg border border-[#999] w-xs'/>
                                </div> 
                        </div>
                    </div>
                    <div className="">
                        <h1 className='text-2xl font-bold'>Subscriptions</h1>
                        <div className="my-10 flex justify-between items-center border border-[#782ba7] shadow-lg rounded-lg px-[20px] py-[10px] md:px-[40px]">
                            <h5 className='text-[#782ba7]'>Oops! You don't have any active plans. <span className='font-bold'>Upgrade now!</span></h5>
                            <Button style="bg-[#782ba7] text-[#fff]">Upgrade</Button>
                        </div>

                    </div>
                </div>
            </div>


        </div> 
    )
}

export default Profile;