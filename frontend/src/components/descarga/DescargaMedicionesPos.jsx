import { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const DescargarMedicionesPos = ({ setLargeSearchWarning }) => {
    const [showPopup, setShowPopup] = useState(false);
    const [yearFiltro, setYearFiltro] = useState('');
    const [monthFiltro, setMonthFiltro] = useState('');
    const [dayFiltro, setDayFiltro] = useState('');
    const [equipoFiltro, setEquipoFiltro] = useState([]);
    const [selectedEquipos, setSelectedEquipos] = useState([]);
    const [formatoDescarga, setFormatoDescarga] = useState('csv'); // Por defecto, descarga en formato CSV
    const [descargarTodos, setDescargarTodos] = useState(false); // Agregado para manejar la opción de descargar todos los 
    const [isLoading, setIsLoading] = useState(false); // Estado para manejar la carga

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

    const handleDescargarMediciones = async () => {
        if (!descargarTodos && !yearFiltro && !monthFiltro && !dayFiltro && equipoFiltro.length === 0) {
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
            setIsLoading(true); // Iniciar el indicador de carga

            const endpoint = descargarTodos
                ? 'http://localhost:8081/medicionestodas'
                : 'http://localhost:8081/medicionesfiltroavanzado';
            const params = descargarTodos
                ? {}
                : {
                    year: yearFiltro,
                    month: monthFiltro,
                    day: dayFiltro,
                    equipo: equipoFiltro.join(','),
                };
            
                const response = await axios.get(endpoint, { params });


            if (response.data.length > 1000) {
                setLargeSearchWarning(true);
            }

            if (formatoDescarga === 'csv') {
                // Lógica para descargar CSV
                const csvContent = "data:text/csv;charset=utf-8," + response.data.map(row => Object.values(row).join(',')).join('\n');
                const encodedUri = encodeURI(csvContent);
                const link = document.createElement('a');
                link.setAttribute('href', encodedUri);
                link.setAttribute('download', 'mediciones.csv');
                document.body.appendChild(link);
                link.click();
            } else if (formatoDescarga === 'json') {
                // Lógica para descargar JSON
                const jsonContent = JSON.stringify(response.data);
                const blob = new Blob([jsonContent], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'mediciones.json');
                document.body.appendChild(link);
                link.click();
            }

            setShowPopup(false); // Cerrar popup después de descargar

        } catch (error) {
            console.error('Error al descargar mediciones:', error);
        } finally {
            setIsLoading(false); // Detener el indicador de carga
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

    const openPopup = () => {
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    const handleFormatoChange = (event) => {
        setFormatoDescarga(event.target.value);
    };

    const handleDescargarTodosChange = () => {
        setDescargarTodos(!descargarTodos);
    };

    return (
        <div className="py-8 px-36 mx-96 mt-5 bg-slate-200/10 border-2 border-lime-400 rounded-lg">
            <h2 className="text-2xl text-lime-950 text-center font-bold mb-4">Descargar mediciones</h2>
            <div className="mb-4 px-8">
                <label className="block text-sm font-medium text-gray-700">Año</label>
                <select
                    value={yearFiltro}
                    onChange={(e) => setYearFiltro(e.target.value)}
                    className="mt-1 p-2 block w-full border text-gray-500 focus:text-black text-sm border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    disabled={descargarTodos} // Disable when descargarTodos is checked
                >
                    <option value="">Seleccionar año</option>
                    {Array.from({ length: 2025 - 2019 + 1 }, (_, index) => 2019 + index).map((year) => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-4 px-8">
                <label className="block text-sm font-medium text-gray-700">Mes</label>
                <select
                    value={monthFiltro}
                    onChange={(e) => setMonthFiltro(e.target.value)}
                    className="mt-1 p-2 block w-full border text-gray-500 focus:text-black text-sm border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    disabled={descargarTodos} // Disable when descargarTodos is checked
                >
                    <option value="">Seleccionar mes</option>
                    {Array.from({ length: 12 }, (_, index) => index + 1).map((month) => (
                        <option key={month} value={month.toString().padStart(2, '0')}>
                            {month.toString().padStart(2, '0')}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-4 px-8">
                <label className="block text-sm font-medium text-gray-700">Día</label>
                <select
                    value={dayFiltro}
                    onChange={(e) => setDayFiltro(e.target.value)}
                    className="mt-1 p-2 block w-full border text-gray-500 focus:text-black text-sm border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    disabled={descargarTodos} // Disable when descargarTodos is checked
                >
                    <option value="">Seleccionar día</option>
                    {Array.from({ length: 31 }, (_, index) => index + 1).map((day) => (
                        <option key={day} value={day.toString().padStart(2, '0')}>
                            {day.toString().padStart(2, '0')}
                        </option>
                    ))}
                </select>
            </div>

            <div className="mb-4 px-8">
                <label className="block text-sm font-medium text-gray-700 mb-2">Equipos</label>
                <div className="grid grid-cols-2 p-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                    {equiposDisponibles.map((equipo) => (
                        <div key={equipo.id} className="flex items-center">
                            <input
                                type="checkbox"
                                id={equipo.id}
                                value={equipo.id}
                                checked={selectedEquipos.includes(equipo.id)}
                                onChange={handleEquipoCheckboxChange}
                                className="mr-2"
                                disabled={descargarTodos} // Disable when descargarTodos is checked
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
            <div className="mb-4 px-4 ">
                <label className="block text-center text-md font-medium text-lime-800 mb-2">Formato de descarga</label>
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
            <div className="mb-4 px-8 py-1 text-lg bg-lime-400/20 rounded-lg">
                <label className="flex items-center text-sm font-medium text-gray-700">
                    <input
                        type="checkbox"
                        checked={descargarTodos}
                        onChange={handleDescargarTodosChange}
                        className="mr-2 text-wrap"
                        disabled={true}
                    />
                    Para habilitar la descarga de todos los datos debes tener permisos de administrador
                </label>
            </div>
            <div className="flex justify-center px-8">
                <button
                    onClick={openPopup}
                    className="mt-4 py-2 px-4 bg-lime-950 text-white font-bold rounded hover:bg-lime-800 focus:outline-none focus:ring-2 focus:ring-lime-600 focus:ring-opacity-50"
                >
                    Descargar
                </button>
            </div>

            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                    <div className="bg-white p-8 rounded-lg shadow-lg z-10">
                        <h2 className="text-lg font-bold mb-4">Confirmar Descarga</h2>
                        <p className="mb-4">¿Estás seguro de que quieres descargar las mediciones?</p>
                        <div className="flex justify-end">
                            <button
                                onClick={closePopup}
                                className="mr-4 py-2 px-4 bg-gray-200 text-gray-800 font-bold rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleDescargarMediciones}
                                className="py-2 px-4 bg-lime-950 text-white font-bold rounded hover:bg-lime-800 focus:outline-none focus:ring-2 focus:ring-lime-600 focus:ring-opacity-50"
                            >
                                Descargar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {isLoading && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                    <div className="bg-white p-8 rounded-lg shadow-lg z-10 flex items-center justify-center">
                        <svg className="animate-spin h-5 w-5 mr-3 text-lime-950" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                        </svg>
                        <span className="text-lg font-bold">Descargando...</span>
                    </div>
                </div>
            )}
        </div>
    );
};

DescargarMedicionesPos.propTypes = {
    setLargeSearchWarning: PropTypes.func.isRequired,
};

export default DescargarMedicionesPos;
