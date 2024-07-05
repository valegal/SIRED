import { useState, useEffect } from 'react';
import axios from 'axios';
import TablaVariables from './TablaVariables';
import { Icon } from '@iconify/react/dist/iconify.js';

const TablaMediciones = () => {
    const [mediciones, setMediciones] = useState([]);
    const [conteo, setConteo] = useState({ total: 0 });
    const [paginaActual, setPaginaActual] = useState(1);
    const [medicionesPorPagina] = useState(24);
    const [filtro, setFiltro] = useState('');
    const [variablesMedicion, setVariablesMedicion] = useState('');
    const [medicionSeleccionada, setMedicionSeleccionada] = useState(null);
    const [equipoSeleccionado, setEquipoSeleccionado] = useState(null);

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
    

    const handleFiltroChange = (e) => {
        setFiltro(e.target.value);
    };

    return (
        <div className='flex flex-col items-center pb-12 pt-2'>
            {/* Filtro y botón de búsqueda */}
            <div className="flex flex-row items-center justify-between">
                <div className='flex font-mono italic text-lime-500 items-start mr-96 pr-24'>Tabla de mediciones</div>
                <input
                    type="text"
                    placeholder="Filtrar..."
                    value={filtro}
                    onChange={handleFiltroChange}
                    className="px-2 py-1 rounded-lg border border-lime-700"
                />
                <button
                    // onClick={handleBuscarClick}
                    className="ml-2 px-2 py-1 bg-lime-200 text-md text-lime-800 hover:bg-lime-300 rounded-lg flex items-center"
                >
                    <span className="mr-2 text-lime-700">
                        <Icon icon="octicon:filter-16" width="16" height="16" />
                    </span>
                    Buscar
                </button>
            </div>

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

            <h1 className="text-lg font-semibold italic text-green-700 mt-2">Filas totales en la tabla de mediciones: {conteo.total}</h1>

            {/* Tabla de variables de medición seleccionada */}
            <TablaVariables variablesMedicion={variablesMedicion} />
            
            <p>Medición seleccionada: {medicionSeleccionada}</p>
            <p>Equipo: {equipoSeleccionado}</p>
        </div>
    );
};

export default TablaMediciones;
