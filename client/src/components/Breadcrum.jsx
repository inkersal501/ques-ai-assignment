import { FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Breadcrum({ level1, level1to, level2, level3 }) {
  return (
    <div className="flex items-center space-x-2 text-sm text-gray-600 font-bold">     
        <span className="text-gray-500">
            <FaHome size={18} />
        </span>
    
        {level1 && (
        <Link to={level1to} >
            <span className="flex items-center space-x-2">
                <span className="capitalize">{level1+" "}</span>            
            </span>
        </Link>
        )}

        {(level2 || level3) && <span>/</span>}

        {level2 && (
        <span className="flex items-center space-x-2">
            <span className="capitalize">{level2+" "}</span>            
        </span>
        )}

        {level3 && <span>/</span>}

        {level3 && (
            <span className="capitalize text-[#782ba7]">{level3}</span>
        )}
    </div>
  );
}

export default Breadcrum;