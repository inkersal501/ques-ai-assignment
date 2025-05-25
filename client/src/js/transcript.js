import config from "./config";
import axios from "axios";
import { toast } from "react-toastify";

const apiEndpoint = config.apiEndpoint;

const createTranscript = async (user, project, name, transcript) => { 
    try {
        const result = await axios.post(`${apiEndpoint}/transcript/create`, {project, name, transcript}, { 
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

const getAllTranscripts = async (user, project) => {
    try {
        const result = await axios.get(`${apiEndpoint}/transcript/${project}`, { 
            headers: { Authorization: `Bearer ${user.token}`}
        });
        if(result.status === 200){     
            return {status: true, transcripts: result.data.transcripts};
        }            
    } catch (error) {  
        toast.error(error.response.data.message);
        return {status: false};
    }
};
 
const getTranscript = async (user, transcript) => {
    try {
        const result = await axios.get(`${apiEndpoint}/transcript/${transcript}`, { 
            headers: { Authorization: `Bearer ${user.token}`}
        });
        if(result.status === 200){     
            return {status: true, transcript: result.data.transcript};
        }            
    } catch (error) {  
        toast.error(error.response.data.message);
        return {status: false};
    }
};
const updateTranscriptText = async (user, transcriptId, text) => {
    try {
        const result = await axios.patch(`${apiEndpoint}/transcript`, {transcriptId, text}, { 
            headers: { Authorization: `Bearer ${user.token}`}
        });
        if(result.status === 200){    
            toast.success(result.data.message);     
        }            
    } catch (error) {  
        toast.error(error.response.data.message); 
    }
};
const deleteTranscript = async (user, transcript) => {
    try {
        const result = await axios.delete(`${apiEndpoint}/transcript/${transcript}`, { 
            headers: { Authorization: `Bearer ${user.token}`}
        });
        if(result.status === 200){   
            toast.success(result.data.message);   
        }            
    } catch (error) {  
        toast.error(error.response.data.message); 
    }
};
const convertDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: '2-digit', month: 'short', year: '2-digit' };
    const formattedDate = date.toLocaleDateString('en-GB', options); 

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${formattedDate} | ${hours}:${minutes}`; 
};

export default { createTranscript, getTranscript, getAllTranscripts, updateTranscriptText, deleteTranscript, convertDate };