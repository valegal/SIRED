import { useState } from 'react';
import NavUser from "../../components/NavUser";
import TablaMediciones from "../../components/datos/TablaMediciones";
import RutaActual from "../extras/RutaActual";

function MedicionesAdmin() {
    const [showPopup, setShowPopup] = useState(false);
    const [formato, setFormato] = useState('JSON');
    const [fecha, setFecha] = useState('');

    const handleDownloadClick = () => {
        setShowPopup(true);
    };

    const handleFormatoChange = (event) => {
        setFormato(event.target.value);
    };

    const handleFechaChange = (event) => {
        setFecha(event.target.value);
    };

    const handleDownload = () => {
        // Aquí puedes implementar la lógica para descargar los datos
        console.log('Descargando datos en formato', formato, 'para la fecha', fecha);
        // Cerrar la ventana emergente después de descargar los datos
        setShowPopup(false);
    };

    return (
        <div className="bg-lime-200/20 pt-16">
            <div>
                <NavUser></NavUser>
            </div>
            <RutaActual></RutaActual>
            
            <TablaMediciones></TablaMediciones>
            

            <div className="flex justify-center mt-4 px-2 pb-4">
                <button
                    className="bg-lime-300 bg-opacity-80 border border-lime-600 hover:shadow-lg text-lime-900 italic text-lg font-bold py-3 px-8 mb-10 rounded-full"
                    onClick={handleDownloadClick}
                >
                    Descargar datos
                </button>
            </div>

            {showPopup && (
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-lg">
                        <h2 className="text-lg font-bold mb-4">Descargar datos</h2>
                        <div className="mb-4">
                            <label htmlFor="formato">Formato:</label>
                            <select
                                id="formato"
                                value={formato}
                                onChange={handleFormatoChange}
                                className="ml-2 border border-gray-400 rounded px-2 py-1"
                            >
                                <option value="JSON">JSON</option>
                                <option value="CSV">CSV</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="fecha">Fecha:</label>
                            <input
                                type="date"
                                id="fecha"
                                value={fecha}
                                onChange={handleFechaChange}
                                className="ml-2 border border-gray-400 rounded px-2 py-1"
                            />
                        </div>
                        <div className="flex justify-center">
                            <button
                                className="bg-lime-300 border border-lime-600 hover:shadow-lg text-lime-900 italic text-lg font-bold py-2 px-4 rounded-full mr-2"
                                onClick={handleDownload}
                            >
                                Descargar
                            </button>
                            <button
                                className="bg-gray-300 border border-gray-600 hover:shadow-lg text-gray-900 italic text-lg font-bold py-2 px-4 rounded-full ml-2"
                                onClick={() => setShowPopup(false)}
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
           
        </div>
    );
}

export default MedicionesAdmin;
