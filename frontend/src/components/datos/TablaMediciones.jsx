import { useState, useEffect } from 'react';
import axios from 'axios';
import TablaVariables from './TablaVariables';
import { Icon } from '@iconify/react/dist/iconify.js';
import FiltroAvanzado from '../FiltroAvanzado';

const TablaMediciones = () => {
    const [mediciones, setMediciones] = useState([]);
    const [conteo, setConteo] = useState({ total: 0 });
    const [paginaActual, setPaginaActual] = useState(1);
    const [medicionesPorPagina] = useState(24);
    // eslint-disable-next-line no-unused-vars
    const [filtro, setFiltro] = useState('');
    const [variablesMedicion, setVariablesMedicion] = useState('');
    const [medicionSeleccionada, setMedicionSeleccionada] = useState(null);
    const [equipoSeleccionado, setEquipoSeleccionado] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [showPopup2, setShowPopup2] = useState(false);
    const [hovered, setHovered] = useState(false); 
    // eslint-disable-next-line no-unused-vars
    const [loading, setLoading] = useState(false); // Estado de carga
    const [largeSearchWarning, setLargeSearchWarning] = useState(false); // Advertencia para búsquedas largas
    

    useEffect(() => {
        const obtenerMediciones = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/mediciones?page=${paginaActual}&limit=${medicionesPorPagina}&filtro=${filtro}`);
                setMediciones(response.data);
            } catch (error) {
                console.error('Error al obtener mediciones:', error);
            }
        };

        obtenerMediciones();
    }, [paginaActual, filtro, medicionesPorPagina]);

    useEffect(() => {
        const obtenerConteo = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/medicionesconteo`);
                setConteo(response.data);
            } catch (error) {
                console.error('Error al obtener el conteo de mediciones:', error.message);
            }
        };

        obtenerConteo();
    }, []);

    const handleVerMas = async (idMedicion, equipos) => {
        try {
            const response = await axios.get(`http://localhost:8081/variables/${idMedicion}`);
            // eslint-disable-next-line no-unused-vars
            const variables = response.data.variables ? response.data.variables.join(';') : '';

            if (equipos === '5PAV6' || equipos === 'SAV1') {
                setVariablesMedicion('acuvim');
            } else if (equipos === '5PAR4' || equipos === '5PAR5' || equipos === 'SAR2' || equipos === 'SAR3') {
                setVariablesMedicion('acurev');
            } else if (equipos === '4PEV7') {
                setVariablesMedicion('ev390');
            }

            setMedicionSeleccionada(idMedicion);
            setEquipoSeleccionado(equipos);
        } catch (error) {
            console.error('Error al obtener las variables de la medición:', error);
        }
    };

    // const handleFiltroChange = (e) => {
    //     setFiltro(e.target.value);
    // };

    const handleFiltroClick = () => {
        setShowPopup2(true); // Mostrar popup al hacer clic en "Filtro avanzado"
        //Acá debe ir la lógica para filtrar
    };

    const handleInfoClick = () => {
        setShowPopup(true); // Mostrar popup al hacer clic en "Información"
    };



    

    const handleScrollToBottom = () => {
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth' 
        });
    };

    return (
        <div className='flex flex-col items-center pb-6 pt-2'>
            {/* Filtro y botón de búsqueda */}
            <div className="flex flex-row items-start justify-between">
                <div className='flex font-mono italic text-lime-600 items-start mr-72 pr-24'>Tabla de mediciones</div>
                <div className='mx-40'></div>
                {/* <input
                    type="text"
                    placeholder="Filtrar por ID..."
                    value={filtro}
                    onChange={handleFiltroChange}
                    className="px-2 py-1 rounded-lg border border-lime-700"
                /> */}
                <button
                    className="ml-2 px-2 py-1 bg-lime-200 text-md text-lime-800 hover:bg-lime-300 rounded-lg flex items-center"
                    onClick={handleFiltroClick}
                >
                    <span className="mr-2 text-lime-700">
                        <Icon icon="octicon:filter-16" width="16" height="16" />
                    </span>
                    Filtro avanzado
                </button>
                <button
                    className="ml-2 px-2 py-1 text-md text-lime-800 hover:bg-lime-200 rounded-lg flex items-center"
                    onClick={handleInfoClick} // Manejador para mostrar el popup
                >
                    <span className="mr-2 text-lime-700">
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 256 256"><path fill="currentColor" d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24m0 192a88 88 0 1 1 88-88a88.1 88.1 0 0 1-88 88m16-40a8 8 0 0 1-8 8a16 16 0 0 1-16-16v-40a8 8 0 0 1 0-16a16 16 0 0 1 16 16v40a8 8 0 0 1 8 8m-32-92a12 12 0 1 1 12 12a12 12 0 0 1-12-12"></path></svg>
                    </span>
                    Información
                </button>
            </div>

            {loading && <p>Cargando...</p>} {/* Indicador de carga */}
            {largeSearchWarning && <p className='flex justify-center italic font-semibold text-gray-500 bg-white px-2 text-sm mt-2 rounded-lg'>La búsqueda ha devuelto muchos resultados. Considera refinar los criterios de filtro.</p>} {/* Advertencia para búsquedas largas */}

            {/* Popup de Información */}
            {showPopup && (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-700 bg-opacity-50 z-50">
        <button
                            className="absolute top-0 right-2 mt-2 ml-2 text-white hover:text-gray-700"
                            onClick={() => setShowPopup(false)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
        
        <div className="bg-white p-4 mt-2 rounded-lg shadow-lg">
            
            <h1 className="text-lg font-bold text-green-900">Información adicional</h1>
            <div className='divide-y py-2'>
            <p className="text-md italic font-semibold  mt-4">Filas totales existentes en la tabla de mediciones: {conteo.total}</p>
            <p className="text-md italic font-semibold  mt-2 text-wrap"> Al precionar la opción <strong>Ver más</strong> se deplegarán las variables de la medición seleccionada.</p>
            </div>
            
        </div>
    </div>
)}

 {/* Popup para el filtro avanzado */}
 {showPopup2 && (
                <FiltroAvanzado
                    setShowPopup2={setShowPopup2}
                    setMediciones={setMediciones}
                    setLargeSearchWarning={setLargeSearchWarning}
                />
            )}



            

            {/* Tabla de mediciones */}
            <div className="m-4 overflow-x-auto rounded-lg border border-lime-700" style={{ height: '500px', width: '1200px', overflowY: 'scroll' }}>
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                    <thead className="bg-lime-200">
                        <tr>
                            {["idmedicion", "fecha", "hora", "Variables", "Equipo", "Tiempo de Lectura"].map((columna) => (
                                <th key={columna} className="px-6 py-3 text-center text-xs font-medium text-black uppercase tracking-wider">
                                    {columna}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y font-mono divide-gray-200 text-center">
                        {mediciones.map((medicion) => (
                            <tr key={medicion.idmedicion} className="hover:bg-gray-100">
                                <td className="px-6 whitespace-nowrap border">{medicion.idmedicion}</td>
                                <td className="px-6 whitespace-nowrap border">{medicion.fecha}</td>
                                <td className="px-6 whitespace-nowrap border">{medicion.hora}</td>
                                <td className="px-6 flex justify-center hover:underline hover:text-black items-center font-thin text-lime-700">
                                    <button onClick={() => handleVerMas(medicion.idmedicion, medicion.equipos_idequipo)}>↻ Ver más</button>
                                </td>
                                <td className="px-6 whitespace-nowrap border">{medicion.equipos_idequipo}</td>
                                <td className="px-6 whitespace-nowrap border">{medicion.tiempoLectura}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Mensaje de advertencia para búsquedas grandes */}
            {largeSearchWarning && (
                <div className="mt-4 p-4 bg-yellow-100 text-yellow-900">
                    La búsqueda ha devuelto más de 1000 resultados. Considera refinar tu búsqueda o descargar los datos.
                </div>
            )}

            {/* Loader */}
            {loading && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-24 w-24"></div>
                </div>
            )}
                <div className="flex justify-between mt-4 px-2 pb-4">
                    <button
                        className="bg-lime-200 hover:shadow-lg text-lime-900 italic font-bold py-2 px-4 rounded-full"
                        onClick={() => setPaginaActual(paginaActual - 1)}
                        disabled={paginaActual === 1}
                    >
                        Anterior
                    </button>
                    <div>
                        Página {paginaActual} de {Math.ceil(conteo.total / medicionesPorPagina)}
                    </div>
                    <button
                        className="bg-lime-200 hover:shadow-lg text-lime-900 italic font-bold py-2 px-4 rounded-full"
                        onClick={() => setPaginaActual(paginaActual + 1)}
                        disabled={mediciones.length < medicionesPorPagina}
                    >
                        Siguiente
                    </button>
                </div>
            </div>

            <div
                className={`fixed bottom-5 right-4 p-4 bg-gray-200 bg-opacity-30 shadow-md rounded-lg ${hovered ? 'scale-110' : ''}`}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                style={{ transition: 'transform 0.3s ease-in-out' }}
            >
                <p className="text-xs font-semibold">Medición seleccionada:</p>
                <p className="text-xs">{medicionSeleccionada}</p>
              
                <p className="text-xs font-semibold mt-2">Equipo:</p>
                <p className="text-xs">{equipoSeleccionado}</p>
                <p className="text-xs font-semibold mt-2">Grupo:</p>
                <p className="text-xs">{variablesMedicion}</p>
            
            </div>

            <div
                className={`fixed bottom-5 left-4 px-4 py-2 bg-lime-200 bg-opacity-30 shadow-md rounded-lg `}
               
                style={{ transition: 'transform 0.3s ease-in-out' }}
            >
                <button onClick={handleScrollToBottom}>
                <svg className='mt-2' xmlns="http://www.w3.org/2000/svg" width={28} height={28} viewBox="0 0 24 24"><path fill="currentColor" d="m12 16l-5-5l1.4-1.45l2.6 2.6V4h2v8.15l2.6-2.6L17 11zm-6 4q-.825 0-1.412-.587T4 18v-3h2v3h12v-3h2v3q0 .825-.587 1.413T18 20z"></path></svg>
                </button>
            </div>
            {/* Tabla de variables de medición seleccionada */}
            <div >
                <p className='font-mono italic text-lime-600'>Tabla variables seleccionadas</p>
            </div>
            <TablaVariables variablesMedicion={variablesMedicion} idMedicion={medicionSeleccionada} />
        </div>
    );
};

export default TablaMediciones;
