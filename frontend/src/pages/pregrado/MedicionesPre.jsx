// import { useState } from 'react';
import NavUser from "../../components/NavUser";
import TablaMediciones from "../../components/datos/TablaMediciones";
import RutaActual from "../extras/RutaActual";
// import DescargarMediciones from "../../components/descarga/DescargaMediciones";

function MedicionesPre() {

  // const [largeSearchWarning, setLargeSearchWarning] = useState(false);
  return (
      <div className="bg-lime-200/20 pt-16">
          <NavUser />
          <RutaActual />
          <TablaMediciones />
          {/* <div className='pb-8'>
          {largeSearchWarning && console.log("Muchos datos por descargar.")}
          <DescargarMediciones setLargeSearchWarning={setLargeSearchWarning} />
          </div> */}
          <div className="flex items-center justify-center font-medium text-yellow-800 px-8 py-1 mt-4 text-sm bg-yellow-400/20 mx-96 rounded-lg">
            <p>↻ Para realizar descargas de datos debes tener permisos de administrador.</p>
          </div>
          <div className="py-6"></div>
      </div>
  );
}

export default MedicionesPre