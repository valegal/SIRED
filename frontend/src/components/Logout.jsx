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
        <button className="btn btn-primary" onClick={handleLogout}>
            SALIR
        </button>
    );
}

export default Logout;
