import axios from "axios";

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
        <button className="bg-red-600 text-white rounded-lg px-4 m-2" onClick={handleLogout}>
            SALIR
        </button>
    );
}

export default Logout;
