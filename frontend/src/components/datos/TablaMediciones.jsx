import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TablaVariables from './TablaVariables';

const TablaMediciones = () => {
    const [mediciones, setMediciones] = useState([]);
    const [conteo, setConteo] = useState({ total: 0 });
    const [paginaActual, setPaginaActual] = useState(1);
    const [medicionesPorPagina] = useState(24);
    const [tablaHeight, setTablaHeight] = useState(500);
    const [tablaWeight, setTablaWeight] = useState(1200);
    const columnas = ["idmedicion","fecha","hora" ,"Variables", "Equipo", "Tiempo de Lectura"];
    const [variablesMedicion, setVariablesMedicion] = useState('');
    const [medicionSeleccionada, setMedicionSeleccionada] = useState(null);
    const [equipoSeleccionado, setEquipoSeleccionado] = useState(null);

    useEffect(() => {
        const obtenerMediciones = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/mediciones?page=${paginaActual}&limit=${medicionesPorPagina}`);
                setMediciones(response.data);
            } catch (error) {
                console.error('Error al obtener mediciones:', error);
            }
        };

        obtenerMediciones();
    }, [paginaActual]);

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
            const variables = response.data.variables ? response.data.variables.join(';') : '';
            setVariablesMedicion(variables);

            setMedicionSeleccionada(idMedicion);
            setEquipoSeleccionado(equipos);
        } catch (error) {
            console.error('Error al obtener las variables de la medición:', error);
        }
    };

    return (
        <div className='flex flex-col items-center pb-12 pt-2'>
            {/* Tabla de mediciones */}
            <div className="m-4 overflow-x-auto rounded-lg border border-lime-700" style={{ height: tablaHeight, width: tablaWeight, overflowY: 'scroll' }}>
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                    <thead className="bg-lime-200/40">
                        <tr>
                            {columnas.map((columna) => (
                                <th key={columna} className="px-6 py-3 text-center text-xs font-medium text-black uppercase tracking-wider">
                                    {columna}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 text-center">
    {mediciones.map((medicion) => {
        return (
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
        );
    })}
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
