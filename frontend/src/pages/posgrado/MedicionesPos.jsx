import { useState } from 'react';
import NavUser from "../../components/NavUser";
import TablaMediciones from "../../components/datos/TablaMediciones";
import RutaActual from "../extras/RutaActual";
import DescargarMedicionesPos from "../../components/descarga/DescargaMedicionesPos";

function MedicionesPos() {

    const [largeSearchWarning, setLargeSearchWarning] = useState(false);
    return (
        <div className="bg-lime-200/20 pt-16">
            <NavUser />
            <RutaActual />
            <TablaMediciones />
            <div className='pb-8'>
            {largeSearchWarning && console.log("Muchos datos por descargar.")}
            <DescargarMedicionesPos setLargeSearchWarning={setLargeSearchWarning} />
            </div>
        </div>
    );
}

export default MedicionesPos;