import { useState, useEffect } from 'react';
import axios from 'axios';
import { Icon } from '@iconify/react/dist/iconify.js';

const Tablaindicadores = () => {
    const [indicadores, setindicadores] = useState([]);
    const [conteo, setConteo] = useState({ total: 0 });
    // eslint-disable-next-line no-unused-vars
    const [paginaActual, setPaginaActual] = useState(1);
    // const [indicadoresPorPagina] = useState(24);
    // eslint-disable-next-line no-unused-vars
    const [tablaHeight, setTablaHeight] = useState(500);
    // eslint-disable-next-line no-unused-vars
    const [tablaWeight, setTablaWeight] = useState(1200);
    const [searchText, setSearchText] = useState('');
    const columnas = ["idindicador","nombre","posiciones" ,"formula", "Grupo"];


    useEffect(() => {
        const obtenerindicadores = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/indicadores`);
                setindicadores(response.data);
            } catch (error) {
                console.error('Error al obtener indicadores:', error);
            }
        };

        obtenerindicadores();
    }, [paginaActual]);

    useEffect(() => {
        const obtenerConteo = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/indicadoresconteo`);
                setConteo(response.data);
            } catch (error) {
                console.error('Error al obtener el conteo de indicadores:', error.message);
            }
        };

        obtenerConteo();
    }, []);



    const filteredIndicadores = indicadores.filter(item =>
        item.nombre.toString().toLowerCase().includes(searchText.toLowerCase()) ||
        item.posiciones.toString().toLowerCase().includes(searchText.toLowerCase()) ||
        item.formula.toString().toLowerCase().includes(searchText.toLowerCase()) ||
        item.grupos_idgrupo.toString().toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <div className='flex flex-col items-center pb-4 pt-2'>
            {/* Filtro y botón de búsqueda */}
            <div className="flex flex-row items-center justify-beetwen">
                <div className='flex font-mono italic text-lime-500 items-start mr-96 pr-24'>Tabla de indicadores</div>
                <input
                    type="text"
                    placeholder="Filtrar..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="px-2 py-1 rounded-lg border border-lime-700"
                />
                <button
                    // onClick={handleBuscarClick}
                    className="ml-2 px-2 py-1 bg-lime-200 text-md text-lime-800 hover:bg-lime-300 rounded-lg flex items-center"
                >
                    <span className="mr-2 text-lime-700">
                    <Icon icon="octicon:filter-16" width="16" height="16"  />
                    </span>
                    Buscar
                </button>
            </div>

            {/* Tabla de indicadores */}
            <div className="m-4 rounded-lg border border-lime-700" style={{ height: tablaHeight, width: tablaWeight, overflowY: 'scroll' }}>
            <table className="min-w-full divide-y divide-gray-200 text-sm font-mono">

                    <thead className="bg-lime-200 font-sans">
                        <tr>
                            {columnas.map((columna) => (
                                <th key={columna} className="px-4 py-3 text-center text-xs font-medium text-lime-600 uppercase tracking-wider">
                                    {columna}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 ">
                        {filteredIndicadores.map((indicador) => {
                            return (
                                <tr key={indicador.idindicador} className="hover:bg-gray-100">
                                    <td className=" text-center border">{indicador.idindicador}</td>
                                    <td className=" pl-2 border">{indicador.nombre}</td>
                                    <td className=" px-2  border">{indicador.posiciones}</td>
                                    <td className="pl-2  border">{indicador.formula}</td>
                                    <td className="text-center px-4 border">{indicador.grupos_idgrupo}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                {/* <div className="flex justify-between mt-4 px-2 pb-4">
                    <button
                        className="bg-lime-200 hover:shadow-lg text-lime-900 italic font-bold py-2 px-4 rounded-full"
                        onClick={() => setPaginaActual(paginaActual - 1)}
                        disabled={paginaActual === 1}
                    >
                        Anterior
                    </button>
                    <div>
                        Página {paginaActual} de {Math.ceil(conteo.total / indicadoresPorPagina)}
                    </div>
                    <button
                        className="bg-lime-200 hover:shadow-lg text-lime-900 italic font-bold py-2 px-4 rounded-full"
                        onClick={() => setPaginaActual(paginaActual + 1)}
                        disabled={indicadores.length < indicadoresPorPagina}
                    >
                        Siguiente
                    </button>
                </div> */}
            </div>
            <h1 className="text-lg font-semibold italic text-green-700 mt-2">Filas totales en la tabla de indicadores: {conteo.total}</h1>
        </div>
    );
};

export default Tablaindicadores;
