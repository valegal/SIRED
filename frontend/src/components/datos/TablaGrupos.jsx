import { useState, useEffect } from 'react';
import axios from 'axios';

const TablaGrupos = () => {
    const [grupos, setGrupos] = useState([]);
    const [has, setHas] = useState([]);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        const obtenerGrupos = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/grupos`);
                setGrupos(response.data);
            } catch (error) {
                console.error('Error al obtener grupos:', error);
            }
        };

        const obtenerHas = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/has`);
                setHas(response.data);
            } catch (error) {
                console.error('Error al obtener equipos_has_grupos:', error.message);
            }
        };

        obtenerGrupos();
        obtenerHas();
    }, []);

    const filteredGrupos = grupos.filter(grupo =>
        grupo.nombre.toLowerCase().includes(searchText.toLowerCase()) ||
        grupo.idgrupo.toLowerCase().includes(searchText.toLowerCase())
    );

    const filteredHas = has.filter(item =>
        item.equipos_idequipo.toString().toLowerCase().includes(searchText.toLowerCase()) ||
        item.grupos_idgrupo.toString().toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <div className='flex flex-col items-center pb-10'>
            <div className="ml-auto"> 
    
                <input
                    type="text"
                    placeholder="Buscar... "
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="w-5/6 px-4 py-2 rounded-lg border border-lime-700 focus:border-2 focus:border-lime-500 mb-4"
                />
            </div>
            <div className="grid grid-cols-2 gap-4 px-8 w-full">
                {/* Tabla de grupos */}
                <div className="w-full overflow-hidden">
                    <div className='text-center font-bold text-lg text-lime-800 mb-4'>Tabla de grupos</div>
                    <table className="min-w-full rounded-lg border-collapse border border-lime-500/70 divide-y divide-gray-200 text-sm font-mono">
                        <thead className="bg-lime-200 font-sans">
                            <tr>
                                <th className="px-6 py-3 border border-lime-500/70">ID</th>
                                <th className="px-6 py-3 border border-lime-500/70">Nombre</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y text-center divide-gray-200">
                            {filteredGrupos.map((grupo) => (
                                <tr key={grupo.idgrupo} className="hover:bg-gray-100">
                                    <td className="px-6 py-2 border border-lime-500/70">{grupo.idgrupo}</td>
                                    <td className="px-6 py-2 border border-lime-500/70">{grupo.nombre}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Tabla de equipos_has_grupos */}
                <div className="w-full rounded-lg overflow-hidden">
                    <div className='text-center rounded-xl font-bold text-lg text-lime-800 mb-4'>Equipos / Grupos</div>
                    <table className="min-w-full rounded-lg divide-y divide-gray-200 text-sm font-mono">
                        <thead className="bg-lime-200 font-sans">
                            <tr>
                                <th className="px-6 py-3 border border-lime-500/70">Equipo</th>
                                <th className="px-6 py-3 border border-lime-500/70">Grupo</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y text-center border rounded-lg divide-gray-200">
                            {filteredHas.map((item) => (
                                <tr key={`${item.equipos_idequipo}-${item.grupos_idgrupo}`} className="hover:bg-gray-100">
                                    <td className="px-6 py-2 border border-lime-500/70">{item.equipos_idequipo}</td>
                                    <td className="px-6 py-2 border border-lime-500/70">{item.grupos_idgrupo}</td>
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
