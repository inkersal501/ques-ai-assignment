import { IoSettingsOutline } from "react-icons/io5";
import { MdNotificationsNone } from "react-icons/md";
import { BsPlusCircleFill } from "react-icons/bs";
import img from "../assets/home-img.png";  
import CreateProject from "../components/CreateProject";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import projectJS from "../js/project";
import ProjectCard from "../components/ProjectCard"; 
import LogoWithAppName from "../components/LogoWithAppName";
import { updateActive, updateProjects } from "../store/projectSlice";
import config from "../js/config";
import { toast } from 'react-toastify';
import { logout } from '../store/authSlice';
import { FiLogOut } from "react-icons/fi"; 

function Home() { 

    const user = useSelector((state) => state.auth.user); 
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const projects = useSelector((state) => state.project.allProjects || []); 
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
            if(getProject.status){
                const allprojects = getProject.projects.map(project=>({...project, 'slug': config.slugify(project.name)}));
                dispatch(updateProjects([...allprojects]));
                setProjectFlag(false);
            }
        }
        if(projectFlag)
            fetchProjects(); 
        //eslint-disable-next-line
    }, [projectFlag, user]);

    const handleLogout = ()=>{
        dispatch(logout());
        navigate("/");
        toast.success("Logout successfully.");
    }
    
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
                <div className="flex gap-3 items-center">
                    <IoSettingsOutline className="text-2xl" />
                    <MdNotificationsNone className="text-2xl" />
                    <span className='rounded-full border border-[#ccc] p-2 cursor-pointer'>
                        <FiLogOut size="20" color="red" onClick={()=>handleLogout()}/>
                    </span>
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
                                <a className="cursor-pointer" onClick={()=>{dispatch(updateActive(project.slug)); navigate(`/home/${project.slug}`)}} key={index}>
                                    <ProjectCard project={project} />
                                </a>
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