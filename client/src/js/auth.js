import config from "./config";
import axios from "axios";
import { toast } from "react-toastify";

const apiEndpoint = config.apiEndpoint;

const login = async (email, password) => {
    try {
        const result = await axios.post(`${apiEndpoint}/user/signin`, {email, password});
        if(result.status === 200){
            toast.success(result.data.message);     
            const {user, token} =  result.data;
            return {...user, token};
        }            
    } catch (error) {  
        toast.error(error.response.data.message);
        return false;
    }
};

export default {login};