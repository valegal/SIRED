import { useState, useEffect } from 'react';
import axios from 'axios';

const TablaGrupos = () => {
    const [grupos, setGrupos] = useState([]);
    const [has, setHas] = useState([]);

    useEffect(() => {
        const obtenerGrupos = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/grupos`);
                setGrupos(response.data);
            } catch (error) {
                console.error('Error al obtener grupos:', error);
            }
        };

        const obtenerHas = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/has`);
                setHas(response.data);
            } catch (error) {
                console.error('Error al obtener equipos_has_grupos:', error.message);
            }
        };

        obtenerGrupos();
        obtenerHas();
    }, []);

    return (
        <div className='flex flex-col items-center pb-10'>

    

            <div className="grid grid-cols-2 gap-4 px-8 w-full">
                {/* Tabla de grupos */}
                <div className="w-full rounded-lg overflow-hidden">
                <div className='text-center font-bold text-lg text-lime-800 mb-4'>Tabla de grupos</div>
                    <table className="min-w-full divide-y divide-gray-200 text-sm font-mono">
                        <thead className="bg-lime-200 font-sans">
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y text-center divide-gray-200">
                            {grupos.map((grupo) => (
                                <tr key={grupo.idgrupo} className="hover:bg-gray-100">
                                    <td className="text-center border">{grupo.idgrupo}</td>
                                    <td className="pl-2 border">{grupo.nombre}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Tabla de equipos_has_grupos */}
                <div className="w-full rounded-lg overflow-hidden">
                <div className='text-center font-bold text-lg text-lime-800 mb-4'>Equipos / Grupos</div>
                    <table className="min-w-full divide-y divide-gray-200 text-sm font-mono">
                        <thead className="bg-lime-200 font-sans">
                            <tr>
                                <th>Equipo</th>
                                <th>Grupo</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y text-center divide-gray-200">
                            {has.map((item) => (
                                <tr key={`${item.equipos_idequipo}-${item.grupos_idgrupo}`} className="hover:bg-gray-100">
                                    <td className="text-center border">{item.equipos_idequipo}</td>
                                    <td className="pl-2 border">{item.grupos_idgrupo}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TablaGrupos;
