import { FaPlus, FaPencil } from "react-icons/fa6";
import { FaRegHeart, FaUserCircle } from "react-icons/fa";    
import { BsCopy } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";
import LogoWithAppName from './LogoWithAppName';
import { useSelector } from 'react-redux';
import { FaAnglesLeft } from "react-icons/fa6";

function Sidebar() {

    const user = useSelector((state) => state.auth.user);
 
    return (
        <div className='relative bg-white shadow-lg p-[20px] md:p-[40px] w-sm h-screen flex flex-col'>
            <LogoWithAppName width="35px" color='#782ba7' />

            <div className="flex-1 flex flex-col justify-between mt-10"> 
                <div>
                    <ul className='list-none'>
                        <li className='flex gap-3 p-4 items-center font-bold bg-[#F3E8FF88] text-[#782ba7] rounded-lg'>
                        <FaPlus /> <h4>Add your Podcast(s)</h4>
                        </li>
                        <li className='flex gap-3 p-4 items-center font-bold'>
                        <FaPencil /> <h4>Create & Repurpose</h4>
                        </li>
                        <li className='flex gap-3 p-4 items-center font-bold'>
                        <BsCopy /> <h4>Podcast Widget</h4>
                        </li>
                        <li className='flex gap-3 p-4 items-center font-bold'>
                        <FaRegHeart /> <h4>Upgrade</h4>
                        </li>
                    </ul>

                    <hr className='mt-10 text-[#ccc]'/>
                </div>
                
                
                <div className="mt-6 pt-4">
                    <div className="flex items-center gap-2 mb-2 text-gray-700">
                        <IoSettingsOutline />
                        <h4>Help</h4>
                    </div>

                    <hr className='text-[#ccc]' />

                    <div className="flex items-center gap-2 text-gray-800 mt-3">
                        <div className="bg-[#782ba7] p-4 rounded-lg">
                            <FaUserCircle size={24} color="#fff" />
                        </div>
                        <div>
                            <h6 className="font-semibold text-md">{user.username}</h6>
                            <h6 className="text-sm text-gray-500">{user.email}</h6>
                        </div>
                    </div>
                </div>
            </div>
            

        </div>

    )
}

export default Sidebar