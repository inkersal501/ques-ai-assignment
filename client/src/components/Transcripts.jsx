import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import transcriptJS from "../js/transcript"; 
import Button from './Button'; 
import { updateActiveTranscript } from "../store/projectSlice";
 
function Transcripts({data, handleFlag}) {

    const user = useSelector((state)=> state.auth.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();   
    const {projectName} = useParams();

    const handleDelete = async (transcript) => {
        await transcriptJS.deleteTranscript(user, transcript);
        handleFlag(true);
    };

    const handleTranscript = (transcript) => {
        dispatch(updateActiveTranscript(transcript._id));
        navigate(`/home/${projectName}/${transcript.slug}`);
    };

    return (
        <div className='bg-white shadow-lg rounded-lg border border-[#aaa] p-[20px] md:px-[80px]'>
            <h4 className='text-xl font-bold'>Your Files</h4>

            <table className='w-full rounded-lg text-sm mt-5 text-center font-bold text-[#646464]'>
                <thead>
                    <tr>
                        <th className='bg-[#EDEDED] py-2 w-[10%] px-4'>No.</th>
                        <th className='bg-[#EDEDED] w-[50%] px-4'>Name</th>
                        <th className='bg-[#EDEDED] w-[20%] px-4'>Upload Date & Time</th>
                        <th className='bg-[#EDEDED] w-[20%] text-end px-4'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((transcript, index)=>(
                        <tr key={index} className='h-[40px]'>
                            <td className='py-5'>{index+1}</td>
                            <td>{transcript.name}</td>
                            <td>{transcriptJS.convertDate(transcript.createdAt)}</td>
                            <td className='text-end align-middle'>
                                <Button style='text-sm' rounded='rounded-s-lg rounded-e-0 border border-[#aaa]' onClick={()=>handleTranscript(transcript)}>View</Button>
                                <Button style='text-sm text-[#FF274C]' rounded='rounded-e-lg rounded-s-0 border border-[#aaa]' onClick={()=>handleDelete(transcript._id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    )
}

export default Transcripts;