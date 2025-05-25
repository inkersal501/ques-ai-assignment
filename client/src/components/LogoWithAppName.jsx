import { Link } from 'react-router-dom';
import AppName from './AppName';
import Logo from './Logo'; 
 
function LogoWithAppName({ width = "50px", height = "50px", color = "#fff" }) {
  return (
    <Link to="/">
      <div className="flex items-center gap-2">
        <Logo width={width} height={height} color={color} />
        <AppName color={color}/>
      </div>
    </Link>
  );
}

export default LogoWithAppName;
