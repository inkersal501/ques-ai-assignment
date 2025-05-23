import LogoWithAppName from "../components/LogowithAppname";
import { IoSettingsOutline } from "react-icons/io5";
import { MdNotificationsNone } from "react-icons/md"; import { BsPlusCircleFill } from "react-icons/bs";
import img from "../assets/home-img.png";  
import CreateProject from "../components/CreateProject";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import projectJS from "../js/project";
import ProjectCard from "../components/ProjectCard"; 

function Home() { 

    const user = useSelector((state) => state.auth.user); 
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [projects, setProjects] = useState([]);
    const [projectFlag, setProjectFlag] = useState(true);

    useEffect(()=> {
        if(!user) {
            navigate("/");
        }
        //eslint-disable-next-line
    }, [user]);

    useEffect(()=> {
        async function fetchProjects() {
            const getProject = await projectJS.getAllProjects(user);  
            if(getProject.status && getProject.projects.length > 0){
                setProjects(getProject.projects);
                setProjectFlag(false);
            }
        }
        if(projectFlag)
            fetchProjects();
        console.log(projectFlag)
    }, [projectFlag, user]);

    const buttonElement = () => {
        return  (
            <Button 
                onClick={()=>setIsModalOpen(true)}
                style="flex gap-2 items-center bg-[#211935] text-[#fff]"
            >
                <BsPlusCircleFill className="font-bold text-xl"/> Create New Project
            </Button>
        ) 
    }
    return (
        <div className="p-[20px] md:p-[40px]">
            <div className="flex justify-between items-center py-5">
                <LogoWithAppName color="#782ba7"/>          
                <div className="flex gap-3">
                    <IoSettingsOutline className="text-2xl" />
                    <MdNotificationsNone className="text-2xl" />
                </div>  
            </div>
            {projects.length == 0 ? (
                <div>
                    <div className="flex flex-col gap-5 items-center">
                        <h1 className="text-center font-bold text-4xl text-[#782ba7]">Create a New Project</h1>
                        <div>
                            <img src={img} alt="Communication" className="w-100"/>
                        </div>
                        <div className="w-full flex justify-center">
                            <p className="md:w-[50%] text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in</p>
                        </div>
                        <div className="flex justify-center">
                            {buttonElement()}
                        </div>
                    </div>                
                </div>
            ):(
                <div className="pt-[40px]">
                    <div className="flex justify-between items-center">
                        <h1 className="text-center font-bold text-4xl text-[#782ba7]">Projects</h1>
                        <div>{buttonElement()}</div>
                    </div>
                    <div className="my-[40px]">
                        <div className="flex flex-col md:flex-row flex-wrap gap-10 justify-start items-start md:items-center">
                            {projects.map((project, index)=>(
                                <ProjectCard key={index} project={project} />
                            ))}
                        </div>
                    </div>
                    
                </div>
            )}
            {isModalOpen && <CreateProject isOpen={isModalOpen} handleModal={setIsModalOpen} handleProjectFlag={setProjectFlag}/> }
        </div>
    )
}

export default Home;