import { useState } from 'react';
import axios from 'axios';  // Importamos axios
import NavUser from "../../components/NavUser";
import TablaIndicadores from "../../components/datos/TablaIndicadores";
import RutaActual from "../extras/RutaActual";

function IndicadoresAdmin() {
    const [showPopup, setShowPopup] = useState(false);
    const [formatoDescarga, setFormatoDescarga] = useState('json'); // Estado para el formato de descarga

    const handleDownloadClick = () => {
        setShowPopup(true);
    };

    const handleFormatoChange = (event) => {
        setFormatoDescarga(event.target.value);
    };

    const handleDownload = async () => {
        const url = 'http://localhost:8081/indicadores';

        try {
            // Realizar la solicitud HTTP GET usando axios
            const response = await axios.get(url);

            if (formatoDescarga === 'json') {
                // Descargar como JSON
                const jsonContent = JSON.stringify(response.data);
                const encodedUri = encodeURI(`data:text/json;charset=utf-8,${jsonContent}`);
                const link = document.createElement('a');
                link.setAttribute('href', encodedUri);
                link.setAttribute('download', 'indicadores.json');
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } else if (formatoDescarga === 'csv') {
                // Descargar como CSV
                const csvContent = "data:text/csv;charset=utf-8," + response.data.map(row => Object.values(row).join(',')).join('\n');
                const encodedUri = encodeURI(csvContent);
                const link = document.createElement('a');
                link.setAttribute('href', encodedUri);
                link.setAttribute('download', 'indicadores.csv');
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }

            setShowPopup(false);  // Cerrar el popup después de la descarga
        } catch (error) {
            console.error('Error al descargar los datos:', error);
            // Manejar errores de descarga aquí
        }
    };

    return (
        <div className="bg-lime-200/20 pt-16">
            <div>
                <NavUser></NavUser>
            </div>
            <RutaActual></RutaActual>
            <TablaIndicadores></TablaIndicadores>

            <div className="flex justify-end px-2 pb-12 mr-28">
                <button
                   onClick={handleDownloadClick}
                    className="mt-4 py-2 px-4 bg-lime-800 shadow-md shadow-lime-100 text-white font-semibold rounded-lg hover:bg-lime-700 focus:outline-none focus:ring-2 focus:ring-lime-600 focus:ring-opacity-50"
                >
                    Descargar indicadores
                </button>
            </div>

            {showPopup && (
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-lg">
                        <h2 className="text-lg font-bold mb-4">Descargar tabla de indicadores</h2>
                        
                        <div className="mb-4 px-4">
                            <label className="block text-center text-lg font-medium text-lime-800 mb-2">Formato de descarga</label>
                            <div className="flex items-center justify-center space-x-4 border text-lime-800 border-white">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        value="csv"
                                        checked={formatoDescarga === 'csv'}
                                        onChange={handleFormatoChange}
                                        className="mr-2"
                                    />
                                    .csv
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        value="json"
                                        checked={formatoDescarga === 'json'}
                                        onChange={handleFormatoChange}
                                        className="mr-2"
                                    />
                                    .json
                                </label>
                            </div>
                        </div>
                        
                        <div className="flex justify-center">
                            <button
                                className="bg-lime-950 border hover:shadow-lg text-white italic text-lg font-bold py-2 px-4 rounded-lg mr-2"
                                onClick={handleDownload}
                            >
                                Descargar
                            </button>
                            <button
                                className="bg-gray-300 border hover:shadow-lg text-gray-900 italic text-lg font-bold py-2 px-4 rounded-lg ml-2"
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

export default IndicadoresAdmin;
