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
import { useEffect, useState } from 'react'; 
import { MdOutlineCloudUpload } from "react-icons/md";
import Button from '../components/Button';
import CreateTranscript from '../components/CreateTranscript';
import transcriptJS from "../js/transcript"; 
import Transcripts from '../components/Transcripts';
import config from '../js/config';
import { updateTranscripts } from '../store/projectSlice';

function Project() {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {projectName} = useParams(); 
    const project = useSelector((state) => state.project.allProjects.find((project) => project.slug === projectName));
    const [transcripts, setTranscripts] = useState([]); 
    const user = useSelector((state)=>state.auth.user);    
    const [hideSidebar, setHideSidebar] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [flag, setFlag] = useState(true);
  
    const handleLogout = ()=>{
        dispatch(logout());
        navigate("/");
        toast.success("Logout successfully.");
    }

    useEffect(() => {
        if(!project._id || !projectName){
          navigate(`/home`);
        }
        //eslint-disable-next-line
    }, [project, projectName]);
    
    useEffect(() => {
        async function fetchTranscripts() {
            const getTranscripts = await transcriptJS.getAllTranscripts(user, project._id);  
            if(getTranscripts.status){ 
                if(getTranscripts.transcripts.length > 0){
                    const transcripts = getTranscripts.transcripts.map(transcript => ({...transcript, 'slug': config.slugify(transcript.name) }))
                    setTranscripts([...transcripts]);
                    dispatch(updateTranscripts([...transcripts]));
                }else{
                    setTranscripts([]);
                }
                setFlag(false);
            }
        }
        if(flag)
            fetchTranscripts();  
        //eslint-disable-next-line
    }, [flag, project])
    
    return (
        <div>
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
                    <div className="flex items-center justify-between flex-wrap gap-5">
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
                        <div className="flex flex-wrap gap-5 md:gap-10 mt-5">
                            <PodcastCard onClick={()=>setIsModalOpen(true)} title="RSS Feed" icon={<img src={rssfeedImg} className='w-20'/>}/>
                            <PodcastCard onClick={()=>setIsModalOpen(true)} title="Youtube Video" icon={<img src={youtubeImg} className='w-20'/>} />
                            <PodcastCard onClick={()=>setIsModalOpen(true)} title="Upload Files" icon={<div className='bg-[#f3e8ff] p-4 py-6 rounded-lg flex justify-center w-[80px]'><MdFileUpload color="#782ba7" size="35"/></div>} />
                        </div>
                        {transcripts.length == 0 &&
                        <div className="my-10 px-4 py-8 rounded-lg border border-[#ccc] flex flex-col gap-2 items-center bg-white shadow-lg">
                            <MdOutlineCloudUpload color="#782ba7" size="100"/>
                            <h4 className='text-xl'>Select a file or drag and drop here (Podcast Media or Transcription Text)</h4>
                            <h5 className='text-[#999]'>MP4, MOV, MP3, WAV, PDF, DOCX or TXT file </h5>
                            <div className="text-center">
                                <Button onClick={()=>setIsModalOpen(true)} rounded="rounded-3xl" style="border border-[#782ba7] text-[#782ba7] font-bold">Select File</Button>
                            </div>
                        </div>
                        }
                    </div>
                    {transcripts.length > 0 && 
                    <div className='mt-10'>
                        <Transcripts data={transcripts} handleFlag={setFlag}/>
                    </div>
                    }
                </div>
            </div>
            {isModalOpen && <CreateTranscript project={project._id} isOpen={isModalOpen} handleModal={setIsModalOpen} handleFlag={setFlag}/> }
        </div>
    )
}

export default Project;