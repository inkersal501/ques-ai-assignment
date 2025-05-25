import config from "./config";
import axios from "axios";
import { toast } from "react-toastify";

const apiEndpoint = config.apiEndpoint;

const createProject = async (user, name) => { 
    try {
        const result = await axios.post(`${apiEndpoint}/project/create`, {name}, { 
            headers: { Authorization: `Bearer ${user.token}`}
        });
        if(result.status === 201){
            toast.success(result.data.message);      
            return true;
        }            
    } catch (error) {  
        toast.error(error.response.data.message);
        return false;
    }
};  

const getAllProjects = async (user) => {
    try {
        const result = await axios.get(`${apiEndpoint}/project/all`, { 
            headers: { Authorization: `Bearer ${user.token}`}
        });
        if(result.status === 200){     
            return {status: true, projects: result.data.projects};
        }            
    } catch (error) {  
        toast.error(error.response.data.message);
        return {status: false};
    }
};

const reduceProjectName = (name) => {
    const arr = name.split(" ");
    const letters = arr.map((e) => e[0].toUpperCase());
    return letters[0]+""+(letters[1]?letters[1]:"");

};

const convertDate = (date) => {
    const dateTime = new Date(date);  
    let hours = dateTime.getHours();
    const minutes = dateTime.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours === 0 ? 12 : hours; 
    const time = `${hours.toString().padStart(2, '0')}:${minutes} ${ampm}`;

    const year = dateTime.getFullYear();
    const month = String(dateTime.getMonth() + 1).padStart(2, '0');
    const day = String(dateTime.getDate()).padStart(2, '0');
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate+" "+time;
};

export default { createProject, getAllProjects, reduceProjectName, convertDate };