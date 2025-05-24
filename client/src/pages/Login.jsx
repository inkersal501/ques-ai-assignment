import Logo from '../components/Logo'; 
import AppName from '../components/Appname';
import LoginForm from '../components/LoginForm';
import LogoWithAppName from '../components/LogoWithAppName';

function Login() {
    
  return (
    <div>
        <div className='h-screen flex flex-col md:flex-row'>
            <div className='bg-[#782ba7] p-[40px] w-full md:w-[70%]'>
                <LogoWithAppName color='#fff'/>
                <div style={{color:"#fff"}} className='mt-5 w-full md:w-50'>
                    <h1 style={{fontWeight:"normal"}} className='text-5xl leading-[1.2]'>Your podcast will no longer be just a hobby</h1>
                    <h4 className='text-xl mt-5'>Supercharge Your Distribution using our AI assistant!</h4>
                </div>
            </div>
            <div className='bg-[#fff] p-[40px] w-full md:w-[40%]'>
                <div className='flex flex-col gap-1 items-center'>
                    <Logo color='#782ba7'/>
                    <h1 className='m-0 text-[#782ba7] text-2xl mt-4'>Welcome to</h1>
                    <AppName color='#782ba7'/>
                </div>
                <div className="mt-5">
                    <LoginForm />
                </div>                
            </div>
        </div>
    </div>
  )
}

export default Login;