import AppName from './Appname';
import Logo from './Logo'; 
 
function LogoWithAppName({ width = "50px", height = "50px", color = "#fff" }) {
  return (
    <div className="flex items-center gap-2">
      <Logo width={width} height={height} color={color} />
      <AppName color={color}/>
    </div>
  );
}

export default LogoWithAppName;
