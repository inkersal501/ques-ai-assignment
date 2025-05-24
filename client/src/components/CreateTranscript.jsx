import React, { useState } from 'react'
import Modal from './Modal';
// import projectJS from "../js/project";
import { useSelector } from 'react-redux';
import Button from './Button';
import youtubeImg from "../assets/youtube.png";
import { IoClose } from "react-icons/io5";

function CreateTranscript({isOpen, handleModal, handleFlag}) {

    const [name, setName] = useState("");
    const [nameError, setNameError] = useState("");
    const [transcript, setTranscript] = useState("");
    const [transcriptError, setTranscriptError] = useState("");
    const user = useSelector((state) => state.auth.user);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(name === "") 
            setNameError("Name can't be empty");
        else
            setNameError("");
        if(transcript === "") 
            setTranscriptError("Transcript can't be empty");
        else
            setTranscriptError("");
        user;
        //  await projectJS.createProject(user, transcript); 
            // handleFlag(true);
            // handleModal(false);
    }

    return (
        <div>
            <Modal isOpen={isOpen}>
                <div className="flex justify-between mb-4">
                    <div className="flex gap-2 items-center">
                        <img src={youtubeImg} alt="" className='w-[50px] rounded-full'/>
                        <h2 className="text-xl font-semibold text-black">Upload from Youtube</h2>
                    </div>      
                    <IoClose onClick={()=>handleModal(false)} size="25" className='cursor-pointer' />
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-2">
                        <div>
                            <label htmlFor="name"> Name</label>
                            <input 
                                type="text" id="name" 
                                value={name}
                                onChange={(e)=>setName(e.target.value)}
                                className='p-2 rounded-lg border border-[#999] w-full'
                            />
                            <span className='text-[red]'>{nameError}</span>
                        </div>
                        <div>
                            <label htmlFor="transcript"> Transcript</label>
                            <textarea
                                rows="4" 
                                type="text" id="transcript" 
                                value={transcript}
                                onChange={(e)=>setTranscript(e.target.value)}
                                className='p-2 rounded-lg border border-[#999] w-full'
                            />
                            <span className='text-[red]'>{transcriptError}</span>
                        </div>
                        <div className="flex justify-end items-center"> 
                            <div>
                                <Button    
                                    type='submit'
                                    style="bg-[#211935] text-[#fff]"
                                >
                                    Upload
                                </Button>  
                            </div>
                        </div>
                    </div>
                </form>
            </Modal>
        </div>
    )
}

export default CreateTranscript;