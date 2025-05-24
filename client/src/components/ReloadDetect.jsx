import { useEffect } from "react"; 

function ReloadDetect() {
    useEffect(() => {
    const handleBeforeUnload = (e) => {
        e.preventDefault();
        // e.returnValue = '';  
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
    };
    }, []);
    return null;
}
export default ReloadDetect;