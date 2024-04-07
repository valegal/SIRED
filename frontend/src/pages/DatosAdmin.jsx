import Logout from "../components/Logout"
import TablaUsuarios from "../components/datos/TablaUsuarios"

function DatosAdmin() {
  return (
    <div className="bg-slate-300 ">DatosAdmin
      <Logout></Logout>

      <TablaUsuarios></TablaUsuarios>
    </div>
  )
}

export default DatosAdmin