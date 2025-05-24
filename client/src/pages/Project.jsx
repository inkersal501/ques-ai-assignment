import Sidebar from '../components/Sidebar'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Breadcrum from '../components/Breadcrum'; 
import { FiBell, FiLogOut } from "react-icons/fi"; 
import { logout } from '../store/authSlice';
import { toast } from 'react-toastify'; 
import { MdFileUpload } from "react-icons/md";
import PodcastCard from '../components/PodcastCard';
import rssfeedImg from "../assets/rssfeed.png";
import youtubeImg from "../assets/youtube.png";
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
import { useState } from 'react'; 
import { MdOutlineCloudUpload } from "react-icons/md";
import Button from '../components/Button';
import CreateTranscript from '../components/CreateTranscript';

function Project() {
    
    const {projectName} = useParams(); 
    const project = useSelector((state) => state.project.allProjects.find((project) => project.slug === projectName));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [hideSidebar, setHideSidebar] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [flag, setFlag] = useState(true);
    flag;
    console.log(project);
    const handleLogout = ()=>{
        dispatch(logout());
        navigate("/");
        toast.success("Logout successfully.");
    }
    return (
        <div>
            <div className='flex gap-0 space-0'>
                <div className='relative h-screen'>
                    {!hideSidebar && <Sidebar />}
                    <span onClick={()=>setHideSidebar(!hideSidebar)} className="absolute bottom-[15%] left-[95%] bg-[#782ba7] p-2 rounded-full cursor-pointer z-[10]">
                        {!hideSidebar ? 
                        <FaAnglesLeft size={24} color="#fff"/>
                        :
                        <FaAnglesRight size={24} color="#fff"/>
                        }
                    </span>
                </div>
                <div className="p-[20px] md:p-[40px] w-[-webkit-fill-available]">
                    <div className="flex items-center justify-between">
                        <Breadcrum level1="Home Page" level1to={"/home"} level2={project.name} level3="Add your podcast" />
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
                        <h1 className='text-4xl font-bold'>Add Podcast</h1>
                        <div className="flex flex-wrap space-x-10 mt-5">
                            <PodcastCard title="RSS Feed" icon={<img src={rssfeedImg} className='w-20'/>}/>
                            <PodcastCard title="Youtube Video" icon={<img src={youtubeImg} className='w-20'/>} />
                            <PodcastCard title="Upload Files" icon={<div className='bg-[#f3e8ff] p-4 py-6 rounded-lg flex justify-center w-[80px]'><MdFileUpload color="#782ba7" size="35"/></div>} />
                        </div>
                        <div className="my-10 px-4 py-8 rounded-lg border border-[#ccc] flex flex-col gap-2 items-center bg-white shadow-lg">
                            <MdOutlineCloudUpload color="#782ba7" size="100"/>
                            <h4 className='text-xl'>Select a file or drag and drop here (Podcast Media or Transcription Text)</h4>
                            <h5 className='text-[#999]'>MP4, MOV, MP3, WAV, PDF, DOCX or TXT file </h5>
                            <div className="text-center">
                                <Button onClick={()=>setIsModalOpen(true)} rounded="rounded-3xl" style="border border-[#782ba7] text-[#782ba7] font-bold">Select File</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {isModalOpen && <CreateTranscript isOpen={isModalOpen} handleModal={setIsModalOpen} handleFlag={setFlag}/> }
        </div>
    )
}

export default Project;