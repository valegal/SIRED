import PropTypes from 'prop-types';

function DescargaIndicadores({ showPopup, setShowPopup, formato, fecha, handleFormatoChange, handleFechaChange, handleDownload }) {
    return (
        <>
            {showPopup && (
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-lg">
                        <h2 className="text-lg font-bold mb-4">Descargar datos</h2>
                        <div className="mb-4">
                            <label htmlFor="formato">Formato:</label>
                            <select
                                id="formato"
                                value={formato}
                                onChange={handleFormatoChange}
                                className="ml-2 border border-gray-400 rounded px-2 py-1"
                            >
                                <option value="JSON">JSON</option>
                                <option value="CSV">CSV</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="fecha">Fecha:</label>
                            <input
                                type="date"
                                id="fecha"
                                value={fecha}
                                onChange={handleFechaChange}
                                className="ml-2 border border-gray-400 rounded px-2 py-1"
                            />
                        </div>
                        <div className="flex justify-center">
                            <button
                                className="bg-lime-300 border border-lime-600 hover:shadow-lg text-lime-900 italic text-lg font-bold py-2 px-4 rounded-full mr-2"
                                onClick={handleDownload}
                            >
                                Descargar
                            </button>
                            <button
                                className="bg-gray-300 border border-gray-600 hover:shadow-lg text-gray-900 italic text-lg font-bold py-2 px-4 rounded-full ml-2"
                                onClick={() => setShowPopup(false)}
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

DescargaIndicadores.propTypes = {
    showPopup: PropTypes.bool.isRequired,
    setShowPopup: PropTypes.func.isRequired,
    formato: PropTypes.string.isRequired,
    fecha: PropTypes.string.isRequired,
    handleFormatoChange: PropTypes.func.isRequired,
    handleFechaChange: PropTypes.func.isRequired,
    handleDownload: PropTypes.func.isRequired,
};

export default DescargaIndicadores;
