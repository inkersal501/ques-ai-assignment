import React, { useState } from 'react'
import Modal from './Modal';
import projectJS from "../js/project";
import { useSelector } from 'react-redux';
import Button from './Button';

function CreateProject({isOpen, handleModal, handleProjectFlag}) {

    const [projectName, setProjectName] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const user = useSelector((state) => state.auth.user);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(projectName !== "") {
            await projectJS.createProject(user, projectName); 
            handleProjectFlag(true);
            handleModal(false);
        }else{
            setErrorMsg("Project Name can't be empty");
        }
    }

    return (
        <div>
            <Modal isOpen={isOpen}>
               <h2 className="text-xl font-semibold mb-4 text-black">Create Project</h2>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-4">
                        <div>
                            <label htmlFor="projectName" className='my-2'>Enter Project Name:</label>
                            <input 
                                type="text" id="projectName" 
                                value={projectName}
                                onChange={(e)=>setProjectName(e.target.value)}
                                className='p-2 rounded-lg border border-[#999] w-full my-2'
                            />
                            <span className='text-[red] my-2'>{errorMsg}</span>
                        </div>
                        <div className="flex justify-end items-center gap-4">
                            <div>
                                <Button    
                                    style="text-[red]"
                                    onClick={()=>handleModal(false)}
                                >
                                    Cancel
                                </Button> 
                            </div>
                            <div>
                                <Button    
                                    type='submit'
                                    style="bg-[#782ba7] text-[#fff]"
                                >
                                    Create
                                </Button>  
                            </div>
                        </div>
                    </div>
                </form>
            </Modal>
        </div>
    )
}

export default CreateProject;