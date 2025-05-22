import LogoWithAppName from "../components/LogowithAppname";
import { IoSettingsOutline } from "react-icons/io5";
import { MdNotificationsNone } from "react-icons/md"; import { BsPlusCircleFill } from "react-icons/bs";
import img from "../assets/home-img.png";  

function Home() {

  return (
    <div className="p-[40px]">
        <div className="flex justify-between">
            <LogoWithAppName color="#782ba7"/>          
            <div className="flex gap-2">
                <IoSettingsOutline className="text-2xl" />
                <MdNotificationsNone className="text-2xl" />
            </div>  
        </div>
        <div>
            <div className="flex flex-col gap-5 items-center">
                <h1 className="text-center font-bold text-4xl text-[#782ba7]">Create a New Project</h1>
                <div>
                    <img src={img} alt="Communication" className="w-100"/>
                </div>
                <div className="w-full flex justify-center">
                    <p className="w-[50%] text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in</p>
                </div>
                <div className="flex justify-center">
                    <button className='flex gap-2 items-center bg-[#211935] text-[#fff] py-3 px-5 rounded-lg cursor-pointer'><BsPlusCircleFill className="font-bold text-xl"/> Create New Project</button>
                </div>
            </div>
            
        </div>
    </div>
  )
}

export default Home;