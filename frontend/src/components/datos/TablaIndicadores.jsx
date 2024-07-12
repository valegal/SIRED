import { useState, useEffect } from 'react';
import axios from 'axios';

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
    const [hovered, setHovered] = useState(false); 
    const columnas = ["idindicador","nombre","posiciones" ,"formula", "Grupo"];


    useEffect(() => {
        const obtenerindicadores = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/indicadores`);
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
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/indicadoresconteo`);
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
        <div className='flex flex-col items-center pt-2'>
            {/* Filtro y botón de búsqueda */}
            <div className="flex flex-row items-center justify-beetwen">
                <div className='flex font-mono italic text-lime-500 items-start mr-96 pr-24'>Tabla de indicadores</div>
                <div className='px-32'></div>
                <input
                    type="text"
                    placeholder="Buscar..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="px-2 py-1 rounded-lg border border-lime-700"
                />
                <div
                    // onClick={handleBuscarClick}
                    className="ml-2 px-1 py-1 bg-lime-100 text-md text-lime-800 rounded-lg flex items-center"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="currentColor" d="m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5t1.888-4.612T9.5 3t4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3zM9.5 14q1.875 0 3.188-1.312T14 9.5t-1.312-3.187T9.5 5T6.313 6.313T5 9.5t1.313 3.188T9.5 14"></path></svg>
                
                </div>
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
                                    <td className="text-center border">{indicador.idindicador}</td>
                                    <td className="pl-2 border">{indicador.nombre}</td>
                                    <td className=" px-2 border">{indicador.posiciones}</td>
                                    <td className="pl-2 border">{indicador.formula}</td>
                                    <td className="text-center px-4 border">{indicador.grupos_idgrupo}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                
            </div>
            <div
                className={`fixed bottom-5 left-4 p-4 bg-slate-200 bg-opacity-20 shadow-md rounded-lg ${hovered ? 'scale-105' : ''}`}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                style={{ transition: 'transform 0.3s ease-in-out' }}
            >
               <h1 className="text-sm font-semibold italic text-lime-700/70">Filas totales en la tabla de indicadores: {conteo.total}</h1>
               
            </div>
            
        </div>
    );
};

export default Tablaindicadores;
