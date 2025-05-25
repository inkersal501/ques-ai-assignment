import React, { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Breadcrum from '../components/Breadcrum'; 
import { toast } from 'react-toastify';
import { logout } from '../store/authSlice';
import { FiBell, FiLogOut } from "react-icons/fi"; 
import { FaAnglesLeft, FaAnglesRight, FaArrowLeft } from "react-icons/fa6"; 
import Button from '../components/Button'; 
import transcriptJS from "../js/transcript"; 

function Transcript() {
 
  const {projectName, transcript} = useParams(); 
  const user = useSelector((state)=>state.auth.user);   
  const transcriptData = useSelector((state) => state.project.transcripts.find((t) => t.slug === transcript));
  const [transcriptText, setTranscriptText] = useState(transcriptData?.transcript);
  const [hideSidebar, setHideSidebar] = useState(false); 
  const [isEdit, setEdit] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
 
  const handleLogout = ()=>{
      dispatch(logout());
      navigate("/");
      toast.success("Logout successfully.");
  }

  useEffect(() => {
    if(!projectName){
      navigate(`/home`);
    }else if(!transcriptData || !transcript){
      navigate(`/home/${projectName}`);
    }
    //eslint-disable-next-line
  }, [transcript, transcriptData]);
  
  const handleSave = async () => {
    await transcriptJS.updateTranscriptText(user, transcriptData, transcriptText);
    transcriptData.transcript = transcriptText;    
  };
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
              <div className="flex justify-between items-center flex-wrap gap-5">    
                <h1 className='text-2xl font-bold flex gap-2 items-center'>
                  <FaArrowLeft className='cursor-pointer' onClick={()=>navigate(`/home/${projectName}`)}/> 
                  Edit Transcript
                </h1> 
                {transcriptData?.transcript &&
                  <div className="flex justify-end items-center gap-3">
                    {!isEdit ? <Button style="bg-[#211935] text-[#fff] w-" onClick={()=>setEdit(true)}>Edit</Button>
                    :<>
                    <Button style="bg-[#fff] text-[red] border border-[red]" onClick={()=>setEdit(false)}>Discard</Button>
                    <Button style="bg-[#211935] text-[#fff]" onClick={()=>handleSave()}>Save</Button>
                    </>}
                  </div>
                }
              </div>  
              <div className="my-10">
                   <div className="w-full my-10 px-4 md:px-10 py-8 rounded-lg border border-[#ccc] flex flex-col gap-2 items-start bg-white shadow-lg">
                      <div className="">
                        <h5 className='text-xl text-[#782ba7] font-bold my-5'>Speaker</h5>
                      </div>
                      <div className="w-full">
                        {!isEdit ?
                        <p>{transcriptData?.transcript}</p>
                        :
                        <textarea 
                          rows="8" 
                          type="text" id="transcript" 
                          value={transcriptText}
                          onChange={(e)=>setTranscriptText(e.target.value)}
                          className='p-2 rounded-lg border border-[#999] w-full'
                        />
                        }
                      </div>
                   </div>
              </div> 
          </div>
      </div>


  </div> 
  )
}

export default Transcript;