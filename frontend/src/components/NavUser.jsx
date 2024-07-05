import { Link } from "react-router-dom";
import Logout from "./Logout";

function NavUser() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-10 flex justify-between py-2 px-8 bg-siredclaro">
      <div className="flex items-center">
        <Link to="/" className="text-4xl font-serif font-bold italic drop-shadow-lg text-white tracking-wide mr-10">SIRED</Link>
        <div className="text-4xl flex justify-center font-bold tracking-wide text-green-700 items-center pl-80 ml-24">SISTEMA GRIPV</div>
      </div>
      <div>
        <Logout />
      </div>
    </nav>
  );
}

export default NavUser;
