import { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const FiltroAvanzado = ({ setShowPopup2, setMediciones, setLargeSearchWarning }) => {
    const [yearFiltro, setYearFiltro] = useState('');
    const [monthFiltro, setMonthFiltro] = useState('');
    const [dayFiltro, setDayFiltro] = useState('');
    const [equipoFiltro, setEquipoFiltro] = useState([]);
    const [selectedEquipos, setSelectedEquipos] = useState([]);

    const equiposDisponibles = [
        { id: '5PAV6', nombre: '5PAV6' },
        { id: 'SAV1', nombre: 'SAV1' },
        { id: '5PAR4', nombre: '5PAR4' },
        { id: '5PAR5', nombre: '5PAR5' },
        { id: 'SAR2', nombre: 'SAR2' },
        { id: 'SAR3', nombre: 'SAR3' },
        { id: '4PEV7', nombre: '4PEV7' },
    ];

    const daysInMonth = (year, month) => {
        return new Date(year, month, 0).getDate();
    };

    const handleFiltrarAvanzado = async () => {
        if (!yearFiltro && !monthFiltro && !dayFiltro && equipoFiltro.length === 0) {
            alert('Por favor, selecciona al menos un criterio de filtro.');
            return;
        }

        // Validación de día seleccionado
        if (yearFiltro && monthFiltro && dayFiltro) {
            const daysInSelectedMonth = daysInMonth(yearFiltro, monthFiltro);
            if (dayFiltro > daysInSelectedMonth) {
                alert(`El mes seleccionado (${monthFiltro}/${yearFiltro}) no tiene ${dayFiltro} días.`);
                return;
            }
        }

        // Validación de mes seleccionado sin año
        if (monthFiltro && !yearFiltro) {
            alert('Por favor, selecciona un año junto con el mes.');
            return;
        }

        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/medicionesfiltroavanzado`, {
                params: {
                    year: yearFiltro,
                    month: monthFiltro,
                    day: dayFiltro,
                    equipo: equipoFiltro.join(','),
                },
            });

            if (response.data.length > 1000) {
                setLargeSearchWarning(true);
            }

            setMediciones(response.data);
            setShowPopup2(false);
        } catch (error) {
            console.error('Error al filtrar mediciones avanzado:', error);
        }
    };

    const handleEquipoCheckboxChange = (e) => {
        const equipoId = e.target.value;
        if (e.target.checked) {
            setSelectedEquipos((prev) => [...prev, equipoId]);
            setEquipoFiltro((prev) => [...prev, equipoId]);
        } else {
            setSelectedEquipos((prev) => prev.filter((id) => id !== equipoId));
            setEquipoFiltro((prev) => prev.filter((id) => id !== equipoId));
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg relative w-96">
                <button
                    className="absolute top-0 right-0 mt-2 mr-2 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPopup2(false)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <h2 className="text-xl font-bold mb-4">Filtro avanzado</h2>
                <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Año</label>
                <select
                    value={yearFiltro}
                    onChange={(e) => setYearFiltro(e.target.value)}
                    className="mt-1 p-2 block w-full border text-gray-500 focus:text-black text-sm border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              
                >
                    <option value="">Seleccionar año</option>
                    {Array.from({ length: 2025 - 2019 + 1 }, (_, index) => 2019 + index).map((year) => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Mes</label>
                <select
                    value={monthFiltro}
                    onChange={(e) => setMonthFiltro(e.target.value)}
                    className="mt-1 p-2 block w-full border text-gray-500 focus:text-black text-sm border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    
                >
                    <option value="">Seleccionar mes</option>
                    {Array.from({ length: 12 }, (_, index) => index + 1).map((month) => (
                        <option key={month} value={month.toString().padStart(2, '0')}>
                            {month.toString().padStart(2, '0')}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Día</label>
                <select
                    value={dayFiltro}
                    onChange={(e) => setDayFiltro(e.target.value)}
                    className="mt-1 p-2 block w-full border text-gray-500 focus:text-black text-sm border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                     
                >
                    <option value="">Seleccionar día</option>
                    {Array.from({ length: 31 }, (_, index) => index + 1).map((day) => (
                        <option key={day} value={day.toString().padStart(2, '0')}>
                            {day.toString().padStart(2, '0')}
                        </option>
                    ))}
                </select>
            </div>
                <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Equipos</label>
                        <div className="grid grid-cols-2 p-2 border border-lime-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                            {equiposDisponibles.map((equipo) => (
                                <div key={equipo.id} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id={equipo.id}
                                        value={equipo.id}
                                        checked={selectedEquipos.includes(equipo.id)}
                                        onChange={handleEquipoCheckboxChange}
                                        className="mr-2"
                                    />
                                    <label htmlFor={equipo.id}>{equipo.nombre}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                    {selectedEquipos.length > 0 && (
                    <div className="mb-4">
                        <p className="text-sm font-medium text-gray-700 mb-2">Equipos seleccionados:</p>
                        <div className="flex space-x-2">
                            {selectedEquipos.map((equipo) => (
                                <div
                                    key={equipo}
                                    className="bg-lime-200 text-lime-700 px-2 py-1 rounded-full text-sm"
                                >
                                    {equipo}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="flex justify-center mt-4">
                    <button
                        className="mt-4 bg-white border-2 font-semibold border-lime-200 text-lime-800 hover:bg-lime-200 px-4 py-1 rounded-lg"
                        onClick={handleFiltrarAvanzado}
                    >
                        Aplicar filtros
                    </button>
                </div>
            </div>
        </div>
    );
};

FiltroAvanzado.propTypes = {
    setShowPopup2: PropTypes.func.isRequired,
    setMediciones: PropTypes.func.isRequired,
    setLargeSearchWarning: PropTypes.func.isRequired,
};

export default FiltroAvanzado;
