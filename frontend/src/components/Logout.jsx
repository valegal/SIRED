import axios from "axios";
import { Icon } from '@iconify/react';

function Logout() {
    const handleLogout = async () => {
        try {
            await axios.get('http://localhost:8081/logout');
            localStorage.removeItem('token'); 
            localStorage.removeItem('role'); 
            window.location.reload(); 
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="flex items-center justify-end">
            <div className="flex items-center bg-siredoscuro shadow-md shadow-lime-500 text-white rounded-lg px-2 py-1 m-2 hover:shadow-xl hover:cursor-pointer" onClick={handleLogout}>
                
                <Icon icon="material-symbols:logout-sharp" width="24" height="24"  style={{color: 'white'}} />
                <span className="font-semibold ml-2">SALIR</span>
            </div>
        </div>
    );
}

export default Logout;
